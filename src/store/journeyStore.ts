import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInDays, format, parseISO, startOfDay } from 'date-fns';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { generateReflectionResponse } from '@/services/openai';
import { deleteJourneyPhoto, uploadJourneyPhoto } from '@/services/storage';
import { supabase } from '@/services/supabase';
import type { JourneyPhoto, ReflectionSentiment, UserBadge } from '@/types/models';
import type { JourneyDay, JourneyStats } from '@/types/journey';
import { JourneyLayout, ConnectionDepthLevels } from '@/constants/journeyTokens';
import { isMilestoneDay } from '@/utils/journeyPath';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DATE_FORMAT = 'yyyy-MM-dd';

// Badge definitions
const BADGE_CRITERIA = [
  { type: 'first_photo', minDays: 1, minDepth: 0 },
  { type: '7_day_streak', minDays: 7, minDepth: 0 },
  { type: '30_day_streak', minDays: 30, minDepth: 0 },
  { type: '100_day_streak', minDays: 100, minDepth: 0 },
  { type: 'connection_depth_10', minDays: 0, minDepth: 10 },
  { type: 'connection_depth_25', minDays: 0, minDepth: 25 },
  { type: 'connection_depth_50', minDays: 0, minDepth: 50 },
] as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface JourneyState {
  // Original Data
  photos: JourneyPhoto[];
  badges: UserBadge[];
  totalDays: number;
  connectionDepth: number;
  startDate: string | null;

  // Path Data (Duolingo-style)
  pathDays: JourneyDay[];
  stats: JourneyStats;

  // UI State
  isLoading: boolean;
  error: string | null;

  // Original Actions
  loadJourney: (userId: string) => Promise<void>;
  addPhoto: (
    userId: string,
    photoUri: string,
    reflectionText?: string,
    sentiment?: ReflectionSentiment
  ) => Promise<void>;
  updatePhotoReflection: (
    photoId: string,
    reflectionText: string,
    sentiment: ReflectionSentiment
  ) => Promise<void>;
  deletePhoto: (photoId: string, photoUrl: string) => Promise<void>;
  calculateConnectionDepth: (userId: string) => Promise<void>;
  loadBadges: (userId: string) => Promise<void>;
  checkAndAwardBadges: (userId: string) => Promise<void>;
  clearError: () => void;
  reset: () => void;

  // Path Actions
  initializePathDays: () => void;
  getPhotoForDay: (dayNumber: number) => JourneyPhoto | undefined;
}

// ---------------------------------------------------------------------------
// Initial State
// ---------------------------------------------------------------------------

const initialStats: JourneyStats = {
  currentStreak: 0,
  longestStreak: 0,
  connectionDepthLevel: 1,
  connectionDepthPoints: 0,
  totalDaysLogged: 0,
};

const initialState = {
  photos: [] as JourneyPhoto[],
  badges: [] as UserBadge[],
  totalDays: 0,
  connectionDepth: 0,
  startDate: null as string | null,
  pathDays: [] as JourneyDay[],
  stats: initialStats,
  isLoading: false,
  error: null as string | null,
};

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

/**
 * Build path days from photos and start date.
 * Creates a JourneyDay for each day from start date to today + buffer.
 */
function buildPathDays(
  photos: JourneyPhoto[],
  startDate: string | null
): JourneyDay[] {
  const today = startOfDay(new Date());
  const todayStr = format(today, DATE_FORMAT);

  // If no photos yet, create empty path with just today
  if (!startDate || photos.length === 0) {
    return [
      {
        id: 'day-1',
        dayNumber: 1,
        date: todayStr,
        status: 'today',
        isMilestone: false,
      },
    ];
  }

  // Build photo lookup by date for O(1) access
  const photoByDate = new Map<string, JourneyPhoto>();
  for (const photo of photos) {
    photoByDate.set(photo.photo_date, photo);
  }

  const start = startOfDay(parseISO(startDate));
  const daysSinceStart = differenceInDays(today, start);

  // Create days from start to today + a few locked future days
  const totalDays = Math.min(daysSinceStart + 3, JourneyLayout.maxVisibleDays);
  const pathDays: JourneyDay[] = [];

  for (let i = 0; i < totalDays; i++) {
    const dayDate = new Date(start);
    dayDate.setDate(dayDate.getDate() + i);
    const dateStr = format(dayDate, DATE_FORMAT);

    const dayNumber = i + 1;
    const isToday = dateStr === todayStr;
    const isFuture = dayDate > today;
    const photo = photoByDate.get(dateStr);

    let status: JourneyDay['status'];
    if (isFuture) {
      status = 'locked';
    } else if (isToday) {
      status = photo ? 'logged' : 'today';
    } else {
      status = photo ? 'logged' : 'missed';
    }

    pathDays.push({
      id: `day-${dayNumber}`,
      dayNumber,
      date: dateStr,
      status,
      photoUri: photo?.photo_url,
      reflectionText: photo?.reflection_text ?? undefined,
      sentiment: photo?.reflection_sentiment === 'good'
        ? 'happy'
        : photo?.reflection_sentiment === 'hard'
        ? 'tough'
        : photo?.reflection_sentiment === 'okay'
        ? 'neutral'
        : undefined,
      isMilestone: isMilestoneDay(dayNumber),
    });
  }

  return pathDays;
}

/**
 * Calculate current streak from path days.
 */
function calculateCurrentStreak(pathDays: JourneyDay[]): number {
  if (pathDays.length === 0) return 0;

  let streak = 0;
  // Process from most recent (excluding locked/future)
  const relevantDays = pathDays
    .filter((d) => d.status !== 'locked')
    .sort((a, b) => b.dayNumber - a.dayNumber);

  for (const day of relevantDays) {
    if (day.status === 'logged' || (day.status === 'today' && day.photoUri)) {
      streak++;
    } else {
      break; // Streak broken
    }
  }

  return streak;
}

/**
 * Get connection depth level from points.
 */
function getConnectionLevel(points: number): number {
  for (let i = ConnectionDepthLevels.length - 1; i >= 0; i--) {
    if (points >= ConnectionDepthLevels[i].minPoints) {
      return ConnectionDepthLevels[i].level;
    }
  }
  return 1;
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useJourneyStore = create<JourneyState>()(
  persist(
    (set, get) => ({
      ...initialState,

      loadJourney: async (userId: string) => {
        set({ isLoading: true, error: null });

        try {
          const { data: photos, error: photosError } = await supabase
            .from('journey_photos')
            .select('*')
            .eq('user_id', userId)
            .order('photo_date', { ascending: false });

          if (photosError) throw photosError;

          const photoList = (photos ?? []) as JourneyPhoto[];
          const totalDays = photoList.length;
          const startDate =
            totalDays > 0 ? photoList[photoList.length - 1].photo_date : null;

          // Build path days for Duolingo-style view
          const pathDays = buildPathDays(photoList, startDate);
          const currentStreak = calculateCurrentStreak(pathDays);

          set({
            photos: photoList,
            totalDays,
            startDate,
            pathDays,
            isLoading: false,
          });

          // Calculate engagement metrics and load badges
          await Promise.all([
            get().calculateConnectionDepth(userId),
            get().loadBadges(userId),
          ]);

          // Update stats after connection depth is calculated
          const { connectionDepth } = get();
          const connectionDepthPoints = connectionDepth * 10; // Convert to points
          const connectionDepthLevel = getConnectionLevel(connectionDepthPoints);

          set({
            stats: {
              currentStreak,
              longestStreak: Math.max(currentStreak, get().stats.longestStreak),
              connectionDepthLevel,
              connectionDepthPoints,
              totalDaysLogged: totalDays,
            },
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to load journey';
          set({ error: message, isLoading: false });
        }
      },

      addPhoto: async (userId, photoUri, reflectionText, sentiment) => {
        set({ isLoading: true, error: null });

        try {
          const today = format(new Date(), DATE_FORMAT);

          // Check if photo already exists for today
          const { data: existing } = await supabase
            .from('journey_photos')
            .select('id')
            .eq('user_id', userId)
            .eq('photo_date', today)
            .maybeSingle();

          if (existing) {
            throw new Error('You already added a photo today!');
          }

          // Upload photo to storage
          const photoUrl = await uploadJourneyPhoto(userId, photoUri);

          // Generate AI response if reflection provided
          let aiResponse: string | null = null;
          if (reflectionText && sentiment) {
            aiResponse = await generateReflectionResponse(sentiment, reflectionText);
          }

          // Save to database
          const { error: insertError } = await supabase
            .from('journey_photos')
            .insert({
              user_id: userId,
              photo_url: photoUrl,
              photo_date: today,
              reflection_text: reflectionText ?? null,
              reflection_sentiment: sentiment ?? null,
              ai_response: aiResponse,
            });

          if (insertError) throw insertError;

          // Reload journey data
          await get().loadJourney(userId);

          // Check for new badges
          await get().checkAndAwardBadges(userId);
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to add photo';
          set({ error: message, isLoading: false });
          throw err;
        }
      },

      updatePhotoReflection: async (photoId, reflectionText, sentiment) => {
        set({ isLoading: true, error: null });

        try {
          const aiResponse = await generateReflectionResponse(sentiment, reflectionText);

          const { error } = await supabase
            .from('journey_photos')
            .update({
              reflection_text: reflectionText,
              reflection_sentiment: sentiment,
              ai_response: aiResponse,
            })
            .eq('id', photoId);

          if (error) throw error;

          // Update local state
          set((state) => ({
            photos: state.photos.map((photo) =>
              photo.id === photoId
                ? {
                    ...photo,
                    reflection_text: reflectionText,
                    reflection_sentiment: sentiment,
                    ai_response: aiResponse,
                  }
                : photo
            ),
            isLoading: false,
          }));
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to update reflection';
          set({ error: message, isLoading: false });
        }
      },

      deletePhoto: async (photoId, photoUrl) => {
        set({ isLoading: true, error: null });

        try {
          // Delete from database
          const { error } = await supabase
            .from('journey_photos')
            .delete()
            .eq('id', photoId);

          if (error) throw error;

          // Delete from storage (non-blocking)
          deleteJourneyPhoto(photoUrl);

          // Update local state
          set((state) => ({
            photos: state.photos.filter((p) => p.id !== photoId),
            totalDays: Math.max(0, state.totalDays - 1),
            isLoading: false,
          }));
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to delete photo';
          set({ error: message, isLoading: false });
        }
      },

      calculateConnectionDepth: async (userId: string) => {
        try {
          // Fetch engagement data in parallel
          const [photosRes, missionsRes, chatRes, modulesRes, tasksRes] =
            await Promise.all([
              supabase
                .from('journey_photos')
                .select('id', { count: 'exact', head: true })
                .eq('user_id', userId),
              supabase
                .from('mission_completions')
                .select('id', { count: 'exact', head: true })
                .eq('user_id', userId)
                .eq('task_completed', true),
              supabase
                .from('chat_messages')
                .select('id', { count: 'exact', head: true })
                .eq('user_id', userId)
                .eq('role', 'user'),
              supabase
                .from('module_progress')
                .select('id', { count: 'exact', head: true })
                .eq('user_id', userId)
                .eq('completed', true),
              supabase
                .from('task_completions')
                .select('id', { count: 'exact', head: true })
                .eq('user_id', userId),
            ]);

          // Calculate points
          const photoPoints = (photosRes.count ?? 0) * 2;
          const missionPoints = (missionsRes.count ?? 0) * 3;
          const chatPoints = Math.min((chatRes.count ?? 0) * 1, 50);
          const modulePoints = (modulesRes.count ?? 0) * 5;
          const taskPoints = (tasksRes.count ?? 0) * 2;

          const totalPoints =
            photoPoints + missionPoints + chatPoints + modulePoints + taskPoints;

          // Convert to 0-100 scale (10 points = 1 level, max 100)
          const connectionDepth = Math.min(Math.floor(totalPoints / 10), 100);

          set({ connectionDepth });
        } catch (err) {
          console.error('[Journey] Failed to calculate connection depth:', err);
        }
      },

      loadBadges: async (userId: string) => {
        try {
          const { data, error } = await supabase
            .from('user_badges')
            .select('*')
            .eq('user_id', userId)
            .order('earned_at', { ascending: false });

          if (error) throw error;

          set({ badges: (data ?? []) as UserBadge[] });
        } catch (err) {
          console.error('[Journey] Failed to load badges:', err);
        }
      },

      checkAndAwardBadges: async (userId: string) => {
        try {
          const { totalDays, connectionDepth, badges } = get();
          const existingTypes = new Set(badges.map((b) => b.badge_type));

          for (const criteria of BADGE_CRITERIA) {
            const earned =
              totalDays >= criteria.minDays && connectionDepth >= criteria.minDepth;

            if (earned && !existingTypes.has(criteria.type)) {
              const { error } = await supabase.from('user_badges').insert({
                user_id: userId,
                badge_type: criteria.type,
                badge_data:
                  criteria.minDays > 0
                    ? { days: totalDays }
                    : { level: connectionDepth },
              });

              if (!error) {
                await get().loadBadges(userId);
              }
            }
          }
        } catch (err) {
          console.error('[Journey] Failed to check badges:', err);
        }
      },

      clearError: () => set({ error: null }),

      reset: () => set(initialState),

      // ---------------------------------------------------------------------------
      // Path Actions
      // ---------------------------------------------------------------------------

      initializePathDays: () => {
        const { photos, startDate } = get();
        const pathDays = buildPathDays(photos, startDate);
        const currentStreak = calculateCurrentStreak(pathDays);

        set((state) => ({
          pathDays,
          stats: {
            ...state.stats,
            currentStreak,
            longestStreak: Math.max(currentStreak, state.stats.longestStreak),
            totalDaysLogged: state.totalDays,
          },
        }));
      },

      getPhotoForDay: (dayNumber: number) => {
        const { pathDays, photos } = get();
        const day = pathDays.find((d) => d.dayNumber === dayNumber);
        if (!day) return undefined;

        return photos.find((p) => p.photo_date === day.date);
      },
    }),
    {
      name: 'journey-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        totalDays: state.totalDays,
        connectionDepth: state.connectionDepth,
        startDate: state.startDate,
        stats: state.stats,
      }),
    }
  )
);

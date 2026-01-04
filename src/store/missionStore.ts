import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { getTodaysMission } from '@/data/dailyMissions';
import { generateReflectionResponse } from '@/services/openai';
import { supabase } from '@/services/supabase';
import type { MissionCompletion, ReflectionSentiment } from '@/types/models';

const MISSION_DATE_FORMAT = 'yyyy-MM-dd';
const MS_PER_DAY = 86_400_000;
const STREAK_PAGE_SIZE = 200;
const MAX_REFLECTION_CHARS = 2_000;

function missionDateString(date: Date = new Date()): string {
  return format(date, MISSION_DATE_FORMAT);
}

function parseMissionDate(dateString: string): Date {
  const [yyyy, mm, dd] = dateString.split('-').map((part) => Number(part));
  return new Date(yyyy, (mm ?? 1) - 1, dd ?? 1);
}

function dayDiff(later: Date, earlier: Date): number {
  return Math.round((later.getTime() - earlier.getTime()) / MS_PER_DAY);
}

function addDays(date: Date, days: number): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

async function fetchCompletionRow(
  userId: string,
  missionDate: string
): Promise<MissionCompletion | null> {
  const { data, error } = await supabase
    .from('mission_completions')
    .select('*')
    .eq('user_id', userId)
    .eq('mission_date', missionDate)
    .maybeSingle();

  if (error) throw error;
  return data as MissionCompletion | null;
}

async function ensureCompletionRow(
  userId: string,
  missionDate: string
): Promise<MissionCompletion> {
  const existing = await fetchCompletionRow(userId, missionDate);
  if (existing) return existing;

  const { data, error } = await supabase
    .from('mission_completions')
    .insert({
      user_id: userId,
      mission_date: missionDate,
      dua_completed: false,
      task_completed: false,
    })
    .select('*')
    .single();

  if (!error && data) return data as MissionCompletion;

  const refetched = await fetchCompletionRow(userId, missionDate);
  if (refetched) return refetched;

  throw error ?? new Error('Failed to create mission completion row.');
}

interface MissionState {
  todaysMission: ReturnType<typeof getTodaysMission> | null;
  todaysCompletion: MissionCompletion | null;

  currentStreak: number;
  longestStreak: number;
  totalDaysCompleted: number;

  isLoading: boolean;
  error: string | null;

  loadTodaysMission: (userId: string) => Promise<void>;
  completeDua: (userId: string) => Promise<void>;
  completeTask: (userId: string) => Promise<void>;
  submitReflection: (
    userId: string,
    text: string,
    sentiment: ReflectionSentiment,
    voiceUrl?: string
  ) => Promise<void>;
  calculateStreak: (userId: string) => Promise<void>;
  reset: () => void;
}

export const useMissionStore = create<MissionState>()(
  persist(
    (set, get) => ({
      todaysMission: null,
      todaysCompletion: null,
      currentStreak: 0,
      longestStreak: 0,
      totalDaysCompleted: 0,
      isLoading: false,
      error: null,

      loadTodaysMission: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          const today = missionDateString();
          const missionData = getTodaysMission();
          const completion = await ensureCompletionRow(userId, today);

          set({
            todaysMission: missionData,
            todaysCompletion: completion,
            isLoading: false,
          });

          await get().calculateStreak(userId);
        } catch (error) {
          set({
            isLoading: false,
            error: (error as Error).message || 'Failed to load mission.',
          });
        }
      },

      completeDua: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          const today = missionDateString();
          await ensureCompletionRow(userId, today);

          const { data, error } = await supabase
            .from('mission_completions')
            .update({
              dua_completed: true,
              dua_completed_at: new Date().toISOString(),
            })
            .eq('user_id', userId)
            .eq('mission_date', today)
            .select('*')
            .single();

          if (error) throw error;

          set({ todaysCompletion: data as MissionCompletion, isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: (error as Error).message || 'Failed to complete dua.',
          });
        }
      },

      completeTask: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          const today = missionDateString();
          await ensureCompletionRow(userId, today);

          const { data, error } = await supabase
            .from('mission_completions')
            .update({
              task_completed: true,
              task_completed_at: new Date().toISOString(),
            })
            .eq('user_id', userId)
            .eq('mission_date', today)
            .select('*')
            .single();

          if (error) throw error;

          set({ todaysCompletion: data as MissionCompletion, isLoading: false });
          await get().calculateStreak(userId);
        } catch (error) {
          set({
            isLoading: false,
            error: (error as Error).message || 'Failed to complete task.',
          });
        }
      },

      submitReflection: async (
        userId: string,
        text: string,
        sentiment: ReflectionSentiment,
        voiceUrl?: string
      ) => {
        set({ isLoading: true, error: null });
        try {
          const today = missionDateString();
          await ensureCompletionRow(userId, today);

          const safeText = text.trim().slice(0, MAX_REFLECTION_CHARS);

          // Generate personalized AI response (falls back to static if API unavailable)
          const aiResponse = await generateReflectionResponse(sentiment, safeText);

          const { data, error } = await supabase
            .from('mission_completions')
            .update({
              reflection_text: safeText.length > 0 ? safeText : null,
              reflection_sentiment: sentiment,
              reflection_voice_url: voiceUrl?.trim() ? voiceUrl.trim() : null,
              ai_response: aiResponse,
            })
            .eq('user_id', userId)
            .eq('mission_date', today)
            .select('*')
            .single();

          if (error) throw error;

          set({ todaysCompletion: data as MissionCompletion, isLoading: false });
        } catch (error) {
          set({
            isLoading: false,
            error: (error as Error).message || 'Failed to submit reflection.',
          });
        }
      },

      calculateStreak: async (userId: string) => {
        try {
          const { count, error: countError } = await supabase
            .from('mission_completions')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', userId)
            .eq('task_completed', true);

          if (countError) throw countError;
          const completedCount = count ?? 0;

          if (completedCount === 0) {
            set({ currentStreak: 0, longestStreak: 0, totalDaysCompleted: 0 });
            return;
          }

          const todayString = missionDateString();
          const yesterdayString = missionDateString(addDays(new Date(), -1));

          const needsFullScan =
            get().longestStreak === 0 ||
            get().totalDaysCompleted === 0 ||
            get().totalDaysCompleted !== completedCount;

          let currentStreak = 0;
          let longestStreak = needsFullScan ? 0 : get().longestStreak;

          let currentLastMatched: Date | null = null;
          let currentDone = false;

          let prevLongestDate: Date | null = null;
          let run = 0;

          let offset = 0;
          while (true) {
            const { data, error } = await supabase
              .from('mission_completions')
              .select('mission_date')
              .eq('user_id', userId)
              .eq('task_completed', true)
              .order('mission_date', { ascending: false })
              .range(offset, offset + STREAK_PAGE_SIZE - 1);

            if (error) throw error;

            const rows = (data ?? []) as Array<{ mission_date: string }>;
            if (rows.length === 0) break;

            for (const row of rows) {
              const dateString = row.mission_date;
              const date = parseMissionDate(dateString);

              if (needsFullScan) {
                if (prevLongestDate) {
                  const diff = dayDiff(prevLongestDate, date);
                  if (diff === 0) {
                    continue;
                  }
                  run = diff === 1 ? run + 1 : 1;
                } else {
                  run = 1;
                }

                prevLongestDate = date;
                if (run > longestStreak) longestStreak = run;
              }

              if (currentDone) continue;

              if (currentStreak === 0) {
                if (dateString === todayString) {
                  currentStreak = 1;
                  currentLastMatched = date;
                  continue;
                }
                if (dateString === yesterdayString) {
                  currentStreak = 1;
                  currentLastMatched = date;
                  continue;
                }
                currentDone = true;
                continue;
              }

              if (!currentLastMatched) {
                currentDone = true;
                continue;
              }

              const diff = dayDiff(currentLastMatched, date);
              if (diff === 0) continue;
              if (diff === 1) {
                currentStreak += 1;
                currentLastMatched = date;
              } else if (diff > 1) {
                currentDone = true;
              }
            }

            if (!needsFullScan && currentDone) break;
            offset += STREAK_PAGE_SIZE;
          }

          if (!needsFullScan && currentStreak > longestStreak) {
            longestStreak = currentStreak;
          }

          set({
            currentStreak,
            longestStreak,
            totalDaysCompleted: completedCount,
          });
        } catch (error) {
          console.error('Failed to calculate streak:', error);
        }
      },

      reset: () =>
        set({
          todaysMission: null,
          todaysCompletion: null,
          currentStreak: 0,
          longestStreak: 0,
          totalDaysCompleted: 0,
          isLoading: false,
          error: null,
        }),
    }),
    {
      name: 'mission-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        currentStreak: state.currentStreak,
        longestStreak: state.longestStreak,
        totalDaysCompleted: state.totalDaysCompleted,
      }),
    }
  )
);

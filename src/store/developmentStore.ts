import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/services/supabase';
import type { DailyTrait, CharacterTrait, TraitMastery, DevelopmentJourney } from '@/types/models';
import {
  CHARACTER_TRAITS,
  getTraitForDay,
  getResourceTypeForCycle,
  calculateCycle,
  getTraitById as getTraitByIdFromData,
} from '@/data/traits/traitsData';
import { format, addDays, subDays } from 'date-fns';

interface DevelopmentState {
  // State
  journeyStartDate: string | null;
  currentCycle: number;
  currentDayInCycle: number;
  dailyTraits: DailyTrait[];
  todaysTrait: DailyTrait | null;
  traitMastery: Record<string, number>;
  totalTraitsTaught: number;
  isLoading: boolean;
  error: string | null;

  // Actions
  initializeJourney: (userId: string) => Promise<void>;
  loadDevelopmentData: (userId: string) => Promise<void>;
  generateDailyTraits: (userId: string) => Promise<void>;
  completeDailyTrait: (userId: string, dailyTraitId: string, notes?: string) => Promise<void>;
  loadTraitMastery: (userId: string) => Promise<void>;
  getTraitById: (traitId: string) => CharacterTrait | undefined;
  getDailyTraitForDate: (date: string) => DailyTrait | undefined;
  getUpcomingTraits: (days: number) => Array<{ date: string; trait: CharacterTrait; dayNumber: number }>;
  reset: () => void;
}

export const useDevelopmentStore = create<DevelopmentState>()(
  persist(
    (set, get) => ({
      // Initial state
      journeyStartDate: null,
      currentCycle: 0,
      currentDayInCycle: 1,
      dailyTraits: [],
      todaysTrait: null,
      traitMastery: {},
      totalTraitsTaught: 0,
      isLoading: false,
      error: null,

      // Initialize development journey for new user
      initializeJourney: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          // Check if journey already exists
          const { data: existing } = await supabase
            .from('development_journey')
            .select('*')
            .eq('user_id', userId)
            .single();

          if (existing) {
            set({
              journeyStartDate: existing.start_date,
              currentCycle: existing.current_cycle,
              totalTraitsTaught: existing.total_traits_taught,
              isLoading: false,
            });
            return;
          }

          // Initialize new journey
          const startDate = format(new Date(), 'yyyy-MM-dd');

          const { error: insertError } = await supabase.from('development_journey').insert({
            user_id: userId,
            start_date: startDate,
            current_cycle: 0,
            total_traits_taught: 0,
          });

          if (insertError) throw insertError;

          set({
            journeyStartDate: startDate,
            currentCycle: 0,
            currentDayInCycle: 1,
            totalTraitsTaught: 0,
            isLoading: false,
          });

          // Generate first batch of daily traits
          await get().generateDailyTraits(userId);
        } catch (error: any) {
          set({
            error: error.message || 'Failed to initialize journey',
            isLoading: false,
          });
          throw error;
        }
      },

      // Load all development data
      loadDevelopmentData: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          // Load journey metadata
          const { data: journey, error: journeyError } = await supabase
            .from('development_journey')
            .select('*')
            .eq('user_id', userId)
            .single();

          if (journeyError && journeyError.code !== 'PGRST116') throw journeyError;

          if (!journey) {
            // Journey doesn't exist, initialize it
            await get().initializeJourney(userId);
            return;
          }

          // Calculate current cycle and day
          const { cycleNumber, dayInCycle } = calculateCycle(journey.start_date);

          // Load last 30 days of daily traits
          const thirtyDaysAgo = format(subDays(new Date(), 30), 'yyyy-MM-dd');
          const { data: dailyTraits, error: traitsError } = await supabase
            .from('daily_traits')
            .select('*')
            .eq('user_id', userId)
            .gte('trait_date', thirtyDaysAgo)
            .order('trait_date', { ascending: false });

          if (traitsError) throw traitsError;

          // Get today's trait
          const today = format(new Date(), 'yyyy-MM-dd');
          const todaysTrait = dailyTraits?.find((t) => t.trait_date === today) || null;

          set({
            journeyStartDate: journey.start_date,
            currentCycle: cycleNumber,
            currentDayInCycle: dayInCycle,
            dailyTraits: dailyTraits || [],
            todaysTrait,
            totalTraitsTaught: journey.total_traits_taught,
            isLoading: false,
          });

          // Load trait mastery
          await get().loadTraitMastery(userId);

          // Generate daily traits if needed
          if (!todaysTrait) {
            await get().generateDailyTraits(userId);
          }
        } catch (error: any) {
          set({
            error: error.message || 'Failed to load development data',
            isLoading: false,
          });
        }
      },

      // Generate daily traits (creates records for upcoming days)
      generateDailyTraits: async (userId: string) => {
        try {
          const state = get();
          if (!state.journeyStartDate) {
            await get().initializeJourney(userId);
            return;
          }

          const { cycleNumber, dayInCycle } = calculateCycle(state.journeyStartDate);
          const today = format(new Date(), 'yyyy-MM-dd');

          // Check if today's trait exists
          const { data: existing } = await supabase
            .from('daily_traits')
            .select('id')
            .eq('user_id', userId)
            .eq('trait_date', today)
            .single();

          if (existing) return; // Already generated

          // Get trait for today
          const trait = getTraitForDay(dayInCycle);
          const resourceType = getResourceTypeForCycle(cycleNumber);

          // Insert today's trait
          const { data: newTrait, error: insertError } = await supabase
            .from('daily_traits')
            .insert({
              user_id: userId,
              trait_id: trait.id,
              day_number: dayInCycle,
              cycle_number: cycleNumber,
              resource_type: resourceType,
              trait_date: today,
            })
            .select()
            .single();

          if (insertError) throw insertError;

          // Update state
          set((state) => ({
            dailyTraits: [newTrait, ...state.dailyTraits],
            todaysTrait: newTrait,
            currentCycle: cycleNumber,
            currentDayInCycle: dayInCycle,
          }));

          // Update journey cycle number if needed
          if (cycleNumber !== state.currentCycle) {
            await supabase
              .from('development_journey')
              .update({ current_cycle: cycleNumber })
              .eq('user_id', userId);
          }
        } catch (error: any) {
          console.error('Failed to generate daily traits:', error);
        }
      },

      // Complete daily trait
      completeDailyTrait: async (userId: string, dailyTraitId: string, notes?: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase
            .from('daily_traits')
            .update({
              completed: true,
              completed_at: new Date().toISOString(),
              notes: notes || null,
            })
            .eq('id', dailyTraitId)
            .eq('user_id', userId)
            .select()
            .single();

          if (error) throw error;

          // Update local state
          set((state) => ({
            dailyTraits: state.dailyTraits.map((t) => (t.id === dailyTraitId ? data : t)),
            todaysTrait: state.todaysTrait?.id === dailyTraitId ? data : state.todaysTrait,
            totalTraitsTaught: state.totalTraitsTaught + 1,
            isLoading: false,
          }));

          // Reload trait mastery (trigger will update it)
          await get().loadTraitMastery(userId);
        } catch (error: any) {
          set({
            error: error.message || 'Failed to complete trait',
            isLoading: false,
          });
          throw error;
        }
      },

      // Load trait mastery levels
      loadTraitMastery: async (userId: string) => {
        try {
          const { data: mastery, error } = await supabase
            .from('trait_mastery')
            .select('trait_id, mastery_level')
            .eq('user_id', userId);

          if (error) throw error;

          const masteryMap = (mastery || []).reduce(
            (acc, m) => {
              acc[m.trait_id] = m.mastery_level;
              return acc;
            },
            {} as Record<string, number>
          );

          set({ traitMastery: masteryMap });
        } catch (error: any) {
          console.error('Failed to load trait mastery:', error);
        }
      },

      // Get trait by ID from local data
      getTraitById: (traitId: string) => {
        return getTraitByIdFromData(traitId);
      },

      // Get daily trait for specific date
      getDailyTraitForDate: (date: string) => {
        const state = get();
        return state.dailyTraits.find((t) => t.trait_date === date);
      },

      // Get upcoming traits for next N days (calculated, not from DB)
      getUpcomingTraits: (days: number) => {
        const state = get();
        if (!state.journeyStartDate) return [];

        const upcoming: Array<{ date: string; trait: CharacterTrait; dayNumber: number }> = [];
        const today = new Date();

        for (let i = 0; i < days; i++) {
          const date = addDays(today, i);
          const dateStr = format(date, 'yyyy-MM-dd');
          const { cycleNumber, dayInCycle } = calculateCycle(state.journeyStartDate);
          const adjustedDay = ((dayInCycle - 1 + i) % 30) + 1;
          const trait = getTraitForDay(adjustedDay);

          upcoming.push({
            date: dateStr,
            trait,
            dayNumber: adjustedDay,
          });
        }

        return upcoming;
      },

      // Reset state
      reset: () =>
        set({
          journeyStartDate: null,
          currentCycle: 0,
          currentDayInCycle: 1,
          dailyTraits: [],
          todaysTrait: null,
          traitMastery: {},
          totalTraitsTaught: 0,
          isLoading: false,
          error: null,
        }),
    }),
    {
      name: 'development-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        journeyStartDate: state.journeyStartDate,
        currentCycle: state.currentCycle,
      }),
    }
  )
);

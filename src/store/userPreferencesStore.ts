import { create } from 'zustand';
import { supabase } from '@/services/supabase';
import type { AgeGroup } from '@/types/models';
import { useDailyTasksStore } from '@/store/dailyTasksStore';

function ageYearsToGroup(ageYears: number | null): AgeGroup {
  if (ageYears === null || Number.isNaN(ageYears)) return 'all';
  if (ageYears < 2) return 'baby';
  if (ageYears < 5) return 'toddler';
  return 'child';
}

interface UserPreferencesState {
  ageGroup: AgeGroup;
  childAgeYears: number | null;
  isLoading: boolean;
  error: string | null;
  lastLoadedUserId: string | null;

  load: (userId: string) => Promise<void>;
  reset: () => void;
}

export const useUserPreferencesStore = create<UserPreferencesState>()((set, get) => ({
  ageGroup: 'all',
  childAgeYears: null,
  isLoading: false,
  error: null,
  lastLoadedUserId: null,

  load: async (userId: string) => {
    if (!userId) return;
    if (get().lastLoadedUserId === userId) return;

    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('onboarding_data')
        .select('child_age')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      const ageYears = typeof data?.child_age === 'number' ? data.child_age : null;
      const ageGroup = ageYearsToGroup(ageYears);

      set({
        ageGroup,
        childAgeYears: ageYears,
        isLoading: false,
        lastLoadedUserId: userId,
      });

      // Keep daily task selection aligned with onboarding age.
      useDailyTasksStore.getState().setChildAge(ageGroup);
    } catch (err: any) {
      set({
        error: err?.message || 'Failed to load user preferences',
        isLoading: false,
        lastLoadedUserId: userId,
      });
    }
  },

  reset: () =>
    set({
      ageGroup: 'all',
      childAgeYears: null,
      isLoading: false,
      error: null,
      lastLoadedUserId: null,
    }),
}));


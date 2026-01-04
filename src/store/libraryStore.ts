import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ALL_MODULES, searchModules } from '@/data/modules';
import type { ModuleGuideExtended } from '@/data/moduleTypes';
import { supabase } from '@/services/supabase';
import type { ModuleProgress, ModuleType } from '@/types/models';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LibraryState {
  // Data
  progress: ModuleProgress[];
  bookmarkedModules: string[];
  searchQuery: string;
  selectedType: ModuleType | 'all';
  isLoading: boolean;
  error: string | null;

  // Actions
  loadProgress: (userId: string) => Promise<void>;
  markCompleted: (userId: string, moduleType: ModuleType, moduleId: string) => Promise<void>;
  toggleBookmark: (userId: string, moduleType: ModuleType, moduleId: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
  setSelectedType: (type: ModuleType | 'all') => void;
  getFilteredModules: () => ModuleGuideExtended[];
  isModuleCompleted: (moduleId: string) => boolean;
  isModuleBookmarked: (moduleId: string) => boolean;
  clearError: () => void;
  reset: () => void;
}

// ---------------------------------------------------------------------------
// Initial State
// ---------------------------------------------------------------------------

const initialState = {
  progress: [] as ModuleProgress[],
  bookmarkedModules: [] as string[],
  searchQuery: '',
  selectedType: 'all' as ModuleType | 'all',
  isLoading: false,
  error: null as string | null,
};

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set, get) => ({
      ...initialState,

      loadProgress: async (userId: string) => {
        set({ isLoading: true, error: null });

        try {
          const { data, error } = await supabase
            .from('module_progress')
            .select('*')
            .eq('user_id', userId);

          if (error) throw error;

          const progress = (data ?? []) as ModuleProgress[];
          const bookmarked = progress.filter((p) => p.bookmarked).map((p) => p.module_id);

          set({
            progress,
            bookmarkedModules: bookmarked,
            isLoading: false,
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to load progress';
          set({ error: message, isLoading: false });
        }
      },

      markCompleted: async (userId, moduleType, moduleId) => {
        set({ isLoading: true, error: null });

        try {
          // Check if progress record exists
          const { data: existing } = await supabase
            .from('module_progress')
            .select('*')
            .eq('user_id', userId)
            .eq('module_type', moduleType)
            .eq('module_id', moduleId)
            .single();

          if (existing) {
            // Update existing
            const { error } = await supabase
              .from('module_progress')
              .update({
                completed: true,
                completed_at: new Date().toISOString(),
              })
              .eq('id', existing.id);

            if (error) throw error;
          } else {
            // Insert new
            const { error } = await supabase.from('module_progress').insert({
              user_id: userId,
              module_type: moduleType,
              module_id: moduleId,
              completed: true,
              completed_at: new Date().toISOString(),
              bookmarked: false,
            });

            if (error) throw error;
          }

          // Reload progress
          await get().loadProgress(userId);
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Failed to mark completed';
          set({ error: message, isLoading: false });
        }
      },

      toggleBookmark: async (userId, moduleType, moduleId) => {
        const isBookmarked = get().isModuleBookmarked(moduleId);

        // Optimistic update
        set((state) => ({
          bookmarkedModules: isBookmarked
            ? state.bookmarkedModules.filter((id) => id !== moduleId)
            : [...state.bookmarkedModules, moduleId],
        }));

        try {
          // Check if progress record exists
          const { data: existing } = await supabase
            .from('module_progress')
            .select('*')
            .eq('user_id', userId)
            .eq('module_type', moduleType)
            .eq('module_id', moduleId)
            .single();

          if (existing) {
            // Update existing
            const { error } = await supabase
              .from('module_progress')
              .update({ bookmarked: !isBookmarked })
              .eq('id', existing.id);

            if (error) throw error;
          } else {
            // Insert new
            const { error } = await supabase.from('module_progress').insert({
              user_id: userId,
              module_type: moduleType,
              module_id: moduleId,
              completed: false,
              bookmarked: true,
            });

            if (error) throw error;
          }

          // Reload progress to sync
          await get().loadProgress(userId);
        } catch (err) {
          // Revert optimistic update
          set((state) => ({
            bookmarkedModules: isBookmarked
              ? [...state.bookmarkedModules, moduleId]
              : state.bookmarkedModules.filter((id) => id !== moduleId),
          }));
          const message = err instanceof Error ? err.message : 'Failed to toggle bookmark';
          set({ error: message });
        }
      },

      setSearchQuery: (query) => set({ searchQuery: query }),

      setSelectedType: (type) => set({ selectedType: type }),

      getFilteredModules: () => {
        const { searchQuery, selectedType } = get();
        let modules: ModuleGuideExtended[] = [];

        // Get modules by type
        if (selectedType === 'all') {
          modules = Object.values(ALL_MODULES).flat();
        } else {
          modules = ALL_MODULES[selectedType];
        }

        // Apply search filter
        if (searchQuery.trim()) {
          const results = searchModules(searchQuery);
          const resultIds = new Set(results.map((m) => m.id));
          modules = modules.filter((m) => resultIds.has(m.id));
        }

        return modules;
      },

      isModuleCompleted: (moduleId) => {
        const { progress } = get();
        return progress.some((p) => p.module_id === moduleId && p.completed);
      },

      isModuleBookmarked: (moduleId) => {
        const { bookmarkedModules } = get();
        return bookmarkedModules.includes(moduleId);
      },

      clearError: () => set({ error: null }),

      reset: () => set(initialState),
    }),
    {
      name: 'library-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: () => ({}), // Don't persist - reload fresh
    }
  )
);

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/services/supabase';
import { format, differenceInDays } from 'date-fns';
import type {
  CharacterMoment,
  CharacterTree,
  MomentType,
  TreeState,
} from '@/types/models';
import { CORE_TRAITS, getScenarioById } from '@/data/characterScenarios';

// =====================================================
// XP & Level Calculations
// =====================================================

const XP_PER_LEVEL = 100;
const BASE_XP_POSITIVE = 20;
const BASE_XP_STRUGGLE = -10;

// Streak bonus thresholds
const STREAK_BONUSES: { threshold: number; multiplier: number }[] = [
  { threshold: 30, multiplier: 2.0 },  // 30+ day streak = 2x XP
  { threshold: 14, multiplier: 1.5 },  // 14+ day streak = 1.5x XP
  { threshold: 7, multiplier: 1.25 },  // 7+ day streak = 1.25x XP
  { threshold: 3, multiplier: 1.1 },   // 3+ day streak = 1.1x XP
];

function getStreakMultiplier(streakDays: number): number {
  for (const bonus of STREAK_BONUSES) {
    if (streakDays >= bonus.threshold) {
      return bonus.multiplier;
    }
  }
  return 1.0;
}

function calculateXPChange(
  momentType: MomentType,
  difficultyMultiplier: number,
  daysSinceLastMoment: number | null,
  currentStreak: number = 0
): number {
  const baseXP = momentType === 'positive' ? BASE_XP_POSITIVE : BASE_XP_STRUGGLE;

  // Recency multiplier: more recent logging = more impact
  let recencyMultiplier = 1.0;
  if (daysSinceLastMoment !== null) {
    if (daysSinceLastMoment <= 1) recencyMultiplier = 1.2;
    else if (daysSinceLastMoment <= 3) recencyMultiplier = 1.0;
    else if (daysSinceLastMoment <= 7) recencyMultiplier = 0.8;
    else recencyMultiplier = 0.6;
  }

  // Streak multiplier (only for positive moments)
  const streakMultiplier = momentType === 'positive' ? getStreakMultiplier(currentStreak) : 1.0;

  return Math.round(baseXP * difficultyMultiplier * recencyMultiplier * streakMultiplier);
}

function calculateLevel(xp: number): number {
  if (xp < 0) return 1;
  return Math.min(10, Math.floor(xp / XP_PER_LEVEL) + 1);
}

export function calculateTreeState(
  tree: CharacterTree,
  recentMoments?: CharacterMoment[]
): TreeState {
  const today = new Date();
  const lastMomentDate = tree.last_moment_date ? new Date(tree.last_moment_date) : null;
  const daysSinceLastMoment = lastMomentDate
    ? differenceInDays(today, lastMomentDate)
    : null;

  // No activity in 14+ days = wilting
  if (daysSinceLastMoment === null || daysSinceLastMoment > 14) {
    return 'wilting';
  }

  // Calculate ratio from counts
  const total = tree.positive_count + tree.struggle_count;
  if (total === 0) return 'growing';

  const positiveRatio = tree.positive_count / total;

  if (positiveRatio < 0.3) return 'needs_attention';
  if (positiveRatio > 0.7 && tree.level >= 3) return 'thriving';
  return 'growing';
}

// =====================================================
// Store Interface
// =====================================================

interface CharacterState {
  // State
  trees: Record<string, CharacterTree>;
  recentMoments: CharacterMoment[];
  isLoading: boolean;
  error: string | null;

  // Quick Capture UI state
  isQuickCaptureOpen: boolean;
  lastLoggedMoment: CharacterMoment | null;

  // Actions
  loadTrees: (userId: string) => Promise<void>;
  loadRecentMoments: (userId: string, limit?: number) => Promise<void>;
  logMoment: (
    userId: string,
    traitId: string,
    momentType: MomentType,
    scenarioId: string,
    customNote?: string,
    currentStreak?: number
  ) => Promise<{ success: boolean; leveledUp: boolean; newLevel?: number; xpGained?: number }>;

  // UI Actions
  openQuickCapture: () => void;
  closeQuickCapture: () => void;
  clearLastLoggedMoment: () => void;

  // Helpers
  getTreeState: (traitId: string) => TreeState;
  getTreeForTrait: (traitId: string) => CharacterTree | null;

  // Reset
  reset: () => void;
}

// =====================================================
// Store Implementation
// =====================================================

export const useCharacterStore = create<CharacterState>()(
  persist(
    (set, get) => ({
      // Initial state
      trees: {},
      recentMoments: [],
      isLoading: false,
      error: null,
      isQuickCaptureOpen: false,
      lastLoggedMoment: null,

      // Load all trees for user
      loadTrees: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          const { data, error } = await supabase
            .from('character_trees')
            .select('*')
            .eq('user_id', userId);

          if (error) throw error;

          // Convert to record keyed by trait_id
          const treesMap: Record<string, CharacterTree> = {};
          (data || []).forEach((tree) => {
            treesMap[tree.trait_id] = tree;
          });

          set({ trees: treesMap, isLoading: false });
        } catch (error: any) {
          set({ error: error.message || 'Failed to load trees', isLoading: false });
        }
      },

      // Load recent moments
      loadRecentMoments: async (userId: string, limit = 50) => {
        try {
          const { data, error } = await supabase
            .from('character_moments')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(limit);

          if (error) throw error;
          set({ recentMoments: data || [] });
        } catch (error: any) {
          console.error('Failed to load moments:', error);
        }
      },

      // Log a character moment
      logMoment: async (userId, traitId, momentType, scenarioId, customNote, currentStreak = 0) => {
        set({ isLoading: true, error: null });

        try {
          const scenario = getScenarioById(scenarioId);
          const difficultyMultiplier = scenario?.difficulty || 1;
          const today = format(new Date(), 'yyyy-MM-dd');

          // Get or create tree for this trait
          let tree = get().trees[traitId];
          let isNewTree = false;

          if (!tree) {
            // Create new tree
            const { data: newTree, error: createError } = await supabase
              .from('character_trees')
              .insert({
                user_id: userId,
                trait_id: traitId,
                current_xp: 0,
                level: 1,
                positive_count: 0,
                struggle_count: 0,
              })
              .select()
              .single();

            if (createError) throw createError;
            tree = newTree;
            isNewTree = true;
          }

          // Calculate XP change
          const daysSinceLastMoment = tree.last_moment_date
            ? differenceInDays(new Date(), new Date(tree.last_moment_date))
            : null;

          const xpChange = calculateXPChange(momentType, difficultyMultiplier, daysSinceLastMoment, currentStreak);
          const newXP = Math.max(0, tree.current_xp + xpChange);
          const oldLevel = tree.level;
          const newLevel = calculateLevel(newXP);
          const leveledUp = newLevel > oldLevel;

          // Insert moment
          const { data: moment, error: momentError } = await supabase
            .from('character_moments')
            .insert({
              user_id: userId,
              trait_id: traitId,
              moment_type: momentType,
              scenario_id: scenarioId,
              custom_note: customNote || null,
              difficulty_multiplier: difficultyMultiplier,
            })
            .select()
            .single();

          if (momentError) throw momentError;

          // Update tree
          const updateData = {
            current_xp: newXP,
            level: newLevel,
            last_moment_date: today,
            positive_count: momentType === 'positive' ? tree.positive_count + 1 : tree.positive_count,
            struggle_count: momentType === 'struggle' ? tree.struggle_count + 1 : tree.struggle_count,
            updated_at: new Date().toISOString(),
          };

          const { data: updatedTree, error: updateError } = await supabase
            .from('character_trees')
            .update(updateData)
            .eq('id', tree.id)
            .select()
            .single();

          if (updateError) throw updateError;

          // Update local state
          set((state) => ({
            trees: { ...state.trees, [traitId]: updatedTree },
            recentMoments: [moment, ...state.recentMoments.slice(0, 49)],
            lastLoggedMoment: moment,
            isLoading: false,
          }));

          return {
            success: true,
            leveledUp,
            newLevel: leveledUp ? newLevel : undefined,
            xpGained: momentType === 'positive' ? xpChange : undefined,
          };
        } catch (error: any) {
          set({ error: error.message || 'Failed to log moment', isLoading: false });
          return { success: false, leveledUp: false };
        }
      },

      // UI Actions
      openQuickCapture: () => set({ isQuickCaptureOpen: true }),
      closeQuickCapture: () => set({ isQuickCaptureOpen: false }),
      clearLastLoggedMoment: () => set({ lastLoggedMoment: null }),

      // Get tree state for a trait
      getTreeState: (traitId: string) => {
        const tree = get().trees[traitId];
        if (!tree) return 'wilting';
        return calculateTreeState(tree);
      },

      // Get tree for trait
      getTreeForTrait: (traitId: string) => {
        return get().trees[traitId] || null;
      },

      // Reset
      reset: () =>
        set({
          trees: {},
          recentMoments: [],
          isLoading: false,
          error: null,
          isQuickCaptureOpen: false,
          lastLoggedMoment: null,
        }),
    }),
    {
      name: 'character-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        trees: state.trees,
      }),
    }
  )
);

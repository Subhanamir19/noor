import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/services/supabase';
import { format } from 'date-fns';
import type { DailyTask, DailyFeedbackRating } from '@/types/models';
import {
  getTaskById,
  selectTasksForToday,
  calculateRecommendedTaskCount,
} from '@/data/dailyTasks';

// New structure: Day Tasks + Nice to Have
interface TodaysTasks {
  dayTasks: DailyTask[];
  niceToHaveTasks: DailyTask[];
}

interface DailyTasksState {
  // Today's curated tasks (new structure)
  todaysTasks: TodaysTasks;

  // Today's completions
  todayCompletions: Record<string, boolean>; // task_id -> completed
  completionPercentage: number;

  // User preferences
  preferredDayTaskCount: number; // 2-3
  preferredNiceToHaveCount: number; // 2-4
  childAge: 'baby' | 'toddler' | 'child' | 'all';

  // Feedback history (last 7 days)
  recentFeedback: Array<{
    date: string;
    rating: DailyFeedbackRating;
    tasksCompleted: number;
    tasksAssigned: number;
  }>;

  // Loading state
  isLoading: boolean;
  error: string | null;

  // Actions
  loadTodaysTasks: (userId: string) => Promise<void>;
  loadTodayCompletions: (userId: string) => Promise<void>;
  completeTask: (userId: string, taskId: string) => Promise<void>;
  uncompleteTask: (userId: string, taskId: string) => Promise<void>;
  submitDailyFeedback: (userId: string, rating: DailyFeedbackRating) => Promise<void>;
  setChildAge: (age: 'baby' | 'toddler' | 'child' | 'all') => void;
  refreshTasks: (userId: string) => Promise<void>;

  // Helpers
  getAllTodaysTasks: () => DailyTask[];
  getCompletedCount: () => number;
  getTotalCount: () => number;
  isTaskCompleted: (taskId: string) => boolean;
  hasFeedbackForToday: () => boolean;

  reset: () => void;
}

export const useDailyTasksStore = create<DailyTasksState>()(
  persist(
    (set, get) => ({
      // Initial state
      todaysTasks: {
        dayTasks: [],
        niceToHaveTasks: [],
      },
      todayCompletions: {},
      completionPercentage: 0,
      preferredDayTaskCount: 3,
      preferredNiceToHaveCount: 4,
      childAge: 'all',
      recentFeedback: [],
      isLoading: false,
      error: null,

      // Load today's curated tasks
      loadTodaysTasks: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          const state = get();
          const today = format(new Date(), 'yyyy-MM-dd');

          // Check if we already have tasks for today
          const { data: existingSelection } = await supabase
            .from('daily_task_selections')
            .select('*')
            .eq('user_id', userId)
            .eq('selection_date', today)
            .single();

          if (existingSelection) {
            // Load existing selection using legacy schema fields
            // Day Tasks: primary_task_id, quick_win_task_id, bonus_task_id (repurposed for 3rd day task)
            // Nice to Have: stored in optional_task_ids array
            const dayTaskIds: string[] = [
              existingSelection.primary_task_id,
              existingSelection.quick_win_task_id,
              existingSelection.bonus_task_id,
            ].filter(Boolean);

            const niceToHaveIds: string[] = (existingSelection.optional_task_ids || []).slice(0, 4);

            const dayTasks = dayTaskIds
              .map((id: string) => getTaskById(id))
              .filter((t: DailyTask | undefined): t is DailyTask => t !== undefined);

            const niceToHaveTasks = niceToHaveIds
              .map((id: string) => getTaskById(id))
              .filter((t: DailyTask | undefined): t is DailyTask => t !== undefined);

            // If older data is incomplete/out-of-date, deterministically fill to 3 + 4 and persist.
            const needsFill = dayTasks.length < 3 || niceToHaveTasks.length < 4;
            if (needsFill) {
              const recentCompletedIds = await getRecentlyCompletedTaskIds(userId);
              const selection = selectTasksForToday(
                state.childAge,
                3,
                4,
                recentCompletedIds,
                `${userId}|${today}`
              );

              const filledDayTasks: DailyTask[] = [];
              for (const t of [...dayTasks, ...selection.dayTasks]) {
                if (!t || filledDayTasks.some((x) => x.id === t.id)) continue;
                filledDayTasks.push(t);
                if (filledDayTasks.length === 3) break;
              }

              const filledNiceToHave: DailyTask[] = [];
              for (const t of [...niceToHaveTasks, ...selection.niceToHaveTasks]) {
                if (!t || filledNiceToHave.some((x) => x.id === t.id)) continue;
                filledNiceToHave.push(t);
                if (filledNiceToHave.length === 4) break;
              }

              await supabase.from('daily_task_selections').upsert(
                {
                  user_id: userId,
                  selection_date: today,
                  primary_task_id: filledDayTasks[0]?.id || '',
                  quick_win_task_id: filledDayTasks[1]?.id || '',
                  bonus_task_id: filledDayTasks[2]?.id || '',
                  optional_task_ids: filledNiceToHave.map((t) => t.id),
                  task_count: filledDayTasks.length + filledNiceToHave.length,
                },
                { onConflict: 'user_id,selection_date' }
              );

              set({
                todaysTasks: { dayTasks: filledDayTasks, niceToHaveTasks: filledNiceToHave },
                isLoading: false,
              });
            } else {
            set({
              todaysTasks: {
                dayTasks,
                niceToHaveTasks,
              },
              isLoading: false,
            });
            }
          } else {
            // Generate new selection for today
            const recentCompletedIds = await getRecentlyCompletedTaskIds(userId);
            const selection = selectTasksForToday(
              state.childAge,
              state.preferredDayTaskCount,
              state.preferredNiceToHaveCount,
              recentCompletedIds,
              `${userId}|${today}`
            );

            // Save selection to database using legacy schema
            // Day Tasks (3): primary_task_id, quick_win_task_id, bonus_task_id
            // Nice to Have (4): optional_task_ids array
            await supabase.from('daily_task_selections').insert({
              user_id: userId,
              selection_date: today,
              primary_task_id: selection.dayTasks[0]?.id || '',
              quick_win_task_id: selection.dayTasks[1]?.id || '',
              bonus_task_id: selection.dayTasks[2]?.id || '',
              optional_task_ids: selection.niceToHaveTasks.map((t) => t.id),
              task_count: selection.dayTasks.length + selection.niceToHaveTasks.length,
            });

            set({
              todaysTasks: selection,
              isLoading: false,
            });
          }

          // Load completions
          await get().loadTodayCompletions(userId);
        } catch (error: any) {
          console.error('Failed to load tasks:', error);
          set({
            error: error.message || 'Failed to load tasks',
            isLoading: false,
          });
        }
      },

      // Load today's completions
      loadTodayCompletions: async (userId: string) => {
        try {
          const today = format(new Date(), 'yyyy-MM-dd');

          const { data, error } = await supabase
            .from('daily_task_completions')
            .select('task_id')
            .eq('user_id', userId)
            .eq('completion_date', today);

          if (error) throw error;

          const completions: Record<string, boolean> = {};
          (data || []).forEach((d) => {
            completions[d.task_id] = true;
          });

          const state = get();
          const allTasks = state.getAllTodaysTasks();
          const completedCount = allTasks.filter((t) => completions[t.id]).length;
          const percentage =
            allTasks.length > 0 ? Math.round((completedCount / allTasks.length) * 100) : 0;

          set({
            todayCompletions: completions,
            completionPercentage: percentage,
          });
        } catch (error: any) {
          console.error('Failed to load completions:', error);
        }
      },

      // Complete a task
      completeTask: async (userId: string, taskId: string) => {
        try {
          const today = format(new Date(), 'yyyy-MM-dd');

          const { error } = await supabase.from('daily_task_completions').upsert(
            {
              user_id: userId,
              task_id: taskId,
              completion_date: today,
            },
            { onConflict: 'user_id,task_id,completion_date' }
          );

          if (error) throw error;

          set((state) => {
            const newCompletions = { ...state.todayCompletions, [taskId]: true };
            const allTasks = state.getAllTodaysTasks();
            const completedCount = allTasks.filter((t) => newCompletions[t.id]).length;
            const percentage =
              allTasks.length > 0 ? Math.round((completedCount / allTasks.length) * 100) : 0;

            return {
              todayCompletions: newCompletions,
              completionPercentage: percentage,
            };
          });
        } catch (error: any) {
          set({ error: error.message || 'Failed to complete task' });
        }
      },

      // Uncomplete a task
      uncompleteTask: async (userId: string, taskId: string) => {
        try {
          const today = format(new Date(), 'yyyy-MM-dd');

          const { error } = await supabase
            .from('daily_task_completions')
            .delete()
            .eq('user_id', userId)
            .eq('task_id', taskId)
            .eq('completion_date', today);

          if (error) throw error;

          set((state) => {
            const newCompletions = { ...state.todayCompletions };
            delete newCompletions[taskId];

            const allTasks = state.getAllTodaysTasks();
            const completedCount = allTasks.filter((t) => newCompletions[t.id]).length;
            const percentage =
              allTasks.length > 0 ? Math.round((completedCount / allTasks.length) * 100) : 0;

            return {
              todayCompletions: newCompletions,
              completionPercentage: percentage,
            };
          });
        } catch (error: any) {
          set({ error: error.message || 'Failed to uncomplete task' });
        }
      },

      // Submit daily feedback
      submitDailyFeedback: async (userId: string, rating: DailyFeedbackRating) => {
        try {
          const today = format(new Date(), 'yyyy-MM-dd');
          const state = get();
          const allTasks = state.getAllTodaysTasks();
          const completedCount = allTasks.filter((t) => state.todayCompletions[t.id]).length;

          // Save to database
          await supabase.from('daily_feedback').upsert(
            {
              user_id: userId,
              feedback_date: today,
              tasks_completed: completedCount,
              tasks_assigned: allTasks.length,
              rating,
            },
            { onConflict: 'user_id,feedback_date' }
          );

          // Update local feedback history
          const newFeedback = {
            date: today,
            rating,
            tasksCompleted: completedCount,
            tasksAssigned: allTasks.length,
          };

          const updatedFeedback = [
            ...state.recentFeedback.filter((f) => f.date !== today),
            newFeedback,
          ].slice(-7); // Keep last 7 days

          // Keep the daily deck stable: 3 must-to-do + 4 nice-to-have.
          const newPreferredCount = calculateRecommendedTaskCount(
            updatedFeedback.map((f) => ({
              rating: f.rating,
              tasksCompleted: f.tasksCompleted,
            }))
          );

          set({
            recentFeedback: updatedFeedback,
            preferredDayTaskCount: 3,
            preferredNiceToHaveCount: 4,
          });

          // Save preference to database
          await supabase.from('user_task_preferences').upsert(
            {
              user_id: userId,
              preferred_task_count: newPreferredCount,
              last_updated: new Date().toISOString(),
            },
            { onConflict: 'user_id' }
          );
        } catch (error: any) {
          console.error('Failed to submit feedback:', error);
          set({ error: error.message || 'Failed to submit feedback' });
        }
      },

      // Set child age
      setChildAge: (age) => {
        set({ childAge: age });
      },

      // Refresh tasks (force regeneration)
      refreshTasks: async (userId: string) => {
        // Refresh should re-fetch today's selection + completions without changing the set.
        await get().loadTodaysTasks(userId);
      },

      // Get all today's tasks as array
      getAllTodaysTasks: () => {
        const state = get();
        return [
          ...state.todaysTasks.dayTasks,
          ...state.todaysTasks.niceToHaveTasks,
        ];
      },

      // Get completed count
      getCompletedCount: () => {
        const state = get();
        const allTasks = state.getAllTodaysTasks();
        return allTasks.filter((t) => state.todayCompletions[t.id]).length;
      },

      // Get total count
      getTotalCount: () => {
        const state = get();
        return state.getAllTodaysTasks().length;
      },

      // Check if task is completed
      isTaskCompleted: (taskId) => {
        const state = get();
        return !!state.todayCompletions[taskId];
      },

      // Check if user has submitted feedback for today
      hasFeedbackForToday: () => {
        const state = get();
        const today = format(new Date(), 'yyyy-MM-dd');
        return state.recentFeedback.some((f) => f.date === today);
      },

      // Reset state
      reset: () =>
        set({
          todaysTasks: {
            dayTasks: [],
            niceToHaveTasks: [],
          },
          todayCompletions: {},
          completionPercentage: 0,
          preferredDayTaskCount: 3,
          preferredNiceToHaveCount: 4,
          recentFeedback: [],
          isLoading: false,
          error: null,
        }),
    }),
    {
      name: 'daily-tasks-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        preferredDayTaskCount: state.preferredDayTaskCount,
        preferredNiceToHaveCount: state.preferredNiceToHaveCount,
        childAge: state.childAge,
        recentFeedback: state.recentFeedback,
      }),
    }
  )
);

// Helper to get recently completed task IDs (last 7 days)
async function getRecentlyCompletedTaskIds(userId: string): Promise<string[]> {
  const sevenDaysAgo = format(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    'yyyy-MM-dd'
  );

  const { data } = await supabase
    .from('daily_task_completions')
    .select('task_id')
    .eq('user_id', userId)
    .gte('completion_date', sevenDaysAgo);

  return (data || []).map((d) => d.task_id);
}

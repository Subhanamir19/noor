import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/services/supabase';
import type {
  CoachingIntervention,
  CoachingChallenge,
  InterventionType,
} from '@/types/models';
import {
  analyzeForIntervention,
  calculateWellnessScore,
  getPersonalizedTips,
  type InterventionTrigger,
} from '@/services/coachingEngine';
import { useCharacterStore } from './characterStore';

interface CoachingState {
  // Current pending intervention to show
  pendingIntervention: InterventionTrigger | null;
  // Active challenges
  activeChallenges: CoachingChallenge[];
  // Recent interventions (for cooldown tracking)
  recentInterventions: CoachingIntervention[];
  // Wellness score (0-100)
  wellnessScore: number;
  // Personalized tips
  tips: string[];
  // Loading state
  isLoading: boolean;
  // Modal visibility
  isInterventionModalVisible: boolean;

  // Actions
  loadCoachingData: (userId: string) => Promise<void>;
  checkForIntervention: (userId: string) => Promise<InterventionTrigger | null>;
  showIntervention: (trigger: InterventionTrigger) => void;
  dismissIntervention: () => void;
  acceptIntervention: (
    userId: string,
    trigger: InterventionTrigger
  ) => Promise<boolean>;
  declineIntervention: (
    userId: string,
    trigger: InterventionTrigger
  ) => Promise<void>;
  completeChallenge: (challengeId: string) => Promise<boolean>;
  refreshWellness: (userId: string) => Promise<void>;
}

export const useCoachingStore = create<CoachingState>()(
  persist(
    (set, get) => ({
      pendingIntervention: null,
      activeChallenges: [],
      recentInterventions: [],
      wellnessScore: 50,
      tips: [],
      isLoading: false,
      isInterventionModalVisible: false,

      loadCoachingData: async (userId: string) => {
        set({ isLoading: true });

        try {
          // Load recent interventions (last 7 days)
          const sevenDaysAgo = new Date();
          sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

          const { data: interventions } = await supabase
            .from('coaching_interventions')
            .select('*')
            .eq('user_id', userId)
            .gte('delivered_at', sevenDaysAgo.toISOString())
            .order('delivered_at', { ascending: false });

          // Load active challenges (not expired, not completed)
          const { data: challenges } = await supabase
            .from('coaching_challenges')
            .select('*')
            .eq('user_id', userId)
            .eq('completed', false)
            .gte('expires_at', new Date().toISOString())
            .order('started_at', { ascending: false });

          set({
            recentInterventions: interventions || [],
            activeChallenges: challenges || [],
            isLoading: false,
          });

          // Calculate wellness score
          await get().refreshWellness(userId);
        } catch (error) {
          console.error('Error loading coaching data:', error);
          set({ isLoading: false });
        }
      },

      checkForIntervention: async (userId: string) => {
        const characterStore = useCharacterStore.getState();
        const { recentInterventions } = get();

        const trigger = analyzeForIntervention({
          userId,
          trees: characterStore.trees,
          recentMoments: characterStore.recentMoments,
          recentInterventions,
        });

        if (trigger) {
          set({ pendingIntervention: trigger });
        }

        return trigger;
      },

      showIntervention: (trigger: InterventionTrigger) => {
        set({
          pendingIntervention: trigger,
          isInterventionModalVisible: true,
        });
      },

      dismissIntervention: () => {
        set({
          isInterventionModalVisible: false,
        });
        // Clear pending after animation
        setTimeout(() => {
          set({ pendingIntervention: null });
        }, 300);
      },

      acceptIntervention: async (
        userId: string,
        trigger: InterventionTrigger
      ): Promise<boolean> => {
        try {
          // Record the intervention
          const { data: intervention, error: intError } = await supabase
            .from('coaching_interventions')
            .insert({
              user_id: userId,
              trait_id: trigger.traitId,
              intervention_type: trigger.type,
              script_id: trigger.script.id,
              delivered_at: new Date().toISOString(),
              accepted: true,
            })
            .select()
            .single();

          if (intError) throw intError;

          // Create challenge if script has one
          if (trigger.script.challenge) {
            const expiresAt = new Date();
            expiresAt.setHours(
              expiresAt.getHours() + trigger.script.challenge.durationHours
            );

            const { data: challenge, error: chalError } = await supabase
              .from('coaching_challenges')
              .insert({
                user_id: userId,
                trait_id: trigger.traitId,
                challenge_text: trigger.script.challenge.text,
                started_at: new Date().toISOString(),
                expires_at: expiresAt.toISOString(),
                completed: false,
              })
              .select()
              .single();

            if (!chalError && challenge) {
              set((state) => ({
                activeChallenges: [challenge, ...state.activeChallenges],
              }));
            }
          }

          // Update recent interventions
          if (intervention) {
            set((state) => ({
              recentInterventions: [intervention, ...state.recentInterventions],
            }));
          }

          get().dismissIntervention();
          return true;
        } catch (error) {
          console.error('Error accepting intervention:', error);
          return false;
        }
      },

      declineIntervention: async (
        userId: string,
        trigger: InterventionTrigger
      ) => {
        try {
          // Still record the intervention, but mark as not accepted
          const { data: intervention } = await supabase
            .from('coaching_interventions')
            .insert({
              user_id: userId,
              trait_id: trigger.traitId,
              intervention_type: trigger.type,
              script_id: trigger.script.id,
              delivered_at: new Date().toISOString(),
              accepted: false,
            })
            .select()
            .single();

          if (intervention) {
            set((state) => ({
              recentInterventions: [intervention, ...state.recentInterventions],
            }));
          }
        } catch (error) {
          console.error('Error declining intervention:', error);
        }

        get().dismissIntervention();
      },

      completeChallenge: async (challengeId: string): Promise<boolean> => {
        try {
          const { error } = await supabase
            .from('coaching_challenges')
            .update({
              completed: true,
              completed_at: new Date().toISOString(),
            })
            .eq('id', challengeId);

          if (error) throw error;

          // Also update the related intervention
          const challenge = get().activeChallenges.find(
            (c) => c.id === challengeId
          );
          if (challenge) {
            await supabase
              .from('coaching_interventions')
              .update({
                challenge_completed: true,
                challenge_completed_at: new Date().toISOString(),
              })
              .eq('user_id', challenge.user_id)
              .eq('trait_id', challenge.trait_id)
              .order('delivered_at', { ascending: false })
              .limit(1);
          }

          // Remove from active challenges
          set((state) => ({
            activeChallenges: state.activeChallenges.filter(
              (c) => c.id !== challengeId
            ),
          }));

          return true;
        } catch (error) {
          console.error('Error completing challenge:', error);
          return false;
        }
      },

      refreshWellness: async (userId: string) => {
        const characterStore = useCharacterStore.getState();

        const score = calculateWellnessScore(
          characterStore.trees,
          characterStore.recentMoments
        );

        const tips = getPersonalizedTips(
          characterStore.trees,
          characterStore.recentMoments
        );

        set({ wellnessScore: score, tips });
      },
    }),
    {
      name: 'noor-coaching-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // Only persist minimal data, rest loaded from server
        wellnessScore: state.wellnessScore,
        tips: state.tips,
      }),
    }
  )
);

/**
 * Hook to check for intervention after logging a moment
 * Should be called after characterStore.logMoment
 */
export async function checkInterventionAfterMoment(userId: string): Promise<void> {
  const coachingStore = useCoachingStore.getState();

  // Small delay to let character store update
  await new Promise((resolve) => setTimeout(resolve, 500));

  const trigger = await coachingStore.checkForIntervention(userId);
  if (trigger) {
    // Show intervention after a brief pause (don't interrupt success animation)
    setTimeout(() => {
      coachingStore.showIntervention(trigger);
    }, 2000);
  }
}

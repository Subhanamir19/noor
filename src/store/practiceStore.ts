import { create } from 'zustand';
import { supabase } from '@/services/supabase';
import type { TraitPracticeSession } from '@/types/models';
import type { TraitPractice } from '@/data/traitPractices';

function isMissingPracticeSessionsTable(err: any): boolean {
  const message = typeof err?.message === 'string' ? err.message : '';
  const details = typeof err?.details === 'string' ? err.details : '';
  const hint = typeof err?.hint === 'string' ? err.hint : '';
  const haystack = `${message}\n${details}\n${hint}`.toLowerCase();

  return (
    err?.code === '42P01' ||
    err?.code === 'PGRST106' ||
    (haystack.includes('trait_practice_sessions') && haystack.includes('schema cache')) ||
    (haystack.includes('trait_practice_sessions') && haystack.includes('could not find the table'))
  );
}

function makeLocalSession(userId: string, practice: TraitPractice): TraitPracticeSession {
  const now = new Date().toISOString();
  const rand = Math.random().toString(16).slice(2);
  return {
    id: `local_${practice.traitId}_${Date.now()}_${rand}`,
    user_id: userId,
    trait_id: practice.traitId,
    practice_id: practice.id,
    practice_payload: practice as any,
    status: 'active',
    started_at: now,
    ended_at: null,
    reflection_note: null,
    created_at: now,
    updated_at: now,
  };
}

function findActiveBySessionId(
  activeByTraitId: Record<string, TraitPracticeSession | null>,
  sessionId: string
): { traitId: string; session: TraitPracticeSession } | null {
  for (const traitId of Object.keys(activeByTraitId)) {
    const session = activeByTraitId[traitId];
    if (session?.id === sessionId) return { traitId, session };
  }
  return null;
}

interface PracticeState {
  activeByTraitId: Record<string, TraitPracticeSession | null>;
  isLoading: boolean;
  error: string | null;

  loadActiveForTrait: (userId: string, traitId: string) => Promise<TraitPracticeSession | null>;
  startPractice: (userId: string, practice: TraitPractice) => Promise<TraitPracticeSession | null>;
  completePractice: (sessionId: string, reflectionNote?: string) => Promise<boolean>;
  abandonPractice: (sessionId: string) => Promise<boolean>;
  clearError: () => void;
  reset: () => void;
}

export const usePracticeStore = create<PracticeState>()((set, get) => ({
  activeByTraitId: {},
  isLoading: false,
  error: null,

  loadActiveForTrait: async (userId: string, traitId: string) => {
    if (!userId || !traitId) return null;

    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('trait_practice_sessions')
        .select('*')
        .eq('user_id', userId)
        .eq('trait_id', traitId)
        .eq('status', 'active')
        .order('started_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      const session = (data as TraitPracticeSession) || null;
      set((state) => ({
        activeByTraitId: { ...state.activeByTraitId, [traitId]: session },
        isLoading: false,
      }));
      return session;
    } catch (err: any) {
      if (isMissingPracticeSessionsTable(err)) {
        const local = get().activeByTraitId[traitId] || null;
        set({ isLoading: false, error: null });
        return local;
      }
      set({
        error: err?.message || 'Failed to load active practice',
        isLoading: false,
      });
      return null;
    }
  },

  startPractice: async (userId: string, practice: TraitPractice) => {
    if (!userId) return null;

    set({ isLoading: true, error: null });
    try {
      // End any existing active session for this trait.
      await supabase
        .from('trait_practice_sessions')
        .update({
          status: 'abandoned',
          ended_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .eq('trait_id', practice.traitId)
        .eq('status', 'active');

      const { data, error } = await supabase
        .from('trait_practice_sessions')
        .insert({
          user_id: userId,
          trait_id: practice.traitId,
          practice_id: practice.id,
          practice_payload: practice,
          status: 'active',
          started_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      const session = data as TraitPracticeSession;
      set((state) => ({
        activeByTraitId: { ...state.activeByTraitId, [practice.traitId]: session },
        isLoading: false,
      }));
      return session;
    } catch (err: any) {
      if (isMissingPracticeSessionsTable(err)) {
        const localSession = makeLocalSession(userId, practice);
        set((state) => ({
          activeByTraitId: { ...state.activeByTraitId, [practice.traitId]: localSession },
          isLoading: false,
          error: null,
        }));
        return localSession;
      }
      set({
        error: err?.message || 'Failed to start practice',
        isLoading: false,
      });
      return null;
    }
  },

  completePractice: async (sessionId: string, reflectionNote?: string) => {
    if (!sessionId) return false;
    set({ isLoading: true, error: null });
    try {
      if (sessionId.startsWith('local_')) {
        const match = findActiveBySessionId(get().activeByTraitId, sessionId);
        if (!match) {
          set({ isLoading: false });
          return false;
        }
        set((state) => ({
          activeByTraitId: { ...state.activeByTraitId, [match.traitId]: null },
          isLoading: false,
        }));
        return true;
      }

      const { data, error } = await supabase
        .from('trait_practice_sessions')
        .update({
          status: 'completed',
          ended_at: new Date().toISOString(),
          reflection_note: reflectionNote?.trim() || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', sessionId)
        .select()
        .single();

      if (error) throw error;

      const updated = data as TraitPracticeSession;
      set((state) => ({
        activeByTraitId: { ...state.activeByTraitId, [updated.trait_id]: null },
        isLoading: false,
      }));
      return true;
    } catch (err: any) {
      if (isMissingPracticeSessionsTable(err)) {
        const match = findActiveBySessionId(get().activeByTraitId, sessionId);
        if (match) {
          set((state) => ({
            activeByTraitId: { ...state.activeByTraitId, [match.traitId]: null },
            isLoading: false,
            error: null,
          }));
          return true;
        }
        set({ isLoading: false, error: null });
        return false;
      }
      set({
        error: err?.message || 'Failed to complete practice',
        isLoading: false,
      });
      return false;
    }
  },

  abandonPractice: async (sessionId: string) => {
    if (!sessionId) return false;
    set({ isLoading: true, error: null });
    try {
      if (sessionId.startsWith('local_')) {
        const match = findActiveBySessionId(get().activeByTraitId, sessionId);
        if (!match) {
          set({ isLoading: false });
          return false;
        }
        set((state) => ({
          activeByTraitId: { ...state.activeByTraitId, [match.traitId]: null },
          isLoading: false,
        }));
        return true;
      }

      const { data, error } = await supabase
        .from('trait_practice_sessions')
        .update({
          status: 'abandoned',
          ended_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', sessionId)
        .select()
        .single();

      if (error) throw error;
      const updated = data as TraitPracticeSession;

      set((state) => ({
        activeByTraitId: { ...state.activeByTraitId, [updated.trait_id]: null },
        isLoading: false,
      }));
      return true;
    } catch (err: any) {
      if (isMissingPracticeSessionsTable(err)) {
        const match = findActiveBySessionId(get().activeByTraitId, sessionId);
        if (match) {
          set((state) => ({
            activeByTraitId: { ...state.activeByTraitId, [match.traitId]: null },
            isLoading: false,
            error: null,
          }));
          return true;
        }
        set({ isLoading: false, error: null });
        return false;
      }
      set({
        error: err?.message || 'Failed to abandon practice',
        isLoading: false,
      });
      return false;
    }
  },

  clearError: () => set({ error: null }),

  reset: () =>
    set({
      activeByTraitId: {},
      isLoading: false,
      error: null,
    }),
}));

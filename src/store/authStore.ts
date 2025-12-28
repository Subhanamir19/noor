import { create } from 'zustand';
import { supabase, getCurrentUserProfile } from '@/services/supabase';
import { User, UserProfile } from '@/types/models';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isInitialized: boolean;
  isLoading: boolean;
  error: string | null;

  initialize: () => Promise<void>;
  signInAnonymously: () => Promise<void>;
  loadProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  resetOnboarding: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  profile: null,
  isInitialized: false,
  isLoading: false,
  error: null,

  initialize: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        set({
          user: {
            id: session.user.id,
            email: session.user.email ?? null,
            isAnonymous: session.user.is_anonymous ?? true,
          },
        });
        await get().loadProfile();
      } else {
        await get().signInAnonymously();
      }
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ isInitialized: true, isLoading: false });
    }
  },

  signInAnonymously: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInAnonymously();

      if (error) throw error;
      if (!data.user) throw new Error('Anonymous sign-in failed');

      set({
        user: {
          id: data.user.id,
          email: null,
          isAnonymous: true,
        },
      });

      await get().loadProfile();
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  loadProfile: async () => {
    const { user } = get();
    if (!user) return;

    try {
      const profile = await getCurrentUserProfile();
      set({ profile });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  updateProfile: async (data: Partial<UserProfile>) => {
    const { user } = get();
    if (!user) throw new Error('No user logged in');

    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) throw error;

      await get().loadProfile();
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  resetOnboarding: async () => {
    const { user } = get();
    if (!user) throw new Error('No user logged in');

    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ onboarding_completed: false })
        .eq('id', user.id);

      if (error) throw error;

      await get().loadProfile();
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

// Listen to auth state changes
supabase.auth.onAuthStateChange((event, session) => {
  const store = useAuthStore.getState();

  if (event === 'SIGNED_IN' && session?.user) {
    useAuthStore.setState({
      user: {
        id: session.user.id,
        email: session.user.email ?? null,
        isAnonymous: session.user.is_anonymous ?? true,
      },
    });
    store.loadProfile();
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({
      user: null,
      profile: null,
    });
  }
});

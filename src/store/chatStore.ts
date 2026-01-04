import { create } from 'zustand';

import {
  clearChatHistory,
  getChatHistory,
  sendChatMessage,
} from '@/services/openai';
import type { ChatMessage } from '@/types/models';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_HISTORY_LIMIT = 50;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ChatState {
  // Data
  messages: ChatMessage[];

  // UI State
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;

  // Actions
  loadHistory: (userId: string) => Promise<void>;
  sendMessage: (userId: string, message: string) => Promise<void>;
  clearHistory: (userId: string) => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

// ---------------------------------------------------------------------------
// Initial State
// ---------------------------------------------------------------------------

const initialState = {
  messages: [] as ChatMessage[],
  isLoading: false,
  isTyping: false,
  error: null as string | null,
};

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------

export const useChatStore = create<ChatState>((set, get) => ({
  ...initialState,

  /**
   * Load chat history from database.
   * Called on screen mount to restore previous conversation.
   */
  loadHistory: async (userId: string) => {
    set({ isLoading: true, error: null });

    try {
      const history = await getChatHistory(userId, DEFAULT_HISTORY_LIMIT);
      set({ messages: history, isLoading: false });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load chat';
      set({ error: message, isLoading: false });
    }
  },

  /**
   * Send a message and receive AI response.
   * Uses optimistic UI update for immediate feedback.
   */
  sendMessage: async (userId: string, message: string) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    // Create optimistic user message for immediate UI feedback
    const tempId = `temp-${Date.now()}`;
    const optimisticMessage: ChatMessage = {
      id: tempId,
      user_id: userId,
      role: 'user',
      content: trimmedMessage,
      created_at: new Date().toISOString(),
    };

    // Show optimistic update and typing indicator
    set((state) => ({
      messages: [...state.messages, optimisticMessage],
      isTyping: true,
      error: null,
    }));

    try {
      // Send to API (persists both messages to DB)
      const { response, userMessageId, assistantMessageId } =
        await sendChatMessage({
          userId,
          message: trimmedMessage,
          includeContext: true,
        });

      // Replace optimistic message with real data and add assistant response
      set((state) => {
        // Remove the temp message
        const withoutTemp = state.messages.filter((m) => m.id !== tempId);

        // Add real messages
        const userMessage: ChatMessage = {
          id: userMessageId,
          user_id: userId,
          role: 'user',
          content: trimmedMessage,
          created_at: new Date().toISOString(),
        };

        const assistantMessage: ChatMessage = {
          id: assistantMessageId,
          user_id: userId,
          role: 'assistant',
          content: response,
          created_at: new Date().toISOString(),
        };

        return {
          messages: [...withoutTemp, userMessage, assistantMessage],
          isTyping: false,
        };
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to send message';

      // Remove optimistic message on failure
      set((state) => ({
        messages: state.messages.filter((m) => m.id !== tempId),
        error: errorMessage,
        isTyping: false,
      }));
    }
  },

  /**
   * Clear all chat history for the user.
   * Useful for privacy or fresh start.
   */
  clearHistory: async (userId: string) => {
    set({ isLoading: true, error: null });

    try {
      await clearChatHistory(userId);
      set({ messages: [], isLoading: false });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Failed to clear chat';
      set({ error: message, isLoading: false });
    }
  },

  /**
   * Clear the current error state.
   */
  clearError: () => set({ error: null }),

  /**
   * Reset store to initial state.
   * Called on logout or when switching users.
   */
  reset: () => set(initialState),
}));

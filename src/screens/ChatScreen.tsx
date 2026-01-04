import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import {
  MessageBubble,
  SuggestionChips,
  TypingIndicator,
  WelcomeMessage,
} from '@/components/chat';
import type { Suggestion } from '@/components/chat';
import type { MainTabParamList } from '@/navigation/types';
import { useAuthStore } from '@/store/authStore';
import { useChatStore } from '@/store/chatStore';
import type { ChatMessage } from '@/types/models';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SUGGESTIONS: Suggestion[] = [
  {
    id: 'bedtime',
    label: 'Bedtime tips',
    message: "Can you help me with bedtime? My child won't sleep.",
  },
  {
    id: 'yelling',
    label: 'Stop yelling',
    message: 'I keep yelling at my child. How can I be more patient?',
  },
  {
    id: 'picky_eater',
    label: 'Picky eater',
    message: 'My child is a picky eater. What should I do?',
  },
  {
    id: 'dua',
    label: 'Give me a dua',
    message: 'Can you give me a dua for parenting patience?',
  },
];

const INPUT_MAX_LENGTH = 500;
const KEYBOARD_OFFSET_IOS = 90;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

type Props = BottomTabScreenProps<MainTabParamList, 'Chat'>;

export function ChatScreen({ route, navigation }: Props) {
  // Auth state
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);

  // Chat state
  const messages = useChatStore((state) => state.messages);
  const isLoading = useChatStore((state) => state.isLoading);
  const isTyping = useChatStore((state) => state.isTyping);
  const error = useChatStore((state) => state.error);
  const loadHistory = useChatStore((state) => state.loadHistory);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const clearError = useChatStore((state) => state.clearError);

  // Local state
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList<ChatMessage>>(null);
  const hasHandledInitialMessage = useRef(false);

  // Load chat history on mount
  useEffect(() => {
    if (user?.id) {
      loadHistory(user.id);
    }
  }, [user?.id, loadHistory]);

  // Handle initial message from route params (e.g., from "Need Help" button)
  useEffect(() => {
    const initialMessage = route.params?.initialMessage;

    if (
      initialMessage &&
      user?.id &&
      !hasHandledInitialMessage.current &&
      !isLoading
    ) {
      hasHandledInitialMessage.current = true;
      handleSend(initialMessage);
      // Clear the param to prevent re-sending
      navigation.setParams({ initialMessage: undefined });
    }
  }, [route.params?.initialMessage, user?.id, isLoading, navigation]);

  // Reset the flag when navigating away and back
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      hasHandledInitialMessage.current = false;
    });
    return unsubscribe;
  }, [navigation]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0 || isTyping) {
      scrollToBottom();
    }
  }, [messages.length, isTyping]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  const handleSend = useCallback(
    async (text?: string) => {
      if (!user?.id) return;

      const messageToSend = (text ?? inputText).trim();
      if (!messageToSend) return;

      // Clear input immediately for better UX
      setInputText('');
      clearError();

      await sendMessage(user.id, messageToSend);
    },
    [user?.id, inputText, sendMessage, clearError]
  );

  const handleSuggestionSelect = useCallback(
    (message: string) => {
      handleSend(message);
    },
    [handleSend]
  );

  const renderMessage = useCallback(
    ({ item }: { item: ChatMessage }) => <MessageBubble message={item} />,
    []
  );

  const renderHeader = useCallback(() => {
    if (messages.length > 0) return null;
    return <WelcomeMessage userName={profile?.display_name} />;
  }, [messages.length, profile?.display_name]);

  const renderFooter = useCallback(() => {
    if (!isTyping) return null;
    return <TypingIndicator />;
  }, [isTyping]);

  const keyExtractor = useCallback((item: ChatMessage) => item.id, []);

  const canSend = inputText.trim().length > 0 && !isTyping;
  const showSuggestions = messages.length === 0 && !isLoading;

  return (
    <SafeAreaView className="flex-1 bg-cream" edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? KEYBOARD_OFFSET_IOS : 0}
      >
        {/* Header */}
        <View className="bg-emerald px-6 py-4">
          <Text className="text-xl font-poppinsSemiBold text-white">
            Chat with Noor
          </Text>
          <Text className="text-sm font-interRegular text-white/80">
            Your Islamic parenting companion
          </Text>
        </View>

        {/* Error Banner */}
        {error && (
          <TouchableOpacity
            className="bg-coral/20 px-4 py-2 flex-row items-center justify-between"
            onPress={clearError}
            activeOpacity={0.7}
          >
            <Text className="text-coral text-sm font-interMedium flex-1">
              {error}
            </Text>
            <Text className="text-coral text-sm ml-2">✕</Text>
          </TouchableOpacity>
        )}

        {/* Messages */}
        {isLoading && messages.length === 0 ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#10B981" />
            <Text className="text-warmGray mt-3 font-interRegular">
              Loading messages...
            </Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={keyExtractor}
            contentContainerStyle={{ padding: 16, paddingBottom: 8 }}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            onContentSizeChange={scrollToBottom}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Suggestion Chips */}
        {showSuggestions && (
          <SuggestionChips
            suggestions={SUGGESTIONS}
            onSelect={handleSuggestionSelect}
            disabled={isTyping}
          />
        )}

        {/* Input Area */}
        <View className="border-t-2 border-sage bg-white px-4 py-3 flex-row items-center">
          <TextInput
            className="flex-1 bg-cream border-2 border-sage rounded-full px-4 py-3 text-base font-interRegular text-teal mr-2"
            placeholder="Type a message..."
            placeholderTextColor="#78716C"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={INPUT_MAX_LENGTH}
            editable={!isTyping}
            onSubmitEditing={() => handleSend()}
            blurOnSubmit={false}
          />
          <TouchableOpacity
            className={`w-12 h-12 rounded-full items-center justify-center ${
              canSend ? 'bg-emerald' : 'bg-warmGray/30'
            }`}
            onPress={() => handleSend()}
            disabled={!canSend}
            activeOpacity={0.7}
          >
            <Text className="text-white text-xl font-bold">↑</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

import React from 'react';
import { Text, View } from 'react-native';
import { format } from 'date-fns';

import type { ChatMessage } from '@/types/models';

interface Props {
  message: ChatMessage;
}

export function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';

  const formattedTime = formatMessageTime(message.created_at);

  return (
    <View className={`mb-3 flex-row ${isUser ? 'justify-end' : 'justify-start'}`}>
      <View
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser ? 'bg-emerald' : 'bg-white border-2 border-sage'
        }`}
      >
        <Text
          className={`text-base font-interRegular ${
            isUser ? 'text-white' : 'text-teal'
          }`}
        >
          {message.content}
        </Text>
        <Text
          className={`text-xs mt-1 ${
            isUser ? 'text-white/70' : 'text-warmGray'
          }`}
        >
          {formattedTime}
        </Text>
      </View>
    </View>
  );
}

function formatMessageTime(dateString: string): string {
  try {
    return format(new Date(dateString), 'h:mm a');
  } catch {
    return '';
  }
}

import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  userName?: string | null;
}

export function WelcomeMessage({ userName }: Props) {
  const displayName = userName?.trim() || 'mama';

  return (
    <View className="mb-4 flex-row justify-start">
      <View className="max-w-[80%] bg-white border-2 border-sage rounded-2xl px-4 py-3">
        <Text className="text-base font-interRegular text-teal">
          Hey {displayName}! What&apos;s on your heart today? I&apos;m here to
          listen 💚
        </Text>
      </View>
    </View>
  );
}

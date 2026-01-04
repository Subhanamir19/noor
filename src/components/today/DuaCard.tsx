import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { Button } from '@/components/common/Button';
import type { DailyDua } from '@/types/models';

interface Props {
  dua: DailyDua;
  isCompleted: boolean;
  onComplete: () => Promise<void>;
  socialProofCount?: number;
}

export function DuaCard({
  dua,
  isCompleted,
  onComplete,
  socialProofCount = 892,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleComplete = async () => {
    if (isCompleted || isLoading) return;
    setIsLoading(true);
    try {
      await onComplete();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="bg-emerald rounded-2xl p-6 shadow-lg mb-4">
      <Text className="text-lg font-poppinsSemiBold text-white mb-4 text-center">
        TODAY&apos;S DUA FOR YOU
      </Text>

      <Text className="text-2xl text-white text-center mb-3 leading-relaxed">
        {dua.arabic}
      </Text>

      <Text className="text-base font-interMedium text-white/90 text-center mb-2 italic">
        {dua.transliteration}
      </Text>

      <Text className="text-base font-interRegular text-white/85 text-center mb-4">
        “{dua.translation}”
      </Text>

      <TouchableOpacity
        className="bg-white/20 rounded-full py-2 px-4 mb-4 self-center opacity-60"
        activeOpacity={0.7}
        disabled
      >
        <Text className="text-white font-interMedium">Listen (coming soon)</Text>
      </TouchableOpacity>

      <Button
        title={isCompleted ? 'Completed ✓' : 'I made this dua'}
        variant={isCompleted ? 'warning' : 'outline'}
        onPress={handleComplete}
        loading={isLoading}
        disabled={isCompleted}
        fullWidth
      />

      <Text className="text-white/70 text-sm font-interRegular text-center mt-3">
        {socialProofCount.toLocaleString()} mamas prayed today
      </Text>
    </View>
  );
}


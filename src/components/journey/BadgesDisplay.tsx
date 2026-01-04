import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import type { UserBadge } from '@/types/models';

interface Props {
  badges: UserBadge[];
}

const BADGE_INFO: Record<string, { emoji: string; label: string }> = {
  first_photo: { emoji: '🌱', label: 'First Photo' },
  '7_day_streak': { emoji: '🔥', label: '7 Days' },
  '30_day_streak': { emoji: '💪', label: '30 Days' },
  '100_day_streak': { emoji: '🏆', label: '100 Days' },
  connection_depth_10: { emoji: '🌿', label: 'Level 10' },
  connection_depth_25: { emoji: '🌳', label: 'Level 25' },
  connection_depth_50: { emoji: '✨', label: 'Level 50' },
};

export function BadgesDisplay({ badges }: Props) {
  if (badges.length === 0) {
    return null;
  }

  return (
    <View className="mb-4">
      <Text className="text-base font-interMedium text-teal mb-3 px-6">
        Your Badges
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingRight: 48 }}
      >
        {badges.map((badge) => {
          const info = BADGE_INFO[badge.badge_type];
          if (!info) return null;

          return (
            <View
              key={badge.id}
              className="mr-3 bg-white border-2 border-gold rounded-xl p-3 w-20 items-center"
            >
              <Text className="text-3xl mb-1">{info.emoji}</Text>
              <Text className="text-xs font-interMedium text-teal text-center">
                {info.label}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

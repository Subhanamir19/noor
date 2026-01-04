import React, { useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { GhostButton } from '@/components/common/Button';
import type { DailyMission } from '@/types/models';

interface Props {
  mission: DailyMission;
  isCompleted: boolean;
  onComplete: () => Promise<void>;
  onNeedHelp: () => void;
}

function categoryIcon(category: DailyMission['category']): string {
  switch (category) {
    case 'prayer':
      return '🙏';
    case 'character':
      return '🌿';
    case 'story':
      return '📖';
    case 'habit':
      return '✅';
    default:
      return '✨';
  }
}

export function MissionCard({ mission, isCompleted, onComplete, onNeedHelp }: Props) {
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
    <View className="bg-white border-2 border-blush rounded-2xl p-5 shadow-md mb-4">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-poppinsSemiBold text-teal">
          TODAY&apos;S MINI MISSION
        </Text>
        <Text className="text-2xl">{categoryIcon(mission.category)}</Text>
      </View>

      <Text className="text-base font-interMedium text-teal mb-2">
        {mission.title}
      </Text>

      <Text className="text-sm font-interRegular text-warmGray mb-3">
        {mission.description}
      </Text>

      <Text className="text-xs font-interMedium text-warmGray mb-4">
        ⏱️ Takes {mission.duration_minutes} minutes
      </Text>

      <TouchableOpacity
        className="flex-row items-center mb-3"
        onPress={handleComplete}
        activeOpacity={0.7}
        disabled={isCompleted || isLoading}
      >
        <View
          className={`w-6 h-6 rounded-md border-2 mr-3 items-center justify-center ${
            isCompleted ? 'bg-emerald border-emerald' : 'border-warmGray'
          }`}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="white" />
          ) : isCompleted ? (
            <Text className="text-white font-bold text-sm">✓</Text>
          ) : null}
        </View>
        <Text
          className={`text-base font-interMedium ${
            isCompleted ? 'text-emerald' : 'text-teal'
          }`}
        >
          {isCompleted ? 'Mission complete!' : 'Mark as complete'}
        </Text>
      </TouchableOpacity>

      {!isCompleted && (
        <View className="self-start">
          <GhostButton
            title="Need help? Ask Noor"
            onPress={onNeedHelp}
            size="sm"
          />
        </View>
      )}
    </View>
  );
}


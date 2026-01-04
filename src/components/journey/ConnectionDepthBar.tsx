import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  connectionDepth: number; // 0-100
}

const LEVEL_LABELS: Array<{ min: number; label: string }> = [
  { min: 75, label: 'Fully bloomed' },
  { min: 50, label: 'Deeply rooted' },
  { min: 25, label: 'Flourishing' },
  { min: 10, label: 'Taking root' },
  { min: 0, label: 'Starting to grow' },
];

function getLevelLabel(depth: number): string {
  for (const level of LEVEL_LABELS) {
    if (depth >= level.min) return level.label;
  }
  return 'Starting to grow';
}

export function ConnectionDepthBar({ connectionDepth }: Props) {
  const label = getLevelLabel(connectionDepth);

  return (
    <View className="items-center mb-6 px-4">
      {/* Progress bar */}
      <View className="w-full mb-2">
        <View className="bg-warmGray/20 h-3 rounded-full overflow-hidden">
          <View
            className="bg-emerald h-full rounded-full"
            style={{ width: `${connectionDepth}%` }}
          />
        </View>
      </View>

      {/* Level text */}
      <Text className="text-sm font-interMedium text-teal">
        Connection Depth: Level {connectionDepth}
      </Text>
      <Text className="text-xs font-interRegular text-warmGray mt-1">
        {label} {connectionDepth >= 75 ? '✨' : connectionDepth >= 50 ? '💚' : connectionDepth >= 25 ? '🌳' : connectionDepth >= 10 ? '🌿' : '🌱'}
      </Text>
    </View>
  );
}

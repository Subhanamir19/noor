import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import type { ModuleGuideExtended } from '@/data/moduleTypes';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Props {
  module: ModuleGuideExtended;
  isCompleted: boolean;
  isBookmarked: boolean;
  onPress: () => void;
  onBookmark: () => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TYPE_EMOJI: Record<string, string> = {
  technique: '🌙',
  habit: '✨',
  story: '📖',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ModuleCard({
  module,
  isCompleted,
  isBookmarked,
  onPress,
  onBookmark,
}: Props) {
  return (
    <TouchableOpacity
      className="bg-white border-2 border-sage rounded-2xl p-4 mb-3"
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-start justify-between mb-2">
        <View className="flex-1 mr-2">
          <View className="flex-row items-center mb-1">
            <Text className="text-xl mr-2">{TYPE_EMOJI[module.type] || '📚'}</Text>
            <Text className="text-base font-poppinsSemiBold text-teal flex-1">
              {module.title}
            </Text>
          </View>
          <Text className="text-sm font-interRegular text-warmGray mb-2">
            {module.description}
          </Text>
          <View className="flex-row items-center">
            <Text className="text-xs font-interMedium text-warmGray mr-3">
              ⏱️ {module.duration_minutes} min read
            </Text>
            {isCompleted && (
              <View className="bg-emerald/20 rounded-full px-2 py-1">
                <Text className="text-xs font-interMedium text-emerald">
                  ✓ Completed
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Bookmark icon */}
        <TouchableOpacity
          onPress={onBookmark}
          activeOpacity={0.7}
          className="ml-2"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text className="text-2xl">{isBookmarked ? '⭐' : '☆'}</Text>
        </TouchableOpacity>
      </View>

      {/* Tags */}
      <View className="flex-row flex-wrap mt-2">
        {module.tags.slice(0, 3).map((tag) => (
          <View key={tag} className="bg-sage/30 rounded-full px-2 py-1 mr-2 mb-1">
            <Text className="text-xs font-interMedium text-teal">{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

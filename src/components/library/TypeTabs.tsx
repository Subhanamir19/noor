import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

import type { ModuleType } from '@/types/models';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Props {
  selectedType: ModuleType | 'all';
  onSelectType: (type: ModuleType | 'all') => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TABS: Array<{ id: ModuleType | 'all'; label: string; emoji: string }> = [
  { id: 'all', label: 'All', emoji: '📚' },
  { id: 'technique', label: 'Parenting', emoji: '🌙' },
  { id: 'habit', label: 'Sunnah', emoji: '✨' },
  { id: 'story', label: 'Stories', emoji: '📖' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function TypeTabs({ selectedType, onSelectType }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
      {TABS.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          className={`mr-2 px-4 py-2 rounded-full border-2 ${
            selectedType === tab.id
              ? 'bg-emerald border-emerald'
              : 'bg-white border-sage'
          }`}
          onPress={() => onSelectType(tab.id)}
          activeOpacity={0.7}
        >
          <Text
            className={`font-interMedium ${
              selectedType === tab.id ? 'text-white' : 'text-teal'
            }`}
          >
            {tab.emoji} {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

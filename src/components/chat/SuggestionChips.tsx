import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export interface Suggestion {
  id: string;
  label: string;
  message: string;
}

interface Props {
  suggestions: Suggestion[];
  onSelect: (message: string) => void;
  disabled?: boolean;
}

export function SuggestionChips({ suggestions, onSelect, disabled }: Props) {
  return (
    <View className="mb-3">
      <Text className="text-sm font-interMedium text-warmGray mb-2 px-4">
        Quick asks:
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingRight: 32 }}
      >
        {suggestions.map((suggestion) => (
          <TouchableOpacity
            key={suggestion.id}
            className="bg-sage/30 border-2 border-emerald rounded-full px-4 py-2 mr-2"
            onPress={() => onSelect(suggestion.message)}
            activeOpacity={0.7}
            disabled={disabled}
          >
            <Text className="text-sm font-interMedium text-emerald">
              {suggestion.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SearchBar({ value, onChangeText, onClear }: Props) {
  return (
    <View className="flex-row items-center bg-white border-2 border-sage rounded-xl px-4 py-3 mb-4">
      <Text className="text-xl mr-2">🔍</Text>
      <TextInput
        className="flex-1 text-base font-interRegular text-teal"
        placeholder="Search guides, stories..."
        placeholderTextColor="#78716C"
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity
          onPress={onClear}
          activeOpacity={0.7}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text className="text-warmGray text-xl">×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

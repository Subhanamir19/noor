import React from 'react';
import { Text, View } from 'react-native';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Props {
  searchQuery?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function EmptyState({ searchQuery }: Props) {
  return (
    <View className="py-12 items-center">
      <Text className="text-5xl mb-4">📚</Text>
      {searchQuery ? (
        <>
          <Text className="text-xl font-poppinsSemiBold text-teal text-center mb-2">
            No Results Found
          </Text>
          <Text className="text-base font-interRegular text-warmGray text-center px-8">
            Try different keywords or browse all modules
          </Text>
        </>
      ) : (
        <>
          <Text className="text-xl font-poppinsSemiBold text-teal text-center mb-2">
            Content Coming Soon
          </Text>
          <Text className="text-base font-interRegular text-warmGray text-center px-8">
            We're filling this library with Islamic parenting wisdom
          </Text>
        </>
      )}
    </View>
  );
}

import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  totalDays: number;
  childName?: string;
}

export function DaysCounter({ totalDays, childName }: Props) {
  return (
    <View className="items-center mb-6">
      <Text className="text-5xl font-poppinsBold text-gold mb-2">
        {totalDays}
      </Text>
      <Text className="text-xl font-poppinsSemiBold text-teal">
        Days Together
      </Text>
      {childName && (
        <Text className="text-base font-interRegular text-warmGray mt-1">
          with {childName}
        </Text>
      )}
    </View>
  );
}

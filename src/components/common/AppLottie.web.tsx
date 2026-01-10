import React from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';

type Props = {
  source: any;
  style?: StyleProp<ViewStyle>;
  autoPlay?: boolean;
  loop?: boolean;
  resizeMode?: 'cover' | 'contain' | 'center';
};

export function AppLottie({ style }: Props) {
  return (
    <View
      style={[
        {
          backgroundColor: 'rgba(17,24,39,0.04)',
          borderRadius: 14,
          borderWidth: 1,
          borderColor: 'rgba(17,24,39,0.08)',
        },
        style,
      ]}
    />
  );
}

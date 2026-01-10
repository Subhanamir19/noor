import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';

type Props = {
  source: any;
  style?: StyleProp<ViewStyle>;
  autoPlay?: boolean;
  loop?: boolean;
  resizeMode?: 'cover' | 'contain' | 'center';
};

export function AppLottie({ source, style, autoPlay = true, loop = true, resizeMode = 'contain' }: Props) {
  return (
    <LottieView source={source} autoPlay={autoPlay} loop={loop} style={style} resizeMode={resizeMode} />
  );
}

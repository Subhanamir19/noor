/**
 * TarbiyahStepLabel - Chip showing current step number and name
 *
 * Example: "1 • THE MOMENT"
 */

import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  FadeInDown,
} from 'react-native-reanimated';
import {
  TarbiyahColors,
  TarbiyahTypography,
  TarbiyahSpacing,
  TarbiyahRadius,
  TarbiyahSizes,
  TarbiyahRgba,
  TarbiyahMotion,
  TarbiyahStepConfig,
  TarbiyahStepType,
} from '../../constants/tarbiyahTokens';

interface TarbiyahStepLabelProps {
  stepType: TarbiyahStepType;
}

function TarbiyahStepLabelComponent({ stepType }: TarbiyahStepLabelProps) {
  const config = TarbiyahStepConfig[stepType];

  return (
    <Animated.View
      entering={FadeInDown.delay(TarbiyahMotion.stagger.stepLabel)
        .duration(TarbiyahMotion.durationSlow)
        .springify()}
      style={styles.container}
    >
      <Text style={styles.text}>
        {config.number} • {config.label}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    height: TarbiyahSizes.stepLabelHeight,
    paddingHorizontal: TarbiyahSpacing.space16,
    borderRadius: TarbiyahRadius.full,
    backgroundColor: TarbiyahRgba.stepLabelBg,
    borderWidth: 1,
    borderColor: TarbiyahRgba.stepLabelBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.tiny.fontSize,
    fontWeight: TarbiyahTypography.tiny.fontWeight,
    lineHeight: TarbiyahTypography.tiny.lineHeight,
    letterSpacing: 1,
    color: TarbiyahColors.textAccent,
    textTransform: 'uppercase',
  },
});

export const TarbiyahStepLabel = memo(TarbiyahStepLabelComponent);

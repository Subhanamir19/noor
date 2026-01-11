/**
 * ChatStepLabel - Step indicator for Tarbiyah chat mode
 *
 * Displays the current step name and number (e.g., "THE MOMENT" 1/5).
 * Minimal design to not distract from the chat experience.
 */

import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import {
  TarbiyahColors,
  TarbiyahTypography,
  TarbiyahSpacing,
  TarbiyahRadius,
  TarbiyahRgba,
  TarbiyahStepConfig,
  type TarbiyahStepType,
  TARBIYAH_STEP_ORDER,
} from '../../../constants/tarbiyahTokens';

interface ChatStepLabelProps {
  stepType: TarbiyahStepType;
}

function ChatStepLabelComponent({ stepType }: ChatStepLabelProps) {
  const config = TarbiyahStepConfig[stepType];
  const totalSteps = TARBIYAH_STEP_ORDER.length;

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(150)}
      style={styles.container}
    >
      <View style={[styles.badge, { borderColor: config.accentColor }]}>
        <Text style={[styles.label, { color: config.accentColor }]}>
          {config.label}
        </Text>
      </View>
      <Text style={styles.counter}>
        {config.number} of {totalSteps}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: TarbiyahSpacing.screenGutter,
    paddingTop: TarbiyahSpacing.space8,
    paddingBottom: TarbiyahSpacing.space16,
  },
  badge: {
    paddingHorizontal: TarbiyahSpacing.space12,
    paddingVertical: TarbiyahSpacing.space4,
    borderRadius: TarbiyahRadius.full,
    borderWidth: 1,
    backgroundColor: TarbiyahRgba.stepLabelBg,
  },
  label: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.tiny.fontSize,
    fontWeight: TarbiyahTypography.tiny.fontWeight,
    letterSpacing: TarbiyahTypography.tiny.letterSpacing,
    textTransform: 'uppercase',
  },
  counter: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.caption.fontSize,
    fontWeight: TarbiyahTypography.caption.fontWeight,
    color: TarbiyahColors.textMuted,
  },
});

export const ChatStepLabel = memo(ChatStepLabelComponent);

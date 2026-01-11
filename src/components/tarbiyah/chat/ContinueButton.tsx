/**
 * ContinueButton - Primary CTA for advancing Tarbiyah chat steps
 *
 * Displays "Continue" for steps 1-4, "Complete Tarbiyah" for step 5.
 * Features pulse animation when enabled after text animation completes.
 */

import React, { memo, useEffect } from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import {
  TarbiyahColors,
  TarbiyahTypography,
  TarbiyahSpacing,
  TarbiyahRadius,
  TarbiyahMotion,
  TarbiyahSizes,
  TarbiyahShadows,
  TarbiyahChatTokens,
} from '../../../constants/tarbiyahTokens';

interface ContinueButtonProps {
  onPress: () => void;
  disabled?: boolean;
  isLastStep?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function ContinueButtonComponent({
  onPress,
  disabled = false,
  isLastStep = false,
}: ContinueButtonProps) {
  const buttonScale = useSharedValue(1);
  const pulseScale = useSharedValue(1);

  // Pulse animation when button becomes enabled
  useEffect(() => {
    if (!disabled) {
      // Start pulse after a short delay
      pulseScale.value = withDelay(
        TarbiyahChatTokens.animation.pulseDelay,
        withRepeat(
          withSequence(
            withTiming(1.03, {
              duration: 800,
              easing: Easing.inOut(Easing.ease),
            }),
            withTiming(1.0, {
              duration: 800,
              easing: Easing.inOut(Easing.ease),
            })
          ),
          3, // Pulse 3 times then stop
          false
        )
      );
    } else {
      pulseScale.value = 1;
    }
  }, [disabled, pulseScale]);

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.97, TarbiyahMotion.spring);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1, TarbiyahMotion.spring);
  };

  const handlePress = async () => {
    if (disabled) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: buttonScale.value * pulseScale.value },
    ],
    opacity: disabled ? 0.5 : 1,
  }));

  return (
    <AnimatedPressable
      style={[styles.button, animatedStyle]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      {isLastStep && <Text style={styles.icon}>✓</Text>}
      <Text style={styles.text}>
        {isLastStep ? 'Complete Tarbiyah' : 'Continue'}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: TarbiyahSizes.ctaButton,
    backgroundColor: TarbiyahColors.accentPrimary,
    borderRadius: TarbiyahRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: TarbiyahSpacing.space12,
    marginHorizontal: TarbiyahSpacing.screenGutter,
    marginBottom: TarbiyahSpacing.space16,
    ...TarbiyahShadows.ctaGlow,
  },
  icon: {
    fontSize: 20,
    color: TarbiyahColors.textPrimary,
    fontWeight: '700',
  },
  text: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.bodyLarge.fontSize,
    fontWeight: '600',
    color: TarbiyahColors.textPrimary,
  },
});

export const ContinueButton = memo(ContinueButtonComponent);

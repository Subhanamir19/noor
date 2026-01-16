/**
 * CheckmarkButton - Animated checkmark toggle button
 *
 * Features:
 * - Empty state: teal border, transparent fill
 * - Checked state: teal fill, white checkmark
 * - Scale bounce animation on tap
 * - Checkmark rotates in from -180deg
 */

import React, { useEffect } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  TodayScreenColors,
  TodayScreenSizes,
  TodayScreenRadii,
  TodayScreenMotion,
  TodayScreenIcons,
} from '@/constants/todayScreenTokens';

interface CheckmarkButtonProps {
  isChecked: boolean;
  onPress: () => void;
  size?: number;
  disabled?: boolean;
}

export function CheckmarkButton({
  isChecked,
  onPress,
  size = TodayScreenSizes.checkmarkButton,
  disabled = false,
}: CheckmarkButtonProps) {
  // Animation values
  const scale = useSharedValue(1);
  const checkmarkScale = useSharedValue(isChecked ? 1 : 0);
  const checkmarkRotation = useSharedValue(isChecked ? 0 : -180);
  const fillOpacity = useSharedValue(isChecked ? 1 : 0);

  // Update animations when checked state changes
  useEffect(() => {
    if (isChecked) {
      // Animate in
      fillOpacity.value = withTiming(1, { duration: 150 });
      checkmarkScale.value = withSequence(
        withTiming(1.3, {
          duration: 150,
          easing: Easing.out(Easing.back(2)),
        }),
        withTiming(1, { duration: 100 })
      );
      checkmarkRotation.value = withTiming(0, {
        duration: TodayScreenMotion.checkmarkAppear.duration,
        easing: Easing.out(Easing.ease),
      });
    } else {
      // Animate out
      fillOpacity.value = withTiming(0, { duration: 100 });
      checkmarkScale.value = withTiming(0, { duration: 100 });
      checkmarkRotation.value = -180;
    }
  }, [isChecked]);

  const handlePress = () => {
    if (disabled) return;

    // Bounce animation
    scale.value = withSequence(
      withTiming(0.85, { duration: 80 }),
      withSpring(1, TodayScreenMotion.springBouncy)
    );

    onPress();
  };

  // Animated styles
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const fillAnimatedStyle = useAnimatedStyle(() => ({
    opacity: fillOpacity.value,
  }));

  const checkmarkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: checkmarkScale.value },
      { rotate: `${checkmarkRotation.value}deg` },
    ],
    opacity: checkmarkScale.value,
  }));

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      hitSlop={8}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled }}
      accessibilityLabel={isChecked ? 'Mark as incomplete' : 'Mark as complete'}
    >
      <Animated.View
        style={[
          styles.container,
          { width: size, height: size, borderRadius: size / 2 },
          containerAnimatedStyle,
        ]}
      >
        {/* Border (always visible) */}
        <Animated.View
          style={[
            styles.border,
            { width: size, height: size, borderRadius: size / 2 },
          ]}
        />

        {/* Fill background */}
        <Animated.View
          style={[
            styles.fill,
            { width: size, height: size, borderRadius: size / 2 },
            fillAnimatedStyle,
          ]}
        />

        {/* Checkmark */}
        <Animated.Text
          style={[
            styles.checkmark,
            { fontSize: size * 0.5 },
            checkmarkAnimatedStyle,
          ]}
        >
          {TodayScreenIcons.checkmark}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  border: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: TodayScreenColors.primary,
    backgroundColor: 'transparent',
  },
  fill: {
    position: 'absolute',
    backgroundColor: TodayScreenColors.primary,
  },
  checkmark: {
    color: TodayScreenColors.textInverse,
    fontWeight: 'bold',
  },
});

/**
 * Chunky3DButton - Duolingo-style 3D button
 *
 * Features:
 * - Raised appearance with bottom "shelf" creating depth
 * - Presses down on tap (shelf disappears)
 * - Bouncy spring animation
 * - Haptic feedback
 */

import React, { memo } from 'react';
import { Text, StyleSheet, Pressable, ViewStyle, TextStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import {
  WarmColors,
  WarmSpacing,
  WarmRadius,
  WarmTypography,
  WarmMotion,
  WarmSizes,
} from '../../constants/tarbiyahWarmTokens';

interface Chunky3DButtonProps {
  label: string;
  onPress: () => void;
  color?: string;
  darkColor?: string;
  textColor?: string;
  disabled?: boolean;
  size?: 'default' | 'small';
  style?: ViewStyle;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function Chunky3DButtonComponent({
  label,
  onPress,
  color = WarmColors.primary,
  darkColor = WarmColors.primaryDark,
  textColor = WarmColors.textOnPrimary,
  disabled = false,
  size = 'default',
  style,
}: Chunky3DButtonProps) {
  const pressed = useSharedValue(0);

  const height = size === 'small' ? WarmSizes.buttonHeightSmall : WarmSizes.buttonHeight;
  const offset = WarmSizes.button3DOffset;

  const handlePressIn = () => {
    pressed.value = withSpring(1, WarmMotion.springSnappy);
  };

  const handlePressOut = () => {
    pressed.value = withSpring(0, WarmMotion.springBouncy);
  };

  const handlePress = async () => {
    if (disabled) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  // The main button face moves down when pressed
  const buttonFaceStyle = useAnimatedStyle(() => {
    const translateY = interpolate(pressed.value, [0, 1], [0, offset]);
    return {
      transform: [{ translateY }],
    };
  });

  // The bottom shelf (shadow layer) shrinks when pressed
  const shelfStyle = useAnimatedStyle(() => {
    const shelfHeight = interpolate(pressed.value, [0, 1], [offset, 0]);
    return {
      height: shelfHeight,
    };
  });

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[styles.container, { height: height + offset }, style]}
    >
      {/* Bottom shelf (creates 3D effect) */}
      <Animated.View
        style={[
          styles.shelf,
          {
            backgroundColor: darkColor,
            borderRadius: WarmRadius.md,
          },
          shelfStyle,
        ]}
      />

      {/* Main button face */}
      <Animated.View
        style={[
          styles.face,
          {
            height,
            backgroundColor: disabled ? WarmColors.textMuted : color,
            borderRadius: WarmRadius.md,
          },
          buttonFaceStyle,
        ]}
      >
        <Text
          style={[
            styles.label,
            size === 'small' && styles.labelSmall,
            { color: textColor },
          ]}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
  },
  shelf: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: WarmSizes.button3DOffset,
  },
  face: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.bodyLarge.fontSize,
    fontWeight: '700',
  },
  labelSmall: {
    fontSize: WarmTypography.label.fontSize,
  },
});

export const Chunky3DButton = memo(Chunky3DButtonComponent);

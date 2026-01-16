/**
 * GoalsLeftSection - Shows remaining goals count for today
 *
 * Features:
 * - Clipboard emoji icon
 * - Dynamic goals count text
 * - Sparkle/plus button on right
 * - Card-style with subtle shadow
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import {
  TodayScreenColors,
  TodayScreenSpacing,
  TodayScreenRadii,
  TodayScreenTypography,
  TodayScreenShadows,
  TodayScreenSizes,
  TodayScreenIcons,
} from '@/constants/todayScreenTokens';

interface GoalsLeftSectionProps {
  goalsLeft: number;
  onSparklePress?: () => void;
}

export function GoalsLeftSection({ goalsLeft, onSparklePress }: GoalsLeftSectionProps) {
  const goalText = goalsLeft === 1 ? 'goal' : 'goals';

  return (
    <View style={styles.container}>
      {/* Clipboard Icon */}
      <Text style={styles.clipboardIcon}>{TodayScreenIcons.clipboard}</Text>

      {/* Goals Text */}
      <Text style={styles.goalsText}>
        {goalsLeft} {goalText} left for today!
      </Text>

      {/* Sparkle Button */}
      <Pressable
        style={({ pressed }) => [
          styles.sparkleButton,
          pressed && styles.sparkleButtonPressed,
        ]}
        onPress={onSparklePress}
        hitSlop={8}
        accessibilityLabel="View all goals"
        accessibilityRole="button"
      >
        <Text style={styles.sparkleIcon}>{TodayScreenIcons.sparkle}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TodayScreenColors.bgCard,
    borderRadius: TodayScreenRadii.lg,
    padding: TodayScreenSpacing.md,
    paddingHorizontal: TodayScreenSpacing.lg,
    marginHorizontal: TodayScreenSpacing.screenGutter,
    marginBottom: TodayScreenSpacing.lg,
    ...TodayScreenShadows.card,
  },
  clipboardIcon: {
    fontSize: TodayScreenSizes.clipboardIcon,
    marginRight: TodayScreenSpacing.md - 2,
  },
  goalsText: {
    flex: 1,
    fontSize: TodayScreenTypography.bodyLarge.fontSize,
    lineHeight: TodayScreenTypography.bodyLarge.lineHeight,
    fontFamily: TodayScreenTypography.fontSemiBold,
    color: TodayScreenColors.textPrimary,
  },
  sparkleButton: {
    width: TodayScreenSizes.sparkleButton,
    height: TodayScreenSizes.sparkleButton,
    borderRadius: TodayScreenSizes.sparkleButton / 2,
    backgroundColor: TodayScreenColors.primaryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleButtonPressed: {
    backgroundColor: TodayScreenColors.primaryBorder,
    transform: [{ scale: 0.95 }],
  },
  sparkleIcon: {
    fontSize: 16,
  },
});

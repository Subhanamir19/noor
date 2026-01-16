/**
 * JourneyProgressCard - Floating card showing current journey/adventure progress
 *
 * Features:
 * - Semi-transparent background with blur effect
 * - Flame badge icon
 * - Journey title with progress bar
 * - Counter pill showing current/total
 * - Floats and overlaps the hero image
 */

import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
  TodayScreenColors,
  TodayScreenSpacing,
  TodayScreenRadii,
  TodayScreenTypography,
  TodayScreenShadows,
  TodayScreenSizes,
  TodayScreenMotion,
  TodayScreenIcons,
} from '@/constants/todayScreenTokens';

interface JourneyProgressCardProps {
  journeyNumber?: number;
  journeyTitle?: string;
  currentProgress: number;
  totalSteps: number;
  onPress?: () => void;
}

export function JourneyProgressCard({
  journeyNumber = 1,
  journeyTitle = 'Akhlaq Journey',
  currentProgress,
  totalSteps,
}: JourneyProgressCardProps) {
  // Animated progress bar
  const progressWidth = useSharedValue(0);
  const progressPercentage = totalSteps > 0 ? (currentProgress / totalSteps) * 100 : 0;

  useEffect(() => {
    progressWidth.value = withTiming(progressPercentage, {
      duration: TodayScreenMotion.progressBar.duration,
      easing: Easing.out(Easing.cubic),
    });
  }, [progressPercentage]);

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  // Format ordinal (1st, 2nd, 3rd, etc.)
  const getOrdinal = (n: number) => {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <View style={styles.container}>
      {/* Flame Badge */}
      <View style={styles.flameBadge}>
        <Text style={styles.flameIcon}>{TodayScreenIcons.flame}</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Journey Title */}
        <Text style={styles.title}>
          {getOrdinal(journeyNumber)} {journeyTitle}
        </Text>

        {/* Progress Row */}
        <View style={styles.progressRow}>
          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarTrack}>
              <Animated.View style={[styles.progressBarFill, progressAnimatedStyle]} />
            </View>
          </View>

          {/* Counter Pill */}
          <View style={styles.counterPill}>
            <Text style={styles.counterText}>
              {currentProgress} / {totalSteps}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: TodayScreenColors.bgCardTinted,
    borderRadius: TodayScreenRadii.journeyCard,
    padding: TodayScreenSpacing.md,
    paddingHorizontal: TodayScreenSpacing.lg,
    marginHorizontal: TodayScreenSpacing.screenGutter,
    // Floating effect
    ...TodayScreenShadows.floating,
    // Position overlap (applied by parent)
    marginTop: -TodayScreenSpacing.journeyCardOverlap,
  },
  flameBadge: {
    width: TodayScreenSizes.flameIcon,
    height: TodayScreenSizes.flameIcon,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: TodayScreenSpacing.md,
  },
  flameIcon: {
    fontSize: TodayScreenSizes.flameIcon - 4,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: TodayScreenTypography.h3.fontSize,
    lineHeight: TodayScreenTypography.h3.lineHeight,
    fontFamily: TodayScreenTypography.fontBold,
    color: TodayScreenColors.textPrimary,
    marginBottom: TodayScreenSpacing.xs + 2,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: TodayScreenSpacing.sm,
  },
  progressBarContainer: {
    flex: 1,
  },
  progressBarTrack: {
    height: TodayScreenSizes.progressBarHeight,
    backgroundColor: TodayScreenColors.progressTrack,
    borderRadius: TodayScreenRadii.progressBar,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: TodayScreenColors.journeyProgressFill,
    borderRadius: TodayScreenRadii.progressBar,
  },
  counterPill: {
    backgroundColor: TodayScreenColors.counterPillBg,
    paddingHorizontal: TodayScreenSizes.counterPillPaddingH,
    paddingVertical: TodayScreenSizes.counterPillPaddingV,
    borderRadius: TodayScreenRadii.counterPill,
  },
  counterText: {
    fontSize: TodayScreenTypography.caption.fontSize,
    fontFamily: TodayScreenTypography.fontBold,
    color: TodayScreenColors.counterPillText,
  },
});

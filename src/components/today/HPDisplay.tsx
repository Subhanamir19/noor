/**
 * HPDisplay - Health Points / Parenting Points Display
 *
 * Three variants:
 * - bar: Horizontal progress bar with current/max HP
 * - counter: Large number display with sparkle animation on gain
 * - compact: Small badge for secondary locations
 *
 * Features floating "+HP" text animation when HP gained
 */

import React, { memo, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { TodayColors } from '@/constants/todayTokens';
import {
  GamificationColors,
  GamificationTypography,
  GamificationSpacing,
  GamificationShadows,
  GamificationBorderRadius,
  GamificationAnimations,
} from '@/constants/gamificationTokens';

// ============================================================================
// Types
// ============================================================================

export type HPDisplayVariant = 'bar' | 'counter' | 'compact';

interface HPDisplayProps {
  currentHP: number;
  maxHP?: number; // For progress to next badge
  variant?: HPDisplayVariant;
  showGainAnimation?: boolean;
  recentGain?: number; // Show "+15 HP" floating text
}

// ============================================================================
// Component
// ============================================================================

function HPDisplayComponent({
  currentHP,
  maxHP,
  variant = 'bar',
  showGainAnimation = false,
  recentGain,
}: HPDisplayProps) {
  // Animation values
  const counterScale = useSharedValue(1);
  const floatingY = useSharedValue(0);
  const floatingOpacity = useSharedValue(0);
  const barWidth = useSharedValue(0);

  // ============================================================================
  // Effects
  // ============================================================================

  // Animate HP gain
  useEffect(() => {
    if (showGainAnimation && recentGain) {
      // Counter pulsate
      counterScale.value = withSequence(
        withTiming(
          GamificationAnimations.hpCounterIncrement.pulseScale,
          { duration: GamificationAnimations.hpCounterIncrement.pulseDuration }
        ),
        withSpring(1, { damping: 12 })
      );

      // Floating text
      floatingOpacity.value = withSequence(
        withTiming(1, { duration: GamificationAnimations.hpFloatingText.fadeInDuration }),
        withDelay(
          GamificationAnimations.hpFloatingText.fadeOutDelay,
          withTiming(0, { duration: GamificationAnimations.hpFloatingText.fadeOutDuration })
        )
      );

      floatingY.value = withTiming(
        -GamificationSpacing.floatingHPOffset,
        {
          duration: GamificationAnimations.hpFloatingText.riseDuration,
          easing: Easing.out(Easing.cubic),
        }
      );
    }
  }, [showGainAnimation, recentGain]);

  // Animate bar fill
  useEffect(() => {
    if (variant === 'bar' && maxHP) {
      const percentage = Math.min((currentHP / maxHP) * 100, 100);
      barWidth.value = withSpring(percentage, {
        damping: GamificationAnimations.hpBarFill.damping,
        stiffness: GamificationAnimations.hpBarFill.stiffness,
      });
    }
  }, [currentHP, maxHP, variant]);

  // ============================================================================
  // Animated Styles
  // ============================================================================

  const counterAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: counterScale.value }],
  }));

  const floatingAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatingY.value }],
    opacity: floatingOpacity.value,
  }));

  const barFillAnimatedStyle = useAnimatedStyle(() => ({
    width: `${barWidth.value}%`,
  }));

  // ============================================================================
  // Render Variants
  // ============================================================================

  if (variant === 'bar') {
    return (
      <View style={styles.barContainer}>
        <View style={styles.barHeader}>
          <Text style={styles.barLabel}>HP</Text>
          <Text style={styles.barValue}>
            {currentHP} {maxHP ? `/ ${maxHP}` : ''}
          </Text>
        </View>
        <View style={styles.barTrack}>
          <Animated.View style={[styles.barFill, barFillAnimatedStyle]} />
        </View>
        {recentGain && showGainAnimation && (
          <Animated.View style={[styles.floatingText, floatingAnimatedStyle]}>
            <Text style={styles.floatingTextLabel}>+{recentGain} HP</Text>
          </Animated.View>
        )}
      </View>
    );
  }

  if (variant === 'counter') {
    return (
      <View style={styles.counterContainer}>
        <Animated.View style={[styles.counterContent, counterAnimatedStyle]}>
          <Text style={styles.counterValue}>{currentHP}</Text>
          <Text style={styles.counterLabel}>HP</Text>
        </Animated.View>
        {recentGain && showGainAnimation && (
          <Animated.View style={[styles.floatingText, floatingAnimatedStyle]}>
            <Text style={styles.floatingTextLabel}>+{recentGain} HP</Text>
          </Animated.View>
        )}
      </View>
    );
  }

  // compact variant
  return (
    <View style={styles.compactContainer}>
      <Text style={styles.compactText}>⚡ {currentHP} HP</Text>
    </View>
  );
}

// ============================================================================
// Styles
// ============================================================================

const styles = StyleSheet.create({
  // Bar Variant
  barContainer: {
    position: 'relative',
  },

  barHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  barLabel: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
    color: GamificationColors.hpPrimary,
    letterSpacing: 0.5,
  },

  barValue: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: TodayColors.textSecondary,
  },

  barTrack: {
    height: GamificationSpacing.hpBarHeight,
    backgroundColor: GamificationColors.hpBarTrack,
    borderRadius: GamificationSpacing.hpBarBorderRadius,
    overflow: 'hidden',
  },

  barFill: {
    height: '100%',
    backgroundColor: GamificationColors.hpBarFill,
    borderRadius: GamificationSpacing.hpBarBorderRadius,
  },

  // Counter Variant
  counterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  counterContent: {
    alignItems: 'center',
  },

  counterValue: {
    ...GamificationTypography.hpCounter,
    color: GamificationColors.hpPrimary,
    ...GamificationShadows.hpGlow,
  },

  counterLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: GamificationColors.hpPrimary,
    marginTop: -4,
    letterSpacing: 1,
  },

  // Compact Variant
  compactContainer: {
    backgroundColor: GamificationColors.hpBackground,
    paddingHorizontal: GamificationSpacing.hpBadgePadding,
    paddingVertical: 4,
    borderRadius: GamificationBorderRadius.hpBadge,
    borderWidth: 1,
    borderColor: GamificationColors.hpBorder,
  },

  compactText: {
    ...GamificationTypography.hpValue,
    color: GamificationColors.hpPrimary,
  },

  // Floating Text Animation
  floatingText: {
    position: 'absolute',
    top: 0,
    alignSelf: 'center',
    backgroundColor: GamificationColors.floatingHPColor,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    ...GamificationShadows.hpGlow,
  },

  floatingTextLabel: {
    ...GamificationTypography.floatingHP,
    color: GamificationColors.hpText,
  },
});

// ============================================================================
// Export
// ============================================================================

export const HPDisplay = memo(HPDisplayComponent);

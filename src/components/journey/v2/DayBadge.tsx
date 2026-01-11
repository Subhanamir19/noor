/**
 * DayBadge Component
 *
 * 3D chunky day badge with carved number and state-based styling.
 * Inspired by Duolingo's playful node design.
 */

import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import type { DayStatus } from '@/types/journey';
import {
  NewJourneyColors,
  NewJourneySizes,
  NewJourneyTypography,
  NewJourneyAnimations,
} from '@/constants/journeyTokensV2';

interface DayBadgeProps {
  dayNumber: number;
  status: DayStatus;
  isToday: boolean;
  onPress: () => void;
}

export const DayBadge: React.FC<DayBadgeProps> = ({
  dayNumber,
  status,
  isToday,
  onPress,
}) => {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.5);

  // Check if this is a milestone day (7, 14, 21, 30)
  const isMilestone = [7, 14, 21, 30].includes(dayNumber);
  const isMilestoneCompleted = isMilestone && status === 'logged';

  // Pulse animation for TODAY badge
  React.useEffect(() => {
    if (isToday) {
      scale.value = withRepeat(
        withSequence(
          withSpring(NewJourneyAnimations.todayPulseScale, {
            damping: NewJourneyAnimations.pressSpring.damping,
            stiffness: NewJourneyAnimations.pressSpring.stiffness,
          }),
          withSpring(1.0, {
            damping: NewJourneyAnimations.pressSpring.damping,
            stiffness: NewJourneyAnimations.pressSpring.stiffness,
          })
        ),
        -1, // infinite
        true
      );

      glowOpacity.value = withRepeat(
        withSequence(withSpring(0.7), withSpring(0.4)),
        -1,
        true
      );
    }
  }, [isToday]);

  const animatedBadge = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedGlow = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const handlePressIn = () => {
    if (!isToday) {
      scale.value = withSpring(NewJourneyAnimations.pressScale, {
        damping: NewJourneyAnimations.pressSpring.damping,
      });
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    if (!isToday) {
      scale.value = withSpring(1.0, {
        damping: NewJourneyAnimations.pressSpring.damping,
      });
    }
  };

  // Determine colors based on status
  const getColors = () => {
    // Milestone days get gold treatment when completed
    if (isMilestoneCompleted) {
      return {
        gradient: [NewJourneyColors.milestoneGold, NewJourneyColors.milestoneGoldShadow],
        shadow: NewJourneyColors.milestoneGoldShadow,
        text: NewJourneyColors.textPrimary,
        glow: NewJourneyColors.milestoneGlow,
      };
    }

    switch (status) {
      case 'logged':
        return {
          gradient: [NewJourneyColors.completed, NewJourneyColors.completed],
          shadow: NewJourneyColors.completedShadow,
          text: NewJourneyColors.textInverse,
        };
      case 'missed':
        return {
          gradient: [NewJourneyColors.missed, NewJourneyColors.missed],
          shadow: NewJourneyColors.missedShadow,
          text: NewJourneyColors.textPrimary,
        };
      case 'today':
        return {
          gradient: [NewJourneyColors.today, NewJourneyColors.today],
          shadow: NewJourneyColors.todayShadow,
          text: NewJourneyColors.textPrimary,
        };
      case 'locked':
        return {
          gradient: [NewJourneyColors.locked, NewJourneyColors.locked],
          shadow: NewJourneyColors.lockedShadow,
          text: NewJourneyColors.lockedText,
        };
    }
  };

  const colors = getColors();
  const badgeSize = isToday
    ? NewJourneySizes.dayBadgeToday
    : NewJourneySizes.dayBadgeNormal;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={status === 'locked'}
    >
      <Animated.View style={[styles.container, animatedBadge]}>
        {/* Glow effect for TODAY */}
        {isToday && (
          <Animated.View
            style={[
              styles.glow,
              animatedGlow,
              {
                width: badgeSize + 18,
                height: badgeSize + 18,
                borderRadius: (badgeSize + 18) / 2,
                backgroundColor: NewJourneyColors.todayGlow,
              },
            ]}
          />
        )}

        {/* Glow effect for MILESTONE completed */}
        {isMilestoneCompleted && (
          <View
            style={[
              styles.milestoneGlow,
              {
                width: badgeSize + 16,
                height: badgeSize + 16,
                borderRadius: (badgeSize + 16) / 2,
                backgroundColor: NewJourneyColors.milestoneGlow,
              },
            ]}
          />
        )}

        {/* Main badge circle */}
        <View
          style={[
            styles.badgeWrapper,
            {
              width: badgeSize,
              height: badgeSize + NewJourneySizes.dayBadgeShadow,
            },
          ]}
        >
          <LinearGradient
            colors={colors.gradient}
            style={[
              styles.badge,
              {
                width: badgeSize,
                height: badgeSize,
                borderRadius: badgeSize / 2,
              },
            ]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          >
            {/* Glossy highlight */}
            <View
              style={[
                styles.glossy,
                {
                  width: badgeSize - 16,
                  height: badgeSize * 0.35,
                  borderRadius: badgeSize / 2,
                },
              ]}
            />

            {/* Trophy icon for milestone */}
            {isMilestoneCompleted && (
              <Text style={styles.trophyIcon}>🏆</Text>
            )}

            {/* Day number - carved effect */}
            <Text
              style={[
                styles.dayNumber,
                {
                  color: colors.text,
                  fontSize: isToday ? 30 : 26,
                  marginTop: isMilestoneCompleted ? 4 : 0,
                },
              ]}
            >
              {dayNumber}
            </Text>

            {/* Checkmark for completed (non-milestone) */}
            {status === 'logged' && !isMilestone && (
              <View style={styles.checkmark}>
                <Text style={styles.checkmarkIcon}>✓</Text>
              </View>
            )}
          </LinearGradient>

          {/* 3D shadow ledge */}
          <View
            style={[
              styles.shadow,
              {
                width: badgeSize,
                height: badgeSize,
                borderRadius: badgeSize / 2,
                backgroundColor: colors.shadow,
              },
            ]}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
    shadowColor: NewJourneyColors.todayGlow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 16,
    elevation: 8,
  },
  badgeWrapper: {
    alignItems: 'center',
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 2,
  },
  glossy: {
    position: 'absolute',
    top: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  dayNumber: {
    fontFamily: NewJourneyTypography.dayNumber.fontFamily,
    fontWeight: '700',
    letterSpacing: NewJourneyTypography.dayNumber.letterSpacing,
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    zIndex: 3,
  },
  checkmark: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkIcon: {
    fontSize: 14,
    color: NewJourneyColors.completed,
    fontWeight: '700',
  },
  milestoneGlow: {
    position: 'absolute',
    shadowColor: NewJourneyColors.milestoneGold,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 6,
  },
  trophyIcon: {
    fontSize: 20,
    position: 'absolute',
    top: 8,
    zIndex: 4,
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },
});

import React, { memo, useCallback, useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

import {
  PulseThresholds,
  TodayColors,
  TodayRadii,
  TodayShadows,
  TodaySpacing,
  TodayTypography,
} from '@/constants/todayTokens';

interface Props {
  score: number;
  tasksCompleted: number;
  totalTasks: number;
  streakDays: number;
  onPress?: () => void;
}

interface PulseThreshold {
  color: string;
  label: string;
  emoji: string;
}

function getPulseThreshold(score: number): PulseThreshold {
  if (score >= PulseThresholds.thriving.min) return PulseThresholds.thriving;
  if (score >= PulseThresholds.growing.min) return PulseThresholds.growing;
  if (score >= PulseThresholds.building.min) return PulseThresholds.building;
  return PulseThresholds.needsLove;
}

function getTasksToGoal(completed: number, total: number): number {
  const targetPercentage = 0.7; // 70% is the daily goal
  const target = Math.ceil(total * targetPercentage);
  return Math.max(0, target - completed);
}

const CIRCLE_SIZE = 72;
const STROKE_WIDTH = 7;

/**
 * ParentingPulse - Transparent, actionable wellness indicator
 *
 * Shows:
 * - Current score with clear visual
 * - How the score is calculated (tasks, streak, consistency)
 * - Actionable tip on what to do next
 */
function ParentingPulseComponent({
  score,
  tasksCompleted,
  totalTasks,
  streakDays,
  onPress,
}: Props) {
  const { color, label, emoji } = getPulseThreshold(score);
  const tasksToGoal = getTasksToGoal(tasksCompleted, totalTasks);

  const radius = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  const shadowHeight = TodayShadows.cardLedge.height;

  // Pulse animation for the score circle
  const pulseScale = useSharedValue(1);

  React.useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withDelay(500, withTiming(1.03, { duration: 800 })),
        withTiming(1, { duration: 800 })
      ),
      -1,
      false
    );
  }, [pulseScale]);

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const tipMessage = useMemo(() => {
    if (tasksToGoal === 0) {
      return "You've hit your daily goal! Keep going for bonus points.";
    }
    if (tasksToGoal === 1) {
      return 'Complete 1 more task to hit your daily goal!';
    }
    return `Complete ${tasksToGoal} more tasks to hit your daily goal.`;
  }, [tasksToGoal]);

  const renderCard = useCallback(
    (pressed: boolean) => {
      const translateY = pressed ? shadowHeight : 0;
      const currentShadowHeight = pressed ? 0 : shadowHeight;

      return (
        <View>
          {/* Shadow layer */}
          <View
            style={[
              styles.shadow,
              {
                top: shadowHeight,
                backgroundColor: TodayShadows.cardLedge.color,
                borderRadius: TodayRadii.sm,
              },
            ]}
          />

          {/* Surface */}
          <View
            style={[
              styles.container,
              {
                borderRadius: TodayRadii.sm,
                transform: [{ translateY }],
                marginBottom: currentShadowHeight,
              },
            ]}
          >
            {/* Left: Pulse Circle */}
            <Animated.View style={[styles.circleWrapper, pulseAnimatedStyle]}>
              <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
                {/* Background track */}
                <Circle
                  cx={CIRCLE_SIZE / 2}
                  cy={CIRCLE_SIZE / 2}
                  r={radius}
                  stroke={TodayColors.progressTrack}
                  strokeWidth={STROKE_WIDTH}
                  fill="transparent"
                />
                {/* Progress arc */}
                <Circle
                  cx={CIRCLE_SIZE / 2}
                  cy={CIRCLE_SIZE / 2}
                  r={radius}
                  stroke={color}
                  strokeWidth={STROKE_WIDTH}
                  fill="transparent"
                  strokeDasharray={`${progress} ${circumference}`}
                  strokeLinecap="round"
                  rotation={-90}
                  origin={`${CIRCLE_SIZE / 2}, ${CIRCLE_SIZE / 2}`}
                />
              </Svg>
              {/* Center content */}
              <View style={styles.circleCenter}>
                <Text style={styles.emoji}>{emoji}</Text>
                <Text style={[styles.scoreText, { color }]}>{score}</Text>
              </View>
            </Animated.View>

            {/* Right: Info */}
            <View style={styles.infoSection}>
              <Text style={[styles.label, { color }]}>{label}</Text>
              <Text style={styles.subtitle}>Your Parenting Pulse</Text>

              {/* Breakdown */}
              <View style={styles.breakdown}>
                <Text style={styles.breakdownText}>
                  Tasks: {tasksCompleted}/{totalTasks}
                </Text>
                {streakDays > 0 && (
                  <Text style={styles.breakdownText}>
                    Streak: {streakDays} day{streakDays !== 1 ? 's' : ''} 🔥
                  </Text>
                )}
              </View>

              {/* Actionable Tip */}
              <View style={styles.tipBox}>
                <Text style={styles.tipText}>{tipMessage}</Text>
              </View>
            </View>
          </View>
        </View>
      );
    },
    [
      circumference,
      color,
      emoji,
      label,
      progress,
      pulseAnimatedStyle,
      radius,
      score,
      shadowHeight,
      streakDays,
      tasksCompleted,
      tipMessage,
      totalTasks,
    ]
  );

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Your Parenting Pulse: ${score}%, ${label}`}
      disabled={!onPress}
    >
      {({ pressed }) => renderCard(pressed)}
    </Pressable>
  );
}

export const ParentingPulse = memo(ParentingPulseComponent);

const styles = StyleSheet.create({
  shadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flexDirection: 'row',
    padding: TodaySpacing[14],
    backgroundColor: TodayColors.bgCard,
    borderWidth: 2,
    borderColor: TodayColors.strokeSubtle,
  },
  circleWrapper: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 18,
    marginBottom: -2,
  },
  scoreText: {
    fontSize: 18,
    fontFamily: TodayTypography.bricolageBold,
  },
  infoSection: {
    flex: 1,
    marginLeft: TodaySpacing[14],
    justifyContent: 'center',
  },
  label: {
    fontSize: TodayTypography.h3.fontSize,
    lineHeight: TodayTypography.h3.lineHeight,
    fontFamily: TodayTypography.bricolageSemiBold,
  },
  subtitle: {
    fontSize: TodayTypography.caption.fontSize,
    lineHeight: TodayTypography.caption.lineHeight,
    color: TodayColors.textMuted,
    fontFamily: TodayTypography.poppinsSemiBold,
    marginBottom: TodaySpacing[6],
  },
  breakdown: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: TodaySpacing[10],
    marginBottom: TodaySpacing[8],
  },
  breakdownText: {
    fontSize: TodayTypography.caption.fontSize,
    lineHeight: TodayTypography.caption.lineHeight,
    color: TodayColors.textSecondary,
    fontFamily: TodayTypography.poppinsMedium,
  },
  tipBox: {
    backgroundColor: TodayColors.warningBg,
    borderRadius: TodayRadii.xs,
    paddingHorizontal: TodaySpacing[10],
    paddingVertical: TodaySpacing[6],
    borderWidth: 2,
    borderColor: TodayColors.warningBorder,
  },
  tipText: {
    fontSize: TodayTypography.caption.fontSize,
    lineHeight: TodayTypography.caption.lineHeight,
    color: TodayColors.textSecondary,
    fontFamily: TodayTypography.poppinsSemiBold,
  },
});

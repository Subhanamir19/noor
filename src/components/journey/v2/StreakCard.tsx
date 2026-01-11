/**
 * StreakCard Component
 *
 * Enhanced streak display with weekly dots visualization.
 * Shows current streak, longest streak, and last 7 days activity.
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

import { NewJourneyColors, NewJourneyAnimations } from '@/constants/journeyTokensV2';

interface StreakCardProps {
  currentStreak: number;
  longestStreak: number;
  weekDays: boolean[]; // Last 7 days [oldest...newest]
  onPress?: () => void;
}

export const StreakCard: React.FC<StreakCardProps> = ({
  currentStreak,
  longestStreak,
  weekDays,
  onPress,
}) => {
  const scale = useSharedValue(1);

  const animatedCard = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98, {
      damping: NewJourneyAnimations.pressSpring.damping,
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1.0, {
      damping: NewJourneyAnimations.pressSpring.damping,
    });
  };

  const handlePress = () => {
    onPress?.();
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.card, animatedCard]}>
        <View style={styles.content}>
          {/* Flame Icon + Streak Number */}
          <View style={styles.header}>
            <View style={styles.flameContainer}>
              <LinearGradient
                colors={[NewJourneyColors.streakFlame, NewJourneyColors.streakFlameEnd]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.flameGradient}
              >
                <Text style={styles.flameIcon}>🔥</Text>
              </LinearGradient>
            </View>

            <View style={styles.streakInfo}>
              <View style={styles.streakRow}>
                <Text style={styles.streakNumber}>{currentStreak}</Text>
                <Text style={styles.streakLabel}>Day Streak</Text>
              </View>
              <Text style={styles.longestStreak}>
                Longest: {longestStreak} days
                {currentStreak > 0 && ' · Keep going! 💪'}
              </Text>
            </View>
          </View>

          {/* Week Visualization */}
          <View style={styles.weekContainer}>
            <Text style={styles.weekLabel}>Last 7 days</Text>
            <View style={styles.weekDots}>
              {weekDays.map((completed, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    completed ? styles.dotCompleted : styles.dotMissed,
                  ]}
                />
              ))}
            </View>
          </View>
        </View>

        {/* Tap hint */}
        {onPress && (
          <View style={styles.tapHint}>
            <Text style={styles.tapHintText}>Tap for details</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: NewJourneyColors.streakBg,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  content: {
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flameContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: 'hidden',
  },
  flameGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flameIcon: {
    fontSize: 24,
  },
  streakInfo: {
    flex: 1,
    gap: 4,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  streakNumber: {
    fontSize: 24,
    fontFamily: 'BricolageGrotesque-Bold',
    color: NewJourneyColors.textPrimary,
    letterSpacing: -0.5,
  },
  streakLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: NewJourneyColors.textSecondary,
  },
  longestStreak: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: NewJourneyColors.textTertiary,
  },
  weekContainer: {
    gap: 8,
  },
  weekLabel: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: NewJourneyColors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  weekDots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  dotCompleted: {
    backgroundColor: NewJourneyColors.completed,
  },
  dotMissed: {
    backgroundColor: '#E5E7EB',
  },
  tapHint: {
    marginTop: 8,
    alignItems: 'center',
  },
  tapHintText: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: NewJourneyColors.textMuted,
  },
});

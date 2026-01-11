/**
 * EmptyState Component
 *
 * Motivating first-visit experience for users with no photos yet.
 * Shows inspiring message and guides them to take first photo.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withSequence,
} from 'react-native-reanimated';

import { NewJourneyColors } from '@/constants/journeyTokensV2';

export const EmptyState: React.FC = () => {
  const seedScale = useSharedValue(1);

  // Gentle grow animation for seed icon
  React.useEffect(() => {
    seedScale.value = withRepeat(
      withSequence(
        withSpring(1.1, { damping: 10 }),
        withSpring(1.0, { damping: 10 })
      ),
      -1,
      true
    );
  }, []);

  const animatedSeed = useAnimatedStyle(() => ({
    transform: [{ scale: seedScale.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Seed icon with animation */}
        <Animated.Text style={[styles.icon, animatedSeed]}>
          🌱
        </Animated.Text>

        {/* Title */}
        <Text style={styles.title}>Your Story Starts Now</Text>

        {/* Description */}
        <Text style={styles.description}>
          Every great journey begins with a single step. Take your first photo
          today and watch your beautiful timeline grow.
        </Text>

        {/* Features list */}
        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Daily photo timeline</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Streak tracking & milestones</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Memory compilations</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureIcon}>✓</Text>
            <Text style={styles.featureText}>Character growth documentation</Text>
          </View>
        </View>

        {/* Encouragement */}
        <Text style={styles.encouragement}>
          Begin your beautiful journey, inshallah 💚
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  icon: {
    fontSize: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'BricolageGrotesque-Bold',
    color: NewJourneyColors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: NewJourneyColors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  features: {
    width: '100%',
    gap: 12,
    marginBottom: 24,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    fontSize: 18,
    color: NewJourneyColors.completed,
  },
  featureText: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    color: NewJourneyColors.textSecondary,
  },
  encouragement: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: NewJourneyColors.textTertiary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

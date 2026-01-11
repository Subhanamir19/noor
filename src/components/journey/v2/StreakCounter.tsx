/**
 * StreakCounter Component
 *
 * Floating flame badge showing current streak.
 * Features subtle flame flicker animation.
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import {
  NewJourneyColors,
  NewJourneySizes,
  NewJourneyTypography,
  NewJourneyAnimations,
} from '@/constants/journeyTokensV2';

interface StreakCounterProps {
  streak: number;
  style?: ViewStyle;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({
  streak,
  style,
}) => {
  const scale = useSharedValue(1);
  const flameScale = useSharedValue(1);

  // Subtle flame flicker animation
  React.useEffect(() => {
    flameScale.value = withRepeat(
      withSequence(
        withSpring(1.1, { damping: 10 }),
        withSpring(1.0, { damping: 10 })
      ),
      -1,
      true
    );
  }, []);

  const animatedContainer = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedFlame = useAnimatedStyle(() => ({
    transform: [{ scale: flameScale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.92);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1.0);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style}
    >
      <Animated.View style={[styles.container, animatedContainer]}>
        {/* Shadow ledge */}
        <View style={styles.shadow} />

        {/* Badge surface */}
        <View style={styles.badge}>
          {/* Flame icon */}
          <Animated.Text style={[styles.flame, animatedFlame]}>
            🔥
          </Animated.Text>

          {/* Streak number */}
          <Text style={styles.streakNumber}>{streak}</Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: NewJourneySizes.streakBadgeSize,
    height: NewJourneySizes.streakBadgeSize + 5,
  },
  badge: {
    width: NewJourneySizes.streakBadgeSize,
    height: NewJourneySizes.streakBadgeSize,
    borderRadius: NewJourneySizes.streakBadgeSize / 2,
    backgroundColor: NewJourneyColors.streakBg,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.04)',
    zIndex: 2,
  },
  flame: {
    fontSize: NewJourneySizes.streakIconSize,
    marginBottom: -2,
  },
  streakNumber: {
    fontSize: NewJourneyTypography.streakNumber.fontSize,
    fontFamily: NewJourneyTypography.streakNumber.fontFamily,
    color: NewJourneyColors.textPrimary,
    letterSpacing: -0.5,
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    width: NewJourneySizes.streakBadgeSize,
    height: NewJourneySizes.streakBadgeSize,
    borderRadius: NewJourneySizes.streakBadgeSize / 2,
    backgroundColor: NewJourneyColors.streakShadow,
    zIndex: 1,
  },
});

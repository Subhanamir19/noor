/**
 * MiniMascot - Small mascot character that appears on task cards
 *
 * This is a placeholder component. Replace with actual mascot
 * illustration asset when available.
 *
 * Features:
 * - Small green blob character
 * - Peeking pose (hiding behind card edge)
 * - Optional animation (idle breathing, etc.)
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import {
  TodayScreenColors,
  TodayScreenSizes,
} from '@/constants/todayScreenTokens';

interface MiniMascotProps {
  size?: number;
  animated?: boolean;
  style?: object;
}

export function MiniMascot({
  size = TodayScreenSizes.miniMascot,
  animated = true,
  style,
}: MiniMascotProps) {
  // Subtle breathing animation
  const scale = useSharedValue(1);
  const translateY = useSharedValue(0);

  React.useEffect(() => {
    if (animated) {
      // Gentle breathing effect
      scale.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1500 }),
          withTiming(1, { duration: 1500 })
        ),
        -1, // infinite
        true // reverse
      );

      // Subtle bob
      translateY.value = withRepeat(
        withSequence(
          withTiming(-2, { duration: 1200 }),
          withTiming(0, { duration: 1200 })
        ),
        -1,
        true
      );
    }
  }, [animated]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <Animated.View style={[styles.container, { width: size, height: size }, animatedStyle, style]}>
      {/* Mascot Body - Simple blob placeholder */}
      <View style={[styles.body, { width: size * 0.85, height: size * 0.75 }]}>
        {/* Eyes */}
        <View style={styles.eyesContainer}>
          <View style={[styles.eye, { width: size * 0.15, height: size * 0.15 }]} />
          <View style={[styles.eye, { width: size * 0.15, height: size * 0.15 }]} />
        </View>
        {/* Blush marks */}
        <View style={styles.blushContainer}>
          <View style={[styles.blush, { width: size * 0.1, height: size * 0.06 }]} />
          <View style={[styles.blush, { width: size * 0.1, height: size * 0.06 }]} />
        </View>
      </View>
      {/* Leaf/sprout on top */}
      <Text style={[styles.sprout, { fontSize: size * 0.35 }]}>🌱</Text>
    </Animated.View>
  );
}

/**
 * MiniMascotEmoji - Even simpler emoji-only placeholder
 */
export function MiniMascotEmoji({ size = TodayScreenSizes.miniMascot }: { size?: number }) {
  return (
    <View style={[styles.emojiContainer, { width: size, height: size }]}>
      <Text style={{ fontSize: size * 0.8 }}>🌿</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  body: {
    backgroundColor: TodayScreenColors.mascotGreen,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  eyesContainer: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 2,
  },
  eye: {
    backgroundColor: '#2D3436',
    borderRadius: 100,
  },
  blushContainer: {
    flexDirection: 'row',
    gap: 12,
    position: 'absolute',
    bottom: '25%',
  },
  blush: {
    backgroundColor: 'rgba(255,182,193,0.6)',
    borderRadius: 100,
  },
  sprout: {
    position: 'absolute',
    top: -4,
  },
  emojiContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/**
 * TreasureChest Component
 *
 * Milestone marker displayed every 7 days in the journey path.
 * Features shake animation on press and visual feedback.
 */

import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import type { JourneyDay } from '@/types/journey';
import { JourneySizes, JourneyAnimations, JourneyColors } from '@/constants/journeyTokens';
import { mediumHaptic } from '@/utils/haptics';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TreasureChestProps {
  day: JourneyDay;
  onPress: () => void;
  testID?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const { chestSize } = JourneySizes;
const { chestShakeAngle, pressSpring, pressScale } = JourneyAnimations;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function TreasureChestComponent({ day, onPress, testID }: TreasureChestProps) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const handlePressIn = () => {
    scale.value = withSpring(pressScale, pressSpring);
    // Shake animation
    rotation.value = withSequence(
      withTiming(-chestShakeAngle, { duration: 50 }),
      withTiming(chestShakeAngle, { duration: 100 }),
      withTiming(-chestShakeAngle, { duration: 100 }),
      withTiming(0, { duration: 50 })
    );
    mediumHaptic();
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, pressSpring);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const isOpened = day.status === 'logged';
  const isLocked = day.status === 'locked';

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isLocked}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={`Milestone day ${day.dayNumber}`}
      accessibilityState={{ disabled: isLocked }}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        {/* Glow ring when available */}
        {!isOpened && !isLocked && (
          <View style={styles.glowRing} />
        )}

        {/* Chest visual - using emoji as placeholder, replace with image */}
        <View style={[
          styles.chestContainer,
          isLocked && styles.chestLocked,
        ]}>
          <Text style={styles.chestEmoji}>
            {isOpened ? '🎁' : '📦'}
          </Text>
        </View>

        {/* Day number badge */}
        <View style={[
          styles.dayBadge,
          isLocked && styles.dayBadgeLocked,
        ]}>
          <Text style={[
            styles.dayBadgeText,
            isLocked && styles.dayBadgeTextLocked,
          ]}>
            {day.dayNumber}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    width: chestSize,
    height: chestSize + 16, // Extra space for badge
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowRing: {
    position: 'absolute',
    width: chestSize + 12,
    height: chestSize + 12,
    borderRadius: (chestSize + 12) / 2,
    borderWidth: 3,
    borderColor: JourneyColors.nodeGoldLight,
    opacity: 0.6,
  },
  chestContainer: {
    width: chestSize,
    height: chestSize,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: JourneyColors.headerYellow,
    borderRadius: 12,
    // 3D effect
    shadowColor: '#B45309',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 0,
    elevation: 4,
  },
  chestLocked: {
    backgroundColor: JourneyColors.nodeGrayDark,
    shadowColor: JourneyColors.nodeGrayShadow,
  },
  chestEmoji: {
    fontSize: 36,
  },
  dayBadge: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: JourneyColors.nodeGoldDark,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  dayBadgeLocked: {
    backgroundColor: JourneyColors.nodeGrayShadow,
  },
  dayBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: JourneyColors.textDark,
    fontFamily: 'Poppins-Bold',
  },
  dayBadgeTextLocked: {
    color: JourneyColors.textMuted,
  },
});

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const TreasureChest = memo(TreasureChestComponent);

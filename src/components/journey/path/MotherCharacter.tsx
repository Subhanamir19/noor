/**
 * MotherCharacter Component
 *
 * Animated companion character displayed alongside the journey path.
 * Currently a placeholder - will be replaced with Lottie animation.
 */

import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';

import { JourneySizes, JourneyColors } from '@/constants/journeyTokens';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MotherCharacterProps {
  scrollY: SharedValue<number>;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const { characterWidth, characterHeight } = JourneySizes;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function MotherCharacterComponent({ scrollY }: MotherCharacterProps) {
  // Subtle parallax movement based on scroll
  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, 300],
      [0, 40],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {/* Placeholder character - replace with Lottie/Image */}
      <View style={styles.characterBody}>
        {/* Head */}
        <View style={styles.head}>
          {/* Hijab */}
          <View style={styles.hijab} />
          {/* Face */}
          <View style={styles.face}>
            <Text style={styles.faceEmoji}>👩</Text>
          </View>
        </View>

        {/* Body */}
        <View style={styles.body} />

        {/* Arms (simplified) */}
        <View style={styles.armLeft} />
        <View style={styles.armRight} />
      </View>

      {/* Stars rating below character (like Duolingo) */}
      <View style={styles.starsContainer}>
        <View style={[styles.star, styles.starFilled]} />
        <View style={[styles.star, styles.starFilled]} />
        <View style={[styles.star, styles.starEmpty]} />
      </View>

      {/* Character name/label */}
      <Text style={styles.characterName}>Mama</Text>
    </Animated.View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    width: characterWidth,
    alignItems: 'center',
    paddingTop: 8,
  },
  characterBody: {
    width: characterWidth,
    height: characterHeight,
    alignItems: 'center',
    position: 'relative',
  },
  head: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  hijab: {
    position: 'absolute',
    width: 50,
    height: 40,
    backgroundColor: '#7C3AED', // Purple hijab
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    top: -4,
  },
  face: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FECACA',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  faceEmoji: {
    fontSize: 24,
    marginTop: -2,
  },
  body: {
    width: 48,
    height: 52,
    backgroundColor: '#7C3AED',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    marginTop: -6,
    // 3D shadow
    shadowColor: '#5B21B6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    elevation: 3,
  },
  armLeft: {
    position: 'absolute',
    width: 14,
    height: 32,
    backgroundColor: '#7C3AED',
    borderRadius: 7,
    left: 8,
    top: 48,
    transform: [{ rotate: '20deg' }],
  },
  armRight: {
    position: 'absolute',
    width: 14,
    height: 32,
    backgroundColor: '#7C3AED',
    borderRadius: 7,
    right: 8,
    top: 48,
    transform: [{ rotate: '-20deg' }],
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 8,
    gap: 4,
  },
  star: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  starFilled: {
    backgroundColor: JourneyColors.nodeGoldLight,
  },
  starEmpty: {
    backgroundColor: JourneyColors.nodeGrayShadow,
  },
  characterName: {
    fontSize: 11,
    fontWeight: '600',
    color: JourneyColors.textSecondary,
    fontFamily: 'Poppins-SemiBold',
    marginTop: 4,
  },
});

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const MotherCharacter = memo(MotherCharacterComponent);

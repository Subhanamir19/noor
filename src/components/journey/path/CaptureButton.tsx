/**
 * CaptureButton Component
 *
 * Floating action button for capturing today's photo.
 * Features 3D chunky style with press animation.
 */

import React, { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { CameraIcon } from 'react-native-heroicons/solid';

import { JourneySizes, JourneyAnimations, JourneyColors } from '@/constants/journeyTokens';
import { mediumHaptic } from '@/utils/haptics';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CaptureButtonProps {
  onPress: () => void;
  testID?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const { fabSize, fabShadowHeight } = JourneySizes;
const { pressSpring, pressScale } = JourneyAnimations;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function CaptureButtonComponent({ onPress, testID }: CaptureButtonProps) {
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(pressScale, pressSpring);
    mediumHaptic();
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, pressSpring);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      style={styles.container}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel="Capture today's moment"
    >
      <Animated.View style={[styles.buttonWrapper, animatedStyle]}>
        {/* Main button with gradient */}
        <LinearGradient
          colors={[JourneyColors.ctaPrimary, JourneyColors.ctaPrimaryShadow]}
          style={styles.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Glossy highlight */}
          <View style={styles.glossyHighlight} />

          {/* Camera icon */}
          <CameraIcon size={30} color={JourneyColors.textInverse} />
        </LinearGradient>

        {/* 3D Shadow */}
        <View style={styles.shadow} />
      </Animated.View>
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100, // Above tab bar
    right: 20,
    zIndex: 50,
  },
  buttonWrapper: {
    width: fabSize,
    height: fabSize + fabShadowHeight,
  },
  button: {
    width: fabSize,
    height: fabSize,
    borderRadius: fabSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    position: 'relative',
    overflow: 'hidden',
    // Subtle border for definition
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  glossyHighlight: {
    position: 'absolute',
    top: 4,
    left: 10,
    right: 10,
    height: fabSize * 0.3,
    backgroundColor: JourneyColors.glossyHighlight,
    borderRadius: fabSize / 2,
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    width: fabSize,
    height: fabSize,
    borderRadius: fabSize / 2,
    backgroundColor: JourneyColors.ctaPrimaryShadow,
    zIndex: 1,
  },
});

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const CaptureButton = memo(CaptureButtonComponent);

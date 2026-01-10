/**
 * DayNode Component
 *
 * A 3D "chunky" style circular button representing a single day
 * in the journey path. Features Duolingo-style depth shadow,
 * glossy highlight, and animated press feedback.
 */

import React, { memo, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import type { DayStatus } from '@/types/journey';
import {
  JourneySizes,
  JourneyAnimations,
  NodeGradients,
  NodeShadowColors,
  NodeTextColors,
  JourneyColors,
} from '@/constants/journeyTokens';
import { TodayTypography } from '@/constants/todayTokens';
import { lightHaptic } from '@/utils/haptics';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DayNodeProps {
  dayNumber: number;
  status: DayStatus;
  onPress: () => void;
  testID?: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const { nodeSize, nodeShadowHeight, nodeGlowSize } = JourneySizes;
const { pressSpring, pressScale, glowPulseDuration } = JourneyAnimations;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function DayNodeComponent({ dayNumber, status, onPress, testID }: DayNodeProps) {
  // Animation values
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.4);
  const glowScale = useSharedValue(1);

  // Glow animation for "today" node
  useEffect(() => {
    if (status === 'today') {
      // Pulsing glow effect
      glowOpacity.value = withRepeat(
        withSequence(
          withTiming(0.8, { duration: glowPulseDuration, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.4, { duration: glowPulseDuration, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
      glowScale.value = withRepeat(
        withSequence(
          withTiming(1.1, { duration: glowPulseDuration, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: glowPulseDuration, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      );
    } else {
      // Reset glow for non-today nodes
      glowOpacity.value = withTiming(0);
      glowScale.value = withTiming(1);
    }
  }, [status, glowOpacity, glowScale]);

  // Press handlers
  const handlePressIn = () => {
    scale.value = withSpring(pressScale, pressSpring);
    lightHaptic();
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, pressSpring);
  };

  // Animated styles
  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: glowScale.value }],
  }));

  // Get colors based on status
  const gradientColors = NodeGradients[status];
  const shadowColor = NodeShadowColors[status];
  const textColor = NodeTextColors[status];

  // Disabled state for locked nodes
  const isDisabled = status === 'locked';

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={`Day ${dayNumber}${status === 'today' ? ', today' : ''}`}
      accessibilityState={{ disabled: isDisabled }}
    >
      {({ pressed }) => {
        const translateY = pressed && !isDisabled ? nodeShadowHeight : 0;
        const currentShadowHeight = pressed && !isDisabled ? 0 : nodeShadowHeight;

        return (
          <Animated.View style={[styles.container, animatedContainerStyle]}>
            {/* Glow effect for today */}
            {status === 'today' && (
              <Animated.View style={[styles.glowEffect, animatedGlowStyle]} />
            )}

            <View style={styles.nodeWrapper}>
              {/* Shadow / ledge */}
              <View style={[styles.shadowLayer, { backgroundColor: shadowColor }]} />

              {/* Surface */}
              <View
                style={{
                  transform: [{ translateY }],
                  marginBottom: currentShadowHeight,
                }}
              >
                <LinearGradient
                  colors={[...gradientColors]}
                  style={styles.node}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0.5, y: 1 }}
                >
                  <View style={styles.glossyHighlight} />
                  <Text style={[styles.dayNumber, { color: textColor }]}>
                    {dayNumber}
                  </Text>
                </LinearGradient>
              </View>
            </View>
          </Animated.View>
        );
      }}
    </Pressable>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    width: nodeSize,
    height: nodeSize + nodeShadowHeight,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  glowEffect: {
    position: 'absolute',
    width: nodeGlowSize,
    height: nodeGlowSize,
    borderRadius: nodeGlowSize / 2,
    backgroundColor: JourneyColors.nodeTodayGlow,
    top: (nodeSize - nodeGlowSize) / 2,
    left: (nodeSize - nodeGlowSize) / 2,
    // Glow shadow
    shadowColor: JourneyColors.nodeTodayGlow,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 8,
  },
  nodeWrapper: {
    width: nodeSize,
    height: nodeSize + nodeShadowHeight,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  node: {
    width: nodeSize,
    height: nodeSize,
    borderRadius: nodeSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 2,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  glossyHighlight: {
    position: 'absolute',
    top: 4,
    left: 10,
    right: 10,
    height: nodeSize * 0.32,
    backgroundColor: JourneyColors.glossyHighlight,
    borderRadius: nodeSize / 2,
  },
  dayNumber: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: TodayTypography.bricolageBold,
    zIndex: 3,
    // Text shadow for depth
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  shadowLayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: nodeSize,
    height: nodeSize,
    borderRadius: nodeSize / 2,
    zIndex: 1,
  },
});

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const DayNode = memo(DayNodeComponent);

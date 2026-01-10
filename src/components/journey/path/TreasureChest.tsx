/**
 * TreasureChest Component
 *
 * Milestone marker displayed every N days in the journey path.
 * Uses the same 3D "ledge" press model as other primary interactives.
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
import { LinearGradient } from 'expo-linear-gradient';
import { GiftIcon, LockClosedIcon, SparklesIcon } from 'react-native-heroicons/solid';

import type { JourneyDay } from '@/types/journey';
import {
  JourneyAnimations,
  JourneyColors,
  JourneySizes,
  NodeGradients,
  NodeShadowColors,
} from '@/constants/journeyTokens';
import { TodayColors, TodayRadii, TodaySpacing, TodayTypography } from '@/constants/todayTokens';
import { mediumHaptic } from '@/utils/haptics';

interface TreasureChestProps {
  day: JourneyDay;
  onPress: () => void;
  testID?: string;
}

const { chestSize, chestShadowHeight } = JourneySizes;
const { chestShakeAngle, pressSpring, pressScale } = JourneyAnimations;

function TreasureChestComponent({ day, onPress, testID }: TreasureChestProps) {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const isOpened = day.status === 'logged';
  const isLocked = day.status === 'locked';

  const handlePressIn = () => {
    if (isLocked) return;
    scale.value = withSpring(pressScale, pressSpring);
    rotation.value = withSequence(
      withTiming(-chestShakeAngle, { duration: 50 }),
      withTiming(chestShakeAngle, { duration: 100 }),
      withTiming(-chestShakeAngle, { duration: 100 }),
      withTiming(0, { duration: 50 })
    );
    mediumHaptic();
  };

  const handlePressOut = () => {
    if (isLocked) return;
    scale.value = withSpring(1, pressSpring);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  const surfaceColors = isLocked
    ? (['#E5E7EB', '#D1D5DB'] as const)
    : isOpened
      ? ([TodayColors.ctaPrimary, TodayColors.ctaPrimaryShadow] as const)
      : NodeGradients.today;

  const ledgeColor = isLocked
    ? '#C7CBD1'
    : isOpened
      ? TodayColors.ctaPrimaryShadow
      : NodeShadowColors.today;

  const icon = isLocked ? (
    <LockClosedIcon size={30} color={TodayColors.textMuted} />
  ) : isOpened ? (
    <SparklesIcon size={30} color={TodayColors.textInverse} />
  ) : (
    <GiftIcon size={30} color={TodayColors.textPrimary} />
  );

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
      {({ pressed }) => {
        const translateY = pressed && !isLocked ? chestShadowHeight : 0;
        const currentShadowHeight = pressed && !isLocked ? 0 : chestShadowHeight;

        return (
          <Animated.View style={[styles.container, animatedStyle]}>
            <View style={[styles.shadowLayer, { backgroundColor: ledgeColor }]} />

            <View style={{ transform: [{ translateY }], marginBottom: currentShadowHeight }}>
              <LinearGradient
                colors={surfaceColors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.surface,
                  isLocked && styles.surfaceLocked,
                ]}
              >
                <View style={styles.glossyHighlight} />
                {icon}
              </LinearGradient>
            </View>

            <View style={[styles.dayBadge, isLocked && styles.dayBadgeLocked]}>
              <Text style={[styles.dayBadgeText, isLocked && styles.dayBadgeTextLocked]}>
                {day.dayNumber}
              </Text>
            </View>
          </Animated.View>
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: chestSize,
    height: chestSize + chestShadowHeight + 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  shadowLayer: {
    position: 'absolute',
    bottom: 16,
    width: chestSize,
    height: chestSize,
    borderRadius: TodayRadii.lg,
  },
  surface: {
    width: chestSize,
    height: chestSize,
    borderRadius: TodayRadii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  surfaceLocked: {
    borderColor: TodayColors.strokeSubtle,
  },
  glossyHighlight: {
    position: 'absolute',
    top: 6,
    left: 10,
    right: 10,
    height: chestSize * 0.28,
    backgroundColor: JourneyColors.glossyHighlight,
    borderRadius: TodayRadii.lg,
  },
  dayBadge: {
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: TodaySpacing[12],
    paddingVertical: TodaySpacing[4],
    borderRadius: TodayRadii.pill,
    backgroundColor: TodayColors.card,
    borderWidth: 1,
    borderColor: TodayColors.strokeSubtle,
  },
  dayBadgeLocked: {
    backgroundColor: TodayColors.ctaDisabled,
  },
  dayBadgeText: {
    fontSize: 12,
    lineHeight: 16,
    color: TodayColors.textPrimary,
    fontFamily: TodayTypography.poppinsSemiBold,
  },
  dayBadgeTextLocked: {
    color: TodayColors.textMuted,
  },
});

export const TreasureChest = memo(TreasureChestComponent);


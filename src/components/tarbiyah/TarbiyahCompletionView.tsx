/**
 * TarbiyahCompletionView - Post-completion celebration and tomorrow teaser
 *
 * Shows after user completes all 5 steps of the daily lesson.
 * Emotional arc: Celebration → Gentle anticipation for tomorrow
 */

import React, { memo, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import {
  TarbiyahColors,
  TarbiyahTypography,
  TarbiyahSpacing,
  TarbiyahRadius,
  TarbiyahMotion,
  TarbiyahSizes,
  TarbiyahRgba,
} from '../../constants/tarbiyahTokens';
import { getTraitDisplayName, getTraitEmoji } from '../../data/tarbiyahLessons';
import type { TarbiyahLesson } from '../../data/tarbiyahLessons';

interface TarbiyahCompletionViewProps {
  lesson: TarbiyahLesson;
  onClose: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function TarbiyahCompletionViewComponent({
  lesson,
  onClose,
}: TarbiyahCompletionViewProps) {
  const checkScale = useSharedValue(0);
  const checkOpacity = useSharedValue(0);
  const glowScale = useSharedValue(1);
  const buttonScale = useSharedValue(1);

  // Celebration animation on mount
  useEffect(() => {
    // Check mark entrance
    checkOpacity.value = withDelay(200, withTiming(1, { duration: 300 }));
    checkScale.value = withDelay(
      200,
      withSequence(
        withSpring(1.2, TarbiyahMotion.springBouncy),
        withSpring(1, TarbiyahMotion.spring)
      )
    );

    // Pulsing glow
    const pulseGlow = () => {
      glowScale.value = withSequence(
        withTiming(1.3, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      );
    };
    pulseGlow();
    const interval = setInterval(pulseGlow, 3000);

    return () => clearInterval(interval);
  }, [checkScale, checkOpacity, glowScale]);

  const checkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
    opacity: checkOpacity.value,
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.97, TarbiyahMotion.spring);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1, TarbiyahMotion.spring);
  };

  const handleClose = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onClose();
  };

  const traitName = getTraitDisplayName(lesson.trait);
  const traitEmoji = getTraitEmoji(lesson.trait);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Celebration Section */}
        <View style={styles.celebrationSection}>
          {/* Glow behind check */}
          <Animated.View style={[styles.glow, glowAnimatedStyle]} />

          {/* Check mark */}
          <Animated.View style={[styles.checkCircle, checkAnimatedStyle]}>
            <Text style={styles.checkIcon}>✓</Text>
          </Animated.View>

          <Animated.Text
            entering={FadeInDown.delay(400).duration(TarbiyahMotion.durationSlow).springify()}
            style={styles.completedTitle}
          >
            Lesson Complete
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.delay(500).duration(TarbiyahMotion.durationSlow).springify()}
            style={styles.completedSubtitle}
          >
            You practiced {traitName} today {traitEmoji}
          </Animated.Text>

          {/* Day Badge */}
          <Animated.View
            entering={FadeIn.delay(600).duration(TarbiyahMotion.durationSlow)}
            style={styles.dayBadge}
          >
            <Text style={styles.dayBadgeText}>Day {lesson.dayNumber} of 40</Text>
          </Animated.View>
        </View>

        {/* Tomorrow Teaser */}
        <Animated.View
          entering={FadeInDown.delay(800).duration(TarbiyahMotion.durationSlow).springify()}
          style={styles.teaserSection}
        >
          <Text style={styles.teaserLabel}>Coming Tomorrow</Text>
          <Text style={styles.teaserText}>{lesson.tomorrowTeaser}</Text>
        </Animated.View>

        {/* Encouragement */}
        <Animated.Text
          entering={FadeIn.delay(1000).duration(TarbiyahMotion.durationVerySlow)}
          style={styles.encouragement}
        >
          Small steps, lasting change. See you tomorrow.
        </Animated.Text>

        {/* Done Button */}
        <Animated.View
          entering={FadeInDown.delay(1100).duration(TarbiyahMotion.durationSlow).springify()}
          style={styles.buttonContainer}
        >
          <AnimatedPressable
            style={[styles.doneButton, buttonAnimatedStyle]}
            onPress={handleClose}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </AnimatedPressable>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: TarbiyahColors.bgPrimary,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: TarbiyahSpacing.screenGutter,
  },
  celebrationSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -TarbiyahSpacing.space64,
  },
  glow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: TarbiyahRgba.psychBg,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: TarbiyahColors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: TarbiyahSpacing.space24,
  },
  checkIcon: {
    fontSize: 40,
    color: TarbiyahColors.white,
    fontWeight: '700',
  },
  completedTitle: {
    fontFamily: TarbiyahTypography.fontHeadline,
    fontSize: TarbiyahTypography.display.fontSize,
    fontWeight: TarbiyahTypography.display.fontWeight,
    lineHeight: TarbiyahTypography.display.lineHeight,
    color: TarbiyahColors.textPrimary,
    textAlign: 'center',
    marginBottom: TarbiyahSpacing.space8,
  },
  completedSubtitle: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.bodyLarge.fontSize,
    fontWeight: TarbiyahTypography.bodyLarge.fontWeight,
    lineHeight: TarbiyahTypography.bodyLarge.lineHeight,
    color: TarbiyahColors.textSecondary,
    textAlign: 'center',
    marginBottom: TarbiyahSpacing.space16,
  },
  dayBadge: {
    backgroundColor: TarbiyahRgba.stepLabelBg,
    borderWidth: 1,
    borderColor: TarbiyahRgba.stepLabelBorder,
    borderRadius: TarbiyahRadius.full,
    paddingHorizontal: TarbiyahSpacing.space16,
    paddingVertical: TarbiyahSpacing.space8,
  },
  dayBadgeText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.caption.fontSize,
    fontWeight: '600',
    color: TarbiyahColors.textAccent,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  teaserSection: {
    backgroundColor: TarbiyahRgba.cardBorder,
    borderRadius: TarbiyahRadius.lg,
    padding: TarbiyahSpacing.cardPadding,
    marginBottom: TarbiyahSpacing.space24,
  },
  teaserLabel: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.caption.fontSize,
    fontWeight: TarbiyahTypography.caption.fontWeight,
    color: TarbiyahColors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: TarbiyahSpacing.space8,
  },
  teaserText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.bodyLarge.fontSize,
    fontWeight: '500',
    lineHeight: TarbiyahTypography.bodyLarge.lineHeight,
    color: TarbiyahColors.textPrimary,
    fontStyle: 'italic',
  },
  encouragement: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.body.fontSize,
    fontWeight: '500',
    lineHeight: TarbiyahTypography.body.lineHeight,
    color: TarbiyahColors.textMuted,
    textAlign: 'center',
    marginBottom: TarbiyahSpacing.space32,
  },
  buttonContainer: {
    paddingBottom: TarbiyahSpacing.space16,
  },
  doneButton: {
    height: TarbiyahSizes.ctaButton,
    backgroundColor: TarbiyahColors.accentPrimary,
    borderRadius: TarbiyahRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.bodyLarge.fontSize,
    fontWeight: '600',
    color: TarbiyahColors.textPrimary,
  },
});

export const TarbiyahCompletionView = memo(TarbiyahCompletionViewComponent);

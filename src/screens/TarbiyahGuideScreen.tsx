/**
 * TarbiyahGuideScreen - Chat-Style Lesson Experience with Noor
 *
 * Design Philosophy:
 * - Noor character presents lessons in a conversational chat interface
 * - Speech bubble with animated typewriter text
 * - Warm, engaging, intimate teaching experience
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
  interpolateColor,
  Easing,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

import {
  WarmColors,
  WarmSpacing,
  WarmRadius,
  WarmTypography,
  WarmShadows,
  WarmMotion,
} from '@/constants/tarbiyahWarmTokens';
import {
  TarbiyahScreenBgs,
  TarbiyahMotion,
  TARBIYAH_STEP_ORDER,
  type TarbiyahStepType,
} from '@/constants/tarbiyahTokens';
import type { TarbiyahLesson } from '@/data/tarbiyahLessons';
import { getTraitEmoji } from '@/data/tarbiyahLessons';
import { Chunky3DButton } from '@/components/tarbiyah/Chunky3DButton';
import { TarbiyahChatView } from '@/components/tarbiyah/chat';
import { TarbiyahProgressBar } from '@/components/tarbiyah/TarbiyahProgressBar';

interface TarbiyahGuideScreenProps {
  lesson: TarbiyahLesson;
  onComplete: () => void;
  onBack: () => void;
}

export function TarbiyahGuideScreen({
  lesson,
  onComplete,
  onBack,
}: TarbiyahGuideScreenProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);
  const backgroundProgress = useSharedValue(0);

  const currentStepType = TARBIYAH_STEP_ORDER[currentStepIndex];
  const currentStep = lesson.steps[currentStepType];

  // Navigate to next step (called by TarbiyahChatView)
  const goToNextStep = useCallback(() => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex >= TARBIYAH_STEP_ORDER.length) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentStepIndex(nextIndex);
    backgroundProgress.value = withTiming(
      nextIndex / (TARBIYAH_STEP_ORDER.length - 1),
      { duration: TarbiyahMotion.durationNormal }
    );
  }, [currentStepIndex, backgroundProgress]);

  // Handle lesson completion (show completion screen)
  const handleLessonComplete = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setShowCompletion(true);
  }, []);

  // Handle final completion (return to tab screen)
  const handleFinalComplete = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onComplete();
  }, [onComplete]);

  // Handle close/back
  const handleClose = useCallback(() => {
    onBack();
  }, [onBack]);

  // Animated background color (transitions between warm step colors)
  const animatedContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      backgroundProgress.value,
      [0, 0.25, 0.5, 0.75, 1],
      [
        WarmColors.bgPrimary,      // Moment - warm cream
        WarmColors.sageLight,      // Sunnah - light sage
        WarmColors.bgSecondary,    // Why - slightly darker cream
        WarmColors.secondaryLight, // Action - warm yellow
        WarmColors.purpleLight,    // Repair - soft purple
      ]
    );

    return { backgroundColor };
  });

  // Show completion screen after lesson is done
  if (showCompletion) {
    return (
      <CompletionScreen
        lesson={lesson}
        onComplete={handleFinalComplete}
      />
    );
  }

  return (
    <Animated.View style={[styles.container, animatedContainerStyle]}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <TarbiyahProgressBar
          currentStep={currentStepIndex}
          onClose={handleClose}
        />

        <TarbiyahChatView
          lesson={lesson}
          currentStepIndex={currentStepIndex}
          currentStepType={currentStepType}
          currentStep={currentStep}
          onContinue={goToNextStep}
          onComplete={handleLessonComplete}
        />
      </SafeAreaView>
    </Animated.View>
  );
}

// Completion Screen Component
function CompletionScreen({
  lesson,
  onComplete,
}: {
  lesson: TarbiyahLesson;
  onComplete: () => void;
}) {
  const checkScale = useSharedValue(0);
  const glowScale = useSharedValue(1);

  useEffect(() => {
    // Check mark bounce in
    checkScale.value = withDelay(
      200,
      withSequence(
        withSpring(1.2, WarmMotion.springBouncy),
        withSpring(1, WarmMotion.springSnappy)
      )
    );

    // Gentle pulsing
    glowScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1200, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1200, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, [checkScale, glowScale]);

  const checkAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: glowScale.value }],
    opacity: 0.2,
  }));

  const traitEmoji = getTraitEmoji(lesson.trait);

  return (
    <View style={styles.completionContainer}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* Decorative particles */}
        <View style={styles.particlesContainer}>
          {[...Array(8)].map((_, i) => (
            <Animated.View
              key={i}
              entering={FadeIn.delay(i * 80).duration(400)}
              style={[
                styles.particle,
                {
                  left: `${(i * 12) + 6}%`,
                  top: 40 + (i % 3) * 20,
                  backgroundColor: i % 3 === 0 ? WarmColors.success : i % 3 === 1 ? WarmColors.secondary : WarmColors.primary,
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.completionContent}>
          {/* Success Badge */}
          <View style={styles.successBadgeContainer}>
            <Animated.View style={[styles.successGlow, glowAnimatedStyle]} />
            <Animated.View style={[styles.successBadge, checkAnimatedStyle]}>
              <Text style={styles.successIcon}>✓</Text>
            </Animated.View>
          </View>

          {/* Title */}
          <Animated.Text
            entering={FadeInDown.delay(400).duration(500).springify()}
            style={styles.completionTitle}
          >
            Well Done!
          </Animated.Text>

          {/* Trait Badge */}
          <Animated.View
            entering={FadeInDown.delay(500).duration(500).springify()}
            style={styles.traitBadge}
          >
            <Text style={styles.traitEmoji}>{traitEmoji}</Text>
            <Text style={styles.completionSubtitle}>
              Day {lesson.dayNumber} Complete
            </Text>
          </Animated.View>

          {/* Tomorrow Teaser Card */}
          <Animated.View
            entering={FadeInUp.delay(700).duration(500).springify()}
            style={styles.teaserCard}
          >
            <Text style={styles.teaserLabel}>Coming tomorrow</Text>
            <Text style={styles.teaserText}>{lesson.tomorrowTeaser}</Text>
          </Animated.View>
        </View>

        {/* Done Button */}
        <Animated.View
          entering={FadeInUp.delay(900).duration(500).springify()}
          style={styles.completionButtonContainer}
        >
          <Chunky3DButton
            label="Continue"
            onPress={onComplete}
            color={WarmColors.success}
            darkColor="#5A9A5A"
          />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },

  // Completion Screen
  completionContainer: {
    flex: 1,
    backgroundColor: WarmColors.bgPrimary,
  },
  particlesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  completionContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: WarmSpacing.screenPadding,
  },
  successBadgeContainer: {
    position: 'relative',
    marginBottom: WarmSpacing['2xl'],
  },
  successGlow: {
    position: 'absolute',
    top: -25,
    left: -25,
    right: -25,
    bottom: -25,
    borderRadius: 75,
    backgroundColor: WarmColors.success,
  },
  successBadge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: WarmColors.success,
    alignItems: 'center',
    justifyContent: 'center',
    ...WarmShadows.cardElevated,
  },
  successIcon: {
    fontSize: 48,
    color: WarmColors.textOnPrimary,
    fontWeight: '700',
  },
  completionTitle: {
    fontFamily: WarmTypography.fontDisplay,
    fontSize: WarmTypography.hero.fontSize,
    fontWeight: WarmTypography.hero.fontWeight,
    color: WarmColors.textPrimary,
    marginBottom: WarmSpacing.md,
  },
  traitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WarmSpacing.sm,
    backgroundColor: WarmColors.bgCard,
    paddingHorizontal: WarmSpacing.lg,
    paddingVertical: WarmSpacing.md,
    borderRadius: WarmRadius.full,
    marginBottom: WarmSpacing['3xl'],
    ...WarmShadows.card,
  },
  traitEmoji: {
    fontSize: 20,
  },
  completionSubtitle: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.label.fontSize,
    fontWeight: '600',
    color: WarmColors.textSecondary,
  },
  teaserCard: {
    width: '100%',
    backgroundColor: WarmColors.bgCard,
    borderRadius: WarmRadius.xl,
    padding: WarmSpacing.xl,
    ...WarmShadows.cardElevated,
  },
  teaserLabel: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.caption.fontSize,
    fontWeight: '600',
    color: WarmColors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: WarmSpacing.sm,
  },
  teaserText: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.bodyLarge.fontSize,
    fontWeight: '500',
    lineHeight: WarmTypography.bodyLarge.lineHeight,
    color: WarmColors.textPrimary,
  },
  completionButtonContainer: {
    width: '100%',
    paddingHorizontal: WarmSpacing.screenPadding,
    paddingBottom: WarmSpacing['3xl'],
  },
});

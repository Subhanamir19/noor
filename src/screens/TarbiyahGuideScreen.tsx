/**
 * TarbiyahGuideScreen - Warm, Journal App-Inspired Lesson Experience
 *
 * Design Philosophy:
 * - Warm cream backgrounds, soft shadows
 * - Card-based content with illustration placeholders
 * - Chunky 3D buttons for navigation
 * - Friendly, approachable, emotionally warm
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  StatusBar,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInRight,
  SlideInLeft,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
  withDelay,
  withRepeat,
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
  WarmSizes,
  WarmStepConfig,
  WARM_STEP_ORDER,
  type WarmStepType,
} from '@/constants/tarbiyahWarmTokens';
import type { TarbiyahLesson } from '@/data/tarbiyahLessons';
import { getTraitEmoji } from '@/data/tarbiyahLessons';
import { Chunky3DButton } from '@/components/tarbiyah/Chunky3DButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);

  // Animations
  const progressWidth = useSharedValue(0);

  const currentStepType = WARM_STEP_ORDER[currentStepIndex] as WarmStepType;
  const currentStep = lesson.steps[currentStepType];
  const stepConfig = WarmStepConfig[currentStepType];
  const isLastStep = currentStepIndex === WARM_STEP_ORDER.length - 1;
  const isFirstStep = currentStepIndex === 0;

  // Update progress bar
  useEffect(() => {
    progressWidth.value = withTiming(
      ((currentStepIndex + 1) / WARM_STEP_ORDER.length) * 100,
      { duration: WarmMotion.normal, easing: Easing.out(Easing.ease) }
    );
  }, [currentStepIndex, progressWidth]);

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const goToNextStep = useCallback(async () => {
    if (isTransitioning) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (isLastStep) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setShowCompletion(true);
      return;
    }

    setIsTransitioning(true);
    setDirection('forward');
    setTimeout(() => {
      setCurrentStepIndex((prev) => prev + 1);
      setIsTransitioning(false);
    }, 50);
  }, [isLastStep, isTransitioning]);

  const goToPreviousStep = useCallback(async () => {
    if (isTransitioning) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (isFirstStep) {
      onBack();
      return;
    }

    setIsTransitioning(true);
    setDirection('backward');
    setTimeout(() => {
      setCurrentStepIndex((prev) => prev - 1);
      setIsTransitioning(false);
    }, 50);
  }, [isFirstStep, isTransitioning, onBack]);

  const handleComplete = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onComplete();
  }, [onComplete]);

  // Completion Screen
  if (showCompletion) {
    return (
      <CompletionScreen
        lesson={lesson}
        onComplete={handleComplete}
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: stepConfig.colors.bg }]}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header */}
        <View style={styles.header}>
          {/* Back Button */}
          <Pressable
            style={styles.backButton}
            onPress={goToPreviousStep}
            hitSlop={8}
          >
            <Text style={styles.backIcon}>←</Text>
          </Pressable>

          {/* Progress Bar */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBg}>
              <Animated.View
                style={[
                  styles.progressBarFill,
                  { backgroundColor: stepConfig.colors.accent },
                  progressAnimatedStyle,
                ]}
              />
            </View>
          </View>

          {/* Step Counter */}
          <View style={styles.stepCounter}>
            <Text style={styles.stepCounterText}>
              {currentStepIndex + 1}/{WARM_STEP_ORDER.length}
            </Text>
          </View>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Animated.View
            key={`content-${currentStepIndex}`}
            entering={direction === 'forward' ? SlideInRight.duration(350).springify() : SlideInLeft.duration(350).springify()}
          >
            {/* Step Label Pill */}
            <View style={[styles.stepPill, { backgroundColor: stepConfig.colors.accentLight }]}>
              <Text style={styles.stepPillIcon}>{stepConfig.icon}</Text>
              <Text style={[styles.stepPillText, { color: stepConfig.colors.accentDark }]}>
                {stepConfig.label}
              </Text>
            </View>

            {/* Illustration Card */}
            <View style={styles.illustrationCard}>
              <IllustrationPlaceholder stepType={currentStepType} />
            </View>

            {/* Content Card */}
            <View style={styles.contentCard}>
              {/* Title */}
              <Text style={styles.contentTitle}>{currentStep.title}</Text>

              {/* Arabic (Sunnah step) */}
              {currentStepType === 'sunnah' && currentStep.arabicText && (
                <View style={styles.arabicSection}>
                  <View style={styles.arabicCard}>
                    <Text style={styles.arabicText}>{currentStep.arabicText}</Text>
                    {currentStep.arabicTranslation && (
                      <Text style={styles.arabicTranslation}>
                        "{currentStep.arabicTranslation}"
                      </Text>
                    )}
                    {currentStep.reference && (
                      <Text style={styles.reference}>— {currentStep.reference}</Text>
                    )}
                  </View>
                </View>
              )}

              {/* Main Content */}
              <Text style={styles.contentText}>{currentStep.content}</Text>

              {/* Highlight Box */}
              {currentStep.highlight && (
                <Animated.View
                  entering={FadeInUp.delay(300).duration(400).springify()}
                  style={[styles.highlightBox, { backgroundColor: stepConfig.colors.accentLight }]}
                >
                  <Text style={styles.highlightIcon}>💡</Text>
                  <Text style={[styles.highlightText, { color: stepConfig.colors.accentDark }]}>
                    {currentStep.highlight}
                  </Text>
                </Animated.View>
              )}
            </View>
          </Animated.View>
        </ScrollView>

        {/* Bottom CTA */}
        <View style={styles.bottomNav}>
          <Chunky3DButton
            label={isLastStep ? 'Complete' : 'Continue'}
            onPress={goToNextStep}
            color={stepConfig.colors.accent}
            darkColor={stepConfig.colors.accentDark}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

// Illustration Placeholder Component
function IllustrationPlaceholder({ stepType }: { stepType: WarmStepType }) {
  const config = WarmStepConfig[stepType];
  const floatY = useSharedValue(0);

  useEffect(() => {
    floatY.value = withRepeat(
      withSequence(
        withTiming(-4, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, [floatY]);

  const floatStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  // Different shapes for different steps
  const getShapes = () => {
    switch (stepType) {
      case 'moment':
        return (
          <>
            <View style={[styles.shape, styles.shapeCircle, { backgroundColor: WarmColors.orangeLight, top: 10, left: 20 }]} />
            <View style={[styles.shape, styles.shapeSquare, { backgroundColor: WarmColors.secondaryLight, bottom: 15, right: 25, transform: [{ rotate: '15deg' }] }]} />
            <View style={[styles.shape, styles.shapeSmallCircle, { backgroundColor: WarmColors.primaryLight, top: 40, right: 40 }]} />
          </>
        );
      case 'sunnah':
        return (
          <>
            <View style={[styles.shape, styles.shapeOval, { backgroundColor: WarmColors.secondaryLight, top: 15, left: 30 }]} />
            <View style={[styles.shape, styles.shapeSmallCircle, { backgroundColor: WarmColors.sageLight, bottom: 20, left: 50 }]} />
            <View style={[styles.shape, styles.shapeSquare, { backgroundColor: WarmColors.secondaryMuted, top: 35, right: 20, width: 30, height: 30 }]} />
          </>
        );
      case 'whyItWorks':
        return (
          <>
            <View style={[styles.shape, styles.shapeCircle, { backgroundColor: WarmColors.sageLight, top: 5, right: 30, width: 60, height: 60 }]} />
            <View style={[styles.shape, styles.shapeSquare, { backgroundColor: WarmColors.sageMuted, bottom: 10, left: 25, transform: [{ rotate: '45deg' }] }]} />
            <View style={[styles.shape, styles.shapeSmallCircle, { backgroundColor: WarmColors.secondaryLight, top: 50, left: 40 }]} />
          </>
        );
      case 'todaysAction':
        return (
          <>
            <View style={[styles.shape, styles.shapeOval, { backgroundColor: WarmColors.primaryLight, top: 10, left: 25, width: 70, height: 45 }]} />
            <View style={[styles.shape, styles.shapeCircle, { backgroundColor: WarmColors.primaryMuted, bottom: 15, right: 30, width: 50, height: 50 }]} />
            <View style={[styles.shape, styles.shapeSmallCircle, { backgroundColor: WarmColors.secondaryLight, top: 45, right: 45 }]} />
          </>
        );
      case 'repair':
        return (
          <>
            <View style={[styles.shape, styles.shapeCircle, { backgroundColor: WarmColors.purpleLight, top: 8, left: 35, width: 55, height: 55 }]} />
            <View style={[styles.shape, styles.shapeOval, { backgroundColor: WarmColors.purpleMuted, bottom: 12, right: 25 }]} />
            <View style={[styles.shape, styles.shapeSmallCircle, { backgroundColor: WarmColors.sageLight, bottom: 40, left: 25 }]} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Animated.View style={[styles.illustrationContainer, floatStyle]}>
      {getShapes()}
      <Text style={styles.illustrationEmoji}>{config.icon}</Text>
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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: WarmSpacing.screenPadding,
    paddingVertical: WarmSpacing.md,
    gap: WarmSpacing.md,
  },
  backButton: {
    width: WarmSizes.touchTarget,
    height: WarmSizes.touchTarget,
    borderRadius: WarmRadius.full,
    backgroundColor: WarmColors.bgCard,
    alignItems: 'center',
    justifyContent: 'center',
    ...WarmShadows.card,
  },
  backIcon: {
    fontSize: 20,
    color: WarmColors.textSecondary,
    fontWeight: '500',
  },
  progressBarContainer: {
    flex: 1,
  },
  progressBarBg: {
    height: WarmSizes.progressBarHeight,
    backgroundColor: WarmColors.bgSecondary,
    borderRadius: WarmRadius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: WarmRadius.full,
  },
  stepCounter: {
    minWidth: 36,
    alignItems: 'center',
  },
  stepCounterText: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.caption.fontSize,
    fontWeight: '600',
    color: WarmColors.textMuted,
  },

  // Content
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: WarmSpacing.screenPadding,
    paddingBottom: WarmSpacing['3xl'],
  },

  // Step Pill
  stepPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: WarmSpacing.xs,
    paddingHorizontal: WarmSpacing.md,
    paddingVertical: WarmSpacing.sm,
    borderRadius: WarmRadius.full,
    marginBottom: WarmSpacing.lg,
  },
  stepPillIcon: {
    fontSize: 14,
  },
  stepPillText: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.caption.fontSize,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Illustration Card
  illustrationCard: {
    backgroundColor: WarmColors.bgCard,
    borderRadius: WarmRadius.xl,
    padding: WarmSpacing.xl,
    marginBottom: WarmSpacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...WarmShadows.card,
  },
  illustrationContainer: {
    width: WarmSizes.illustrationLarge,
    height: WarmSizes.illustrationLarge,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationEmoji: {
    fontSize: 56,
    zIndex: 1,
  },

  // Shapes for illustration placeholders
  shape: {
    position: 'absolute',
  },
  shapeCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  shapeSmallCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  shapeSquare: {
    width: 40,
    height: 40,
    borderRadius: WarmRadius.sm,
  },
  shapeOval: {
    width: 60,
    height: 40,
    borderRadius: 20,
  },

  // Content Card
  contentCard: {
    backgroundColor: WarmColors.bgCard,
    borderRadius: WarmRadius.xl,
    padding: WarmSpacing.cardPadding,
    ...WarmShadows.card,
  },
  contentTitle: {
    fontFamily: WarmTypography.fontDisplay,
    fontSize: WarmTypography.h1.fontSize,
    fontWeight: WarmTypography.h1.fontWeight,
    lineHeight: WarmTypography.h1.lineHeight,
    color: WarmColors.textPrimary,
    marginBottom: WarmSpacing.lg,
  },
  contentText: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.body.fontSize,
    fontWeight: WarmTypography.body.fontWeight,
    lineHeight: WarmTypography.body.lineHeight * 1.3,
    color: WarmColors.textSecondary,
  },

  // Arabic Section
  arabicSection: {
    marginBottom: WarmSpacing.xl,
  },
  arabicCard: {
    backgroundColor: WarmColors.secondaryLight,
    borderRadius: WarmRadius.lg,
    padding: WarmSpacing.lg,
    alignItems: 'center',
  },
  arabicText: {
    fontSize: WarmTypography.arabic.fontSize,
    lineHeight: WarmTypography.arabic.lineHeight,
    color: WarmColors.textPrimary,
    textAlign: 'center',
    marginBottom: WarmSpacing.md,
  },
  arabicTranslation: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.bodyLarge.fontSize,
    fontWeight: '500',
    fontStyle: 'italic',
    color: WarmColors.textSecondary,
    textAlign: 'center',
    marginBottom: WarmSpacing.sm,
  },
  reference: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.caption.fontSize,
    color: WarmColors.textMuted,
    textAlign: 'center',
  },

  // Highlight Box
  highlightBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: WarmSpacing.md,
    padding: WarmSpacing.lg,
    borderRadius: WarmRadius.lg,
    marginTop: WarmSpacing.xl,
  },
  highlightIcon: {
    fontSize: 18,
    marginTop: 2,
  },
  highlightText: {
    flex: 1,
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.body.fontSize,
    fontWeight: '600',
    lineHeight: WarmTypography.body.lineHeight * 1.2,
  },

  // Bottom Navigation
  bottomNav: {
    paddingHorizontal: WarmSpacing.screenPadding,
    paddingVertical: WarmSpacing.lg,
    paddingBottom: WarmSpacing['2xl'],
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

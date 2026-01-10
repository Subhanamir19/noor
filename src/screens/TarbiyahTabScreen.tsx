/**
 * TarbiyahTabScreen - Warm, Journal App-Inspired Intro Screen
 *
 * Design Philosophy:
 * - Warm cream background, soft shadows
 * - Hero card with illustration placeholder + content
 * - Chunky 3D pink button (Duolingo-style)
 * - Friendly, approachable, emotionally warm
 */

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

import { TarbiyahGuideScreen } from './TarbiyahGuideScreen';
import {
  WarmColors,
  WarmSpacing,
  WarmRadius,
  WarmTypography,
  WarmShadows,
  WarmMotion,
  WarmSizes,
} from '@/constants/tarbiyahWarmTokens';
import {
  getTodaysLesson,
  getTraitDisplayName,
  getTraitEmoji,
} from '@/data/tarbiyahLessons';
import { Chunky3DButton } from '@/components/tarbiyah/Chunky3DButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function TarbiyahTabScreen() {
  const [showGuide, setShowGuide] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Animations
  const floatY = useSharedValue(0);
  const streakScale = useSharedValue(0);

  const lesson = getTodaysLesson();

  // Gentle floating animation for illustration
  useEffect(() => {
    floatY.value = withRepeat(
      withSequence(
        withTiming(-6, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, [floatY]);

  // Streak badge bounce on mount
  useEffect(() => {
    streakScale.value = withDelay(
      400,
      withSequence(
        withSpring(1.15, WarmMotion.springBouncy),
        withSpring(1, WarmMotion.springSnappy)
      )
    );
  }, [streakScale]);

  const floatAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: floatY.value }],
  }));

  const streakAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: streakScale.value }],
  }));

  const handleStartLesson = useCallback(() => {
    setShowGuide(true);
  }, []);

  const handleCompleteLesson = useCallback(() => {
    setIsCompleted(true);
    setShowGuide(false);
  }, []);

  const handleBackToIntro = useCallback(() => {
    setShowGuide(false);
  }, []);

  if (!lesson) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <Text style={styles.errorText}>No lesson available</Text>
        </SafeAreaView>
      </View>
    );
  }

  if (showGuide) {
    return (
      <TarbiyahGuideScreen
        lesson={lesson}
        onComplete={handleCompleteLesson}
        onBack={handleBackToIntro}
      />
    );
  }

  const traitEmoji = getTraitEmoji(lesson.trait);
  const traitName = getTraitDisplayName(lesson.trait);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        {/* Header - Streak Badge */}
        <Animated.View
          entering={FadeInDown.delay(100).duration(400)}
          style={styles.header}
        >
          <Animated.View style={[styles.streakBadge, streakAnimatedStyle]}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakNumber}>{lesson.dayNumber}</Text>
            <Text style={styles.streakLabel}>day streak</Text>
          </Animated.View>
        </Animated.View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Hero Card */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(500).springify()}
            style={styles.heroCard}
          >
            {/* Illustration Placeholder */}
            <Animated.View style={[styles.illustrationContainer, floatAnimatedStyle]}>
              <View style={styles.illustrationPlaceholder}>
                {/* Decorative background shapes */}
                <View style={[styles.decorShape, styles.decorShape1]} />
                <View style={[styles.decorShape, styles.decorShape2]} />
                <View style={[styles.decorShape, styles.decorShape3]} />
                {/* Main emoji as placeholder */}
                <Text style={styles.heroEmoji}>{traitEmoji}</Text>
              </View>
            </Animated.View>

            {/* Card Content */}
            <View style={styles.cardContent}>
              {/* Trait Pill */}
              <View style={styles.traitPill}>
                <Text style={styles.traitPillText}>{traitName}</Text>
              </View>

              {/* Title */}
              <Text style={styles.title}>{lesson.title}</Text>

              {/* Subtitle */}
              <Text style={styles.subtitle}>{lesson.subtitle}</Text>
            </View>

            {/* Side Tab - Evening/Morning indicator style */}
            <View style={styles.sideTab}>
              <Text style={styles.sideTabText}>Day {lesson.dayNumber}</Text>
            </View>
          </Animated.View>

          {/* Progress Section */}
          <Animated.View
            entering={FadeIn.delay(500).duration(400)}
            style={styles.progressSection}
          >
            <View style={styles.progressInfo}>
              <Text style={styles.progressLabel}>Your Progress</Text>
              <Text style={styles.progressValue}>{lesson.dayNumber}/40 lessons</Text>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBg}>
                <View
                  style={[
                    styles.progressBarFill,
                    { width: `${(lesson.dayNumber / 40) * 100}%` },
                  ]}
                />
              </View>
            </View>
          </Animated.View>

          {/* Completed Badge */}
          {isCompleted && (
            <Animated.View
              entering={FadeIn.delay(200).duration(300)}
              style={styles.completedBadge}
            >
              <Text style={styles.completedIcon}>✓</Text>
              <Text style={styles.completedText}>Completed today!</Text>
            </Animated.View>
          )}
        </View>

        {/* Bottom CTA */}
        <Animated.View
          entering={FadeInUp.delay(600).duration(500).springify()}
          style={styles.ctaContainer}
        >
          <Chunky3DButton
            label={isCompleted ? "Review Lesson" : "Start Today's Lesson"}
            onPress={handleStartLesson}
            color={WarmColors.primary}
            darkColor={WarmColors.primaryDark}
          />
          <Text style={styles.timeEstimate}>About 3 minutes</Text>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WarmColors.bgPrimary,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: WarmSpacing.lg,
    paddingBottom: WarmSpacing.md,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: WarmSpacing.xs,
    backgroundColor: WarmColors.streakBg,
    paddingHorizontal: WarmSpacing.lg,
    paddingVertical: WarmSpacing.sm,
    borderRadius: WarmRadius.full,
  },
  streakIcon: {
    fontSize: 18,
  },
  streakNumber: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.h2.fontSize,
    fontWeight: '700',
    color: WarmColors.streak,
  },
  streakLabel: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.caption.fontSize,
    fontWeight: '500',
    color: WarmColors.streak,
    marginLeft: WarmSpacing.xs,
  },
  content: {
    flex: 1,
    paddingHorizontal: WarmSpacing.screenPadding,
    justifyContent: 'center',
  },
  heroCard: {
    backgroundColor: WarmColors.bgCard,
    borderRadius: WarmRadius.xl,
    overflow: 'hidden',
    ...WarmShadows.cardElevated,
    position: 'relative',
  },
  illustrationContainer: {
    height: 180,
    backgroundColor: WarmColors.secondaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationPlaceholder: {
    width: WarmSizes.illustrationLarge,
    height: WarmSizes.illustrationLarge,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  decorShape: {
    position: 'absolute',
    borderRadius: WarmRadius.full,
  },
  decorShape1: {
    width: 100,
    height: 100,
    backgroundColor: WarmColors.secondary,
    opacity: 0.3,
    top: -10,
    left: -20,
  },
  decorShape2: {
    width: 60,
    height: 60,
    backgroundColor: WarmColors.sage,
    opacity: 0.4,
    bottom: 0,
    right: -10,
  },
  decorShape3: {
    width: 40,
    height: 40,
    backgroundColor: WarmColors.primary,
    opacity: 0.3,
    top: 10,
    right: 20,
  },
  heroEmoji: {
    fontSize: 64,
    zIndex: 1,
  },
  cardContent: {
    padding: WarmSpacing.cardPadding,
  },
  traitPill: {
    alignSelf: 'flex-start',
    backgroundColor: WarmColors.sageMuted,
    paddingHorizontal: WarmSpacing.md,
    paddingVertical: WarmSpacing.xs,
    borderRadius: WarmRadius.full,
    marginBottom: WarmSpacing.md,
  },
  traitPillText: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.caption.fontSize,
    fontWeight: '600',
    color: WarmColors.sage,
  },
  title: {
    fontFamily: WarmTypography.fontDisplay,
    fontSize: WarmTypography.display.fontSize,
    fontWeight: WarmTypography.display.fontWeight,
    lineHeight: WarmTypography.display.lineHeight,
    color: WarmColors.textPrimary,
    marginBottom: WarmSpacing.sm,
  },
  subtitle: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.bodyLarge.fontSize,
    fontWeight: WarmTypography.bodyLarge.fontWeight,
    lineHeight: WarmTypography.bodyLarge.lineHeight,
    color: WarmColors.textSecondary,
  },
  sideTab: {
    position: 'absolute',
    right: 0,
    top: 100,
    backgroundColor: WarmColors.sage,
    paddingHorizontal: WarmSpacing.sm,
    paddingVertical: WarmSpacing.lg,
    borderTopLeftRadius: WarmRadius.sm,
    borderBottomLeftRadius: WarmRadius.sm,
  },
  sideTabText: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.tiny.fontSize,
    fontWeight: '600',
    color: WarmColors.textOnPrimary,
    writingDirection: 'ltr',
    transform: [{ rotate: '90deg' }],
    width: 50,
    textAlign: 'center',
  },
  progressSection: {
    marginTop: WarmSpacing['2xl'],
    backgroundColor: WarmColors.bgCard,
    borderRadius: WarmRadius.lg,
    padding: WarmSpacing.lg,
    ...WarmShadows.card,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: WarmSpacing.md,
  },
  progressLabel: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.label.fontSize,
    fontWeight: '600',
    color: WarmColors.textSecondary,
  },
  progressValue: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.label.fontSize,
    fontWeight: '600',
    color: WarmColors.textPrimary,
  },
  progressBarContainer: {
    width: '100%',
  },
  progressBarBg: {
    height: WarmSizes.progressBarHeight,
    backgroundColor: WarmColors.bgSecondary,
    borderRadius: WarmRadius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: WarmColors.sage,
    borderRadius: WarmRadius.full,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: WarmSpacing.sm,
    marginTop: WarmSpacing.lg,
    backgroundColor: WarmColors.successLight,
    paddingHorizontal: WarmSpacing.lg,
    paddingVertical: WarmSpacing.md,
    borderRadius: WarmRadius.full,
    alignSelf: 'center',
  },
  completedIcon: {
    fontSize: 16,
    color: WarmColors.success,
    fontWeight: '700',
  },
  completedText: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.label.fontSize,
    fontWeight: '600',
    color: WarmColors.success,
  },
  ctaContainer: {
    paddingHorizontal: WarmSpacing.screenPadding,
    paddingBottom: WarmSpacing['3xl'],
    alignItems: 'center',
  },
  timeEstimate: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.caption.fontSize,
    fontWeight: '500',
    color: WarmColors.textMuted,
    marginTop: WarmSpacing.md,
  },
  errorText: {
    fontFamily: WarmTypography.fontBody,
    fontSize: WarmTypography.body.fontSize,
    color: WarmColors.textMuted,
    textAlign: 'center',
  },
});

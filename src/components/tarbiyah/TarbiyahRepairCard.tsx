/**
 * TarbiyahRepairCard - Screen 5: The Repair
 *
 * Shows what to say if you already messed up, plus completion CTA.
 * Emotional arc: "It's okay that I messed up before" (Healing)
 */

import React, { memo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import {
  TarbiyahColors,
  TarbiyahTypography,
  TarbiyahSpacing,
  TarbiyahRadius,
  TarbiyahRgba,
  TarbiyahMotion,
  TarbiyahSizes,
  TarbiyahShadows,
} from '../../constants/tarbiyahTokens';
import { TarbiyahStepLabel } from './TarbiyahStepLabel';
import type { TarbiyahStep } from '../../data/tarbiyahLessons';

interface TarbiyahRepairCardProps {
  step: TarbiyahStep;
  onComplete: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function TarbiyahRepairCardComponent({
  step,
  onComplete,
}: TarbiyahRepairCardProps) {
  const buttonScale = useSharedValue(1);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.97, TarbiyahMotion.spring);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1, TarbiyahMotion.spring);
  };

  const handleComplete = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onComplete();
  };

  // Parse content to find the repair script
  const paragraphs = step.content.split('\n\n');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <TarbiyahStepLabel stepType="repair" />

      <Animated.Text
        entering={FadeInDown.delay(TarbiyahMotion.stagger.headline)
          .duration(TarbiyahMotion.durationSlow)
          .springify()}
        style={styles.headline}
      >
        {step.title}
      </Animated.Text>

      <Animated.Text
        entering={FadeInDown.delay(TarbiyahMotion.stagger.headline + 50)
          .duration(TarbiyahMotion.durationSlow)
          .springify()}
        style={styles.reassurance}
      >
        It happens. You're human. Here's how to reconnect:
      </Animated.Text>

      {/* Repair Script Box */}
      <Animated.View
        entering={FadeInDown.delay(TarbiyahMotion.stagger.body)
          .duration(TarbiyahMotion.durationSlow)
          .springify()}
        style={styles.repairBox}
      >
        <Text style={styles.repairLabel}>Go to your child and say:</Text>
        {paragraphs.map((paragraph, index) => {
          // Look for the quoted script part
          if (
            paragraph.includes('"') &&
            !paragraph.startsWith('It') &&
            !paragraph.startsWith('Here')
          ) {
            return (
              <Text key={index} style={styles.scriptText}>
                {paragraph}
              </Text>
            );
          }

          // Skip intro paragraphs already shown
          if (
            paragraph.startsWith('It happens') ||
            paragraph.startsWith("Here's how")
          ) {
            return null;
          }

          return (
            <Text key={index} style={styles.bodyText}>
              {paragraph}
            </Text>
          );
        })}
      </Animated.View>

      {/* Highlighted Takeaway */}
      {step.highlight && (
        <Animated.View
          entering={FadeInDown.delay(TarbiyahMotion.stagger.card)
            .duration(TarbiyahMotion.durationSlow)
            .springify()}
          style={styles.highlightBox}
        >
          <Text style={styles.highlightText}>{step.highlight}</Text>
        </Animated.View>
      )}

      {/* Wisdom Quote */}
      <Animated.Text
        entering={FadeInDown.delay(TarbiyahMotion.stagger.card + 50)
          .duration(TarbiyahMotion.durationSlow)
          .springify()}
        style={styles.wisdomText}
      >
        Repair builds more trust than perfection ever could.
      </Animated.Text>

      {/* Complete CTA Button */}
      <Animated.View
        entering={FadeInDown.delay(TarbiyahMotion.stagger.card + 100)
          .duration(TarbiyahMotion.durationSlow)
          .springify()}
      >
        <AnimatedPressable
          style={[styles.completeButton, buttonAnimatedStyle]}
          onPress={handleComplete}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={styles.completeIcon}>✓</Text>
          <Text style={styles.completeText}>
            I completed today's Tarbiyah lesson
          </Text>
        </AnimatedPressable>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: TarbiyahSpacing.screenGutter,
    paddingTop: TarbiyahSpacing.space16,
    paddingBottom: TarbiyahSpacing.space64,
  },
  headline: {
    fontFamily: TarbiyahTypography.fontHeadline,
    fontSize: TarbiyahTypography.h1.fontSize,
    fontWeight: TarbiyahTypography.h1.fontWeight,
    lineHeight: TarbiyahTypography.h1.lineHeight,
    letterSpacing: TarbiyahTypography.h1.letterSpacing,
    color: TarbiyahColors.textPrimary,
    marginTop: TarbiyahSpacing.space20,
  },
  reassurance: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.bodyLarge.fontSize,
    fontWeight: TarbiyahTypography.bodyLarge.fontWeight,
    lineHeight: TarbiyahTypography.bodyLarge.lineHeight,
    color: TarbiyahColors.textSecondary,
    marginTop: TarbiyahSpacing.space8,
    marginBottom: TarbiyahSpacing.space24,
  },
  repairBox: {
    backgroundColor: TarbiyahRgba.repairBg,
    borderWidth: 1,
    borderColor: TarbiyahRgba.repairBorder,
    borderRadius: TarbiyahRadius.lg,
    padding: TarbiyahSpacing.cardPadding,
    gap: TarbiyahSpacing.space12,
  },
  repairLabel: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.caption.fontSize,
    fontWeight: TarbiyahTypography.caption.fontWeight,
    color: TarbiyahColors.accentTertiary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: TarbiyahSpacing.space4,
  },
  scriptText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.bodyLarge.fontSize,
    fontWeight: '500',
    lineHeight: TarbiyahTypography.bodyLarge.lineHeight,
    color: TarbiyahColors.textPrimary,
    fontStyle: 'italic',
  },
  bodyText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.body.fontSize,
    fontWeight: TarbiyahTypography.body.fontWeight,
    lineHeight: TarbiyahTypography.body.lineHeight,
    color: TarbiyahColors.textSecondary,
  },
  highlightBox: {
    marginTop: TarbiyahSpacing.space20,
    paddingVertical: TarbiyahSpacing.space16,
    paddingHorizontal: TarbiyahSpacing.space20,
    borderLeftWidth: 3,
    borderLeftColor: TarbiyahColors.accentTertiary,
    backgroundColor: TarbiyahRgba.repairBg,
    borderRadius: TarbiyahRadius.sm,
  },
  highlightText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.bodyLarge.fontSize,
    fontWeight: '600',
    lineHeight: TarbiyahTypography.bodyLarge.lineHeight,
    color: TarbiyahColors.textPrimary,
  },
  wisdomText: {
    marginTop: TarbiyahSpacing.space24,
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.body.fontSize,
    fontWeight: '500',
    lineHeight: TarbiyahTypography.body.lineHeight,
    color: TarbiyahColors.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  completeButton: {
    marginTop: TarbiyahSpacing.space32,
    height: TarbiyahSizes.ctaButton,
    backgroundColor: TarbiyahColors.accentPrimary,
    borderRadius: TarbiyahRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: TarbiyahSpacing.space12,
    ...TarbiyahShadows.ctaGlow,
  },
  completeIcon: {
    fontSize: 20,
    color: TarbiyahColors.textPrimary,
    fontWeight: '700',
  },
  completeText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.bodyLarge.fontSize,
    fontWeight: '600',
    color: TarbiyahColors.textPrimary,
  },
});

export const TarbiyahRepairCard = memo(TarbiyahRepairCardComponent);

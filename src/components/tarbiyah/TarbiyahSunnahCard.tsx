/**
 * TarbiyahSunnahCard - Screen 2: The Sunnah
 *
 * Shows the Islamic teaching with Arabic text, translation, and practical meaning.
 * Emotional arc: "The Prophet ﷺ understood this" (Comfort)
 */

import React, { memo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import {
  TarbiyahColors,
  TarbiyahTypography,
  TarbiyahSpacing,
  TarbiyahRadius,
  TarbiyahRgba,
  TarbiyahMotion,
  TarbiyahShadows,
} from '../../constants/tarbiyahTokens';
import { TarbiyahStepLabel } from './TarbiyahStepLabel';
import type { TarbiyahStep } from '../../data/tarbiyahLessons';

interface TarbiyahSunnahCardProps {
  step: TarbiyahStep;
}

function TarbiyahSunnahCardComponent({ step }: TarbiyahSunnahCardProps) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <TarbiyahStepLabel stepType="sunnah" />

      <Animated.Text
        entering={FadeInDown.delay(TarbiyahMotion.stagger.headline)
          .duration(TarbiyahMotion.durationSlow)
          .springify()}
        style={styles.headline}
      >
        {step.title}
      </Animated.Text>

      {/* Arabic Text with Glow */}
      {step.arabicText && (
        <Animated.View
          entering={FadeIn.delay(TarbiyahMotion.stagger.body)
            .duration(TarbiyahMotion.durationVerySlow)}
          style={styles.arabicContainer}
        >
          <View style={styles.arabicGlow} />
          <Text style={styles.arabicText}>{step.arabicText}</Text>
        </Animated.View>
      )}

      {/* Translation */}
      {step.arabicTranslation && (
        <Animated.View
          entering={FadeInDown.delay(TarbiyahMotion.stagger.body + 100)
            .duration(TarbiyahMotion.durationSlow)
            .springify()}
          style={styles.translationContainer}
        >
          <Text style={styles.translationText}>{step.arabicTranslation}</Text>
        </Animated.View>
      )}

      {/* Reference */}
      {step.reference && (
        <Animated.Text
          entering={FadeInDown.delay(TarbiyahMotion.stagger.body + 150)
            .duration(TarbiyahMotion.durationSlow)
            .springify()}
          style={styles.referenceText}
        >
          — {step.reference}
        </Animated.Text>
      )}

      {/* Main Content */}
      <Animated.View
        entering={FadeInDown.delay(TarbiyahMotion.stagger.card)
          .duration(TarbiyahMotion.durationSlow)
          .springify()}
        style={styles.contentCard}
      >
        <Text style={styles.bodyText}>{step.content}</Text>
      </Animated.View>

      {/* Highlight/Key Insight */}
      {step.highlight && (
        <Animated.View
          entering={FadeInDown.delay(TarbiyahMotion.stagger.card + 100)
            .duration(TarbiyahMotion.durationSlow)
            .springify()}
          style={styles.highlightBox}
        >
          <Text style={styles.highlightText}>{step.highlight}</Text>
        </Animated.View>
      )}
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
    marginBottom: TarbiyahSpacing.space32,
  },
  arabicContainer: {
    alignItems: 'center',
    marginBottom: TarbiyahSpacing.space24,
    position: 'relative',
  },
  arabicGlow: {
    position: 'absolute',
    width: 200,
    height: 100,
    borderRadius: 100,
    backgroundColor: TarbiyahRgba.arabicGlow,
    transform: [{ scaleX: 2 }],
  },
  arabicText: {
    fontFamily: TarbiyahTypography.fontArabic,
    fontSize: TarbiyahTypography.arabicDisplay.fontSize,
    fontWeight: TarbiyahTypography.arabicDisplay.fontWeight,
    lineHeight: TarbiyahTypography.arabicDisplay.lineHeight,
    color: TarbiyahColors.textArabic,
    textAlign: 'center',
    textShadowColor: TarbiyahRgba.arabicGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 30,
  },
  translationContainer: {
    alignItems: 'center',
    marginBottom: TarbiyahSpacing.space12,
  },
  translationText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.bodyLarge.fontSize,
    fontWeight: '500',
    lineHeight: TarbiyahTypography.bodyLarge.lineHeight,
    color: TarbiyahColors.textPrimary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  referenceText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.caption.fontSize,
    fontWeight: TarbiyahTypography.caption.fontWeight,
    color: TarbiyahColors.textMuted,
    textAlign: 'center',
    marginBottom: TarbiyahSpacing.space32,
  },
  contentCard: {
    backgroundColor: TarbiyahRgba.cardBorder,
    borderRadius: TarbiyahRadius.lg,
    padding: TarbiyahSpacing.cardPadding,
    borderWidth: 1,
    borderColor: TarbiyahRgba.cardBorder,
  },
  bodyText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.body.fontSize,
    fontWeight: TarbiyahTypography.body.fontWeight,
    lineHeight: TarbiyahTypography.body.lineHeight,
    letterSpacing: TarbiyahTypography.body.letterSpacing,
    color: TarbiyahColors.textSecondary,
  },
  highlightBox: {
    marginTop: TarbiyahSpacing.space20,
    paddingVertical: TarbiyahSpacing.space16,
    paddingHorizontal: TarbiyahSpacing.space20,
    borderLeftWidth: 3,
    borderLeftColor: TarbiyahColors.textArabic,
    backgroundColor: TarbiyahRgba.insightBg,
    borderRadius: TarbiyahRadius.sm,
  },
  highlightText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.bodyLarge.fontSize,
    fontWeight: '600',
    lineHeight: TarbiyahTypography.bodyLarge.lineHeight,
    color: TarbiyahColors.textPrimary,
    fontStyle: 'italic',
  },
});

export const TarbiyahSunnahCard = memo(TarbiyahSunnahCardComponent);

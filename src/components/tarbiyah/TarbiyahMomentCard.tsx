/**
 * TarbiyahMomentCard - Screen 1: The Moment
 *
 * Shows the relatable parenting scenario with child's perspective insight.
 * Emotional arc: "Oh, this is exactly what happened to me" (Recognition)
 */

import React, { memo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import {
  TarbiyahColors,
  TarbiyahTypography,
  TarbiyahSpacing,
  TarbiyahRadius,
  TarbiyahRgba,
  TarbiyahMotion,
  TarbiyahSizes,
} from '../../constants/tarbiyahTokens';
import { TarbiyahStepLabel } from './TarbiyahStepLabel';
import type { TarbiyahStep } from '../../data/tarbiyahLessons';

interface TarbiyahMomentCardProps {
  step: TarbiyahStep;
  title: string;
  subtitle: string;
}

function TarbiyahMomentCardComponent({
  step,
  title,
  subtitle,
}: TarbiyahMomentCardProps) {
  // Split content to find dialogue vs narration
  const contentParts = step.content.split('\n\n');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <TarbiyahStepLabel stepType="moment" />

      <Animated.Text
        entering={FadeInDown.delay(TarbiyahMotion.stagger.headline)
          .duration(TarbiyahMotion.durationSlow)
          .springify()}
        style={styles.headline}
      >
        {title}
      </Animated.Text>

      <Animated.Text
        entering={FadeInDown.delay(TarbiyahMotion.stagger.headline + 50)
          .duration(TarbiyahMotion.durationSlow)
          .springify()}
        style={styles.subtitle}
      >
        {subtitle}
      </Animated.Text>

      <Animated.View
        entering={FadeInDown.delay(TarbiyahMotion.stagger.body)
          .duration(TarbiyahMotion.durationSlow)
          .springify()}
        style={styles.contentWrapper}
      >
        {contentParts.map((part, index) => {
          // Check if this part looks like dialogue (starts with quote)
          const isDialogue = part.startsWith('"') || part.startsWith('"');

          return (
            <Text
              key={index}
              style={[styles.bodyText, isDialogue && styles.dialogueText]}
            >
              {part}
            </Text>
          );
        })}
      </Animated.View>

      {step.highlight && (
        <Animated.View
          entering={FadeInDown.delay(TarbiyahMotion.stagger.card)
            .duration(TarbiyahMotion.durationSlow)
            .springify()}
          style={styles.insightBox}
        >
          <Text style={styles.insightLabel}>💭 What they're feeling:</Text>
          <Text style={styles.insightText}>{step.highlight}</Text>
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
  },
  subtitle: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.bodyLarge.fontSize,
    fontWeight: TarbiyahTypography.bodyLarge.fontWeight,
    lineHeight: TarbiyahTypography.bodyLarge.lineHeight,
    color: TarbiyahColors.textSecondary,
    marginTop: TarbiyahSpacing.space8,
    marginBottom: TarbiyahSpacing.space24,
  },
  contentWrapper: {
    gap: TarbiyahSpacing.space16,
  },
  bodyText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.body.fontSize,
    fontWeight: TarbiyahTypography.body.fontWeight,
    lineHeight: TarbiyahTypography.body.lineHeight,
    letterSpacing: TarbiyahTypography.body.letterSpacing,
    color: TarbiyahColors.textSecondary,
  },
  dialogueText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.bodyLarge.fontSize,
    fontWeight: '500',
    fontStyle: 'italic',
    color: TarbiyahColors.textPrimary,
    borderLeftWidth: TarbiyahSizes.quoteBorderWidth,
    borderLeftColor: TarbiyahColors.accentSecondary,
    paddingLeft: TarbiyahSpacing.space16,
  },
  insightBox: {
    marginTop: TarbiyahSpacing.space24,
    backgroundColor: TarbiyahRgba.insightBg,
    borderWidth: 1,
    borderColor: TarbiyahRgba.insightBorder,
    borderRadius: TarbiyahRadius.md,
    padding: TarbiyahSpacing.space16,
  },
  insightLabel: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.caption.fontSize,
    fontWeight: TarbiyahTypography.caption.fontWeight,
    color: TarbiyahColors.accentSecondary,
    marginBottom: TarbiyahSpacing.space8,
  },
  insightText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.body.fontSize,
    fontWeight: '500',
    lineHeight: TarbiyahTypography.body.lineHeight,
    color: TarbiyahColors.textPrimary,
  },
});

export const TarbiyahMomentCard = memo(TarbiyahMomentCardComponent);

/**
 * TarbiyahWhyCard - Screen 3: Why It Works
 *
 * Shows the child psychology explanation behind the Islamic teaching.
 * Emotional arc: "Now I understand why my child does this" (Insight)
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
} from '../../constants/tarbiyahTokens';
import { TarbiyahStepLabel } from './TarbiyahStepLabel';
import type { TarbiyahStep } from '../../data/tarbiyahLessons';

interface TarbiyahWhyCardProps {
  step: TarbiyahStep;
}

function TarbiyahWhyCardComponent({ step }: TarbiyahWhyCardProps) {
  // Split content into paragraphs
  const paragraphs = step.content.split('\n\n');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <TarbiyahStepLabel stepType="whyItWorks" />

      <Animated.Text
        entering={FadeInDown.delay(TarbiyahMotion.stagger.headline)
          .duration(TarbiyahMotion.durationSlow)
          .springify()}
        style={styles.headline}
      >
        {step.title}
      </Animated.Text>

      <Animated.View
        entering={FadeInDown.delay(TarbiyahMotion.stagger.body)
          .duration(TarbiyahMotion.durationSlow)
          .springify()}
        style={styles.contentWrapper}
      >
        {paragraphs.map((paragraph, index) => {
          // Check if paragraph contains bullet points (starts with •)
          if (paragraph.includes('•')) {
            const lines = paragraph.split('\n');
            return (
              <View key={index} style={styles.bulletList}>
                {lines.map((line, lineIndex) => (
                  <Text key={lineIndex} style={styles.bulletItem}>
                    {line}
                  </Text>
                ))}
              </View>
            );
          }

          // Check if it looks like a quote (contains quotation marks)
          const isQuote =
            paragraph.startsWith('"') || paragraph.startsWith('"');

          return (
            <Text
              key={index}
              style={[styles.bodyText, isQuote && styles.quoteText]}
            >
              {paragraph}
            </Text>
          );
        })}
      </Animated.View>

      {/* Key Insight Highlight */}
      {step.highlight && (
        <Animated.View
          entering={FadeInDown.delay(TarbiyahMotion.stagger.card)
            .duration(TarbiyahMotion.durationSlow)
            .springify()}
          style={styles.insightBox}
        >
          <View style={styles.insightIcon}>
            <Text style={styles.insightIconText}>💡</Text>
          </View>
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
  quoteText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.bodyLarge.fontSize,
    fontWeight: '500',
    fontStyle: 'italic',
    color: TarbiyahColors.accentPrimary,
    paddingLeft: TarbiyahSpacing.space16,
    borderLeftWidth: 3,
    borderLeftColor: TarbiyahColors.accentPrimary,
  },
  bulletList: {
    gap: TarbiyahSpacing.space8,
    paddingLeft: TarbiyahSpacing.space8,
  },
  bulletItem: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.body.fontSize,
    fontWeight: TarbiyahTypography.body.fontWeight,
    lineHeight: TarbiyahTypography.body.lineHeight,
    color: TarbiyahColors.textSecondary,
  },
  insightBox: {
    marginTop: TarbiyahSpacing.space24,
    backgroundColor: TarbiyahRgba.psychBg,
    borderWidth: 1,
    borderColor: TarbiyahRgba.psychBorder,
    borderRadius: TarbiyahRadius.lg,
    padding: TarbiyahSpacing.cardPadding,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: TarbiyahSpacing.space12,
  },
  insightIcon: {
    width: 32,
    height: 32,
    borderRadius: TarbiyahRadius.full,
    backgroundColor: TarbiyahRgba.psychBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightIconText: {
    fontSize: 16,
  },
  insightText: {
    flex: 1,
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.bodyLarge.fontSize,
    fontWeight: '600',
    lineHeight: TarbiyahTypography.bodyLarge.lineHeight,
    color: TarbiyahColors.textPrimary,
  },
});

export const TarbiyahWhyCard = memo(TarbiyahWhyCardComponent);

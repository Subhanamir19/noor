/**
 * TarbiyahActionCard - Screen 4: Today's Action
 *
 * Shows the one clear behavior to try today.
 * Emotional arc: "I can actually do this today" (Empowerment)
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

interface TarbiyahActionCardProps {
  step: TarbiyahStep;
}

function TarbiyahActionCardComponent({ step }: TarbiyahActionCardProps) {
  // Parse content to find the highlighted script/action
  const paragraphs = step.content.split('\n\n');

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <TarbiyahStepLabel stepType="todaysAction" />

      <Animated.Text
        entering={FadeInDown.delay(TarbiyahMotion.stagger.headline)
          .duration(TarbiyahMotion.durationSlow)
          .springify()}
        style={styles.headline}
      >
        {step.title}
      </Animated.Text>

      {/* Main Action Box */}
      <Animated.View
        entering={FadeInDown.delay(TarbiyahMotion.stagger.body)
          .duration(TarbiyahMotion.durationSlow)
          .springify()}
        style={styles.actionBox}
      >
        {paragraphs.map((paragraph, index) => {
          // Check if this is a numbered step
          const isNumbered = /^\d\./.test(paragraph.trim());

          // Check if it's a highlighted script (contains quote-style text)
          const isScript =
            paragraph.includes('"') &&
            (paragraph.includes(':') || paragraph.length < 100);

          if (isNumbered) {
            const lines = paragraph.split('\n');
            return (
              <View key={index} style={styles.numberedList}>
                {lines.map((line, lineIndex) => {
                  const trimmedLine = line.trim();
                  if (!trimmedLine) return null;

                  // Extract number and content
                  const match = trimmedLine.match(/^(\d+)\.\s*(.*)$/);
                  if (match) {
                    return (
                      <View key={lineIndex} style={styles.numberedItem}>
                        <View style={styles.numberBadge}>
                          <Text style={styles.numberText}>{match[1]}</Text>
                        </View>
                        <Text style={styles.numberedContent}>{match[2]}</Text>
                      </View>
                    );
                  }
                  return (
                    <Text key={lineIndex} style={styles.bodyText}>
                      {trimmedLine}
                    </Text>
                  );
                })}
              </View>
            );
          }

          if (isScript) {
            return (
              <View key={index} style={styles.scriptBox}>
                <Text style={styles.scriptText}>{paragraph}</Text>
              </View>
            );
          }

          return (
            <Text key={index} style={styles.bodyText}>
              {paragraph}
            </Text>
          );
        })}
      </Animated.View>

      {/* Highlighted Key Action */}
      {step.highlight && (
        <Animated.View
          entering={FadeInDown.delay(TarbiyahMotion.stagger.card)
            .duration(TarbiyahMotion.durationSlow)
            .springify()}
          style={styles.highlightBox}
        >
          <Text style={styles.highlightLabel}>Say this:</Text>
          <Text style={styles.highlightText}>{step.highlight}</Text>
        </Animated.View>
      )}

      {/* Encouragement */}
      <Animated.Text
        entering={FadeInDown.delay(TarbiyahMotion.stagger.card + 100)
          .duration(TarbiyahMotion.durationSlow)
          .springify()}
        style={styles.encouragement}
      >
        That's it. One small step. You can do this.
      </Animated.Text>
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
  actionBox: {
    backgroundColor: TarbiyahColors.bgPrimary,
    borderWidth: 2,
    borderColor: TarbiyahColors.accentPrimary,
    borderRadius: TarbiyahRadius.lg,
    padding: TarbiyahSpacing.cardPadding,
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
  numberedList: {
    gap: TarbiyahSpacing.space12,
  },
  numberedItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: TarbiyahSpacing.space12,
  },
  numberBadge: {
    width: 24,
    height: 24,
    borderRadius: TarbiyahRadius.full,
    backgroundColor: TarbiyahColors.accentPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.caption.fontSize,
    fontWeight: '700',
    color: TarbiyahColors.textPrimary,
  },
  numberedContent: {
    flex: 1,
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.body.fontSize,
    fontWeight: TarbiyahTypography.body.fontWeight,
    lineHeight: TarbiyahTypography.body.lineHeight,
    color: TarbiyahColors.textSecondary,
  },
  scriptBox: {
    backgroundColor: TarbiyahRgba.psychBg,
    borderRadius: TarbiyahRadius.md,
    padding: TarbiyahSpacing.space16,
    borderLeftWidth: 3,
    borderLeftColor: TarbiyahColors.accentPrimary,
  },
  scriptText: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.bodyLarge.fontSize,
    fontWeight: '500',
    lineHeight: TarbiyahTypography.bodyLarge.lineHeight,
    color: TarbiyahColors.textPrimary,
    fontStyle: 'italic',
  },
  highlightBox: {
    marginTop: TarbiyahSpacing.space24,
    backgroundColor: TarbiyahColors.bgSecondary,
    borderRadius: TarbiyahRadius.lg,
    padding: TarbiyahSpacing.cardPadding,
    alignItems: 'center',
  },
  highlightLabel: {
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.caption.fontSize,
    fontWeight: TarbiyahTypography.caption.fontWeight,
    color: TarbiyahColors.textMuted,
    marginBottom: TarbiyahSpacing.space8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  highlightText: {
    fontFamily: TarbiyahTypography.fontHeadline,
    fontSize: TarbiyahTypography.h2.fontSize,
    fontWeight: TarbiyahTypography.h2.fontWeight,
    lineHeight: TarbiyahTypography.h2.lineHeight,
    color: TarbiyahColors.accentPrimary,
    textAlign: 'center',
  },
  encouragement: {
    marginTop: TarbiyahSpacing.space24,
    fontFamily: TarbiyahTypography.fontBody,
    fontSize: TarbiyahTypography.body.fontSize,
    fontWeight: '500',
    lineHeight: TarbiyahTypography.body.lineHeight,
    color: TarbiyahColors.textMuted,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export const TarbiyahActionCard = memo(TarbiyahActionCardComponent);

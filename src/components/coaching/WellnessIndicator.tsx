import React, { useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { TodayColors, TodayRadii, TodayShadows, TodaySpacing, TodayTypography } from '@/constants/todayTokens';

interface Props {
  score: number; // 0-100
  tips: string[];
  onPress?: () => void;
}

function getScoreColor(score: number): string {
  if (score >= 70) return TodayColors.success;
  if (score >= 50) return TodayColors.warning;
  if (score >= 30) return '#FF9800';
  return TodayColors.danger;
}

function getScoreLabel(score: number): string {
  if (score >= 70) return 'Thriving';
  if (score >= 50) return 'Growing';
  if (score >= 30) return 'Needs Care';
  return 'Struggling';
}

function getScoreEmoji(score: number): string {
  if (score >= 70) return '🙂';
  if (score >= 50) return '😊';
  if (score >= 30) return '😕';
  return '😣';
}

export function WellnessIndicator({ score, tips, onPress }: Props) {
  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  const emoji = getScoreEmoji(score);

  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;

  const shadowHeight = TodayShadows.cardLedge.height;
  const tip = tips[0];

  const renderCard = useCallback(
    (pressed: boolean) => {
      const translateY = pressed ? shadowHeight : 0;
      const currentShadowHeight = pressed ? 0 : shadowHeight;

      return (
        <View>
          {/* Shadow layer */}
          <View
            style={{
              position: 'absolute',
              top: shadowHeight,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: TodayShadows.cardLedge.color,
              borderRadius: TodayRadii.md,
            }}
          />

          {/* Surface */}
          <View
            style={[
              styles.container,
              {
                borderRadius: TodayRadii.md,
                backgroundColor: TodayColors.card,
                borderWidth: 2,
                borderColor: TodayColors.strokeSubtle,
                transform: [{ translateY }],
                marginBottom: currentShadowHeight,
              },
            ]}
          >
            <View style={styles.circleContainer}>
              <Svg width={size} height={size} style={styles.svg}>
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="rgba(17,24,39,0.10)"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                <Circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={color}
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={`${progress} ${circumference}`}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              </Svg>
              <View style={styles.scoreContent}>
                <Text style={styles.emoji}>{emoji}</Text>
                <Text style={[styles.score, { color }]}>{score}</Text>
              </View>
            </View>

            <View style={styles.info}>
              <Text style={[styles.label, { color }]}>{label}</Text>
              <Text style={styles.subtitle}>Family Wellness</Text>

              {!!tip && (
                <View style={styles.tipContainer}>
                  <Text style={styles.tipText} numberOfLines={2}>
                    {tip}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      );
    },
    [circumference, color, emoji, label, progress, radius, score, shadowHeight, strokeWidth, tip]
  );

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Open family wellness"
      disabled={!onPress}
    >
      {({ pressed }) => renderCard(pressed)}
    </Pressable>
  );
}

export function WellnessCompact({ score }: { score: number }) {
  const color = getScoreColor(score);
  const emoji = getScoreEmoji(score);

  return (
    <View style={styles.compactContainer}>
      <Text style={styles.compactEmoji}>{emoji}</Text>
      <Text style={[styles.compactScore, { color }]}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: TodaySpacing[16],
  },
  circleContainer: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  scoreContent: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 20,
    marginBottom: -4,
  },
  score: {
    fontSize: 18,
    fontFamily: TodayTypography.bricolageBold,
  },
  info: {
    flex: 1,
    marginLeft: TodaySpacing[16],
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontFamily: TodayTypography.bricolageSemiBold,
  },
  subtitle: {
    fontSize: 12,
    color: TodayColors.textMuted,
    marginBottom: 8,
    fontFamily: TodayTypography.poppinsSemiBold,
  },
  tipContainer: {
    backgroundColor: 'rgba(245,158,11,0.12)',
    borderRadius: TodayRadii.sm,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: 'rgba(245,158,11,0.20)',
  },
  tipText: {
    fontSize: 12,
    color: TodayColors.textSecondary,
    lineHeight: 16,
    fontFamily: TodayTypography.poppinsSemiBold,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(17,24,39,0.06)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: TodayRadii.md,
  },
  compactEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  compactScore: {
    fontSize: 14,
    fontFamily: TodayTypography.bricolageSemiBold,
  },
});


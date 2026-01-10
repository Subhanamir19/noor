/**
 * JourneyHeader Component
 *
 * Today-aligned header: summary + today checkpoint.
 */

import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CameraIcon, FireIcon, PhotoIcon, SparklesIcon } from 'react-native-heroicons/solid';

import { PrimaryButton } from '@/components/common/Button';
import { ConnectionDepthLevels } from '@/constants/journeyTokens';
import { TodayColors, TodayRadii, TodaySpacing, TodayTypography } from '@/constants/todayTokens';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface JourneyHeaderProps {
  streak: number;
  connectionLevel: number;
  connectionPoints: number;
  todayDayNumber?: number;
  todayHasPhoto?: boolean;
  primaryActionLabel: string;
  onPrimaryAction: () => void;
}

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function getLevelTitle(level: number): string {
  const levelData = ConnectionDepthLevels.find((l) => l.level === level);
  return levelData?.title ?? 'Seedling';
}

function getProgressToNextLevel(points: number, level: number): number {
  const currentLevel = ConnectionDepthLevels.find((l) => l.level === level);
  const nextLevel = ConnectionDepthLevels.find((l) => l.level === level + 1);

  if (!currentLevel) return 0;
  if (!nextLevel) return 100;

  const levelRange = nextLevel.minPoints - currentLevel.minPoints;
  const progressInLevel = points - currentLevel.minPoints;

  return Math.min(100, Math.max(0, (progressInLevel / levelRange) * 100));
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function JourneyHeaderComponent({
  streak,
  connectionLevel,
  connectionPoints,
  todayDayNumber,
  todayHasPhoto,
  primaryActionLabel,
  onPrimaryAction,
}: JourneyHeaderProps) {
  const progress = getProgressToNextLevel(connectionPoints, connectionLevel);
  const levelTitle = getLevelTitle(connectionLevel);

  return (
    <View style={styles.container}>
      <View style={styles.summaryCard}>
        <View style={styles.metricsRow}>
          <View style={styles.metric}>
            <View style={styles.metricIcon}>
              <FireIcon size={20} color={TodayColors.ctaSecondary} />
            </View>
            <View>
              <Text style={styles.metricValue}>{streak}</Text>
              <Text style={styles.metricLabel}>day streak</Text>
            </View>
          </View>

          <View style={styles.metricsDivider} />

          <View style={styles.metric}>
            <View style={styles.metricIcon}>
              <SparklesIcon size={20} color={TodayColors.ctaPrimary} />
            </View>
            <View>
              <Text style={styles.metricValue}>Level {connectionLevel}</Text>
              <Text style={styles.metricLabel}>{levelTitle}</Text>
            </View>
          </View>
        </View>

        <View style={styles.progressTrack} accessibilityRole="progressbar">
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
      </View>

      <View style={styles.todayCard}>
        <Text style={styles.todayTitle}>Today checkpoint</Text>
        <Text style={styles.todaySubtitle}>
          {todayDayNumber ? `Day ${todayDayNumber}` : 'Preparing your journey…'}
        </Text>
        <View style={{ marginTop: TodaySpacing[12] }}>
          <PrimaryButton
            title={primaryActionLabel}
            onPress={onPrimaryAction}
            fullWidth
            disabled={!todayDayNumber}
            leftIcon={
              todayHasPhoto ? (
                <PhotoIcon size={18} color={TodayColors.textInverse} />
              ) : (
                <CameraIcon size={18} color={TodayColors.textInverse} />
              )
            }
          />
        </View>
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    gap: TodaySpacing[12],
  },
  summaryCard: {
    backgroundColor: TodayColors.card,
    borderRadius: TodayRadii.lg,
    padding: TodaySpacing[16],
    borderWidth: 1,
    borderColor: TodayColors.strokeSubtle,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: TodaySpacing[12],
    marginBottom: TodaySpacing[12],
  },
  metric: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: TodaySpacing[8],
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: TodayRadii.sm,
    backgroundColor: TodayColors.bgApp,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metricValue: {
    fontSize: 18,
    lineHeight: 24,
    color: TodayColors.textPrimary,
    fontFamily: TodayTypography.bricolageSemiBold,
  },
  metricLabel: {
    marginTop: -2,
    fontSize: 12,
    lineHeight: 16,
    color: TodayColors.textSecondary,
    fontFamily: TodayTypography.poppinsSemiBold,
  },
  metricsDivider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: TodayColors.strokeSubtle,
  },
  progressTrack: {
    height: 12,
    borderRadius: TodayRadii.pill,
    backgroundColor: TodayColors.ctaDisabled,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: TodayColors.ctaPrimary,
    borderRadius: TodayRadii.pill,
  },
  todayCard: {
    backgroundColor: TodayColors.card,
    borderRadius: TodayRadii.lg,
    padding: TodaySpacing[16],
    borderWidth: 1,
    borderColor: TodayColors.strokeSubtle,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  todayTitle: {
    fontSize: 18,
    lineHeight: 24,
    color: TodayColors.textPrimary,
    fontFamily: TodayTypography.bricolageSemiBold,
  },
  todaySubtitle: {
    marginTop: TodaySpacing[4],
    fontSize: 14,
    lineHeight: 20,
    color: TodayColors.textSecondary,
    fontFamily: TodayTypography.poppinsSemiBold,
  },
});

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const JourneyHeader = memo(JourneyHeaderComponent);

/**
 * JourneyHeader Component
 *
 * Displays streak counter and connection depth stats in a
 * Duolingo-style yellow header bar.
 */

import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  JourneyColors,
  JourneySizes,
  ConnectionDepthLevels,
} from '@/constants/journeyTokens';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface JourneyHeaderProps {
  streak: number;
  connectionLevel: number;
  connectionPoints: number;
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
  if (!nextLevel) return 100; // Max level

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
}: JourneyHeaderProps) {
  const progress = getProgressToNextLevel(connectionPoints, connectionLevel);
  const levelTitle = getLevelTitle(connectionLevel);

  return (
    <View style={styles.container}>
      {/* Streak Counter */}
      <View style={styles.statCard}>
        <Text style={styles.statIcon}>🔥</Text>
        <View style={styles.statContent}>
          <Text style={styles.statValue}>{streak}</Text>
          <Text style={styles.statLabel}>day streak</Text>
        </View>
      </View>

      {/* Connection Depth */}
      <View style={styles.statCard}>
        <Text style={styles.statIcon}>💎</Text>
        <View style={styles.statContent}>
          <Text style={styles.statValue}>Level {connectionLevel}</Text>
          <Text style={styles.statLabel}>{levelTitle}</Text>
        </View>

        {/* Progress bar to next level */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${progress}%` }]}
            />
          </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: JourneyColors.headerYellow,
    // Subtle bottom shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: JourneySizes.statCardRadius,
    minWidth: 140,
  },
  statIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: JourneyColors.textDark,
    fontFamily: 'Poppins-Bold',
  },
  statLabel: {
    fontSize: 11,
    color: JourneyColors.textDark,
    opacity: 0.7,
    fontFamily: 'Poppins-Regular',
    marginTop: -2,
  },
  progressBarContainer: {
    position: 'absolute',
    bottom: 6,
    left: 14,
    right: 14,
  },
  progressBar: {
    height: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: JourneyColors.accentEmerald,
    borderRadius: 2,
  },
});

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const JourneyHeader = memo(JourneyHeaderComponent);

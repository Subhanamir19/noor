/**
 * JourneyPath Component
 *
 * Main scrollable container for the Duolingo-style journey path.
 * Renders day nodes along an S-curve with connecting lines.
 */

import React, { memo, useMemo, useCallback } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import type { JourneyDay } from '@/types/journey';
import { JourneyColors, JourneyLayout } from '@/constants/journeyTokens';
import {
  calculatePathPositions,
  calculatePathHeight,
  getVisibleDaysRange,
} from '@/utils/journeyPath';

import { DayNode } from './DayNode';
import { TreasureChest } from './TreasureChest';
import { PathConnector } from './PathConnector';
import { LockMessage } from './LockMessage';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface JourneyPathProps {
  days: JourneyDay[];
  onDayPress: (day: JourneyDay) => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PATH_WIDTH = SCREEN_WIDTH - JourneyLayout.horizontalPadding * 2;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function JourneyPathComponent({ days, onDayPress }: JourneyPathProps) {
  // Get visible days range
  const { end: visibleEnd, hasMore } = useMemo(
    () => getVisibleDaysRange(days.length),
    [days.length]
  );

  // Slice to visible days
  const visibleDays = useMemo(
    () => days.slice(0, visibleEnd),
    [days, visibleEnd]
  );

  // Calculate node positions along S-curve
  const pathNodes = useMemo(
    () => calculatePathPositions(visibleDays, PATH_WIDTH),
    [visibleDays]
  );

  // Calculate content height
  const contentHeight = useMemo(
    () => calculatePathHeight(visibleDays.length) + (hasMore ? 120 : 0),
    [visibleDays.length, hasMore]
  );

  const activeNodeIndex = useMemo(() => {
    const todayIndex = visibleDays.findIndex((d) => d.status === 'today');
    if (todayIndex >= 0) return todayIndex;
    return visibleDays.reduce((acc, d, idx) => (d.status === 'logged' ? idx : acc), -1);
  }, [visibleDays]);

  // Day press handler
  const handleDayPress = useCallback(
    (day: JourneyDay) => {
      onDayPress(day);
    },
    [onDayPress]
  );

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.pathCanvas, { width: PATH_WIDTH, minHeight: contentHeight }]}>
          <PathConnector
            nodes={pathNodes}
            width={PATH_WIDTH}
            height={contentHeight}
            activeNodeIndex={activeNodeIndex}
          />

          {pathNodes.map((node) => (
            <View
              key={node.day.id}
              style={[
                styles.nodeContainer,
                {
                  left: node.x,
                  top: node.y,
                },
              ]}
            >
              {node.day.isMilestone ? (
                <TreasureChest
                  day={node.day}
                  onPress={() => handleDayPress(node.day)}
                  testID={`chest-${node.day.dayNumber}`}
                />
              ) : (
                <DayNode
                  dayNumber={node.day.dayNumber}
                  status={node.day.status}
                  onPress={() => handleDayPress(node.day)}
                  testID={`day-${node.day.dayNumber}`}
                />
              )}
            </View>
          ))}

          {hasMore && (
            <View style={styles.lockMessageContainer}>
              <LockMessage />
            </View>
          )}

          <View style={styles.bottomPadding} />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: JourneyColors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: JourneyLayout.pathPaddingTop,
    paddingBottom: JourneyLayout.pathPaddingBottom,
    alignItems: 'center',
  },
  pathCanvas: {
    position: 'relative',
  },
  nodeContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockMessageContainer: {
    position: 'absolute',
    bottom: JourneyLayout.lockMessageBottomOffset,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomPadding: {
    height: 80,
  },
});

// ---------------------------------------------------------------------------
// Export
// ---------------------------------------------------------------------------

export const JourneyPath = memo(JourneyPathComponent);

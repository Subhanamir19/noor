/**
 * JourneyPath Component
 *
 * Main scrollable container for the Duolingo-style journey path.
 * Renders day nodes along an S-curve with connecting lines.
 */

import React, { memo, useMemo, useCallback } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import type { JourneyDay } from '@/types/journey';
import { JourneyColors, JourneyLayout, JourneySizes } from '@/constants/journeyTokens';
import {
  calculatePathPositions,
  calculatePathHeight,
  getVisibleDaysRange,
} from '@/utils/journeyPath';

import { DayNode } from './DayNode';
import { TreasureChest } from './TreasureChest';
import { MotherCharacter } from './MotherCharacter';
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
const PATH_WIDTH = SCREEN_WIDTH - JourneySizes.characterWidth - 20;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function JourneyPathComponent({ days, onDayPress }: JourneyPathProps) {
  // Scroll position for character parallax
  const scrollY = useSharedValue(0);

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

  // Scroll handler for character parallax
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // Day press handler
  const handleDayPress = useCallback(
    (day: JourneyDay) => {
      onDayPress(day);
    },
    [onDayPress]
  );

  return (
    <View style={styles.container}>
      {/* Mother Character (Left Side) - Fixed position */}
      <View style={styles.characterContainer}>
        <MotherCharacter scrollY={scrollY} />
      </View>

      {/* Scrollable Path Area */}
      <Animated.ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { minHeight: contentHeight },
        ]}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {/* SVG Connector Lines */}
        <PathConnector
          nodes={pathNodes}
          width={PATH_WIDTH}
          height={contentHeight}
        />

        {/* Day Nodes */}
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

        {/* Lock Message at Bottom */}
        {hasMore && (
          <View style={styles.lockMessageContainer}>
            <LockMessage />
          </View>
        )}

        {/* Bottom padding */}
        <View style={styles.bottomPadding} />
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
    flexDirection: 'row',
    backgroundColor: JourneyColors.background,
  },
  characterContainer: {
    width: JourneySizes.characterWidth,
    paddingTop: JourneyLayout.characterTopOffset,
    paddingLeft: JourneyLayout.characterLeftOffset,
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: JourneyLayout.pathPaddingTop,
    paddingBottom: JourneyLayout.pathPaddingBottom,
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

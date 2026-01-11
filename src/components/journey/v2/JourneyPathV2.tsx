/**
 * JourneyPathV2 Component
 *
 * Main scrollable path with S-curve layout.
 * Positions day badges along a sinusoidal path with connector line.
 */

import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { DayBadge } from './DayBadge';
import { UnlockPrompt } from './UnlockPrompt';
import type { JourneyDay } from '@/types/journey';
import { calculateSCurvePath, generateSVGPath } from '@/utils/journeyPathV2';
import { NewJourneyColors, NewJourneySizes } from '@/constants/journeyTokensV2';

interface JourneyPathV2Props {
  days: JourneyDay[];
  onDayPress: (day: JourneyDay) => void;
  showUnlockPrompt: boolean;
}

export const JourneyPathV2: React.FC<JourneyPathV2Props> = ({
  days,
  onDayPress,
  showUnlockPrompt,
}) => {
  // Calculate node positions along inverted S-curve (Day 1 at top)
  const pathNodes = useMemo(() => {
    return calculateSCurvePath(days);
  }, [days]);

  // Generate SVG path for connector line
  const svgPath = useMemo(() => {
    return generateSVGPath(pathNodes);
  }, [pathNodes]);

  const contentHeight =
    (days.length + 1) * NewJourneySizes.verticalSpacing + 200;
  const today = new Date().toISOString().split('T')[0];

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={[styles.scrollContent, { height: contentHeight }]}
      showsVerticalScrollIndicator={false}
    >
      {/* SVG Connector Line */}
      <Svg
        style={styles.svg}
        width={NewJourneySizes.pathWidth}
        height={contentHeight}
      >
        <Path
          d={svgPath}
          stroke={NewJourneyColors.pathLine}
          strokeWidth={NewJourneySizes.connectorStrokeWidth}
          strokeDasharray={NewJourneySizes.connectorDashArray}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>

      {/* Day Badges */}
      {pathNodes.map((node) => {
        const isToday = node.day.date === today;
        const badgeSize = isToday
          ? NewJourneySizes.dayBadgeToday
          : NewJourneySizes.dayBadgeNormal;

        return (
          <View
            key={node.day.id}
            style={[
              styles.badgeContainer,
              {
                left: node.x - badgeSize / 2,
                top: node.y,
              },
            ]}
          >
            <DayBadge
              dayNumber={node.day.dayNumber}
              status={node.day.status}
              isToday={isToday}
              onPress={() => onDayPress(node.day)}
            />
          </View>
        );
      })}

      {/* Unlock Prompt */}
      {showUnlockPrompt && (
        <View style={[styles.unlockContainer, { top: contentHeight - 180 }]}>
          <UnlockPrompt />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 80,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  svg: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  badgeContainer: {
    position: 'absolute',
  },
  unlockContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

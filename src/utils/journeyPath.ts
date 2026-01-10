/**
 * Journey Path Calculation Utilities
 *
 * Functions for calculating node positions along an S-curve path
 * and generating SVG connector lines between nodes.
 */

import type { JourneyDay, PathNode } from '@/types/journey';
import {
  JourneySizes,
  JourneyLayout,
  NodeGradients,
  NodeShadowColors,
  NodeTextColors,
} from '@/constants/journeyTokens';

// ---------------------------------------------------------------------------
// Path Position Calculations
// ---------------------------------------------------------------------------

/**
 * Calculate X,Y positions for each day node along an S-curve pattern.
 *
 * The S-curve creates a sinusoidal wave pattern where nodes alternate
 * left and right as you scroll down, similar to Duolingo's path.
 *
 * @param days - Array of journey days to position
 * @param pathWidth - Available width for the path (excluding character space)
 * @returns Array of PathNode with calculated positions
 */
export function calculatePathPositions(
  days: JourneyDay[],
  pathWidth: number
): PathNode[] {
  const { waveAmplitude, verticalSpacing, nodeSize } = JourneySizes;

  const centerX = pathWidth / 2;
  const maxAmplitude = Math.max(0, (pathWidth - nodeSize) / 2 - 16);
  const effectiveAmplitude = Math.min(waveAmplitude, maxAmplitude);

  return days.map((day, index) => {
    // Create sinusoidal wave pattern
    // Using PI/2 gives us: 0 -> 1 -> 0 -> -1 -> 0 pattern
    const wavePosition = Math.sin((index * Math.PI) / 2);

    const x = centerX + wavePosition * effectiveAmplitude - nodeSize / 2;
    const y = JourneyLayout.pathPaddingTop + index * verticalSpacing;

    const curveDirection = wavePosition >= 0 ? 'right' : 'left';

    return {
      day,
      x: Math.max(0, x), // Ensure non-negative
      y,
      curveDirection,
    };
  });
}

/**
 * Generate SVG path string for the dotted connector line between nodes.
 *
 * Uses quadratic bezier curves (Q command) to create smooth connections
 * between nodes that follow the S-curve pattern.
 *
 * @param nodes - Array of positioned path nodes
 * @returns SVG path 'd' attribute string
 */
export function generateConnectorPath(nodes: PathNode[]): string {
  if (nodes.length < 2) return '';

  const nodeRadius = JourneySizes.nodeSize / 2;

  // Start at center of first node
  const firstNode = nodes[0];
  let path = `M ${firstNode.x + nodeRadius} ${firstNode.y + nodeRadius}`;

  for (let i = 1; i < nodes.length; i++) {
    const prev = nodes[i - 1];
    const curr = nodes[i];

    const prevCenterX = prev.x + nodeRadius;
    const prevCenterY = prev.y + nodeRadius;
    const currCenterX = curr.x + nodeRadius;
    const currCenterY = curr.y + nodeRadius;

    // Control point at midpoint Y, using previous X for smooth curve
    const controlY = (prevCenterY + currCenterY) / 2;

    // Quadratic bezier curve
    path += ` Q ${prevCenterX} ${controlY}, ${currCenterX} ${currCenterY}`;
  }

  return path;
}

/**
 * Calculate the total content height needed for the path.
 *
 * @param nodeCount - Number of nodes in the path
 * @returns Total height in pixels
 */
export function calculatePathHeight(nodeCount: number): number {
  const { verticalSpacing, nodeSize, nodeShadowHeight } = JourneySizes;
  const { pathPaddingTop, pathPaddingBottom } = JourneyLayout;

  return (
    pathPaddingTop +
    (nodeCount - 1) * verticalSpacing +
    nodeSize +
    nodeShadowHeight +
    pathPaddingBottom
  );
}

/**
 * Determine which days should be visible based on scroll position.
 *
 * @param totalDays - Total number of days in the journey
 * @returns Object with start/end indices and whether more days exist
 */
export function getVisibleDaysRange(totalDays: number): {
  start: number;
  end: number;
  hasMore: boolean;
} {
  const maxVisible = JourneyLayout.maxVisibleDays;

  return {
    start: 0,
    end: Math.min(totalDays, maxVisible),
    hasMore: totalDays > maxVisible,
  };
}

/**
 * Check if a day number should display a milestone (treasure chest).
 *
 * @param dayNumber - The day number (1-indexed)
 * @returns True if this day is a milestone
 */
export function isMilestoneDay(dayNumber: number): boolean {
  return dayNumber > 0 && dayNumber % JourneyLayout.milestoneFrequency === 0;
}

/**
 * Calculate streak from an array of journey days.
 *
 * Counts consecutive logged days ending at today or most recent logged day.
 *
 * @param days - Array of journey days sorted by date (newest first)
 * @returns Current streak count
 */
export function calculateStreak(days: JourneyDay[]): number {
  if (days.length === 0) return 0;

  let streak = 0;

  // Sort by dayNumber descending to process from most recent
  const sortedDays = [...days].sort((a, b) => b.dayNumber - a.dayNumber);

  for (const day of sortedDays) {
    if (day.status === 'logged' || day.status === 'today') {
      streak++;
    } else if (day.status === 'missed') {
      // Streak broken
      break;
    }
    // Skip locked days (future)
  }

  return streak;
}

/**
 * Get the node style properties based on day status.
 *
 * @param status - The day's current status
 * @returns Object with gradient colors, shadow color, and text color
 */
export function getNodeStyleForStatus(status: JourneyDay['status']): {
  gradient: readonly [string, string];
  shadow: string;
  text: string;
} {
  return {
    gradient: NodeGradients[status],
    shadow: NodeShadowColors[status],
    text: NodeTextColors[status],
  };
}

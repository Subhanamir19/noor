/**
 * Journey Path V2 Utility Functions
 *
 * S-curve path calculations for the Duolingo-inspired Journey Screen.
 * Inverted layout: Day 1 at top, descending downward.
 */

import type { JourneyDay, PathNode } from '@/types/journey';
import { NewJourneySizes } from '@/constants/journeyTokensV2';

/**
 * Calculate S-curve path positions for day badges.
 * Inverted layout: Day 1 at top, descending downward.
 */
export function calculateSCurvePath(days: JourneyDay[]): PathNode[] {
  const { amplitude, centerX, verticalSpacing } = NewJourneySizes;

  return days.map((day, index) => {
    // Sinusoidal wave: alternates left-right
    const wavePosition = Math.sin((index * Math.PI) / 2);
    const x = centerX + wavePosition * amplitude;
    const y = 60 + index * verticalSpacing;

    const curveDirection = wavePosition >= 0 ? 'right' : 'left';

    return {
      day,
      x,
      y,
      curveDirection,
    };
  });
}

/**
 * Generate SVG path string for the dotted connector line.
 */
export function generateSVGPath(nodes: PathNode[]): string {
  if (nodes.length < 2) return '';

  const nodeRadius = NewJourneySizes.dayBadgeNormal / 2;
  let path = `M ${nodes[0].x} ${nodes[0].y + nodeRadius}`;

  for (let i = 1; i < nodes.length; i++) {
    const prev = nodes[i - 1];
    const curr = nodes[i];

    const prevCenterX = prev.x;
    const prevCenterY = prev.y + nodeRadius;
    const currCenterX = curr.x;
    const currCenterY = curr.y + nodeRadius;

    // Control point for smooth bezier curve
    const controlY = (prevCenterY + currCenterY) / 2;

    path += ` Q ${prevCenterX} ${controlY}, ${currCenterX} ${currCenterY}`;
  }

  return path;
}

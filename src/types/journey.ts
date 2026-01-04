/**
 * Journey Screen Types - Duolingo-style Day Path
 *
 * Type definitions for the gamified journey path system including
 * day nodes, path calculations, stats, and animations.
 */

// ---------------------------------------------------------------------------
// Day Node Types
// ---------------------------------------------------------------------------

/** Status of a day in the journey path */
export type DayStatus = 'logged' | 'missed' | 'today' | 'locked';

/** A single day in the journey timeline */
export interface JourneyDay {
  id: string;
  dayNumber: number;
  date: string; // ISO date string (YYYY-MM-DD)
  status: DayStatus;
  photoUri?: string;
  reflectionText?: string;
  sentiment?: 'happy' | 'neutral' | 'tough';
  isMilestone: boolean; // Every 7th day shows a treasure chest
}

/** Direction the path curves for a node */
export type CurveDirection = 'left' | 'right';

/** A node positioned on the S-curve path */
export interface PathNode {
  day: JourneyDay;
  x: number; // Calculated X position
  y: number; // Calculated Y position
  curveDirection: CurveDirection;
}

// ---------------------------------------------------------------------------
// Stats & Gamification Types
// ---------------------------------------------------------------------------

/** Journey statistics displayed in header */
export interface JourneyStats {
  currentStreak: number;
  longestStreak: number;
  connectionDepthLevel: number;
  connectionDepthPoints: number;
  totalDaysLogged: number;
}

/** Connection depth level thresholds */
export interface ConnectionDepthThreshold {
  level: number;
  minPoints: number;
  maxPoints: number;
  title: string;
}

/** Badge types earned through journey */
export type JourneyBadgeType =
  | 'first_photo'
  | '7_day_streak'
  | '30_day_streak'
  | '100_day_streak'
  | 'connection_depth_10'
  | 'connection_depth_25'
  | 'connection_depth_50';

// ---------------------------------------------------------------------------
// Animation Types
// ---------------------------------------------------------------------------

/** Animation configuration for nodes and interactions */
export interface NodeAnimationConfig {
  damping: number;
  stiffness: number;
  mass: number;
}

/** Photo modal animation states */
export type PhotoModalState = 'closed' | 'opening' | 'open' | 'closing';

// ---------------------------------------------------------------------------
// Path Layout Types
// ---------------------------------------------------------------------------

/** Configuration for the S-curve path layout */
export interface PathLayoutConfig {
  amplitude: number; // How far left/right the wave goes
  centerX: number; // Center point of the wave
  verticalSpacing: number; // Space between nodes vertically
  nodeSize: number; // Size of each day node
}

/** Visible range of days in the path */
export interface VisibleDaysRange {
  start: number;
  end: number;
  hasMore: boolean;
}

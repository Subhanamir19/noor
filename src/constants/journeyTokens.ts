/**
 * Journey Screen Design Tokens
 *
 * Visual constants for the Journey screen, aligned with the Today screen UI system.
 *
 * Journey-specific tokens should be additive (node states, path layout),
 * while base surfaces/typography should reuse Today tokens.
 */

import { TodayColors, TodayRadii, TodaySpacing } from './todayTokens';

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export const JourneyColors = {
  // Surfaces (Today-aligned)
  background: TodayColors.bgApp,
  card: TodayColors.card,
  strokeSubtle: TodayColors.strokeSubtle,
  strokeStrong: TodayColors.strokeStrong,

  // Text (Today-aligned)
  textPrimary: TodayColors.textPrimary,
  textSecondary: TodayColors.textSecondary,
  textMuted: TodayColors.textMuted,
  textInverse: TodayColors.textInverse,

  // CTAs (Today-aligned)
  ctaPrimary: TodayColors.ctaPrimary,
  ctaPrimaryShadow: TodayColors.ctaPrimaryShadow,
  ctaSecondary: TodayColors.ctaSecondary,
  ctaSecondaryShadow: TodayColors.ctaSecondaryShadow,

  // Connector
  connectorBase: '#CBD5E1',
  connectorActive: TodayColors.ctaPrimary,

  // Node highlights
  glossyHighlight: 'rgba(255, 255, 255, 0.55)',
  nodeTodayGlow: 'rgba(255, 212, 59, 0.45)',
} as const;

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const JourneySizes = {
  // Node dimensions
  nodeSize: 64,
  nodeShadowHeight: 8,
  nodeGlowSize: 92, // nodeSize + 28

  // Chest dimensions
  chestSize: 72,
  chestShadowHeight: 8,

  // FAB dimensions
  fabSize: 56,
  fabShadowHeight: 5,

  // Path layout
  verticalSpacing: 100,
  waveAmplitude: 84,

  // Connector
  connectorStrokeWidth: 4,
  connectorDashArray: '8,8',

  // Header
  headerCardRadius: TodayRadii.lg,

  // Modal
  modalBorderRadius: TodayRadii.xl,

  // Lock message
  lockMessageRadius: TodayRadii.lg,
  lockIconSize: 44,
} as const;

// ---------------------------------------------------------------------------
// Animation Configuration
// ---------------------------------------------------------------------------

export const JourneyAnimations = {
  // Spring physics for press feedback
  pressSpring: {
    damping: 15,
    stiffness: 150,
    mass: 0.8,
  },

  // Spring for modal entry
  modalSpring: {
    damping: 12,
    stiffness: 100,
    mass: 0.8,
  },

  // Glow pulse duration (ms)
  glowPulseDuration: 1200,

  // Press scale factor
  pressScale: 0.92,
  pressScaleSmall: 0.95,

  // Timing durations (ms)
  fadeInDuration: 200,
  fadeOutDuration: 150,
  scaleOutDuration: 200,

  // Dismiss threshold (px)
  dismissThreshold: 100,

  // Chest shake
  chestShakeAngle: 5,
} as const;

// ---------------------------------------------------------------------------
// Layout Configuration
// ---------------------------------------------------------------------------

export const JourneyLayout = {
  // Maximum days to show initially
  maxVisibleDays: 12,

  // Milestone frequency (every N days)
  milestoneFrequency: 7,

  // Path padding
  pathPaddingTop: TodaySpacing[16],
  pathPaddingBottom: 140,

  // Horizontal padding (path container insets)
  horizontalPadding: TodaySpacing[16],

  // Lock message position
  lockMessageBottomOffset: 20,
} as const;

// ---------------------------------------------------------------------------
// Connection Depth Thresholds
// ---------------------------------------------------------------------------

export const ConnectionDepthLevels = [
  { level: 1, minPoints: 0, maxPoints: 99, title: 'Seedling' },
  { level: 2, minPoints: 100, maxPoints: 199, title: 'Sprout' },
  { level: 3, minPoints: 200, maxPoints: 349, title: 'Sapling' },
  { level: 4, minPoints: 350, maxPoints: 549, title: 'Growing' },
  { level: 5, minPoints: 550, maxPoints: 799, title: 'Flourishing' },
  { level: 6, minPoints: 800, maxPoints: 1099, title: 'Thriving' },
  { level: 7, minPoints: 1100, maxPoints: 1449, title: 'Blossoming' },
  { level: 8, minPoints: 1450, maxPoints: 1849, title: 'Radiant' },
  { level: 9, minPoints: 1850, maxPoints: 2299, title: 'Luminous' },
  { level: 10, minPoints: 2300, maxPoints: Infinity, title: 'Transcendent' },
] as const;

// ---------------------------------------------------------------------------
// Gradient Configurations
// ---------------------------------------------------------------------------

export const NodeGradients = {
  logged: ['#FF8BC3', '#FF6FAE'] as const,
  missed: ['#CBD5E1', '#B6C2D1'] as const,
  today: ['#FFD43B', '#FFB400'] as const,
  locked: ['#E5E7EB', '#D1D5DB'] as const,
} as const;

export const NodeShadowColors = {
  logged: '#D83B7D',
  missed: '#94A3B8',
  today: '#D09A00',
  locked: '#C7CBD1',
} as const;

export const NodeTextColors = {
  logged: TodayColors.textInverse,
  missed: '#475569',
  today: TodayColors.textPrimary,
  locked: TodayColors.textMuted,
} as const;

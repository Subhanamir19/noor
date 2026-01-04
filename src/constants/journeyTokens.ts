/**
 * Journey Screen Design Tokens
 *
 * Visual constants for the Duolingo-style journey path including
 * colors, sizes, animations, and layout configuration.
 */

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export const JourneyColors = {
  // Background
  background: '#1A1A2E',
  headerYellow: '#FFD93D',
  headerYellowDark: '#E6C435',

  // Node States - Pink (logged/captured)
  nodePinkLight: '#FDA4AF',
  nodePinkDark: '#FB7185',
  nodePinkShadow: '#BE123C',

  // Node States - Gray (missed)
  nodeGrayLight: '#6B7280',
  nodeGrayDark: '#4B5563',
  nodeGrayShadow: '#374151',

  // Node States - Gold (today)
  nodeGoldLight: '#FCD34D',
  nodeGoldDark: '#F59E0B',
  nodeGoldShadow: '#B45309',
  nodeGoldGlow: '#FCD34D',

  // Node States - Locked
  nodeLockedLight: '#374151',
  nodeLockedDark: '#1F2937',
  nodeLockedShadow: '#111827',

  // Connector
  connectorLine: '#4B5563',
  connectorLineDark: '#374151',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  textDark: '#1A1A2E',

  // Accents
  accentEmerald: '#10B981',
  accentGold: '#F59E0B',

  // Glossy highlight
  glossyHighlight: 'rgba(255, 255, 255, 0.3)',
  glossyHighlightStrong: 'rgba(255, 255, 255, 0.4)',
} as const;

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const JourneySizes = {
  // Node dimensions
  nodeSize: 64,
  nodeShadowHeight: 8,
  nodeGlowSize: 84, // nodeSize + 20

  // Chest dimensions
  chestSize: 72,

  // FAB dimensions
  fabSize: 64,
  fabShadowHeight: 6,

  // Character dimensions
  characterWidth: 80,
  characterHeight: 100,

  // Path layout
  verticalSpacing: 100,
  waveAmplitude: 80,
  waveCenterX: 120, // Offset from left for character space

  // Connector
  connectorStrokeWidth: 4,
  connectorDashArray: '8,8',

  // Header
  headerHeight: 80,
  statCardHeight: 52,
  statCardRadius: 12,

  // Modal
  modalPhotoSize: 320, // SCREEN_WIDTH - 48 approx
  modalBorderRadius: 24,

  // Lock message
  lockMessageRadius: 16,
  lockIconSize: 48,
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
  glowPulseDuration: 1000,

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
  pathPaddingTop: 40,
  pathPaddingBottom: 100,

  // Horizontal padding
  horizontalPadding: 20,

  // Character position
  characterLeftOffset: 10,
  characterTopOffset: 40,

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
  logged: ['#FDA4AF', '#FB7185'] as const,
  missed: ['#6B7280', '#4B5563'] as const,
  today: ['#FCD34D', '#F59E0B'] as const,
  locked: ['#374151', '#1F2937'] as const,
} as const;

export const NodeShadowColors = {
  logged: '#BE123C',
  missed: '#374151',
  today: '#B45309',
  locked: '#111827',
} as const;

export const NodeTextColors = {
  logged: '#FFFFFF',
  missed: '#9CA3AF',
  today: '#1A1A2E',
  locked: '#4B5563',
} as const;

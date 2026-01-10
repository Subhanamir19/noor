/**
 * Duolingo-Inspired Design Tokens for Tarbiyah
 *
 * Design Philosophy:
 * - Friendly & Playful: Soft geometry, warm colors, bouncy motion
 * - Emotionally Engaging: Celebration moments, progress visualization
 * - Highly Usable: One dominant action, clear hierarchy, obvious affordances
 * - Tactile: Buttons feel "pressable", cards feel "liftable"
 *
 * Layout Discipline:
 * - 8px base grid
 * - Consistent radius scale
 * - Clear spacing rhythm
 */

// ═══════════════════════════════════════════════════════════════
// SPACING SYSTEM (8px base)
// ═══════════════════════════════════════════════════════════════

export const DuoSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,

  // Semantic
  screenPadding: 20,
  cardPadding: 16,
  sectionGap: 24,
  elementGap: 12,
} as const;

// ═══════════════════════════════════════════════════════════════
// RADIUS SYSTEM (Soft Geometry)
// ═══════════════════════════════════════════════════════════════

export const DuoRadius = {
  xs: 8,      // Small chips, badges
  sm: 12,     // Buttons, small cards
  md: 16,     // Medium cards
  lg: 20,     // Large cards
  xl: 24,     // Hero cards
  '2xl': 32,  // Extra rounded
  full: 9999, // Pills, circles
} as const;

// ═══════════════════════════════════════════════════════════════
// COLOR SYSTEM (Warm & Friendly)
// ═══════════════════════════════════════════════════════════════

export const DuoColors = {
  // Backgrounds (Dark Mode - Warm)
  bgPrimary: '#1C1917',      // Warm Black
  bgSecondary: '#292524',    // Warm Gray 800
  bgTertiary: '#3D3733',     // Warm Gray 700
  bgCard: '#292524',         // Card surface
  bgCardElevated: '#3D3733', // Elevated card

  // Primary Brand (Teal - Friendly)
  primary: '#14B8A6',        // Teal 500
  primaryLight: '#5EEAD4',   // Teal 300
  primaryDark: '#0D9488',    // Teal 600
  primaryMuted: 'rgba(20, 184, 166, 0.15)',

  // Success (Celebration Green)
  success: '#22C55E',        // Green 500
  successLight: '#86EFAC',   // Green 300
  successMuted: 'rgba(34, 197, 94, 0.15)',

  // Warning/Streak (Warm Orange)
  streak: '#F97316',         // Orange 500
  streakLight: '#FDBA74',    // Orange 300
  streakMuted: 'rgba(249, 115, 22, 0.15)',

  // Gold (Islamic/Sacred)
  gold: '#F59E0B',           // Amber 500
  goldLight: '#FCD34D',      // Amber 300
  goldMuted: 'rgba(245, 158, 11, 0.12)',

  // Rose (Repair/Compassion)
  rose: '#F43F5E',           // Rose 500
  roseLight: '#FDA4AF',      // Rose 300
  roseMuted: 'rgba(244, 63, 94, 0.12)',

  // Text
  textPrimary: '#FAFAF9',    // Stone 50
  textSecondary: '#D6D3D1',  // Stone 300
  textMuted: '#A8A29E',      // Stone 400
  textInverse: '#1C1917',    // For light backgrounds

  // Borders & Dividers
  border: 'rgba(255, 255, 255, 0.08)',
  borderLight: 'rgba(255, 255, 255, 0.12)',
  divider: 'rgba(255, 255, 255, 0.06)',
} as const;

// Step-specific colors
export const DuoStepColors = {
  moment: {
    bg: '#1C1917',
    accent: DuoColors.streak,
    accentMuted: DuoColors.streakMuted,
  },
  sunnah: {
    bg: '#1A1F1C',  // Slight sage tint
    accent: DuoColors.gold,
    accentMuted: DuoColors.goldMuted,
  },
  whyItWorks: {
    bg: '#1C1917',
    accent: DuoColors.primary,
    accentMuted: DuoColors.primaryMuted,
  },
  todaysAction: {
    bg: '#1F1C1A',  // Warmer
    accent: DuoColors.success,
    accentMuted: DuoColors.successMuted,
  },
  repair: {
    bg: '#1F1A1C',  // Rose tint
    accent: DuoColors.rose,
    accentMuted: DuoColors.roseMuted,
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// TYPOGRAPHY (Clear Hierarchy)
// ═══════════════════════════════════════════════════════════════

export const DuoTypography = {
  // Font families
  fontDisplay: 'Poppins',    // Or your headline font
  fontBody: 'Poppins',
  fontArabic: 'System',

  // Hero - 40px (ONE per screen)
  hero: {
    fontSize: 40,
    fontWeight: '800' as const,
    lineHeight: 48,
    letterSpacing: -1,
  },

  // Display - 32px
  display: {
    fontSize: 32,
    fontWeight: '700' as const,
    lineHeight: 40,
    letterSpacing: -0.5,
  },

  // H1 - 24px
  h1: {
    fontSize: 24,
    fontWeight: '700' as const,
    lineHeight: 32,
    letterSpacing: -0.3,
  },

  // H2 - 20px
  h2: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: -0.2,
  },

  // Body Large - 17px
  bodyLarge: {
    fontSize: 17,
    fontWeight: '500' as const,
    lineHeight: 26,
    letterSpacing: 0,
  },

  // Body - 15px
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 24,
    letterSpacing: 0.1,
  },

  // Label - 14px (Buttons, chips)
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
    letterSpacing: 0.2,
  },

  // Caption - 12px
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
    letterSpacing: 0.3,
  },

  // Tiny - 11px
  tiny: {
    fontSize: 11,
    fontWeight: '600' as const,
    lineHeight: 14,
    letterSpacing: 0.5,
  },

  // Arabic
  arabicDisplay: {
    fontSize: 28,
    fontWeight: '400' as const,
    lineHeight: 44,
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// SHADOWS (Depth & Lift)
// ═══════════════════════════════════════════════════════════════

export const DuoShadows = {
  // Card resting state
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },

  // Card lifted (hover/focus)
  cardLifted: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },

  // Button resting
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  // Button pressed (inset feel via reduced shadow)
  buttonPressed: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
  },

  // Glow effect for primary actions
  glow: {
    shadowColor: DuoColors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 0,
  },

  // Success glow
  successGlow: {
    shadowColor: DuoColors.success,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 0,
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// MOTION (Bouncy & Alive)
// ═══════════════════════════════════════════════════════════════

export const DuoMotion = {
  // Durations
  instant: 100,
  fast: 200,
  normal: 300,
  slow: 400,
  celebration: 800,

  // Spring configs (Reanimated)
  springBouncy: {
    damping: 12,
    stiffness: 200,
    mass: 0.6,
  },
  springSnappy: {
    damping: 18,
    stiffness: 350,
    mass: 0.8,
  },
  springGentle: {
    damping: 20,
    stiffness: 150,
    mass: 1,
  },

  // Button press scale
  buttonPressScale: 0.95,
  cardPressScale: 0.98,

  // Entrance delays (stagger)
  stagger: {
    fast: 50,
    normal: 100,
    slow: 150,
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// COMPONENT SIZES
// ═══════════════════════════════════════════════════════════════

export const DuoSizes = {
  // Buttons
  buttonHeight: 56,
  buttonHeightSmall: 44,
  buttonMinWidth: 120,

  // Progress
  progressBarHeight: 8,
  progressDotSize: 10,
  progressDotSizeActive: 12,

  // Icons
  iconSmall: 20,
  iconMedium: 24,
  iconLarge: 32,

  // Touch targets
  touchTarget: 44,

  // Avatar/Badges
  badgeSmall: 24,
  badgeMedium: 32,
  badgeLarge: 48,

  // Mascot/Character
  characterSmall: 60,
  characterMedium: 100,
  characterLarge: 140,
} as const;

// ═══════════════════════════════════════════════════════════════
// STEP CONFIGURATION
// ═══════════════════════════════════════════════════════════════

export type DuoStepType =
  | 'moment'
  | 'sunnah'
  | 'whyItWorks'
  | 'todaysAction'
  | 'repair';

export const DuoStepConfig: Record<
  DuoStepType,
  {
    number: number;
    label: string;
    shortLabel: string;
    icon: string;
    colors: typeof DuoStepColors.moment;
  }
> = {
  moment: {
    number: 1,
    label: 'The Moment',
    shortLabel: 'Moment',
    icon: '💭',
    colors: DuoStepColors.moment,
  },
  sunnah: {
    number: 2,
    label: 'The Sunnah',
    shortLabel: 'Sunnah',
    icon: '📖',
    colors: DuoStepColors.sunnah,
  },
  whyItWorks: {
    number: 3,
    label: 'Why It Works',
    shortLabel: 'Why',
    icon: '🧠',
    colors: DuoStepColors.whyItWorks,
  },
  todaysAction: {
    number: 4,
    label: "Today's Action",
    shortLabel: 'Action',
    icon: '✨',
    colors: DuoStepColors.todaysAction,
  },
  repair: {
    number: 5,
    label: 'The Repair',
    shortLabel: 'Repair',
    icon: '💚',
    colors: DuoStepColors.repair,
  },
};

export const DUO_STEP_ORDER: DuoStepType[] = [
  'moment',
  'sunnah',
  'whyItWorks',
  'todaysAction',
  'repair',
];

// ═══════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

export const rgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

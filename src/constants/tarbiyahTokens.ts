/**
 * Today's Tarbiyah — Design Tokens
 *
 * Sacred yet intimate design system for daily character lessons.
 * Dark mode immersive experience with Islamic aesthetic subtlety.
 */

// ═══════════════════════════════════════════════════════════════
// COLOR SYSTEM
// ═══════════════════════════════════════════════════════════════

export const TarbiyahColors = {
  // Primary Backgrounds (Dark, Immersive)
  bgPrimary: '#1A1814', // Midnight Cream - Main lesson background
  bgSecondary: '#2A2620', // Warm Charcoal - Card surfaces
  bgSage: '#1E2A24', // Deep Sage - Islamic reference cards
  bgRepair: '#261A1A', // Rose-tinted - Healing/repair screen

  // Text Colors (Dark Mode Optimized)
  textPrimary: '#FAF8F5', // Warm White - Headlines
  textSecondary: '#C9C4BC', // Soft Sand - Body text
  textMuted: '#8A847A', // Dusty Stone - Captions
  textArabic: '#D4AF37', // Gold Leaf - Arabic text
  textAccent: '#7DAF7D', // Sage Green - Step labels

  // Accent Colors
  accentPrimary: '#2D9B8A', // Warm Teal - CTAs, progress
  accentSecondary: '#E8A848', // Sunset Amber - Highlights
  accentTertiary: '#C97B7B', // Rose Blush - Repair moments
  success: '#7DAF7D', // Soft Green - Completion

  // Functional
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
} as const;

// Screen-specific backgrounds
export const TarbiyahScreenBgs = {
  moment: TarbiyahColors.bgPrimary, // Grounded, real
  sunnah: TarbiyahColors.bgSage, // Sacred, reverent
  whyItWorks: TarbiyahColors.bgPrimary, // Clear, logical
  todaysAction: TarbiyahColors.bgSecondary, // Warm, actionable
  repair: TarbiyahColors.bgRepair, // Healing, forgiveness
  completion: TarbiyahColors.bgPrimary,
} as const;

// Opacity values
export const TarbiyahOpacity = {
  textOverlay: 0.8,
  inactive: 0.4,
  subtleBg: 0.1,
  pressed: 0.15,
  border: 0.06,
  divider: 0.08,
} as const;

// ═══════════════════════════════════════════════════════════════
// TYPOGRAPHY
// ═══════════════════════════════════════════════════════════════

export const TarbiyahTypography = {
  // Font families
  fontHeadline: 'BricolageGrotesque',
  fontBody: 'Poppins',
  fontArabic: 'System', // Will use system Arabic font

  // Display - 36px
  display: {
    fontSize: 36,
    fontWeight: '700' as const,
    lineHeight: 42,
    letterSpacing: -0.5,
  },

  // H1 - 28px
  h1: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 34,
    letterSpacing: -0.3,
  },

  // H2 - 22px
  h2: {
    fontSize: 22,
    fontWeight: '600' as const,
    lineHeight: 28,
    letterSpacing: -0.2,
  },

  // H3 - 18px
  h3: {
    fontSize: 18,
    fontWeight: '600' as const,
    lineHeight: 24,
    letterSpacing: 0,
  },

  // Body Large - 17px
  bodyLarge: {
    fontSize: 17,
    fontWeight: '500' as const,
    lineHeight: 26,
    letterSpacing: 0.1,
  },

  // Body - 15px
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 24,
    letterSpacing: 0.1,
  },

  // Caption - 13px
  caption: {
    fontSize: 13,
    fontWeight: '500' as const,
    lineHeight: 18,
    letterSpacing: 0.2,
  },

  // Tiny - 11px
  tiny: {
    fontSize: 11,
    fontWeight: '600' as const,
    lineHeight: 14,
    letterSpacing: 0.5,
  },

  // Arabic Display - 32px
  arabicDisplay: {
    fontSize: 32,
    fontWeight: '400' as const,
    lineHeight: 48,
    letterSpacing: 0,
  },

  // Arabic Body - 20px
  arabicBody: {
    fontSize: 20,
    fontWeight: '400' as const,
    lineHeight: 32,
    letterSpacing: 0,
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// SPACING
// ═══════════════════════════════════════════════════════════════

export const TarbiyahSpacing = {
  space4: 4,
  space8: 8,
  space12: 12,
  space16: 16,
  space20: 20,
  space24: 24,
  space32: 32,
  space48: 48,
  space64: 64,

  // Semantic spacing
  screenGutter: 24,
  cardPadding: 20,
  sectionGap: 32,
  elementGap: 12,
  progressBarTop: 48,
} as const;

// ═══════════════════════════════════════════════════════════════
// BORDER RADIUS
// ═══════════════════════════════════════════════════════════════

export const TarbiyahRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 9999,
} as const;

// ═══════════════════════════════════════════════════════════════
// SHADOWS
// ═══════════════════════════════════════════════════════════════

export const TarbiyahShadows = {
  softGlow: {
    shadowColor: TarbiyahColors.textArabic,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 0,
  },
  cardLift: {
    shadowColor: TarbiyahColors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 8,
  },
  buttonPress: {
    shadowColor: TarbiyahColors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  ctaGlow: {
    shadowColor: TarbiyahColors.accentPrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// ANIMATION / MOTION
// ═══════════════════════════════════════════════════════════════

export const TarbiyahMotion = {
  // Durations
  durationFast: 200,
  durationNormal: 300,
  durationSlow: 400,
  durationVerySlow: 600,
  durationCelebration: 1000,

  // Spring configs for react-native-reanimated
  spring: {
    damping: 20,
    stiffness: 300,
    mass: 0.8,
  },
  springBouncy: {
    damping: 12,
    stiffness: 200,
    mass: 0.6,
  },
  springGentle: {
    damping: 25,
    stiffness: 150,
    mass: 1,
  },

  // Content reveal delays (staggered)
  stagger: {
    stepLabel: 100,
    headline: 200,
    body: 300,
    card: 400,
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// COMPONENT SIZES
// ═══════════════════════════════════════════════════════════════

export const TarbiyahSizes = {
  // Progress indicator
  progressDot: 8,
  progressDotActive: 10,
  progressBarHeight: 48,

  // Buttons
  closeButton: 44,
  closeIcon: 24,
  ctaButton: 56,

  // Chips
  stepLabelHeight: 28,

  // Content
  contentMaxWidth: '100%',
  cardMinHeight: 120,

  // Quote border
  quoteBorderWidth: 3,
} as const;

// ═══════════════════════════════════════════════════════════════
// STEP CONFIGURATION
// ═══════════════════════════════════════════════════════════════

export type TarbiyahStepType =
  | 'moment'
  | 'sunnah'
  | 'whyItWorks'
  | 'todaysAction'
  | 'repair';

export const TarbiyahStepConfig: Record<
  TarbiyahStepType,
  {
    label: string;
    number: number;
    background: string;
    accentColor: string;
  }
> = {
  moment: {
    label: 'THE MOMENT',
    number: 1,
    background: TarbiyahScreenBgs.moment,
    accentColor: TarbiyahColors.accentSecondary,
  },
  sunnah: {
    label: 'THE SUNNAH',
    number: 2,
    background: TarbiyahScreenBgs.sunnah,
    accentColor: TarbiyahColors.textArabic,
  },
  whyItWorks: {
    label: 'WHY IT WORKS',
    number: 3,
    background: TarbiyahScreenBgs.whyItWorks,
    accentColor: TarbiyahColors.accentPrimary,
  },
  todaysAction: {
    label: "TODAY'S ACTION",
    number: 4,
    background: TarbiyahScreenBgs.todaysAction,
    accentColor: TarbiyahColors.accentPrimary,
  },
  repair: {
    label: 'THE REPAIR',
    number: 5,
    background: TarbiyahScreenBgs.repair,
    accentColor: TarbiyahColors.accentTertiary,
  },
};

// Step order for navigation
export const TARBIYAH_STEP_ORDER: TarbiyahStepType[] = [
  'moment',
  'sunnah',
  'whyItWorks',
  'todaysAction',
  'repair',
];

// ═══════════════════════════════════════════════════════════════
// RGBA HELPERS
// ═══════════════════════════════════════════════════════════════

export const rgba = (hex: string, alpha: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Pre-computed RGBA values for common use cases
export const TarbiyahRgba = {
  // Borders
  cardBorder: rgba(TarbiyahColors.white, 0.06),
  divider: rgba(TarbiyahColors.white, 0.08),
  activeBorder: rgba(TarbiyahColors.accentPrimary, 1),

  // Step label backgrounds
  stepLabelBg: rgba(TarbiyahColors.textAccent, 0.15),
  stepLabelBorder: rgba(TarbiyahColors.textAccent, 0.3),

  // Insight box (amber)
  insightBg: rgba(TarbiyahColors.accentSecondary, 0.1),
  insightBorder: rgba(TarbiyahColors.accentSecondary, 0.2),

  // Psychology box (teal)
  psychBg: rgba(TarbiyahColors.accentPrimary, 0.1),
  psychBorder: rgba(TarbiyahColors.accentPrimary, 0.2),

  // Repair box (rose)
  repairBg: rgba(TarbiyahColors.accentTertiary, 0.1),
  repairBorder: rgba(TarbiyahColors.accentTertiary, 0.25),

  // Progress dots
  progressInactive: rgba(TarbiyahColors.white, 0.2),
  progressLine: rgba(TarbiyahColors.white, 0.1),

  // Arabic glow
  arabicGlow: rgba(TarbiyahColors.textArabic, 0.15),
} as const;

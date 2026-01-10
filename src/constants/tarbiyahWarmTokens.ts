/**
 * Tarbiyah Warm Design Tokens
 *
 * Inspired by Journal App aesthetic:
 * - Warm creams, soft yellows, sage greens
 * - Layered cards with soft shadows
 * - Friendly, approachable, emotionally warm
 * - Light mode optimized
 */

// ═══════════════════════════════════════════════════════════════
// SPACING SYSTEM (8px base)
// ═══════════════════════════════════════════════════════════════

export const WarmSpacing = {
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

  screenPadding: 20,
  cardPadding: 20,
  sectionGap: 24,
} as const;

// ═══════════════════════════════════════════════════════════════
// RADIUS SYSTEM (Soft, friendly geometry)
// ═══════════════════════════════════════════════════════════════

export const WarmRadius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
  full: 9999,
} as const;

// ═══════════════════════════════════════════════════════════════
// COLOR SYSTEM (Warm, Light Mode)
// ═══════════════════════════════════════════════════════════════

export const WarmColors = {
  // Backgrounds
  bgPrimary: '#FAF7F2',      // Warm cream
  bgSecondary: '#F5F0E8',    // Slightly darker cream
  bgCard: '#FFFFFF',         // Pure white cards
  bgCardAlt: '#FFF9F0',      // Warm white
  bgOverlay: 'rgba(0,0,0,0.4)',

  // Primary - Soft Rose/Pink (CTA buttons)
  primary: '#E8788A',        // Soft rose
  primaryDark: '#D4606F',    // Darker for 3D effect
  primaryLight: '#F5A3B0',   // Lighter variant
  primaryMuted: 'rgba(232, 120, 138, 0.12)',

  // Secondary - Warm Yellow/Gold
  secondary: '#F5C563',      // Warm yellow
  secondaryDark: '#E5A832',  // Darker yellow
  secondaryLight: '#FFEAB8', // Light yellow bg
  secondaryMuted: 'rgba(245, 197, 99, 0.15)',

  // Accent - Sage Green
  sage: '#8BAF8B',           // Sage green
  sageDark: '#6B8F6B',       // Darker sage
  sageLight: '#E8F0E8',      // Light sage bg
  sageMuted: 'rgba(139, 175, 139, 0.15)',

  // Accent - Soft Purple
  purple: '#A588C2',         // Soft purple
  purpleDark: '#8A6BA8',     // Darker purple
  purpleLight: '#F0EAF5',    // Light purple bg
  purpleMuted: 'rgba(165, 136, 194, 0.12)',

  // Accent - Warm Orange
  orange: '#E89B6C',         // Warm orange
  orangeDark: '#D4805A',     // Darker orange
  orangeLight: '#FFF0E5',    // Light orange bg
  orangeMuted: 'rgba(232, 155, 108, 0.12)',

  // Text
  textPrimary: '#2D2A26',    // Warm black
  textSecondary: '#5C5750',  // Warm gray
  textMuted: '#9C958C',      // Muted warm gray
  textOnPrimary: '#FFFFFF',  // White text on colored bg
  textOnDark: '#FAF7F2',     // Cream on dark

  // Borders & Dividers
  border: 'rgba(0, 0, 0, 0.06)',
  borderMedium: 'rgba(0, 0, 0, 0.10)',
  divider: 'rgba(0, 0, 0, 0.04)',

  // Success/Celebration
  success: '#7DB87D',        // Soft green
  successLight: '#E5F2E5',

  // Streak/Fire
  streak: '#F5A623',         // Warm orange for streaks
  streakBg: '#FFF4E0',
} as const;

// Step-specific colors (for teaching screens)
export const WarmStepColors = {
  moment: {
    bg: WarmColors.bgPrimary,
    accent: WarmColors.orange,
    accentDark: WarmColors.orangeDark,
    accentLight: WarmColors.orangeLight,
    icon: '💭',
  },
  sunnah: {
    bg: '#F8F5F0',           // Slight warm tint
    accent: WarmColors.secondary,
    accentDark: WarmColors.secondaryDark,
    accentLight: WarmColors.secondaryLight,
    icon: '📖',
  },
  whyItWorks: {
    bg: WarmColors.bgPrimary,
    accent: WarmColors.sage,
    accentDark: WarmColors.sageDark,
    accentLight: WarmColors.sageLight,
    icon: '🧠',
  },
  todaysAction: {
    bg: WarmColors.bgPrimary,
    accent: WarmColors.primary,
    accentDark: WarmColors.primaryDark,
    accentLight: WarmColors.primaryLight,
    icon: '✨',
  },
  repair: {
    bg: '#FDF8F8',           // Slight rose tint
    accent: WarmColors.purple,
    accentDark: WarmColors.purpleDark,
    accentLight: WarmColors.purpleLight,
    icon: '💚',
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// TYPOGRAPHY
// ═══════════════════════════════════════════════════════════════

export const WarmTypography = {
  fontDisplay: 'Poppins',
  fontBody: 'Poppins',

  // Hero - 36px
  hero: {
    fontSize: 36,
    fontWeight: '700' as const,
    lineHeight: 44,
    letterSpacing: -0.5,
  },

  // Display - 28px
  display: {
    fontSize: 28,
    fontWeight: '700' as const,
    lineHeight: 36,
    letterSpacing: -0.3,
  },

  // H1 - 24px
  h1: {
    fontSize: 24,
    fontWeight: '600' as const,
    lineHeight: 32,
    letterSpacing: -0.2,
  },

  // H2 - 20px
  h2: {
    fontSize: 20,
    fontWeight: '600' as const,
    lineHeight: 28,
  },

  // Body Large - 17px
  bodyLarge: {
    fontSize: 17,
    fontWeight: '500' as const,
    lineHeight: 26,
  },

  // Body - 15px
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 24,
  },

  // Label - 14px
  label: {
    fontSize: 14,
    fontWeight: '600' as const,
    lineHeight: 20,
  },

  // Caption - 12px
  caption: {
    fontSize: 12,
    fontWeight: '500' as const,
    lineHeight: 16,
  },

  // Tiny - 11px
  tiny: {
    fontSize: 11,
    fontWeight: '600' as const,
    lineHeight: 14,
    letterSpacing: 0.5,
  },

  // Arabic
  arabic: {
    fontSize: 26,
    fontWeight: '400' as const,
    lineHeight: 42,
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// SHADOWS (Soft, layered)
// ═══════════════════════════════════════════════════════════════

export const WarmShadows = {
  // Card shadow - soft and subtle
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  // Elevated card
  cardElevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  // Button shadow
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  // 3D Button bottom shadow (the "chunky" effect)
  button3D: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 0,
    elevation: 4,
  },
} as const;

// ═══════════════════════════════════════════════════════════════
// MOTION
// ═══════════════════════════════════════════════════════════════

export const WarmMotion = {
  fast: 150,
  normal: 250,
  slow: 350,

  springBouncy: {
    damping: 12,
    stiffness: 180,
    mass: 0.8,
  },
  springSnappy: {
    damping: 18,
    stiffness: 300,
    mass: 0.8,
  },
  springGentle: {
    damping: 20,
    stiffness: 120,
    mass: 1,
  },

  buttonPressScale: 0.96,
  cardPressScale: 0.98,
} as const;

// ═══════════════════════════════════════════════════════════════
// SIZES
// ═══════════════════════════════════════════════════════════════

export const WarmSizes = {
  // Buttons
  buttonHeight: 56,
  buttonHeightSmall: 44,
  button3DOffset: 4,  // The "depth" of the 3D button

  // Touch targets
  touchTarget: 44,

  // Progress
  progressBarHeight: 8,

  // Icons
  iconSmall: 20,
  iconMedium: 24,
  iconLarge: 32,

  // Illustrations (placeholders)
  illustrationSmall: 80,
  illustrationMedium: 120,
  illustrationLarge: 160,
} as const;

// ═══════════════════════════════════════════════════════════════
// STEP CONFIGURATION
// ═══════════════════════════════════════════════════════════════

export type WarmStepType =
  | 'moment'
  | 'sunnah'
  | 'whyItWorks'
  | 'todaysAction'
  | 'repair';

export const WARM_STEP_ORDER: WarmStepType[] = [
  'moment',
  'sunnah',
  'whyItWorks',
  'todaysAction',
  'repair',
];

export const WarmStepConfig: Record<
  WarmStepType,
  {
    number: number;
    label: string;
    shortLabel: string;
    icon: string;
    colors: typeof WarmStepColors.moment;
  }
> = {
  moment: {
    number: 1,
    label: 'The Moment',
    shortLabel: 'Moment',
    icon: '💭',
    colors: WarmStepColors.moment,
  },
  sunnah: {
    number: 2,
    label: 'The Sunnah',
    shortLabel: 'Sunnah',
    icon: '📖',
    colors: WarmStepColors.sunnah,
  },
  whyItWorks: {
    number: 3,
    label: 'Why It Works',
    shortLabel: 'Why',
    icon: '🧠',
    colors: WarmStepColors.whyItWorks,
  },
  todaysAction: {
    number: 4,
    label: "Today's Action",
    shortLabel: 'Action',
    icon: '✨',
    colors: WarmStepColors.todaysAction,
  },
  repair: {
    number: 5,
    label: 'The Repair',
    shortLabel: 'Repair',
    icon: '💚',
    colors: WarmStepColors.repair,
  },
};

/**
 * Daily Tasks Design System Tokens
 *
 * Elite-level design tokens for the Daily Tasks feature.
 * Following Duolingo-inspired 3D chunky style with Islamic warm palette.
 */

import type { ImageSourcePropType } from 'react-native';

// ---------------------------------------------------------------------------
// Color Palette
// ---------------------------------------------------------------------------

export const DailyTasksColors = {
  // Core brand colors
  cream: '#FFF7ED',
  emerald: '#0F766E',
  deepTeal: '#115E59',
  gold: '#F59E0B',
  blush: '#FDF2F8',

  // Semantic colors
  success: '#58CC02',
  successDark: '#4CAF00',
  info: '#1CB0F6',
  infoDark: '#1899D6',
  warning: '#FFC800',
  warningDark: '#F5A623',

  // Text colors
  textDark: '#1F2937',
  textMuted: '#6B7280',
  textLight: '#9CA3AF',

  // UI colors
  cardBorder: 'rgba(0, 0, 0, 0.08)',
  shadowLight: 'rgba(0, 0, 0, 0.05)',
  shadowMedium: 'rgba(0, 0, 0, 0.12)',
  overlay: 'rgba(0, 0, 0, 0.18)',

  // Progress bar
  progressBg: 'rgba(17, 24, 39, 0.08)',
  progressFill: '#58CC02',
  progressBorder: 'rgba(0, 0, 0, 0.05)',
} as const;

// ---------------------------------------------------------------------------
// Simplified Theme System (4 themes instead of 9)
// ---------------------------------------------------------------------------

export type SimplifiedThemeId = 'spiritual' | 'character' | 'bonding' | 'practical';

export interface SimplifiedTheme {
  id: SimplifiedThemeId;
  label: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  image: ImageSourcePropType;
  gradient: [string, string];
}

export const SIMPLIFIED_THEMES: Record<SimplifiedThemeId, SimplifiedTheme> = {
  spiritual: {
    id: 'spiritual',
    label: 'Spiritual',
    primaryColor: '#CFF3E1',
    secondaryColor: '#9EE7C2',
    accentColor: '#0F766E',
    textColor: '#065F46',
    image: require('../../assets/Spiritual Theme.png'),
    gradient: ['#CFF3E1', '#9EE7C2'],
  },
  character: {
    id: 'character',
    label: 'Character',
    primaryColor: '#E8D5B7',
    secondaryColor: '#D4B896',
    accentColor: '#92400E',
    textColor: '#78350F',
    image: require('../../assets/Character Theme.png'),
    gradient: ['#E8D5B7', '#D4B896'],
  },
  bonding: {
    id: 'bonding',
    label: 'Bonding',
    primaryColor: '#FFD4A8',
    secondaryColor: '#FFB26B',
    accentColor: '#C2410C',
    textColor: '#9A3412',
    image: require('../../assets/Bonding Theme.png'),
    gradient: ['#FFD4A8', '#FFB26B'],
  },
  practical: {
    id: 'practical',
    label: 'Practical',
    primaryColor: '#BFDBFE',
    secondaryColor: '#93C5FD',
    accentColor: '#1D4ED8',
    textColor: '#1E40AF',
    image: require('../../assets/Practical Theme.png'),
    gradient: ['#BFDBFE', '#93C5FD'],
  },
};

// ---------------------------------------------------------------------------
// Typography Scale
// ---------------------------------------------------------------------------

export const DailyTasksTypography = {
  // Headers
  h1: {
    fontSize: 28,
    fontWeight: '800' as const,
    fontFamily: 'Poppins-Bold',
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  h2: {
    fontSize: 22,
    fontWeight: '700' as const,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: -0.3,
    lineHeight: 28,
  },
  h3: {
    fontSize: 18,
    fontWeight: '700' as const,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0,
    lineHeight: 24,
  },

  // Body text
  bodyLarge: {
    fontSize: 16,
    fontWeight: '500' as const,
    fontFamily: 'Inter-Medium',
    lineHeight: 24,
  },
  bodyRegular: {
    fontSize: 14,
    fontWeight: '400' as const,
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400' as const,
    fontFamily: 'Inter-Regular',
    lineHeight: 16,
  },

  // Labels & buttons
  labelLarge: {
    fontSize: 16,
    fontWeight: '800' as const,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.5,
  },
  labelMedium: {
    fontSize: 14,
    fontWeight: '700' as const,
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.3,
  },
  labelSmall: {
    fontSize: 12,
    fontWeight: '700' as const,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.5,
  },

  // Chip/badge text
  chip: {
    fontSize: 11,
    fontWeight: '800' as const,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.8,
  },
} as const;

// ---------------------------------------------------------------------------
// Spacing & Layout (8px base grid)
// ---------------------------------------------------------------------------

export const DailyTasksSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const DailyTasksLayout = {
  // Card dimensions
  cardRadius: 28,
  cardBorder: 3,
  cardPadding: 16,

  // Button dimensions (3D style)
  buttonRadius: 16,
  buttonBorder: 3,
  buttonShadowOffset: 4,

  // Progress bar
  progressHeight: 16,
  progressRadius: 999,

  // Chip/badge
  chipRadius: 999,
  chipPaddingH: 12,
  chipPaddingV: 8,

  // Section spacing
  sectionGap: 24,
  itemGap: 12,
} as const;

// ---------------------------------------------------------------------------
// Animation Specifications
// ---------------------------------------------------------------------------

export const DailyTasksAnimations = {
  // Spring configs
  buttonSpring: {
    damping: 15,
    stiffness: 400,
    mass: 0.5,
  },
  cardSpring: {
    damping: 19,
    stiffness: 290,
    mass: 0.75,
  },
  celebrationSpring: {
    damping: 12,
    stiffness: 180,
    mass: 1,
  },

  // Timing
  quickFade: 150,
  normalFade: 250,
  slowFade: 400,
  microInteraction: 100,

  // Swipe thresholds
  swipeThreshold: 80,
  velocityThreshold: 600,

  // 3D button press
  buttonPressScale: 0.97,
  buttonPressTranslateY: 3, // Shadow collapse
} as const;

// ---------------------------------------------------------------------------
// 3D Button Styles
// ---------------------------------------------------------------------------

export const Button3DStyles = {
  primary: {
    background: DailyTasksColors.success,
    shadowColor: DailyTasksColors.successDark,
    textColor: '#FFFFFF',
  },
  secondary: {
    background: '#FFFFFF',
    shadowColor: '#E5E7EB',
    textColor: DailyTasksColors.textDark,
  },
  outline: {
    background: 'rgba(255, 255, 255, 0.95)',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    textColor: DailyTasksColors.textDark,
  },
  info: {
    background: DailyTasksColors.info,
    shadowColor: DailyTasksColors.infoDark,
    textColor: '#FFFFFF',
  },
  completed: {
    background: DailyTasksColors.success,
    shadowColor: DailyTasksColors.successDark,
    textColor: '#FFFFFF',
  },
} as const;

// ---------------------------------------------------------------------------
// Category Badge Colors
// ---------------------------------------------------------------------------

export const CategoryBadgeColors = {
  mustToDo: {
    background: 'rgba(88, 204, 2, 0.12)',
    border: 'rgba(88, 204, 2, 0.25)',
    text: '#2E7D32',
  },
  niceToHave: {
    background: 'rgba(28, 176, 246, 0.10)',
    border: 'rgba(28, 176, 246, 0.22)',
    text: '#1899D6',
  },
} as const;

// ---------------------------------------------------------------------------
// Celebration Colors (100% completion)
// ---------------------------------------------------------------------------

export const CelebrationColors = {
  background: '#FFF9C4',
  border: '#FFEB3B',
  titleColor: '#92400E',
  subtitleColor: '#B45309',
  confettiColors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'],
} as const;

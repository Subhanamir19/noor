/**
 * Today Screen Design System Tokens V3
 * Pixel-perfect implementation matching reference UI
 *
 * This file contains all design tokens specific to the Today Screen
 * for consistent styling across all components.
 */

// =============================================================================
// COLOR SYSTEM
// =============================================================================

export const TodayScreenColors = {
  // Hero Background (Night Scene)
  heroGradientStart: '#1A3A5C',
  heroGradientEnd: '#4A7BA7',
  moonCream: '#F5E6B8',

  // App Backgrounds
  bgApp: '#F5EDE4',           // Warm beige main background
  bgCard: '#FFFFFF',          // Pure white cards
  bgCardTinted: 'rgba(255,255,255,0.92)', // Floating cards with blur
  bgSectionDivider: '#F8F8F8',
  bgOverlay: 'rgba(0,0,0,0.5)',

  // Primary Teal
  primary: '#2DB3A0',
  primaryLight: '#3ECFBA',
  primaryDark: '#1F8A7D',
  primaryPressed: '#258F82',
  primaryBg: 'rgba(45,179,160,0.08)',
  primaryBorder: 'rgba(45,179,160,0.15)',

  // Text Hierarchy
  textPrimary: '#2D3436',
  textSecondary: '#636E72',
  textMuted: '#9E9E9E',
  textDisabled: '#BDBDBD',
  textInverse: '#FFFFFF',
  textLink: '#2DB3A0',

  // Accent Colors
  rewardGold: '#F4A100',
  heartRed: '#E84C3D',
  heartPink: '#FFB6C1',
  mascotGreen: '#7ECEC2',
  mascotGreenLight: '#9FD9D0',

  // Success States
  success: '#58CC02',
  successDark: '#4CAF50',
  successBg: 'rgba(88,204,2,0.12)',
  successBorder: 'rgba(88,204,2,0.25)',

  // Progress Colors
  progressTrack: '#E8E8E8',
  progressFillStart: '#2DB3A0',
  progressFillEnd: '#7ECFC0',
  journeyProgressFill: '#FCD34D', // Yellow for journey

  // Strokes & Borders
  strokeSubtle: 'rgba(0,0,0,0.06)',
  strokeMedium: 'rgba(0,0,0,0.08)',
  strokeStrong: 'rgba(0,0,0,0.12)',

  // Counter Pill
  counterPillBg: '#2D3436',
  counterPillText: '#FFFFFF',

  // Section Divider
  dividerText: '#9E9E9E',
  dividerChevron: '#BDBDBD',

  // Icon Backgrounds (by category)
  iconBgPrayer: '#E8F5F3',     // Light teal
  iconBgDua: '#FFF8E7',        // Light gold
  iconBgMorning: '#FFF9E6',    // Light yellow
  iconBgEvening: '#F3E8FF',    // Light purple
  iconBgMeals: '#FFF3E8',      // Light orange
  iconBgSleep: '#E8F4FF',      // Light blue
  iconBgDefault: '#F0F9F8',    // Light teal default
} as const;

// =============================================================================
// SPACING SYSTEM (8px base grid)
// =============================================================================

export const TodayScreenSpacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,

  // Specific measurements
  screenGutter: 16,
  cardPadding: 14,
  cardPaddingHorizontal: 16,
  cardGap: 8,
  sectionGap: 16,
  headerHeight: 56,
  heroHeight: 280,
  journeyCardOverlap: 40,
  tabBarHeight: 83, // Including safe area
} as const;

// =============================================================================
// BORDER RADIUS SYSTEM
// =============================================================================

export const TodayScreenRadii = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 28,
  pill: 9999,

  // Specific components
  card: 16,
  journeyCard: 20,
  contentContainer: 24,
  taskIcon: 12,
  checkmark: 18,  // Half of 36px
  addButton: 20,  // Half of 40px
  counterPill: 10,
  progressBar: 4,
} as const;

// =============================================================================
// TYPOGRAPHY SYSTEM
// =============================================================================

export const TodayScreenTypography = {
  // Font Families
  fontBold: 'BricolageGrotesque-Bold',
  fontSemiBold: 'Poppins-SemiBold',
  fontMedium: 'Poppins-Medium',
  fontRegular: 'Poppins-Regular',

  // Type Scale
  display: {
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  h1: {
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  h2: {
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.2,
  },
  h3: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
  },
  bodyLarge: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.2,
  },
  tiny: {
    fontSize: 10,
    lineHeight: 14,
    letterSpacing: 0.5,
  },
} as const;

// =============================================================================
// SHADOW SYSTEM
// =============================================================================

export const TodayScreenShadows = {
  // Standard card shadow
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  // Floating elements (Journey card)
  floating: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  },

  // Subtle ambient shadow
  ambient: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
  },

  // 3D button ledge effect
  buttonLedge: {
    shadowColor: '#1F8A7D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 0,
    elevation: 4,
  },

  // Header icons (for visibility on image)
  headerIcon: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
} as const;

// =============================================================================
// ANIMATION SYSTEM
// =============================================================================

export const TodayScreenMotion = {
  // Timing durations
  snappy: 200,
  smooth: 300,
  gentle: 400,
  slow: 600,

  // Spring configurations
  springBouncy: {
    damping: 12,
    stiffness: 200,
    mass: 0.8,
  },
  springSmooth: {
    damping: 19,
    stiffness: 290,
    mass: 0.75,
  },
  springGentle: {
    damping: 25,
    stiffness: 150,
    mass: 1,
  },

  // Specific animations
  checkmarkAppear: {
    duration: 300,
    scaleOvershoot: 1.2,
    rotation: -180,
  },
  buttonPress: {
    scaleDown: 0.98,
    duration: 100,
  },
  progressBar: {
    duration: 800,
  },
  headerFade: {
    scrollThreshold: 200,
  },
  sectionCollapse: {
    duration: 250,
  },
} as const;

// =============================================================================
// COMPONENT SIZES
// =============================================================================

export const TodayScreenSizes = {
  // Header
  hamburgerIcon: 24,
  heartIcon: 28,
  addButton: 40,
  addButtonIcon: 20,
  notificationDot: 8,

  // Journey Card
  flameIcon: 32,
  progressBarHeight: 8,
  counterPillPaddingH: 10,
  counterPillPaddingV: 4,

  // Goals Section
  clipboardIcon: 24,
  sparkleButton: 28,

  // Task Card
  taskIcon: 40,
  checkmarkButton: 36,
  checkmarkIcon: 20,
  miniMascot: 32,
  lightningIcon: 16,

  // Touch targets (minimum)
  minTouchTarget: 44,
} as const;

// =============================================================================
// ICON PLACEHOLDERS (Emoji fallbacks)
// =============================================================================

export const TodayScreenIcons = {
  // Navigation
  hamburger: '☰',
  heart: '❤️',
  heartOutline: '🤍',
  plus: '+',
  chevronDown: '▼',
  chevronUp: '▲',
  settings: '⚙️',

  // Journey
  flame: '🔥',

  // Goals
  clipboard: '📋',
  sparkle: '✨',

  // Task
  checkmark: '✓',
  lightning: '⚡',

  // Task Categories
  prayer: '🙏',
  dua: '📖',
  morning: '☀️',
  evening: '🌙',
  meals: '🍽️',
  sleep: '🛏️',
  general: '✨',

  // Mascot placeholder
  mascot: '🌿',
} as const;

// =============================================================================
// CATEGORY COLORS MAP
// =============================================================================

export const TaskCategoryColors: Record<string, { bg: string; icon: string }> = {
  'Prayer, Salah & Wudu Routine': {
    bg: TodayScreenColors.iconBgPrayer,
    icon: TodayScreenIcons.prayer,
  },
  'Dua & Spiritual Connection': {
    bg: TodayScreenColors.iconBgDua,
    icon: TodayScreenIcons.dua,
  },
  'Morning Routine': {
    bg: TodayScreenColors.iconBgMorning,
    icon: TodayScreenIcons.morning,
  },
  'Evening Routine': {
    bg: TodayScreenColors.iconBgEvening,
    icon: TodayScreenIcons.evening,
  },
  'Food, Halal & Eating Etiquette': {
    bg: TodayScreenColors.iconBgMeals,
    icon: TodayScreenIcons.meals,
  },
  'Sleep & Bedtime': {
    bg: TodayScreenColors.iconBgSleep,
    icon: TodayScreenIcons.sleep,
  },
  default: {
    bg: TodayScreenColors.iconBgDefault,
    icon: TodayScreenIcons.general,
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get category-specific styling for task icons
 */
export function getTaskCategoryStyle(category?: string) {
  if (!category) return TaskCategoryColors.default;
  return TaskCategoryColors[category] || TaskCategoryColors.default;
}

/**
 * Format points with lightning bolt
 */
export function formatPoints(points: number): string {
  return `${points}${TodayScreenIcons.lightning}`;
}

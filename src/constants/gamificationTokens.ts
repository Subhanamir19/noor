/**
 * Gamification Design Tokens
 *
 * Colors, animations, and styling for HP/badge system.
 * Maintains consistency with existing todayTokens.ts design system.
 */

// ============================================================================
// Colors
// ============================================================================

export const GamificationColors = {
  // HP Display
  hpPrimary: '#0D9488', // Teal from todayTokens
  hpGlow: 'rgba(13,148,136,0.3)',
  hpText: '#FFFFFF',
  hpBackground: 'rgba(13,148,136,0.12)',
  hpBorder: 'rgba(13,148,136,0.25)',

  // HP Bar Fill
  hpBarTrack: 'rgba(17,24,39,0.08)',
  hpBarFill: '#58CC02', // Success green
  hpBarFillGradientStart: '#58CC02',
  hpBarFillGradientEnd: '#46A302',

  // Badge Colors
  badgeGold: '#F59E0B', // Amber/gold
  badgeGoldGlow: 'rgba(245,158,11,0.4)',
  badgeSilver: '#9CA3AF',
  badgeBronze: '#F97316',

  // Priority Levels
  priorityNormal: 'rgba(0,0,0,0.06)', // Subtle border
  priorityImportant: '#F59E0B', // Amber glow
  priorityImportantGlow: 'rgba(245,158,11,0.25)',
  priorityCritical: '#EF4444', // Red glow
  priorityCriticalGlow: 'rgba(239,68,68,0.3)',

  // Celebration Colors
  confettiTeal: '#0D9488',
  confettiAmber: '#F59E0B',
  confettiPink: '#FFC0CB',
  confettiGreen: '#58CC02',
  confettiSky: '#1CB0F6',

  // Floating Text
  floatingHPColor: '#0D9488',
  floatingHPGlow: 'rgba(13,148,136,0.6)',
} as const;

// ============================================================================
// Typography
// ============================================================================

export const GamificationTypography = {
  hpValue: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.2,
  },
  hpCounter: {
    fontSize: 32,
    fontFamily: 'BricolageGrotesque-ExtraBold',
    letterSpacing: -0.5,
  },
  badgeName: {
    fontSize: 20,
    fontFamily: 'BricolageGrotesque-Bold',
    letterSpacing: -0.2,
  },
  badgeDescription: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    lineHeight: 20,
  },
  floatingHP: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.3,
  },
  taskTimeEstimate: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.2,
  },
} as const;

// ============================================================================
// Spacing
// ============================================================================

export const GamificationSpacing = {
  cardPadding: 16,
  hpBadgePadding: 8,
  priorityGlowRadius: 12,
  hpBarHeight: 8,
  hpBarBorderRadius: 9999, // Pill shape
  badgeIconSize: 64,
  floatingHPOffset: 40, // Distance text rises
} as const;

// ============================================================================
// Animations
// ============================================================================

export const GamificationAnimations = {
  // Task Completion Button
  buttonPress: {
    duration: 100,
    scaleDown: 0.95,
    translateY: 2,
  },
  buttonRelease: {
    duration: 200,
    scaleUp: 1.05,
    damping: 10,
    stiffness: 200,
  },
  checkmarkAppear: {
    duration: 300,
    scaleSequence: [0, 1.2, 1.0],
    rotation: 360,
  },

  // HP Gain
  hpFloatingText: {
    duration: 1500,
    riseDuration: 1500,
    fadeInDuration: 300,
    fadeOutDuration: 300,
    fadeOutDelay: 1200,
  },
  hpCounterIncrement: {
    duration: 800,
    pulseDuration: 200,
    pulseScale: 1.15,
  },
  hpBarFill: {
    duration: 600,
    damping: 15,
    stiffness: 200,
  },

  // Badge Unlock
  badgeEntrance: {
    duration: 700,
    initialScale: 0,
    initialRotation: -180,
    overshoot: 1.5,
    damping: 8,
    stiffness: 100,
    mass: 0.5,
  },
  badgeGlow: {
    duration: 500,
    maxRadius: 40,
    minRadius: 20,
    pulseCount: 2,
  },
  overlayFade: {
    duration: 300,
    opacity: 0.6,
  },

  // Confetti
  confettiParticles: {
    count: 50,
    duration: 2500,
    velocityMin: 200,
    velocityMax: 400,
    gravity: 500,
  },

  // General
  snappy: 200,
  smooth: 300,
  gentle: 400,
} as const;

// ============================================================================
// Shadows & Elevations
// ============================================================================

export const GamificationShadows = {
  // 3D Button Ledge (Duolingo-style)
  buttonLedge: {
    height: 4,
    color: 'rgba(0,0,0,0.10)',
  },
  cardLedge: {
    height: 6,
    color: 'rgba(0,0,0,0.08)',
  },

  // Priority Glows
  priorityImportantGlow: {
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 0, // Android
  },
  priorityCriticalGlow: {
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 0,
  },

  // HP Counter Glow
  hpGlow: {
    shadowColor: '#0D9488',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 0,
  },

  // Badge Glow
  badgeGlow: {
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 0,
  },
} as const;

// ============================================================================
// Border Radius
// ============================================================================

export const GamificationBorderRadius = {
  button: 20,
  card: 24,
  hpBadge: 12,
  hpBar: 9999, // Pill
  priorityBorder: 2,
  modal: 28,
} as const;

// ============================================================================
// Z-Index Layers
// ============================================================================

export const GamificationZIndex = {
  taskCard: 1,
  floatingHP: 100,
  celebration: 9999,
  badgeUnlockOverlay: 10000,
  noorChatFAB: 50,
} as const;

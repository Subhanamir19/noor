/**
 * Journey Screen V2 Design Tokens
 *
 * New Duolingo-inspired UI system for the Journey Screen.
 * Features chunky 3D badges, S-curve path, and gamified interactions.
 */

export const NewJourneyColors = {
  // Background (Warmer, less sterile)
  background: '#FAF9F6',        // Warm canvas (inspired by Headspace)
  backgroundGradient: ['#FAF9F6', '#FFF7F0'] as const,

  // Day Badge States
  completed: '#4CAF50',         // Life green for growth (not pink)
  completedShadow: '#388E3C',   // Deeper green shadow

  missed: '#FFB74D',            // Warm amber (gentle reminder)
  missedShadow: '#FFA726',      // Amber shadow

  today: '#FF9B70',             // Coral warmth (nurturing, not aggressive)
  todayGlow: 'rgba(255, 155, 112, 0.4)', // Coral glow
  todayShadow: '#E16940',

  locked: '#E5E7EB',            // Light gray for future days
  lockedShadow: '#C7CBD1',
  lockedText: '#9CA3AF',

  // Streak Counter (Fire gradient)
  streakFlame: '#FF6B35',
  streakFlameEnd: '#F44336',    // Gradient end
  streakBg: '#FFFFFF',
  streakShadow: 'rgba(0,0,0,0.1)',

  // Milestone (Gold for achievements)
  milestoneGold: '#FFD700',
  milestoneGoldShadow: '#FFC107',
  milestoneGlow: 'rgba(255, 215, 0, 0.3)',

  // Path Connector
  pathLine: '#CBD5E1',          // Subtle gray connector line

  // Text (Softer blacks)
  textPrimary: '#1A1A1A',       // Softer than pure black
  textSecondary: '#4A4A4A',
  textTertiary: '#757575',
  textInverse: '#FFFFFF',
  textMuted: '#9E9E9E',
  textLink: '#2196F3',

  // Unlock Prompt
  lockBg: 'rgba(255,255,255,0.95)',
  lockBorder: '#E5E7EB',
  lockIcon: '#9CA3AF',

  // Status Colors
  success: '#4CAF50',
  successBg: 'rgba(76, 175, 80, 0.12)',
  warning: '#FFA726',
  warningBg: 'rgba(255, 167, 38, 0.12)',
  error: '#EF5350',
  errorBg: 'rgba(239, 83, 80, 0.12)',
} as const;

export const NewJourneySizes = {
  // Day Badge
  dayBadgeNormal: 64,           // Normal day badge size
  dayBadgeToday: 74,            // TODAY badge (64 * 1.15)
  dayBadgeShadow: 8,            // 3D shadow depth

  // Streak Counter
  streakBadgeSize: 56,
  streakIconSize: 24,
  streakNumberSize: 18,

  // Path Layout
  pathWidth: 280,               // Width of the scrollable path area
  verticalSpacing: 110,         // Space between each day
  amplitude: 70,                // Horizontal wave amplitude
  centerX: 140,                 // Center point of wave

  // Connector
  connectorStrokeWidth: 3,
  connectorDashArray: '6,6',

  // Unlock Prompt
  unlockCardWidth: 300,
  unlockCardRadius: 20,
  unlockIconSize: 48,
} as const;

export const NewJourneyTypography = {
  // Day number on badges
  dayNumber: {
    fontSize: 26,
    fontFamily: 'BricolageGrotesque-Bold',
    letterSpacing: -0.5,
  },

  // Streak counter
  streakNumber: {
    fontSize: 20,
    fontFamily: 'BricolageGrotesque-ExtraBold',
    letterSpacing: -0.3,
  },

  // Unlock prompt
  unlockTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },

  unlockSubtitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },
} as const;

export const NewJourneyAnimations = {
  // Spring physics for press feedback
  pressSpring: {
    damping: 15,
    stiffness: 150,
  },

  // Press scale factor
  pressScale: 0.92,

  // TODAY pulse
  todayPulseDuration: 2000,
  todayPulseScale: 1.05,

  // Glow pulse
  glowPulseDuration: 2000,

  // Modal animations
  modalFadeInDuration: 200,
  modalFadeOutDuration: 150,
  modalSpring: {
    damping: 12,
    stiffness: 100,
  },
} as const;

// Today Screen UI System tokens (v2.0)
// Redesigned for warmth, clarity, and gamified engagement.

export const TodayColors = {
  // Backgrounds
  bgApp: '#FFF5F7',
  bgAmbient: '#E8F4F8',
  bgCard: '#FFFFFF',
  bgCardTint: 'rgba(255,255,255,0.92)',
  bgTaskBox: 'rgba(13,148,136,0.08)',

  // Strokes & Borders
  strokeSubtle: 'rgba(0,0,0,0.06)',
  strokeMedium: 'rgba(0,0,0,0.08)',
  strokeStrong: 'rgba(0,0,0,0.10)',
  strokeTaskBox: 'rgba(13,148,136,0.15)',

  // Text Hierarchy
  textPrimary: '#111827',
  textSecondary: '#374151',
  textMuted: '#6B7280',
  textDisabled: '#9CA3AF',
  textInverse: '#FFFFFF',
  textLink: '#1CB0F6',

  // Primary Actions (Teal)
  ctaPrimary: '#0D9488',
  ctaPrimaryPressed: '#0F766E',
  ctaPrimaryLedge: '#0A7C72',

  // Secondary Actions (Sky Blue)
  ctaSecondary: '#1CB0F6',
  ctaSecondaryPressed: '#1899D6',
  ctaSecondaryLedge: '#1687C2',

  // Success (Growth Green)
  success: '#58CC02',
  successDark: '#2E7D32',
  successBg: 'rgba(88,204,2,0.12)',
  successBorder: 'rgba(88,204,2,0.25)',

  // Warning (Amber)
  warning: '#F59E0B',
  warningDark: '#92400E',
  warningBg: 'rgba(245,158,11,0.12)',
  warningBorder: 'rgba(245,158,11,0.20)',

  // Danger (Coral)
  danger: '#EF4444',
  dangerDark: '#DC2626',

  // Info (Blue)
  info: '#1CB0F6',
  infoBg: 'rgba(28,176,246,0.10)',
  infoBorder: 'rgba(28,176,246,0.22)',

  // Accent (Section headers)
  accentTeal: '#0F766E',

  // Progress & Status
  progressTrack: 'rgba(17,24,39,0.08)',
  progressFill: '#58CC02',
  dotInactive: 'rgba(107,114,128,0.35)',
  dotActive: '#1CB0F6',
  dotComplete: '#58CC02',
} as const;

export const TodaySpacing = {
  2: 2,
  4: 4,
  6: 6,
  8: 8,
  10: 10,
  12: 12,
  14: 14,
  16: 16,
  20: 20,
  24: 24,
  32: 32,
} as const;

export const TodayRadii = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 28,
  pill: 9999,
} as const;

export const TodayTypography = {
  // Font Families
  bricolageBold: 'BricolageGrotesque-Bold',
  bricolageExtraBold: 'BricolageGrotesque-ExtraBold',
  bricolageSemiBold: 'BricolageGrotesque-SemiBold',
  poppinsMedium: 'Poppins-Medium',
  poppinsSemiBold: 'Poppins-SemiBold',
  poppinsBold: 'Poppins-Bold',

  // Type Scale
  display: { fontSize: 32, lineHeight: 38, letterSpacing: -0.5 },
  h1: { fontSize: 26, lineHeight: 32, letterSpacing: -0.3 },
  h2: { fontSize: 20, lineHeight: 26, letterSpacing: -0.2 },
  h3: { fontSize: 18, lineHeight: 24, letterSpacing: 0 },
  bodyLarge: { fontSize: 16, lineHeight: 24, letterSpacing: 0 },
  body: { fontSize: 14, lineHeight: 20, letterSpacing: 0 },
  caption: { fontSize: 12, lineHeight: 16, letterSpacing: 0.2 },
  tiny: { fontSize: 10, lineHeight: 14, letterSpacing: 0.5 },
} as const;

export const TodayShadows = {
  cardLedge: {
    height: 6,
    color: 'rgba(0,0,0,0.08)',
  },
  buttonLedge: {
    height: 4,
    color: 'rgba(0,0,0,0.10)',
  },
  softFloat: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  ambient: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 3,
  },
} as const;

// Animation timing presets
export const TodayMotion = {
  snappy: { duration: 200 },
  smooth: { duration: 300 },
  gentle: { duration: 400 },
  spring: { damping: 19, stiffness: 290, mass: 0.75 },
} as const;

// Pulse score thresholds and their visual mappings
export const PulseThresholds = {
  thriving: { min: 70, color: '#58CC02', label: 'Thriving', emoji: '🌟' },
  growing: { min: 50, color: '#F59E0B', label: 'Growing', emoji: '💚' },
  building: { min: 30, color: '#FF9800', label: 'Building', emoji: '🌱' },
  needsLove: { min: 0, color: '#EF4444', label: 'Needs Love', emoji: '💛' },
} as const;


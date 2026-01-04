export const COLORS = {
  EMERALD: '#10B981',
  GOLD: '#F59E0B',
  BLUSH_PINK: '#FDA4AF',
  CREAM: '#FFF7ED',
  SAGE_GREEN: '#D1FAE5',
  CORAL: '#FB923C',
  DEEP_TEAL: '#0F766E',
  WARM_GRAY: '#78716C',
  // Soft blush pink theme
  PINK_BG: '#FFF0F5',
  PINK_LIGHT: '#FFE4EC',
  PINK_MEDIUM: '#FFB6C1',
  PINK_ACCENT: '#FF69B4',
} as const;

export type ColorKey = keyof typeof COLORS;
export type ColorValue = (typeof COLORS)[ColorKey];

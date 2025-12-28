export const COLORS = {
  EMERALD: '#10B981',
  GOLD: '#F59E0B',
  BLUSH_PINK: '#FDA4AF',
  CREAM: '#FFF7ED',
  SAGE_GREEN: '#D1FAE5',
  CORAL: '#FB923C',
  DEEP_TEAL: '#0F766E',
  WARM_GRAY: '#78716C',
} as const;

export type ColorKey = keyof typeof COLORS;
export type ColorValue = (typeof COLORS)[ColorKey];

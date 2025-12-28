export const STRINGS = {
  APP_NAME: 'Noor',
  GREETING_MORNING: 'Good morning',
  GREETING_AFTERNOON: 'Good afternoon',
  GREETING_EVENING: 'Good evening',
  // More strings will be added per feature
} as const;

export type StringKey = keyof typeof STRINGS;

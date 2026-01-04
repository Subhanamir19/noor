import type { ImageSourcePropType } from 'react-native';

import type { DailyTask } from '@/types/models';

export type DailyTaskThemeId =
  | 'dua_spiritual'
  | 'love_bonding'
  | 'prayer_wudu'
  | 'manners_adab'
  | 'food_sunnah'
  | 'hygiene_care'
  | 'learning_islam'
  | 'gratitude_kindness'
  | 'identity_aqeedah';

export interface DailyTaskTheme {
  id: DailyTaskThemeId;
  label: string;
  themeColor: string;
  image: ImageSourcePropType;
}

export const DAILY_TASK_THEMES: Record<DailyTaskThemeId, DailyTaskTheme> = {
  dua_spiritual: {
    id: 'dua_spiritual',
    label: 'Dua & Spiritual Connection',
    themeColor: '#CFF3E1',
    image: require('../../assets/ONBOARDING-ASSETS/daily-tasks/Dua & Spiritual Connection.png'),
  },
  love_bonding: {
    id: 'love_bonding',
    label: 'Love, Bonding & Emotional Safety',
    themeColor: '#FFB26B',
    image: require('../../assets/ONBOARDING-ASSETS/daily-tasks/Love, Bonding & Emotional Safety.png'),
  },
  prayer_wudu: {
    id: 'prayer_wudu',
    label: 'Prayer, Salah & Wudu',
    themeColor: '#6F5BB7',
    image: require('../../assets/ONBOARDING-ASSETS/daily-tasks/Prayer, Salah & Wudu Routine.png'),
  },
  manners_adab: {
    id: 'manners_adab',
    label: 'Manners, Adab & Speech',
    themeColor: '#EBDDB6',
    image: require('../../assets/ONBOARDING-ASSETS/daily-tasks/Manners, Adab & Speech.png'),
  },
  food_sunnah: {
    id: 'food_sunnah',
    label: 'Food, Halal & Eating Etiquette',
    themeColor: '#7FB65D',
    image: require('../../assets/ONBOARDING-ASSETS/daily-tasks/Food, Halal & Eating Etiquette.png'),
  },
  hygiene_care: {
    id: 'hygiene_care',
    label: 'Hygiene & Daily Care',
    themeColor: '#1FA3D7',
    image: require('../../assets/ONBOARDING-ASSETS/daily-tasks/Hygiene & Daily Care.png'),
  },
  learning_islam: {
    id: 'learning_islam',
    label: 'Learning Islam & Stories',
    themeColor: '#FFD98A',
    image: require('../../assets/ONBOARDING-ASSETS/daily-tasks/Learning Islam & Stories.png'),
  },
  gratitude_kindness: {
    id: 'gratitude_kindness',
    label: 'Gratitude, Ihsan & Kindness',
    themeColor: '#E79BB8',
    image: require('../../assets/ONBOARDING-ASSETS/daily-tasks/Gratitude, Ihsan & Kindness.png'),
  },
  identity_aqeedah: {
    id: 'identity_aqeedah',
    label: 'Identity, Aqeedah & Big Concepts',
    themeColor: '#F6C1D1',
    image: require('../../assets/ONBOARDING-ASSETS/daily-tasks/Identity, Aqeedah & Big Concepts.png'),
  },
};

function hasAnyTag(task: DailyTask, tags: readonly string[]): boolean {
  if (!task.tags?.length) return false;
  const taskTags = new Set(task.tags.map((t) => t.toLowerCase()));
  return tags.some((t) => taskTags.has(t));
}

export function getDailyTaskTheme(task: DailyTask): DailyTaskTheme {
  // Highest-signal mappings first (deterministic and non-random).
  if (
    task.category === 'morning_ibadah' ||
    task.category === 'dhuhr_routine' ||
    task.category === 'asr_routine' ||
    task.category === 'maghrib_routine' ||
    task.category === 'isha_routine' ||
    hasAnyTag(task, ['prayer', 'salah', 'wudu', 'adhan'])
  ) {
    return DAILY_TASK_THEMES.prayer_wudu;
  }

  if (hasAnyTag(task, ['eating', 'food', 'halal', 'table', 'cooking'])) {
    return DAILY_TASK_THEMES.food_sunnah;
  }

  if (hasAnyTag(task, ['hygiene', 'bathroom', 'cleaning', 'clothing', 'modesty', 'hayaa', 'health'])) {
    return DAILY_TASK_THEMES.hygiene_care;
  }

  if (hasAnyTag(task, ['love', 'connection', 'presence', 'communication', 'family', 'emotions'])) {
    return DAILY_TASK_THEMES.love_bonding;
  }

  if (hasAnyTag(task, ['greeting', 'salam', 'adab', 'manners', 'respect', 'speech'])) {
    return DAILY_TASK_THEMES.manners_adab;
  }

  if (task.category === 'quran_time' || hasAnyTag(task, ['quran', 'stories', 'prophets', 'seerah', 'arabic', 'names_of_allah', 'memorization', 'learning'])) {
    return DAILY_TASK_THEMES.learning_islam;
  }

  if (hasAnyTag(task, ['aqeedah', 'belief', 'foundations', 'hereafter', 'akhirah'])) {
    return DAILY_TASK_THEMES.identity_aqeedah;
  }

  if (hasAnyTag(task, ['gratitude', 'kindness', 'sadaqah', 'charity', 'nature', 'outside', 'creation', 'empathy'])) {
    return DAILY_TASK_THEMES.gratitude_kindness;
  }

  if (hasAnyTag(task, ['dua', 'spiritual', 'adhkar'])) {
    return DAILY_TASK_THEMES.dua_spiritual;
  }

  // Safe default: spiritual (fits the product).
  return DAILY_TASK_THEMES.dua_spiritual;
}

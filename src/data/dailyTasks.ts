/**
 * Daily Tasks for TodayScreen
 *
 * Task Types:
 * - PRIMARY: Foundation-building activities with lasting impact
 * - QUICK_WIN: Under 2 minutes, compound over time
 *
 * Display Types:
 * - DAY_TASK: Core daily tasks (37 tasks) - spiritual teaching, prayer, manners
 * - NICE_TO_HAVE: Bonus tasks (18 tasks) - stories, activities, habits
 */

import type { DailyTask, DailyTaskCategory, DailyTaskType, DailyTaskDisplayType } from '@/types/models';

// Categories that are learning-focused (Day Tasks)
const LEARNING_CATEGORIES: DailyTaskCategory[] = [
  'spiritual_teaching',
  'active_learning',
  'quran_time',
  'character_building',
];

// Helper to determine display type based on category
function getDisplayType(category: DailyTaskCategory): DailyTaskDisplayType {
  return LEARNING_CATEGORIES.includes(category) ? 'day_task' : 'nice_to_have';
}

// Task icons mapping
const TASK_ICONS: Record<string, string> = {
  dua: '🤲',
  prayer: '🕌',
  quran: '📖',
  morning: '🌅',
  sunnah: '☀️',
  greeting: '👋',
  salam: '✋',
  connection: '💕',
  love: '❤️',
  hug: '🤗',
  communication: '💬',
  presence: '👁️',
  encouragement: '⭐',
  positive: '✨',
  adhkar: '📿',
  routine: '🔄',
  teaching: '📚',
  eating: '🍽️',
  food: '🥗',
  gratitude: '🙏',
  wudu: '💧',
  modesty: '👗',
  chores: '🧹',
  responsibility: '✅',
  manners: '🎩',
  adab: '🌸',
  hygiene: '🧼',
  stories: '📕',
  prophets: '🌟',
  hadith: '📜',
  aqeedah: '💡',
  memorization: '🧠',
  names_of_allah: '✨',
  empathy: '💝',
  sharing: '🤝',
  character: '🌱',
  patience: '⏳',
  sabr: '🌿',
  kindness: '🌻',
  gentleness: '🕊️',
  halal: '✓',
  seerah: '📜',
  reading: '📖',
  table: '🍴',
  bismillah: 'بسم',
  alhamdulillah: 'الحمد',
  istighfar: '🤲',
  mashallah: '✨',
  speech: '💬',
  hereafter: '🌙',
  salah: '🕌',
  pillars: '🕋',
  shahadah: '☝️',
  bathroom: '🚿',
  clothing: '👔',
  sadaqah: '💰',
  nasheeds: '🎵',
  outside: '🏃',
  teeth: '🦷',
  handwashing: '🧴',
  cleaning: '🧽',
  dressing: '👚',
  timer: '⏱️',
  video: '📺',
  baking: '🧁',
  ayatul_kursi: '📖',
};

// Helper to get icon from tags
function getIconFromTags(tags: string[]): string {
  for (const tag of tags) {
    if (TASK_ICONS[tag]) return TASK_ICONS[tag];
  }
  return '✨';
}

// ============================================================================
// CORE DAILY TASKS (37 tasks) - display_type: 'day_task'
// ============================================================================

const CORE_TASKS: DailyTask[] = [
  // MORNING & CONNECTION
  {
    id: 'task_1',
    number: 1,
    title: 'Dua for each child',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Make a personal dua for each child by name, asking Allah to bless and guide them.',
    age_appropriate: 'all',
    tags: ['dua', 'love', 'morning'],
    icon: '🤲',
  },
  {
    id: 'task_2',
    number: 2,
    title: 'Morning salam greeting',
    category: 'morning_routine',
    task_type: 'quick_win',
    display_type: 'day_task',
    description: 'Greet each child with a warm "Assalamu Alaikum" when they wake up.',
    age_appropriate: 'all',
    tags: ['salam', 'greeting', 'morning'],
    icon: '✋',
  },
  {
    id: 'task_3',
    number: 3,
    title: 'Teach saying salam',
    category: 'character_building',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Practice saying salam properly and explain its meaning as a prayer for peace.',
    age_appropriate: 'all',
    tags: ['salam', 'teaching', 'adab'],
    icon: '👋',
  },
  {
    id: 'task_4',
    number: 4,
    title: 'Morning hug each child',
    category: 'morning_routine',
    task_type: 'quick_win',
    display_type: 'day_task',
    description: 'Give each child a warm hug to start their day with love and security.',
    age_appropriate: 'all',
    tags: ['hug', 'love', 'morning', 'connection'],
    icon: '🤗',
  },
  {
    id: 'task_5',
    number: 5,
    title: 'Random hugs daily',
    category: 'character_building',
    task_type: 'quick_win',
    display_type: 'day_task',
    description: 'Give spontaneous hugs throughout the day to show love and affection.',
    age_appropriate: 'all',
    tags: ['hug', 'love', 'connection'],
    icon: '🤗',
  },
  {
    id: 'task_6',
    number: 6,
    title: 'Say love for Allah',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Express your love for Allah out loud and encourage children to do the same.',
    age_appropriate: 'all',
    tags: ['love', 'aqeedah', 'teaching'],
    icon: '❤️',
  },
  {
    id: 'task_7',
    number: 7,
    title: 'Ten minutes full attention',
    category: 'character_building',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Give each child 10 minutes of undivided attention - no phone, just them.',
    age_appropriate: 'all',
    tags: ['presence', 'love', 'connection'],
    icon: '👁️',
  },

  // HADITH & PROPHETIC TEACHINGS
  {
    id: 'task_8',
    number: 8,
    title: 'Share one simple hadith',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Share one short hadith with your child and briefly explain its meaning.',
    age_appropriate: 'all',
    tags: ['hadith', 'teaching', 'sunnah'],
    icon: '📜',
  },
  {
    id: 'task_9',
    number: 9,
    title: 'Talk Prophet\'s character',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Discuss one beautiful trait of Prophet Muhammad (SAW) like kindness or honesty.',
    age_appropriate: 'all',
    tags: ['seerah', 'prophets', 'character'],
    icon: '🌟',
  },
  {
    id: 'task_10',
    number: 10,
    title: 'Teach Prophet\'s quality',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Help your child practice one quality of the Prophet (SAW) today.',
    age_appropriate: 'all',
    tags: ['seerah', 'prophets', 'teaching'],
    icon: '⭐',
  },
  {
    id: 'task_11',
    number: 11,
    title: 'Correct with hadith',
    category: 'character_building',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'When correcting behavior, reference a hadith or Prophetic example gently.',
    age_appropriate: 'toddler',
    tags: ['hadith', 'teaching', 'adab'],
    icon: '📜',
  },

  // POSITIVE REINFORCEMENT & ADHKAR
  {
    id: 'task_12',
    number: 12,
    title: 'Praise good behavior',
    category: 'character_building',
    task_type: 'quick_win',
    display_type: 'day_task',
    description: 'Catch your child doing something good and praise them specifically for it.',
    age_appropriate: 'all',
    tags: ['encouragement', 'positive', 'love'],
    icon: '⭐',
  },
  {
    id: 'task_13',
    number: 13,
    title: 'Say istighfar openly',
    category: 'spiritual_teaching',
    task_type: 'quick_win',
    display_type: 'day_task',
    description: 'Say "Astaghfirullah" openly when you make a mistake, modeling humility.',
    age_appropriate: 'all',
    tags: ['istighfar', 'adhkar', 'teaching'],
    icon: '🤲',
  },
  {
    id: 'task_14',
    number: 14,
    title: 'Say MashAllah often',
    category: 'spiritual_teaching',
    task_type: 'quick_win',
    display_type: 'day_task',
    description: 'Say "MashAllah" when seeing something good, teaching gratitude to Allah.',
    age_appropriate: 'all',
    tags: ['mashallah', 'adhkar', 'gratitude'],
    icon: '✨',
  },
  {
    id: 'task_15',
    number: 15,
    title: 'Say Alhamdulillah often',
    category: 'spiritual_teaching',
    task_type: 'quick_win',
    display_type: 'day_task',
    description: 'Model saying "Alhamdulillah" throughout the day for blessings big and small.',
    age_appropriate: 'all',
    tags: ['alhamdulillah', 'adhkar', 'gratitude'],
    icon: '🙏',
  },
  {
    id: 'task_16',
    number: 16,
    title: 'Thank Allah together',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Take a moment together to thank Allah for specific blessings today.',
    age_appropriate: 'all',
    tags: ['gratitude', 'dua', 'teaching'],
    icon: '🙏',
  },

  // EATING & FOOD ETIQUETTE
  {
    id: 'task_17',
    number: 17,
    title: 'Dua before meals',
    category: 'practical_life',
    task_type: 'quick_win',
    display_type: 'day_task',
    description: 'Make dua before eating together as a family.',
    age_appropriate: 'all',
    tags: ['dua', 'eating', 'sunnah'],
    icon: '🤲',
  },
  {
    id: 'task_18',
    number: 18,
    title: 'Say Bismillah before eating',
    category: 'practical_life',
    task_type: 'quick_win',
    display_type: 'day_task',
    description: 'Remind children to say Bismillah before starting their meal.',
    age_appropriate: 'all',
    tags: ['bismillah', 'eating', 'sunnah'],
    icon: 'بسم',
  },
  {
    id: 'task_19',
    number: 19,
    title: 'Bismillah before actions',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Teach saying Bismillah before starting any activity, not just eating.',
    age_appropriate: 'all',
    tags: ['bismillah', 'teaching', 'sunnah'],
    icon: 'بسم',
  },
  {
    id: 'task_20',
    number: 20,
    title: 'Thank Allah after meals',
    category: 'practical_life',
    task_type: 'quick_win',
    display_type: 'day_task',
    description: 'Say Alhamdulillah together after finishing meals.',
    age_appropriate: 'all',
    tags: ['alhamdulillah', 'eating', 'gratitude'],
    icon: '🙏',
  },
  {
    id: 'task_21',
    number: 21,
    title: 'Teach no food waste',
    category: 'character_building',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Explain the importance of not wasting food as a blessing from Allah.',
    age_appropriate: 'all',
    tags: ['food', 'teaching', 'gratitude'],
    icon: '🥗',
  },
  {
    id: 'task_22',
    number: 22,
    title: 'Right hand, no complaints',
    category: 'character_building',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Encourage eating with the right hand and not complaining about food.',
    age_appropriate: 'all',
    tags: ['eating', 'sunnah', 'adab'],
    icon: '🍽️',
  },
  {
    id: 'task_23',
    number: 23,
    title: 'Eat slowly, politely',
    category: 'character_building',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Model and teach eating slowly and with good table manners.',
    age_appropriate: 'all',
    tags: ['eating', 'manners', 'adab'],
    icon: '🍴',
  },

  // MODESTY & HALAL
  {
    id: 'task_24',
    number: 24,
    title: 'Check modest clothing',
    category: 'practical_life',
    task_type: 'quick_win',
    display_type: 'day_task',
    description: 'Ensure children are dressed modestly and appropriately.',
    age_appropriate: 'all',
    tags: ['modesty', 'clothing', 'teaching'],
    icon: '👗',
  },
  {
    id: 'task_25',
    number: 25,
    title: 'Teach halal and haram',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Explain the concept of halal and haram in an age-appropriate way.',
    age_appropriate: 'toddler',
    tags: ['halal', 'teaching', 'aqeedah'],
    icon: '✓',
  },

  // PRAYER & SALAH
  {
    id: 'task_26',
    number: 26,
    title: 'Announce prayer times',
    category: 'spiritual_teaching',
    task_type: 'quick_win',
    display_type: 'day_task',
    description: 'Announce when it\'s time for prayer so children become aware of salah times.',
    age_appropriate: 'all',
    tags: ['salah', 'prayer', 'routine'],
    icon: '🕌',
  },
  {
    id: 'task_27',
    number: 27,
    title: 'Remind Dhuhr early',
    category: 'spiritual_teaching',
    task_type: 'quick_win',
    display_type: 'day_task',
    description: 'Give an early reminder for Dhuhr prayer to build awareness.',
    age_appropriate: 'all',
    tags: ['salah', 'prayer', 'teaching'],
    icon: '🕌',
  },
  {
    id: 'task_28',
    number: 28,
    title: 'Salah is meeting Allah',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Explain that salah is our special meeting time with Allah.',
    age_appropriate: 'all',
    tags: ['salah', 'teaching', 'aqeedah'],
    icon: '🕌',
  },
  {
    id: 'task_29',
    number: 29,
    title: 'Show wudu steps',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Demonstrate the steps of wudu clearly for your child.',
    age_appropriate: 'all',
    tags: ['wudu', 'teaching', 'salah'],
    icon: '💧',
  },
  {
    id: 'task_30',
    number: 30,
    title: 'Make wudu together',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Make wudu alongside your child, guiding them through each step.',
    age_appropriate: 'all',
    tags: ['wudu', 'teaching', 'salah'],
    icon: '💧',
  },
  {
    id: 'task_31',
    number: 31,
    title: 'Bathroom entry dua',
    category: 'practical_life',
    task_type: 'quick_win',
    display_type: 'day_task',
    description: 'Teach and practice the dua for entering the bathroom.',
    age_appropriate: 'all',
    tags: ['dua', 'bathroom', 'sunnah'],
    icon: '🚿',
  },
  {
    id: 'task_32',
    number: 32,
    title: 'Daily basic duas',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Practice essential daily duas like sleeping, waking, and leaving home.',
    age_appropriate: 'all',
    tags: ['dua', 'teaching', 'memorization'],
    icon: '🤲',
  },

  // ISLAMIC FOUNDATIONS
  {
    id: 'task_33',
    number: 33,
    title: 'Explain Shahadah meaning',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Explain the meaning of Shahadah in simple, child-friendly terms.',
    age_appropriate: 'toddler',
    tags: ['shahadah', 'aqeedah', 'teaching'],
    icon: '☝️',
  },
  {
    id: 'task_34',
    number: 34,
    title: 'Teach Five Pillars',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Discuss one of the Five Pillars of Islam and its importance.',
    age_appropriate: 'toddler',
    tags: ['pillars', 'aqeedah', 'teaching'],
    icon: '🕋',
  },
  {
    id: 'task_35',
    number: 35,
    title: 'Teach kind speech rules',
    category: 'character_building',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Explain the Islamic etiquette of speaking kindly and truthfully.',
    age_appropriate: 'all',
    tags: ['speech', 'adab', 'manners'],
    icon: '💬',
  },
  {
    id: 'task_36',
    number: 36,
    title: 'Teach modesty gently',
    category: 'character_building',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Discuss modesty in behavior and dress in an age-appropriate way.',
    age_appropriate: 'all',
    tags: ['modesty', 'teaching', 'character'],
    icon: '🌸',
  },
  {
    id: 'task_37',
    number: 37,
    title: 'Hereafter: hope and rules',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'day_task',
    description: 'Talk about Jannah with hope and explain how good deeds matter.',
    age_appropriate: 'toddler',
    tags: ['hereafter', 'aqeedah', 'teaching'],
    icon: '🌙',
  },
];

// ============================================================================
// NICE-TO-HAVE TASKS (18 tasks) - display_type: 'nice_to_have'
// ============================================================================

const NICE_TO_HAVE_TASKS: DailyTask[] = [
  {
    id: 'task_38',
    number: 38,
    title: 'Read Islamic story',
    category: 'active_learning',
    task_type: 'primary',
    display_type: 'nice_to_have',
    description: 'Read a short Islamic story from a book or tell one from memory.',
    age_appropriate: 'all',
    tags: ['stories', 'reading', 'teaching'],
    icon: '📕',
  },
  {
    id: 'task_39',
    number: 39,
    title: 'Read Sahabi story',
    category: 'active_learning',
    task_type: 'primary',
    display_type: 'nice_to_have',
    description: 'Share a story about one of the Sahaba (companions of the Prophet).',
    age_appropriate: 'all',
    tags: ['stories', 'seerah', 'prophets'],
    icon: '⭐',
  },
  {
    id: 'task_40',
    number: 40,
    title: 'Quran finger reading',
    category: 'quran_time',
    task_type: 'primary',
    display_type: 'nice_to_have',
    description: 'Read Quran together while child follows along with their finger.',
    age_appropriate: 'all',
    tags: ['quran', 'reading', 'teaching'],
    icon: '📖',
  },
  {
    id: 'task_41',
    number: 41,
    title: 'Teach Allah\'s Names',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'nice_to_have',
    description: 'Teach one of Allah\'s 99 Names and its meaning.',
    age_appropriate: 'all',
    tags: ['names_of_allah', 'aqeedah', 'teaching'],
    icon: '✨',
  },
  {
    id: 'task_42',
    number: 42,
    title: 'Make dua for others',
    category: 'spiritual_teaching',
    task_type: 'quick_win',
    display_type: 'nice_to_have',
    description: 'Make dua together for family, friends, or the ummah.',
    age_appropriate: 'all',
    tags: ['dua', 'empathy', 'kindness'],
    icon: '🤲',
  },
  {
    id: 'task_43',
    number: 43,
    title: 'Learn new dua',
    category: 'spiritual_teaching',
    task_type: 'primary',
    display_type: 'nice_to_have',
    description: 'Learn a new dua together and practice it.',
    age_appropriate: 'all',
    tags: ['dua', 'memorization', 'teaching'],
    icon: '🤲',
  },
  {
    id: 'task_44',
    number: 44,
    title: 'Teach Ayat-ul-Kursi',
    category: 'quran_time',
    task_type: 'primary',
    display_type: 'nice_to_have',
    description: 'Recite or practice memorizing Ayat-ul-Kursi together.',
    age_appropriate: 'all',
    tags: ['quran', 'memorization', 'ayatul_kursi'],
    icon: '📖',
  },
  {
    id: 'task_45',
    number: 45,
    title: 'Bake and make dua',
    category: 'active_learning',
    task_type: 'primary',
    display_type: 'nice_to_have',
    description: 'Bake or cook something together while making dua and saying Bismillah.',
    age_appropriate: 'all',
    tags: ['baking', 'dua', 'bismillah'],
    icon: '🧁',
  },
  {
    id: 'task_46',
    number: 46,
    title: 'Family kindness act',
    category: 'character_building',
    task_type: 'primary',
    display_type: 'nice_to_have',
    description: 'Do one act of kindness together as a family.',
    age_appropriate: 'all',
    tags: ['kindness', 'empathy', 'character'],
    icon: '🌻',
  },
  {
    id: 'task_47',
    number: 47,
    title: 'Give sadaqah together',
    category: 'character_building',
    task_type: 'primary',
    display_type: 'nice_to_have',
    description: 'Give sadaqah (charity) together, even if it\'s small.',
    age_appropriate: 'all',
    tags: ['sadaqah', 'kindness', 'teaching'],
    icon: '💰',
  },
  {
    id: 'task_48',
    number: 48,
    title: 'Watch Islamic video',
    category: 'active_learning',
    task_type: 'quick_win',
    display_type: 'nice_to_have',
    description: 'Watch a short Islamic educational video together.',
    age_appropriate: 'all',
    tags: ['video', 'teaching', 'stories'],
    icon: '📺',
  },
  {
    id: 'task_49',
    number: 49,
    title: 'Play soft nasheeds',
    category: 'active_learning',
    task_type: 'quick_win',
    display_type: 'nice_to_have',
    description: 'Play nasheeds in the background during activities.',
    age_appropriate: 'all',
    tags: ['nasheeds', 'teaching'],
    icon: '🎵',
  },
  {
    id: 'task_50',
    number: 50,
    title: 'Go outside daily',
    category: 'practical_life',
    task_type: 'primary',
    display_type: 'nice_to_have',
    description: 'Spend time outside appreciating Allah\'s creation.',
    age_appropriate: 'all',
    tags: ['outside', 'gratitude'],
    icon: '🏃',
  },
  {
    id: 'task_51',
    number: 51,
    title: 'Brush teeth together',
    category: 'practical_life',
    task_type: 'quick_win',
    display_type: 'nice_to_have',
    description: 'Brush teeth together following the Sunnah of cleanliness.',
    age_appropriate: 'all',
    tags: ['teeth', 'hygiene', 'sunnah'],
    icon: '🦷',
  },
  {
    id: 'task_52',
    number: 52,
    title: 'Teach hand washing',
    category: 'practical_life',
    task_type: 'quick_win',
    display_type: 'nice_to_have',
    description: 'Practice proper hand washing as part of Islamic cleanliness.',
    age_appropriate: 'all',
    tags: ['handwashing', 'hygiene', 'teaching'],
    icon: '🧴',
  },
  {
    id: 'task_53',
    number: 53,
    title: 'Clean up together',
    category: 'practical_life',
    task_type: 'primary',
    display_type: 'nice_to_have',
    description: 'Clean up toys or space together, teaching responsibility.',
    age_appropriate: 'all',
    tags: ['cleaning', 'responsibility', 'chores'],
    icon: '🧽',
  },
  {
    id: 'task_54',
    number: 54,
    title: 'Dress by themselves',
    category: 'practical_life',
    task_type: 'primary',
    display_type: 'nice_to_have',
    description: 'Encourage children to dress themselves with minimal help.',
    age_appropriate: 'toddler',
    tags: ['dressing', 'responsibility'],
    icon: '👚',
  },
  {
    id: 'task_55',
    number: 55,
    title: 'Practice patience timer',
    category: 'character_building',
    task_type: 'primary',
    display_type: 'nice_to_have',
    description: 'Use a timer to practice waiting patiently for something.',
    age_appropriate: 'toddler',
    tags: ['patience', 'sabr', 'timer'],
    icon: '⏱️',
  },
];

// ============================================================================
// COMBINED TASK LIBRARY
// ============================================================================

export const ALL_DAILY_TASKS: DailyTask[] = [...CORE_TASKS, ...NICE_TO_HAVE_TASKS];

/**
 * Get a task by its ID
 */
export function getTaskById(taskId: string): DailyTask | undefined {
  return ALL_DAILY_TASKS.find((task) => task.id === taskId);
}

/**
 * Get tasks by category
 */
export function getTasksByCategory(category: DailyTaskCategory): DailyTask[] {
  return ALL_DAILY_TASKS.filter((task) => task.category === category);
}

/**
 * Get tasks by type
 */
export function getTasksByType(taskType: DailyTaskType): DailyTask[] {
  return ALL_DAILY_TASKS.filter((task) => task.task_type === taskType);
}

/**
 * Get tasks appropriate for child's age
 */
export function getTasksForAge(age: 'baby' | 'toddler' | 'child' | 'all'): DailyTask[] {
  return ALL_DAILY_TASKS.filter(
    (task) => task.age_appropriate === age || task.age_appropriate === 'all'
  );
}

/**
 * Get tasks by display type (day_task or nice_to_have)
 */
export function getTasksByDisplayType(displayType: DailyTaskDisplayType): DailyTask[] {
  return ALL_DAILY_TASKS.filter((task) => task.display_type === displayType);
}

/**
 * Get Day Tasks (core daily tasks)
 */
export function getDayTasks(): DailyTask[] {
  return getTasksByDisplayType('day_task');
}

/**
 * Get Nice to Have tasks (bonus tasks)
 */
export function getNiceToHaveTasks(): DailyTask[] {
  return getTasksByDisplayType('nice_to_have');
}

// ============================================================================
// TASK SELECTION ALGORITHM
// ============================================================================

export interface NewDailyTaskSelection {
  dayTasks: DailyTask[]; // Core daily tasks
  niceToHaveTasks: DailyTask[]; // Bonus tasks
}

/**
 * Selects tasks for today
 * - Day Tasks: 3 core tasks (default)
 * - Nice to Have: 2 bonus tasks (default)
 */
export function selectTasksForToday(
  childAge: 'baby' | 'toddler' | 'child' | 'all',
  dayTaskCount: number = 3,
  niceToHaveCount: number = 2,
  completedTaskIds: string[] = [],
  seedKey?: string
): NewDailyTaskSelection {
  // Filter by age
  const ageAppropriate = ALL_DAILY_TASKS.filter(
    (task) => task.age_appropriate === childAge || task.age_appropriate === 'all'
  );

  // Separate by display type
  const dayTaskPool = ageAppropriate.filter((t) => t.display_type === 'day_task');
  const niceToHavePool = ageAppropriate.filter((t) => t.display_type === 'nice_to_have');

  // Prioritize fresh tasks
  const sortByFreshness = (tasks: DailyTask[], poolKey: string) => {
    const fresh = tasks.filter((t) => !completedTaskIds.includes(t.id));
    const completed = tasks.filter((t) => completedTaskIds.includes(t.id));
    if (seedKey) {
      return [
        ...shuffleArrayDeterministic(fresh, `${seedKey}|${poolKey}|fresh`),
        ...shuffleArrayDeterministic(completed, `${seedKey}|${poolKey}|completed`),
      ];
    }
    return [...shuffleArray(fresh), ...shuffleArray(completed)];
  };

  const sortedDayTasks = sortByFreshness(dayTaskPool, 'day_tasks');
  const sortedNiceToHave = sortByFreshness(niceToHavePool, 'nice_to_have');

  return {
    dayTasks: sortedDayTasks.slice(0, dayTaskCount),
    niceToHaveTasks: sortedNiceToHave.slice(0, niceToHaveCount),
  };
}

/**
 * Deterministic shuffle using a seed key (stable across app restarts/devices).
 * Keeps selection reproducible for a given seedKey.
 */
function shuffleArrayDeterministic<T>(array: T[], seedKey: string): T[] {
  const shuffled = [...array];
  let seed = fnv1a32(seedKey);
  const rand = mulberry32(seed);
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function fnv1a32(input: string): number {
  // 32-bit FNV-1a hash
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    // Multiply by FNV prime with uint32 overflow.
    hash = (hash + ((hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24))) >>> 0;
  }
  return hash >>> 0;
}

function mulberry32(seed: number): () => number {
  let t = seed >>> 0;
  return () => {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// ============================================================================
// LEGACY TASK SELECTION ALGORITHM (kept for backwards compatibility)
// ============================================================================

export interface DailyTaskSelection {
  primaryTask: DailyTask;
  quickWinTask: DailyTask;
  bonusTask: DailyTask;
  optionalTasks: DailyTask[];
}

/**
 * Shuffle array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Legacy task selection (kept for backwards compatibility)
 */
export function selectDailyTasks(
  childAge: 'baby' | 'toddler' | 'child' | 'all',
  preferredTaskCount: number = 3,
  completedTaskIds: string[] = []
): DailyTaskSelection {
  const ageAppropriateTasks = ALL_DAILY_TASKS.filter(
    (task) => task.age_appropriate === childAge || task.age_appropriate === 'all'
  );

  const primaryTasks = ageAppropriateTasks.filter((t) => t.task_type === 'primary');
  const quickWinTasks = ageAppropriateTasks.filter((t) => t.task_type === 'quick_win');

  const sortByFreshness = (tasks: DailyTask[]) => {
    const fresh = tasks.filter((t) => !completedTaskIds.includes(t.id));
    const completed = tasks.filter((t) => completedTaskIds.includes(t.id));
    return [...shuffleArray(fresh), ...shuffleArray(completed)];
  };

  const sortedPrimary = sortByFreshness(primaryTasks);
  const sortedQuickWins = sortByFreshness(quickWinTasks);

  const primaryTask = sortedPrimary[0] || ageAppropriateTasks[0];
  const quickWinTask = sortedQuickWins[0] || ageAppropriateTasks[1];
  const bonusTask =
    sortedPrimary.find((t) => t.id !== primaryTask.id) || sortedPrimary[1] || ageAppropriateTasks[2];

  const optionalTasks: DailyTask[] = [];
  const selectedIds = [primaryTask.id, quickWinTask.id, bonusTask.id];

  if (preferredTaskCount > 3) {
    const remainingQuickWins = sortedQuickWins.filter((t) => !selectedIds.includes(t.id));
    const additionalCount = preferredTaskCount - 3;

    for (let i = 0; i < additionalCount && i < remainingQuickWins.length; i++) {
      optionalTasks.push(remainingQuickWins[i]);
    }
  }

  return {
    primaryTask,
    quickWinTask,
    bonusTask,
    optionalTasks,
  };
}

/**
 * Calculates recommended task count based on recent feedback
 */
export function calculateRecommendedTaskCount(
  recentFeedback: Array<{ rating: 'too_easy' | 'just_right' | 'too_hard'; tasksCompleted: number }>
): number {
  if (recentFeedback.length === 0) return 3;

  const lastWeek = recentFeedback.slice(0, 7);
  const tooEasyCount = lastWeek.filter((f) => f.rating === 'too_easy').length;
  const tooHardCount = lastWeek.filter((f) => f.rating === 'too_hard').length;

  const avgCompleted =
    lastWeek.reduce((sum, f) => sum + f.tasksCompleted, 0) / lastWeek.length;

  if (tooEasyCount >= 3 && avgCompleted >= 3) {
    return 5;
  } else if (tooHardCount >= 3 || avgCompleted < 2) {
    return 3;
  } else if (tooEasyCount >= 2) {
    return 4;
  }

  return 3;
}

// ============================================================================
// STATISTICS
// ============================================================================

export const TASK_STATS = {
  total: ALL_DAILY_TASKS.length,
  primary: ALL_DAILY_TASKS.filter((t) => t.task_type === 'primary').length,
  quickWin: ALL_DAILY_TASKS.filter((t) => t.task_type === 'quick_win').length,
  dayTasks: ALL_DAILY_TASKS.filter((t) => t.display_type === 'day_task').length,
  niceToHave: ALL_DAILY_TASKS.filter((t) => t.display_type === 'nice_to_have').length,
  byAge: {
    baby: ALL_DAILY_TASKS.filter((t) => t.age_appropriate === 'baby').length,
    toddler: ALL_DAILY_TASKS.filter((t) => t.age_appropriate === 'toddler').length,
    child: ALL_DAILY_TASKS.filter((t) => t.age_appropriate === 'child').length,
    all: ALL_DAILY_TASKS.filter((t) => t.age_appropriate === 'all').length,
  },
};

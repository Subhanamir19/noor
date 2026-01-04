/**
 * Daily Tasks for TodayScreen (Phase 9)
 *
 * Task Types:
 * - PRIMARY (🎯): Foundation-building activities with lasting impact
 * - QUICK_WIN (⚡): Under 2 minutes, compound over time
 *
 * Display Types:
 * - DAY_TASK: Learning-focused tasks (spiritual teaching, Quran, active learning)
 * - NICE_TO_HAVE: Habit/routine tasks (morning habits, practical life, routines)
 *
 * Filtered to exclude:
 * - Arts & crafts requiring supplies
 * - Eid/Ramadan specific tasks
 * - Milestone celebrations
 * - Tasks requiring extraordinary effort
 * - "Using Noor app" tasks
 * - Community events requiring attendance
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
  connection: '💕',
  love: '❤️',
  communication: '💬',
  presence: '👁️',
  encouragement: '⭐',
  positive: '✨',
  adhkar: '📿',
  routine: '🔄',
  teaching: '📚',
  breakfast: '🍳',
  eating: '🍽️',
  gratitude: '🙏',
  wudu: '💧',
  modesty: '👗',
  chores: '🧹',
  responsibility: '✅',
  life_skills: '🔧',
  cooking: '👨‍🍳',
  confidence: '💪',
  manners: '🎩',
  adab: '🌸',
  hygiene: '🧼',
  stories: '📕',
  prophets: '🌟',
  arabic: '🔤',
  vocabulary: '📝',
  aqeedah: '💡',
  memorization: '🧠',
  names_of_allah: '✨',
  empathy: '💝',
  sharing: '🤝',
  play: '🎮',
  character: '🌱',
  emotions: '😊',
  patience: '⏳',
  sabr: '🌿',
  kindness: '🌻',
  gentleness: '🕊️',
  writing: '✏️',
  counting: '🔢',
  body: '🫀',
  bathroom: '🚿',
  halal: '✓',
  food: '🥗',
  seerah: '📜',
  reading: '📖',
  laundry: '👕',
  table: '🍴',
  independence: '🦋',
  dressing: '👚',
  health: '💊',
  organization: '📦',
  cleaning: '🧽',
  nature: '🌳',
  creation: '🌍',
  care: '🌱',
  shoes: '👟',
  nap: '😴',
  rest: '🛏️',
  peaceful: '☮️',
  quiet: '🤫',
  outside: '🏃',
  games: '🎯',
  fun: '🎉',
  boundaries: '🚧',
  helping: '🙌',
  wonder: '🤩',
  math: '➕',
  tafsir: '📜',
  understanding: '💭',
  review: '🔁',
  habit: '📅',
  listening: '👂',
  beauty: '🎵',
  priority: '🥇',
  family: '👨‍👩‍👧',
  protection: '🛡️',
  adhan: '📢',
  awareness: '👀',
  teamwork: '👥',
  dinner: '🍲',
  bonding: '🫂',
  lunch: '🥪',
  bismillah: 'بسم',
  alhamdulillah: 'الحمد',
  isha: '🌙',
  calm: '😌',
  bedtime: '🌜',
  reflection: '💭',
  sleep: '😴',
  personal: '🎁',
  blessing: '🙌',
  salaam: '✋',
  peace: '☮️',
  friday: '🕋',
  jumuah: '📿',
  cleanliness: '✨',
  ghusl: '🚿',
  kahf: '⛰️',
  sadaqah: '💰',
  generosity: '🎁',
  clothes: '👔',
  honor: '👑',
  salawat: '💫',
  prophet: '⭐',
  ummah: '🌐',
  celebration: '🎊',
  fasting: '🌙',
  blessed: '✨',
  motivation: '🚀',
  special: '💎',
  neighbors: '🏠',
  calendar: '📆',
  islamic_month: '🗓️',
  significance: '📌',
  environment: '🏡',
  weekly: '📅',
  focus: '🎯',
  simple: '👶',
  example: '📖',
  roleplay: '🎭',
  sahaba: '⭐',
  growth: '📈',
  respect: '🙇',
  parents: '👨‍👩‍👧',
  speech: '💬',
  gentle: '🕊️',
  permission: '🚪',
  right_hand: '🤚',
  others: '👫',
  tracking: '👆',
  repeating: '🔁',
  tajweed: '🎤',
  short: '📏',
  repetition: '🔄',
  testing: '✍️',
  conflict: '⚖️',
  resolution: '🤝',
  siblings: '👧👦',
  turns: '🔄',
  fairness: '⚖️',
  forgiveness: '💕',
  apology: '🙏',
  joy: '😊',
  obligation: '📜',
  obedience: '👂',
  training: '🏋️',
  thankfulness: '🙏',
  grandparents: '👴👵',
  guest: '🚪',
  hosting: '🏠',
  guests: '👥',
  community: '🌍',
  baby: '👶',
  language: '🗣️',
  basic: '📝',
  daily: '📅',
  steps: '👣',
  positions: '🧘',
  formal: '📚',
  lessons: '📖',
  regular: '⏰',
  practice: '🎯',
  rules: '📜',
  fiqh: '⚖️',
  study: '📖',
  literacy: '📚',
  values: '💎',
  advanced: '🎓',
  five: '5️⃣',
  history: '📜',
  belief: '💭',
  foundations: '🏛️',
  mindset: '🧠',
  resilience: '💪',
  effort: '💪',
  challenge: '🏆',
  problem_solving: '🧩',
  thinking: '💭',
  skills: '🔧',
  modeling: '👀',
  persistence: '🎯',
};

// Get best icon for a task based on its tags
function getTaskIcon(tags: string[]): string {
  for (const tag of tags) {
    if (TASK_ICONS[tag]) {
      return TASK_ICONS[tag];
    }
  }
  return '✨'; // Default icon
}

// Helper to create a short title (2-3 words)
function createShortTitle(title: string): string {
  // Remove common prefixes and simplify
  const simplified = title
    .replace(/^(Make |Say |Practice |Teach |Help |Let |Do |Discuss |Read |Share |Call out |Announce |Assign |Check |Guide |Lead |Lay out |Pause |Sing |Tell |Thank |Tuck |Whisper |Explain |Celebrate |Point out |Set |Have |Take |Send |Brush |Hug |Ask |Compliment |Recite |Play |Go |Act out |Pick |Catch |Role-play |Establish |Water |Organize |Let kids |Kids )/i, '')
    .replace(/ together$/i, '')
    .replace(/ with kids$/i, '')
    .replace(/ as family$/i, '')
    .replace(/ for the sake of Allah$/i, '')
    .replace(/ properly$/i, '')
    .replace(/ independently$/i, '')
    .replace(/ promptly$/i, '')
    .replace(/ on time$/i, '');

  // Get first 2-3 meaningful words
  const words = simplified.split(' ').filter(w => w.length > 0);
  if (words.length <= 3) return words.join(' ');
  return words.slice(0, 3).join(' ');
}

// ============================================================================
// MORNING ROUTINE (Before Kids Wake)
// ============================================================================

const MORNING_ROUTINE_TASKS: DailyTask[] = [
  {
    id: 'task_1',
    number: 1,
    title: 'Make dua for your children by name',
    shortTitle: 'Dua for children',
    category: 'morning_routine',
    task_type: 'primary',
    display_type: 'nice_to_have',
    description: '"Ya Allah, make [child\'s name] among the righteous"',
    age_appropriate: 'all',
    tags: ['dua', 'morning', 'spiritual'],
    icon: '🤲',
  },
  {
    id: 'task_2',
    number: 2,
    title: 'Put Quran in visible spot',
    shortTitle: 'Display Quran',
    category: 'morning_routine',
    task_type: 'quick_win',
    display_type: 'nice_to_have',
    description: 'Visual reminder for kids and you',
    age_appropriate: 'all',
    tags: ['quran', 'environment'],
    icon: '📖',
  },
];

// ============================================================================
// MORNING WITH KIDS (After They Wake)
// ============================================================================

const MORNING_GREETING_TASKS: DailyTask[] = [
  {
    id: 'task_3',
    number: 3,
    title: 'Say "Assalamu alaikum" when children wake',
    category: 'morning_habits',
    task_type: 'quick_win',
    description: 'Teach them sunnah greetings',
    age_appropriate: 'all',
    tags: ['sunnah', 'greeting', 'morning'],
  },
  {
    id: 'task_4',
    number: 4,
    title: 'Hug each child individually',
    category: 'morning_habits',
    task_type: 'quick_win',
    description: 'Fill their emotional tank first thing',
    age_appropriate: 'all',
    tags: ['connection', 'love', 'morning'],
  },
  {
    id: 'task_5',
    number: 5,
    title: 'Say morning dua together',
    category: 'morning_ibadah',
    task_type: 'quick_win',
    description: '"Alhamdulillah alladhi ahyana ba\'da ma amatana wa ilayhi an-nushur"',
    age_appropriate: 'all',
    tags: ['dua', 'morning', 'together'],
  },
  {
    id: 'task_6',
    number: 6,
    title: 'Ask about their dreams',
    category: 'morning_habits',
    task_type: 'quick_win',
    description: 'Build that communication habit young',
    age_appropriate: 'toddler',
    tags: ['communication', 'connection'],
  },
  {
    id: 'task_7',
    number: 7,
    title: 'Make eye contact during conversation',
    category: 'morning_habits',
    task_type: 'quick_win',
    description: 'Put the phone DOWN',
    age_appropriate: 'all',
    tags: ['presence', 'connection'],
  },
  {
    id: 'task_8',
    number: 8,
    title: 'Compliment something specific',
    category: 'morning_habits',
    task_type: 'quick_win',
    description: '"I love how you put your shoes away yesterday"',
    age_appropriate: 'toddler',
    tags: ['encouragement', 'positive'],
  },
];

const MORNING_IBADAH_TASKS: DailyTask[] = [
  {
    id: 'task_9',
    number: 9,
    title: 'Lead children in Fajr if they missed it',
    category: 'morning_ibadah',
    task_type: 'primary',
    description: 'Makeup prayers teach responsibility',
    age_appropriate: 'child',
    tags: ['prayer', 'fajr', 'teaching'],
  },
  {
    id: 'task_10',
    number: 10,
    title: 'Recite morning adhkar together',
    category: 'morning_ibadah',
    task_type: 'primary',
    description: 'Even one dua. Make it routine.',
    age_appropriate: 'all',
    tags: ['adhkar', 'morning', 'routine'],
  },
  {
    id: 'task_11',
    number: 11,
    title: 'Play Quran during breakfast',
    category: 'morning_ibadah',
    task_type: 'primary',
    description: 'Normalize Quranic sounds in the home',
    age_appropriate: 'all',
    tags: ['quran', 'environment', 'breakfast'],
  },
  {
    id: 'task_12',
    number: 12,
    title: 'Share one hadith at breakfast table',
    category: 'morning_ibadah',
    task_type: 'primary',
    description: '"Prophet said be kind to animals. Let\'s do that today!"',
    age_appropriate: 'toddler',
    tags: ['hadith', 'teaching', 'breakfast'],
  },
  {
    id: 'task_13',
    number: 13,
    title: 'Make dua before eating together',
    category: 'morning_ibadah',
    task_type: 'quick_win',
    description: '"Bismillah wa \'ala barakatillah"',
    age_appropriate: 'all',
    tags: ['dua', 'eating', 'sunnah'],
  },
  {
    id: 'task_14',
    number: 14,
    title: 'Thank Allah after breakfast',
    category: 'morning_ibadah',
    task_type: 'quick_win',
    description: '"Alhamdulillah alladhi at\'amana wa saqana"',
    age_appropriate: 'all',
    tags: ['dua', 'gratitude', 'eating'],
  },
];

const MORNING_ROUTINE_HABITS_TASKS: DailyTask[] = [
  {
    id: 'task_15',
    number: 15,
    title: 'Help kids make wudu',
    category: 'morning_habits',
    task_type: 'primary',
    description: 'Teach them young, they\'ll do it independently later',
    age_appropriate: 'toddler',
    tags: ['wudu', 'teaching', 'routine'],
  },
  {
    id: 'task_16',
    number: 16,
    title: 'Guide kids through morning dua routine',
    category: 'morning_habits',
    task_type: 'primary',
    description: 'Bathroom dua, dressing dua, leaving house dua',
    age_appropriate: 'toddler',
    tags: ['dua', 'routine', 'teaching'],
  },
  {
    id: 'task_17',
    number: 17,
    title: 'Check that kids are dressed modestly',
    category: 'morning_habits',
    task_type: 'quick_win',
    description: 'Build hayaa from young age',
    age_appropriate: 'toddler',
    tags: ['modesty', 'hayaa', 'clothing'],
  },
  {
    id: 'task_18',
    number: 18,
    title: 'Assign age-appropriate morning chores',
    category: 'morning_habits',
    task_type: 'primary',
    description: '3-year-old can put spoon in sink',
    age_appropriate: 'toddler',
    tags: ['chores', 'responsibility', 'routine'],
  },
  {
    id: 'task_19',
    number: 19,
    title: 'Let kids help prepare breakfast',
    category: 'morning_habits',
    task_type: 'primary',
    description: 'Builds confidence and motor skills',
    age_appropriate: 'toddler',
    tags: ['life_skills', 'cooking', 'confidence'],
  },
  {
    id: 'task_20',
    number: 20,
    title: 'Practice good adab at table',
    category: 'morning_habits',
    task_type: 'primary',
    description: 'Right hand, sitting properly, no complaining',
    age_appropriate: 'toddler',
    tags: ['adab', 'eating', 'manners'],
  },
  {
    id: 'task_21',
    number: 21,
    title: 'Brush teeth together while saying "Alhamdulillah for health"',
    category: 'morning_habits',
    task_type: 'quick_win',
    description: 'Gratitude + hygiene',
    age_appropriate: 'toddler',
    tags: ['hygiene', 'gratitude', 'routine'],
  },
];

// ============================================================================
// MID-MORNING ACTIVITIES (9 AM - 12 PM)
// ============================================================================

const SPIRITUAL_TEACHING_TASKS: DailyTask[] = [
  {
    id: 'task_23',
    number: 23,
    title: 'Read one Islamic story',
    category: 'spiritual_teaching',
    task_type: 'primary',
    description: 'Prophet stories, Sahaba stories, morals',
    age_appropriate: 'toddler',
    tags: ['stories', 'prophets', 'learning'],
  },
  {
    id: 'task_24',
    number: 24,
    title: 'Teach one Arabic word',
    category: 'spiritual_teaching',
    task_type: 'primary',
    description: '"Today\'s word is \'Habibi\' meaning beloved"',
    age_appropriate: 'toddler',
    tags: ['arabic', 'vocabulary', 'learning'],
  },
  {
    id: 'task_25',
    number: 25,
    title: 'Explain "why we pray"',
    category: 'spiritual_teaching',
    task_type: 'primary',
    description: 'Not just HOW, but WHY it matters',
    age_appropriate: 'toddler',
    tags: ['prayer', 'teaching', 'aqeedah'],
  },
  {
    id: 'task_26',
    number: 26,
    title: 'Practice Surah Al-Fatiha pronunciation',
    category: 'spiritual_teaching',
    task_type: 'primary',
    description: 'One line at a time',
    age_appropriate: 'toddler',
    tags: ['quran', 'fatiha', 'memorization'],
  },
  {
    id: 'task_27',
    number: 27,
    title: 'Teach one Beautiful Name of Allah',
    category: 'spiritual_teaching',
    task_type: 'primary',
    description: 'Ar-Rahman (The Most Merciful) and what it means',
    age_appropriate: 'toddler',
    tags: ['names_of_allah', 'teaching', 'aqeedah'],
  },
  {
    id: 'task_29',
    number: 29,
    title: 'Make dua together for someone specific',
    category: 'spiritual_teaching',
    task_type: 'quick_win',
    description: '"Let\'s pray for grandma\'s health"',
    age_appropriate: 'toddler',
    tags: ['dua', 'empathy', 'together'],
  },
];

const CHARACTER_BUILDING_TASKS: DailyTask[] = [
  {
    id: 'task_31',
    number: 31,
    title: 'Practice sharing with siblings',
    category: 'character_building',
    task_type: 'primary',
    description: '"Let\'s take turns with the red crayon"',
    age_appropriate: 'toddler',
    tags: ['sharing', 'siblings', 'character'],
  },
  {
    id: 'task_32',
    number: 32,
    title: 'Role-play saying "please" and "thank you"',
    category: 'character_building',
    task_type: 'primary',
    description: 'Make it a game',
    age_appropriate: 'toddler',
    tags: ['manners', 'adab', 'play'],
  },
  {
    id: 'task_33',
    number: 33,
    title: 'Teach cleaning up after activities',
    category: 'character_building',
    task_type: 'primary',
    description: '"We respect our home and belongings"',
    age_appropriate: 'toddler',
    tags: ['cleaning', 'responsibility', 'respect'],
  },
  {
    id: 'task_34',
    number: 34,
    title: 'Practice apologizing genuinely',
    category: 'character_building',
    task_type: 'primary',
    description: '"I\'m sorry I took your toy. Can you forgive me?"',
    age_appropriate: 'toddler',
    tags: ['apology', 'forgiveness', 'character'],
  },
  {
    id: 'task_35',
    number: 35,
    title: 'Discuss feelings openly',
    category: 'character_building',
    task_type: 'primary',
    description: '"You seem angry. Let\'s talk about it."',
    age_appropriate: 'toddler',
    tags: ['emotions', 'communication', 'empathy'],
  },
  {
    id: 'task_36',
    number: 36,
    title: 'Practice patience with a timer',
    category: 'character_building',
    task_type: 'primary',
    description: '"We wait 2 minutes before getting snack"',
    age_appropriate: 'toddler',
    tags: ['patience', 'sabr', 'self_control'],
  },
  {
    id: 'task_37',
    number: 37,
    title: 'Teach turn-taking in conversation',
    category: 'character_building',
    task_type: 'quick_win',
    description: 'No interrupting mama\'s phone calls',
    age_appropriate: 'toddler',
    tags: ['manners', 'patience', 'communication'],
  },
  {
    id: 'task_38',
    number: 38,
    title: 'Practice kindness to pets/plants',
    category: 'character_building',
    task_type: 'quick_win',
    description: '"Allah loves when we\'re gentle"',
    age_appropriate: 'toddler',
    tags: ['kindness', 'gentleness', 'creation'],
  },
];

const ACTIVE_LEARNING_TASKS: DailyTask[] = [
  {
    id: 'task_39',
    number: 39,
    title: 'Do simple Arabic letter tracing',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Alif, Ba, Ta',
    age_appropriate: 'toddler',
    tags: ['arabic', 'writing', 'learning'],
  },
  {
    id: 'task_40',
    number: 40,
    title: 'Count in Arabic to 10',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Make it musical',
    age_appropriate: 'toddler',
    tags: ['arabic', 'counting', 'learning'],
  },
  {
    id: 'task_41',
    number: 41,
    title: 'Learn body parts in Arabic',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Touch head "ra\'s," touch nose "anf"',
    age_appropriate: 'toddler',
    tags: ['arabic', 'vocabulary', 'body'],
  },
  {
    id: 'task_42',
    number: 42,
    title: 'Teach dua for entering bathroom',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Simple, memorable',
    age_appropriate: 'toddler',
    tags: ['dua', 'bathroom', 'sunnah'],
  },
  {
    id: 'task_43',
    number: 43,
    title: 'Practice wudu steps with a doll',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Make it play-based',
    age_appropriate: 'toddler',
    tags: ['wudu', 'play', 'learning'],
  },
  {
    id: 'task_44',
    number: 44,
    title: 'Discuss halal vs haram foods',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Age-appropriate, not scary',
    age_appropriate: 'toddler',
    tags: ['halal', 'food', 'teaching'],
  },
  {
    id: 'task_45',
    number: 45,
    title: 'Talk about Prophet Muhammad ﷺ',
    category: 'active_learning',
    task_type: 'primary',
    description: '"He was kind, he never lied, he helped people"',
    age_appropriate: 'toddler',
    tags: ['prophet', 'seerah', 'character'],
  },
  {
    id: 'task_46',
    number: 46,
    title: 'Read Quran with finger following words',
    category: 'active_learning',
    task_type: 'quick_win',
    description: 'Pre-reading skills',
    age_appropriate: 'toddler',
    tags: ['quran', 'reading', 'learning'],
  },
];

const PRACTICAL_LIFE_TASKS: DailyTask[] = [
  {
    id: 'task_47',
    number: 47,
    title: 'Let kids help with laundry',
    category: 'practical_life',
    task_type: 'primary',
    description: 'Match socks, fold small towels',
    age_appropriate: 'toddler',
    tags: ['chores', 'laundry', 'life_skills'],
  },
  {
    id: 'task_48',
    number: 48,
    title: 'Teach setting the table',
    category: 'practical_life',
    task_type: 'primary',
    description: 'Builds responsibility and motor skills',
    age_appropriate: 'toddler',
    tags: ['chores', 'table', 'responsibility'],
  },
  {
    id: 'task_49',
    number: 49,
    title: 'Practice getting dressed independently',
    category: 'practical_life',
    task_type: 'primary',
    description: 'Patience, mama!',
    age_appropriate: 'toddler',
    tags: ['independence', 'dressing', 'life_skills'],
  },
  {
    id: 'task_50',
    number: 50,
    title: 'Teach hand washing properly',
    category: 'practical_life',
    task_type: 'primary',
    description: 'Sunnah hygiene',
    age_appropriate: 'toddler',
    tags: ['hygiene', 'sunnah', 'health'],
  },
  {
    id: 'task_51',
    number: 51,
    title: 'Let kids "help" with meal prep',
    category: 'practical_life',
    task_type: 'primary',
    description: 'Stirring, measuring, pouring',
    age_appropriate: 'toddler',
    tags: ['cooking', 'life_skills', 'confidence'],
  },
  {
    id: 'task_52',
    number: 52,
    title: 'Organize toys together',
    category: 'practical_life',
    task_type: 'primary',
    description: '"Everything has a home"',
    age_appropriate: 'toddler',
    tags: ['organization', 'cleaning', 'routine'],
  },
  {
    id: 'task_53',
    number: 53,
    title: 'Water plants together',
    category: 'practical_life',
    task_type: 'quick_win',
    description: 'Talk about Allah\'s creation',
    age_appropriate: 'toddler',
    tags: ['nature', 'creation', 'care'],
  },
  {
    id: 'task_54',
    number: 54,
    title: 'Practice putting on shoes',
    category: 'practical_life',
    task_type: 'quick_win',
    description: 'Life skill + patience',
    age_appropriate: 'toddler',
    tags: ['independence', 'shoes', 'patience'],
  },
];

// ============================================================================
// PRE-LUNCH / DHUHR ROUTINE
// ============================================================================

const DHUHR_TASKS: DailyTask[] = [
  {
    id: 'task_55',
    number: 55,
    title: 'Announce Dhuhr time 15 mins before',
    category: 'dhuhr_routine',
    task_type: 'primary',
    description: '"Prayer time coming! Let\'s clean up!"',
    age_appropriate: 'all',
    tags: ['prayer', 'dhuhr', 'routine'],
  },
  {
    id: 'task_56',
    number: 56,
    title: 'Help kids make wudu together',
    category: 'dhuhr_routine',
    task_type: 'primary',
    description: 'Supervise little ones',
    age_appropriate: 'toddler',
    tags: ['wudu', 'prayer', 'together'],
  },
  {
    id: 'task_57',
    number: 57,
    title: 'Lay out prayer mats as family',
    category: 'dhuhr_routine',
    task_type: 'primary',
    description: 'Create the sacred space',
    age_appropriate: 'all',
    tags: ['prayer', 'family', 'routine'],
  },
  {
    id: 'task_58',
    number: 58,
    title: 'Pray Dhuhr on time',
    category: 'dhuhr_routine',
    task_type: 'primary',
    description: 'Kids pray beside you or play quietly nearby',
    age_appropriate: 'all',
    tags: ['prayer', 'dhuhr', 'on_time'],
  },
  {
    id: 'task_59',
    number: 59,
    title: 'Let older kids lead family salah',
    category: 'dhuhr_routine',
    task_type: 'primary',
    description: 'Builds confidence in worship',
    age_appropriate: 'child',
    tags: ['prayer', 'leadership', 'confidence'],
  },
  {
    id: 'task_60',
    number: 60,
    title: 'Make quick dua after Dhuhr',
    category: 'dhuhr_routine',
    task_type: 'quick_win',
    description: 'Hands raised together',
    age_appropriate: 'all',
    tags: ['dua', 'prayer', 'together'],
  },
  {
    id: 'task_61',
    number: 61,
    title: 'Discuss what\'s on plate',
    category: 'dhuhr_routine',
    task_type: 'primary',
    description: '"Allah gave us this food. It\'s a blessing!"',
    age_appropriate: 'toddler',
    tags: ['gratitude', 'food', 'blessing'],
  },
  {
    id: 'task_62',
    number: 62,
    title: 'Teach not wasting food',
    category: 'dhuhr_routine',
    task_type: 'primary',
    description: 'Prophetic teaching on gratitude',
    age_appropriate: 'toddler',
    tags: ['food', 'waste', 'sunnah'],
  },
  {
    id: 'task_63',
    number: 63,
    title: 'Practice good table manners',
    category: 'dhuhr_routine',
    task_type: 'primary',
    description: 'Right hand, small bites, no rushing',
    age_appropriate: 'toddler',
    tags: ['adab', 'eating', 'manners'],
  },
  {
    id: 'task_64',
    number: 64,
    title: 'Tell story while eating',
    category: 'dhuhr_routine',
    task_type: 'primary',
    description: 'Bonding time, slower eating',
    age_appropriate: 'toddler',
    tags: ['bonding', 'stories', 'lunch'],
  },
  {
    id: 'task_65',
    number: 65,
    title: 'Say Bismillah loudly before eating',
    category: 'dhuhr_routine',
    task_type: 'quick_win',
    description: 'Make it ceremonial',
    age_appropriate: 'all',
    tags: ['bismillah', 'eating', 'sunnah'],
  },
  {
    id: 'task_66',
    number: 66,
    title: 'Say Alhamdulillah after lunch',
    category: 'dhuhr_routine',
    task_type: 'quick_win',
    description: 'Ritual completion',
    age_appropriate: 'all',
    tags: ['gratitude', 'eating', 'sunnah'],
  },
];

// ============================================================================
// AFTERNOON REST TIME
// ============================================================================

const QUIET_TIME_TASKS: DailyTask[] = [
  {
    id: 'task_67',
    number: 67,
    title: 'Establish nap/quiet time ritual',
    category: 'quiet_time',
    task_type: 'primary',
    description: 'Same time daily = success',
    age_appropriate: 'toddler',
    tags: ['nap', 'routine', 'rest'],
  },
  {
    id: 'task_68',
    number: 68,
    title: 'Read Quran softly to sleepy kids',
    category: 'quiet_time',
    task_type: 'primary',
    description: 'Better than lullabies',
    age_appropriate: 'all',
    tags: ['quran', 'nap', 'peaceful'],
  },
  {
    id: 'task_69',
    number: 69,
    title: 'Let older kids "read" Islamic board books',
    category: 'quiet_time',
    task_type: 'primary',
    description: 'Independent quiet time',
    age_appropriate: 'toddler',
    tags: ['reading', 'quiet', 'independence'],
  },
  {
    id: 'task_70',
    number: 70,
    title: 'Say bedtime duas during nap',
    category: 'quiet_time',
    task_type: 'quick_win',
    description: 'Create association of peace with Allah\'s words',
    age_appropriate: 'all',
    tags: ['dua', 'sleep', 'peaceful'],
  },
];

// ============================================================================
// LATE AFTERNOON / ASR
// ============================================================================

const ASR_TASKS: DailyTask[] = [
  {
    id: 'task_71',
    number: 71,
    title: 'Pray Asr promptly',
    category: 'asr_routine',
    task_type: 'primary',
    description: 'Establish this before evening chaos',
    age_appropriate: 'all',
    tags: ['prayer', 'asr', 'on_time'],
  },
  {
    id: 'task_72',
    number: 72,
    title: 'Do afternoon dhikr with kids',
    category: 'asr_routine',
    task_type: 'quick_win',
    description: '"Let\'s say SubhanAllah 10 times together!"',
    age_appropriate: 'all',
    tags: ['dhikr', 'together', 'afternoon'],
  },
  {
    id: 'task_73',
    number: 73,
    title: 'Go outside if possible',
    category: 'asr_routine',
    task_type: 'primary',
    description: 'Nature is Allah\'s classroom',
    age_appropriate: 'all',
    tags: ['nature', 'outside', 'creation'],
  },
  {
    id: 'task_74',
    number: 74,
    title: 'Play Islamic memory games',
    category: 'asr_routine',
    task_type: 'primary',
    description: 'Prophet names, Arabic letters',
    age_appropriate: 'toddler',
    tags: ['games', 'learning', 'fun'],
  },
  {
    id: 'task_76',
    number: 76,
    title: 'Practice sharing during play',
    category: 'asr_routine',
    task_type: 'primary',
    description: '"Can your sister play too?"',
    age_appropriate: 'toddler',
    tags: ['sharing', 'play', 'character'],
  },
  {
    id: 'task_77',
    number: 77,
    title: 'Teach respect for others\' belongings',
    category: 'asr_routine',
    task_type: 'primary',
    description: '"We don\'t touch without asking"',
    age_appropriate: 'toddler',
    tags: ['respect', 'boundaries', 'adab'],
  },
  {
    id: 'task_78',
    number: 78,
    title: 'Let kids help with dinner prep',
    category: 'asr_routine',
    task_type: 'primary',
    description: 'Age-appropriate tasks',
    age_appropriate: 'toddler',
    tags: ['cooking', 'helping', 'life_skills'],
  },
  {
    id: 'task_79',
    number: 79,
    title: 'Point out Allah\'s creations',
    category: 'asr_routine',
    task_type: 'quick_win',
    description: '"See that bird? Allah made it!"',
    age_appropriate: 'all',
    tags: ['nature', 'creation', 'wonder'],
  },
  {
    id: 'task_80',
    number: 80,
    title: 'Practice counting ingredients',
    category: 'asr_routine',
    task_type: 'quick_win',
    description: 'Math + life skills',
    age_appropriate: 'toddler',
    tags: ['counting', 'cooking', 'math'],
  },
];

// ============================================================================
// QURAN TIME
// ============================================================================

const QURAN_TIME_TASKS: DailyTask[] = [
  {
    id: 'task_81',
    number: 81,
    title: 'Recite one short surah together',
    category: 'quran_time',
    task_type: 'primary',
    description: 'Repetition builds memorization',
    age_appropriate: 'all',
    tags: ['quran', 'memorization', 'together'],
  },
  {
    id: 'task_82',
    number: 82,
    title: 'Explain meaning of the surah',
    category: 'quran_time',
    task_type: 'primary',
    description: 'Understanding creates love',
    age_appropriate: 'toddler',
    tags: ['quran', 'tafsir', 'understanding'],
  },
  {
    id: 'task_83',
    number: 83,
    title: 'Review previously memorized surahs',
    category: 'quran_time',
    task_type: 'primary',
    description: 'Use it or lose it',
    age_appropriate: 'toddler',
    tags: ['quran', 'review', 'memorization'],
  },
  {
    id: 'task_84',
    number: 84,
    title: 'Make Quran recitation part of routine',
    category: 'quran_time',
    task_type: 'primary',
    description: 'Same time daily',
    age_appropriate: 'all',
    tags: ['quran', 'routine', 'habit'],
  },
  {
    id: 'task_86',
    number: 86,
    title: 'Listen to beautiful Quran recitation',
    category: 'quran_time',
    task_type: 'quick_win',
    description: 'Sheikh Mishary or similar',
    age_appropriate: 'all',
    tags: ['quran', 'listening', 'beauty'],
  },
];

// ============================================================================
// EVENING / MAGHRIB
// ============================================================================

const MAGHRIB_TASKS: DailyTask[] = [
  {
    id: 'task_87',
    number: 87,
    title: 'Pause everything for Maghrib',
    category: 'maghrib_routine',
    task_type: 'primary',
    description: 'Show that Allah comes first',
    age_appropriate: 'all',
    tags: ['prayer', 'maghrib', 'priority'],
  },
  {
    id: 'task_88',
    number: 88,
    title: 'Kids make wudu with minimal help',
    category: 'maghrib_routine',
    task_type: 'primary',
    description: 'Building independence',
    age_appropriate: 'toddler',
    tags: ['wudu', 'independence', 'prayer'],
  },
  {
    id: 'task_89',
    number: 89,
    title: 'Pray Maghrib as family',
    category: 'maghrib_routine',
    task_type: 'primary',
    description: 'United in worship',
    age_appropriate: 'all',
    tags: ['prayer', 'maghrib', 'family'],
  },
  {
    id: 'task_90',
    number: 90,
    title: 'Read evening adhkar as family',
    category: 'maghrib_routine',
    task_type: 'primary',
    description: 'Protection and remembrance',
    age_appropriate: 'all',
    tags: ['adhkar', 'evening', 'protection'],
  },
  {
    id: 'task_91',
    number: 91,
    title: 'Call out "Adhan time!"',
    category: 'maghrib_routine',
    task_type: 'quick_win',
    description: 'Train kids to recognize prayer call',
    age_appropriate: 'all',
    tags: ['adhan', 'awareness', 'prayer'],
  },
  {
    id: 'task_92',
    number: 92,
    title: 'Make evening dua together',
    category: 'maghrib_routine',
    task_type: 'quick_win',
    description: 'Hands raised, hearts present',
    age_appropriate: 'all',
    tags: ['dua', 'evening', 'together'],
  },
];

const DINNER_FAMILY_TASKS: DailyTask[] = [
  {
    id: 'task_93',
    number: 93,
    title: 'Set table together',
    category: 'dinner_family',
    task_type: 'primary',
    description: 'Teamwork and responsibility',
    age_appropriate: 'toddler',
    tags: ['chores', 'teamwork', 'dinner'],
  },
  {
    id: 'task_94',
    number: 94,
    title: 'Share "best part of day"',
    category: 'dinner_family',
    task_type: 'primary',
    description: 'Build communication and gratitude',
    age_appropriate: 'toddler',
    tags: ['gratitude', 'communication', 'family'],
  },
  {
    id: 'task_95',
    number: 95,
    title: 'Teach adab of eating',
    category: 'dinner_family',
    task_type: 'primary',
    description: 'Prophet\'s way of dining',
    age_appropriate: 'toddler',
    tags: ['adab', 'eating', 'sunnah'],
  },
  {
    id: 'task_96',
    number: 96,
    title: 'Clean up together',
    category: 'dinner_family',
    task_type: 'primary',
    description: '"Many hands make light work"',
    age_appropriate: 'toddler',
    tags: ['cleaning', 'teamwork', 'responsibility'],
  },
  {
    id: 'task_97',
    number: 97,
    title: 'Say family dinner dua',
    category: 'dinner_family',
    task_type: 'quick_win',
    description: 'Bismillah with intention',
    age_appropriate: 'all',
    tags: ['dua', 'dinner', 'family'],
  },
  {
    id: 'task_98',
    number: 98,
    title: 'Practice gratitude for food',
    category: 'dinner_family',
    task_type: 'quick_win',
    description: 'Alhamdulillah from the heart',
    age_appropriate: 'all',
    tags: ['gratitude', 'food', 'alhamdulillah'],
  },
  {
    id: 'task_100',
    number: 100,
    title: 'Act out Prophet stories',
    category: 'dinner_family',
    task_type: 'primary',
    description: 'Kinesthetic learning',
    age_appropriate: 'toddler',
    tags: ['stories', 'play', 'prophets'],
  },
  {
    id: 'task_103',
    number: 103,
    title: 'Sing Islamic nasheeds',
    category: 'dinner_family',
    task_type: 'quick_win',
    description: 'Music alternative',
    age_appropriate: 'all',
    tags: ['nasheeds', 'singing', 'fun'],
  },
  {
    id: 'task_104',
    number: 104,
    title: 'Practice dua of gratitude',
    category: 'dinner_family',
    task_type: 'quick_win',
    description: 'Before bed prep begins',
    age_appropriate: 'all',
    tags: ['dua', 'gratitude', 'evening'],
  },
];

// ============================================================================
// BEDTIME / ISHA
// ============================================================================

const ISHA_TASKS: DailyTask[] = [
  {
    id: 'task_105',
    number: 105,
    title: 'Give 15-minute warning',
    category: 'isha_routine',
    task_type: 'primary',
    description: '"Isha time soon!"',
    age_appropriate: 'all',
    tags: ['prayer', 'isha', 'routine'],
  },
  {
    id: 'task_106',
    number: 106,
    title: 'Kids make wudu independently',
    category: 'isha_routine',
    task_type: 'primary',
    description: 'You just supervise',
    age_appropriate: 'child',
    tags: ['wudu', 'independence', 'prayer'],
  },
  {
    id: 'task_107',
    number: 107,
    title: 'Dim lights for peaceful atmosphere',
    category: 'isha_routine',
    task_type: 'quick_win',
    description: 'Signal winding down',
    age_appropriate: 'all',
    tags: ['environment', 'calm', 'bedtime'],
  },
  {
    id: 'task_108',
    number: 108,
    title: 'Pray Isha together',
    category: 'isha_routine',
    task_type: 'primary',
    description: 'End day in worship',
    age_appropriate: 'all',
    tags: ['prayer', 'isha', 'family'],
  },
  {
    id: 'task_109',
    number: 109,
    title: 'Sit for brief dhikr after Isha',
    category: 'isha_routine',
    task_type: 'quick_win',
    description: '"Let\'s say Allahu Akbar together"',
    age_appropriate: 'all',
    tags: ['dhikr', 'prayer', 'together'],
  },
];

const BEDTIME_TASKS: DailyTask[] = [
  {
    id: 'task_110',
    number: 110,
    title: 'Read Islamic bedtime story',
    category: 'bedtime_routine',
    task_type: 'primary',
    description: 'Prophets, Sahaba, morals',
    age_appropriate: 'toddler',
    tags: ['stories', 'bedtime', 'prophets'],
  },
  {
    id: 'task_111',
    number: 111,
    title: 'Discuss one thing learned today',
    category: 'bedtime_routine',
    task_type: 'primary',
    description: 'Reflection habit',
    age_appropriate: 'toddler',
    tags: ['reflection', 'learning', 'bedtime'],
  },
  {
    id: 'task_112',
    number: 112,
    title: 'Practice bedtime duas',
    category: 'bedtime_routine',
    task_type: 'primary',
    description: 'Protection for the night',
    age_appropriate: 'all',
    tags: ['dua', 'bedtime', 'protection'],
  },
  {
    id: 'task_113',
    number: 113,
    title: 'Recite Ayat al-Kursi together',
    category: 'bedtime_routine',
    task_type: 'primary',
    description: 'Memorization through repetition',
    age_appropriate: 'all',
    tags: ['quran', 'ayat_al_kursi', 'memorization'],
  },
  {
    id: 'task_114',
    number: 114,
    title: 'Say the 3 Quls',
    category: 'bedtime_routine',
    task_type: 'primary',
    description: 'Al-Ikhlas, Al-Falaq, An-Nas',
    age_appropriate: 'all',
    tags: ['quran', 'protection', 'bedtime'],
  },
  {
    id: 'task_115',
    number: 115,
    title: 'Blow on hands and wipe over body',
    category: 'bedtime_routine',
    task_type: 'quick_win',
    description: 'Prophetic practice',
    age_appropriate: 'all',
    tags: ['sunnah', 'protection', 'bedtime'],
  },
  {
    id: 'task_116',
    number: 116,
    title: 'Make dua for each child individually',
    category: 'bedtime_routine',
    task_type: 'primary',
    description: 'Personalized blessing',
    age_appropriate: 'all',
    tags: ['dua', 'personal', 'blessing'],
  },
  {
    id: 'task_117',
    number: 117,
    title: 'Tuck in with "Assalamu alaikum"',
    category: 'bedtime_routine',
    task_type: 'quick_win',
    description: 'End day with peace',
    age_appropriate: 'all',
    tags: ['salaam', 'bedtime', 'peace'],
  },
  {
    id: 'task_118',
    number: 118,
    title: 'Whisper "I love you for the sake of Allah"',
    category: 'bedtime_routine',
    task_type: 'quick_win',
    description: 'Divine love connection',
    age_appropriate: 'all',
    tags: ['love', 'bedtime', 'connection'],
  },
];

// ============================================================================
// FRIDAY SPECIAL (JUMU'AH)
// ============================================================================

const FRIDAY_TASKS: DailyTask[] = [
  {
    id: 'task_119',
    number: 119,
    title: 'Explain why Friday is special',
    category: 'friday_special',
    task_type: 'primary',
    description: '"Allah\'s favorite day"',
    age_appropriate: 'toddler',
    tags: ['friday', 'jumuah', 'teaching'],
  },
  {
    id: 'task_120',
    number: 120,
    title: 'Take ghusl (full bath)',
    category: 'friday_special',
    task_type: 'primary',
    description: 'Cleanliness for blessed day',
    age_appropriate: 'all',
    tags: ['ghusl', 'cleanliness', 'friday'],
  },
  {
    id: 'task_121',
    number: 121,
    title: 'Read Surah Al-Kahf together',
    category: 'friday_special',
    task_type: 'primary',
    description: 'Friday sunnah',
    age_appropriate: 'child',
    tags: ['quran', 'kahf', 'sunnah'],
  },
  {
    id: 'task_123',
    number: 123,
    title: 'Do extra sadaqah',
    category: 'friday_special',
    task_type: 'primary',
    description: 'Teach generosity',
    age_appropriate: 'all',
    tags: ['sadaqah', 'generosity', 'friday'],
  },
  {
    id: 'task_124',
    number: 124,
    title: 'Wear best clothes',
    category: 'friday_special',
    task_type: 'quick_win',
    description: 'Honor the day',
    age_appropriate: 'all',
    tags: ['clothes', 'honor', 'friday'],
  },
  {
    id: 'task_125',
    number: 125,
    title: 'Send extra salawat on Prophet ﷺ',
    category: 'friday_special',
    task_type: 'quick_win',
    description: 'Special Friday blessing',
    age_appropriate: 'all',
    tags: ['salawat', 'prophet', 'friday'],
  },
  {
    id: 'task_126',
    number: 126,
    title: 'Make family dua for ummah',
    category: 'friday_special',
    task_type: 'quick_win',
    description: 'Think beyond ourselves',
    age_appropriate: 'all',
    tags: ['dua', 'ummah', 'friday'],
  },
  {
    id: 'task_127',
    number: 127,
    title: 'Have special Friday meal',
    category: 'friday_special',
    task_type: 'primary',
    description: 'Make it memorable',
    age_appropriate: 'all',
    tags: ['food', 'celebration', 'friday'],
  },
  {
    id: 'task_128',
    number: 128,
    title: 'Call/visit relatives',
    category: 'friday_special',
    task_type: 'primary',
    description: 'Family ties on blessed day',
    age_appropriate: 'all',
    tags: ['family', 'connection', 'friday'],
  },
];

// ============================================================================
// WEEKLY SPECIAL DAYS
// ============================================================================

const WEEKLY_SPECIAL_TASKS: DailyTask[] = [
  {
    id: 'task_129',
    number: 129,
    title: 'Teach significance of Monday & Thursday',
    category: 'weekly_special',
    task_type: 'primary',
    description: "Prophet's fasting days",
    age_appropriate: 'child',
    tags: ['fasting', 'sunnah', 'teaching'],
  },
  {
    id: 'task_130',
    number: 130,
    title: 'Do extra good deeds on blessed days',
    category: 'weekly_special',
    task_type: 'primary',
    description: '"These are blessed days"',
    age_appropriate: 'all',
    tags: ['good_deeds', 'blessed', 'motivation'],
  },
  {
    id: 'task_131',
    number: 131,
    title: 'Make special dua on Monday/Thursday',
    category: 'weekly_special',
    task_type: 'quick_win',
    description: 'Prophet loved these days',
    age_appropriate: 'all',
    tags: ['dua', 'sunnah', 'special'],
  },
  {
    id: 'task_132',
    number: 132,
    title: 'Share food with neighbor',
    category: 'weekly_special',
    task_type: 'primary',
    description: 'Prophetic practice',
    age_appropriate: 'all',
    tags: ['neighbors', 'sharing', 'sunnah'],
  },
  {
    id: 'task_133',
    number: 133,
    title: 'Explain current Islamic month',
    category: 'weekly_special',
    task_type: 'primary',
    description: 'Awareness of Islamic calendar',
    age_appropriate: 'toddler',
    tags: ['calendar', 'islamic_month', 'teaching'],
  },
  {
    id: 'task_134',
    number: 134,
    title: 'Teach significance of the month',
    category: 'weekly_special',
    task_type: 'primary',
    description: 'Why it matters',
    age_appropriate: 'toddler',
    tags: ['islamic_month', 'teaching', 'significance'],
  },
  {
    id: 'task_136',
    number: 136,
    title: 'Make calendar visible',
    category: 'weekly_special',
    task_type: 'quick_win',
    description: 'Islamic dates awareness',
    age_appropriate: 'all',
    tags: ['calendar', 'environment', 'awareness'],
  },
];

// ============================================================================
// CHARACTER DEVELOPMENT
// ============================================================================

const CHARACTER_TRAIT_TASKS: DailyTask[] = [
  {
    id: 'task_137',
    number: 137,
    title: 'Pick one character trait per week',
    category: 'character_building',
    task_type: 'primary',
    description: 'Honesty, kindness, courage',
    age_appropriate: 'toddler',
    tags: ['character', 'weekly', 'focus'],
  },
  {
    id: 'task_138',
    number: 138,
    title: 'Explain trait in kid terms',
    category: 'character_building',
    task_type: 'primary',
    description: 'Simple, relatable examples',
    age_appropriate: 'toddler',
    tags: ['character', 'teaching', 'simple'],
  },
  {
    id: 'task_139',
    number: 139,
    title: "Point out trait in Prophet's life",
    category: 'character_building',
    task_type: 'primary',
    description: 'Real model',
    age_appropriate: 'toddler',
    tags: ['prophet', 'character', 'example'],
  },
  {
    id: 'task_140',
    number: 140,
    title: 'Role-play the trait',
    category: 'character_building',
    task_type: 'primary',
    description: 'Practice makes permanent',
    age_appropriate: 'toddler',
    tags: ['roleplay', 'character', 'practice'],
  },
  {
    id: 'task_141',
    number: 141,
    title: 'Read story about trait',
    category: 'character_building',
    task_type: 'primary',
    description: 'Sahaba examples',
    age_appropriate: 'toddler',
    tags: ['stories', 'sahaba', 'character'],
  },
  {
    id: 'task_142',
    number: 142,
    title: 'Catch kids displaying trait',
    category: 'character_building',
    task_type: 'quick_win',
    description: '"I saw you being honest!"',
    age_appropriate: 'toddler',
    tags: ['encouragement', 'character', 'positive'],
  },
  {
    id: 'task_143',
    number: 143,
    title: 'Make dua to develop trait',
    category: 'character_building',
    task_type: 'quick_win',
    description: '"Ya Allah, make us honest"',
    age_appropriate: 'all',
    tags: ['dua', 'character', 'growth'],
  },
];

const ADAB_TASKS: DailyTask[] = [
  {
    id: 'task_144',
    number: 144,
    title: 'Teach Islamic greeting properly',
    category: 'character_building',
    task_type: 'primary',
    description: 'Right way to say salaam',
    age_appropriate: 'toddler',
    tags: ['salaam', 'greeting', 'adab'],
  },
  {
    id: 'task_145',
    number: 145,
    title: 'Teach respect for parents',
    category: 'character_building',
    task_type: 'primary',
    description: 'What it looks like',
    age_appropriate: 'toddler',
    tags: ['respect', 'parents', 'adab'],
  },
  {
    id: 'task_146',
    number: 146,
    title: 'Practice gentle speech',
    category: 'character_building',
    task_type: 'primary',
    description: 'No yelling, name-calling',
    age_appropriate: 'toddler',
    tags: ['speech', 'gentle', 'adab'],
  },
  {
    id: 'task_147',
    number: 147,
    title: 'Teach asking permission',
    category: 'character_building',
    task_type: 'primary',
    description: 'Before entering, touching, etc.',
    age_appropriate: 'toddler',
    tags: ['permission', 'boundaries', 'adab'],
  },
  {
    id: 'task_148',
    number: 148,
    title: 'Practice patience in waiting',
    category: 'character_building',
    task_type: 'primary',
    description: "Don't interrupt, push, etc.",
    age_appropriate: 'toddler',
    tags: ['patience', 'sabr', 'adab'],
  },
  {
    id: 'task_149',
    number: 149,
    title: 'Teach proper use of right hand',
    category: 'character_building',
    task_type: 'primary',
    description: 'Eating, giving, receiving',
    age_appropriate: 'toddler',
    tags: ['sunnah', 'right_hand', 'adab'],
  },
  {
    id: 'task_150',
    number: 150,
    title: 'Practice making dua for others',
    category: 'character_building',
    task_type: 'quick_win',
    description: 'When someone sneezes, etc.',
    age_appropriate: 'toddler',
    tags: ['dua', 'others', 'sunnah'],
  },
];

// ============================================================================
// QURAN LEARNING
// ============================================================================

const QURAN_ROUTINE_TASKS: DailyTask[] = [
  {
    id: 'task_175',
    number: 175,
    title: 'Set specific Quran time',
    category: 'quran_time',
    task_type: 'primary',
    description: 'Same time daily builds habit',
    age_appropriate: 'all',
    tags: ['quran', 'routine', 'habit'],
  },
  {
    id: 'task_177',
    number: 177,
    title: 'Follow along with finger',
    category: 'quran_time',
    task_type: 'primary',
    description: 'Pre-reading skills',
    age_appropriate: 'toddler',
    tags: ['quran', 'reading', 'tracking'],
  },
  {
    id: 'task_178',
    number: 178,
    title: 'Repeat after reciter',
    category: 'quran_time',
    task_type: 'primary',
    description: 'Audio learning',
    age_appropriate: 'all',
    tags: ['quran', 'listening', 'repeating'],
  },
  {
    id: 'task_179',
    number: 179,
    title: 'Learn tajweed basics',
    category: 'quran_time',
    task_type: 'primary',
    description: 'Proper pronunciation early',
    age_appropriate: 'child',
    tags: ['tajweed', 'quran', 'pronunciation'],
  },
  {
    id: 'task_180',
    number: 180,
    title: 'Review previously learned portions',
    category: 'quran_time',
    task_type: 'primary',
    description: 'Consistent revision',
    age_appropriate: 'all',
    tags: ['quran', 'review', 'memorization'],
  },
  {
    id: 'task_181',
    number: 181,
    title: 'Make Quran special',
    category: 'quran_time',
    task_type: 'primary',
    description: 'Beautiful mushaf, special place',
    age_appropriate: 'all',
    tags: ['quran', 'respect', 'environment'],
  },
  {
    id: 'task_182',
    number: 182,
    title: 'Celebrate new ayahs learned',
    category: 'quran_time',
    task_type: 'quick_win',
    description: 'Positive reinforcement',
    age_appropriate: 'all',
    tags: ['quran', 'celebration', 'encouragement'],
  },
  {
    id: 'task_183',
    number: 183,
    title: 'Start with short surahs',
    category: 'quran_time',
    task_type: 'primary',
    description: 'Build confidence',
    age_appropriate: 'toddler',
    tags: ['quran', 'memorization', 'short'],
  },
  {
    id: 'task_184',
    number: 184,
    title: 'Repeat 10 times each',
    category: 'quran_time',
    task_type: 'primary',
    description: 'Consistency is key',
    age_appropriate: 'all',
    tags: ['quran', 'repetition', 'memorization'],
  },
  {
    id: 'task_185',
    number: 185,
    title: 'Review before bed',
    category: 'quran_time',
    task_type: 'primary',
    description: 'Memory consolidation',
    age_appropriate: 'all',
    tags: ['quran', 'review', 'bedtime'],
  },
  {
    id: 'task_186',
    number: 186,
    title: 'Test each other',
    category: 'quran_time',
    task_type: 'primary',
    description: 'Make it fun',
    age_appropriate: 'toddler',
    tags: ['quran', 'testing', 'fun'],
  },
];

// ============================================================================
// SOCIAL SKILLS
// ============================================================================

const SIBLING_TASKS: DailyTask[] = [
  {
    id: 'task_189',
    number: 189,
    title: 'Teach conflict resolution',
    category: 'social_skills',
    task_type: 'primary',
    description: 'Use words, not hitting',
    age_appropriate: 'toddler',
    tags: ['conflict', 'resolution', 'siblings'],
  },
  {
    id: 'task_190',
    number: 190,
    title: 'Practice taking turns',
    category: 'social_skills',
    task_type: 'primary',
    description: 'Build patience and fairness',
    age_appropriate: 'toddler',
    tags: ['turns', 'patience', 'fairness'],
  },
  {
    id: 'task_191',
    number: 191,
    title: 'Encourage helping each other',
    category: 'social_skills',
    task_type: 'primary',
    description: 'Teamwork over competition',
    age_appropriate: 'toddler',
    tags: ['helping', 'teamwork', 'siblings'],
  },
  {
    id: 'task_192',
    number: 192,
    title: 'Teach asking forgiveness',
    category: 'social_skills',
    task_type: 'primary',
    description: '"I\'m sorry" genuinely',
    age_appropriate: 'toddler',
    tags: ['forgiveness', 'apology', 'character'],
  },
  {
    id: 'task_193',
    number: 193,
    title: "Celebrate each other's wins",
    category: 'social_skills',
    task_type: 'quick_win',
    description: 'No jealousy, only joy',
    age_appropriate: 'toddler',
    tags: ['celebration', 'joy', 'siblings'],
  },
  {
    id: 'task_194',
    number: 194,
    title: 'Practice sharing possessions',
    category: 'social_skills',
    task_type: 'quick_win',
    description: 'Generosity with siblings',
    age_appropriate: 'toddler',
    tags: ['sharing', 'generosity', 'siblings'],
  },
];

const PARENT_RELATIONSHIP_TASKS: DailyTask[] = [
  {
    id: 'task_195',
    number: 195,
    title: 'Teach respect for parents',
    category: 'social_skills',
    task_type: 'primary',
    description: 'Islamic obligation',
    age_appropriate: 'toddler',
    tags: ['respect', 'parents', 'obligation'],
  },
  {
    id: 'task_196',
    number: 196,
    title: 'Practice obeying immediately',
    category: 'social_skills',
    task_type: 'primary',
    description: 'First time obedience',
    age_appropriate: 'toddler',
    tags: ['obedience', 'parents', 'training'],
  },
  {
    id: 'task_197',
    number: 197,
    title: 'Help with household tasks',
    category: 'social_skills',
    task_type: 'primary',
    description: 'Contributing family member',
    age_appropriate: 'toddler',
    tags: ['chores', 'helping', 'family'],
  },
  {
    id: 'task_198',
    number: 198,
    title: 'Teach gratitude for parents',
    category: 'social_skills',
    task_type: 'quick_win',
    description: '"Thank you mama/baba"',
    age_appropriate: 'toddler',
    tags: ['gratitude', 'parents', 'thankfulness'],
  },
  {
    id: 'task_199',
    number: 199,
    title: 'Make dua for parents',
    category: 'social_skills',
    task_type: 'quick_win',
    description: 'Kids pray for you too',
    age_appropriate: 'toddler',
    tags: ['dua', 'parents', 'blessing'],
  },
];

const FAMILY_TASKS: DailyTask[] = [
  {
    id: 'task_200',
    number: 200,
    title: 'Call grandparents regularly',
    category: 'social_skills',
    task_type: 'primary',
    description: 'Maintain family ties',
    age_appropriate: 'all',
    tags: ['family', 'grandparents', 'connection'],
  },
  {
    id: 'task_203',
    number: 203,
    title: 'Practice good guest behavior',
    category: 'social_skills',
    task_type: 'primary',
    description: "Adab in others' homes",
    age_appropriate: 'toddler',
    tags: ['adab', 'guest', 'manners'],
  },
  {
    id: 'task_204',
    number: 204,
    title: 'Teach hosting etiquette',
    category: 'social_skills',
    task_type: 'primary',
    description: 'Welcome guests warmly',
    age_appropriate: 'toddler',
    tags: ['hosting', 'guests', 'adab'],
  },
  {
    id: 'task_205',
    number: 205,
    title: 'Make dua for community',
    category: 'social_skills',
    task_type: 'quick_win',
    description: 'Think beyond family',
    age_appropriate: 'all',
    tags: ['dua', 'community', 'ummah'],
  },
];

// ============================================================================
// AGE-SPECIFIC TASKS
// ============================================================================

const AGE_BABY_TASKS: DailyTask[] = [
  {
    id: 'task_216',
    number: 216,
    title: 'Talk to baby in Arabic',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Early language exposure',
    age_appropriate: 'baby',
    tags: ['arabic', 'baby', 'language'],
  },
  {
    id: 'task_217',
    number: 217,
    title: 'Play Quran during activities',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Sound familiarity',
    age_appropriate: 'baby',
    tags: ['quran', 'baby', 'environment'],
  },
  {
    id: 'task_218',
    number: 218,
    title: 'Say Bismillah before everything',
    category: 'active_learning',
    task_type: 'quick_win',
    description: 'Habit formation',
    age_appropriate: 'baby',
    tags: ['bismillah', 'habit', 'baby'],
  },
  {
    id: 'task_219',
    number: 219,
    title: 'Gentle Quran reading to baby',
    category: 'active_learning',
    task_type: 'quick_win',
    description: 'Peaceful association',
    age_appropriate: 'baby',
    tags: ['quran', 'baby', 'peaceful'],
  },
];

const AGE_TODDLER_TASKS: DailyTask[] = [
  {
    id: 'task_220',
    number: 220,
    title: 'Teach basic duas',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Eating, sleeping, bathroom',
    age_appropriate: 'toddler',
    tags: ['dua', 'basic', 'daily'],
  },
  {
    id: 'task_221',
    number: 221,
    title: 'Learn short surahs',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Al-Fatiha, last 3 surahs',
    age_appropriate: 'toddler',
    tags: ['quran', 'memorization', 'short'],
  },
  {
    id: 'task_222',
    number: 222,
    title: 'Practice wudu steps',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Steps and sequence',
    age_appropriate: 'toddler',
    tags: ['wudu', 'learning', 'steps'],
  },
  {
    id: 'task_223',
    number: 223,
    title: 'Learn prayer positions',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Standing, bowing, prostrating',
    age_appropriate: 'toddler',
    tags: ['prayer', 'positions', 'learning'],
  },
  {
    id: 'task_224',
    number: 224,
    title: 'Basic Islamic stories',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Simplified Prophet stories',
    age_appropriate: 'toddler',
    tags: ['stories', 'prophets', 'simple'],
  },
  {
    id: 'task_225',
    number: 225,
    title: 'Islamic vocabulary',
    category: 'active_learning',
    task_type: 'quick_win',
    description: '100+ Arabic words',
    age_appropriate: 'toddler',
    tags: ['arabic', 'vocabulary', 'learning'],
  },
];

const AGE_CHILD_TASKS: DailyTask[] = [
  {
    id: 'task_226',
    number: 226,
    title: 'Formal Quran lessons',
    category: 'quran_time',
    task_type: 'primary',
    description: 'Structured learning',
    age_appropriate: 'child',
    tags: ['quran', 'formal', 'lessons'],
  },
  {
    id: 'task_227',
    number: 227,
    title: 'Prayer practice',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Begin praying regularly',
    age_appropriate: 'child',
    tags: ['prayer', 'regular', 'practice'],
  },
  {
    id: 'task_228',
    number: 228,
    title: 'Fiqh basics',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Rules of purity, prayer',
    age_appropriate: 'child',
    tags: ['fiqh', 'rules', 'learning'],
  },
  {
    id: 'task_229',
    number: 229,
    title: 'Seerah study',
    category: 'active_learning',
    task_type: 'primary',
    description: "Prophet's life in detail",
    age_appropriate: 'child',
    tags: ['seerah', 'prophet', 'study'],
  },
  {
    id: 'task_230',
    number: 230,
    title: 'Arabic reading',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Read Arabic text',
    age_appropriate: 'child',
    tags: ['arabic', 'reading', 'literacy'],
  },
  {
    id: 'task_231',
    number: 231,
    title: 'Islamic values',
    category: 'character_building',
    task_type: 'quick_win',
    description: 'Honesty, kindness, etc.',
    age_appropriate: 'child',
    tags: ['values', 'character', 'teaching'],
  },
  {
    id: 'task_232',
    number: 232,
    title: 'Advanced Quran study',
    category: 'quran_time',
    task_type: 'primary',
    description: 'Tafsir basics',
    age_appropriate: 'child',
    tags: ['quran', 'tafsir', 'advanced'],
  },
  {
    id: 'task_233',
    number: 233,
    title: 'Complete prayer obligations',
    category: 'active_learning',
    task_type: 'primary',
    description: 'All 5 prayers',
    age_appropriate: 'child',
    tags: ['prayer', 'five', 'obligation'],
  },
  {
    id: 'task_235',
    number: 235,
    title: 'Islamic history',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Sahaba, caliphs, empires',
    age_appropriate: 'child',
    tags: ['history', 'sahaba', 'learning'],
  },
  {
    id: 'task_236',
    number: 236,
    title: 'Aqeedah basics',
    category: 'active_learning',
    task_type: 'primary',
    description: 'Belief foundations',
    age_appropriate: 'child',
    tags: ['aqeedah', 'belief', 'foundations'],
  },
];

// ============================================================================
// RESILIENCE
// ============================================================================

const RESILIENCE_TASKS: DailyTask[] = [
  {
    id: 'task_261',
    number: 261,
    title: 'Teach "try again" mindset',
    category: 'resilience',
    task_type: 'primary',
    description: 'Failure is learning',
    age_appropriate: 'toddler',
    tags: ['mindset', 'growth', 'resilience'],
  },
  {
    id: 'task_262',
    number: 262,
    title: 'Celebrate effort, not just results',
    category: 'resilience',
    task_type: 'primary',
    description: 'Growth mindset',
    age_appropriate: 'toddler',
    tags: ['effort', 'encouragement', 'growth'],
  },
  {
    id: 'task_263',
    number: 263,
    title: 'Practice difficult tasks',
    category: 'resilience',
    task_type: 'primary',
    description: 'Build confidence',
    age_appropriate: 'toddler',
    tags: ['challenge', 'confidence', 'practice'],
  },
  {
    id: 'task_264',
    number: 264,
    title: 'Teach problem-solving',
    category: 'resilience',
    task_type: 'primary',
    description: 'Think through challenges',
    age_appropriate: 'toddler',
    tags: ['problem_solving', 'thinking', 'skills'],
  },
  {
    id: 'task_265',
    number: 265,
    title: 'Model persistence',
    category: 'resilience',
    task_type: 'primary',
    description: 'Let them see you try hard',
    age_appropriate: 'all',
    tags: ['modeling', 'persistence', 'example'],
  },
  {
    id: 'task_266',
    number: 266,
    title: 'Encourage independence',
    category: 'resilience',
    task_type: 'quick_win',
    description: '"You can do it"',
    age_appropriate: 'toddler',
    tags: ['independence', 'encouragement', 'confidence'],
  },
];

// ============================================================================
// COMBINED TASK LIST
// ============================================================================

// Raw tasks without display_type and icon (added during runtime)
const RAW_TASKS: Omit<DailyTask, 'display_type' | 'icon' | 'shortTitle'>[] = [
  // Morning
  ...MORNING_ROUTINE_TASKS,
  ...MORNING_GREETING_TASKS,
  ...MORNING_IBADAH_TASKS,
  ...MORNING_ROUTINE_HABITS_TASKS,
  // Mid-morning
  ...SPIRITUAL_TEACHING_TASKS,
  ...CHARACTER_BUILDING_TASKS,
  ...ACTIVE_LEARNING_TASKS,
  ...PRACTICAL_LIFE_TASKS,
  // Dhuhr
  ...DHUHR_TASKS,
  // Afternoon
  ...QUIET_TIME_TASKS,
  ...ASR_TASKS,
  ...QURAN_TIME_TASKS,
  // Evening
  ...MAGHRIB_TASKS,
  ...DINNER_FAMILY_TASKS,
  ...ISHA_TASKS,
  ...BEDTIME_TASKS,
  // Special days
  ...FRIDAY_TASKS,
  ...WEEKLY_SPECIAL_TASKS,
  // Character
  ...CHARACTER_TRAIT_TASKS,
  ...ADAB_TASKS,
  // Quran
  ...QURAN_ROUTINE_TASKS,
  // Social
  ...SIBLING_TASKS,
  ...PARENT_RELATIONSHIP_TASKS,
  ...FAMILY_TASKS,
  // Age-specific
  ...AGE_BABY_TASKS,
  ...AGE_TODDLER_TASKS,
  ...AGE_CHILD_TASKS,
  // Resilience
  ...RESILIENCE_TASKS,
] as Omit<DailyTask, 'display_type' | 'icon' | 'shortTitle'>[];

// Enhance tasks with display_type, icon, and shortTitle
function enhanceTask(task: Omit<DailyTask, 'display_type' | 'icon' | 'shortTitle'>): DailyTask {
  return {
    ...task,
    display_type: (task as DailyTask).display_type || getDisplayType(task.category),
    icon: (task as DailyTask).icon || getTaskIcon(task.tags),
    shortTitle: (task as DailyTask).shortTitle || createShortTitle(task.title),
  };
}

export const ALL_DAILY_TASKS: DailyTask[] = RAW_TASKS.map(enhanceTask);

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get task by ID
 */
export function getTaskById(id: string): DailyTask | undefined {
  return ALL_DAILY_TASKS.find((task) => task.id === id);
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
 * Get Day Tasks (learning-focused)
 */
export function getDayTasks(): DailyTask[] {
  return getTasksByDisplayType('day_task');
}

/**
 * Get Nice to Have tasks (habits/routines)
 */
export function getNiceToHaveTasks(): DailyTask[] {
  return getTasksByDisplayType('nice_to_have');
}

// ============================================================================
// TASK SELECTION ALGORITHM (New: Day Tasks + Nice to Have)
// ============================================================================

export interface NewDailyTaskSelection {
  dayTasks: DailyTask[]; // Learning-focused tasks
  niceToHaveTasks: DailyTask[]; // Habit/routine tasks
}

/**
 * Selects tasks for today using the new categorization
 * - Day Tasks: 3 learning tasks
 * - Nice to Have: 4 habit tasks
 */
export function selectTasksForToday(
  childAge: 'baby' | 'toddler' | 'child' | 'all',
  dayTaskCount: number = 3,
  niceToHaveCount: number = 4,
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
  bonusTask: DailyTask; // Another primary task shown collapsed
  optionalTasks: DailyTask[]; // Additional quick wins if user wants 4-5 tasks
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
 * Selects tasks for today based on:
 * - Child's age
 * - User's preferred difficulty (3-5 tasks)
 * - Previously completed tasks (to vary selection)
 */
export function selectDailyTasks(
  childAge: 'baby' | 'toddler' | 'child' | 'all',
  preferredTaskCount: number = 3, // 3, 4, or 5
  completedTaskIds: string[] = [] // Tasks completed recently (to avoid repetition)
): DailyTaskSelection {
  // Filter tasks appropriate for child's age
  const ageAppropriateTasks = ALL_DAILY_TASKS.filter(
    (task) => task.age_appropriate === childAge || task.age_appropriate === 'all'
  );

  // Separate by type
  const primaryTasks = ageAppropriateTasks.filter((t) => t.task_type === 'primary');
  const quickWinTasks = ageAppropriateTasks.filter((t) => t.task_type === 'quick_win');

  // Prioritize tasks not recently completed, then shuffle
  const sortByFreshness = (tasks: DailyTask[]) => {
    const fresh = tasks.filter((t) => !completedTaskIds.includes(t.id));
    const completed = tasks.filter((t) => completedTaskIds.includes(t.id));
    return [...shuffleArray(fresh), ...shuffleArray(completed)];
  };

  const sortedPrimary = sortByFreshness(primaryTasks);
  const sortedQuickWins = sortByFreshness(quickWinTasks);

  // Select one primary task
  const primaryTask = sortedPrimary[0] || ageAppropriateTasks[0];

  // Select one quick win
  const quickWinTask = sortedQuickWins[0] || ageAppropriateTasks[1];

  // Select bonus task (another primary, shown collapsed)
  const bonusTask =
    sortedPrimary.find((t) => t.id !== primaryTask.id) || sortedPrimary[1] || ageAppropriateTasks[2];

  // Select optional tasks if user wants more than 3
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
  if (recentFeedback.length === 0) return 3; // Default to 3

  // Count ratings from last 7 days
  const lastWeek = recentFeedback.slice(0, 7);
  const tooEasyCount = lastWeek.filter((f) => f.rating === 'too_easy').length;
  const tooHardCount = lastWeek.filter((f) => f.rating === 'too_hard').length;

  // Calculate average completion rate
  const avgCompleted =
    lastWeek.reduce((sum, f) => sum + f.tasksCompleted, 0) / lastWeek.length;

  // Adjust based on feedback pattern
  if (tooEasyCount >= 3 && avgCompleted >= 3) {
    return 5; // User can handle more
  } else if (tooHardCount >= 3 || avgCompleted < 2) {
    return 3; // User is struggling
  } else if (tooEasyCount >= 2) {
    return 4; // Slight increase
  }

  return 3; // Default
}

// ============================================================================
// STATISTICS
// ============================================================================

export const TASK_STATS = {
  total: ALL_DAILY_TASKS.length,
  primary: ALL_DAILY_TASKS.filter((t) => t.task_type === 'primary').length,
  quickWin: ALL_DAILY_TASKS.filter((t) => t.task_type === 'quick_win').length,
  byAge: {
    baby: ALL_DAILY_TASKS.filter((t) => t.age_appropriate === 'baby').length,
    toddler: ALL_DAILY_TASKS.filter((t) => t.age_appropriate === 'toddler').length,
    child: ALL_DAILY_TASKS.filter((t) => t.age_appropriate === 'child').length,
    all: ALL_DAILY_TASKS.filter((t) => t.age_appropriate === 'all').length,
  },
};

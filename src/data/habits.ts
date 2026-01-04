import type { ModuleGuideExtended } from './moduleTypes';

export const SUNNAH_HABITS: ModuleGuideExtended[] = [
  {
    id: 'bismillah',
    type: 'habit',
    title: 'Saying Bismillah Before Eating',
    description: 'The simple habit that brings barakah to every meal',
    duration_minutes: 3,
    content: '',
    tags: ['bismillah', 'eating', 'barakah', 'daily'],
    sections: [
      {
        title: 'The Sunnah',
        content:
          'The Prophet (peace be upon him) said: "When any one of you eats, let him mention the name of Allah."',
        type: 'hadith',
      },
      {
        title: 'Why It Matters',
        content:
          'Saying Bismillah reminds us that all provision comes from Allah and protects our food from shaitan.',
        type: 'text',
      },
      {
        title: 'How to Teach It',
        content:
          'Ages 1-3: Model it repeatedly, make it fun\nAges 4-6: Explain simply, use gentle reminders\nAges 7+: Teach the why, encourage independence',
        type: 'list',
      },
    ],
    relatedModules: ['picky_eating', 'thank_you'],
  },
  {
    id: 'morning_dua',
    type: 'habit',
    title: 'Morning Wake-Up Dua',
    description: 'Start the day with gratitude to Allah',
    duration_minutes: 2,
    content: '',
    tags: ['morning', 'dua', 'gratitude', 'waking'],
    sections: [
      {
        title: 'The Dua',
        content:
          "Alhamdulillahil-ladhi ahyana ba'da ma amatana wa ilayhin-nushur\n\n\"All praise is for Allah who gave us life after having taken it from us, and unto Him is the resurrection\"",
        type: 'dua',
      },
      {
        title: 'Teaching Tip',
        content:
          'Say it together as soon as your child wakes. Make it the first words of the day. Consistency builds habit.',
        type: 'text',
      },
      {
        title: 'Making It Stick',
        content:
          '1. Put a reminder sign by their bed\n2. Say it together for 21 days straight\n3. Praise them when they remember\n4. Connect it to gratitude: "Allah gave us another day!"',
        type: 'list',
      },
    ],
    relatedModules: ['bedtime_dua'],
  },
  {
    id: 'bedtime_dua',
    type: 'habit',
    title: "Bedtime Duas and Protection",
    description: "Sleep with Allah's protection",
    duration_minutes: 3,
    content: '',
    tags: ['bedtime', 'sleep', 'protection', 'dua'],
    sections: [
      {
        title: 'The Primary Dua',
        content:
          "Bismika Allahumma amutu wa ahya\n\n\"In Your name, O Allah, I die and I live\"",
        type: 'dua',
      },
      {
        title: 'Additional Protection',
        content:
          'The Prophet (peace be upon him) would recite the 3 Quls and blow into his hands, then wipe over his body before sleep.',
        type: 'hadith',
      },
      {
        title: 'Building the Habit',
        content:
          '1. Make it part of the bedtime routine\n2. Recite together, let them repeat\n3. Explain: "We ask Allah to protect us while we sleep"\n4. Be consistent every single night',
        type: 'list',
      },
    ],
    relatedModules: ['morning_dua', 'bedtime_routine'],
  },
  {
    id: 'right_hand',
    type: 'habit',
    title: 'Using the Right Hand',
    description: 'Teaching the Prophetic way for daily tasks',
    duration_minutes: 4,
    content: '',
    tags: ['right hand', 'eating', 'drinking', 'manners'],
    sections: [
      {
        title: 'The Sunnah',
        content:
          'The Prophet (peace be upon him) said: "Let none of you eat with his left hand or drink with it, for Shaytan eats with his left hand and drinks with it."',
        type: 'hadith',
      },
      {
        title: 'When to Use Right Hand',
        content:
          '1. Eating and drinking\n2. Giving and receiving\n3. Shaking hands\n4. Writing (if right-handed)\n5. Entering the masjid',
        type: 'list',
      },
      {
        title: 'Teaching Tips',
        content:
          'Gently remind without shaming. If they forget, simply say "Right hand, habibi" and move on. Praise when they remember.',
        type: 'text',
      },
    ],
    relatedModules: ['bismillah'],
  },
  {
    id: 'salaam',
    type: 'habit',
    title: 'Greeting with Salaam',
    description: 'Spreading peace with every greeting',
    duration_minutes: 3,
    content: '',
    tags: ['salaam', 'greeting', 'peace', 'manners'],
    sections: [
      {
        title: 'The Virtue',
        content:
          'The Prophet (peace be upon him) said: "You will not enter Paradise until you believe, and you will not believe until you love one another. Shall I tell you something which, if you do it, you will love one another? Spread salaam amongst yourselves."',
        type: 'hadith',
      },
      {
        title: 'Teaching Salaam',
        content:
          '1. Model it constantly\n2. Greet them with salaam when they wake\n3. Teach the response: "Wa alaikum assalam"\n4. Practice with family and friends\n5. Explain: "We pray for peace for each other"',
        type: 'list',
      },
    ],
    relatedModules: ['thank_you'],
  },
  {
    id: 'bathroom_dua',
    type: 'habit',
    title: 'Bathroom Duas',
    description: 'Duas for entering and leaving the bathroom',
    duration_minutes: 2,
    content: '',
    tags: ['bathroom', 'toilet', 'dua', 'cleanliness'],
    sections: [
      {
        title: 'Dua Before Entering',
        content:
          "Allahumma inni a'udhu bika minal khubthi wal khaba'ith\n\n\"O Allah, I seek refuge in You from evil and evil ones\"",
        type: 'dua',
      },
      {
        title: 'Dua After Leaving',
        content:
          "Ghufranaka\n\n\"I seek Your forgiveness\"",
        type: 'dua',
      },
      {
        title: 'Making It Habit',
        content:
          '1. Put a small sign on bathroom door\n2. Say it with them every time\n3. Enter with left foot, exit with right\n4. Be patient - this takes time',
        type: 'list',
      },
    ],
    relatedModules: ['wudu'],
  },
  {
    id: 'wudu',
    type: 'habit',
    title: 'Teaching Wudu Step-by-Step',
    description: 'Making ablution a mindful practice',
    duration_minutes: 5,
    content: '',
    tags: ['wudu', 'ablution', 'cleanliness', 'prayer'],
    sections: [
      {
        title: 'Why Start Young',
        content:
          'Children who learn wudu early associate cleanliness with prayer naturally. It becomes second nature.',
        type: 'text',
      },
      {
        title: 'Simple Steps for Kids',
        content:
          '1. Say Bismillah\n2. Wash hands (3x)\n3. Rinse mouth (3x)\n4. Wash nose (3x)\n5. Wash face (3x)\n6. Wash arms to elbows (3x)\n7. Wipe head\n8. Wash feet (3x)',
        type: 'list',
      },
      {
        title: 'Teaching Tips',
        content:
          '1. Start with a visual chart\n2. Do it together\n3. Make it fun, not rushed\n4. Use a stepping stool\n5. Praise their effort',
        type: 'list',
      },
    ],
    relatedModules: ['prayer_motivation', 'bathroom_dua'],
  },
  {
    id: 'thank_you',
    type: 'habit',
    title: 'Saying JazakAllah Khair',
    description: 'Teaching gratitude the Islamic way',
    duration_minutes: 3,
    content: '',
    tags: ['gratitude', 'thanks', 'jazakallah', 'manners'],
    sections: [
      {
        title: 'The Meaning',
        content:
          'JazakAllah Khair means "May Allah reward you with goodness." It\'s more than thank you - it\'s a dua for the person.',
        type: 'text',
      },
      {
        title: 'The Virtue',
        content:
          'The Prophet (peace be upon him) said: "Whoever does not thank people does not thank Allah."',
        type: 'hadith',
      },
      {
        title: 'Teaching It',
        content:
          '1. Use it yourself constantly\n2. Prompt: "What do we say?" \n3. Accept "thank you" but model JazakAllah\n4. Explain it\'s a special dua\n5. Praise when they remember',
        type: 'list',
      },
    ],
    relatedModules: ['salaam', 'bismillah'],
  },
  {
    id: 'sneezing',
    type: 'habit',
    title: 'Sneezing Etiquette and Duas',
    description: 'Alhamdulillah after sneezing',
    duration_minutes: 2,
    content: '',
    tags: ['sneezing', 'alhamdulillah', 'etiquette', 'dua'],
    sections: [
      {
        title: 'The Sunnah',
        content:
          'When sneezing, say: Alhamdulillah (All praise is for Allah)\n\nThe response: Yarhamukallah (May Allah have mercy on you)\n\nThe reply: Yahdikumullah (May Allah guide you)',
        type: 'dua',
      },
      {
        title: 'Teaching Tips',
        content:
          '1. Cover mouth when sneezing\n2. Say Alhamdulillah immediately after\n3. Wait for others to respond\n4. Practice the exchange as a family',
        type: 'list',
      },
    ],
    relatedModules: ['thank_you'],
  },
  {
    id: 'quran_listening',
    type: 'habit',
    title: 'Daily Quran Listening',
    description: 'Building love for Quran through listening',
    duration_minutes: 4,
    content: '',
    tags: ['quran', 'listening', 'recitation', 'daily'],
    sections: [
      {
        title: 'Why Listening Matters',
        content:
          'Before children can read Quran, they can listen. Regular listening builds familiarity, love, and eventually memorization.',
        type: 'text',
      },
      {
        title: 'When to Listen',
        content:
          '1. During car rides\n2. Quiet time / rest\n3. Before bed\n4. During meals (softly)\n5. First thing in the morning',
        type: 'list',
      },
      {
        title: 'Building the Habit',
        content:
          'Start with just 5 minutes daily. Same time, same place. Let it become part of the rhythm of your home.',
        type: 'text',
      },
    ],
    relatedModules: ['morning_dua', 'bedtime_routine'],
  },
];

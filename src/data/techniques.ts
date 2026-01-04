import type { ModuleGuideExtended } from './moduleTypes';

export const PARENTING_TECHNIQUES: ModuleGuideExtended[] = [
  {
    id: 'tantrum_handling',
    type: 'technique',
    title: "Handling Toddler Tantrums the Prophetic Way",
    description: 'Learn gentle techniques rooted in Sunnah for managing meltdowns',
    duration_minutes: 7,
    content: '',
    tags: ['tantrums', 'toddler', 'patience', 'discipline'],
    sections: [
      {
        title: 'The Challenge',
        content:
          "Understanding why tantrums happen and how the Prophet (peace be upon him) approached children's emotions.",
        type: 'text',
      },
      {
        title: 'Islamic Framework',
        content:
          'Allah says in Surah Al-Asr: "...and advise each other to patience" (103:3). The Prophet (peace be upon him) never raised his voice at children.',
        type: 'hadith',
      },
      {
        title: '3 Techniques to Try',
        content: '1. The Calm Down Corner\n2. Name the Feeling\n3. The Dua Pause',
        type: 'list',
      },
      {
        title: 'Dua for This Moment',
        content:
          "Rabbi ishrah li sadri\n\n\"My Lord, expand my chest\"",
        type: 'dua',
      },
    ],
    relatedModules: ['patience_building', 'emotional_regulation'],
  },
  {
    id: 'patience_building',
    type: 'technique',
    title: 'Teaching Sabr (Patience) Through Daily Moments',
    description: 'Build patience in children through everyday opportunities',
    duration_minutes: 5,
    content: '',
    tags: ['patience', 'sabr', 'character', 'daily'],
    sections: [
      {
        title: 'Why Patience Matters',
        content:
          'Sabr is one of the most mentioned virtues in the Quran. Teaching it early builds lifelong resilience.',
        type: 'text',
      },
      {
        title: 'Daily Opportunities',
        content:
          '1. Waiting for food without complaining\n2. Taking turns during play\n3. Waiting for Eid or special occasions\n4. Completing tasks before moving to the next',
        type: 'list',
      },
      {
        title: 'The Prophetic Example',
        content:
          'The Prophet (peace be upon him) said: "Whoever remains patient, Allah will make him patient."',
        type: 'hadith',
      },
    ],
    relatedModules: ['tantrum_handling', 'gentle_correction'],
  },
  {
    id: 'positive_discipline',
    type: 'technique',
    title: 'Positive Discipline Without Yelling',
    description: 'Islamic approaches to setting boundaries with love',
    duration_minutes: 6,
    content: '',
    tags: ['discipline', 'boundaries', 'gentle', 'yelling'],
    sections: [
      {
        title: 'The Challenge',
        content:
          'Yelling feels effective in the moment but damages trust. Islam teaches us a better way.',
        type: 'text',
      },
      {
        title: 'Prophetic Wisdom',
        content:
          'Aisha (may Allah be pleased with her) said: "The Prophet never hit anyone with his hand, nor did he ever raise his voice in anger."',
        type: 'hadith',
      },
      {
        title: 'Alternatives to Yelling',
        content:
          '1. Lower your voice (they lean in to listen)\n2. Get down to eye level\n3. Use "I" statements\n4. Give choices, not commands\n5. Take a breath and say "A\'udhu billah"',
        type: 'list',
      },
    ],
    relatedModules: ['gentle_correction', 'emotional_regulation'],
  },
  {
    id: 'bedtime_routine',
    type: 'technique',
    title: 'Creating a Peaceful Islamic Bedtime Routine',
    description: 'Step-by-step bedtime structure that calms and connects',
    duration_minutes: 8,
    content: '',
    tags: ['bedtime', 'sleep', 'routine', 'duas'],
    sections: [
      {
        title: 'Why Routine Matters',
        content:
          'Children thrive with predictability. A consistent bedtime routine reduces resistance and builds positive sleep associations.',
        type: 'text',
      },
      {
        title: 'The Islamic Bedtime Routine',
        content:
          '1. Wudu together (cleanses body and mind)\n2. Change into sleep clothes\n3. Recite Ayat al-Kursi\n4. Blow on palms and wipe over body (3x)\n5. Short story or reflection\n6. Bedtime dua together',
        type: 'list',
      },
      {
        title: 'Bedtime Dua',
        content:
          "Bismika Allahumma amutu wa ahya\n\n\"In Your name, O Allah, I die and I live\"",
        type: 'dua',
      },
    ],
    relatedModules: ['bedtime_dua', 'screen_time'],
  },
  {
    id: 'screen_time',
    type: 'technique',
    title: 'Screen Time Boundaries with Islamic Principles',
    description: 'Healthy limits rooted in tarbiyah and mindfulness',
    duration_minutes: 6,
    content: '',
    tags: ['screens', 'technology', 'boundaries', 'balance'],
    sections: [
      {
        title: 'The Modern Challenge',
        content:
          'Screens are everywhere. Islam teaches balance (wasatiyyah) in all things, including technology use.',
        type: 'text',
      },
      {
        title: 'Islamic Framework',
        content:
          '"And thus We have made you a just community" (Quran 2:143). Balance applies to screen time too.',
        type: 'hadith',
      },
      {
        title: 'Practical Guidelines',
        content:
          '1. No screens during meals (focus on food, family)\n2. Screen-free zones (bedroom, prayer area)\n3. Quality over quantity (Islamic content)\n4. Screens off 1 hour before bed\n5. Model the behavior you want',
        type: 'list',
      },
    ],
    relatedModules: ['bedtime_routine'],
  },
  {
    id: 'sibling_rivalry',
    type: 'technique',
    title: 'Managing Sibling Conflicts Peacefully',
    description: 'Teaching fairness and mercy between siblings',
    duration_minutes: 7,
    content: '',
    tags: ['siblings', 'conflict', 'fairness', 'peace'],
    sections: [
      {
        title: 'Why Siblings Fight',
        content:
          'Competition for attention, resources, and recognition is natural. Our job is to teach resolution, not elimination of conflict.',
        type: 'text',
      },
      {
        title: 'The Story of Yusuf',
        content:
          "Prophet Yusuf's story teaches us about sibling jealousy and forgiveness. Even prophets' families had conflict - it's how we handle it that matters.",
        type: 'text',
      },
      {
        title: 'Conflict Resolution Steps',
        content:
          '1. Separate (cool down)\n2. Listen to each side\n3. Acknowledge feelings\n4. Problem-solve together\n5. End with reconciliation (hug or handshake)',
        type: 'list',
      },
    ],
    relatedModules: ['gentle_correction', 'emotional_regulation'],
  },
  {
    id: 'picky_eating',
    type: 'technique',
    title: 'Dealing with Picky Eaters',
    description: 'Gratitude-based approach to food challenges',
    duration_minutes: 5,
    content: '',
    tags: ['food', 'eating', 'gratitude', 'health'],
    sections: [
      {
        title: 'Understanding Picky Eating',
        content:
          'Picky eating is developmentally normal, especially ages 2-6. Patience and persistence, not pressure, lead to improvement.',
        type: 'text',
      },
      {
        title: 'The Sunnah of Eating',
        content:
          'The Prophet (peace be upon him) never criticized food. If he liked it, he ate it; if not, he left it without comment.',
        type: 'hadith',
      },
      {
        title: 'Practical Tips',
        content:
          '1. Always say Bismillah together\n2. No pressure, no force\n3. Offer variety, let them choose\n4. Model grateful eating\n5. Involve them in food preparation',
        type: 'list',
      },
    ],
    relatedModules: ['bismillah'],
  },
  {
    id: 'prayer_motivation',
    type: 'technique',
    title: 'Motivating Children to Pray',
    description: 'Making salah a joy, not a chore',
    duration_minutes: 8,
    content: '',
    tags: ['prayer', 'salah', 'motivation', 'worship'],
    sections: [
      {
        title: 'The Goal',
        content:
          'We want children to love prayer, not dread it. This requires patience, modeling, and positive association.',
        type: 'text',
      },
      {
        title: 'The Prophetic Approach',
        content:
          'The Prophet (peace be upon him) said: "Command your children to pray at seven and discipline them for it at ten." Note: command, not force.',
        type: 'hadith',
      },
      {
        title: 'Age-Appropriate Steps',
        content:
          '1. Ages 2-4: Let them watch, play nearby\n2. Ages 5-6: Invite them to stand beside you\n3. Ages 7-9: Gentle reminders, praise attempts\n4. Ages 10+: Consistent expectations with love',
        type: 'list',
      },
      {
        title: 'Making it Joyful',
        content:
          '1. Special prayer clothes/mat for them\n2. Praise their effort, not perfection\n3. Pray together as family\n4. Share why YOU love prayer\n5. Never use prayer as punishment',
        type: 'list',
      },
    ],
    relatedModules: ['wudu'],
  },
  {
    id: 'gentle_correction',
    type: 'technique',
    title: 'Correcting Mistakes with Mercy',
    description: 'How the Prophet (peace be upon him) corrected with love',
    duration_minutes: 6,
    content: '',
    tags: ['correction', 'mistakes', 'mercy', 'guidance'],
    sections: [
      {
        title: 'The Prophetic Method',
        content:
          'The Prophet (peace be upon him) corrected gently, often indirectly, preserving dignity while teaching.',
        type: 'text',
      },
      {
        title: 'A Beautiful Example',
        content:
          'When a young man asked permission to commit zina, the Prophet (peace be upon him) didn\'t scold. He asked: "Would you like this for your mother? Your sister?" The man said no. The Prophet made dua for him.',
        type: 'hadith',
      },
      {
        title: 'Correction Principles',
        content:
          '1. Correct privately, not publicly\n2. Address the behavior, not the child\n3. Explain WHY it was wrong\n4. Offer the right alternative\n5. End with love and encouragement',
        type: 'list',
      },
    ],
    relatedModules: ['positive_discipline', 'patience_building'],
  },
  {
    id: 'emotional_regulation',
    type: 'technique',
    title: 'Teaching Emotional Intelligence',
    description: 'Helping children understand and manage feelings',
    duration_minutes: 7,
    content: '',
    tags: ['emotions', 'feelings', 'intelligence', 'self-awareness'],
    sections: [
      {
        title: 'Why Emotions Matter',
        content:
          'Islam acknowledges all emotions. The Prophet (peace be upon him) cried, felt anger, and expressed joy. Teaching children to manage emotions is essential.',
        type: 'text',
      },
      {
        title: 'The Dua for Anger',
        content:
          "A'udhu billahi minash-shaytanir-rajeem\n\n\"I seek refuge in Allah from the accursed Shaytan\"",
        type: 'dua',
      },
      {
        title: 'Teaching Emotional Vocabulary',
        content:
          '1. Name emotions: "You look frustrated"\n2. Validate: "It\'s okay to feel angry"\n3. Guide: "When angry, we say A\'udhu billah"\n4. Practice: Role-play scenarios\n5. Model: Show how YOU handle emotions',
        type: 'list',
      },
    ],
    relatedModules: ['tantrum_handling', 'gentle_correction'],
  },
];

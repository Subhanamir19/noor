import type { ModuleGuideExtended } from './moduleTypes';

export const ISLAMIC_STORIES: ModuleGuideExtended[] = [
  {
    id: 'prophet_yusuf_patience',
    type: 'story',
    title: "Prophet Yusuf's Patience Through Hardship",
    description: 'How Yusuf (peace be upon him) remained patient when wronged',
    duration_minutes: 7,
    content: '',
    tags: ['yusuf', 'joseph', 'patience', 'trust', 'trials'],
    sections: [
      {
        title: 'The Story (Short Version)',
        content:
          "Prophet Yusuf was thrown in a well by his brothers, sold as a slave, falsely accused, and imprisoned for years. Yet he never complained and always trusted Allah. In the end, he became a powerful minister and forgave his brothers.",
        type: 'text',
      },
      {
        title: 'The Lesson',
        content:
          "When bad things happen, we can choose patience like Yusuf. Allah sees everything and has a plan. Sometimes what seems bad leads to something beautiful.",
        type: 'text',
      },
      {
        title: 'Discussion Questions',
        content:
          "1. How did Yusuf feel when his brothers hurt him?\n2. Why do you think he stayed patient?\n3. When have you needed to be patient?\n4. How did Allah reward Yusuf's patience?",
        type: 'list',
      },
      {
        title: 'Related Dua',
        content:
          "Rabbi inni lima anzalta ilayya min khayrin faqir\n\n\"My Lord, I am in need of whatever good You send down to me\"",
        type: 'dua',
      },
    ],
    relatedModules: ['patience_building', 'sibling_rivalry'],
  },
  {
    id: 'prophet_ibrahim_trust',
    type: 'story',
    title: "Prophet Ibrahim's Trust in Allah",
    description: 'The story of ultimate trust and sacrifice',
    duration_minutes: 8,
    content: '',
    tags: ['ibrahim', 'abraham', 'trust', 'sacrifice', 'obedience'],
    sections: [
      {
        title: 'The Story',
        content:
          "Prophet Ibrahim was tested in many ways. He was thrown into a fire but Allah made it cool. He left his wife and baby Ismail in the desert, trusting Allah. He was even asked to sacrifice his beloved son - and Allah replaced Ismail with a ram at the last moment.",
        type: 'text',
      },
      {
        title: 'The Lesson',
        content:
          "Ibrahim's story teaches us that Allah never abandons those who trust Him. Even when things seem impossible, Allah provides a way.",
        type: 'text',
      },
      {
        title: 'Discussion Questions',
        content:
          "1. Why did Ibrahim trust Allah even in scary situations?\n2. What happened when Ibrahim was thrown in the fire?\n3. How does Allah help us when we're scared?\n4. When do you need to trust Allah?",
        type: 'list',
      },
    ],
    relatedModules: ['prophet_yusuf_patience'],
  },
  {
    id: 'prophet_musa_courage',
    type: 'story',
    title: "Prophet Musa's Courage Against Pharaoh",
    description: "Standing for truth with Allah's help",
    duration_minutes: 9,
    content: '',
    tags: ['musa', 'moses', 'courage', 'truth', 'bravery'],
    sections: [
      {
        title: 'The Story',
        content:
          "Prophet Musa was raised in Pharaoh's palace but learned the truth about Allah. When Allah commanded him to confront Pharaoh, Musa was scared - he even had a stutter. But he asked Allah for help, and with his brother Harun, he bravely delivered Allah's message.",
        type: 'text',
      },
      {
        title: 'The Dua Musa Made',
        content:
          "Rabbi ishrah li sadri wa yassir li amri\n\n\"My Lord, expand my chest and ease my task for me\"",
        type: 'dua',
      },
      {
        title: 'The Lesson',
        content:
          "Even prophets felt scared! The difference is they asked Allah for help and did the right thing anyway. That's true courage - doing what's right even when you're afraid.",
        type: 'text',
      },
      {
        title: 'Discussion Questions',
        content:
          "1. What was Musa scared of?\n2. What did he ask Allah for?\n3. When have you felt scared to do the right thing?\n4. How can we be brave like Musa?",
        type: 'list',
      },
    ],
    relatedModules: ['emotional_regulation'],
  },
  {
    id: 'luqman_wisdom',
    type: 'story',
    title: "Luqman's Wisdom in Teaching His Son",
    description: 'Timeless parenting advice from the Quran',
    duration_minutes: 6,
    content: '',
    tags: ['luqman', 'wisdom', 'parenting', 'advice', 'guidance'],
    sections: [
      {
        title: 'Who Was Luqman',
        content:
          "Luqman was a wise man mentioned in the Quran. Allah gave him wisdom and he used it to teach his son. His advice is in Surah Luqman (Chapter 31).",
        type: 'text',
      },
      {
        title: "Luqman's Advice",
        content:
          "1. Don't associate partners with Allah\n2. Be grateful to your parents\n3. Establish prayer\n4. Enjoin good and forbid wrong\n5. Be patient with what befalls you\n6. Don't be arrogant\n7. Be moderate in your walk and lower your voice",
        type: 'list',
      },
      {
        title: 'The Lesson',
        content:
          "This is a guide for parents on WHAT to teach children. Notice how Luqman taught with love and wisdom, not harshness.",
        type: 'text',
      },
      {
        title: 'Discussion Questions',
        content:
          "1. Which piece of advice do you like most?\n2. Why is being grateful important?\n3. What does it mean to 'lower your voice'?\n4. How can we follow Luqman's advice?",
        type: 'list',
      },
    ],
    relatedModules: ['gentle_correction'],
  },
  {
    id: 'ashaab_al_kahf',
    type: 'story',
    title: 'The People of the Cave (Faith in Hardship)',
    description: 'Young believers who never gave up their faith',
    duration_minutes: 8,
    content: '',
    tags: ['cave', 'faith', 'perseverance', 'youth', 'belief'],
    sections: [
      {
        title: 'The Story',
        content:
          "A group of young people lived in a land where the king forced everyone to worship idols. They refused and believed in Allah alone. To escape persecution, they fled to a cave where Allah made them sleep for over 300 years. When they woke, the whole land had become Muslim!",
        type: 'text',
      },
      {
        title: 'The Lesson',
        content:
          "These were YOUNG people who stood up for their faith when adults around them didn't. Allah protected them and changed the entire society. Never think you're too young to stand for what's right.",
        type: 'text',
      },
      {
        title: 'Discussion Questions',
        content:
          "1. Why did the youth leave their homes?\n2. How did Allah protect them?\n3. What would you do if friends asked you to do something wrong?\n4. How can young people today stand for Islam?",
        type: 'list',
      },
    ],
    relatedModules: ['prophet_ibrahim_trust'],
  },
  {
    id: 'prophet_nuh_perseverance',
    type: 'story',
    title: "Prophet Nuh's 950 Years of Patience",
    description: 'Never giving up on doing good',
    duration_minutes: 7,
    content: '',
    tags: ['nuh', 'noah', 'patience', 'perseverance', 'dawah'],
    sections: [
      {
        title: 'The Story',
        content:
          "Prophet Nuh called his people to Allah for 950 years! They mocked him, threatened him, and very few believed. But he never gave up. When Allah's command came, he built the ark and saved the believers from the flood.",
        type: 'text',
      },
      {
        title: 'The Lesson',
        content:
          "Nuh's story teaches us to never give up on doing good, even if results are slow. Our job is to try - success is from Allah.",
        type: 'text',
      },
      {
        title: 'Discussion Questions',
        content:
          "1. How long did Nuh teach his people?\n2. Why didn't he give up?\n3. Is it hard to keep trying when people don't listen?\n4. What's something good you keep trying to do?",
        type: 'list',
      },
    ],
    relatedModules: ['patience_building'],
  },
  {
    id: 'boy_lunch_generosity',
    type: 'story',
    title: 'The Boy Who Shared His Lunch',
    description: 'Generosity brings blessings (from Hadith)',
    duration_minutes: 5,
    content: '',
    tags: ['generosity', 'sharing', 'barakah', 'kindness'],
    sections: [
      {
        title: 'The Story',
        content:
          "A companion brought his young son to visit the Prophet (peace be upon him). The boy had just a little bit of food with him. When food was being distributed and there wasn't enough, the boy shared what he had. The Prophet blessed that food and it fed many people!",
        type: 'text',
      },
      {
        title: 'The Lesson',
        content:
          "When we share, Allah puts barakah (blessing) in what remains. A little shared is worth more than a lot kept selfishly.",
        type: 'text',
      },
      {
        title: 'Discussion Questions',
        content:
          "1. Why did the boy share his food?\n2. What happened because he shared?\n3. Have you ever shared something and felt happy?\n4. What can you share with others?",
        type: 'list',
      },
    ],
    relatedModules: ['thank_you', 'sibling_rivalry'],
  },
  {
    id: 'prophet_sulaiman_gratitude',
    type: 'story',
    title: "Prophet Sulaiman's Gratitude for Blessings",
    description: 'Power and humility together',
    duration_minutes: 6,
    content: '',
    tags: ['sulaiman', 'solomon', 'gratitude', 'humility', 'power'],
    sections: [
      {
        title: 'The Story',
        content:
          "Prophet Sulaiman was given incredible powers - he could command the wind, speak to animals, and control the jinn. He had wealth and a magnificent kingdom. Yet despite all this, he remained humble and always thanked Allah.",
        type: 'text',
      },
      {
        title: "Sulaiman's Dua",
        content:
          "Rabbi awzi'ni an ashkura ni'mataka\n\n\"My Lord, inspire me to be grateful for Your favor\"",
        type: 'dua',
      },
      {
        title: 'The Lesson',
        content:
          "No matter how much we have, we should always be grateful and humble. Everything is from Allah and can be taken away. Gratitude brings more blessings.",
        type: 'text',
      },
      {
        title: 'Discussion Questions',
        content:
          "1. What special abilities did Sulaiman have?\n2. Why was he still humble?\n3. What blessings do you have to be grateful for?\n4. How can we show gratitude to Allah?",
        type: 'list',
      },
    ],
    relatedModules: ['thank_you'],
  },
  {
    id: 'prophet_ayyub_endurance',
    type: 'story',
    title: "Prophet Ayyub's Endurance in Illness",
    description: 'Faith through the hardest trials',
    duration_minutes: 7,
    content: '',
    tags: ['ayyub', 'job', 'illness', 'endurance', 'faith'],
    sections: [
      {
        title: 'The Story',
        content:
          "Prophet Ayyub was wealthy and healthy, and he thanked Allah. Then Allah tested him - he lost his wealth, his children, and his health. He became so ill that people avoided him. But he never complained against Allah. After years of patience, Allah restored everything and gave him more.",
        type: 'text',
      },
      {
        title: "Ayyub's Dua",
        content:
          "Anni massaniyad-durru wa anta arhamur-rahimeen\n\n\"Indeed, adversity has touched me, and You are the Most Merciful of the merciful\"",
        type: 'dua',
      },
      {
        title: 'The Lesson',
        content:
          "When we're sick or sad, we can still turn to Allah. Complaining to Allah (in dua) is different from complaining about Allah. Ayyub asked for help but never lost faith.",
        type: 'text',
      },
      {
        title: 'Discussion Questions',
        content:
          "1. What happened to Ayyub?\n2. Did he stop believing in Allah?\n3. What did he say to Allah?\n4. How should we act when something bad happens?",
        type: 'list',
      },
    ],
    relatedModules: ['patience_building'],
  },
  {
    id: 'prophet_yunus_repentance',
    type: 'story',
    title: 'Prophet Yunus and the Whale',
    description: 'Turning back to Allah in hardship',
    duration_minutes: 6,
    content: '',
    tags: ['yunus', 'jonah', 'whale', 'repentance', 'tawbah'],
    sections: [
      {
        title: 'The Story',
        content:
          "Prophet Yunus called his people to Allah but they didn't listen. He left them in frustration before Allah gave him permission. He boarded a ship that faced a storm, and the sailors cast lots - Yunus was thrown overboard. A whale swallowed him! In the darkness, he turned to Allah with sincere repentance, and Allah saved him.",
        type: 'text',
      },
      {
        title: "The Powerful Dua",
        content:
          "La ilaha illa anta subhanaka inni kuntu minaz-zalimeen\n\n\"There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers\"",
        type: 'dua',
      },
      {
        title: 'The Lesson',
        content:
          "Everyone makes mistakes, even prophets. What matters is turning back to Allah sincerely. No situation is too dark for Allah's mercy to reach.",
        type: 'text',
      },
      {
        title: 'Discussion Questions',
        content:
          "1. What mistake did Yunus make?\n2. What did he say to Allah inside the whale?\n3. What happened after he made dua?\n4. What should we do when we make mistakes?",
        type: 'list',
      },
    ],
    relatedModules: ['gentle_correction'],
  },
];

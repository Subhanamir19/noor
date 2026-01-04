import type { InterventionType } from '@/types/models';

export interface CoachingScript {
  id: string;
  interventionType: InterventionType;
  traitId: string | null; // null means generic/any trait
  title: string;
  message: string;
  encouragement: string;
  challenge?: {
    text: string;
    durationHours: number;
  };
  islamicWisdom?: {
    arabic?: string;
    translation: string;
    source: string;
  };
}

// First struggle scripts - empathetic, normalizing
const FIRST_STRUGGLE_SCRIPTS: CoachingScript[] = [
  {
    id: 'fs_honesty_1',
    interventionType: 'first_struggle',
    traitId: 'honesty',
    title: 'A Moment of Growth',
    message: "You noticed a struggle with honesty. That awareness itself is valuable - the Prophet ﷺ said truthfulness leads to righteousness. Every parent faces these moments.",
    encouragement: "This is a teaching opportunity, not a failure.",
    challenge: {
      text: "Tonight, share a story about honesty with your child before bed.",
      durationHours: 24,
    },
    islamicWisdom: {
      arabic: "عَلَيْكُمْ بِالصِّدْقِ",
      translation: "You must be truthful",
      source: "Sahih Muslim",
    },
  },
  {
    id: 'fs_patience_1',
    interventionType: 'first_struggle',
    traitId: 'patience',
    title: 'Patience is a Journey',
    message: "Patience (sabr) is one of the most mentioned virtues in the Quran - it's challenging because it's so important. You're teaching your child something profound.",
    encouragement: "Allah is with those who are patient.",
    challenge: {
      text: "Practice the 'pause and breathe' technique together with your child today.",
      durationHours: 24,
    },
    islamicWisdom: {
      arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
      translation: "Indeed, Allah is with the patient",
      source: "Quran 2:153",
    },
  },
  {
    id: 'fs_kindness_1',
    interventionType: 'first_struggle',
    traitId: 'kindness',
    title: 'Kindness Takes Practice',
    message: "Teaching kindness (ihsan) is a gradual process. Children learn empathy through repeated experiences and modeling. One struggle doesn't define the journey.",
    encouragement: "Your awareness shows you care deeply.",
    challenge: {
      text: "Do one act of kindness together as a family today.",
      durationHours: 24,
    },
    islamicWisdom: {
      translation: "Allah loves those who do good (muhsineen)",
      source: "Quran 2:195",
    },
  },
  {
    id: 'fs_gratitude_1',
    interventionType: 'first_struggle',
    traitId: 'gratitude',
    title: 'Growing in Gratitude',
    message: "Gratitude (shukr) is a skill that develops over time. Young children are naturally self-focused - teaching them to notice blessings is important work.",
    encouragement: "You're planting seeds that will bloom.",
    challenge: {
      text: "Name 3 things you're grateful for together at dinner tonight.",
      durationHours: 24,
    },
    islamicWisdom: {
      arabic: "لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ",
      translation: "If you are grateful, I will surely increase you",
      source: "Quran 14:7",
    },
  },
  {
    id: 'fs_respect_1',
    interventionType: 'first_struggle',
    traitId: 'respect',
    title: 'Building Respect',
    message: "Respect for parents and others is foundational in Islam. Children test boundaries - it's developmentally normal and an opportunity to teach.",
    encouragement: "Consistency and patience will win.",
    challenge: {
      text: "Practice using 'please' and 'thank you' in every request today.",
      durationHours: 24,
    },
    islamicWisdom: {
      translation: "And lower to them the wing of humility out of mercy",
      source: "Quran 17:24",
    },
  },
  {
    id: 'fs_generosity_1',
    interventionType: 'first_struggle',
    traitId: 'generosity',
    title: 'Learning to Share',
    message: "Generosity doesn't come naturally to young children - they're learning that sharing doesn't mean losing. This is normal development.",
    encouragement: "Small steps lead to generous hearts.",
    challenge: {
      text: "Help your child choose one toy to share with a sibling or friend today.",
      durationHours: 24,
    },
    islamicWisdom: {
      translation: "The generous one is close to Allah, close to people",
      source: "Tirmidhi",
    },
  },
  {
    id: 'fs_responsibility_1',
    interventionType: 'first_struggle',
    traitId: 'responsibility',
    title: 'Growing Responsibility',
    message: "Taking responsibility is a mature trait that develops gradually. Children need many chances to practice owning their actions.",
    encouragement: "Every correction is a lesson learned.",
    challenge: {
      text: "Give your child one small task they can 'own' completely today.",
      durationHours: 24,
    },
  },
  {
    id: 'fs_courage_1',
    interventionType: 'first_struggle',
    traitId: 'courage',
    title: 'Building Bravery',
    message: "Courage isn't the absence of fear - it's acting despite fear. Your child is learning to face challenges, and that takes time.",
    encouragement: "Brave children are made, not born.",
    challenge: {
      text: "Encourage your child to try one small thing that feels scary today.",
      durationHours: 24,
    },
    islamicWisdom: {
      translation: "Be strong, for strength comes from Allah",
      source: "Islamic teaching",
    },
  },
  {
    id: 'fs_generic_1',
    interventionType: 'first_struggle',
    traitId: null,
    title: 'Part of the Journey',
    message: "Every parent faces challenges - you're not alone. The fact that you're tracking and reflecting shows tremendous dedication to your child's character.",
    encouragement: "Progress isn't always linear.",
    challenge: {
      text: "Take 5 minutes today to appreciate one good quality in your child.",
      durationHours: 24,
    },
  },
];

// Repeated struggle scripts - still supportive but offering strategies
const REPEATED_STRUGGLE_SCRIPTS: CoachingScript[] = [
  {
    id: 'rs_honesty_1',
    interventionType: 'repeated',
    traitId: 'honesty',
    title: "Let's Try Something New",
    message: "Honesty struggles often have underlying causes - fear of punishment, desire to please, or testing boundaries. Understanding the 'why' helps address the root.",
    encouragement: "New approaches can unlock progress.",
    challenge: {
      text: "When your child tells the truth today (even a small thing), celebrate it specifically.",
      durationHours: 48,
    },
  },
  {
    id: 'rs_honesty_2',
    interventionType: 'repeated',
    traitId: 'honesty',
    title: 'Creating Safety for Truth',
    message: "Children lie less when they feel safe. Consider: how do you typically react when your child makes a mistake? A calm response invites honesty.",
    encouragement: "Safe spaces grow honest hearts.",
    challenge: {
      text: "Today, when your child admits something, respond with 'Thank you for telling me' before addressing the behavior.",
      durationHours: 48,
    },
    islamicWisdom: {
      arabic: "الصِّدْقُ طُمَأْنِينَةٌ",
      translation: "Truthfulness is tranquility",
      source: "Tirmidhi",
    },
  },
  {
    id: 'rs_patience_1',
    interventionType: 'repeated',
    traitId: 'patience',
    title: 'Patience Strategies',
    message: "Repeated patience struggles might mean your child needs more tools. Try the 'traffic light' method: Red = stop, Yellow = think, Green = respond calmly.",
    encouragement: "Tools make patience easier.",
    challenge: {
      text: "Introduce the traffic light method and practice it together 3 times today.",
      durationHours: 48,
    },
  },
  {
    id: 'rs_patience_2',
    interventionType: 'repeated',
    traitId: 'patience',
    title: 'Understanding Triggers',
    message: "Does your child struggle with patience at specific times? Tired, hungry, or overstimulated children have less capacity for patience. Prevention helps.",
    encouragement: "Knowing triggers is half the battle.",
    challenge: {
      text: "Notice and write down the circumstances of the next patience struggle.",
      durationHours: 48,
    },
  },
  {
    id: 'rs_kindness_1',
    interventionType: 'repeated',
    traitId: 'kindness',
    title: 'Deepening Kindness',
    message: "Some children struggle with kindness when they feel their own needs aren't met. Check in: does your child feel heard and valued?",
    encouragement: "Filled hearts overflow with kindness.",
    challenge: {
      text: "Spend 15 minutes of undivided attention with your child today.",
      durationHours: 48,
    },
  },
  {
    id: 'rs_gratitude_1',
    interventionType: 'repeated',
    traitId: 'gratitude',
    title: 'Making Gratitude Visible',
    message: "Gratitude is abstract for children. Making it concrete helps - try a gratitude jar where you write down good things together.",
    encouragement: "Visible reminders build lasting habits.",
    challenge: {
      text: "Start a gratitude jar or board with your child today.",
      durationHours: 48,
    },
    islamicWisdom: {
      translation: "He who does not thank people, does not thank Allah",
      source: "Tirmidhi",
    },
  },
  {
    id: 'rs_respect_1',
    interventionType: 'repeated',
    traitId: 'respect',
    title: 'Modeling Respect',
    message: "Children learn respect by experiencing it. How do we speak to them? Do we interrupt them? Modeling the behavior we want is powerful.",
    encouragement: "Children mirror what they see.",
    challenge: {
      text: "Today, practice asking your child's opinion and waiting for their full answer.",
      durationHours: 48,
    },
  },
  {
    id: 'rs_generosity_1',
    interventionType: 'repeated',
    traitId: 'generosity',
    title: 'The Joy of Giving',
    message: "Help your child experience the joy of giving. When they see someone's happiness at receiving, generosity becomes rewarding.",
    encouragement: "Joy in giving is contagious.",
    challenge: {
      text: "Let your child choose something to give away and witness the recipient's reaction.",
      durationHours: 48,
    },
    islamicWisdom: {
      arabic: "الْيَدُ الْعُلْيَا خَيْرٌ مِنَ الْيَدِ السُّفْلَى",
      translation: "The upper hand (giving) is better than the lower hand (receiving)",
      source: "Bukhari",
    },
  },
  {
    id: 'rs_responsibility_1',
    interventionType: 'repeated',
    traitId: 'responsibility',
    title: 'Ownership, Not Blame',
    message: "Children avoid responsibility when they fear blame. Focus on solutions, not fault. 'What can we do to fix this?' works better than 'Why did you do that?'",
    encouragement: "Solution-focus builds responsibility.",
    challenge: {
      text: "Use 'What can we do?' instead of 'Why did you?' in your next correction.",
      durationHours: 48,
    },
  },
  {
    id: 'rs_courage_1',
    interventionType: 'repeated',
    traitId: 'courage',
    title: 'Small Steps to Brave',
    message: "Courage grows through small successes. Break scary things into tiny steps. If talking to adults is hard, start with just saying 'hi' to one person.",
    encouragement: "Tiny brave acts build mighty courage.",
    challenge: {
      text: "Help your child identify one small brave step they can take today.",
      durationHours: 48,
    },
    islamicWisdom: {
      translation: "Allah does not burden a soul beyond that it can bear",
      source: "Quran 2:286",
    },
  },
  {
    id: 'rs_generic_1',
    interventionType: 'repeated',
    traitId: null,
    title: 'Trying New Approaches',
    message: "When a pattern emerges, it's a signal to try something different. What worked before might need adjustment as your child grows.",
    encouragement: "Flexibility is a parenting superpower.",
    challenge: {
      text: "Try one new approach to this challenge today and note what happens.",
      durationHours: 48,
    },
  },
  {
    id: 'rs_generic_2',
    interventionType: 'repeated',
    traitId: null,
    title: 'The Power of Connection',
    message: "Before correction, connection. Children respond better to guidance when they feel close to us. A hug before a hard conversation goes a long way.",
    encouragement: "Connection before correction.",
    challenge: {
      text: "Before your next correction, spend 2 minutes connecting first.",
      durationHours: 48,
    },
    islamicWisdom: {
      translation: "Be gentle, for gentleness is not found in anything except that it adds to its beauty",
      source: "Sahih Muslim",
    },
  },
];

// Persistent struggle scripts - more direct, possibly suggesting external support
const PERSISTENT_STRUGGLE_SCRIPTS: CoachingScript[] = [
  {
    id: 'ps_honesty_1',
    interventionType: 'persistent',
    traitId: 'honesty',
    title: 'Understanding Deeper',
    message: "Persistent honesty struggles may signal that something bigger is at play. Children lie chronically when they feel unsafe, have anxiety, or are imitating behavior they see.",
    encouragement: "Getting to the root brings lasting change.",
    challenge: {
      text: "Have a calm, non-judgmental conversation about what makes telling the truth feel scary.",
      durationHours: 72,
    },
    islamicWisdom: {
      translation: "Speak gently to them, perhaps they may be reminded",
      source: "Quran 20:44",
    },
  },
  {
    id: 'ps_patience_1',
    interventionType: 'persistent',
    traitId: 'patience',
    title: 'Patience and Regulation',
    message: "Ongoing patience struggles might indicate emotional regulation challenges. Some children need extra support learning to manage big feelings.",
    encouragement: "Professional guidance can make a big difference.",
    challenge: {
      text: "Research one local resource for child emotional development or talk to your pediatrician.",
      durationHours: 72,
    },
  },
  {
    id: 'ps_kindness_1',
    interventionType: 'persistent',
    traitId: 'kindness',
    title: 'Kindness and Empathy',
    message: "Persistent unkindness can sometimes reflect difficulty with empathy or unmet emotional needs. Understanding this helps us respond with compassion.",
    encouragement: "Every child can learn kindness with the right support.",
    challenge: {
      text: "Observe when unkind behavior happens most - what might be triggering it?",
      durationHours: 72,
    },
  },
  {
    id: 'ps_generic_1',
    interventionType: 'persistent',
    traitId: null,
    title: 'You Are Not Alone',
    message: "Persistent challenges are sometimes developmental phases, and sometimes signs that extra support could help. There's no shame in seeking guidance.",
    encouragement: "Seeking help is strength, not weakness.",
    challenge: {
      text: "Consider discussing this pattern with a trusted family member, teacher, or counselor.",
      durationHours: 72,
    },
    islamicWisdom: {
      translation: "Consult them in affairs",
      source: "Quran 3:159",
    },
  },
  {
    id: 'ps_generic_2',
    interventionType: 'persistent',
    traitId: null,
    title: 'A Time to Reflect',
    message: "Consistent struggles often have deeper roots. Take a moment to consider: stress at home, changes in routine, social challenges, or developmental phases.",
    encouragement: "Understanding leads to solutions.",
    challenge: {
      text: "Journal about possible underlying causes for 10 minutes today.",
      durationHours: 72,
    },
  },
  {
    id: 'ps_generic_3',
    interventionType: 'persistent',
    traitId: null,
    title: 'Self-Compassion First',
    message: "Parenting a child through persistent challenges is exhausting. You need support too. Taking care of yourself isn't selfish - it's necessary.",
    encouragement: "You can't pour from an empty cup.",
    challenge: {
      text: "Do one thing for yourself today - even 10 minutes of quiet time counts.",
      durationHours: 72,
    },
    islamicWisdom: {
      translation: "Your body has a right over you",
      source: "Bukhari",
    },
  },
  {
    id: 'ps_generic_4',
    interventionType: 'persistent',
    traitId: null,
    title: 'The Long View',
    message: "Character development is a marathon, not a sprint. Some children need years to develop certain traits. Your consistent effort matters, even when results feel slow.",
    encouragement: "The seeds you plant today will bloom.",
    challenge: {
      text: "Write down three small improvements you've noticed over the past month.",
      durationHours: 72,
    },
    islamicWisdom: {
      arabic: "إِنَّ مَعَ الْعُسْرِ يُسْرًا",
      translation: "Indeed, with hardship comes ease",
      source: "Quran 94:6",
    },
  },
];

// No wins scripts - focused on encouragement and finding positives
const NO_WINS_SCRIPTS: CoachingScript[] = [
  {
    id: 'nw_generic_1',
    interventionType: 'no_wins',
    traitId: null,
    title: 'Finding the Good',
    message: "It's been a while since you logged a positive moment. Remember - small wins count! Did your child use a kind word? Share even briefly? Those moments matter.",
    encouragement: "Look for the tiny victories today.",
    challenge: {
      text: "Find and log at least one small positive moment today, no matter how tiny.",
      durationHours: 24,
    },
  },
  {
    id: 'nw_generic_2',
    interventionType: 'no_wins',
    traitId: null,
    title: 'Celebrate Progress',
    message: "Sometimes we focus so much on what needs improvement that we miss what's going well. Your child has good qualities - let's notice them together.",
    encouragement: "What you focus on grows.",
    challenge: {
      text: "Tell your child three specific things you appreciate about them today.",
      durationHours: 24,
    },
    islamicWisdom: {
      translation: "Give glad tidings",
      source: "Quran 2:25",
    },
  },
  {
    id: 'nw_generic_3',
    interventionType: 'no_wins',
    traitId: null,
    title: 'The Positivity Lens',
    message: "Our brains are wired to notice problems - it takes intentional effort to see the good. Try 'catching' your child being good today.",
    encouragement: "Train your eyes to see the light.",
    challenge: {
      text: "Set 3 random reminders today to notice what your child is doing right at that moment.",
      durationHours: 24,
    },
  },
  {
    id: 'nw_generic_4',
    interventionType: 'no_wins',
    traitId: null,
    title: 'Lower the Bar (Temporarily)',
    message: "Sometimes we set such high standards that we miss the progress. Did your child's tantrum last 5 minutes instead of 10? That's growth!",
    encouragement: "Progress, not perfection.",
    challenge: {
      text: "Notice one moment where things went even slightly better than they could have.",
      durationHours: 24,
    },
    islamicWisdom: {
      translation: "Take what is given freely, enjoin what is good",
      source: "Quran 7:199",
    },
  },
  {
    id: 'nw_honesty_1',
    interventionType: 'no_wins',
    traitId: 'honesty',
    title: 'Honesty in Small Things',
    message: "Honesty shows up in small moments. Did your child admit to eating a cookie? Tell you about their day honestly? Those count!",
    encouragement: "Small truths build big trust.",
    challenge: {
      text: "Notice any moment of honesty today, even about tiny things.",
      durationHours: 24,
    },
  },
  {
    id: 'nw_patience_1',
    interventionType: 'no_wins',
    traitId: 'patience',
    title: 'Patience Glimpses',
    message: "Patience shows up in brief moments. Did your child wait even 30 seconds without complaining? Let someone go first? Notice these wins!",
    encouragement: "Patience grows one moment at a time.",
    challenge: {
      text: "Catch your child waiting patiently for anything today, even briefly.",
      durationHours: 24,
    },
  },
  {
    id: 'nw_kindness_1',
    interventionType: 'no_wins',
    traitId: 'kindness',
    title: 'Kindness Spotting',
    message: "Kindness comes in many forms. A gentle touch, a shared snack, helping without being asked - look for any kindness today.",
    encouragement: "Kindness blooms when noticed.",
    challenge: {
      text: "Find one kind action your child does today and name it out loud.",
      durationHours: 24,
    },
    islamicWisdom: {
      translation: "A kind word is charity",
      source: "Bukhari & Muslim",
    },
  },
];

// All scripts combined
export const COACHING_SCRIPTS: CoachingScript[] = [
  ...FIRST_STRUGGLE_SCRIPTS,
  ...REPEATED_STRUGGLE_SCRIPTS,
  ...PERSISTENT_STRUGGLE_SCRIPTS,
  ...NO_WINS_SCRIPTS,
];

/**
 * Get scripts for a specific intervention type and optionally trait
 */
export function getScriptsForIntervention(
  type: InterventionType,
  traitId?: string
): CoachingScript[] {
  return COACHING_SCRIPTS.filter(
    (script) =>
      script.interventionType === type &&
      (script.traitId === null || script.traitId === traitId)
  );
}

/**
 * Get a random script for the given intervention type and trait
 * Prefers trait-specific scripts but falls back to generic
 */
export function getRandomScript(
  type: InterventionType,
  traitId?: string
): CoachingScript | null {
  const scripts = getScriptsForIntervention(type, traitId);

  if (scripts.length === 0) {
    // Fall back to generic scripts for this type
    const genericScripts = COACHING_SCRIPTS.filter(
      (s) => s.interventionType === type && s.traitId === null
    );
    if (genericScripts.length === 0) return null;
    return genericScripts[Math.floor(Math.random() * genericScripts.length)];
  }

  // Prefer trait-specific scripts (70% chance if available)
  const traitSpecific = scripts.filter((s) => s.traitId === traitId);
  const generic = scripts.filter((s) => s.traitId === null);

  if (traitSpecific.length > 0 && Math.random() < 0.7) {
    return traitSpecific[Math.floor(Math.random() * traitSpecific.length)];
  }

  if (generic.length > 0) {
    return generic[Math.floor(Math.random() * generic.length)];
  }

  return scripts[Math.floor(Math.random() * scripts.length)];
}

/**
 * Get script by ID
 */
export function getScriptById(id: string): CoachingScript | null {
  return COACHING_SCRIPTS.find((s) => s.id === id) || null;
}

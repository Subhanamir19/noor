/**
 * Today's Tarbiyah - Daily Character Lessons
 *
 * Each lesson follows the 5-step structure:
 * 1. The Moment - Real scenario, what child is feeling
 * 2. The Sunnah - Islamic principle with practical meaning
 * 3. Why It Works - Child psychology explanation
 * 4. Today's Action - One clear behavior to try
 * 5. The Repair - What to say if you already messed up
 *
 * Traits covered: Sabr, Shukr, Sidq, Rahma, Adab, Tawakkul, Ihsan, Haya
 */

export type TarbiyahTrait =
  | 'sabr' // Patience
  | 'shukr' // Gratitude
  | 'sidq' // Truthfulness
  | 'rahma' // Mercy/Compassion
  | 'adab' // Manners/Respect
  | 'tawakkul' // Trust in Allah
  | 'ihsan' // Excellence
  | 'haya'; // Modesty/Shyness

export interface TarbiyahStep {
  title: string;
  content: string;
  highlight?: string; // Key phrase to emphasize
  arabicText?: string;
  arabicTranslation?: string;
  reference?: string;
}

export interface TarbiyahLesson {
  id: string;
  dayNumber: number;
  trait: TarbiyahTrait;
  title: string;
  subtitle: string;
  steps: {
    moment: TarbiyahStep;
    sunnah: TarbiyahStep;
    whyItWorks: TarbiyahStep;
    todaysAction: TarbiyahStep;
    repair: TarbiyahStep;
  };
  tomorrowTeaser: string;
}

export const TARBIYAH_LESSONS: TarbiyahLesson[] = [
  // ═══════════════════════════════════════════════════════════════
  // DAY 1: SABR - When They Won't Listen
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-001-sabr-wont-listen',
    dayNumber: 1,
    trait: 'sabr',
    title: 'When They Won\'t Listen',
    subtitle: 'Teaching patience through your own calm',
    steps: {
      moment: {
        title: 'The Moment',
        content: `"Put your shoes on. We're late."

Nothing.

"I said PUT YOUR SHOES ON."

Your 4-year-old is staring at a ladybug on the floor. You've said it three times. The car is running. You're already late. The anger is building in your chest.

You want to yell. You want to grab them and force the shoes on.`,
        highlight: 'What they\'re actually feeling:',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'لَا تَغْضَبْ',
        arabicTranslation: '"Do not get angry."',
        reference: 'Sahih Bukhari 6116',
        content: `A man came to the Prophet ﷺ and asked for advice. The Prophet ﷺ said: "Do not get angry." The man asked again and again, and each time the Prophet ﷺ repeated: "Do not get angry."

Notice: He didn't say "never feel anger." He said don't act on it. The feeling will come. What you do next is the teaching moment.`,
        highlight: 'What you do next is the teaching moment.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Your child's brain is still developing the prefrontal cortex — the part that handles focus, planning, and following instructions.

When you yell, their brain goes into "threat mode." They literally cannot process your words anymore. They can only feel fear.

But when you pause and lower your voice, something remarkable happens: their nervous system mirrors yours. Calm spreads.

They don't learn obedience from yelling. They learn fear. They learn obedience from watching you control yourself when it's hard.`,
        highlight: 'They learn obedience from watching you control yourself when it\'s hard.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `The next time you feel the urge to raise your voice, try this:

Say out loud: "I need a moment."

Then take 3 deep breaths. Just 3.

After that, get down to their eye level and speak slowly:

"I need you to put your shoes on now. Can you do that for me?"

That's it. No lecture. No explanation of why you're late. Just calm instruction.`,
        highlight: '"I need a moment."',
      },
      repair: {
        title: 'Already Lost Your Temper Today?',
        content: `It happens. You're human. Here's how to repair:

Go to your child when things are calm. Get down to their level and say:

"I'm sorry I raised my voice earlier. That wasn't kind. I was feeling frustrated, but that's not your fault. Can we try again tomorrow?"

Then give them a hug.

Repair builds more trust than perfection ever could. Your child doesn't need a perfect parent. They need a parent who tries again.`,
        highlight: '"I\'m sorry I raised my voice earlier. That wasn\'t kind."',
      },
    },
    tomorrowTeaser: 'Teaching Gratitude at Mealtime',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 2: SHUKR - Gratitude at Mealtime
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-002-shukr-mealtime',
    dayNumber: 2,
    trait: 'shukr',
    title: 'Gratitude at Mealtime',
    subtitle: 'Making thankfulness feel natural, not forced',
    steps: {
      moment: {
        title: 'The Moment',
        content: `You've spent 45 minutes making dinner. You're exhausted. You set the plate down.

"I don't like this. I want nuggets."

They haven't even tried it. Your heart sinks. The words "Do you know how hard I worked on this?" are ready to come out.

But that will only make them defensive. They're not ungrateful — they just don't have the tools yet.`,
        highlight: 'They\'re not ungrateful — they just don\'t have the tools yet.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'مَا عَابَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ طَعَامًا قَطُّ',
        arabicTranslation: '"The Prophet ﷺ never criticized any food."',
        reference: 'Sahih Bukhari 5409',
        content: `If he liked it, he ate it. If he didn't, he left it without complaint.

He didn't lecture. He didn't guilt. He simply modeled.

Gratitude isn't taught through shame. It's caught through watching someone else practice it quietly.`,
        highlight: 'Gratitude isn\'t taught through shame. It\'s caught.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Children don't understand effort yet. Their brains are wired for immediate sensation: taste, texture, temperature.

When you guilt them ("Do you know how hard I worked?"), they feel shame but don't connect it to gratitude. Shame blocks learning.

But when you model gratitude yourself — out loud, without expecting them to copy — you plant seeds. Over months, those seeds grow.

"Alhamdulillah, I'm so grateful we have warm food tonight."

They're listening. Even when they don't seem to be.`,
        highlight: 'They\'re listening. Even when they don\'t seem to be.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `At your next meal, before anyone eats, say this out loud:

"Alhamdulillah for this food. Allah gave us something warm to eat today."

Don't ask your child to repeat it. Don't make it a lesson. Just say it yourself, sincerely, and start eating.

If they complain about the food, respond simply:

"You don't have to eat it. But we don't complain about food in this house."

Then continue eating. No lecture.`,
        highlight: '"Alhamdulillah for this food."',
      },
      repair: {
        title: 'Already Guilted Them About Food?',
        content: `We've all done it. The "starving children" lecture. The heavy sigh. The hurt look.

Here's how to reset:

At a calm moment, say:

"Remember when I got upset about dinner? I wasn't being fair. You're allowed to not like things. I just ask that we don't complain. Can we agree on that?"

This teaches them: feelings are okay. Unkind words are not. And adults can admit when they were wrong too.`,
        highlight: '"You\'re allowed to not like things."',
      },
    },
    tomorrowTeaser: 'When They Tell a Lie',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 3: SIDQ - When They Tell a Lie
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-003-sidq-lying',
    dayNumber: 3,
    trait: 'sidq',
    title: 'When They Tell a Lie',
    subtitle: 'Creating safety for truth-telling',
    steps: {
      moment: {
        title: 'The Moment',
        content: `There's chocolate on their face. The wrapper is in their pocket. You saw them eat it.

"Did you eat the chocolate?"

"No."

Your heart drops. It's not just about the chocolate. It's that they looked you in the eye and lied.

The urge to catch them, to prove they're lying, to demand confession — it's overwhelming.

But here's what they're really saying: "I'm scared of what happens if I tell the truth."`,
        highlight: '"I\'m scared of what happens if I tell the truth."',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'عَلَيْكُمْ بِالصِّدْقِ فَإِنَّ الصِّدْقَ يَهْدِي إِلَى الْبِرِّ',
        arabicTranslation: '"Hold firmly to truthfulness, for truthfulness leads to righteousness."',
        reference: 'Sahih Muslim 2607',
        content: `The Prophet ﷺ taught that truthfulness is a path, not a single act. It leads somewhere.

But children only walk paths that feel safe.

If truth leads to anger, yelling, and punishment, they'll avoid it. Not because they're bad — because they're human.

Our job isn't to catch lies. It's to make truth the easier path.`,
        highlight: 'Our job isn\'t to catch lies. It\'s to make truth the easier path.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Children lie for one reason: self-protection. Their brain calculates: "What happens if I tell the truth?" If the answer is anger, they lie.

When you already know the answer, asking "Did you do it?" is a trap. It teaches them to lie better, not to be honest.

Instead, state what you know. Remove the trap. Then focus on what happens next.

"I see you ate the chocolate. Let's talk about that."

No trap. No test. Just truth.`,
        highlight: 'When you already know the answer, asking is a trap.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `The next time you know your child did something wrong, don't ask if they did it.

Instead, state what you observed:

"I see there's chocolate on your face. I know you ate it."

Pause. Let them respond.

Then say: "I'm glad you didn't lie to me just now. Thank you for being honest." (Or if they tried to lie: "It's okay. Let's try again. Did you eat it?")

Focus on the honesty, not the chocolate.`,
        highlight: '"I see there\'s chocolate on your face. I know you ate it."',
      },
      repair: {
        title: 'Already Caught Them in a Trap?',
        content: `Maybe you asked "Did you do it?" and they lied, and you exploded.

Here's how to rebuild trust:

Later, when you're both calm, say:

"I asked you a question when I already knew the answer. That wasn't fair. I made it hard for you to tell the truth. Next time, I'll just tell you what I saw. And I promise: if you tell me the truth, I won't yell. Even if I'm upset."

Then keep that promise.`,
        highlight: '"If you tell me the truth, I won\'t yell."',
      },
    },
    tomorrowTeaser: 'When They Hurt a Sibling',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 4: RAHMA - When They Hurt a Sibling
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-004-rahma-sibling-conflict',
    dayNumber: 4,
    trait: 'rahma',
    title: 'When They Hurt a Sibling',
    subtitle: 'Teaching compassion through connection',
    steps: {
      moment: {
        title: 'The Moment',
        content: `You hear the scream from the other room. You run in. Your older child has pushed the younger one. Again.

"WHY DID YOU DO THAT? SAY SORRY RIGHT NOW!"

The older one crosses their arms. "She took my toy." The younger one is crying. You're furious.

But forced apologies teach nothing. They just teach kids to say words they don't mean.

What your older child is feeling: overwhelmed, unheard, and now — attacked by you too.`,
        highlight: 'Forced apologies teach nothing.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ',
        arabicTranslation: '"Those who show mercy will be shown mercy by the Most Merciful."',
        reference: 'Sunan al-Tirmidhi 1924',
        content: `The Prophet ﷺ didn't just command mercy — he modeled it in moments of conflict.

When children fought or made mistakes, he didn't shame them in front of others. He addressed them privately, gently, with curiosity.

Mercy isn't weakness. It's strength that chooses connection over punishment.

And children learn mercy by receiving it first.`,
        highlight: 'Children learn mercy by receiving it first.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `When a child hurts someone, their brain is flooded with big emotions they can't regulate yet.

If you yell, you add more dysregulation. Now two children are upset, and no one has learned anything.

But if you tend to the hurt child first, briefly, then turn to the one who pushed — with curiosity instead of accusation — something shifts.

"You pushed your sister. You must have been really upset. Tell me what happened."

Now they can think. Now they can feel. Now they can actually become capable of genuine remorse.`,
        highlight: '"You must have been really upset. Tell me what happened."',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `The next time your child hurts someone, try this order:

1. Tend to the hurt child briefly: "I see you're hurt. I'll be right back."

2. Go to the child who hurt: Get low. Speak softly. "You pushed her. Something big must have happened. Tell me."

3. Listen fully. Don't interrupt.

4. Then say: "It sounds like you felt [frustrated/angry/left out]. Pushing isn't okay, but your feelings are. Let's find another way."

5. Only then: "What could you do to help her feel better?"

Real remorse comes from understanding, not demand.`,
        highlight: '"What could you do to help her feel better?"',
      },
      repair: {
        title: 'Already Forced an Apology?',
        content: `Forced apologies are hollow. Both kids know it.

Here's how to reset:

Go to the child who pushed, privately, and say:

"Earlier, I made you say sorry before you were ready. That wasn't fair. Real sorrys come from the heart, not from being told. I'm sorry I rushed you. Next time I'll help you understand your feelings first."

Then ask: "Do you want to try again with your sister? No pressure."

You're modeling what real repair looks like.`,
        highlight: '"Real sorrys come from the heart."',
      },
    },
    tomorrowTeaser: 'When They Interrupt Adults',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 5: ADAB - When They Interrupt Adults
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-005-adab-interrupting',
    dayNumber: 5,
    trait: 'adab',
    title: 'When They Interrupt Adults',
    subtitle: 'Teaching respect without crushing their voice',
    steps: {
      moment: {
        title: 'The Moment',
        content: `You're on the phone. It's important.

"Mama. Mama. MAMA. MAMA!"

They're tugging your shirt. You cover the phone and hiss: "Can't you see I'm talking?! Wait!"

Their face crumples. Or they get louder.

You feel embarrassed. Frustrated. Why can't they just wait?

But here's what they're experiencing: urgent need + no tools to handle it + a parent who suddenly feels unreachable.`,
        highlight: 'Urgent need + no tools to handle it.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيُكْرِمْ ضَيْفَهُ',
        arabicTranslation: '"Whoever believes in Allah and the Last Day, let him honor his guest."',
        reference: 'Sahih Bukhari 6018',
        content: `The Prophet ﷺ taught honoring those in our presence. But he also honored the small and vulnerable.

When his grandchildren would climb on him during prayer, he would lengthen his prostration so they could play safely.

He balanced adab (respect for the moment) with rahma (compassion for the child).

Our job is to teach waiting — but also to give them tools to wait.`,
        highlight: 'Teach waiting, but give them tools to wait.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Children interrupt because they have no concept of "later." Their brains are wired for now.

Telling them to "wait" without a method is like telling someone to "calm down" when they're panicking. It doesn't work.

But if you teach them a signal — something physical they can do — you give their body a job while their brain waits.

The magic hand method: They put their hand on your arm gently. You put your hand on theirs to say "I see you." Then you finish and turn to them.

No yelling. No interrupting. Just a bridge.`,
        highlight: 'Give their body a job while their brain waits.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Teach the "Magic Hand" before you need it:

When things are calm, explain:

"Sometimes Mama is talking to someone and you need me. Here's what to do: Put your hand on my arm, like this. Don't say anything. I'll put my hand on yours to show I know you're there. Then when I'm done, I'll turn to you. Let's practice!"

Practice 3 times. Make it a game.

Then, the next time they interrupt, gently guide their hand to your arm. Acknowledge with touch. Finish your conversation. Then turn to them.

"Thank you for waiting. What did you need?"`,
        highlight: '"Thank you for waiting. What did you need?"',
      },
      repair: {
        title: 'Already Snapped at Them for Interrupting?',
        content: `You were embarrassed. You were stressed. You reacted.

Here's how to reset:

"Remember when you needed me and I was on the phone? I wasn't kind to you. I'm sorry. You're important to me — even when I'm busy. Let me teach you a trick so next time we both know what to do."

Then teach the Magic Hand method.

You're showing them: adults make mistakes too. And we fix them.`,
        highlight: '"You\'re important to me — even when I\'m busy."',
      },
    },
    tomorrowTeaser: 'When They\'re Scared at Night',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 6: TAWAKKUL - When They're Scared at Night
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-006-tawakkul-night-fears',
    dayNumber: 6,
    trait: 'tawakkul',
    title: 'When They\'re Scared at Night',
    subtitle: 'Building trust in Allah through comfort',
    steps: {
      moment: {
        title: 'The Moment',
        content: `It's 2 AM. Again.

"Mama, I'm scared. There's something in my room."

You're exhausted. You want to say: "There's nothing there. Go back to sleep."

But dismissing their fear doesn't make it go away. It just teaches them not to tell you.

Their fear is real to them. And this is actually a perfect moment to teach something beautiful.`,
        highlight: 'Their fear is real to them.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
        arabicTranslation: '"I seek refuge in the perfect words of Allah from the evil of what He has created."',
        reference: 'Sahih Muslim 2708',
        content: `The Prophet ﷺ taught this dua for protection. He didn't dismiss fear — he gave tools to face it.

When we teach children to turn to Allah in moments of fear, we're planting the deepest kind of security: one that doesn't depend on us being there.

Tawakkul isn't the absence of fear. It's knowing Who to turn to when afraid.`,
        highlight: 'Tawakkul isn\'t the absence of fear. It\'s knowing Who to turn to.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Night fears peak between ages 3-6. It's developmental, not defiance.

When you dismiss their fear ("There's nothing there"), their brain doesn't believe you. They just feel alone with it.

But when you acknowledge the fear and give them something to do — a dua, a ritual, a sense of protection — you activate their problem-solving brain.

The dua becomes an anchor. Over time, they'll use it without you.

You're not just comforting them tonight. You're giving them a lifelong tool.`,
        highlight: 'You\'re giving them a lifelong tool.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Tonight, before bed, teach this simple routine:

1. Sit with them. Say: "Allah protects us when we sleep. Let me teach you what to say."

2. Recite slowly: "A'udhu bi kalimatillahit-tammati min sharri ma khalaq."

3. Translate: "I ask Allah to protect me from anything scary."

4. Have them repeat it with you 3 times.

5. Say: "Whenever you feel scared, say this. Allah is listening, even at night."

When they wake up scared, go to them. Sit briefly. Remind them: "Remember what we say?" Say it together. Then leave with confidence.`,
        highlight: '"Allah is listening, even at night."',
      },
      repair: {
        title: 'Already Dismissed Their Fears?',
        content: `"There's nothing there. Go back to sleep."

We've all said it. We were tired. We wanted it to be simple.

Here's how to reconnect:

Tomorrow, during the day, bring it up:

"Remember when you were scared last night? I told you there was nothing there, but that probably didn't help you feel better. I'm sorry. Your feelings are real. Tonight, let me teach you something that helped me when I was little."

Then teach the dua. Start fresh.`,
        highlight: '"Your feelings are real."',
      },
    },
    tomorrowTeaser: 'When They Give Up Too Quickly',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 7: IHSAN - When They Give Up Too Quickly
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-007-ihsan-giving-up',
    dayNumber: 7,
    trait: 'ihsan',
    title: 'When They Give Up Too Quickly',
    subtitle: 'Nurturing excellence without perfectionism',
    steps: {
      moment: {
        title: 'The Moment',
        content: `They're trying to zip their jacket. It's not working.

"I CAN'T DO IT!"

They throw it on the floor. Tears of frustration.

You could zip it for them. It would be faster. The meltdown would stop.

But you know that doesn't teach them anything except: "When it's hard, someone else will do it."

How do you encourage persistence without dismissing their struggle?`,
        highlight: 'How do you encourage persistence without dismissing their struggle?',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ',
        arabicTranslation: '"Allah loves that when one of you does something, they do it with excellence."',
        reference: 'Al-Bayhaqi',
        content: `Ihsan means doing something beautifully, with care — not perfectly, but with full effort.

The Prophet ﷺ didn't demand perfection. He encouraged striving.

And he acknowledged struggle. When companions faced hardship, he didn't say "just try harder." He sat with them in it, then gently guided.

Excellence grows from encouragement, not pressure.`,
        highlight: 'Excellence grows from encouragement, not pressure.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `When children say "I can't," they're not being lazy. They're overwhelmed.

Their frustration tolerance is still developing. Big tasks feel impossible because they see the whole thing, not the steps.

If you say "Yes you can!" — you dismiss their feeling.
If you do it for them — you confirm they can't.

But if you break it down and stay present — you teach resilience.

"I can see this is frustrating. Let's try just the first part together."

That's ihsan in parenting: excellence through patience.`,
        highlight: '"Let\'s try just the first part together."',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Next time they want to give up, use this phrase:

"This is hard. I can see that."

Pause. Let them feel heard.

Then: "Let's try one small piece. I'll help with the start."

Do the smallest piece together. Then step back.

"Now you try the next part."

Celebrate effort, not result: "You kept trying. That's what matters. Allah loves when we try our best."

If they still can't do it, that's okay. "We'll try again tomorrow. You're learning."`,
        highlight: '"You kept trying. That\'s what matters."',
      },
      repair: {
        title: 'Already Done It For Them Out of Frustration?',
        content: `You were late. They were melting down. You just grabbed the jacket and zipped it. "FINE. I'll do it."

We've all been there.

Here's how to reconnect:

Later, say: "Remember the jacket? I'm sorry I took over. You were working so hard. Next time, I'll help you with the tricky part instead of doing the whole thing. Deal?"

Then follow through. It's not about the jacket. It's about showing them you believe in their ability to struggle and grow.`,
        highlight: '"I believe in your ability to struggle and grow."',
      },
    },
    tomorrowTeaser: 'When They Resist Modesty',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 8: HAYA - When They Resist Modesty
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-008-haya-modesty',
    dayNumber: 8,
    trait: 'haya',
    title: 'When They Resist Modesty',
    subtitle: 'Building body respect with dignity',
    steps: {
      moment: {
        title: 'The Moment',
        content: `Your 5-year-old wants to run outside without clothes. Again.

Or they're changing in front of guests without a thought.

"Cover yourself!" you say, a bit sharply.

They look confused. Maybe hurt. They don't understand why bodies are suddenly something to hide.

How do you teach modesty without creating shame?`,
        highlight: 'How do you teach modesty without creating shame?',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'إِنَّ لِكُلِّ دِينٍ خُلُقًا، وَخُلُقُ الإِسْلاَمِ الْحَيَاءُ',
        arabicTranslation: '"Every religion has a distinctive quality, and the distinctive quality of Islam is modesty (haya)."',
        reference: 'Ibn Majah',
        content: `Haya is often translated as "modesty" or "shyness," but it's deeper. It's a sense of dignified self-awareness.

The Prophet ﷺ was described as having more haya than a young bride. Yet he was also confident, direct, and strong.

Haya isn't about shame. It's about honoring yourself — your body, your words, your actions.

We teach it through dignity, not embarrassment.`,
        highlight: 'We teach it through dignity, not embarrassment.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Children aren't born with body shame — that's actually healthy. But they need guidance on social norms and self-respect.

If you react with "Cover up!" or disgust, they learn: my body is shameful.

But if you calmly teach — with curiosity, not panic — they learn: my body is special and private. I choose who sees it.

The difference is huge. One creates shame. The other creates ownership.

"Our bodies are special. Some parts we keep private. Let me help you get dressed before we go outside."

Calm. Matter-of-fact. No drama.`,
        highlight: '"My body is special and private. I choose who sees it."',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Introduce the concept of "private parts" with this script:

"You know how some things are just for our family, like our bedtime stories? Well, some parts of our bodies are private too. They're special parts that we keep covered, except for bath time or when a doctor needs to check with Mama there."

Then normalize it: "When we get dressed, we cover our private parts first. Just like the Prophet ﷺ taught us to honor our bodies."

No shame. No panic. Just gentle teaching.

If they forget, redirect calmly: "Remember, we keep that covered. Here's your shirt."`,
        highlight: '"We honor our bodies."',
      },
      repair: {
        title: 'Already Shamed Them About Their Body?',
        content: `Maybe you said "That's shameful!" or reacted with visible disgust.

Here's how to repair:

"Remember when you were getting dressed and I said [what you said]? I was worried, but I didn't explain it well. Your body isn't bad. It's actually special. That's why we keep some parts private — not because they're shameful, but because they're precious. Does that make sense?"

Then give them a hug. Bodies are for hugging, holding, being loved.`,
        highlight: '"Not because they\'re shameful, but because they\'re precious."',
      },
    },
    tomorrowTeaser: 'When They Want Everything Now',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 9: SABR - When They Want Everything Now
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-009-sabr-delayed-gratification',
    dayNumber: 9,
    trait: 'sabr',
    title: 'When They Want Everything Now',
    subtitle: 'Teaching the sweetness of waiting',
    steps: {
      moment: {
        title: 'The Moment',
        content: `"I want it NOW!"

The toy. The snack. The screen. The turn.

Every day, multiple times, the same demand. The same urgency.

You're tired of hearing it. Tired of saying no. Tired of the meltdowns that follow.

But they're not being bratty. Their brains literally don't understand "later" the way adults do.

This is a teachable moment — one that can shape their entire relationship with wanting.`,
        highlight: 'Their brains don\'t understand "later" the way adults do.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'وَبَشِّرِ الصَّابِرِينَ',
        arabicTranslation: '"And give good news to the patient."',
        reference: 'Quran 2:155',
        content: `In Islam, sabr (patience) isn't just endurance — it's a skill that brings reward.

The Prophet ﷺ taught that waiting, done well, is worship.

But he didn't just command patience. He made waiting meaningful. When companions were hungry, he reminded them of the sweetness of patience. When they wanted victory, he pointed to the wisdom of timing.

We can do the same for our children: make waiting an adventure, not a punishment.`,
        highlight: 'Make waiting an adventure, not a punishment.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `The famous "marshmallow test" showed that children who can delay gratification tend to have better outcomes in life.

But here's what most people miss: delayed gratification isn't just willpower. It's a skill that can be taught.

Children learn to wait when:
• They trust that "later" really comes
• They have strategies to fill the waiting time
• They feel the payoff is worth it

"You want that toy. I understand. Let's put it on your Eid list. The waiting will make it even more special."

Now waiting has purpose.`,
        highlight: '"The waiting will make it even more special."',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Create a "Waiting Jar" together:

1. Get a clear jar. Explain: "When you want something and have to wait, we'll put a cotton ball in this jar."

2. "When the jar is full, you'll get to pick something special."

3. The next time they demand something, acknowledge it: "You really want that. I understand. Let's put a cotton ball in our jar for waiting."

4. Praise the waiting: "MashAllah, you're getting so good at sabr!"

They're not just waiting. They're building patience with visible progress.`,
        highlight: '"MashAllah, you\'re getting so good at sabr!"',
      },
      repair: {
        title: 'Already Given In To Stop a Tantrum?',
        content: `You were exhausted. They were screaming. You handed over the thing just to make it stop.

It happens. But now they've learned: screaming works.

Here's how to reset:

"Remember yesterday when you really wanted [thing] and you got upset? I gave it to you to make you feel better, but that wasn't the best choice. From now on, let's practice waiting together. I'll help you. And I promise: when I say 'later,' later will really come."

Then follow through. Consistency is the repair.`,
        highlight: '"When I say later, later will really come."',
      },
    },
    tomorrowTeaser: 'When They Don\'t Want to Share',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 10: RAHMA - When They Don't Want to Share
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-010-rahma-sharing',
    dayNumber: 10,
    trait: 'rahma',
    title: 'When They Don\'t Want to Share',
    subtitle: 'Compassion can\'t be forced',
    steps: {
      moment: {
        title: 'The Moment',
        content: `A friend's child reaches for your child's toy.

"MINE!" Your child snatches it away.

You're embarrassed. All eyes are on you. You want to say: "We share in this house. Give it to them NOW."

But forced sharing isn't sharing. It's taking something from your child and calling it a lesson.

What they're feeling: This is mine. Why do I have to give it up? They don't even understand yet.`,
        highlight: 'Forced sharing isn\'t sharing.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'مَثَلُ الْمُؤْمِنِينَ فِي تَوَادِّهِمْ وَتَرَاحُمِهِمْ',
        arabicTranslation: '"The believers in their mutual mercy and compassion are like one body."',
        reference: 'Sahih Bukhari 6011',
        content: `The Prophet ﷺ taught that compassion flows between people naturally — like blood in a body.

But blood flows because the heart pumps it willingly. Not because it's forced.

When we force children to share, we're not teaching generosity. We're teaching that their belongings aren't really theirs.

True rahma (compassion) comes from overflow, not obligation.

Our job is to fill them up so they want to give.`,
        highlight: 'True compassion comes from overflow, not obligation.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Developmentally, children don't understand true sharing until around age 4-5. Before that, "mine" is how they learn ownership — a necessary stage.

Forcing toddlers to share actually delays generosity. They become more possessive, not less.

But when children feel secure in their ownership, something beautiful happens: they start to share voluntarily.

The key is teaching turn-taking, not forced giving.

"It's your turn now. When you're done, it will be their turn. You decide when you're ready."

That's empowerment. That's where real generosity grows.`,
        highlight: '"You decide when you\'re ready."',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Shift from "Share!" to "Turn-taking":

1. When another child wants your child's toy, say: "That's [child's name]'s toy right now. When they're done, it will be your turn."

2. To your child, privately: "You don't have to give it up right now. When you're ready to be done, let them know."

3. When they do finish: "Thank you for giving them a turn. That was kind."

4. If they never want to give a turn: "That's okay for today. Next time, let's practice."

No forcing. No shaming. Just patient guidance toward real generosity.`,
        highlight: '"When you\'re ready to be done, let them know."',
      },
      repair: {
        title: 'Already Forced Them to Share?',
        content: `You grabbed the toy from your child's hands and gave it to the other kid.

They cried. You felt guilty but also frustrated.

Here's how to repair:

"Remember when your friend wanted your toy and I made you give it? That wasn't fair. Your things are yours. I should have helped you take turns instead. I'm sorry. Next time, I'll let you decide when you're ready to share."

This teaches: your belongings matter, your feelings matter, and adults can be wrong too.`,
        highlight: '"Your things are yours."',
      },
    },
    tomorrowTeaser: 'When They Say "I Hate You"',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 11: ADAB - When They Say "I Hate You"
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-011-adab-hurtful-words',
    dayNumber: 11,
    trait: 'adab',
    title: 'When They Say "I Hate You"',
    subtitle: 'Responding to hurtful words with wisdom',
    steps: {
      moment: {
        title: 'The Moment',
        content: `You said no to something. Maybe screen time. Maybe a sleepover. Maybe candy before dinner.

And then it comes:

"I HATE YOU! YOU'RE THE WORST MAMA EVER!"

The words hit like a punch. Your first instinct: hurt them back. "Well, I don't like you right now either." Or: "Go to your room!"

But underneath those terrible words is a child who doesn't have the vocabulary for their big feelings yet.`,
        highlight: 'Underneath those words is a child without vocabulary for big feelings.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'وَإِذَا خَاطَبَهُمُ الْجَاهِلُونَ قَالُوا سَلَامًا',
        arabicTranslation: '"And when the ignorant address them harshly, they say words of peace."',
        reference: 'Quran 25:63',
        content: `The servants of the Most Merciful don't match harsh words with harsh words.

The Prophet ﷺ was insulted, cursed, mocked — and he responded with patience.

This doesn't mean we accept disrespect. It means we don't let their dysregulation become our dysregulation.

We can hold a boundary and hold our composure at the same time.`,
        highlight: 'We can hold a boundary and hold our composure at the same time.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `When children say "I hate you," they're not making a rational statement. They're flooded with emotion they can't process.

If you react with hurt or anger, you confirm: words are weapons. They work.

But if you stay calm and name what's really happening, you teach something powerful: feelings are allowed. Hurtful words are not. And I love you even when you're angry.

"You're really upset. I understand. But 'I hate you' hurts. Can you tell me what you're actually feeling?"

You've just given them a roadmap for emotional expression.`,
        highlight: '"Can you tell me what you\'re actually feeling?"',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `When your child says something hurtful, try this response:

1. Take a breath. Don't react immediately.

2. Keep your voice calm and say: "Those words tell me you're really upset. I'm going to give you a moment."

3. Step away briefly (30 seconds). This isn't punishment — it's modeling self-regulation.

4. Return and say: "I love you even when you're angry. But those words hurt. Let's find better words for big feelings."

5. If they're calmer, ask: "Were you feeling angry? Disappointed? Sad?"

Help them label it. That's how emotional vocabulary grows.`,
        highlight: '"I love you even when you\'re angry."',
      },
      repair: {
        title: 'Already Responded With Hurt or Anger?',
        content: `Maybe you said something equally hurtful back. Or you sent them to their room in anger. Or you cried.

Here's how to repair:

"When you said 'I hate you,' I got really hurt and I didn't respond well. I'm sorry. Your feelings matter to me, even the angry ones. But we both need to work on using kinder words. Can we try again? When you're upset, you can say 'I'm really mad!' instead. And I'll try not to react so quickly."

You're teaching them: repair is always possible.`,
        highlight: '"We both need to work on using kinder words."',
      },
    },
    tomorrowTeaser: 'When They Resist Prayer',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 12: TAWAKKUL - When They Resist Prayer
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-012-tawakkul-resisting-prayer',
    dayNumber: 12,
    trait: 'tawakkul',
    title: 'When They Resist Prayer',
    subtitle: 'Making salah inviting, not punishing',
    steps: {
      moment: {
        title: 'The Moment',
        content: `"Time for Maghrib."

"I don't want to! It's boring!"

Your heart sinks. You've tried everything. Special prayer rugs. Prayer apps. Stickers.

Nothing seems to work. They groan every time you call them.

And secretly, you worry: Am I failing them? Will they grow up without this connection to Allah?

But force creates resistance. Fear doesn't build love.

There's another way.`,
        highlight: 'Force creates resistance. Fear doesn\'t build love.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'مُرُوا أَوْلاَدَكُمْ بِالصَّلاَةِ وَهُمْ أَبْنَاءُ سَبْعِ سِنِينَ',
        arabicTranslation: '"Instruct your children to pray when they are seven years old."',
        reference: 'Abu Dawud 495',
        content: `Notice the word: "instruct" — not force, not threaten, not guilt.

The Prophet ﷺ gave us a timeline because children need development before religious obligation feels meaningful.

He also showed us what prayer looked like in his home: when his granddaughter Umama was on his shoulders, he would gently set her down for sujood, then pick her up again.

Prayer in his home had space for childhood.`,
        highlight: 'Prayer in his home had space for childhood.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Children naturally resist anything that feels like a chore disconnected from relationship.

When prayer is presented as an interruption, an obligation, a "have to" — they push back.

But when prayer is presented as something special we do together, a conversation with Allah, a moment of peace — it becomes inviting.

The goal isn't compliance at age 5. The goal is love for salah at age 25.

Plant seeds of connection now. The discipline framework can come later when they're developmentally ready.`,
        highlight: 'The goal isn\'t compliance at age 5. It\'s love for salah at age 25.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Make one prayer today a connection point:

1. Invite, don't command: "I'm going to talk to Allah now. Want to join me?"

2. Make it short for them: "You can pray just two rakah with me if you want."

3. After, share one thing you asked Allah for: "I asked Allah to help you have a good day tomorrow."

4. Ask them: "Is there anything you want to ask Allah for? You can whisper it in sujood."

5. No pressure if they say no. Just say: "Okay, maybe next time. I'll be right here if you change your mind."

Consistency without force. Invitation without guilt.`,
        highlight: '"I\'m going to talk to Allah now. Want to join me?"',
      },
      repair: {
        title: 'Already Made Prayer Feel Like Punishment?',
        content: `Maybe you've yelled about missed prayers. Maybe you've used guilt: "Allah will be upset with you."

Here's how to reset:

"I think I've made prayer feel like something hard instead of something special. I'm sorry. Prayer is actually a gift — it's when we get to talk directly to Allah, the One who made us and loves us. I want to start over. No more yelling about it. Let's make it something we do together, when you're ready."

Then follow through. Let them come to it. Watch it change.`,
        highlight: '"Prayer is when we get to talk directly to Allah."',
      },
    },
    tomorrowTeaser: 'When They Compare Themselves to Others',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 13: SHUKR - When They Compare Themselves to Others
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-013-shukr-comparison',
    dayNumber: 13,
    trait: 'shukr',
    title: 'When They Compare Themselves to Others',
    subtitle: 'Building contentment in an age of comparison',
    steps: {
      moment: {
        title: 'The Moment',
        content: `"Why does she have a bigger house than us?"

"Ahmed got a new iPad. I never get anything good."

"I wish I looked like her."

The comparisons are constant. And they hurt to hear — because you know this mindset leads to misery.

You want to say: "Be grateful for what you have!" But that lands like a lecture.

How do you actually grow contentment in a child surrounded by "more"?`,
        highlight: 'How do you grow contentment in a child surrounded by "more"?',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'انظُرُوا إِلَى مَنْ هُوَ أَسْفَلَ مِنْكُمْ وَلاَ تَنْظُرُوا إِلَى مَنْ هُوَ فَوْقَكُمْ',
        arabicTranslation: '"Look at those below you, not at those above you."',
        reference: 'Sahih Muslim 2963',
        content: `The Prophet ﷺ gave us the antidote to comparison: perspective.

When we look up, we always find someone with more. When we look around, we find reasons to be grateful.

But children can't shift perspective on command. They need us to gently redirect their gaze — through stories, conversations, and our own modeling.

"I'm grateful we have a home that keeps us warm."

They're watching how we see the world.`,
        highlight: 'They\'re watching how we see the world.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Comparison is natural. Even toddlers notice differences. The problem isn't noticing — it's the meaning children attach to it.

If "they have more" means "I'm less" — that's a setup for lifelong discontentment.

But if "they have more" means "Allah gives different things to different people, and I have enough" — that's emotional freedom.

Contentment isn't about having more. It's about wanting less.

And that's modeled, not lectured. Children catch gratitude from parents who practice it out loud.`,
        highlight: 'Contentment isn\'t about having more. It\'s about wanting less.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Start a "Three Blessings" dinner ritual:

At dinner, each person shares three things they're grateful for today. They can be tiny:

"I'm grateful for the sunshine today."
"I'm grateful my tea was warm this morning."
"I'm grateful we're all eating together."

When your child compares ("But Sara has..."), respond with curiosity, not lecture:

"What do you think it would feel like to have that?"

Then gently add: "What's something you have that makes you happy?"

Redirect the gaze. Don't dismiss the feeling.`,
        highlight: '"What\'s something you have that makes you happy?"',
      },
      repair: {
        title: 'Already Lectured Them About Gratitude?',
        content: `"You should be grateful! Some kids have nothing!"

That guilt trip doesn't work. It just adds shame to dissatisfaction.

Here's how to reset:

"Remember when you wished you had what Ahmed has? I told you to be grateful, but that probably didn't help. It's okay to want things. Everyone does. The trick is to also notice what we already have. Let's try something together — every night, we'll each share three blessings. Want to start tonight?"

You're shifting from guilt to practice.`,
        highlight: '"It\'s okay to want things. Everyone does."',
      },
    },
    tomorrowTeaser: 'When They\'re Mean to Others',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 14: RAHMA - When They're Mean to Others
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-014-rahma-being-mean',
    dayNumber: 14,
    trait: 'rahma',
    title: 'When They\'re Mean to Others',
    subtitle: 'Teaching kindness through empathy, not shame',
    steps: {
      moment: {
        title: 'The Moment',
        content: `You overhear it at the playground:

"You can't play with us. Go away."

It's your child. Excluding another kid.

Your face goes hot. You want to march over and force an apology. Make them include the other child.

But public shaming doesn't teach empathy. It teaches embarrassment.

And the excluded child needs help now — while your child needs teaching later.`,
        highlight: 'Public shaming doesn\'t teach empathy.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'لاَ يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
        arabicTranslation: '"None of you truly believes until he loves for his brother what he loves for himself."',
        reference: 'Sahih Bukhari 13',
        content: `This hadith is about empathy — the ability to feel what another person feels.

Empathy isn't natural at birth. It develops over time. And it develops faster when children are helped to see through others' eyes.

The Prophet ﷺ constantly invited people to consider others' perspectives. He asked questions. He told stories. He modeled inclusion.

We can do the same. Not through force, but through guided reflection.`,
        highlight: 'Empathy develops when children are helped to see through others\' eyes.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Children exclude others for many reasons: wanting control, following peers, feeling insecure, not knowing what to say.

When you shame them publicly, they become defensive. Learning shuts down.

But when you address it privately and help them see the other child's feelings, something shifts. They connect the dots themselves.

"How do you think she felt when she heard that?"

That question, asked gently, does more than a hundred lectures.

Empathy is a muscle. It grows with use, not force.`,
        highlight: '"How do you think she felt when she heard that?"',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `If you see or hear about your child being unkind:

1. In the moment: Tend to the hurt child first. "Would you like to play with me for a bit?"

2. Later, privately: "I heard what happened at the playground. Can you tell me about it?"

3. Listen without interrupting.

4. Ask: "How do you think [child's name] felt when you said that?"

5. Help them connect: "Remember when you weren't allowed to join a game? How did that feel?"

6. End with: "Tomorrow, if you see her, what could you do differently?"

No forced apology. Just guided reflection.`,
        highlight: '"Remember when you weren\'t allowed to join? How did that feel?"',
      },
      repair: {
        title: 'Already Shamed Them in Public?',
        content: `Maybe you said loudly: "That was so rude! Apologize right now!"

They apologized, but it was hollow. And now they're embarrassed and resistant.

Here's how to repair:

"I was upset at the playground and I embarrassed you in front of everyone. I'm sorry. I should have talked to you privately. What you said to that child wasn't kind, but the way I handled it wasn't kind to you either. Let's both try to do better. What do you think?"

You're modeling: mistakes can be repaired.`,
        highlight: '"Let\'s both try to do better."',
      },
    },
    tomorrowTeaser: 'When They Break Something',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 15: SIDQ - When They Break Something
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-015-sidq-breaking-things',
    dayNumber: 15,
    trait: 'sidq',
    title: 'When They Break Something',
    subtitle: 'Making honesty safer than hiding',
    steps: {
      moment: {
        title: 'The Moment',
        content: `You find the broken vase. The shattered glass is poorly hidden under a towel.

"Did you break this?"

"No..." Eyes down. Voice small.

You know they did. The evidence is everywhere.

You feel the familiar frustration: not just at the broken thing, but at the lie.

But here's the truth: they lied because they're scared. And somewhere in their small brain, they calculated: "Lying is safer than telling the truth."

How do you change that calculation?`,
        highlight: 'They calculated: lying is safer than telling the truth.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'أَدِّ الأَمَانَةَ إِلَى مَنِ ائْتَمَنَكَ وَلاَ تَخُنْ مَنْ خَانَكَ',
        arabicTranslation: '"Fulfill the trust of those who entrust you, and do not betray those who betray you."',
        reference: 'Sunan al-Tirmidhi 1264',
        content: `The Prophet ﷺ built a culture of trust. People came to him with their mistakes because they knew: he wouldn't destroy them for honesty.

When a man confessed to a serious sin, the Prophet ﷺ tried to give him chances to retract. He made space for mercy.

Our homes should feel the same: safe places where truth is rewarded more than it's punished.

A child who tells the truth about a broken vase is braver than one who hides it.`,
        highlight: 'A child who tells the truth is braver than one who hides it.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Children lie about accidents because they've learned: mistakes lead to anger.

If honesty leads to yelling, they'll avoid it. Simple survival math.

But if honesty leads to calm conversation, maybe a consequence but also understanding — they'll choose truth.

The key: separate the accident from the honesty.

"I'm upset the vase broke. But I'm really proud you told me the truth. That was brave."

Now truth becomes the safer path.`,
        highlight: '"I\'m proud you told me the truth. That was brave."',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Create a "truth rule" in your home. Explain it when things are calm:

"In our house, if you tell the truth — even if you did something wrong — I promise not to yell. We'll talk about it calmly. There might still be a consequence, but it will be much smaller than if you lied."

Then test it. When they break something:

1. Stay calm. Take a breath.

2. State what you see: "The vase is broken."

3. Create safety: "I'm not going to yell. Just tell me what happened."

4. When they tell the truth: "Thank you for being honest. That takes courage."

5. Discuss: "Let's clean this up together. And let's talk about being more careful."

Truth should always be rewarded.`,
        highlight: '"I\'m not going to yell. Just tell me what happened."',
      },
      repair: {
        title: 'Already Exploded About an Accident?',
        content: `The vase broke and you yelled. They cried. Now they hide things from you.

Here's how to rebuild:

"Remember the vase? I got really angry. I'm sorry. It was just a thing. Things break. What matters more is that you felt safe to tell me, and I made that hard. From now on, I promise: if you break something by accident and tell me, I won't yell. I might be sad, but I'll be proud of your honesty. Can we try that?"

Then keep the promise. Every time.`,
        highlight: '"What matters more is that you felt safe to tell me."',
      },
    },
    tomorrowTeaser: 'When They\'re Jealous of a New Sibling',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 16: SABR - When They're Jealous of a New Sibling
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-016-sabr-sibling-jealousy',
    dayNumber: 16,
    trait: 'sabr',
    title: 'When They\'re Jealous of a New Sibling',
    subtitle: 'Validating big feelings during big changes',
    steps: {
      moment: {
        title: 'The Moment',
        content: `The new baby is here. Everyone is cooing over them.

And your older child? Acting out. Whiny. Clingy. Maybe even aggressive toward the baby.

"You should love your brother! You're a big sister now!"

But that's a lot to ask of a 3-year-old whose entire world just shifted.

What they're feeling: I used to be everything. Now I'm sharing. Am I still loved?

Jealousy isn't a character flaw. It's a very human response to loss.`,
        highlight: 'Jealousy isn\'t a character flaw. It\'s a response to loss.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'اعدِلُوا بَيْنَ أَوْلادِكُمْ',
        arabicTranslation: '"Be fair between your children."',
        reference: 'Sahih Bukhari 2587',
        content: `The Prophet ﷺ emphasized fairness — not equal everything, but equitable love and attention.

He understood that children notice. They compare. They measure.

When a new sibling arrives, the older child needs more attention, not less. They need reassurance: "You are still precious. You are still mine."

Fairness means giving each child what they need. And right now, your older child needs extra.`,
        highlight: 'Your older child needs more attention, not less.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `When we dismiss jealousy ("You should love the baby!"), it goes underground. It shows up as aggression, regression, or withdrawal.

But when we name it and make space for it, something shifts. The child feels seen.

"I think you miss when it was just us. That makes sense. I miss our special time too."

Now they're not alone with the feeling. And they don't have to act it out.

Jealousy dissolves faster when it's acknowledged, not shamed.`,
        highlight: '"I think you miss when it was just us."',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Create intentional one-on-one time with your older child:

1. Even 15 minutes of undivided attention matters. Put the phone away. Let someone else hold the baby.

2. Say: "This is our special time. Just you and me."

3. If they express jealousy, validate: "It's hard sharing Mama. I understand."

4. Give them a special role, but don't force it: "Would you like to help me pick out the baby's clothes?" (If they say no, that's okay.)

5. Remind them often: "I love you just as much as before. You were my first. That's always special."

Their behavior will improve when their tank is full.`,
        highlight: '"This is our special time. Just you and me."',
      },
      repair: {
        title: 'Already Shamed Them for Jealousy?',
        content: `"You're being terrible! The baby is part of this family now!"

Maybe you said something like that in exhaustion. Now they feel guilty and jealous.

Here's how to repair:

"I've been asking you to love the baby and be a big helper. But I didn't ask how you feel. Are you sad that things changed? It's okay if you are. I'm sorry I didn't make space for that. I love you so much. The baby didn't change that at all. Can we talk about what's hard?"

Let them feel it. That's how they move through it.`,
        highlight: '"I didn\'t ask how you feel. Are you sad?"',
      },
    },
    tomorrowTeaser: 'When They Talk Back',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 17: ADAB - When They Talk Back
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-017-adab-talking-back',
    dayNumber: 17,
    trait: 'adab',
    title: 'When They Talk Back',
    subtitle: 'Teaching respect while preserving their voice',
    steps: {
      moment: {
        title: 'The Moment',
        content: `"Clean up your toys, please."

"No! You do it! I don't have to listen to you!"

The disrespect is stunning. Where did this attitude come from?

You want to demand respect. Show them who's in charge.

But here's the question: Do you want obedience from fear, or respect from understanding?

Children talk back when they feel powerless. The backtalk is a grab for control. Understanding this doesn't excuse it — but it helps us respond more effectively.`,
        highlight: 'Do you want obedience from fear, or respect from understanding?',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا',
        arabicTranslation: '"And your Lord has decreed that you worship none but Him, and to parents, excellence."',
        reference: 'Quran 17:23',
        content: `Islam places high value on respecting parents. But notice: it calls for ihsan (excellence, beauty) — not blind obedience.

The Prophet ﷺ raised companions who respected him deeply, yet felt comfortable asking questions, even disagreeing at times.

Respect in Islam isn't silence. It's thoughtful speech. It's honoring the relationship while expressing oneself.

We teach this by modeling it: speaking to children respectfully, even when setting limits.`,
        highlight: 'Respect isn\'t silence. It\'s thoughtful speech.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `When children talk back, the worst response is to match their intensity. "Don't you dare speak to me like that!" escalates the conflict.

The best response? Stay calm and give them a respectful way to express disagreement.

"I can see you're frustrated. You can be upset, but you need to speak respectfully. Try again: 'Mama, I don't want to clean up right now because...'"

This teaches: your feelings are valid. Your voice matters. But how you say it matters too.

You're not crushing their spirit. You're shaping their communication.`,
        highlight: '"Your feelings are valid. Your voice matters. But how you say it matters too."',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Teach the "Try Again" method:

When they talk back, stay calm. Say:

"I hear that you're upset. But the way you said that wasn't respectful. Let's try again."

Give them the words: "You can say: 'Mama, I don't want to do that right now. Can we talk about it?'"

Have them repeat it.

Then actually engage with their request: "Thank you for saying it kindly. Here's the thing: the toys still need to be cleaned up. But I can help you start. Deal?"

You've taught: how you speak matters, and respectful speech gets heard.`,
        highlight: '"Let\'s try again."',
      },
      repair: {
        title: 'Already Responded With Anger?',
        content: `"DON'T TALK TO ME LIKE THAT!"

You matched their energy. Now you're both upset.

Here's how to reset:

"We both got pretty heated earlier. I didn't like how you spoke to me, but I didn't respond well either. Let's make a deal: I'll try to stay calm when you're upset, and you'll try to speak respectfully even when you're angry. We can both be upset, but let's not be hurtful. Deal?"

Then practice. It takes time. But you're building something important: a relationship where respect goes both ways.`,
        highlight: '"Let\'s not be hurtful. Deal?"',
      },
    },
    tomorrowTeaser: 'When They\'re Afraid of Failure',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 18: IHSAN - When They're Afraid of Failure
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-018-ihsan-fear-of-failure',
    dayNumber: 18,
    trait: 'ihsan',
    title: 'When They\'re Afraid of Failure',
    subtitle: 'Building a growth mindset through Islamic excellence',
    steps: {
      moment: {
        title: 'The Moment',
        content: `"I don't want to try. I'll just mess it up anyway."

Whether it's a new sport, a school assignment, or even a game — they won't attempt it.

You see potential in them. You know they could do it if they tried. But they're frozen.

"Just try! You'll never know if you don't try!"

But that doesn't unlock them. It just adds pressure.

What's really happening: they've connected their worth to their performance. Failing feels like being less.`,
        highlight: 'They\'ve connected their worth to their performance.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ',
        arabicTranslation: '"Actions are judged by intentions."',
        reference: 'Sahih Bukhari 1',
        content: `In Islam, the effort matters more than the outcome. Allah rewards the sincere attempt, even if it fails.

The Prophet ﷺ taught that trying — with the right intention — is already success in Allah's eyes.

This is liberating for children: your worth isn't in being perfect. It's in trying your best.

Ihsan means doing something beautifully — and beauty includes the courage to begin, even imperfectly.`,
        highlight: 'Your worth isn\'t in being perfect. It\'s in trying your best.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Fear of failure often comes from praise that's tied to results: "You're so smart!" "You're the best!"

This creates pressure: what if I'm not smart this time?

Psychologists call this a "fixed mindset" — the belief that abilities are set in stone.

The alternative is a "growth mindset": abilities grow with effort. Mistakes are learning, not failing.

"I can see you're nervous. That's okay. Let's try together. And if it doesn't work out, we'll learn something."

You're separating their identity from their performance.`,
        highlight: '"If it doesn\'t work out, we\'ll learn something."',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Shift your praise from outcome to effort:

Instead of: "You're so smart!" → Try: "You worked so hard on that!"
Instead of: "You're the best!" → Try: "I love how you kept trying!"
Instead of: "Perfect!" → Try: "Look how much you've improved!"

When they're afraid to try, say:

"Allah doesn't ask us to be perfect. He asks us to try our best. And I'm proud of you for trying, no matter what happens."

Then share a time you failed at something: "I messed up so many times learning to cook. That's how everyone learns."

Normalize failure. It's the path to growth.`,
        highlight: '"Allah doesn\'t ask us to be perfect. He asks us to try our best."',
      },
      repair: {
        title: 'Already Made Them Feel Failure is Shameful?',
        content: `Maybe you've expressed disappointment at their results. "You could have done better." "Why didn't you win?"

They learned: my worth depends on success.

Here's how to repair:

"I think I've made you feel like winning is what matters most. I'm sorry. What really matters is effort. I love you when you win, when you lose, when you try, and even when you don't try. Nothing changes that. Let's focus on trying hard, not on being perfect. Deal?"

Then mean it. Celebrate effort loudly. Downplay results.`,
        highlight: '"I love you when you win, when you lose, when you try."',
      },
    },
    tomorrowTeaser: 'When They Say Bad Words',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 19: HAYA - When They Say Bad Words
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-019-haya-bad-words',
    dayNumber: 19,
    trait: 'haya',
    title: 'When They Say Bad Words',
    subtitle: 'Teaching dignified speech without overreacting',
    steps: {
      moment: {
        title: 'The Moment',
        content: `They come home and casually drop a word that makes your heart stop.

Maybe from school. Maybe from a show. Maybe from you (oops).

Your first instinct: overreact. "WHERE DID YOU HEAR THAT?!"

But here's the thing: your reaction gives the word power.

If you freak out, they learn: this word gets attention. Interesting.

If you stay calm, you can actually teach something.`,
        highlight: 'Your reaction gives the word power.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'لَيْسَ الْمُؤْمِنُ بِالطَّعَّانِ وَلاَ اللَّعَّانِ وَلاَ الْفَاحِشِ وَلاَ الْبَذِيءِ',
        arabicTranslation: '"The believer is not one who slanders, curses, speaks obscenely, or is vulgar."',
        reference: 'Sunan al-Tirmidhi 1977',
        content: `The Prophet ﷺ was known for never using vulgar language. His speech was dignified, even when he was angry.

Haya in speech means choosing words that honor yourself and others.

But children learn this through guidance, not panic. They're testing language, learning what fits where.

Our job isn't to make bad words forbidden fruit (that makes them more appealing). It's to explain why dignified speech matters.`,
        highlight: 'Children are testing language, learning what fits where.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Children experiment with language. They pick up words without understanding them. They test reactions.

If you overreact, you've shown: this word is powerful. They'll use it when they want attention or control.

If you ignore it, they might think it's acceptable.

The middle path: acknowledge calmly, explain briefly, redirect firmly.

"That word isn't one we use in our family. It can hurt people. Let me teach you a better word for when you're frustrated."

No drama. Just guidance.`,
        highlight: '"That word isn\'t one we use in our family."',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `When you hear a bad word, try this:

1. Stay calm. No shock face.

2. Get down to their level and ask curiously: "Where did you hear that word?"

3. Explain simply: "That word can hurt people's feelings. In our family, we try to use kind words."

4. Offer alternatives: "When you're frustrated, you can say 'I'm so angry!' or 'That's not fair!' instead."

5. Let it go. Don't keep bringing it up.

If they use it again to get a reaction, simply say: "We don't use that word. Try again with a different word."

Minimal attention. Clear boundary.`,
        highlight: '"In our family, we try to use kind words."',
      },
      repair: {
        title: 'Already Overreacted?',
        content: `You freaked out. Maybe yelled. Maybe washed their mouth with soap (please don't do this).

Now the word is forbidden fruit — extra tempting.

Here's how to reset:

"Remember when you said that word and I got really upset? I overreacted. I was surprised. Here's the thing: that word can hurt people, so we don't use it. But I shouldn't have made such a big deal. If it happens again, let's just calmly pick a different word. Okay?"

Then follow through with calm responses next time.`,
        highlight: '"Let\'s just calmly pick a different word."',
      },
    },
    tomorrowTeaser: 'When They\'re Being Bossy',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 20: RAHMA - When They're Being Bossy
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-020-rahma-being-bossy',
    dayNumber: 20,
    trait: 'rahma',
    title: 'When They\'re Being Bossy',
    subtitle: 'Channeling leadership into compassion',
    steps: {
      moment: {
        title: 'The Moment',
        content: `"No, you're doing it wrong! Do it MY way!"

Your child is ordering friends around. Demanding control. Getting upset when others don't comply.

You're embarrassed. "Don't be so bossy!"

But "bossy" is just leadership without skills. The drive to lead isn't bad — it's how they're doing it that needs refinement.

Underneath the bossy behavior: a child who wants to feel competent and in control.`,
        highlight: '"Bossy" is just leadership without skills.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'سَيِّدُ الْقَوْمِ خَادِمُهُمْ',
        arabicTranslation: '"The leader of the people is their servant."',
        reference: 'Al-Bayhaqi',
        content: `The Prophet ﷺ modeled servant leadership. He led with the most authority in history, yet served others: mending his own clothes, helping with housework, listening to everyone.

Leadership in Islam isn't about commanding. It's about serving.

A child who wants to lead can learn: real leaders help others succeed. Real leaders ask, not demand. Real leaders lift up, not push down.

That's a worthy goal for their natural drive.`,
        highlight: 'Real leaders help others succeed.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Calling a child "bossy" shames their leadership instinct. They learn: wanting to lead is bad.

But if we channel that energy toward serving others, something beautiful happens.

"I can see you have ideas about how to do this. That's good! Let's practice asking instead of telling. 'Would you like to try my idea?'"

Now they're still leading — but with compassion and collaboration.

The world needs leaders. We're just shaping what kind.`,
        highlight: 'We\'re shaping what kind of leader they become.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Reframe "bossy" as "leadership that needs kindness":

When you see bossy behavior:

1. Pull them aside privately (not in front of friends).

2. Acknowledge the positive: "I can see you have really good ideas. That's a leadership quality!"

3. Add the missing piece: "Great leaders ask instead of tell. They help others feel good. Let's practice."

4. Role-play: "Instead of 'Do it this way!' try 'I have an idea — would you want to try it?'"

5. Give them a leadership job at home: "You're in charge of making sure everyone's water cups are filled at dinner."

Channel the energy. Don't crush it.`,
        highlight: '"Great leaders ask instead of tell."',
      },
      repair: {
        title: 'Already Shamed Them for Being Bossy?',
        content: `"Stop being so bossy! No one will want to play with you!"

Those words might have felt true, but they hurt.

Here's how to repair:

"Remember when I called you bossy? I'm sorry. What I should have said is: you're a natural leader. But even great leaders need to learn how to help others feel good. The Prophet ﷺ was the greatest leader ever, and he was so kind that everyone felt special around him. I want to help you lead like that. Can we practice together?"

Now you're building up, not tearing down.`,
        highlight: '"You\'re a natural leader."',
      },
    },
    tomorrowTeaser: 'When They Won\'t Eat',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 21: SABR - When They Won't Eat
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-021-sabr-picky-eating',
    dayNumber: 21,
    trait: 'sabr',
    title: 'When They Won\'t Eat',
    subtitle: 'Patience at the dinner table',
    steps: {
      moment: {
        title: 'The Moment',
        content: `You've made dinner. A healthy one. You're proud of it.

They look at the plate: "I don't like this. I want something else."

They haven't even tried it.

The frustration builds. You've been here before. The negotiations, the bribes, the standoffs.

"Just try one bite!" leads to tears.

Mealtimes have become battlefields.`,
        highlight: 'Mealtimes have become battlefields.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'مَا عَابَ النَّبِيُّ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ طَعَامًا قَطُّ إِنِ اشْتَهَاهُ أَكَلَهُ وَإِلاَّ تَرَكَهُ',
        arabicTranslation: '"The Prophet ﷺ never criticized food. If he desired it, he ate it. If not, he left it."',
        reference: 'Sahih Bukhari 5409',
        content: `The Prophet ﷺ modeled something radical: no food wars.

He didn't force. He didn't guilt. He didn't criticize someone else's choices.

His home had peace around food.

When we make mealtimes about power — "You must eat this!" — we create resistance. But when we offer food without pressure, children gradually expand what they'll try.

Sabr at the table changes everything.`,
        highlight: 'His home had peace around food.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Picky eating is developmentally normal. Toddlers are biologically wired to be suspicious of new foods — it's an evolutionary protection.

Pressure backfires. Studies show that forcing children to eat actually increases picky eating and creates negative associations with food.

The antidote is what experts call "division of responsibility":
• You decide what food is offered and when.
• They decide whether to eat it and how much.

Remove the battle. Keep offering. Trust the process. It can take 10-15 exposures before a child accepts a new food.`,
        highlight: 'It can take 10-15 exposures before a child accepts a new food.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `At the next meal, try the "No Pressure Plate":

1. Serve the meal family-style if possible. Let them see what's available.

2. Include at least one food you know they'll eat (even if it's just bread).

3. When they say "I don't like this," respond calmly: "That's okay. You don't have to eat it."

4. Don't offer alternatives. The meal is the meal.

5. Don't comment on what they eat or don't eat. Just eat together.

6. If they're hungry later: "The kitchen is closed, but we'll have breakfast in the morning."

It's not punishment. It's peace.`,
        highlight: '"That\'s okay. You don\'t have to eat it."',
      },
      repair: {
        title: 'Already Made Mealtimes a Battle?',
        content: `You've forced bites. You've negotiated with dessert. You've yelled at the table.

The table now feels tense.

Here's how to reset:

"I think mealtimes have been hard for both of us. I've been pushing you to eat, and that's made dinner stressful. I'm sorry. From now on, you get to choose what goes on your plate and how much you eat. I'll offer good food, and you decide. No more fights at the table. Deal?"

Then stick to it. It might take weeks for them to trust the new normal.`,
        highlight: '"No more fights at the table."',
      },
    },
    tomorrowTeaser: 'When They\'re Scared to Try New Things',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 22: TAWAKKUL - When They're Scared to Try New Things
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-022-tawakkul-fear-new-things',
    dayNumber: 22,
    trait: 'tawakkul',
    title: 'When They\'re Scared to Try New Things',
    subtitle: 'Building courage through trust in Allah',
    steps: {
      moment: {
        title: 'The Moment',
        content: `A new class. A new playground. A new experience.

"I don't want to go. I'm scared."

You know it would be good for them. You know they'd probably love it once they tried.

"Come on, it'll be fun! Don't be scared!"

But dismissing fear doesn't make it go away. And pushing too hard can make it worse.

How do you help a cautious child be brave?`,
        highlight: 'Dismissing fear doesn\'t make it go away.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ وَالْعَجْزِ وَالْكَسَلِ وَالْجُبْنِ',
        arabicTranslation: '"O Allah, I seek refuge in You from worry, grief, incapacity, laziness, and cowardice."',
        reference: 'Sahih Bukhari 6369',
        content: `The Prophet ﷺ regularly made this dua, including asking protection from cowardice.

But notice: he asked Allah for help. He didn't deny the feeling.

Tawakkul isn't the absence of fear. It's trusting that Allah is with us in our fear. It's stepping forward anyway, knowing we're not alone.

We can teach children: "It's okay to be scared. We ask Allah, and then we try."`,
        highlight: 'It\'s okay to be scared. We ask Allah, and then we try.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Some children are naturally more cautious. This isn't a flaw — it's a temperament. Cautious children are often thoughtful, careful, and observant.

But they do need gentle support to try new things.

The key: acknowledge the fear, provide support, and celebrate small brave steps.

"I know this feels scary. I'll stay with you the whole time. And we can leave if you need to."

When they feel safe, they expand. Force creates contraction.

Brave isn't feeling no fear. Brave is feeling fear and trying anyway.`,
        highlight: 'Brave is feeling fear and trying anyway.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Create a "Brave Together" ritual for new experiences:

1. Before the new thing, acknowledge: "This is new and that can feel scary. That's normal."

2. Make dua together: "Allah, help us be brave. You are with us."

3. Give them agency: "We'll try it for 10 minutes. If you really don't like it, we can go."

4. Stay present: "I'll be right here watching."

5. Afterward, celebrate the trying (not the result): "You did something brave today! How did it feel?"

6. If they refused: "Maybe next time. I'm proud of you for thinking about it."

No shame. Just gentle stretching.`,
        highlight: '"You did something brave today!"',
      },
      repair: {
        title: 'Already Forced Them Into Something?',
        content: `You pushed them into the swimming class while they screamed. Or left them crying at the birthday party.

Now they're more fearful, not less.

Here's how to repair:

"Remember when I made you do [thing] even though you were scared? I thought I was helping, but I think I made it worse. I'm sorry. From now on, we'll go slower. We'll talk about what scares you and find ways to feel safer. Being brave doesn't mean having no fear — it means trying even when we're scared. And I'll help you with that, not push you."

Rebuild trust gradually.`,
        highlight: '"We\'ll go slower."',
      },
    },
    tomorrowTeaser: 'When They\'re Disrespectful to Elders',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 23: ADAB - When They're Disrespectful to Elders
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-023-adab-disrespecting-elders',
    dayNumber: 23,
    trait: 'adab',
    title: 'When They\'re Disrespectful to Elders',
    subtitle: 'Teaching honor across generations',
    steps: {
      moment: {
        title: 'The Moment',
        content: `Grandmother asks them to give her a kiss. They roll their eyes.

Uncle tries to talk to them. They ignore him and keep playing.

You see it happening and feel your face flush with embarrassment.

"Don't be rude! Say salaam to Teta!"

But forced manners feel hollow. And your child seems confused — didn't you teach them about personal space and consent?

How do you balance respect for elders with respect for your child's boundaries?`,
        highlight: 'How do you balance respect for elders with respect for boundaries?',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'لَيْسَ مِنَّا مَنْ لَمْ يَرْحَمْ صَغِيرَنَا وَيُوَقِّرْ كَبِيرَنَا',
        arabicTranslation: '"He is not one of us who does not show mercy to our young and honor to our elders."',
        reference: 'Sunan al-Tirmidhi 1919',
        content: `Islam places great emphasis on honoring elders. But notice: in the same hadith, mercy to the young is also mentioned.

The Prophet ﷺ understood that respect goes both ways across generations.

Teaching children to honor elders doesn't mean forcing physical affection or dismissing their feelings. It means teaching them how to show respect in ways that feel authentic.

"Salaam" is respect. A smile is respect. Eye contact is respect. They can choose the form.`,
        highlight: 'They can choose the form of respect.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Children need both: respect for elders AND respect for their own boundaries.

Forcing physical affection teaches: your discomfort doesn't matter. That's dangerous.

But ignoring elders teaches: older people aren't important. That erodes community.

The middle path: teach respect with choices.

"We always greet Teta. You can say salaam, give a wave, or blow a kiss. Which feels good to you?"

This empowers them to be respectful in their own way. And most children, given choices, become naturally warmer over time.`,
        highlight: '"Which feels good to you?"',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Before your next family gathering, prep your child:

"When we see Teta and Jaddo, we always show them we're happy to see them. What would you like to do? You can give a hug, say salaam loudly, give a high-five, or wave."

Let them choose.

When they greet (in whatever way), praise: "That was so respectful. I could see Teta's smile."

If they freeze or hide: "It's okay. Let's try a wave from here."

Also, privately tell relatives: "We're teaching respectful greetings, but we're letting them choose how. Thanks for understanding!"

Most family will appreciate the thoughtfulness.`,
        highlight: '"Let them choose how to show respect."',
      },
      repair: {
        title: 'Already Forced Physical Affection?',
        content: `"Give Auntie a kiss NOW." You pushed them forward. They complied unhappily.

Here's how to repair:

"Remember when I made you hug/kiss someone even though you didn't want to? That wasn't right. Your body is yours. From now on, you get to choose how to say hello — but we do need to be polite. A wave, a salaam, a smile — you pick. I'm sorry I didn't give you that choice before."

And talk to family: "We're working on respectful greetings that [child] is comfortable with. Thanks for your patience!"`,
        highlight: '"Your body is yours."',
      },
    },
    tomorrowTeaser: 'When They Whine Constantly',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 24: SABR - When They Whine Constantly
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-024-sabr-whining',
    dayNumber: 24,
    trait: 'sabr',
    title: 'When They Whine Constantly',
    subtitle: 'Responding to whining without losing your mind',
    steps: {
      moment: {
        title: 'The Moment',
        content: `"Mamaaaaa, I want iiiiiit."

That voice. That tone. It's like nails on a chalkboard.

You've asked nicely: "Please use your regular voice." Nothing changes.

The whining continues. About everything. All day.

Your patience is gone. "STOP WHINING!"

But yelling doesn't help. And somehow, the whining gets worse.`,
        highlight: 'Yelling doesn\'t help. The whining gets worse.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'إِنَّ اللَّهَ رَفِيقٌ يُحِبُّ الرِّفْقَ فِي الأَمْرِ كُلِّهِ',
        arabicTranslation: '"Allah is gentle and loves gentleness in all things."',
        reference: 'Sahih Bukhari 6927',
        content: `Gentleness in all things — even when the whining makes you want to scream.

The Prophet ﷺ faced complaints, demands, and difficult conversations constantly. He responded with patience and redirected with wisdom.

Whining is a child's underdeveloped attempt to communicate need. They haven't learned how to ask properly yet.

Our job isn't to punish the whine. It's to teach the alternative.`,
        highlight: 'Our job is to teach the alternative.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Children whine because it works. At some point, the whining got them what they wanted, or at least got them attention.

If you respond to whining — even negatively — you reinforce it.

The effective approach:
1. Don't respond to the whiny voice at all
2. Teach them exactly what voice to use
3. Only respond when they use it

"I can't understand that voice. Can you try again in your regular voice?"

Then wait. When they use a normal tone: respond immediately.

They learn: normal voice = results. Whiny voice = nothing.`,
        highlight: '"I can\'t understand that voice."',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Practice the "voice switch" when things are calm:

"Let me show you two voices. This is a whiny voice: 'Mamaaaaa, I want iiiit.' This is a regular voice: 'Mama, can I please have that?' Which one sounds nicer?"

Let them practice both. Make it silly.

Then, when real whining happens:

1. Don't react emotionally.

2. Simply say: "Try that again in your regular voice."

3. Wait silently.

4. When they switch: "Thank you! I can hear you now. What did you need?"

Consistency is key. Every single time.`,
        highlight: '"Try that again in your regular voice."',
      },
      repair: {
        title: 'Already Yelled About Whining?',
        content: `"I CAN'T TAKE IT ANYMORE! STOP!"

You lost it. Now everyone is upset.

Here's how to reset:

"I got really frustrated with the whining and I yelled. That wasn't helpful. I'm sorry. Here's the thing: when you use that whiny voice, my brain has a hard time listening. Let's make a deal: when you want something, try to use your regular voice. And I'll try to listen calmly. If I hear whining, I'll just say 'regular voice' to remind you. Okay?"

Then practice together. Repair is always possible.`,
        highlight: '"Let\'s make a deal."',
      },
    },
    tomorrowTeaser: 'When They\'re Ungrateful for Gifts',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 25: SHUKR - When They're Ungrateful for Gifts
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-025-shukr-ungrateful-gifts',
    dayNumber: 25,
    trait: 'shukr',
    title: 'When They\'re Ungrateful for Gifts',
    subtitle: 'Teaching appreciation without shame',
    steps: {
      moment: {
        title: 'The Moment',
        content: `Eid morning. Or a birthday. Or just a gift from a relative.

They open it and their face falls.

"I wanted the OTHER one." Or worse: "I don't like this."

The gift-giver's face falls too. You're mortified.

"Say thank you! That was so rude!"

But forced gratitude isn't real gratitude. And public shaming doesn't teach anything good.`,
        highlight: 'Forced gratitude isn\'t real gratitude.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'مَنْ لَمْ يَشْكُرِ النَّاسَ لَمْ يَشْكُرِ اللَّهَ',
        arabicTranslation: '"Whoever does not thank people has not thanked Allah."',
        reference: 'Sunan Abu Dawud 4811',
        content: `Gratitude to people and gratitude to Allah are connected.

But the Prophet ﷺ also understood human development. He was patient with children who didn't yet understand social graces.

Gratitude is a skill that develops over time. Young children are naturally self-centered — it's developmental, not moral failure.

Our job is to model thankfulness, teach the words, and create habits. The genuine feeling follows.`,
        highlight: 'The genuine feeling follows the habit.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Children don't automatically understand that gifts represent effort, thought, and love. They just see: this isn't what I wanted.

Shaming them in the moment doesn't create gratitude. It creates shame, which blocks learning.

Instead:
1. Save face in the moment (for everyone)
2. Teach privately later
3. Model gratitude yourself
4. Practice before events

"I know you wanted something different. It's okay to feel that. But Auntie thought of you and chose this with love. Let's write her a thank you note for thinking of you."

Separate the feeling from the behavior.`,
        highlight: 'Separate the feeling from the behavior.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Before the next gift-giving occasion, practice:

"When someone gives you a gift, even if it's not what you wanted, we say: 'Thank you so much! That was so kind of you.' Let's practice!"

Role-play. Give them a "pretend gift" (a sock, a banana) and have them practice the words with a smile.

Make it silly: "Even if someone gave you a rotten banana, what would you say?" "Thank you so much!"

In the moment, if they forget, gently prompt: "What do we say?"

After, privately: "I know that wasn't what you hoped for. That's okay to feel. You still said thank you, and that was kind."`,
        highlight: '"What do we say?"',
      },
      repair: {
        title: 'Already Shamed Them in Front of Everyone?',
        content: `"That's so rude! Apologize right now! We don't act like that!"

The gift-giver felt awkward. Your child felt humiliated. You felt embarrassed.

Here's how to repair:

With your child, privately: "I embarrassed you in front of everyone. I'm sorry. I was upset because I wanted you to show gratitude, but I didn't handle it well. It's okay to feel disappointed about a gift. But we do need to say thank you because someone thought of us. Can we practice for next time?"

With the gift-giver (if close): "I'm sorry about earlier. We're working on gratitude. Thank you for your kindness."`,
        highlight: '"I embarrassed you. I\'m sorry."',
      },
    },
    tomorrowTeaser: 'When They Don\'t Want to Help at Home',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 26: IHSAN - When They Don't Want to Help at Home
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-026-ihsan-helping-home',
    dayNumber: 26,
    trait: 'ihsan',
    title: 'When They Don\'t Want to Help at Home',
    subtitle: 'Building contribution without conflict',
    steps: {
      moment: {
        title: 'The Moment',
        content: `"Can you help set the table?"

"No! I'm playing!"

You're tired. You've cooked, cleaned, and managed everything. A little help would be nice.

"You live in this house too! You need to contribute!"

The nagging begins. The resistance grows. Chores become a daily battle.

But you don't want to raise someone who expects to be served. You want them to contribute joyfully.

How?`,
        highlight: 'You want them to contribute joyfully.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'كَانَ يَكُونُ فِي مِهْنَةِ أَهْلِهِ',
        arabicTranslation: '"He (the Prophet ﷺ) used to help with the housework."',
        reference: 'Sahih Bukhari 676',
        content: `The Prophet ﷺ — leader of an ummah, receiving revelation, building a civilization — helped at home.

He mended his shoes. He sewed his clothes. He served others.

When children see parents serving the home willingly, they learn: this is what family members do. We take care of each other.

Ihsan at home means doing our part with excellence and joy — not because we're forced, but because we belong.`,
        highlight: 'We take care of each other.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Children resist chores for many reasons: they'd rather play, they feel overwhelmed, they don't see the point.

Nagging creates resistance. Lecturing creates resentment.

But when chores are:
• Presented as team contributions, not punishments
• Age-appropriate and doable
• Done together (at first)
• Acknowledged with appreciation

...children actually want to help. They want to feel capable and part of the team.

The goal isn't compliance. It's ownership.`,
        highlight: 'The goal isn\'t compliance. It\'s ownership.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Reframe chores as "family jobs":

1. Call a family meeting. Say: "Our home works because we all help. Let's pick jobs."

2. Give them real choice: "Would you rather set the table or put away shoes?"

3. Make it visual: A simple chart showing everyone's jobs — including yours.

4. Do it together at first: "Let's set the table together until you've got it."

5. Thank them sincerely: "The table looks so nice. Thank you for making dinner special."

6. No payment for basic contributions. This is about family, not transactions.

When they resist: "I know you don't feel like it. But this is your family job. Let's do it together quickly so you can get back to playing."`,
        highlight: '"This is your family job."',
      },
      repair: {
        title: 'Already Made Chores a Punishment?',
        content: `"If you don't behave, you're cleaning the whole house!"

Chores became associated with punishment. Now they resist everything.

Here's how to reset:

"I think I made helping at home feel like a punishment. That wasn't right. Helping isn't punishment — it's what families do together. Let's start fresh. We'll pick family jobs together, and they'll just be part of our day. Not punishment, not reward — just how we take care of our home together."

Then make it consistent, calm, and collaborative.`,
        highlight: '"Helping isn\'t punishment."',
      },
    },
    tomorrowTeaser: 'When They\'re Obsessed with Screens',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 27: SABR - When They're Obsessed with Screens
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-027-sabr-screen-time',
    dayNumber: 27,
    trait: 'sabr',
    title: 'When They\'re Obsessed with Screens',
    subtitle: 'Creating healthy boundaries around technology',
    steps: {
      moment: {
        title: 'The Moment',
        content: `"Five more minutes."

Thirty minutes later, you're prying the tablet away. There's screaming.

Every day, the same battle. Screen time ends in tears.

You've tried timers. You've tried warnings. Nothing works.

And secretly, you wonder: Am I damaging their brain? Are they addicted?

How do you set limits without constant conflict?`,
        highlight: 'Screen time ends in tears.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'كُلُّكُمْ رَاعٍ وَكُلُّكُمْ مَسْؤُولٌ عَنْ رَعِيَّتِهِ',
        arabicTranslation: '"Each of you is a shepherd and each of you is responsible for their flock."',
        reference: 'Sahih Bukhari 7138',
        content: `As parents, we're shepherds. We guide, protect, and set boundaries for our children's wellbeing.

The Prophet ﷺ didn't have iPads, but he understood the principle: some things need limits to be beneficial.

Screens aren't inherently evil. But without boundaries, they can crowd out play, relationships, and rest.

Sabr here means: patient, consistent limits. Not reactive snatching. Not angry battles. Calm boundaries, held kindly.`,
        highlight: 'Calm boundaries, held kindly.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Screens are designed to be addictive. The apps, the games, the shows — they're engineered to keep kids watching.

Children can't self-regulate around screens. Their brains aren't developed enough.

The key: external structure until internal regulation develops.

This means:
• Clear, consistent limits
• Predictable routines (screen time at the same times)
• Calm enforcement (no negotiation)
• Rich alternatives available

When the boundary is predictable and kindly held, meltdowns decrease. Not immediately — but over time.`,
        highlight: 'When boundaries are predictable, meltdowns decrease.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Create a "Screen Time System":

1. Decide on clear rules: When can they have screen time? How long? What content?

2. Make it visible: "Screen time is after chores and before Maghrib. 30 minutes."

3. Use a visual timer they can see.

4. Give a 5-minute warning: "Five minutes left. Start finding a stopping point."

5. When time is up, stay calm: "Time's up. Let's turn it off together."

6. Have an activity ready: "Now let's go play outside / do crafts / cook together."

7. If they melt down: "I know it's hard to stop. But the rule is the rule. Tomorrow you'll have screen time again."

Consistency. Consistency. Consistency.`,
        highlight: '"The rule is the rule."',
      },
      repair: {
        title: 'Already Had Endless Screen Battles?',
        content: `You've been inconsistent. Sometimes 20 minutes, sometimes 2 hours. Sometimes you snatch it away in anger.

The battles are exhausting.

Here's how to reset:

"I haven't been clear about screen time, and that's been hard for both of us. Starting tomorrow, here's the new rule: [specific rule]. This is the rule every day. No negotiations. I'll help you stop when time is up, and it might be hard at first. But I know you'll get used to it."

Then be completely consistent. The first few days will be hard. Keep going.`,
        highlight: '"Starting tomorrow, here\'s the new rule."',
      },
    },
    tomorrowTeaser: 'When They\'re Rough with Others',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 28: RAHMA - When They're Rough with Others
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-028-rahma-being-rough',
    dayNumber: 28,
    trait: 'rahma',
    title: 'When They\'re Rough with Others',
    subtitle: 'Teaching gentle hands and kind hearts',
    steps: {
      moment: {
        title: 'The Moment',
        content: `They're playing with the baby, and suddenly: a push. A grab. A poke that's too hard.

"BE GENTLE!"

You've said it a thousand times. They nod, and two minutes later — roughness again.

Are they aggressive? Do they not care?

Usually, neither. They're still learning to calibrate their bodies. They don't know their own strength.

But they need to learn before someone gets hurt.`,
        highlight: 'They\'re still learning to calibrate their bodies.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'مَنْ لاَ يَرْحَمُ لاَ يُرْحَمُ',
        arabicTranslation: '"Whoever does not show mercy will not be shown mercy."',
        reference: 'Sahih Bukhari 5997',
        content: `The Prophet ﷺ was incredibly gentle — with children, with animals, with everyone.

He kissed his grandchildren when others thought it was weakness. He extended mercy even to those who opposed him.

Rahma (mercy/compassion) is a core Islamic value. But children don't absorb it through lectures. They learn it through experience:

• Being treated gently when they make mistakes
• Being taught how to be gentle, not just told
• Practicing gentleness until it becomes natural`,
        highlight: 'They learn through experience, not lectures.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `"Be gentle" is abstract. Children need concrete instruction.

They need to know: What does gentle look like? Feel like? Sound like?

When you say "be gentle" during rough play, they're already dysregulated. They can't learn in that moment.

Instead:
1. Practice gentleness when everyone is calm
2. Show them exactly what to do with their hands
3. Catch them being gentle and praise it
4. When roughness happens, calmly remove them and re-teach

"Gentle hands look like this. Soft touches. Let's practice on teddy."`,
        highlight: '"Let\'s practice gentle touches."',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Practice "gentle hands" when things are calm:

1. Get a stuffed animal or pillow. Say: "Let's practice gentle touches."

2. Show them: "This is gentle. Soft. Kind. Feel how light my hand is?"

3. Let them try. Guide their hand if needed.

4. Practice different scenarios: "How do we touch the baby gently? How do we pet a cat gently?"

5. Make it a game: "Can you show me your gentlest touch?"

When real roughness happens:

1. Calmly separate them: "That was too rough. Let's take a break."

2. Tend to the hurt person.

3. Later, practice again: "Remember our gentle hands? Let's practice."

No shaming. Just teaching.`,
        highlight: '"Show me your gentlest touch."',
      },
      repair: {
        title: 'Already Yelled About Being Rough?',
        content: `"WHY DO YOU KEEP HURTING PEOPLE?!"

You reacted from fear. You worried about the other child. You were frustrated.

Here's how to repair:

"I yelled at you for being rough, and that wasn't kind of me. I was worried someone would get hurt. But yelling doesn't help you learn. Let's practice together what gentle looks like. You're not a bad kid — you're just learning how to control your body. I'll help you."

Then practice regularly. Gentleness is a skill, not a moral quality.`,
        highlight: '"You\'re just learning how to control your body."',
      },
    },
    tomorrowTeaser: 'When They Lie About the Little Things',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 29: SIDQ - When They Lie About Little Things
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-029-sidq-small-lies',
    dayNumber: 29,
    trait: 'sidq',
    title: 'When They Lie About Little Things',
    subtitle: 'Understanding why children fib and what to do',
    steps: {
      moment: {
        title: 'The Moment',
        content: `"Did you brush your teeth?"

"Yes!"

But their toothbrush is dry.

It's such a small thing. Why lie about it?

Or: "Did you eat your vegetables?"
"Yes!" But they're hidden under the napkin.

These tiny lies pile up. You start to wonder: if they lie about toothbrushing, what else are they lying about?

Is my child becoming a liar?`,
        highlight: 'If they lie about small things, what else are they lying about?',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'إِيَّاكُمْ وَالْكَذِبَ فَإِنَّ الْكَذِبَ يَهْدِي إِلَى الْفُجُورِ',
        arabicTranslation: '"Beware of lying, for lying leads to wickedness."',
        reference: 'Sahih Muslim 2607',
        content: `The Prophet ﷺ took lying seriously. But he also understood human nature.

Small lies are often not about deception — they're about avoiding an unpleasant task or conversation.

Children lie to:
• Avoid tasks they don't want to do
• End nagging
• Avoid disappointing you
• Get what they want faster

Understanding the motivation helps us respond better. Panic and interrogation don't teach honesty — they teach better lying.`,
        highlight: 'Understanding the motivation helps us respond better.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Developmental research shows: all children lie. It's actually a cognitive milestone (they understand others have different knowledge).

But whether lying becomes a habit depends on how we respond.

If small lies work (they avoid the task, you believe them), lying increases.
If truth is rewarded and lies are gently called out, lying decreases.

The key: don't ask questions you know the answer to. State facts. Create incentives for truth.

"Your toothbrush is dry. Let's go brush together."

No interrogation. No lecture. Just facts and follow-through.`,
        highlight: 'Don\'t ask questions you know the answer to.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Stop setting "trap questions":

Instead of "Did you brush your teeth?" → "Let's check your toothbrush together."

Instead of "Did you eat your vegetables?" → "I see vegetables on your plate still."

Instead of "Did you hit your sister?" (when you saw it) → "I saw what happened. Let's talk."

When you notice a fib:

"I think that's not quite true. Let's try again. No one's in trouble, I just need the real answer."

When they tell the truth: "Thank you for being honest. That takes courage."

Reward honesty. Don't reward successful lies.`,
        highlight: '"Let\'s try again. I just need the real answer."',
      },
      repair: {
        title: 'Already Made a Big Deal About Small Lies?',
        content: `You interrogated: "Look me in the eye! Are you LYING to me?!"

Now they're afraid of you AND still lying — just more carefully.

Here's how to repair:

"I've been making a big deal about small things, and I think that's made it harder for you to tell the truth. I'm sorry. From now on, if I catch a fib, I'll just calmly ask for the truth. And when you're honest — even about stuff you didn't do — I won't yell. I'll thank you. Let's try this together."

Trust takes time to rebuild. Be patient.`,
        highlight: '"I\'ll thank you for honesty."',
      },
    },
    tomorrowTeaser: 'When They Won\'t Say Sorry',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 30: RAHMA - When They Won't Say Sorry
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-030-rahma-wont-apologize',
    dayNumber: 30,
    trait: 'rahma',
    title: 'When They Won\'t Say Sorry',
    subtitle: 'Moving from forced apologies to genuine repair',
    steps: {
      moment: {
        title: 'The Moment',
        content: `They did something wrong. Clearly wrong. Maybe they hurt someone, broke something, or said something unkind.

"Say sorry."

They clamp their mouth shut. Cross their arms. Refuse.

"SAY SORRY NOW!"

Either they cave and mutter an empty "sorry" (which means nothing), or the standoff continues.

Why is this so hard? Why won't they just apologize?`,
        highlight: 'Why won\'t they just apologize?',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'الصُّلْحُ خَيْرٌ',
        arabicTranslation: '"Reconciliation is best."',
        reference: 'Quran 4:128',
        content: `Islam values reconciliation — real repair of relationships.

But the Prophet ﷺ never forced empty words. He invited genuine repentance, genuine connection, genuine making-things-right.

An apology without meaning isn't repair. It's compliance.

True remorse comes from:
1. Understanding what you did
2. Feeling how it affected the other person
3. Wanting to make it right

We can guide children to all three — without forcing hollow words.`,
        highlight: 'An apology without meaning isn\'t repair.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Children refuse to apologize for several reasons:
• They don't understand what they did wrong
• They feel ashamed and defensive
• They're still emotionally flooded
• They don't feel sorry yet

Forcing the words doesn't create any of the understanding or feeling needed for genuine remorse.

But if we:
1. Give them time to calm down
2. Help them understand the impact
3. Let them choose how to repair

...the apology often comes naturally. And it's real.

"What could you do to help your sister feel better?"

That question invites genuine repair, not empty words.`,
        highlight: '"What could you do to help them feel better?"',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Replace "say sorry" with "make it right":

1. When harm happens, tend to the hurt person first.

2. Give the one who caused harm time to calm down (even just 5 minutes).

3. Then, privately, help them understand: "Your sister is really sad. She felt hurt when you grabbed her toy."

4. Ask: "What could you do to help her feel better?"

5. Let them suggest. If they're stuck: "Would you like to give her a hug? Draw her a picture? Let her have a turn?"

6. If they do apologize spontaneously: "That was a real apology. I could tell you meant it."

7. If they won't apologize but do another repair action: accept it. Repair has many forms.`,
        highlight: '"What could you do to help her feel better?"',
      },
      repair: {
        title: 'Already Forced Hollow Apologies?',
        content: `Years of "Say sorry. Say it like you mean it. LOUDER."

Now "sorry" means nothing in your house.

Here's how to reset:

"I think I've made 'sorry' into a word you have to say instead of something you feel. I'm sorry for that. From now on, when someone gets hurt or upset, instead of making you say sorry, I'll ask: 'What could you do to make it right?' The answer might be a hug, a help, or yes, a 'sorry' — but it should come from your heart. Deal?"

Then let them practice genuine repair. It takes time.`,
        highlight: '"Sorry should come from your heart."',
      },
    },
    tomorrowTeaser: 'When They\'re Jealous of Friends\' Things',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 31: SHUKR - When They're Jealous of Friends' Things
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-031-shukr-jealous-friends',
    dayNumber: 31,
    trait: 'shukr',
    title: 'When They\'re Jealous of Friends\' Things',
    subtitle: 'Transforming envy into contentment',
    steps: {
      moment: {
        title: 'The Moment',
        content: `They come home from a playdate or school, fixated:

"Yusuf has the new PlayStation. Why can't I have one?"

"Sara's house is SO big. Our house is small."

"Everyone has it except me."

The comparisons are endless. The wanting never stops.

You try to explain — budgets, priorities, different families — but nothing seems to help.

How do you raise a content child in a world of constant comparison?`,
        highlight: 'How do you raise a content child in a world of constant comparison?',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'وَلَا تَمُدَّنَّ عَيْنَيْكَ إِلَىٰ مَا مَتَّعْنَا بِهِ أَزْوَاجًا مِّنْهُمْ',
        arabicTranslation: '"Do not extend your eyes toward that by which We have given enjoyment to some of them."',
        reference: 'Quran 20:131',
        content: `Even the Prophet ﷺ was reminded: don't look longingly at what others have.

This isn't about pretending blessings don't exist. It's about where we focus.

The Islamic antidote to envy is twofold:
1. Look at those who have less (to build gratitude)
2. Look at your own blessings (to feel abundance)

Contentment isn't getting everything you want. It's wanting what you have.`,
        highlight: 'Contentment isn\'t getting everything you want. It\'s wanting what you have.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Children don't naturally have perspective. Their world is small — their friends, their school, their neighborhood.

If everyone around them seems to have more, they feel like the only ones without.

Lectures about gratitude don't work because they feel like criticism: "You should be grateful."

What works better:
• Expanding their perspective (what do they have that others don't?)
• Modeling contentment (talking about what YOU'RE grateful for)
• Limiting exposure to comparison triggers
• Making gratitude a daily practice, not a lecture

Contentment grows slowly, through repeated small moments.`,
        highlight: 'Contentment grows through repeated small moments.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `When jealousy surfaces, try the "Full Picture" conversation:

1. Validate: "It sounds like you really want what Yusuf has. I understand."

2. Curiosity: "What do you think it would feel like to have that?"

3. Full picture: "You know, Yusuf might look at things you have and wish he had them too. What's something you have that you really love?"

4. Perspective: "Allah gives different things to different families. What matters is what we do with what we have."

5. Gratitude redirect: "Let's think of three things we're grateful for right now."

No lecture. Just gentle redirection.`,
        highlight: '"What\'s something you have that you really love?"',
      },
      repair: {
        title: 'Already Dismissed Their Feelings?',
        content: `"Stop complaining! You have plenty! Some kids have nothing!"

The guilt trip. We've all done it.

Here's how to repair:

"When you told me about Yusuf's PlayStation, I dismissed how you felt. I'm sorry. It's okay to want things. That's human. What I want us to work on together is also noticing what we have. Not because wanting is bad, but because noticing blessings makes us happier. Can we try that together?"

Then practice gratitude with them, not at them.`,
        highlight: '"Noticing blessings makes us happier."',
      },
    },
    tomorrowTeaser: 'When They\'re Anxious About School',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 32: TAWAKKUL - When They're Anxious About School
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-032-tawakkul-school-anxiety',
    dayNumber: 32,
    trait: 'tawakkul',
    title: 'When They\'re Anxious About School',
    subtitle: 'Building trust in Allah through life\'s challenges',
    steps: {
      moment: {
        title: 'The Moment',
        content: `Every morning, the stomachaches. The tears. The "I don't want to go."

Maybe it's a test they're worried about. Maybe social dynamics. Maybe just the overwhelm of it all.

"You'll be fine! School is fun!"

But they're not fine. And dismissing their anxiety doesn't make it go away.

You watch them struggle and feel helpless. How do you help an anxious child face their fears?`,
        highlight: 'How do you help an anxious child face their fears?',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
        arabicTranslation: '"Allah is sufficient for us, and He is the best disposer of affairs."',
        reference: 'Quran 3:173',
        content: `This was said by the believers when facing an overwhelming army. They were scared — and they turned to Allah.

Tawakkul isn't the absence of fear. It's trusting Allah in the midst of fear.

The Prophet ﷺ faced countless difficult situations. He felt worry, sadness, and pressure. But he combined effort with trust.

We can teach children: Feel the fear. Make dua. Do your best. Trust the outcome to Allah.`,
        highlight: 'Feel the fear. Make dua. Do your best. Trust the outcome to Allah.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Anxiety is real. It's not weakness or drama. Children who feel anxious are experiencing genuine distress.

Dismissing anxiety ("Just relax!") makes it worse. The child feels unheard AND still anxious.

But validation combined with coping tools actually helps:

1. Acknowledge the feeling
2. Provide a concrete tool (dua, breathing, a plan)
3. Walk through the fear with them
4. Celebrate brave steps

"I know this feels scary. Let's make dua together, and then let's talk about what you're most worried about."

Now they're not alone with the anxiety.`,
        highlight: '"Let\'s make dua together."',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Create a "Brave Morning" routine for school anxiety:

1. The night before: "What are you most worried about tomorrow?" Listen fully.

2. Make dua together: "Allah, help [child] feel brave tomorrow. Be with them."

3. Morning: "Remember, Allah is with you. You can do hard things."

4. Give a physical anchor: A small item in their pocket they can touch when anxious. "When you feel worried, touch this and remember: Allah is with me, and I can do this."

5. After school: "What was one brave thing you did today?"

Don't ask "Was it fine?" — that dismisses their struggle. Ask what was hard AND what went well.`,
        highlight: '"Allah is with you. You can do hard things."',
      },
      repair: {
        title: 'Already Dismissed Their Anxiety?',
        content: `"There's nothing to worry about! Just go!"

You were frustrated. Maybe late. Maybe tired of the daily battle.

Here's how to repair:

"I haven't been taking your worries about school seriously. I'm sorry. When you feel anxious, that's real, even if I can't see it. From now on, I'll listen. We'll make a plan together. And we'll ask Allah for help. You don't have to face this alone."

Then follow through. Morning anxiety needs patience and presence.`,
        highlight: '"You don\'t have to face this alone."',
      },
    },
    tomorrowTeaser: 'When They Hit or Bite',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 33: SABR - When They Hit or Bite
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-033-sabr-hitting-biting',
    dayNumber: 33,
    trait: 'sabr',
    title: 'When They Hit or Bite',
    subtitle: 'Responding to aggression with calm teaching',
    steps: {
      moment: {
        title: 'The Moment',
        content: `It happens fast. One second they're playing, the next — they've hit their sibling. Or bitten you. Or thrown something at another child.

"NO HITTING!"

You grab their arm. They cry. The other child cries. Everyone is upset.

This isn't the first time. You're worried: Is something wrong with my child? Are they aggressive?

Hitting and biting are alarming. But they're also developmentally normal in young children who don't yet have words for big feelings.`,
        highlight: 'Hitting is developmentally normal in young children without words for big feelings.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'وَإِذَا غَضِبَ أَحَدُكُمْ فَلْيَسْكُتْ',
        arabicTranslation: '"When one of you becomes angry, let him be silent."',
        reference: 'Musnad Ahmad',
        content: `The Prophet ﷺ taught that anger requires management. We don't act on it — we pause.

But young children can't do this yet. Their brains aren't developed enough for impulse control. When flooded with anger or frustration, they act physically because they don't have other tools.

Our job isn't to punish the hitting. It's to:
1. Keep everyone safe
2. Stay calm ourselves
3. Teach alternative responses

Sabr — patience — is needed most in these explosive moments.`,
        highlight: 'Our job is to teach alternative responses.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Hitting is communication. The child is saying: "I'm overwhelmed and I don't know what to do with this feeling."

Punishment doesn't teach them what TO do. It just adds fear to the overwhelm.

But if we:
1. Stay calm (model regulation)
2. Stop the behavior physically (block the hit, remove them)
3. Name the feeling: "You're really angry"
4. Teach the replacement: "When you're angry, you can stomp your feet / squeeze this / use words"

...they gradually learn. It takes many, many repetitions. That's normal.

Hitting usually decreases significantly by age 4-5 as language develops.`,
        highlight: 'Hitting is communication: "I\'m overwhelmed."',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Create a "What to do when you're angry" plan:

1. When NOT in a heated moment, teach alternatives:
   - "When you feel like hitting, you can HIT THIS pillow instead"
   - "You can stomp your feet really hard"
   - "You can say 'I'M SO MAD!'"
   - "You can come get me for help"

2. Practice! Pretend to be angry together and practice the alternatives.

3. When hitting happens:
   - Block/stop the behavior calmly
   - Tend to the hurt person briefly
   - Say: "You're really angry. Hitting hurts. Remember: you can hit the pillow / stomp / use words."
   - Help them do the alternative

4. Later, when calm: "What happened? What can we do differently next time?"

No long lectures. Just calm, consistent teaching.`,
        highlight: '"You can hit the pillow instead."',
      },
      repair: {
        title: 'Already Reacted With Anger or Hit Back?',
        content: `Maybe you grabbed them roughly. Maybe you yelled. Maybe you even hit them to "teach them not to hit."

It happens. But it teaches: big people hit when angry. Not what you want.

Here's how to repair:

"When you hit, I got really angry and I grabbed you too hard / yelled / [what you did]. That wasn't right. I was trying to teach you not to hit, but I showed you hitting. I'm sorry. We both need to learn what to do with big angry feelings. Let's practice together."

Then model the regulation you want to see.`,
        highlight: '"We both need to learn what to do with big angry feelings."',
      },
    },
    tomorrowTeaser: 'When They Won\'t Clean Their Room',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 34: IHSAN - When They Won't Clean Their Room
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-034-ihsan-cleaning-room',
    dayNumber: 34,
    trait: 'ihsan',
    title: 'When They Won\'t Clean Their Room',
    subtitle: 'Building responsibility with realistic expectations',
    steps: {
      moment: {
        title: 'The Moment',
        content: `"Clean your room."

An hour later, they've moved three toys and are now playing with a fourth.

The room looks exactly the same. Maybe worse.

"I SAID CLEAN YOUR ROOM!"

"I am cleaning!"

But clearly, they're not. You're exhausted from repeating yourself.

Why is this so hard? Why can't they just clean?`,
        highlight: 'Why can\'t they just clean?',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ',
        arabicTranslation: '"Allah loves that when one of you does something, they do it with excellence."',
        reference: 'Al-Bayhaqi',
        content: `Ihsan means doing things with excellence and care. It's a beautiful value to teach.

But children don't know HOW to clean a messy room. They see chaos and feel overwhelmed. They don't know where to start.

"Clean your room" is vague. It's like saying "be successful" — true, but not helpful.

Ihsan in parenting means: breaking down tasks into doable steps and guiding them toward excellence, not demanding it.`,
        highlight: 'Children don\'t know HOW to clean a messy room.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Executive function — the brain skill that handles planning, organizing, and completing multi-step tasks — is still developing in children.

A messy room is overwhelming. They literally don't see the steps.

When we say "clean your room" and they flounder, we get frustrated. But it's not defiance — it's a skill gap.

The solution: break it down.

"First, let's put all the books on the shelf."
"Now let's put all the dirty clothes in the basket."
"Now let's put the Legos in this bin."

One category at a time. Doable. Clear. Eventually, they learn to break it down themselves.`,
        highlight: 'One category at a time.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Try the "One Thing at a Time" method:

1. Stand with them in the messy room.

2. Say: "This looks like a lot. Let's do it together, one category at a time."

3. Name ONE thing: "First, let's find all the books and put them on the shelf. I'll help."

4. Do it together. Celebrate: "Look, the books are done! That was fast."

5. Next category: "Now let's find all the dirty clothes."

6. Continue until done, or until they can take over.

Over time, they learn: big jobs = small steps.

Eventually, you can just prompt: "What's the first category you'll tackle?"`,
        highlight: '"Let\'s do it together, one category at a time."',
      },
      repair: {
        title: 'Already Yelled About the Messy Room?',
        content: `"Your room is DISGUSTING! I'm throwing everything away!"

You were overwhelmed too. The mess felt disrespectful.

Here's how to repair:

"I yelled about your room, and that wasn't helpful. The truth is, cleaning a big mess is hard. I should have helped you break it down into steps instead of just yelling. I'm sorry. Let's try again. We'll do it together, one thing at a time. And I'll teach you how so eventually you can do it yourself."

Then follow through with patient teaching.`,
        highlight: '"Cleaning a big mess is hard."',
      },
    },
    tomorrowTeaser: 'When They\'re Disrespectful in Public',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 35: ADAB - When They're Disrespectful in Public
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-035-adab-public-disrespect',
    dayNumber: 35,
    trait: 'adab',
    title: 'When They\'re Disrespectful in Public',
    subtitle: 'Handling embarrassing moments with grace',
    steps: {
      moment: {
        title: 'The Moment',
        content: `You're at a gathering. Relatives, friends, acquaintances all around.

And your child says something mortifying. Rude, defiant, embarrassing.

"I don't want to kiss Auntie, she smells weird!"

Or they ignore an elder. Or they talk back to you in front of everyone.

All eyes are on you. You feel the judgment. The heat rises in your face.

The urge to over-correct publicly is overwhelming.`,
        highlight: 'All eyes are on you.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'مَنْ سَتَرَ مُسْلِمًا سَتَرَهُ اللَّهُ',
        arabicTranslation: '"Whoever covers (the faults of) a Muslim, Allah will cover him."',
        reference: 'Sahih Muslim 2699',
        content: `The Prophet ﷺ corrected privately whenever possible. He preserved dignity even when addressing mistakes.

When someone made an error in the mosque, he didn't call them out publicly. He addressed the behavior without humiliating the person.

Our children deserve the same: correction without humiliation.

Public shaming doesn't teach respect. It teaches: my parent will embarrass me in front of others.

We can hold boundaries and hold their dignity at the same time.`,
        highlight: 'Correction without humiliation.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `When you correct publicly and harshly, two things happen:

1. Your child becomes defensive, not reflective
2. They learn: public humiliation is an acceptable response to mistakes

Neither helps them develop genuine adab.

But if you:
- Stay calm in the moment
- Briefly redirect or remove them
- Address it fully in private later

...they actually learn. And your relationship stays intact.

"We're going to talk about this later" is a powerful sentence. It shows: this matters, but I won't embarrass you.`,
        highlight: '"We\'re going to talk about this later."',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Develop your "Public Moment" response plan:

In the moment:
1. Take a breath. Don't react from embarrassment.
2. Brief redirect: "We don't say that" or "Come with me for a moment."
3. If needed, briefly remove them from the situation.
4. To others (if necessary): "We're working on manners. Thanks for your patience."

Later, in private:
1. "What happened back there with Auntie?"
2. Listen to their perspective.
3. Teach: "I understand you didn't want to kiss her. But saying she smells weird was hurtful. What could you have said instead?"
4. Practice the alternative.
5. If appropriate, have them apologize privately to the person later.

Calm teaching beats public shaming every time.`,
        highlight: '"We\'re working on manners. Thanks for your patience."',
      },
      repair: {
        title: 'Already Shamed Them Publicly?',
        content: `"I can't believe you said that! Apologize RIGHT NOW! We raised you better than this!"

Everyone watched. Your child was humiliated. Maybe they cried.

Here's how to repair:

"I was embarrassed at the gathering and I corrected you in front of everyone. That wasn't fair to you. I should have waited and talked to you privately. I'm sorry I made you feel small in front of others. Next time, I'll handle it differently. Can we talk about what happened and how to do better?"

Model the grace you want them to learn.`,
        highlight: '"I should have talked to you privately."',
      },
    },
    tomorrowTeaser: 'When They Ask Hard Questions About Allah',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 36: TAWAKKUL - When They Ask Hard Questions About Allah
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-036-tawakkul-questions-allah',
    dayNumber: 36,
    trait: 'tawakkul',
    title: 'When They Ask Hard Questions About Allah',
    subtitle: 'Nurturing faith through honest conversation',
    steps: {
      moment: {
        title: 'The Moment',
        content: `"Mama, why can't we see Allah?"

"Why did Allah let Grandpa die?"

"How do we know Allah is real?"

"Why do bad things happen to good people?"

The questions catch you off guard. You want to say the right thing. You don't want to damage their faith.

But you're not sure what to say. You weren't expecting a theology class during breakfast.`,
        highlight: 'You weren\'t expecting a theology class during breakfast.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'سَلُوا اللَّهَ مِنْ فَضْلِهِ',
        arabicTranslation: '"Ask Allah of His bounty."',
        reference: 'Sunan al-Tirmidhi 2325',
        content: `The Prophet ﷺ was asked countless questions — some simple, some profound, some that had no easy answer.

He responded with patience, honesty, and simplicity. He didn't shame questioners. He welcomed curiosity.

Children asking hard questions about Allah is a GOOD sign. It means they're thinking deeply about faith.

Our job isn't to have all the answers. It's to create a space where questions are safe, and faith can grow through honest exploration.`,
        highlight: 'Questions are a sign they\'re thinking deeply about faith.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Children who can't ask questions at home will ask them elsewhere — or bury them until they become doubts.

When you shut down questions ("Don't ask that!" or "Just believe!"), they learn: faith doesn't welcome curiosity.

But when you engage thoughtfully — even saying "That's a beautiful question. I don't know the full answer, but here's what I believe..." — they learn: faith is strong enough for questions.

Faith isn't blind acceptance. It's trust that deepens through reflection, questions, and personal connection to Allah.`,
        highlight: '"That\'s a beautiful question."',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `When hard questions come, try this approach:

1. Validate: "That's a really thoughtful question. I'm glad you asked."

2. Reflect back: "What made you think about that?"

3. Be honest: "Here's what I believe... / Here's what I was taught... / I'm not sure about everything, but..."

4. Keep it simple: Age-appropriate answers. Don't over-explain.

5. Leave room: "What do you think?"

Example: "Why can't we see Allah?"
"Allah is so different from everything else that our eyes can't see Him. But we can feel He's there — when we make dua and feel peace, when we see how beautiful the world is, when we feel love. We'll see Him in Jannah one day, inshaAllah."

Invite conversation, not lecture.`,
        highlight: '"What do you think?"',
      },
      repair: {
        title: 'Already Shut Down Their Questions?',
        content: `"Don't ask that! Just believe! That's haram to question!"

You were scared. Maybe you didn't know the answer. Maybe you worried about their faith.

Here's how to repair:

"Remember when you asked about [question] and I said not to ask that? I was wrong. You can always ask me anything about Allah, Islam, anything. That's how we learn. Some questions don't have easy answers, but we can explore together. I'm sorry I made you feel like you couldn't ask. What else have you been wondering about?"

Then listen. Really listen.`,
        highlight: '"You can always ask me anything."',
      },
    },
    tomorrowTeaser: 'When They\'re Being Sneaky',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 37: SIDQ - When They're Being Sneaky
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-037-sidq-being-sneaky',
    dayNumber: 37,
    trait: 'sidq',
    title: 'When They\'re Being Sneaky',
    subtitle: 'Building openness instead of secrecy',
    steps: {
      moment: {
        title: 'The Moment',
        content: `You find the candy wrappers hidden under their bed.

Or the tablet they were supposed to have put away — being used under the covers at night.

Or they did something they knew was wrong, and covered it up.

It's not just the behavior. It's the sneaking. The hiding. The deliberate deception.

"Why are you being so sneaky? You know you can tell me things!"

But clearly, they don't feel that way.`,
        highlight: 'Clearly, they don\'t feel they can tell you things.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'دَعْ مَا يَرِيبُكَ إِلَى مَا لاَ يَرِيبُكَ',
        arabicTranslation: '"Leave what makes you doubtful for what does not make you doubtful."',
        reference: 'Sunan al-Tirmidhi 2518',
        content: `The Prophet ﷺ encouraged living openly, without the burden of secrets and deception.

But children sneak for a reason. Usually: they want something, they know you'll say no, and they haven't found another way.

Sneaking is a sign of two things:
1. They have a need or desire that isn't being met
2. They don't feel safe bringing it to you directly

The solution isn't more surveillance. It's building a relationship where they want to come to you.`,
        highlight: 'Sneaking is a sign they don\'t feel safe bringing it to you.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Sneaking happens when the cost of asking feels higher than the cost of hiding.

If asking leads to automatic "no," lectures, or disappointment, children stop asking. They find workarounds.

But if asking leads to being heard — even if the answer is sometimes no — they stay open.

"I understand you really want screen time. The answer is no right now, but thank you for asking instead of sneaking."

When children feel heard, even in no, they don't need to sneak.

The goal isn't to catch them. It's to make openness easier than secrecy.`,
        highlight: 'Make openness easier than secrecy.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `When you discover sneaking:

1. Stay calm. Reactivity makes them hide better next time.

2. Name what you found without interrogation: "I found the candy wrappers under your bed."

3. Get curious, not furious: "Help me understand what happened. I'm not going to yell."

4. Listen to their reason. Often it's just: "I really wanted it."

5. Address the underlying need: "I hear you really wanted candy. Let's talk about when you can have some."

6. Address the sneaking: "I understand wanting things. But hiding worries me more than the candy. I want you to feel you can come to me, even if I might say no."

7. End with connection: "Next time, let's talk about it first. Deal?"`,
        highlight: '"I want you to feel you can come to me."',
      },
      repair: {
        title: 'Already Reacted Harshly to Sneaking?',
        content: `"I can't trust you anymore! You're always hiding things! No screen time for a month!"

The punishment was big. Trust felt broken.

Here's how to repair:

"I got really upset when I found out you were sneaking. I said some harsh things and gave a big punishment. I think I scared you instead of helping you. Here's the truth: I want you to come to me with things. I might not always say yes, but I'll always listen. Let's try again. What do you need right now that you've been afraid to ask for?"

Then actually listen. Even if the answer is hard.`,
        highlight: '"What do you need that you\'ve been afraid to ask for?"',
      },
    },
    tomorrowTeaser: 'When They Have No Confidence',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 38: IHSAN - When They Have No Confidence
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-038-ihsan-low-confidence',
    dayNumber: 38,
    trait: 'ihsan',
    title: 'When They Have No Confidence',
    subtitle: 'Building genuine self-worth from the inside out',
    steps: {
      moment: {
        title: 'The Moment',
        content: `"I'm stupid."

"I can't do anything right."

"Everyone else is better than me."

"I'm ugly."

The words hurt to hear. You want to fix it immediately: "No you're not! You're amazing! You're beautiful! You're so smart!"

But they roll their eyes. They don't believe you.

How do you build real confidence that lasts?`,
        highlight: 'They don\'t believe your reassurances.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'لَقَدْ خَلَقْنَا الْإِنسَانَ فِي أَحْسَنِ تَقْوِيمٍ',
        arabicTranslation: '"We have certainly created the human being in the best of forms."',
        reference: 'Quran 95:4',
        content: `In Islam, every person has inherent worth — not because of what they achieve, but because Allah created them with purpose.

The Prophet ﷺ built confidence in the companions by seeing their potential and giving them meaningful responsibility.

He didn't just compliment them. He trusted them with real tasks. They grew through contribution, not flattery.

True confidence comes from:
1. Knowing your worth comes from Allah
2. Experiencing competence through real accomplishment
3. Being valued for who you are, not just what you do`,
        highlight: 'True confidence comes from real accomplishment, not flattery.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Generic praise ("You're so smart!") doesn't build confidence. It can actually backfire — creating pressure to live up to labels.

Children with low confidence need:

1. Specific praise for effort: "I saw how hard you worked on that"
2. Real responsibility: Tasks they can actually succeed at
3. Failure normalized: "Everyone struggles. That's how we grow."
4. Unconditional love: "I love you no matter what"

Confidence grows from the inside, through accumulated experiences of capability and belonging.

You can't talk them into confidence. But you can create conditions for it to grow.`,
        highlight: 'You can\'t talk them into confidence. You can create conditions for it.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Build confidence through "Competence and Contribution":

1. Give them a real responsibility they can master:
   - "You're in charge of watering the plants every day."
   - "I need you to set the table for dinner."

2. Let them struggle (a little). Don't rescue immediately.

3. Notice effort, not just results: "I saw how carefully you did that."

4. When they say "I can't," respond: "You can't do it YET. Let's try together."

5. Share your own struggles: "I had a hard time with [thing] too. I kept practicing."

6. Ground their worth in Allah: "Allah made you exactly as you're supposed to be. You have gifts no one else has."

7. Avoid comparison: Don't compare them to siblings or friends.`,
        highlight: '"You can\'t do it YET."',
      },
      repair: {
        title: 'Already Compared or Criticized?',
        content: `"Why can't you be more like your brother?"

"That was terrible. Do it again."

Maybe you thought tough love would motivate them. Instead, it crushed them.

Here's how to repair:

"I've said some things that made you feel like you're not good enough. I'm sorry. That was wrong. The truth is: Allah made you exactly as you should be. You have strengths that are yours alone. I love you not for what you achieve, but for who you are. Let me try to show that better."

Then catch them doing things right. Often. Specifically.`,
        highlight: '"I love you for who you are, not what you achieve."',
      },
    },
    tomorrowTeaser: 'When They\'re Unkind to Animals',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 39: RAHMA - When They're Unkind to Animals
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-039-rahma-unkind-animals',
    dayNumber: 39,
    trait: 'rahma',
    title: 'When They\'re Unkind to Animals',
    subtitle: 'Extending mercy to all creatures',
    steps: {
      moment: {
        title: 'The Moment',
        content: `You see them pull the cat's tail. Or throw rocks at birds. Or handle an insect roughly.

"STOP THAT! Don't hurt animals!"

But the behavior continues when you're not watching.

You're concerned. Is this normal? Does it mean something about their character?

Usually, it's not cruelty — it's curiosity without understanding. They don't yet grasp that animals feel pain like they do.`,
        highlight: 'Usually it\'s curiosity without understanding.',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'دَخَلَتِ امْرَأَةٌ النَّارَ فِي هِرَّةٍ حَبَسَتْهَا',
        arabicTranslation: '"A woman entered Hell because of a cat she imprisoned."',
        reference: 'Sahih Bukhari 3482',
        content: `The Prophet ﷺ taught that how we treat animals matters to Allah.

He told of a woman who went to Paradise for giving water to a thirsty dog, and another who was punished for starving a cat.

He forbade cruelty in any form: overburdening animals, killing for sport, harming needlessly.

Rahma (mercy) extends to all of Allah's creation — not just humans.

Teaching children to be gentle with animals builds their capacity for mercy toward everyone.`,
        highlight: 'How we treat animals matters to Allah.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Young children are naturally curious about animals. They don't automatically understand that animals feel pain.

When you say "That hurts the cat!" without explanation, they might not connect their action to the animal's suffering.

But when you:
1. Help them see the animal's perspective
2. Teach gentle handling concretely
3. Give them responsibility for animal care
4. Connect it to Islamic values

...they develop empathy that extends beyond animals to all living things.

Kindness to animals is a training ground for kindness to people.`,
        highlight: 'Kindness to animals is training for kindness to people.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Teach "All Creatures Feel":

1. When you see rough handling, intervene calmly: "Wait. Let me show you."

2. Connect to their experience: "Remember when you fell and it hurt? Animals feel pain too. When you pull the cat's tail, it hurts her."

3. Teach gentle handling: "Let me show you how to pet her gently. See? Soft and slow."

4. Model talking to animals kindly: "Hello, kitty. We're going to be gentle with you."

5. Give them a caretaking role: "It's your job to make sure the cat has water every day. That's showing rahma."

6. Connect to Islam: "The Prophet ﷺ said Allah loves those who are kind to animals. Even a bird. Even an ant."

7. When they're gentle, notice: "I saw how carefully you held that butterfly. MashAllah."`,
        highlight: '"Animals feel pain too."',
      },
      repair: {
        title: 'Already Overreacted About Animal Treatment?',
        content: `"What's WRONG with you?! How could you hurt an animal?!"

You were scared about what it meant. You overreacted.

Here's how to repair:

"I got really upset when you were rough with the cat. I said some scary things. I'm sorry. I was worried. Here's what I should have said: animals feel pain just like we do. They can't tell us in words, but they hurt. Let me show you how to be gentle. The Prophet ﷺ taught us to show mercy to all creatures. Can we practice together?"

Then teach, don't shame.`,
        highlight: '"Let me show you how to be gentle."',
      },
    },
    tomorrowTeaser: 'When They Don\'t Include Others',
  },

  // ═══════════════════════════════════════════════════════════════
  // DAY 40: RAHMA - When They Don't Include Others
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'day-040-rahma-excluding-others',
    dayNumber: 40,
    trait: 'rahma',
    title: 'When They Don\'t Include Others',
    subtitle: 'Teaching the beauty of inclusion',
    steps: {
      moment: {
        title: 'The Moment',
        content: `You notice a child standing alone at the edge of the playground. Your child is playing happily with their friends — and hasn't noticed, or hasn't cared.

Or at a party, there's a shy kid no one is talking to. Your child is laughing with the popular group.

"Go include them!"

They roll their eyes. They don't want to. It's awkward.

How do you raise a child who naturally looks out for the lonely?`,
        highlight: 'How do you raise a child who looks out for the lonely?',
      },
      sunnah: {
        title: 'The Sunnah',
        arabicText: 'أَفْشُوا السَّلاَمَ وَأَطْعِمُوا الطَّعَامَ وَصِلُوا الأَرْحَامَ',
        arabicTranslation: '"Spread peace, feed others, and maintain family ties."',
        reference: 'Sunan Ibn Majah 3251',
        content: `The Prophet ﷺ consistently noticed the marginalized, the lonely, the left out.

He would ask about people who were absent. He would make sure everyone was fed. He would include those others overlooked.

His companions learned by watching him: see who's at the edges. Include them. That's character.

Children naturally form groups. Inclusion doesn't come automatically — it's taught.

And it starts with us noticing, pointing out, and gently guiding.`,
        highlight: 'See who\'s at the edges. Include them.',
      },
      whyItWorks: {
        title: 'Why This Works',
        content: `Children are naturally focused on their own experience. Seeing others — especially those on the margins — is a skill that develops with practice.

Forcing inclusion ("Go play with them NOW!") creates resentment, not empathy.

But if you:
1. Notice the lonely child out loud
2. Wonder about their feelings together
3. Suggest easy ways to include
4. Praise when they do reach out

...you build a habit of noticing. Over time, it becomes natural.

The goal isn't forced friendship. It's developing eyes that see the overlooked.`,
        highlight: 'Develop eyes that see the overlooked.',
      },
      todaysAction: {
        title: 'Today\'s Action',
        content: `Practice "Seeing the Edges":

At gatherings, practice noticing together:
"See that boy by himself? I wonder how he's feeling. What do you think?"

Plant the seed: "You know what makes a really good person? Someone who notices when others are left out. The Prophet ﷺ was like that."

Make it their choice: "I'm not going to make you play with them. But what's one small thing you could do to help them feel welcome? Maybe just say salaam?"

Praise when they do: "I saw you go talk to that kid at the playground. That took courage. How did it feel?"

Model it yourself: At gatherings, let them see YOU reaching out to the person standing alone.

Inclusion is caught as much as taught.`,
        highlight: '"What\'s one small thing you could do to help them feel welcome?"',
      },
      repair: {
        title: 'Already Forced Awkward Inclusion?',
        content: `"Go play with them RIGHT NOW or we're leaving!"

You meant well. But forced inclusion feels awful for everyone.

Here's how to repair:

"I pushed you to play with that kid in a way that felt awkward. I'm sorry. I can't force you to be friends with anyone. But I do want to raise you to notice people who are left out. That's what the Prophet ﷺ did. Next time, I'll just point it out and let you decide what to do. But I believe you have a kind heart. I've seen it."

Then keep noticing, keep pointing out, keep believing in their goodness.`,
        highlight: '"I believe you have a kind heart."',
      },
    },
    tomorrowTeaser: 'You\'ve completed 40 days of Tarbiyah! Return to Day 1 to continue the journey.',
  },
];

// Helper functions

/**
 * Get today's lesson based on the current day number in the 40-day cycle.
 * If no dayNumber is provided, it calculates based on a reference start date.
 * The cycle repeats after 40 days.
 */
export function getTodaysLesson(dayNumber?: number): TarbiyahLesson | undefined {
  if (dayNumber !== undefined) {
    return TARBIYAH_LESSONS.find((lesson) => lesson.dayNumber === dayNumber);
  }

  // Calculate day number based on reference date (cycles every 40 days)
  // Using a fixed reference date so the cycle is consistent
  const referenceDate = new Date('2024-01-01').getTime();
  const today = new Date().setHours(0, 0, 0, 0);
  const daysSinceReference = Math.floor((today - referenceDate) / (1000 * 60 * 60 * 24));
  const cycleDay = (daysSinceReference % 40) + 1; // 1-40

  return TARBIYAH_LESSONS.find((lesson) => lesson.dayNumber === cycleDay);
}

export function getLessonByTrait(trait: TarbiyahTrait): TarbiyahLesson[] {
  return TARBIYAH_LESSONS.filter((lesson) => lesson.trait === trait);
}

export function getTraitDisplayName(trait: TarbiyahTrait): string {
  const names: Record<TarbiyahTrait, string> = {
    sabr: 'Sabr (Patience)',
    shukr: 'Shukr (Gratitude)',
    sidq: 'Sidq (Truthfulness)',
    rahma: 'Rahma (Compassion)',
    adab: 'Adab (Manners)',
    tawakkul: 'Tawakkul (Trust in Allah)',
    ihsan: 'Ihsan (Excellence)',
    haya: 'Haya (Modesty)',
  };
  return names[trait];
}

export function getTraitEmoji(trait: TarbiyahTrait): string {
  const emojis: Record<TarbiyahTrait, string> = {
    sabr: '🌿',
    shukr: '🤲',
    sidq: '💎',
    rahma: '💚',
    adab: '🌸',
    tawakkul: '🌙',
    ihsan: '✨',
    haya: '🌷',
  };
  return emojis[trait];
}

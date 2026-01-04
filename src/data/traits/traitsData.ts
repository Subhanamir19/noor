import type { CharacterTrait, ResourceType } from '@/types/models';

export const CHARACTER_TRAITS: CharacterTrait[] = [
  // CORE SPIRITUAL TRAITS (1-8)
  {
    id: 'taqwa',
    name: 'Taqwa',
    arabicName: 'تقوى',
    category: 'spiritual',
    description: 'God-consciousness and mindfulness of Allah in all actions',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "Fear Allah wherever you are, follow up a bad deed with a good one to erase it, and treat people with good character."',
        reference: 'Tirmidhi 1987',
      },
      {
        type: 'quran',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ حَقَّ تُقَاتِهِ',
        translation: 'O you who believe! Fear Allah as He should be feared',
        surah: 'Al-Imran',
        ayah: '3:102',
      },
      {
        type: 'dua',
        arabic: 'اللَّهُمَّ آتِ نَفْسِي تَقْوَاهَا',
        transliteration: 'Allahumma aati nafsee taqwaaha',
        translation: 'O Allah, grant my soul its taqwa (God-consciousness)',
      },
    ],
  },
  {
    id: 'attachment_to_allah',
    name: 'Attachment to Allah',
    category: 'spiritual',
    description: 'Intrinsic motivation to please Allah and seek His pleasure',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "Whoever loves to meet Allah, Allah loves to meet him."',
        reference: 'Bukhari 6507',
      },
      {
        type: 'quran',
        arabic: 'وَالَّذِينَ آمَنُوا أَشَدُّ حُبًّا لِّلَّهِ',
        translation: 'But those who believe are stronger in love for Allah',
        surah: 'Al-Baqarah',
        ayah: '2:165',
      },
      {
        type: 'dua',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ وَحُبَّ مَنْ يُحِبُّكَ',
        transliteration: "Allahumma inni as'aluka hubbaka wa hubba man yuhibbuka",
        translation: 'O Allah, I ask You for Your love and the love of those who love You',
      },
    ],
  },
  {
    id: 'tawakkul',
    name: 'Tawakkul',
    arabicName: 'توكل',
    category: 'spiritual',
    description: 'Trust and reliance on Allah',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "If you were to rely upon Allah with reliance due to Him, He would provide for you just as He provides for the birds; they go out in the morning with empty stomachs and return full."',
        reference: 'Tirmidhi 2344',
      },
      {
        type: 'quran',
        arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
        translation: 'And whoever relies upon Allah - then He is sufficient for him',
        surah: 'At-Talaq',
        ayah: '65:3',
      },
      {
        type: 'dua',
        arabic: 'حَسْبِيَ اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ',
        transliteration: "Hasbiallahu la ilaha illa huwa 'alayhi tawakkaltu",
        translation: 'Allah is sufficient for me; there is no deity except Him. On Him I have relied',
      },
    ],
  },
  {
    id: 'shukr',
    name: 'Shukr',
    arabicName: 'شكر',
    category: 'spiritual',
    description: 'Gratitude to Allah for all blessings',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "He who does not thank people, does not thank Allah."',
        reference: 'Abu Dawud 4811',
      },
      {
        type: 'quran',
        arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
        translation: 'If you are grateful, I will surely increase you [in favor]',
        surah: 'Ibrahim',
        ayah: '14:7',
      },
      {
        type: 'dua',
        arabic: 'اللَّهُمَّ أَعِنِّي عَلَىٰ ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ',
        transliteration: "Allahumma a'inni 'ala dhikrika wa shukrika wa husni 'ibadatika",
        translation: 'O Allah, help me remember You, thank You, and worship You in the best manner',
      },
    ],
  },
  {
    id: 'sabr',
    name: 'Sabr',
    arabicName: 'صبر',
    category: 'spiritual',
    description: 'Patience and perseverance through trials',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "How wonderful is the affair of the believer, for his affairs are all good. If something good happens to him, he gives thanks, and that is good for him; if something bad happens to him, he bears it with patience, and that is good for him."',
        reference: 'Muslim 2999',
      },
      {
        type: 'quran',
        arabic: 'إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ',
        translation: 'Indeed, the patient will be given their reward without account',
        surah: 'Az-Zumar',
        ayah: '39:10',
      },
      {
        type: 'dua',
        arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا',
        transliteration: "Rabbana afrigh 'alayna sabran",
        translation: 'Our Lord, pour upon us patience',
      },
    ],
  },
  {
    id: 'ikhlas',
    name: 'Ikhlas',
    arabicName: 'إخلاص',
    category: 'spiritual',
    description: 'Sincerity in intention and action for Allah alone',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "Actions are judged by intentions, so each man will have what he intended."',
        reference: 'Bukhari 1',
      },
      {
        type: 'quran',
        arabic: 'وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ',
        translation: 'And they were not commanded except to worship Allah, [being] sincere to Him in religion',
        surah: 'Al-Bayyinah',
        ayah: '98:5',
      },
      {
        type: 'dua',
        arabic: 'اللَّهُمَّ طَهِّرْ قَلْبِي مِنَ النِّفَاقِ',
        transliteration: 'Allahumma tahhir qalbi minan-nifaq',
        translation: 'O Allah, purify my heart from hypocrisy',
      },
    ],
  },
  {
    id: 'tawadu',
    name: 'Tawadu',
    arabicName: 'تواضع',
    category: 'spiritual',
    description: 'Humility and modesty before Allah and His creation',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "Whoever humbles himself for Allah, Allah will elevate him."',
        reference: 'Muslim 2588',
      },
      {
        type: 'quran',
        arabic: 'وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا',
        translation: 'And the servants of the Most Merciful are those who walk upon the earth in humility',
        surah: 'Al-Furqan',
        ayah: '25:63',
      },
      {
        type: 'dua',
        arabic: 'اللَّهُمَّ اجْعَلْنِي مُتَوَاضِعًا',
        transliteration: "Allahumma aj'alni mutawadi'an",
        translation: 'O Allah, make me humble',
      },
    ],
  },

  // INTERPERSONAL CHARACTER TRAITS (8-15)
  {
    id: 'respect',
    name: 'Respect',
    category: 'interpersonal',
    description: 'Honoring parents, elders, and all people',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "He is not one of us who does not show mercy to our young ones and respect to our elders."',
        reference: 'Tirmidhi 1919',
      },
      {
        type: 'quran',
        arabic: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا',
        translation: 'And your Lord has decreed that you not worship except Him, and to parents, good treatment',
        surah: 'Al-Isra',
        ayah: '17:23',
      },
      {
        type: 'dua',
        arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
        transliteration: 'Rabbi irhamhuma kama rabbayani saghiran',
        translation: 'My Lord, have mercy upon them as they brought me up when I was small',
      },
    ],
  },
  {
    id: 'sidq',
    name: 'Sidq',
    arabicName: 'صدق',
    category: 'interpersonal',
    description: 'Truthfulness and honesty',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "Truthfulness leads to righteousness, and righteousness leads to Paradise."',
        reference: 'Bukhari 6094',
      },
      {
        type: 'quran',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَكُونُوا مَعَ الصَّادِقِينَ',
        translation: 'O you who have believed, fear Allah and be with those who are true',
        surah: 'At-Tawbah',
        ayah: '9:119',
      },
      {
        type: 'dua',
        arabic: 'رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ',
        transliteration: 'Rabbi adkhilni mudkhala sidqin',
        translation: 'My Lord, cause me to enter with an entrance of truth',
      },
    ],
  },
  {
    id: 'rahma',
    name: 'Rahma',
    arabicName: 'رحمة',
    category: 'interpersonal',
    description: 'Kindness, compassion, and mercy',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "The merciful are shown mercy by the Most Merciful. Be merciful to those on earth, and the One in heaven will be merciful to you."',
        reference: 'Abu Dawud 4941',
      },
      {
        type: 'quran',
        arabic: 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ',
        translation: 'And We have not sent you except as a mercy to the worlds',
        surah: 'Al-Anbiya',
        ayah: '21:107',
      },
      {
        type: 'dua',
        arabic: 'رَبَّنَا هَبْ لَنَا مِن لَّدُنكَ رَحْمَةً',
        transliteration: 'Rabbana hab lana min ladunka rahmatan',
        translation: 'Our Lord, grant us from Yourself mercy',
      },
    ],
  },
  {
    id: 'karam',
    name: 'Karam',
    arabicName: 'كرم',
    category: 'interpersonal',
    description: 'Generosity and giving',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "The generous person is close to Allah, close to Paradise, close to people, and far from Hell."',
        reference: 'Tirmidhi 1961',
      },
      {
        type: 'quran',
        arabic: 'وَمَا تُنفِقُوا مِنْ خَيْرٍ فَلِأَنفُسِكُمْ',
        translation: 'And whatever you spend of good - it is for yourselves',
        surah: 'Al-Baqarah',
        ayah: '2:272',
      },
      {
        type: 'dua',
        arabic: 'اللَّهُمَّ اجْعَلْنِي مِنَ الْكَرِيمِينَ',
        transliteration: "Allahumma aj'alni minal-karimin",
        translation: 'O Allah, make me among the generous',
      },
    ],
  },
  {
    id: 'forgiveness',
    name: 'Forgiveness',
    category: 'interpersonal',
    description: "Pardoning others and seeking Allah's forgiveness",
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "Charity does not decrease wealth, no one forgives except that Allah increases his honor, and no one humbles himself for the sake of Allah except that Allah raises his status."',
        reference: 'Muslim 2588',
      },
      {
        type: 'quran',
        arabic: 'وَلْيَعْفُوا وَلْيَصْفَحُوا ۗ أَلَا تُحِبُّونَ أَن يَغْفِرَ اللَّهُ لَكُمْ',
        translation: 'Let them pardon and overlook. Would you not like that Allah should forgive you?',
        surah: 'An-Nur',
        ayah: '24:22',
      },
      {
        type: 'dua',
        arabic: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ',
        transliteration: 'Rabbana ighfir lana wa li-ikhwaninal-ladhina sabaquna bil-iman',
        translation: 'Our Lord, forgive us and our brothers who preceded us in faith',
      },
    ],
  },
  {
    id: 'adab',
    name: 'Adab',
    arabicName: 'أدب',
    category: 'interpersonal',
    description: 'Good manners, courtesy, and proper behavior',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "I was sent to perfect good character."',
        reference: 'Ahmad 8595',
      },
      {
        type: 'quran',
        arabic: 'وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ',
        translation: 'And indeed, you are of a great moral character',
        surah: 'Al-Qalam',
        ayah: '68:4',
      },
      {
        type: 'dua',
        arabic: 'اللَّهُمَّ حَسِّنْ خُلُقِي',
        transliteration: 'Allahumma hassin khuluqi',
        translation: 'O Allah, make my character good',
      },
    ],
  },
  {
    id: 'empathy',
    name: 'Empathy',
    category: 'interpersonal',
    description: 'Understanding and sharing the feelings of others',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "None of you truly believes until he loves for his brother what he loves for himself."',
        reference: 'Bukhari 13',
      },
      {
        type: 'quran',
        arabic: 'وَتَوَاصَوْا بِالصَّبْرِ وَتَوَاصَوْا بِالْمَرْحَمَةِ',
        translation: 'And advised each other to patience and advised each other to compassion',
        surah: 'Al-Balad',
        ayah: '90:17',
      },
      {
        type: 'dua',
        arabic: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي رَحْمَةً',
        transliteration: "Allahumma aj'al fi qalbi rahmatan",
        translation: 'O Allah, place mercy in my heart',
      },
    ],
  },
  {
    id: 'justice',
    name: 'Justice',
    category: 'interpersonal',
    description: 'Fairness and equity in all dealings',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "Those who are just will be with Allah upon pulpits of light, those who are just in their rulings, with their families, and in all that they are responsible for."',
        reference: 'Muslim 1827',
      },
      {
        type: 'quran',
        arabic: 'إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ',
        translation: 'Indeed, Allah orders justice and good conduct',
        surah: 'An-Nahl',
        ayah: '16:90',
      },
      {
        type: 'dua',
        arabic: 'رَبَّنَا افْتَحْ بَيْنَنَا وَبَيْنَ قَوْمِنَا بِالْحَقِّ',
        transliteration: 'Rabbana iftah baynana wa bayna qawmina bil-haqq',
        translation: 'Our Lord, decide between us and our people in truth',
      },
    ],
  },

  // SELF-REGULATION TRAITS (16-21)
  {
    id: 'self_control',
    name: 'Self-Control',
    category: 'self_regulation',
    description: 'Discipline and restraint over desires',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "The strong person is not the one who can wrestle, but the strong person is the one who controls himself in a fit of rage."',
        reference: 'Bukhari 6114',
      },
      {
        type: 'quran',
        arabic: 'وَأَمَّا مَنْ خَافَ مَقَامَ رَبِّهِ وَنَهَى النَّفْسَ عَنِ الْهَوَىٰ',
        translation: 'But as for he who feared the position of his Lord and prevented the soul from [unlawful] inclination',
        surah: "An-Nazi'at",
        ayah: '79:40',
      },
      {
        type: 'dua',
        arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي',
        transliteration: "Allahumma inni a'udhu bika min sharri nafsi",
        translation: 'O Allah, I seek refuge in You from the evil of my soul',
      },
    ],
  },
  {
    id: 'responsibility',
    name: 'Responsibility',
    category: 'self_regulation',
    description: "Being accountable for one's actions",
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "Each of you is a shepherd and each of you is responsible for his flock."',
        reference: 'Bukhari 893',
      },
      {
        type: 'quran',
        arabic: 'كُلُّ نَفْسٍ بِمَا كَسَبَتْ رَهِينَةٌ',
        translation: 'Every soul, for what it has earned, will be retained',
        surah: 'Al-Muddaththir',
        ayah: '74:38',
      },
      {
        type: 'dua',
        arabic: 'رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا',
        transliteration: "Rabbana la tu'akhidhna in nasina aw akhta'na",
        translation: 'Our Lord, do not impose blame upon us if we forget or make a mistake',
      },
    ],
  },
  {
    id: 'courage',
    name: 'Courage',
    category: 'self_regulation',
    description: 'Bravery in facing challenges for the sake of Allah',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "The strong believer is better and more beloved to Allah than the weak believer, although both are good."',
        reference: 'Muslim 2664',
      },
      {
        type: 'quran',
        arabic: 'فَلَا تَخَافُوهُمْ وَخَافُونِ إِن كُنتُم مُّؤْمِنِينَ',
        translation: 'So do not fear them, but fear Me, if you are [indeed] believers',
        surah: 'Al-Imran',
        ayah: '3:175',
      },
      {
        type: 'dua',
        arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
        transliteration: "Hasbunallahu wa ni'mal-wakil",
        translation: 'Sufficient for us is Allah, and [He is] the best Disposer of affairs',
      },
    ],
  },
  {
    id: 'perseverance',
    name: 'Perseverance',
    category: 'self_regulation',
    description: 'Persistence in doing good despite difficulties',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "The most beloved deeds to Allah are those that are most consistent, even if they are small."',
        reference: 'Bukhari 6464',
      },
      {
        type: 'quran',
        arabic: 'وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ',
        translation: 'And be patient, for indeed, Allah does not allow to be lost the reward of those who do good',
        surah: 'Hud',
        ayah: '11:115',
      },
      {
        type: 'dua',
        arabic: 'رَبَّنَا أَفْرِغْ عَلَيْنَا صَبْرًا وَثَبِّتْ أَقْدَامَنَا',
        transliteration: "Rabbana afrigh 'alayna sabran wa thabbit aqdamana",
        translation: 'Our Lord, pour upon us patience and make firm our feet',
      },
    ],
  },
  {
    id: 'self_awareness',
    name: 'Self-Awareness',
    category: 'self_regulation',
    description: "Understanding one's emotions and inner state",
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "Take account of yourselves before you are taken to account."',
        reference: 'Tirmidhi 2459',
      },
      {
        type: 'quran',
        arabic: 'بَلِ الْإِنسَانُ عَلَىٰ نَفْسِهِ بَصِيرَةٌ',
        translation: 'Rather, man is a witness against himself',
        surah: 'Al-Qiyamah',
        ayah: '75:14',
      },
      {
        type: 'dua',
        arabic: 'اللَّهُمَّ أَرِنِي الْحَقَّ حَقًّا وَارْزُقْنِي اتِّبَاعَهُ',
        transliteration: "Allahumma arinal-haqqa haqqan warzuqnit-tiba'ah",
        translation: 'O Allah, show me truth as truth and grant me to follow it',
      },
    ],
  },

  // SOCIAL CHARACTER TRAITS (22-26)
  {
    id: 'cooperation',
    name: 'Cooperation',
    category: 'social',
    description: 'Working together and teamwork',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "The believers, in their love, mercy, and compassion for one another are like a body; if one part feels pain, the whole body suffers in sleeplessness and fever."',
        reference: 'Muslim 2586',
      },
      {
        type: 'quran',
        arabic: 'وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ',
        translation: 'And cooperate in righteousness and piety',
        surah: "Al-Ma'idah",
        ayah: '5:2',
      },
      {
        type: 'dua',
        arabic: 'رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ',
        transliteration: "Rabbana waj'alna muslimayni laka",
        translation: 'Our Lord, and make us Muslims [in submission] to You',
      },
    ],
  },
  {
    id: 'sharing',
    name: 'Sharing',
    category: 'social',
    description: 'Giving and sharing with others',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "He who sleeps on a full stomach while his neighbor is hungry is not a believer."',
        reference: 'Tabarani',
      },
      {
        type: 'quran',
        arabic: 'وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ',
        translation: 'And they give preference over themselves, even though they are in need',
        surah: 'Al-Hashr',
        ayah: '59:9',
      },
      {
        type: 'dua',
        arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا',
        transliteration: 'Allahumma barik lana fima razaqtana',
        translation: 'O Allah, bless us in what You have provided us',
      },
    ],
  },
  {
    id: 'tolerance',
    name: 'Tolerance',
    category: 'social',
    description: 'Accepting and respecting differences',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "The believer who mixes with people and bears their annoyance with patience will have a greater reward than the believer who does not mix with people."',
        reference: 'Ibn Majah 4032',
      },
      {
        type: 'quran',
        arabic: 'يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا',
        translation: 'O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another',
        surah: 'Al-Hujurat',
        ayah: '49:13',
      },
      {
        type: 'dua',
        arabic: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا',
        transliteration: 'Rabbana ighfir lana wa li-ikhwanina',
        translation: 'Our Lord, forgive us and our brothers',
      },
    ],
  },
  {
    id: 'leadership',
    name: 'Leadership',
    category: 'social',
    description: 'Guiding others with wisdom and responsibility',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "The best of your leaders are those whom you love and who love you, who pray for you and you pray for them."',
        reference: 'Muslim 1855',
      },
      {
        type: 'quran',
        arabic: 'وَجَعَلْنَا مِنْهُمْ أَئِمَّةً يَهْدُونَ بِأَمْرِنَا لَمَّا صَبَرُوا',
        translation: 'And We made from among them leaders guiding by Our command when they were patient',
        surah: 'As-Sajdah',
        ayah: '32:24',
      },
      {
        type: 'dua',
        arabic: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        transliteration: "Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin waj'alna lil-muttaqina imama",
        translation: 'Our Lord, grant us from among our spouses and offspring comfort to our eyes and make us an example for the righteous',
      },
    ],
  },
  {
    id: 'service',
    name: 'Service to Community',
    category: 'social',
    description: 'Helping others and serving the community',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "The best of people are those who bring most benefit to others."',
        reference: 'Tabarani',
      },
      {
        type: 'quran',
        arabic: 'وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ',
        translation: 'And whatever good you put forward for yourselves - you will find it with Allah',
        surah: 'Al-Baqarah',
        ayah: '2:110',
      },
      {
        type: 'dua',
        arabic: "اللَّهُمَّ انْفَعْنِي بِمَا عَلَّمْتَنِي وَعَلِّمْنِي مَا يَنْفَعُنِي",
        transliteration: "Allahumma infa'ni bima 'allamtani wa 'allimni ma yanfa'uni",
        translation: 'O Allah, benefit me with what You have taught me and teach me what will benefit me',
      },
    ],
  },

  // ADDITIONAL IMPORTANT TRAITS (27-30)
  {
    id: 'contentment',
    name: 'Contentment',
    category: 'additional',
    description: "Being satisfied with Allah's decree",
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "Richness is not having many possessions, but richness is being content with oneself."',
        reference: 'Bukhari 6446',
      },
      {
        type: 'quran',
        arabic: 'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ',
        translation: 'And your Lord is going to give you, and you will be satisfied',
        surah: 'Ad-Duha',
        ayah: '93:5',
      },
      {
        type: 'dua',
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الرِّضَا بَعْدَ الْقَضَاءِ',
        transliteration: "Allahumma inni as'alukar-rida ba'dal-qada",
        translation: "O Allah, I ask You for contentment after Your decree",
      },
    ],
  },
  {
    id: 'hope',
    name: 'Hope in Allah',
    category: 'additional',
    description: 'Optimism and positive expectation from Allah',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "Allah says: I am as My servant expects Me to be."',
        reference: 'Bukhari 7405',
      },
      {
        type: 'quran',
        arabic: 'لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',
        translation: 'Do not despair of the mercy of Allah',
        surah: 'Az-Zumar',
        ayah: '39:53',
      },
      {
        type: 'dua',
        arabic: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ',
        transliteration: 'Ya Hayyu Ya Qayyum bi-rahmatika astaghith',
        translation: 'O Ever-Living, O Sustainer, in Your mercy I seek relief',
      },
    ],
  },
  {
    id: 'cleanliness',
    name: 'Cleanliness',
    category: 'additional',
    description: 'Physical and spiritual purity',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "Cleanliness is half of faith."',
        reference: 'Muslim 223',
      },
      {
        type: 'quran',
        arabic: 'إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ',
        translation: 'Indeed, Allah loves those who are constantly repentant and loves those who purify themselves',
        surah: 'Al-Baqarah',
        ayah: '2:222',
      },
      {
        type: 'dua',
        arabic: 'اللَّهُمَّ طَهِّرْنِي مِنَ الذُّنُوبِ وَالْخَطَايَا',
        transliteration: 'Allahumma tahhirni minadh-dhunubi wal-khataya',
        translation: 'O Allah, cleanse me from sins and errors',
      },
    ],
  },
  {
    id: 'time_management',
    name: 'Time Management',
    category: 'additional',
    description: 'Valuing and using time wisely',
    resources: [
      {
        type: 'hadith',
        translation: 'The Prophet (ﷺ) said: "Take advantage of five before five: your youth before your old age, your health before your illness, your wealth before your poverty, your free time before your busyness, and your life before your death."',
        reference: 'Hakim',
      },
      {
        type: 'quran',
        arabic: 'وَالْعَصْرِ * إِنَّ الْإِنسَانَ لَفِي خُسْرٍ',
        translation: 'By time, indeed mankind is in loss',
        surah: 'Al-Asr',
        ayah: '103:1-2',
      },
      {
        type: 'dua',
        arabic: 'اللَّهُمَّ بَارِكْ لِي فِي وَقْتِي',
        transliteration: 'Allahumma barik li fi waqti',
        translation: 'O Allah, bless me in my time',
      },
    ],
  },
];

// Helper to get trait by ID
export const getTraitById = (traitId: string): CharacterTrait | undefined => {
  return CHARACTER_TRAITS.find((t) => t.id === traitId);
};

// Helper to get trait by day number (1-30 cycle)
export const getTraitForDay = (dayNumber: number): CharacterTrait => {
  const index = (dayNumber - 1) % CHARACTER_TRAITS.length;
  return CHARACTER_TRAITS[index];
};

// Helper to get resource type for cycle
export const getResourceTypeForCycle = (cycleNumber: number): ResourceType => {
  const types: ResourceType[] = ['hadith', 'quran', 'dua'];
  return types[cycleNumber % 3];
};

// Helper to calculate which cycle user is in
export const calculateCycle = (startDate: string): { cycleNumber: number; dayInCycle: number } => {
  const start = new Date(startDate);
  const today = new Date();
  const daysSinceStart = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  const cycleNumber = Math.floor(daysSinceStart / 30);
  const dayInCycle = (daysSinceStart % 30) + 1; // 1-30

  return { cycleNumber, dayInCycle };
};

// Helper to get traits by category
export const getTraitsByCategory = (category: CharacterTrait['category']): CharacterTrait[] => {
  return CHARACTER_TRAITS.filter((t) => t.category === category);
};

// Get the specific resource for a trait based on resource type
export const getTraitResource = (
  trait: CharacterTrait,
  resourceType: ResourceType
): CharacterTrait['resources'][0] | undefined => {
  return trait.resources.find((r) => r.type === resourceType);
};

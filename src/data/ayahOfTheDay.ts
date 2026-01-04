/**
 * Ayah of the Day - Extracted from Character Traits Quranic Resources
 *
 * Each ayah is displayed once per day when the user opens the app.
 * Cycles through all ayahs based on the day of the year.
 */

export interface AyahOfTheDay {
  id: string;
  arabic: string;
  translation: string;
  surah: string;
  ayah: string;
  theme: string; // Related character trait theme
}

export const AYAHS_OF_THE_DAY: AyahOfTheDay[] = [
  // SPIRITUAL THEMES
  {
    id: 'ayah_taqwa',
    arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ حَقَّ تُقَاتِهِ',
    translation: 'O you who believe! Fear Allah as He should be feared',
    surah: 'Al-Imran',
    ayah: '3:102',
    theme: 'Taqwa (God-consciousness)',
  },
  {
    id: 'ayah_love_allah',
    arabic: 'وَالَّذِينَ آمَنُوا أَشَدُّ حُبًّا لِّلَّهِ',
    translation: 'But those who believe are stronger in love for Allah',
    surah: 'Al-Baqarah',
    ayah: '2:165',
    theme: 'Love of Allah',
  },
  {
    id: 'ayah_tawakkul',
    arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
    translation: 'And whoever relies upon Allah - then He is sufficient for him',
    surah: 'At-Talaq',
    ayah: '65:3',
    theme: 'Tawakkul (Trust in Allah)',
  },
  {
    id: 'ayah_shukr',
    arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ',
    translation: 'If you are grateful, I will surely increase you [in favor]',
    surah: 'Ibrahim',
    ayah: '14:7',
    theme: 'Shukr (Gratitude)',
  },
  {
    id: 'ayah_sabr',
    arabic: 'إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ',
    translation: 'Indeed, the patient will be given their reward without account',
    surah: 'Az-Zumar',
    ayah: '39:10',
    theme: 'Sabr (Patience)',
  },
  {
    id: 'ayah_ikhlas',
    arabic: 'وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ',
    translation: 'And they were not commanded except to worship Allah, [being] sincere to Him in religion',
    surah: 'Al-Bayyinah',
    ayah: '98:5',
    theme: 'Ikhlas (Sincerity)',
  },
  {
    id: 'ayah_humility',
    arabic: 'وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا',
    translation: 'And the servants of the Most Merciful are those who walk upon the earth in humility',
    surah: 'Al-Furqan',
    ayah: '25:63',
    theme: 'Tawadu (Humility)',
  },

  // INTERPERSONAL THEMES
  {
    id: 'ayah_parents',
    arabic: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا',
    translation: 'And your Lord has decreed that you not worship except Him, and to parents, good treatment',
    surah: 'Al-Isra',
    ayah: '17:23',
    theme: 'Respect for Parents',
  },
  {
    id: 'ayah_truthfulness',
    arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَكُونُوا مَعَ الصَّادِقِينَ',
    translation: 'O you who have believed, fear Allah and be with those who are true',
    surah: 'At-Tawbah',
    ayah: '9:119',
    theme: 'Sidq (Truthfulness)',
  },
  {
    id: 'ayah_mercy',
    arabic: 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ',
    translation: 'And We have not sent you except as a mercy to the worlds',
    surah: 'Al-Anbiya',
    ayah: '21:107',
    theme: 'Rahma (Mercy)',
  },
  {
    id: 'ayah_generosity',
    arabic: 'وَمَا تُنفِقُوا مِنْ خَيْرٍ فَلِأَنفُسِكُمْ',
    translation: 'And whatever you spend of good - it is for yourselves',
    surah: 'Al-Baqarah',
    ayah: '2:272',
    theme: 'Karam (Generosity)',
  },
  {
    id: 'ayah_forgiveness',
    arabic: 'وَلْيَعْفُوا وَلْيَصْفَحُوا ۗ أَلَا تُحِبُّونَ أَن يَغْفِرَ اللَّهُ لَكُمْ',
    translation: 'Let them pardon and overlook. Would you not like that Allah should forgive you?',
    surah: 'An-Nur',
    ayah: '24:22',
    theme: 'Forgiveness',
  },
  {
    id: 'ayah_character',
    arabic: 'وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ',
    translation: 'And indeed, you are of a great moral character',
    surah: 'Al-Qalam',
    ayah: '68:4',
    theme: 'Adab (Good Character)',
  },
  {
    id: 'ayah_compassion',
    arabic: 'وَتَوَاصَوْا بِالصَّبْرِ وَتَوَاصَوْا بِالْمَرْحَمَةِ',
    translation: 'And advised each other to patience and advised each other to compassion',
    surah: 'Al-Balad',
    ayah: '90:17',
    theme: 'Empathy',
  },
  {
    id: 'ayah_justice',
    arabic: 'إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ',
    translation: 'Indeed, Allah orders justice and good conduct',
    surah: 'An-Nahl',
    ayah: '16:90',
    theme: 'Justice',
  },

  // SELF-REGULATION THEMES
  {
    id: 'ayah_self_control',
    arabic: 'وَأَمَّا مَنْ خَافَ مَقَامَ رَبِّهِ وَنَهَى النَّفْسَ عَنِ الْهَوَىٰ',
    translation: 'But as for he who feared the position of his Lord and prevented the soul from [unlawful] inclination',
    surah: "An-Nazi'at",
    ayah: '79:40',
    theme: 'Self-Control',
  },
  {
    id: 'ayah_responsibility',
    arabic: 'كُلُّ نَفْسٍ بِمَا كَسَبَتْ رَهِينَةٌ',
    translation: 'Every soul, for what it has earned, will be retained',
    surah: 'Al-Muddaththir',
    ayah: '74:38',
    theme: 'Responsibility',
  },
  {
    id: 'ayah_courage',
    arabic: 'فَلَا تَخَافُوهُمْ وَخَافُونِ إِن كُنتُم مُّؤْمِنِينَ',
    translation: 'So do not fear them, but fear Me, if you are [indeed] believers',
    surah: 'Al-Imran',
    ayah: '3:175',
    theme: 'Courage',
  },
  {
    id: 'ayah_perseverance',
    arabic: 'وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ',
    translation: 'And be patient, for indeed, Allah does not allow to be lost the reward of those who do good',
    surah: 'Hud',
    ayah: '11:115',
    theme: 'Perseverance',
  },
  {
    id: 'ayah_self_awareness',
    arabic: 'بَلِ الْإِنسَانُ عَلَىٰ نَفْسِهِ بَصِيرَةٌ',
    translation: 'Rather, man is a witness against himself',
    surah: 'Al-Qiyamah',
    ayah: '75:14',
    theme: 'Self-Awareness',
  },

  // SOCIAL THEMES
  {
    id: 'ayah_cooperation',
    arabic: 'وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ',
    translation: 'And cooperate in righteousness and piety',
    surah: "Al-Ma'idah",
    ayah: '5:2',
    theme: 'Cooperation',
  },
  {
    id: 'ayah_sharing',
    arabic: 'وَيُؤْثِرُونَ عَلَىٰ أَنفُسِهِمْ وَلَوْ كَانَ بِهِمْ خَصَاصَةٌ',
    translation: 'And they give preference over themselves, even though they are in need',
    surah: 'Al-Hashr',
    ayah: '59:9',
    theme: 'Sharing',
  },
  {
    id: 'ayah_tolerance',
    arabic: 'يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُم مِّن ذَكَرٍ وَأُنثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا',
    translation: 'O mankind, indeed We have created you from male and female and made you peoples and tribes that you may know one another',
    surah: 'Al-Hujurat',
    ayah: '49:13',
    theme: 'Tolerance',
  },
  {
    id: 'ayah_leadership',
    arabic: 'وَجَعَلْنَا مِنْهُمْ أَئِمَّةً يَهْدُونَ بِأَمْرِنَا لَمَّا صَبَرُوا',
    translation: 'And We made from among them leaders guiding by Our command when they were patient',
    surah: 'As-Sajdah',
    ayah: '32:24',
    theme: 'Leadership',
  },
  {
    id: 'ayah_service',
    arabic: 'وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ',
    translation: 'And whatever good you put forward for yourselves - you will find it with Allah',
    surah: 'Al-Baqarah',
    ayah: '2:110',
    theme: 'Service',
  },

  // ADDITIONAL THEMES
  {
    id: 'ayah_contentment',
    arabic: 'وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ',
    translation: 'And your Lord is going to give you, and you will be satisfied',
    surah: 'Ad-Duha',
    ayah: '93:5',
    theme: 'Contentment',
  },
  {
    id: 'ayah_hope',
    arabic: 'لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',
    translation: 'Do not despair of the mercy of Allah',
    surah: 'Az-Zumar',
    ayah: '39:53',
    theme: 'Hope',
  },
  {
    id: 'ayah_cleanliness',
    arabic: 'إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ',
    translation: 'Indeed, Allah loves those who are constantly repentant and loves those who purify themselves',
    surah: 'Al-Baqarah',
    ayah: '2:222',
    theme: 'Cleanliness',
  },
  {
    id: 'ayah_time',
    arabic: 'وَالْعَصْرِ * إِنَّ الْإِنسَانَ لَفِي خُسْرٍ',
    translation: 'By time, indeed mankind is in loss',
    surah: 'Al-Asr',
    ayah: '103:1-2',
    theme: 'Time',
  },
];

/**
 * Get today's Ayah based on the day of the year
 * Cycles through all ayahs (30 ayahs = roughly one per day for a month)
 */
export const getTodaysAyah = (): AyahOfTheDay => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - startOfYear.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

  const index = dayOfYear % AYAHS_OF_THE_DAY.length;
  return AYAHS_OF_THE_DAY[index];
};

/**
 * Get a specific Ayah by ID
 */
export const getAyahById = (id: string): AyahOfTheDay | undefined => {
  return AYAHS_OF_THE_DAY.find((ayah) => ayah.id === id);
};

/**
 * Get Ayahs by theme
 */
export const getAyahsByTheme = (theme: string): AyahOfTheDay[] => {
  return AYAHS_OF_THE_DAY.filter((ayah) =>
    ayah.theme.toLowerCase().includes(theme.toLowerCase())
  );
};

import type { MomentType } from '@/types/models';

// =====================================================
// Character Scenarios for Quick Capture
// 8 Core Traits × ~8 scenarios each = ~64 scenarios
// =====================================================

export interface CharacterScenario {
  id: string;
  trait_id: string;
  moment_type: MomentType;
  label: string;
  difficulty: 1 | 1.5 | 2;
  age_appropriate: 'baby' | 'toddler' | 'child' | 'all';
}

// Core traits mapped to existing traitsData.ts IDs
export const CORE_TRAITS = [
  { id: 'sidq', name: 'Honesty', arabicName: 'صدق', emoji: '🤝' },
  { id: 'karam', name: 'Generosity', arabicName: 'كرم', emoji: '🎁' },
  { id: 'sabr', name: 'Patience', arabicName: 'صبر', emoji: '🌱' },
  { id: 'rahma', name: 'Kindness', arabicName: 'رحمة', emoji: '💝' },
  { id: 'courage', name: 'Courage', arabicName: 'شجاعة', emoji: '🦁' },
  { id: 'shukr', name: 'Gratitude', arabicName: 'شكر', emoji: '🙏' },
  { id: 'respect', name: 'Respect', arabicName: 'احترام', emoji: '🌟' },
  { id: 'responsibility', name: 'Responsibility', arabicName: 'مسؤولية', emoji: '✅' },
] as const;

export type CoreTraitId = (typeof CORE_TRAITS)[number]['id'];

export const CHARACTER_SCENARIOS: CharacterScenario[] = [
  // =====================================================
  // HONESTY (sidq)
  // =====================================================
  // Positive
  { id: 'sidq_pos_1', trait_id: 'sidq', moment_type: 'positive', label: 'Admitted a mistake', difficulty: 1.5, age_appropriate: 'all' },
  { id: 'sidq_pos_2', trait_id: 'sidq', moment_type: 'positive', label: 'Told the truth when it was hard', difficulty: 2, age_appropriate: 'child' },
  { id: 'sidq_pos_3', trait_id: 'sidq', moment_type: 'positive', label: 'Returned something that wasn\'t theirs', difficulty: 1.5, age_appropriate: 'all' },
  { id: 'sidq_pos_4', trait_id: 'sidq', moment_type: 'positive', label: 'Corrected a misunderstanding', difficulty: 1, age_appropriate: 'child' },
  // Struggle
  { id: 'sidq_str_1', trait_id: 'sidq', moment_type: 'struggle', label: 'Lied to avoid trouble', difficulty: 1, age_appropriate: 'all' },
  { id: 'sidq_str_2', trait_id: 'sidq', moment_type: 'struggle', label: 'Made up a story', difficulty: 1, age_appropriate: 'toddler' },
  { id: 'sidq_str_3', trait_id: 'sidq', moment_type: 'struggle', label: 'Blamed someone else', difficulty: 1.5, age_appropriate: 'all' },
  { id: 'sidq_str_4', trait_id: 'sidq', moment_type: 'struggle', label: 'Hid something they broke', difficulty: 1, age_appropriate: 'all' },

  // =====================================================
  // GENEROSITY (karam)
  // =====================================================
  // Positive
  { id: 'karam_pos_1', trait_id: 'karam', moment_type: 'positive', label: 'Shared toys willingly', difficulty: 1, age_appropriate: 'all' },
  { id: 'karam_pos_2', trait_id: 'karam', moment_type: 'positive', label: 'Gave away something they loved', difficulty: 2, age_appropriate: 'child' },
  { id: 'karam_pos_3', trait_id: 'karam', moment_type: 'positive', label: 'Offered food to others first', difficulty: 1, age_appropriate: 'all' },
  { id: 'karam_pos_4', trait_id: 'karam', moment_type: 'positive', label: 'Helped without being asked', difficulty: 1.5, age_appropriate: 'all' },
  // Struggle
  { id: 'karam_str_1', trait_id: 'karam', moment_type: 'struggle', label: 'Refused to share', difficulty: 1, age_appropriate: 'all' },
  { id: 'karam_str_2', trait_id: 'karam', moment_type: 'struggle', label: 'Took more than their share', difficulty: 1, age_appropriate: 'all' },
  { id: 'karam_str_3', trait_id: 'karam', moment_type: 'struggle', label: 'Hoarded toys or snacks', difficulty: 1, age_appropriate: 'toddler' },
  { id: 'karam_str_4', trait_id: 'karam', moment_type: 'struggle', label: 'Said "mine" aggressively', difficulty: 1, age_appropriate: 'toddler' },

  // =====================================================
  // PATIENCE (sabr)
  // =====================================================
  // Positive
  { id: 'sabr_pos_1', trait_id: 'sabr', moment_type: 'positive', label: 'Waited their turn calmly', difficulty: 1.5, age_appropriate: 'all' },
  { id: 'sabr_pos_2', trait_id: 'sabr', moment_type: 'positive', label: 'Stayed calm when frustrated', difficulty: 2, age_appropriate: 'all' },
  { id: 'sabr_pos_3', trait_id: 'sabr', moment_type: 'positive', label: 'Kept trying after failing', difficulty: 1.5, age_appropriate: 'all' },
  { id: 'sabr_pos_4', trait_id: 'sabr', moment_type: 'positive', label: 'Accepted "not now" gracefully', difficulty: 1.5, age_appropriate: 'all' },
  // Struggle
  { id: 'sabr_str_1', trait_id: 'sabr', moment_type: 'struggle', label: 'Had a meltdown when waiting', difficulty: 1, age_appropriate: 'all' },
  { id: 'sabr_str_2', trait_id: 'sabr', moment_type: 'struggle', label: 'Gave up too quickly', difficulty: 1, age_appropriate: 'all' },
  { id: 'sabr_str_3', trait_id: 'sabr', moment_type: 'struggle', label: 'Demanded immediate attention', difficulty: 1, age_appropriate: 'toddler' },
  { id: 'sabr_str_4', trait_id: 'sabr', moment_type: 'struggle', label: 'Got angry when told to wait', difficulty: 1, age_appropriate: 'all' },

  // =====================================================
  // KINDNESS (rahma)
  // =====================================================
  // Positive
  { id: 'rahma_pos_1', trait_id: 'rahma', moment_type: 'positive', label: 'Comforted someone who was sad', difficulty: 1.5, age_appropriate: 'all' },
  { id: 'rahma_pos_2', trait_id: 'rahma', moment_type: 'positive', label: 'Used gentle words', difficulty: 1, age_appropriate: 'all' },
  { id: 'rahma_pos_3', trait_id: 'rahma', moment_type: 'positive', label: 'Helped a younger child', difficulty: 1.5, age_appropriate: 'child' },
  { id: 'rahma_pos_4', trait_id: 'rahma', moment_type: 'positive', label: 'Showed care for animals', difficulty: 1, age_appropriate: 'all' },
  // Struggle
  { id: 'rahma_str_1', trait_id: 'rahma', moment_type: 'struggle', label: 'Used hurtful words', difficulty: 1, age_appropriate: 'all' },
  { id: 'rahma_str_2', trait_id: 'rahma', moment_type: 'struggle', label: 'Hit or pushed someone', difficulty: 1, age_appropriate: 'all' },
  { id: 'rahma_str_3', trait_id: 'rahma', moment_type: 'struggle', label: 'Laughed at someone\'s mistake', difficulty: 1.5, age_appropriate: 'child' },
  { id: 'rahma_str_4', trait_id: 'rahma', moment_type: 'struggle', label: 'Ignored someone who needed help', difficulty: 1, age_appropriate: 'child' },

  // =====================================================
  // COURAGE (courage)
  // =====================================================
  // Positive
  { id: 'courage_pos_1', trait_id: 'courage', moment_type: 'positive', label: 'Tried something new', difficulty: 1, age_appropriate: 'all' },
  { id: 'courage_pos_2', trait_id: 'courage', moment_type: 'positive', label: 'Stood up for what\'s right', difficulty: 2, age_appropriate: 'child' },
  { id: 'courage_pos_3', trait_id: 'courage', moment_type: 'positive', label: 'Spoke up despite being shy', difficulty: 1.5, age_appropriate: 'all' },
  { id: 'courage_pos_4', trait_id: 'courage', moment_type: 'positive', label: 'Faced a fear bravely', difficulty: 2, age_appropriate: 'all' },
  // Struggle
  { id: 'courage_str_1', trait_id: 'courage', moment_type: 'struggle', label: 'Refused to try out of fear', difficulty: 1, age_appropriate: 'all' },
  { id: 'courage_str_2', trait_id: 'courage', moment_type: 'struggle', label: 'Stayed quiet when should speak', difficulty: 1, age_appropriate: 'child' },
  { id: 'courage_str_3', trait_id: 'courage', moment_type: 'struggle', label: 'Let fear stop them', difficulty: 1, age_appropriate: 'all' },
  { id: 'courage_str_4', trait_id: 'courage', moment_type: 'struggle', label: 'Avoided a challenge', difficulty: 1, age_appropriate: 'all' },

  // =====================================================
  // GRATITUDE (shukr)
  // =====================================================
  // Positive
  { id: 'shukr_pos_1', trait_id: 'shukr', moment_type: 'positive', label: 'Said thank you sincerely', difficulty: 1, age_appropriate: 'all' },
  { id: 'shukr_pos_2', trait_id: 'shukr', moment_type: 'positive', label: 'Appreciated a small gift', difficulty: 1.5, age_appropriate: 'all' },
  { id: 'shukr_pos_3', trait_id: 'shukr', moment_type: 'positive', label: 'Expressed gratitude to Allah', difficulty: 1.5, age_appropriate: 'all' },
  { id: 'shukr_pos_4', trait_id: 'shukr', moment_type: 'positive', label: 'Noticed blessings without prompting', difficulty: 2, age_appropriate: 'child' },
  // Struggle
  { id: 'shukr_str_1', trait_id: 'shukr', moment_type: 'struggle', label: 'Complained about what they have', difficulty: 1, age_appropriate: 'all' },
  { id: 'shukr_str_2', trait_id: 'shukr', moment_type: 'struggle', label: 'Said "I want more"', difficulty: 1, age_appropriate: 'all' },
  { id: 'shukr_str_3', trait_id: 'shukr', moment_type: 'struggle', label: 'Didn\'t say thank you', difficulty: 1, age_appropriate: 'all' },
  { id: 'shukr_str_4', trait_id: 'shukr', moment_type: 'struggle', label: 'Compared to others negatively', difficulty: 1.5, age_appropriate: 'child' },

  // =====================================================
  // RESPECT (respect)
  // =====================================================
  // Positive
  { id: 'respect_pos_1', trait_id: 'respect', moment_type: 'positive', label: 'Listened when spoken to', difficulty: 1, age_appropriate: 'all' },
  { id: 'respect_pos_2', trait_id: 'respect', moment_type: 'positive', label: 'Used polite words', difficulty: 1, age_appropriate: 'all' },
  { id: 'respect_pos_3', trait_id: 'respect', moment_type: 'positive', label: 'Respected elder\'s wishes', difficulty: 1.5, age_appropriate: 'all' },
  { id: 'respect_pos_4', trait_id: 'respect', moment_type: 'positive', label: 'Treated belongings with care', difficulty: 1, age_appropriate: 'all' },
  // Struggle
  { id: 'respect_str_1', trait_id: 'respect', moment_type: 'struggle', label: 'Talked back rudely', difficulty: 1, age_appropriate: 'all' },
  { id: 'respect_str_2', trait_id: 'respect', moment_type: 'struggle', label: 'Ignored instructions', difficulty: 1, age_appropriate: 'all' },
  { id: 'respect_str_3', trait_id: 'respect', moment_type: 'struggle', label: 'Was disrespectful to elders', difficulty: 1.5, age_appropriate: 'all' },
  { id: 'respect_str_4', trait_id: 'respect', moment_type: 'struggle', label: 'Broke something carelessly', difficulty: 1, age_appropriate: 'all' },

  // =====================================================
  // RESPONSIBILITY (responsibility)
  // =====================================================
  // Positive
  { id: 'responsibility_pos_1', trait_id: 'responsibility', moment_type: 'positive', label: 'Completed a task independently', difficulty: 1.5, age_appropriate: 'all' },
  { id: 'responsibility_pos_2', trait_id: 'responsibility', moment_type: 'positive', label: 'Cleaned up without being asked', difficulty: 1.5, age_appropriate: 'all' },
  { id: 'responsibility_pos_3', trait_id: 'responsibility', moment_type: 'positive', label: 'Took care of their belongings', difficulty: 1, age_appropriate: 'all' },
  { id: 'responsibility_pos_4', trait_id: 'responsibility', moment_type: 'positive', label: 'Owned up to a mistake', difficulty: 2, age_appropriate: 'all' },
  // Struggle
  { id: 'responsibility_str_1', trait_id: 'responsibility', moment_type: 'struggle', label: 'Left a mess behind', difficulty: 1, age_appropriate: 'all' },
  { id: 'responsibility_str_2', trait_id: 'responsibility', moment_type: 'struggle', label: 'Avoided doing their chore', difficulty: 1, age_appropriate: 'all' },
  { id: 'responsibility_str_3', trait_id: 'responsibility', moment_type: 'struggle', label: 'Lost something important', difficulty: 1, age_appropriate: 'all' },
  { id: 'responsibility_str_4', trait_id: 'responsibility', moment_type: 'struggle', label: 'Made excuses to avoid tasks', difficulty: 1, age_appropriate: 'child' },
];

// Helper functions
export function getScenariosForTrait(traitId: string): CharacterScenario[] {
  return CHARACTER_SCENARIOS.filter((s) => s.trait_id === traitId);
}

export function getPositiveScenarios(traitId: string): CharacterScenario[] {
  return CHARACTER_SCENARIOS.filter((s) => s.trait_id === traitId && s.moment_type === 'positive');
}

export function getStruggleScenarios(traitId: string): CharacterScenario[] {
  return CHARACTER_SCENARIOS.filter((s) => s.trait_id === traitId && s.moment_type === 'struggle');
}

export function getScenarioById(scenarioId: string): CharacterScenario | undefined {
  return CHARACTER_SCENARIOS.find((s) => s.id === scenarioId);
}

export function getTraitById(traitId: string) {
  return CORE_TRAITS.find((t) => t.id === traitId);
}

export function filterScenariosByAge(
  scenarios: CharacterScenario[],
  childAge: 'baby' | 'toddler' | 'child' | 'all'
): CharacterScenario[] {
  return scenarios.filter((s) => s.age_appropriate === 'all' || s.age_appropriate === childAge);
}

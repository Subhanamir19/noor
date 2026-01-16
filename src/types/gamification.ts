/**
 * Gamification System Types
 *
 * HP (Health Points / Parenting Points) system and badge progression.
 * Inspired by Duolingo, Finch, Habitica - designed for busy Muslim moms.
 */

// ============================================================================
// Core Types
// ============================================================================

export type BadgeTier = 'seedling' | 'growing' | 'blooming' | 'wise' | 'lighthouse';
export type TimeEstimate = '<1min' | '2-3min' | '5min' | '10min+';
export type PriorityLevel = 'normal' | 'important' | 'critical';

// ============================================================================
// Badge System
// ============================================================================

export interface Badge {
  id: string;
  tier: BadgeTier;
  name: string;
  icon: string;              // Emoji
  description: string;
  hp_threshold: number;      // HP required to unlock
  unlock_animation: 'sprout' | 'grow' | 'bloom' | 'tree' | 'lighthouse';
}

export interface UserBadgeProgress {
  user_id: string;
  current_hp: number;         // HP available for spending (future: redemption system)
  total_hp_earned: number;    // Lifetime HP (never decreases)
  badges_unlocked: string[];  // Array of badge IDs
  current_badge_tier: BadgeTier;
  next_badge_hp: number;      // HP needed for next badge
  created_at: string;
  updated_at: string;
}

// ============================================================================
// Celebration System
// ============================================================================

export type CelebrationType = 'confetti' | 'sparkles' | 'noor_hearts' | 'screen_shake';
export type CelebrationTrigger = 'task_complete' | 'badge_unlock' | 'streak_milestone' | 'day_complete';

export interface CelebrationEvent {
  type: CelebrationTrigger;
  animation: CelebrationType;
  data?: {
    hp_gained?: number;
    badge?: Badge;
    task_title?: string;
    streak_days?: number;
  };
}

export interface CelebrationConfig {
  type: CelebrationType;
  weight: number;             // Probability weight for random selection
}

// ============================================================================
// Badge Definitions
// ============================================================================

export const BADGES: readonly Badge[] = [
  {
    id: 'badge_seedling',
    tier: 'seedling',
    name: 'Seedling Parent',
    icon: '🌱',
    description: "You've planted the first seeds of Islamic character",
    hp_threshold: 50,
    unlock_animation: 'sprout',
  },
  {
    id: 'badge_growing',
    tier: 'growing',
    name: 'Growing Garden',
    icon: '🌿',
    description: 'Your consistency is nurturing beautiful growth',
    hp_threshold: 150,
    unlock_animation: 'grow',
  },
  {
    id: 'badge_blooming',
    tier: 'blooming',
    name: 'Blooming Nurturer',
    icon: '🌸',
    description: "Your child's character is blossoming beautifully",
    hp_threshold: 300,
    unlock_animation: 'bloom',
  },
  {
    id: 'badge_wise',
    tier: 'wise',
    name: 'Wise Guide',
    icon: '🌳',
    description: "You've become a pillar of wisdom and guidance",
    hp_threshold: 500,
    unlock_animation: 'tree',
  },
  {
    id: 'badge_lighthouse',
    tier: 'lighthouse',
    name: 'Lighthouse Parent',
    icon: '🏆',
    description: 'Your light guides your family toward excellence',
    hp_threshold: 1000,
    unlock_animation: 'lighthouse',
  },
] as const;

// ============================================================================
// Celebration Weights (for random selection)
// ============================================================================

export const CELEBRATION_VARIANTS: readonly CelebrationConfig[] = [
  { type: 'confetti', weight: 40 },
  { type: 'sparkles', weight: 30 },
  { type: 'noor_hearts', weight: 20 },
  { type: 'screen_shake', weight: 10 },
] as const;

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get current badge tier based on total HP earned
 */
export function getCurrentBadge(totalHP: number): Badge {
  // Iterate in reverse to find highest unlocked badge
  for (let i = BADGES.length - 1; i >= 0; i--) {
    if (totalHP >= BADGES[i].hp_threshold) {
      return BADGES[i];
    }
  }
  return BADGES[0]; // Default to seedling
}

/**
 * Get next badge to unlock, or null if max tier reached
 */
export function getNextBadge(totalHP: number): Badge | null {
  return BADGES.find(b => totalHP < b.hp_threshold) || null;
}

/**
 * Calculate HP needed for next badge
 */
export function getHPToNextBadge(totalHP: number): number {
  const nextBadge = getNextBadge(totalHP);
  return nextBadge ? nextBadge.hp_threshold - totalHP : 0;
}

/**
 * Check if HP threshold crossed a badge unlock boundary
 */
export function checkBadgeUnlock(oldHP: number, newHP: number): Badge | null {
  const oldBadge = getCurrentBadge(oldHP);
  const newBadge = getCurrentBadge(newHP);

  return oldBadge.tier !== newBadge.tier ? newBadge : null;
}

/**
 * Select random celebration animation (weighted)
 */
export function selectCelebration(): CelebrationType {
  const totalWeight = CELEBRATION_VARIANTS.reduce((sum, v) => sum + v.weight, 0);
  let random = Math.random() * totalWeight;

  for (const variant of CELEBRATION_VARIANTS) {
    random -= variant.weight;
    if (random <= 0) {
      return variant.type;
    }
  }

  return 'confetti'; // Fallback
}

/**
 * Get all unlocked badge IDs for a given HP total
 */
export function getUnlockedBadgeIds(totalHP: number): string[] {
  return BADGES.filter(b => totalHP >= b.hp_threshold).map(b => b.id);
}

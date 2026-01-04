import type {
  CharacterMoment,
  CharacterTree,
  CoachingIntervention,
  InterventionType,
} from '@/types/models';
import { getRandomScript, type CoachingScript } from '@/data/coachingScripts';

// Thresholds for intervention triggers
const THRESHOLDS = {
  // How many struggles in a row before "repeated" intervention
  REPEATED_STRUGGLES: 3,
  // How many struggles in a row before "persistent" intervention
  PERSISTENT_STRUGGLES: 5,
  // Days without a positive moment before "no_wins" intervention
  NO_WINS_DAYS: 3,
  // Minimum hours between interventions for same trait
  COOLDOWN_HOURS: 24,
  // Maximum interventions per day across all traits
  MAX_DAILY_INTERVENTIONS: 2,
};

export interface InterventionTrigger {
  type: InterventionType;
  traitId: string;
  script: CoachingScript;
  reason: string;
}

interface AnalysisContext {
  userId: string;
  trees: Record<string, CharacterTree>;
  recentMoments: CharacterMoment[];
  recentInterventions: CoachingIntervention[];
}

/**
 * Analyze user's character data and determine if coaching intervention is needed
 */
export function analyzeForIntervention(
  context: AnalysisContext
): InterventionTrigger | null {
  const { trees, recentMoments, recentInterventions } = context;

  // Check daily intervention limit
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayInterventions = recentInterventions.filter(
    (i) => new Date(i.delivered_at) >= today
  );
  if (todayInterventions.length >= THRESHOLDS.MAX_DAILY_INTERVENTIONS) {
    return null;
  }

  // Group moments by trait
  const momentsByTrait = groupMomentsByTrait(recentMoments);

  // Check each trait for intervention triggers
  for (const [traitId, moments] of Object.entries(momentsByTrait)) {
    // Check cooldown for this trait
    if (isOnCooldown(traitId, recentInterventions)) {
      continue;
    }

    const trigger = analyzeTraitMoments(traitId, moments, trees[traitId]);
    if (trigger) {
      return trigger;
    }
  }

  // Check for "no wins" across all traits
  const noWinsTrigger = checkNoWinsScenario(trees, recentMoments, recentInterventions);
  if (noWinsTrigger) {
    return noWinsTrigger;
  }

  return null;
}

/**
 * Analyze moments for a specific trait
 */
function analyzeTraitMoments(
  traitId: string,
  moments: CharacterMoment[],
  tree: CharacterTree | undefined
): InterventionTrigger | null {
  if (moments.length === 0) return null;

  // Sort by date, most recent first
  const sorted = [...moments].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Count consecutive struggles from most recent
  let consecutiveStruggles = 0;
  for (const moment of sorted) {
    if (moment.moment_type === 'struggle') {
      consecutiveStruggles++;
    } else {
      break;
    }
  }

  // Check for first struggle (only one struggle total for this trait)
  const totalStruggles = moments.filter((m) => m.moment_type === 'struggle').length;
  if (totalStruggles === 1 && consecutiveStruggles === 1) {
    const script = getRandomScript('first_struggle', traitId);
    if (script) {
      return {
        type: 'first_struggle',
        traitId,
        script,
        reason: 'First struggle logged for this trait',
      };
    }
  }

  // Check for persistent struggles (5+ in a row)
  if (consecutiveStruggles >= THRESHOLDS.PERSISTENT_STRUGGLES) {
    const script = getRandomScript('persistent', traitId);
    if (script) {
      return {
        type: 'persistent',
        traitId,
        script,
        reason: `${consecutiveStruggles} consecutive struggles`,
      };
    }
  }

  // Check for repeated struggles (3-4 in a row)
  if (consecutiveStruggles >= THRESHOLDS.REPEATED_STRUGGLES) {
    const script = getRandomScript('repeated', traitId);
    if (script) {
      return {
        type: 'repeated',
        traitId,
        script,
        reason: `${consecutiveStruggles} consecutive struggles`,
      };
    }
  }

  return null;
}

/**
 * Check for the "no wins" scenario - user hasn't logged positives recently
 */
function checkNoWinsScenario(
  trees: Record<string, CharacterTree>,
  recentMoments: CharacterMoment[],
  recentInterventions: CoachingIntervention[]
): InterventionTrigger | null {
  // Need at least some activity to trigger this
  if (recentMoments.length < 3) return null;

  // Check if already had a no_wins intervention recently
  const recentNoWins = recentInterventions.find(
    (i) =>
      i.intervention_type === 'no_wins' &&
      new Date(i.delivered_at).getTime() > Date.now() - 72 * 60 * 60 * 1000
  );
  if (recentNoWins) return null;

  // Calculate days since last positive moment
  const positives = recentMoments.filter((m) => m.moment_type === 'positive');
  if (positives.length === 0) {
    // No positives at all in recent history
    const oldestMoment = recentMoments[recentMoments.length - 1];
    const daysSinceFirst = Math.floor(
      (Date.now() - new Date(oldestMoment.created_at).getTime()) / (24 * 60 * 60 * 1000)
    );

    if (daysSinceFirst >= THRESHOLDS.NO_WINS_DAYS) {
      const script = getRandomScript('no_wins');
      if (script) {
        return {
          type: 'no_wins',
          traitId: 'general',
          script,
          reason: `No positive moments in ${daysSinceFirst} days`,
        };
      }
    }
  } else {
    // Has some positives, check recency
    const lastPositive = positives.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )[0];
    const daysSincePositive = Math.floor(
      (Date.now() - new Date(lastPositive.created_at).getTime()) / (24 * 60 * 60 * 1000)
    );

    // Only trigger if there have been struggles since last positive
    const strugglesSincePositive = recentMoments.filter(
      (m) =>
        m.moment_type === 'struggle' &&
        new Date(m.created_at) > new Date(lastPositive.created_at)
    ).length;

    if (daysSincePositive >= THRESHOLDS.NO_WINS_DAYS && strugglesSincePositive >= 2) {
      const script = getRandomScript('no_wins');
      if (script) {
        return {
          type: 'no_wins',
          traitId: 'general',
          script,
          reason: `No positive moments in ${daysSincePositive} days`,
        };
      }
    }
  }

  return null;
}

/**
 * Group moments by trait ID
 */
function groupMomentsByTrait(
  moments: CharacterMoment[]
): Record<string, CharacterMoment[]> {
  const grouped: Record<string, CharacterMoment[]> = {};
  for (const moment of moments) {
    if (!grouped[moment.trait_id]) {
      grouped[moment.trait_id] = [];
    }
    grouped[moment.trait_id].push(moment);
  }
  return grouped;
}

/**
 * Check if a trait is on cooldown from recent intervention
 */
function isOnCooldown(
  traitId: string,
  recentInterventions: CoachingIntervention[]
): boolean {
  const cooldownMs = THRESHOLDS.COOLDOWN_HOURS * 60 * 60 * 1000;
  const cutoff = Date.now() - cooldownMs;

  return recentInterventions.some(
    (i) =>
      i.trait_id === traitId && new Date(i.delivered_at).getTime() > cutoff
  );
}

/**
 * Calculate a "wellness score" for visualization (0-100)
 * Higher is better
 */
export function calculateWellnessScore(
  trees: Record<string, CharacterTree>,
  recentMoments: CharacterMoment[]
): number {
  const treeCount = Object.keys(trees).length;
  if (treeCount === 0) return 50; // Neutral for new users

  let score = 0;

  // Factor 1: Tree health (40% weight)
  const avgLevel =
    Object.values(trees).reduce((sum, t) => sum + t.level, 0) / treeCount;
  const levelScore = Math.min(avgLevel / 10, 1) * 40;
  score += levelScore;

  // Factor 2: Recent positive ratio (30% weight)
  if (recentMoments.length > 0) {
    const positives = recentMoments.filter((m) => m.moment_type === 'positive').length;
    const ratio = positives / recentMoments.length;
    score += ratio * 30;
  } else {
    score += 15; // Neutral if no recent moments
  }

  // Factor 3: Consistency - days active in last week (30% weight)
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const recentMomentsThisWeek = recentMoments.filter(
    (m) => new Date(m.created_at).getTime() > oneWeekAgo
  );
  const uniqueDays = new Set(
    recentMomentsThisWeek.map((m) =>
      new Date(m.created_at).toISOString().split('T')[0]
    )
  ).size;
  const consistencyScore = Math.min(uniqueDays / 7, 1) * 30;
  score += consistencyScore;

  return Math.round(score);
}

/**
 * Get personalized tips based on current state
 */
export function getPersonalizedTips(
  trees: Record<string, CharacterTree>,
  recentMoments: CharacterMoment[]
): string[] {
  const tips: string[] = [];

  // Tip based on weakest tree
  const treeEntries = Object.entries(trees);
  if (treeEntries.length > 0) {
    const weakest = treeEntries.sort((a, b) => a[1].level - b[1].level)[0];
    if (weakest[1].level < 3) {
      tips.push(`Focus on "${weakest[0]}" - it could use some nurturing`);
    }
  }

  // Tip based on recent struggles
  const recentStruggles = recentMoments
    .filter((m) => m.moment_type === 'struggle')
    .slice(0, 5);
  if (recentStruggles.length >= 3) {
    const mostStruggled = getMostFrequent(recentStruggles.map((m) => m.trait_id));
    if (mostStruggled) {
      tips.push(`Consider trying new approaches for "${mostStruggled}"`);
    }
  }

  // Tip for consistency
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const thisWeekMoments = recentMoments.filter(
    (m) => new Date(m.created_at).getTime() > oneWeekAgo
  );
  if (thisWeekMoments.length < 3) {
    tips.push('Try to log at least one moment daily for best results');
  }

  // Generic tips if not many specific ones
  if (tips.length < 2) {
    tips.push('Celebrate small wins - they add up!');
  }

  return tips.slice(0, 3);
}

function getMostFrequent(arr: string[]): string | null {
  if (arr.length === 0) return null;
  const counts: Record<string, number> = {};
  for (const item of arr) {
    counts[item] = (counts[item] || 0) + 1;
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

/**
 * HP Calculation Utilities
 *
 * Calculates HP values for tasks based on time estimate and task type.
 * Formula: base_time_hp + type_bonus + priority_bonus
 */

import type { TimeEstimate, PriorityLevel } from '@/types/gamification';
import type { DailyTaskType } from '@/types/models';

// ============================================================================
// HP Value Tables
// ============================================================================

const BASE_HP_BY_TIME: Record<TimeEstimate, number> = {
  '<1min': 5,
  '2-3min': 10,
  '5min': 15,
  '10min+': 20,
};

const TYPE_BONUS: Record<DailyTaskType, number> = {
  quick_win: 0,
  primary: 5,
};

const PRIORITY_BONUS: Record<PriorityLevel, number> = {
  normal: 0,
  important: 5,
  critical: 10,
};

// ============================================================================
// Public API
// ============================================================================

/**
 * Calculate HP value for a task
 *
 * @param timeEstimate - Task duration estimate
 * @param taskType - Primary (foundation-building) or quick_win (under 2 min)
 * @param priority - Task priority level (defaults to normal)
 * @returns HP value (5-35 range)
 */
export function calculateTaskHP(
  timeEstimate: TimeEstimate,
  taskType: DailyTaskType,
  priority: PriorityLevel = 'normal'
): number {
  const baseHP = BASE_HP_BY_TIME[timeEstimate];
  const typeBonus = TYPE_BONUS[taskType];
  const priorityBonus = PRIORITY_BONUS[priority];

  return baseHP + typeBonus + priorityBonus;
}

/**
 * Get time estimate from duration in minutes
 *
 * @param minutes - Duration in minutes
 * @returns Time estimate category
 */
export function getTimeEstimateFromMinutes(minutes: number): TimeEstimate {
  if (minutes < 1) return '<1min';
  if (minutes <= 3) return '2-3min';
  if (minutes <= 5) return '5min';
  return '10min+';
}

/**
 * Get display text for time estimate
 *
 * @param timeEstimate - Time estimate enum
 * @returns Human-readable text with clock emoji
 */
export function formatTimeEstimate(timeEstimate: TimeEstimate): string {
  const labels: Record<TimeEstimate, string> = {
    '<1min': '⏱️ <1 min',
    '2-3min': '⏱️ 2-3 min',
    '5min': '⏱️ 5 min',
    '10min+': '⏱️ 10+ min',
  };
  return labels[timeEstimate];
}

/**
 * Get display text for HP value
 *
 * @param hp - HP amount
 * @returns Formatted text with lightning emoji
 */
export function formatHPValue(hp: number): string {
  return `⚡ +${hp} HP`;
}

/**
 * Validate HP value is within acceptable range
 *
 * @param hp - HP value to validate
 * @returns True if valid (5-35 range)
 */
export function isValidHP(hp: number): boolean {
  return hp >= 5 && hp <= 35 && hp % 5 === 0;
}

// User & Profile
export interface User {
  id: string;
  email: string | null;
  isAnonymous: boolean;
}

export interface UserProfile {
  id: string;
  display_name: string | null;
  child_name: string | null;
  child_birthdate: string | null;
  onboarding_completed: boolean;
  notification_time_mission: string;
  notification_time_reflection: string;
  struggles: string[];
  current_habits: string[];
  created_at: string;
  updated_at: string;
}

// Mission & Daily Tasks
export interface MissionCompletion {
  id: string;
  user_id: string;
  mission_date: string;
  dua_completed: boolean;
  dua_completed_at: string | null;
  task_completed: boolean;
  task_completed_at: string | null;
  reflection_text: string | null;
  reflection_sentiment: ReflectionSentiment | null;
  reflection_voice_url: string | null;
  ai_response: string | null;
  created_at: string;
}

export type ReflectionSentiment = 'good' | 'okay' | 'hard';

// Chat
export interface ChatMessage {
  id: string;
  user_id: string;
  role: ChatRole;
  content: string;
  created_at: string;
}

export type ChatRole = 'user' | 'assistant' | 'system';

// Journey
export interface JourneyPhoto {
  id: string;
  user_id: string;
  photo_url: string;
  photo_date: string;
  reflection_text: string | null;
  reflection_sentiment: ReflectionSentiment | null;
  ai_response: string | null;
  created_at: string;
}

export interface TaskCompletion {
  id: string;
  user_id: string;
  task_id: string;
  completion_date: string;
  completed_at: string;
}

// Modules & Library
export interface ModuleProgress {
  id: string;
  user_id: string;
  module_type: ModuleType;
  module_id: string;
  completed: boolean;
  bookmarked: boolean;
  completed_at: string | null;
  created_at: string;
}

export type ModuleType = 'technique' | 'habit' | 'story' | 'development';

export interface UserBadge {
  id: string;
  user_id: string;
  badge_type: string;
  badge_data: Record<string, unknown> | null;
  earned_at: string;
}

// Daily Content (hardcoded in app)
export interface DailyDua {
  id: string;
  arabic: string;
  transliteration: string;
  translation: string;
  audio_url: string | null;
}

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  duration_minutes: number;
  age_group: AgeGroup;
  category: MissionCategory;
}

export type AgeGroup = 'baby' | 'toddler' | 'child' | 'all';
export type MissionCategory = 'prayer' | 'character' | 'story' | 'habit';

// Module Content (hardcoded in app)
export interface ModuleGuide {
  id: string;
  type: ModuleType;
  title: string;
  description: string;
  duration_minutes: number;
  content: string;
  tags: string[];
}

// Onboarding
export interface OnboardingData {
  child_name: string;
  child_birthdate: string;
  struggles: string[];
  current_habits: string[];
  mission_time: string;
}

// Character Development
export type TraitCategory = 'spiritual' | 'interpersonal' | 'self_regulation' | 'social' | 'additional';
export type ResourceType = 'hadith' | 'quran' | 'dua';

export interface TraitResource {
  type: ResourceType;
  arabic?: string;
  transliteration?: string;
  translation: string;
  reference?: string;
  surah?: string;
  ayah?: string;
}

export interface CharacterTrait {
  id: string;
  name: string;
  arabicName?: string;
  category: TraitCategory;
  description: string;
  resources: TraitResource[];
}

export interface DailyTrait {
  id: string;
  user_id: string;
  trait_id: string;
  day_number: number;
  cycle_number: number;
  resource_type: ResourceType;
  trait_date: string;
  completed: boolean;
  completed_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface TraitMastery {
  id: string;
  user_id: string;
  trait_id: string;
  times_taught: number;
  last_taught_date: string | null;
  mastery_level: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DevelopmentJourney {
  id: string;
  user_id: string;
  start_date: string;
  current_cycle: number;
  total_traits_taught: number;
  created_at: string;
  updated_at: string;
}

// Daily Tasks (Phase 9) - General parenting tasks for TodayScreen
export type DailyTaskCategory =
  | 'morning_routine'
  | 'morning_ibadah'
  | 'morning_habits'
  | 'spiritual_teaching'
  | 'character_building'
  | 'active_learning'
  | 'practical_life'
  | 'dhuhr_routine'
  | 'quiet_time'
  | 'asr_routine'
  | 'quran_time'
  | 'maghrib_routine'
  | 'dinner_family'
  | 'isha_routine'
  | 'bedtime_routine'
  | 'friday_special'
  | 'weekly_special'
  | 'social_skills'
  | 'resilience';

// Task type: primary (foundation-building) or quick_win (under 2 min)
export type DailyTaskType = 'primary' | 'quick_win';

// Display category for TodayScreen UI
export type DailyTaskDisplayType = 'day_task' | 'nice_to_have';

export interface DailyTask {
  id: string;
  number: number; // Task number from the document
  title: string;
  shortTitle?: string; // 2-3 word version for UI display
  category: DailyTaskCategory;
  task_type: DailyTaskType; // primary or quick_win
  display_type: DailyTaskDisplayType; // day_task (learning) or nice_to_have (habits)
  description?: string; // Additional context
  age_appropriate: 'baby' | 'toddler' | 'child' | 'all';
  tags: string[];
  icon?: string; // Emoji icon for the task
}

export interface DailyTaskCompletion {
  id: string;
  user_id: string;
  task_id: string;
  completion_date: string; // YYYY-MM-DD
  went_well: boolean | null;
  notes?: string;
  created_at: string;
}

export interface UserDailyTaskSelection {
  id: string;
  user_id: string;
  task_id: string;
  is_active: boolean; // User has selected this task for their daily routine
  display_order: number;
  created_at: string;
}

// Daily feedback to adjust task difficulty
export type DailyFeedbackRating = 'too_easy' | 'just_right' | 'too_hard';

export interface DailyFeedback {
  id: string;
  user_id: string;
  feedback_date: string; // YYYY-MM-DD
  tasks_completed: number;
  tasks_assigned: number;
  rating: DailyFeedbackRating;
  notes?: string;
  created_at: string;
}

// User's task difficulty preference (calculated from feedback)
export interface UserTaskPreference {
  id: string;
  user_id: string;
  preferred_task_count: number; // 3, 4, or 5
  difficulty_score: number; // 0-100, higher = can handle more
  last_updated: string;
}

// =====================================================
// Character Development (Quick Capture + Trees + Coaching)
// =====================================================

export type MomentType = 'positive' | 'struggle';
export type TreeState = 'thriving' | 'growing' | 'needs_attention' | 'wilting';
export type InterventionType = 'first_struggle' | 'repeated' | 'persistent' | 'no_wins';

export interface CharacterMoment {
  id: string;
  user_id: string;
  trait_id: string;
  moment_type: MomentType;
  scenario_id: string;
  custom_note?: string;
  photo_url?: string;
  difficulty_multiplier: number;
  created_at: string;
}

export interface CharacterTree {
  id: string;
  user_id: string;
  trait_id: string;
  current_xp: number;
  level: number;
  last_moment_date: string | null;
  positive_count: number;
  struggle_count: number;
  created_at: string;
  updated_at: string;
}

export interface CoachingIntervention {
  id: string;
  user_id: string;
  trait_id: string;
  intervention_type: InterventionType;
  script_id: string;
  delivered_at: string;
  accepted: boolean | null;
  challenge_completed: boolean | null;
  challenge_completed_at: string | null;
}

export interface CoachingChallenge {
  id: string;
  user_id: string;
  trait_id: string;
  challenge_text: string;
  started_at: string;
  expires_at: string;
  completed: boolean;
  completed_at: string | null;
}

// =====================================================
// Trait Practice (Nurture This Trait)
// =====================================================

export type TraitPracticeStatus = 'active' | 'completed' | 'abandoned';

export interface TraitPracticeSession {
  id: string;
  user_id: string;
  trait_id: string;
  practice_id: string;
  practice_payload: Record<string, unknown>;
  status: TraitPracticeStatus;
  started_at: string;
  ended_at: string | null;
  reflection_note: string | null;
  created_at: string;
  updated_at: string;
}

// UI State
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

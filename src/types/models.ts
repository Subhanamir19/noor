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

// Routine
export interface RoutineTask {
  id: string;
  user_id: string;
  task_name: string;
  task_description: string | null;
  time_of_day: TimeOfDay;
  task_order: number;
  is_active: boolean;
  linked_module_type: ModuleType | null;
  linked_module_id: string | null;
  created_at: string;
}

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'anytime';

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

export type ModuleType = 'technique' | 'habit' | 'story';

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

// UI State
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

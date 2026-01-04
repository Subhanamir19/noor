-- =====================================================
-- PHASE 9: Daily Tasks Schema (General Parenting Tasks)
-- Run this in Supabase Dashboard -> SQL Editor
-- =====================================================

-- =====================================================
-- STEP 1: Daily Task Completions Table
-- =====================================================

DROP TABLE IF EXISTS daily_task_completions CASCADE;

CREATE TABLE daily_task_completions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  task_id TEXT NOT NULL,
  completion_date DATE NOT NULL,
  went_well BOOLEAN,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, task_id, completion_date)
);

-- =====================================================
-- STEP 2: User's Selected Daily Tasks (their routine)
-- =====================================================

DROP TABLE IF EXISTS user_daily_tasks CASCADE;

CREATE TABLE user_daily_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  task_id TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, task_id)
);

-- =====================================================
-- STEP 3: Indexes
-- =====================================================

CREATE INDEX idx_daily_task_completions_user_date
  ON daily_task_completions(user_id, completion_date DESC);

CREATE INDEX idx_daily_task_completions_user_task
  ON daily_task_completions(user_id, task_id);

CREATE INDEX idx_user_daily_tasks_user
  ON user_daily_tasks(user_id, is_active, display_order);

-- =====================================================
-- STEP 4: Row Level Security
-- =====================================================

ALTER TABLE daily_task_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_daily_tasks ENABLE ROW LEVEL SECURITY;

-- Daily task completions policies
CREATE POLICY "Users can view own daily task completions"
  ON daily_task_completions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily task completions"
  ON daily_task_completions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily task completions"
  ON daily_task_completions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own daily task completions"
  ON daily_task_completions FOR DELETE
  USING (auth.uid() = user_id);

-- User daily tasks selection policies
CREATE POLICY "Users can view own daily tasks"
  ON user_daily_tasks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily tasks"
  ON user_daily_tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily tasks"
  ON user_daily_tasks FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own daily tasks"
  ON user_daily_tasks FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- STEP 5: Add columns to profiles (if not already added)
-- =====================================================

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS struggles TEXT[] DEFAULT '{}';

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS current_habits TEXT[] DEFAULT '{}';

-- =====================================================
-- STEP 6: Daily Task Selections (curated daily tasks)
-- =====================================================

DROP TABLE IF EXISTS daily_task_selections CASCADE;

CREATE TABLE daily_task_selections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  selection_date DATE NOT NULL,
  primary_task_id TEXT NOT NULL,
  quick_win_task_id TEXT NOT NULL,
  bonus_task_id TEXT NOT NULL,
  optional_task_ids TEXT[] DEFAULT '{}',
  task_count INTEGER NOT NULL DEFAULT 3,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, selection_date)
);

-- Index for quick lookups
CREATE INDEX idx_daily_task_selections_user_date
  ON daily_task_selections(user_id, selection_date DESC);

-- RLS
ALTER TABLE daily_task_selections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own task selections"
  ON daily_task_selections FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own task selections"
  ON daily_task_selections FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own task selections"
  ON daily_task_selections FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own task selections"
  ON daily_task_selections FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- STEP 7: Daily Feedback Table
-- =====================================================

DROP TABLE IF EXISTS daily_feedback CASCADE;

CREATE TABLE daily_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  feedback_date DATE NOT NULL,
  tasks_completed INTEGER NOT NULL DEFAULT 0,
  tasks_assigned INTEGER NOT NULL DEFAULT 0,
  rating TEXT NOT NULL CHECK (rating IN ('too_easy', 'just_right', 'too_hard')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, feedback_date)
);

-- Index for feedback history lookups
CREATE INDEX idx_daily_feedback_user_date
  ON daily_feedback(user_id, feedback_date DESC);

-- RLS
ALTER TABLE daily_feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own feedback"
  ON daily_feedback FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own feedback"
  ON daily_feedback FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own feedback"
  ON daily_feedback FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own feedback"
  ON daily_feedback FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- STEP 8: User Task Preferences
-- =====================================================

DROP TABLE IF EXISTS user_task_preferences CASCADE;

CREATE TABLE user_task_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  preferred_task_count INTEGER NOT NULL DEFAULT 3 CHECK (preferred_task_count >= 3 AND preferred_task_count <= 5),
  child_age TEXT DEFAULT 'all' CHECK (child_age IN ('baby', 'toddler', 'child', 'all')),
  difficulty_score DECIMAL(3,2) DEFAULT 0.5,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS
ALTER TABLE user_task_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON user_task_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_task_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_task_preferences FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own preferences"
  ON user_task_preferences FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- DONE! Phase 9 Schema created successfully.
--
-- Tables created:
-- 1. daily_task_completions - tracks task completions per day
-- 2. user_daily_tasks - user's custom task selections (legacy)
-- 3. daily_task_selections - curated daily 3-5 tasks
-- 4. daily_feedback - end-of-day feedback ratings
-- 5. user_task_preferences - preferred task count & settings
-- =====================================================

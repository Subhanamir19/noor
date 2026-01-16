-- ============================================================================
-- Gamification System Tables
-- Migration: 20260115000001
-- Description: Create HP progress, custom tasks, and transaction log tables
-- ============================================================================

-- ============================================================================
-- 1. User HP Progress Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.user_hp_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  current_hp INTEGER NOT NULL DEFAULT 0,
  total_hp_earned INTEGER NOT NULL DEFAULT 0,
  current_badge_tier TEXT NOT NULL DEFAULT 'seedling',
  badges_unlocked TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT user_hp_progress_user_id_unique UNIQUE (user_id),
  CONSTRAINT check_hp_positive CHECK (current_hp >= 0),
  CONSTRAINT check_total_hp CHECK (total_hp_earned >= current_hp),
  CONSTRAINT check_badge_tier CHECK (current_badge_tier IN ('seedling', 'growing', 'blooming', 'wise', 'lighthouse'))
);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS idx_user_hp_progress_user_id ON public.user_hp_progress(user_id);

-- RLS Policies
ALTER TABLE public.user_hp_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own HP progress" ON public.user_hp_progress;
CREATE POLICY "Users can view own HP progress"
  ON public.user_hp_progress FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own HP progress" ON public.user_hp_progress;
CREATE POLICY "Users can insert own HP progress"
  ON public.user_hp_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own HP progress" ON public.user_hp_progress;
CREATE POLICY "Users can update own HP progress"
  ON public.user_hp_progress FOR UPDATE
  USING (auth.uid() = user_id);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_user_hp_progress_updated_at ON public.user_hp_progress;
CREATE TRIGGER update_user_hp_progress_updated_at
  BEFORE UPDATE ON public.user_hp_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 2. HP Transaction Log Table (for analytics)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.hp_transaction_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_id TEXT NOT NULL,
  hp_gained INTEGER NOT NULL,
  transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_hp_log_user_date ON public.hp_transaction_log(user_id, transaction_date DESC);
CREATE INDEX IF NOT EXISTS idx_hp_log_task ON public.hp_transaction_log(task_id);

-- RLS Policy
ALTER TABLE public.hp_transaction_log ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own HP transactions" ON public.hp_transaction_log;
CREATE POLICY "Users can view own HP transactions"
  ON public.hp_transaction_log FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "System can insert HP transactions" ON public.hp_transaction_log;
CREATE POLICY "System can insert HP transactions"
  ON public.hp_transaction_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 3. Custom Daily Tasks Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.custom_daily_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  hp_value INTEGER NOT NULL DEFAULT 10,
  time_estimate TEXT NOT NULL DEFAULT '2-3min',
  priority_level TEXT NOT NULL DEFAULT 'normal',
  icon TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT check_custom_hp_value CHECK (hp_value BETWEEN 5 AND 35),
  CONSTRAINT check_custom_time_estimate CHECK (time_estimate IN ('<1min', '2-3min', '5min', '10min+')),
  CONSTRAINT check_custom_priority CHECK (priority_level IN ('normal', 'important', 'critical'))
);

-- Index for active tasks
CREATE INDEX IF NOT EXISTS idx_custom_tasks_active ON public.custom_daily_tasks(user_id, is_active) WHERE is_active = TRUE;

-- RLS Policies
ALTER TABLE public.custom_daily_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own custom tasks" ON public.custom_daily_tasks;
CREATE POLICY "Users can view own custom tasks"
  ON public.custom_daily_tasks FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own custom tasks" ON public.custom_daily_tasks;
CREATE POLICY "Users can create own custom tasks"
  ON public.custom_daily_tasks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own custom tasks" ON public.custom_daily_tasks;
CREATE POLICY "Users can update own custom tasks"
  ON public.custom_daily_tasks FOR UPDATE
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own custom tasks" ON public.custom_daily_tasks;
CREATE POLICY "Users can delete own custom tasks"
  ON public.custom_daily_tasks FOR DELETE
  USING (auth.uid() = user_id);

-- Auto-update trigger
DROP TRIGGER IF EXISTS update_custom_daily_tasks_updated_at ON public.custom_daily_tasks;
CREATE TRIGGER update_custom_daily_tasks_updated_at
  BEFORE UPDATE ON public.custom_daily_tasks
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 4. Task Rotation Config Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.task_rotation_config (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  task_id TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  is_custom BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT task_rotation_user_task_unique UNIQUE (user_id, task_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_task_rotation_user ON public.task_rotation_config(user_id);
CREATE INDEX IF NOT EXISTS idx_task_rotation_active ON public.task_rotation_config(user_id, is_active) WHERE is_active = TRUE;

-- RLS Policy
ALTER TABLE public.task_rotation_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own rotation config" ON public.task_rotation_config;
CREATE POLICY "Users can manage own rotation config"
  ON public.task_rotation_config FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Auto-update trigger
DROP TRIGGER IF EXISTS update_task_rotation_config_updated_at ON public.task_rotation_config;
CREATE TRIGGER update_task_rotation_config_updated_at
  BEFORE UPDATE ON public.task_rotation_config
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 5. Extend daily_tasks table (if needed)
-- ============================================================================

-- Check if columns already exist before adding
DO $$
BEGIN
  -- Add hp_value column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'daily_tasks'
    AND column_name = 'hp_value'
  ) THEN
    ALTER TABLE public.daily_tasks ADD COLUMN hp_value INTEGER NOT NULL DEFAULT 10;
    ALTER TABLE public.daily_tasks ADD CONSTRAINT check_hp_value CHECK (hp_value BETWEEN 5 AND 35);
  END IF;

  -- Add time_estimate column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'daily_tasks'
    AND column_name = 'time_estimate'
  ) THEN
    ALTER TABLE public.daily_tasks ADD COLUMN time_estimate TEXT NOT NULL DEFAULT '2-3min';
    ALTER TABLE public.daily_tasks ADD CONSTRAINT check_time_estimate CHECK (time_estimate IN ('<1min', '2-3min', '5min', '10min+'));
  END IF;

  -- Add priority_level column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'daily_tasks'
    AND column_name = 'priority_level'
  ) THEN
    ALTER TABLE public.daily_tasks ADD COLUMN priority_level TEXT NOT NULL DEFAULT 'normal';
    ALTER TABLE public.daily_tasks ADD CONSTRAINT check_priority_level CHECK (priority_level IN ('normal', 'important', 'critical'));
  END IF;

  -- Add benefit_text column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'daily_tasks'
    AND column_name = 'benefit_text'
  ) THEN
    ALTER TABLE public.daily_tasks ADD COLUMN benefit_text TEXT;
  END IF;

  -- Add is_custom column
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = 'daily_tasks'
    AND column_name = 'is_custom'
  ) THEN
    ALTER TABLE public.daily_tasks ADD COLUMN is_custom BOOLEAN NOT NULL DEFAULT FALSE;
  END IF;
END $$;

-- Create index for custom tasks
CREATE INDEX IF NOT EXISTS idx_daily_tasks_custom ON public.daily_tasks(is_custom) WHERE is_custom = TRUE;

-- ============================================================================
-- Migration Complete
-- ============================================================================

-- Add comment
COMMENT ON TABLE public.user_hp_progress IS 'Tracks user HP (Health Points / Parenting Points) and badge progression';
COMMENT ON TABLE public.hp_transaction_log IS 'Logs all HP gains for analytics';
COMMENT ON TABLE public.custom_daily_tasks IS 'User-created custom daily tasks';
COMMENT ON TABLE public.task_rotation_config IS 'User configuration for which tasks appear in daily rotation';

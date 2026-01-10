-- =====================================================
-- TRAIT PRACTICE (Nurture This Trait) SCHEMA
-- Run this in Supabase Dashboard -> SQL Editor
-- =====================================================

-- =====================================================
-- STEP 1: Trait Practice Sessions
-- Stores per-user practice sessions with a JSON snapshot of the practice content.
-- =====================================================

CREATE TABLE IF NOT EXISTS trait_practice_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  trait_id TEXT NOT NULL,
  practice_id TEXT NOT NULL,
  practice_payload JSONB NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'abandoned')),
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  reflection_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_trait_practice_sessions_user_date
  ON trait_practice_sessions(user_id, started_at DESC);

CREATE INDEX IF NOT EXISTS idx_trait_practice_sessions_user_trait_status
  ON trait_practice_sessions(user_id, trait_id, status, started_at DESC);

-- Ensure a user has at most one active session per trait.
CREATE UNIQUE INDEX IF NOT EXISTS uniq_active_practice_per_trait
  ON trait_practice_sessions(user_id, trait_id)
  WHERE status = 'active';

-- =====================================================
-- STEP 2: Row Level Security
-- =====================================================

ALTER TABLE trait_practice_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trait practice sessions"
  ON trait_practice_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trait practice sessions"
  ON trait_practice_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trait practice sessions"
  ON trait_practice_sessions FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own trait practice sessions"
  ON trait_practice_sessions FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- DONE! Trait practice sessions schema created.
-- =====================================================


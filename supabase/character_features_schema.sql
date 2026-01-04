-- =====================================================
-- CHARACTER DEVELOPMENT FEATURES SCHEMA
-- Run this in Supabase Dashboard -> SQL Editor
-- =====================================================

-- =====================================================
-- STEP 1: Character Moments Table (Quick Capture data)
-- =====================================================

CREATE TABLE IF NOT EXISTS character_moments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  trait_id TEXT NOT NULL,
  moment_type TEXT NOT NULL CHECK (moment_type IN ('positive', 'struggle')),
  scenario_id TEXT NOT NULL,
  custom_note TEXT,
  photo_url TEXT,
  difficulty_multiplier DECIMAL(3,2) DEFAULT 1.0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_character_moments_user_trait
  ON character_moments(user_id, trait_id, created_at DESC);

CREATE INDEX idx_character_moments_user_date
  ON character_moments(user_id, created_at DESC);

-- =====================================================
-- STEP 2: Character Trees Table (XP + Levels)
-- =====================================================

CREATE TABLE IF NOT EXISTS character_trees (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  trait_id TEXT NOT NULL,
  current_xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1 CHECK (level >= 1 AND level <= 10),
  last_moment_date DATE,
  positive_count INTEGER DEFAULT 0,
  struggle_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, trait_id)
);

CREATE INDEX idx_character_trees_user
  ON character_trees(user_id);

-- =====================================================
-- STEP 3: Coaching Interventions Table
-- =====================================================

CREATE TABLE IF NOT EXISTS coaching_interventions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  trait_id TEXT NOT NULL,
  intervention_type TEXT NOT NULL CHECK (intervention_type IN ('first_struggle', 'repeated', 'persistent', 'no_wins')),
  script_id TEXT NOT NULL,
  delivered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted BOOLEAN,
  challenge_completed BOOLEAN,
  challenge_completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_coaching_interventions_user_trait
  ON coaching_interventions(user_id, trait_id, delivered_at DESC);

-- =====================================================
-- STEP 4: Coaching Challenges Table
-- =====================================================

CREATE TABLE IF NOT EXISTS coaching_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  trait_id TEXT NOT NULL,
  challenge_text TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_coaching_challenges_user_active
  ON coaching_challenges(user_id, completed, expires_at);

-- =====================================================
-- STEP 5: Row Level Security
-- =====================================================

ALTER TABLE character_moments ENABLE ROW LEVEL SECURITY;
ALTER TABLE character_trees ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaching_interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaching_challenges ENABLE ROW LEVEL SECURITY;

-- Character Moments policies
CREATE POLICY "Users can view own moments"
  ON character_moments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own moments"
  ON character_moments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own moments"
  ON character_moments FOR DELETE
  USING (auth.uid() = user_id);

-- Character Trees policies
CREATE POLICY "Users can view own trees"
  ON character_trees FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trees"
  ON character_trees FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trees"
  ON character_trees FOR UPDATE
  USING (auth.uid() = user_id);

-- Coaching Interventions policies
CREATE POLICY "Users can view own interventions"
  ON coaching_interventions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interventions"
  ON coaching_interventions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own interventions"
  ON coaching_interventions FOR UPDATE
  USING (auth.uid() = user_id);

-- Coaching Challenges policies
CREATE POLICY "Users can view own challenges"
  ON coaching_challenges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own challenges"
  ON coaching_challenges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own challenges"
  ON coaching_challenges FOR UPDATE
  USING (auth.uid() = user_id);

-- =====================================================
-- DONE! Character Features Schema created.
--
-- Tables:
-- 1. character_moments - logged character moments
-- 2. character_trees - XP/level per trait
-- 3. coaching_interventions - delivered coaching
-- 4. coaching_challenges - active weekly challenges
-- =====================================================

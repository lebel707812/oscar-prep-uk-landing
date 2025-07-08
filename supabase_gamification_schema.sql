-- Gamification Schema for OSCE Prep UK
-- This schema implements a comprehensive gamification system with points, badges, achievements, and leaderboards

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Points Table
-- Tracks all point transactions for users
CREATE TABLE user_points (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    points_earned INTEGER NOT NULL DEFAULT 0,
    points_type VARCHAR(50) NOT NULL, -- 'session_complete', 'correct_answer', 'streak_bonus', 'achievement', 'daily_login', etc.
    source_id UUID, -- Reference to the source (session_id, question_id, achievement_id, etc.)
    source_type VARCHAR(50), -- 'mock_exam', 'practice_session', 'achievement', 'daily_bonus', etc.
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Total Points View
-- Aggregated view of total points per user
CREATE TABLE user_total_points (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    total_points INTEGER NOT NULL DEFAULT 0,
    level INTEGER NOT NULL DEFAULT 1,
    points_to_next_level INTEGER NOT NULL DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Badge Definitions Table
-- Defines all available badges in the system
CREATE TABLE badge_definitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon_url TEXT,
    icon_name VARCHAR(50), -- For icon libraries like Lucide
    color VARCHAR(7) DEFAULT '#3B82F6', -- Hex color code
    category VARCHAR(50) NOT NULL, -- 'progress', 'achievement', 'social', 'special'
    rarity VARCHAR(20) DEFAULT 'common', -- 'common', 'rare', 'epic', 'legendary'
    points_reward INTEGER DEFAULT 0,
    requirements JSONB, -- Flexible requirements structure
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Badges Table
-- Tracks which badges users have earned
CREATE TABLE user_badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    badge_id UUID NOT NULL REFERENCES badge_definitions(id) ON DELETE CASCADE,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    progress JSONB, -- Track progress towards badge completion
    is_featured BOOLEAN DEFAULT false, -- Whether user wants to feature this badge
    UNIQUE(user_id, badge_id)
);

-- Achievement Definitions Table
-- Defines all available achievements
CREATE TABLE achievement_definitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    icon_url TEXT,
    icon_name VARCHAR(50),
    color VARCHAR(7) DEFAULT '#10B981',
    category VARCHAR(50) NOT NULL, -- 'study', 'exam', 'social', 'milestone'
    difficulty VARCHAR(20) DEFAULT 'medium', -- 'easy', 'medium', 'hard', 'extreme'
    points_reward INTEGER DEFAULT 0,
    badge_reward UUID REFERENCES badge_definitions(id),
    requirements JSONB NOT NULL,
    is_active BOOLEAN DEFAULT true,
    is_hidden BOOLEAN DEFAULT false, -- Hidden achievements for surprises
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Achievements Table
-- Tracks user progress and completion of achievements
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES achievement_definitions(id) ON DELETE CASCADE,
    progress JSONB DEFAULT '{}', -- Track progress towards achievement
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- User Streaks Table
-- Tracks various user streaks (daily login, study sessions, etc.)
CREATE TABLE user_streaks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    streak_type VARCHAR(50) NOT NULL, -- 'daily_login', 'study_session', 'mock_exam', etc.
    current_streak INTEGER DEFAULT 0,
    longest_streak INTEGER DEFAULT 0,
    last_activity_date DATE,
    streak_data JSONB DEFAULT '{}', -- Additional streak-specific data
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, streak_type)
);

-- Leaderboards Table
-- Defines different types of leaderboards
CREATE TABLE leaderboard_definitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    type VARCHAR(50) NOT NULL, -- 'points', 'streak', 'achievements', 'custom'
    period VARCHAR(20) DEFAULT 'all_time', -- 'daily', 'weekly', 'monthly', 'all_time'
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Leaderboard Entries
-- Cached leaderboard positions for performance
CREATE TABLE user_leaderboard_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    leaderboard_id UUID NOT NULL REFERENCES leaderboard_definitions(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    position INTEGER NOT NULL,
    score INTEGER NOT NULL,
    period_start DATE,
    period_end DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(leaderboard_id, user_id, period_start)
);

-- User Gamification Preferences
-- User preferences for gamification features
CREATE TABLE user_gamification_preferences (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    show_points BOOLEAN DEFAULT true,
    show_badges BOOLEAN DEFAULT true,
    show_achievements BOOLEAN DEFAULT true,
    show_leaderboards BOOLEAN DEFAULT true,
    email_notifications BOOLEAN DEFAULT true,
    push_notifications BOOLEAN DEFAULT true,
    featured_badge_id UUID REFERENCES badge_definitions(id),
    privacy_level VARCHAR(20) DEFAULT 'public', -- 'public', 'friends', 'private'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily Challenges Table
-- Daily challenges for users to complete
CREATE TABLE daily_challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    challenge_date DATE NOT NULL,
    requirements JSONB NOT NULL,
    points_reward INTEGER DEFAULT 50,
    badge_reward UUID REFERENCES badge_definitions(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(challenge_date, name)
);

-- User Daily Challenge Progress
CREATE TABLE user_daily_challenge_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    challenge_id UUID NOT NULL REFERENCES daily_challenges(id) ON DELETE CASCADE,
    progress JSONB DEFAULT '{}',
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, challenge_id)
);

-- Indexes for performance
CREATE INDEX idx_user_points_user_id ON user_points(user_id);
CREATE INDEX idx_user_points_created_at ON user_points(created_at DESC);
CREATE INDEX idx_user_points_type ON user_points(points_type);
CREATE INDEX idx_user_badges_user_id ON user_badges(user_id);
CREATE INDEX idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_completed ON user_achievements(is_completed);
CREATE INDEX idx_user_streaks_user_id ON user_streaks(user_id);
CREATE INDEX idx_user_leaderboard_entries_leaderboard_id ON user_leaderboard_entries(leaderboard_id);
CREATE INDEX idx_user_leaderboard_entries_position ON user_leaderboard_entries(position);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE user_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_total_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE badge_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievement_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_leaderboard_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_gamification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_daily_challenge_progress ENABLE ROW LEVEL SECURITY;

-- User Points Policies
CREATE POLICY "Users can view their own points" ON user_points
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert points" ON user_points
    FOR INSERT WITH CHECK (true);

-- User Total Points Policies
CREATE POLICY "Users can view their own total points" ON user_total_points
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view others' total points for leaderboards" ON user_total_points
    FOR SELECT USING (true);

CREATE POLICY "System can manage total points" ON user_total_points
    FOR ALL USING (true);

-- Badge Definitions Policies (Public read)
CREATE POLICY "Anyone can view badge definitions" ON badge_definitions
    FOR SELECT USING (is_active = true);

-- User Badges Policies
CREATE POLICY "Users can view their own badges" ON user_badges
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can view others' badges" ON user_badges
    FOR SELECT USING (true);

CREATE POLICY "System can award badges" ON user_badges
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update badge preferences" ON user_badges
    FOR UPDATE USING (auth.uid() = user_id);

-- Achievement Definitions Policies
CREATE POLICY "Anyone can view active achievements" ON achievement_definitions
    FOR SELECT USING (is_active = true AND is_hidden = false);

-- User Achievements Policies
CREATE POLICY "Users can view their own achievements" ON user_achievements
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage achievements" ON user_achievements
    FOR ALL USING (true);

-- User Streaks Policies
CREATE POLICY "Users can view their own streaks" ON user_streaks
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage streaks" ON user_streaks
    FOR ALL USING (true);

-- Leaderboard Definitions Policies
CREATE POLICY "Anyone can view active leaderboards" ON leaderboard_definitions
    FOR SELECT USING (is_active = true);

-- User Leaderboard Entries Policies
CREATE POLICY "Anyone can view leaderboard entries" ON user_leaderboard_entries
    FOR SELECT USING (true);

CREATE POLICY "System can manage leaderboard entries" ON user_leaderboard_entries
    FOR ALL USING (true);

-- User Gamification Preferences Policies
CREATE POLICY "Users can manage their own preferences" ON user_gamification_preferences
    FOR ALL USING (auth.uid() = user_id);

-- Daily Challenges Policies
CREATE POLICY "Anyone can view active challenges" ON daily_challenges
    FOR SELECT USING (is_active = true);

-- User Daily Challenge Progress Policies
CREATE POLICY "Users can view their own challenge progress" ON user_daily_challenge_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can manage challenge progress" ON user_daily_challenge_progress
    FOR ALL USING (true);

-- Functions for gamification logic

-- Function to award points to a user
CREATE OR REPLACE FUNCTION award_points(
    p_user_id UUID,
    p_points INTEGER,
    p_points_type VARCHAR(50),
    p_source_id UUID DEFAULT NULL,
    p_source_type VARCHAR(50) DEFAULT NULL,
    p_description TEXT DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
    -- Insert points transaction
    INSERT INTO user_points (user_id, points_earned, points_type, source_id, source_type, description)
    VALUES (p_user_id, p_points, p_points_type, p_source_id, p_source_type, p_description);
    
    -- Update total points
    INSERT INTO user_total_points (user_id, total_points)
    VALUES (p_user_id, p_points)
    ON CONFLICT (user_id) 
    DO UPDATE SET 
        total_points = user_total_points.total_points + p_points,
        updated_at = NOW();
    
    -- Update level if necessary
    PERFORM update_user_level(p_user_id);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user level based on points
CREATE OR REPLACE FUNCTION update_user_level(p_user_id UUID) RETURNS VOID AS $$
DECLARE
    current_points INTEGER;
    new_level INTEGER;
    points_for_next_level INTEGER;
BEGIN
    SELECT total_points INTO current_points 
    FROM user_total_points 
    WHERE user_id = p_user_id;
    
    -- Calculate level (100 points per level, with increasing requirements)
    new_level := FLOOR(SQRT(current_points / 100)) + 1;
    points_for_next_level := (new_level * new_level * 100) - current_points;
    
    UPDATE user_total_points 
    SET 
        level = new_level,
        points_to_next_level = points_for_next_level,
        updated_at = NOW()
    WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to award badge to user
CREATE OR REPLACE FUNCTION award_badge(
    p_user_id UUID,
    p_badge_slug VARCHAR(100)
) RETURNS BOOLEAN AS $$
DECLARE
    badge_record RECORD;
    already_has_badge BOOLEAN;
BEGIN
    -- Get badge definition
    SELECT * INTO badge_record 
    FROM badge_definitions 
    WHERE slug = p_badge_slug AND is_active = true;
    
    IF NOT FOUND THEN
        RETURN false;
    END IF;
    
    -- Check if user already has this badge
    SELECT EXISTS(
        SELECT 1 FROM user_badges 
        WHERE user_id = p_user_id AND badge_id = badge_record.id
    ) INTO already_has_badge;
    
    IF already_has_badge THEN
        RETURN false;
    END IF;
    
    -- Award the badge
    INSERT INTO user_badges (user_id, badge_id)
    VALUES (p_user_id, badge_record.id);
    
    -- Award points if badge has point reward
    IF badge_record.points_reward > 0 THEN
        PERFORM award_points(
            p_user_id, 
            badge_record.points_reward, 
            'badge_earned', 
            badge_record.id, 
            'badge',
            'Earned badge: ' || badge_record.name
        );
    END IF;
    
    RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update user streak
CREATE OR REPLACE FUNCTION update_user_streak(
    p_user_id UUID,
    p_streak_type VARCHAR(50),
    p_activity_date DATE DEFAULT CURRENT_DATE
) RETURNS INTEGER AS $$
DECLARE
    current_streak_record RECORD;
    new_streak INTEGER;
BEGIN
    -- Get current streak
    SELECT * INTO current_streak_record
    FROM user_streaks
    WHERE user_id = p_user_id AND streak_type = p_streak_type;
    
    IF NOT FOUND THEN
        -- Create new streak record
        INSERT INTO user_streaks (user_id, streak_type, current_streak, longest_streak, last_activity_date)
        VALUES (p_user_id, p_streak_type, 1, 1, p_activity_date);
        RETURN 1;
    END IF;
    
    -- Check if activity is consecutive
    IF current_streak_record.last_activity_date = p_activity_date - INTERVAL '1 day' THEN
        -- Consecutive day, increment streak
        new_streak := current_streak_record.current_streak + 1;
    ELSIF current_streak_record.last_activity_date = p_activity_date THEN
        -- Same day, no change
        RETURN current_streak_record.current_streak;
    ELSE
        -- Streak broken, reset to 1
        new_streak := 1;
    END IF;
    
    -- Update streak
    UPDATE user_streaks
    SET 
        current_streak = new_streak,
        longest_streak = GREATEST(longest_streak, new_streak),
        last_activity_date = p_activity_date,
        updated_at = NOW()
    WHERE user_id = p_user_id AND streak_type = p_streak_type;
    
    RETURN new_streak;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert initial badge definitions
INSERT INTO badge_definitions (name, slug, description, icon_name, color, category, rarity, points_reward, requirements) VALUES
('First Steps', 'first-steps', 'Complete your first practice session', 'Play', '#10B981', 'progress', 'common', 10, '{"sessions_completed": 1}'),
('Dedicated Learner', 'dedicated-learner', 'Complete 10 practice sessions', 'BookOpen', '#3B82F6', 'progress', 'common', 50, '{"sessions_completed": 10}'),
('OSCE Warrior', 'osce-warrior', 'Complete 50 practice sessions', 'Sword', '#8B5CF6', 'progress', 'rare', 200, '{"sessions_completed": 50}'),
('Perfect Score', 'perfect-score', 'Achieve 100% in a mock exam', 'Star', '#F59E0B', 'achievement', 'rare', 100, '{"perfect_exam": true}'),
('Streak Master', 'streak-master', 'Maintain a 7-day study streak', 'Flame', '#EF4444', 'progress', 'rare', 150, '{"study_streak": 7}'),
('Community Helper', 'community-helper', 'Help 10 users in the forum', 'Heart', '#EC4899', 'social', 'rare', 100, '{"forum_helpful_answers": 10}'),
('Early Bird', 'early-bird', 'Study before 8 AM for 5 consecutive days', 'Sunrise', '#F97316', 'special', 'epic', 200, '{"early_morning_sessions": 5}'),
('Night Owl', 'night-owl', 'Study after 10 PM for 5 consecutive days', 'Moon', '#6366F1', 'special', 'epic', 200, '{"late_night_sessions": 5}'),
('Knowledge Seeker', 'knowledge-seeker', 'Read 25 blog articles', 'Search', '#06B6D4', 'progress', 'common', 75, '{"articles_read": 25}'),
('OSCE Champion', 'osce-champion', 'Pass 5 mock exams with 80%+ score', 'Trophy', '#FFD700', 'achievement', 'legendary', 500, '{"high_score_exams": 5}');

-- Insert initial achievement definitions
INSERT INTO achievement_definitions (name, slug, description, icon_name, color, category, difficulty, points_reward, requirements) VALUES
('Getting Started', 'getting-started', 'Complete your profile and first practice session', 'UserCheck', '#10B981', 'milestone', 'easy', 25, '{"profile_complete": true, "first_session": true}'),
('Study Habit', 'study-habit', 'Study for 7 consecutive days', 'Calendar', '#3B82F6', 'study', 'medium', 100, '{"consecutive_study_days": 7}'),
('Mock Exam Master', 'mock-exam-master', 'Complete 10 mock exams', 'FileText', '#8B5CF6', 'exam', 'medium', 150, '{"mock_exams_completed": 10}'),
('Community Contributor', 'community-contributor', 'Make 20 helpful forum posts', 'MessageSquare', '#EC4899', 'social', 'medium', 100, '{"forum_posts": 20}'),
('Speed Learner', 'speed-learner', 'Complete a practice session in under 30 minutes with 90%+ score', 'Zap', '#F59E0B', 'study', 'hard', 200, '{"fast_high_score": true}'),
('Perfectionist', 'perfectionist', 'Achieve 100% in 3 different categories', 'Target', '#EF4444', 'achievement', 'hard', 300, '{"perfect_categories": 3}'),
('Study Group Leader', 'study-group-leader', 'Create and lead a study group with 5+ members', 'Users', '#06B6D4', 'social', 'medium', 150, '{"study_group_leader": true}'),
('Knowledge Master', 'knowledge-master', 'Reach level 10', 'GraduationCap', '#8B5CF6', 'milestone', 'hard', 500, '{"level_reached": 10}'),
('Consistency King', 'consistency-king', 'Maintain a 30-day study streak', 'Crown', '#FFD700', 'study', 'extreme', 1000, '{"study_streak": 30}'),
('OSCE Legend', 'osce-legend', 'Achieve top 10 on the all-time leaderboard', 'Award', '#FFD700', 'achievement', 'extreme', 2000, '{"leaderboard_top_10": true}');

-- Insert initial leaderboard definitions
INSERT INTO leaderboard_definitions (name, slug, description, type, period) VALUES
('All-Time Points', 'all-time-points', 'Top users by total points earned', 'points', 'all_time'),
('Weekly Points', 'weekly-points', 'Top users this week by points', 'points', 'weekly'),
('Monthly Points', 'monthly-points', 'Top users this month by points', 'points', 'monthly'),
('Study Streak', 'study-streak', 'Longest current study streaks', 'streak', 'all_time'),
('Mock Exam Champions', 'mock-exam-champions', 'Highest mock exam scores', 'custom', 'all_time');

-- Insert sample daily challenge
INSERT INTO daily_challenges (name, description, challenge_date, requirements, points_reward) VALUES
('Daily Practice', 'Complete at least one practice session today', CURRENT_DATE, '{"practice_sessions": 1}', 25),
('Knowledge Boost', 'Answer 20 questions correctly today', CURRENT_DATE, '{"correct_answers": 20}', 50),
('Community Engagement', 'Make a helpful post in the forum today', CURRENT_DATE, '{"forum_posts": 1}', 30);

-- Create triggers to automatically update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all tables with updated_at columns
CREATE TRIGGER update_user_points_updated_at BEFORE UPDATE ON user_points FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_total_points_updated_at BEFORE UPDATE ON user_total_points FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_badge_definitions_updated_at BEFORE UPDATE ON badge_definitions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_badges_updated_at BEFORE UPDATE ON user_badges FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_achievement_definitions_updated_at BEFORE UPDATE ON achievement_definitions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_achievements_updated_at BEFORE UPDATE ON user_achievements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_streaks_updated_at BEFORE UPDATE ON user_streaks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leaderboard_definitions_updated_at BEFORE UPDATE ON leaderboard_definitions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_leaderboard_entries_updated_at BEFORE UPDATE ON user_leaderboard_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_gamification_preferences_updated_at BEFORE UPDATE ON user_gamification_preferences FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_daily_challenges_updated_at BEFORE UPDATE ON daily_challenges FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_daily_challenge_progress_updated_at BEFORE UPDATE ON user_daily_challenge_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


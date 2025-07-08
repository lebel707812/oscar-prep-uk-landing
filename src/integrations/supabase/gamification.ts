import { supabase } from './client';

// Types for Gamification entities
export interface UserPoints {
  id: string;
  user_id: string;
  points_earned: number;
  points_type: string;
  source_id?: string;
  source_type?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface UserTotalPoints {
  user_id: string;
  total_points: number;
  level: number;
  points_to_next_level: number;
  created_at: string;
  updated_at: string;
}

export interface BadgeDefinition {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon_url?: string;
  icon_name?: string;
  color: string;
  category: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points_reward: number;
  requirements: Record<string, any>;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string;
  progress?: Record<string, any>;
  is_featured: boolean;
  // Joined data
  badge?: BadgeDefinition;
}

export interface AchievementDefinition {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon_url?: string;
  icon_name?: string;
  color: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
  points_reward: number;
  badge_reward?: string;
  requirements: Record<string, any>;
  is_active: boolean;
  is_hidden: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  progress: Record<string, any>;
  is_completed: boolean;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  achievement?: AchievementDefinition;
}

export interface UserStreak {
  id: string;
  user_id: string;
  streak_type: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date?: string;
  streak_data: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface LeaderboardDefinition {
  id: string;
  name: string;
  slug: string;
  description?: string;
  type: string;
  period: 'daily' | 'weekly' | 'monthly' | 'all_time';
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface UserLeaderboardEntry {
  id: string;
  leaderboard_id: string;
  user_id: string;
  position: number;
  score: number;
  period_start?: string;
  period_end?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  user?: {
    email?: string;
    user_metadata?: {
      full_name?: string;
      avatar_url?: string;
    };
  };
}

export interface UserGamificationPreferences {
  user_id: string;
  show_points: boolean;
  show_badges: boolean;
  show_achievements: boolean;
  show_leaderboards: boolean;
  email_notifications: boolean;
  push_notifications: boolean;
  featured_badge_id?: string;
  privacy_level: 'public' | 'friends' | 'private';
  created_at: string;
  updated_at: string;
}

export interface DailyChallenge {
  id: string;
  name: string;
  description: string;
  challenge_date: string;
  requirements: Record<string, any>;
  points_reward: number;
  badge_reward?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserDailyChallengeProgress {
  id: string;
  user_id: string;
  challenge_id: string;
  progress: Record<string, any>;
  is_completed: boolean;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  // Joined data
  challenge?: DailyChallenge;
}

// Points Functions
export const fetchUserTotalPoints = async (userId?: string): Promise<UserTotalPoints | null> => {
  const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
  if (!targetUserId) return null;

  const { data, error } = await supabase
    .from('user_total_points')
    .select('*')
    .eq('user_id', targetUserId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const fetchUserPointsHistory = async (
  userId?: string,
  limit: number = 50,
  offset: number = 0
): Promise<UserPoints[]> => {
  const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
  if (!targetUserId) return [];

  const { data, error } = await supabase
    .from('user_points')
    .select('*')
    .eq('user_id', targetUserId)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data || [];
};

export const awardPoints = async (
  points: number,
  pointsType: string,
  sourceId?: string,
  sourceType?: string,
  description?: string
): Promise<void> => {
  const { error } = await supabase.rpc('award_points', {
    p_user_id: (await supabase.auth.getUser()).data.user?.id,
    p_points: points,
    p_points_type: pointsType,
    p_source_id: sourceId,
    p_source_type: sourceType,
    p_description: description
  });

  if (error) throw error;
};

// Badge Functions
export const fetchBadgeDefinitions = async (): Promise<BadgeDefinition[]> => {
  const { data, error } = await supabase
    .from('badge_definitions')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;
  return data || [];
};

export const fetchUserBadges = async (userId?: string): Promise<UserBadge[]> => {
  const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
  if (!targetUserId) return [];

  const { data, error } = await supabase
    .from('user_badges')
    .select(`
      *,
      badge:badge_definitions(*)
    `)
    .eq('user_id', targetUserId)
    .order('earned_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const awardBadge = async (badgeSlug: string): Promise<boolean> => {
  const { data, error } = await supabase.rpc('award_badge', {
    p_user_id: (await supabase.auth.getUser()).data.user?.id,
    p_badge_slug: badgeSlug
  });

  if (error) throw error;
  return data;
};

export const setFeaturedBadge = async (badgeId: string): Promise<void> => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) return;

  // First, unfeatured all badges
  await supabase
    .from('user_badges')
    .update({ is_featured: false })
    .eq('user_id', userId);

  // Then feature the selected badge
  const { error } = await supabase
    .from('user_badges')
    .update({ is_featured: true })
    .eq('user_id', userId)
    .eq('badge_id', badgeId);

  if (error) throw error;
};

// Achievement Functions
export const fetchAchievementDefinitions = async (): Promise<AchievementDefinition[]> => {
  const { data, error } = await supabase
    .from('achievement_definitions')
    .select('*')
    .eq('is_active', true)
    .eq('is_hidden', false)
    .order('sort_order');

  if (error) throw error;
  return data || [];
};

export const fetchUserAchievements = async (userId?: string): Promise<UserAchievement[]> => {
  const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
  if (!targetUserId) return [];

  const { data, error } = await supabase
    .from('user_achievements')
    .select(`
      *,
      achievement:achievement_definitions(*)
    `)
    .eq('user_id', targetUserId)
    .order('completed_at', { ascending: false, nullsLast: true });

  if (error) throw error;
  return data || [];
};

export const updateAchievementProgress = async (
  achievementSlug: string,
  progress: Record<string, any>
): Promise<void> => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) return;

  // Get achievement definition
  const { data: achievement } = await supabase
    .from('achievement_definitions')
    .select('id')
    .eq('slug', achievementSlug)
    .single();

  if (!achievement) return;

  const { error } = await supabase
    .from('user_achievements')
    .upsert({
      user_id: userId,
      achievement_id: achievement.id,
      progress
    });

  if (error) throw error;
};

// Streak Functions
export const fetchUserStreaks = async (userId?: string): Promise<UserStreak[]> => {
  const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
  if (!targetUserId) return [];

  const { data, error } = await supabase
    .from('user_streaks')
    .select('*')
    .eq('user_id', targetUserId);

  if (error) throw error;
  return data || [];
};

export const updateUserStreak = async (
  streakType: string,
  activityDate?: string
): Promise<number> => {
  const { data, error } = await supabase.rpc('update_user_streak', {
    p_user_id: (await supabase.auth.getUser()).data.user?.id,
    p_streak_type: streakType,
    p_activity_date: activityDate || new Date().toISOString().split('T')[0]
  });

  if (error) throw error;
  return data;
};

// Leaderboard Functions
export const fetchLeaderboardDefinitions = async (): Promise<LeaderboardDefinition[]> => {
  const { data, error } = await supabase
    .from('leaderboard_definitions')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;
  return data || [];
};

export const fetchLeaderboard = async (
  leaderboardSlug: string,
  limit: number = 50,
  offset: number = 0
): Promise<UserLeaderboardEntry[]> => {
  // Get leaderboard definition
  const { data: leaderboard } = await supabase
    .from('leaderboard_definitions')
    .select('id, type, period')
    .eq('slug', leaderboardSlug)
    .single();

  if (!leaderboard) return [];

  // For points leaderboards, we can query directly from user_total_points
  if (leaderboard.type === 'points') {
    const { data, error } = await supabase
      .from('user_total_points')
      .select(`
        user_id,
        total_points,
        user:auth.users!inner(email, user_metadata)
      `)
      .order('total_points', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return (data || []).map((entry, index) => ({
      id: `${leaderboard.id}-${entry.user_id}`,
      leaderboard_id: leaderboard.id,
      user_id: entry.user_id,
      position: offset + index + 1,
      score: entry.total_points,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user: entry.user
    }));
  }

  // For other leaderboard types, use the cached entries
  const { data, error } = await supabase
    .from('user_leaderboard_entries')
    .select(`
      *,
      user:auth.users!inner(email, user_metadata)
    `)
    .eq('leaderboard_id', leaderboard.id)
    .order('position')
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data || [];
};

export const getUserLeaderboardPosition = async (
  leaderboardSlug: string,
  userId?: string
): Promise<number | null> => {
  const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
  if (!targetUserId) return null;

  // Get leaderboard definition
  const { data: leaderboard } = await supabase
    .from('leaderboard_definitions')
    .select('id, type')
    .eq('slug', leaderboardSlug)
    .single();

  if (!leaderboard) return null;

  if (leaderboard.type === 'points') {
    // Calculate position based on total points
    const { data: userPoints } = await supabase
      .from('user_total_points')
      .select('total_points')
      .eq('user_id', targetUserId)
      .single();

    if (!userPoints) return null;

    const { count } = await supabase
      .from('user_total_points')
      .select('*', { count: 'exact', head: true })
      .gt('total_points', userPoints.total_points);

    return (count || 0) + 1;
  }

  // For other types, query cached entries
  const { data } = await supabase
    .from('user_leaderboard_entries')
    .select('position')
    .eq('leaderboard_id', leaderboard.id)
    .eq('user_id', targetUserId)
    .single();

  return data?.position || null;
};

// Preferences Functions
export const fetchUserGamificationPreferences = async (): Promise<UserGamificationPreferences | null> => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) return null;

  const { data, error } = await supabase
    .from('user_gamification_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const updateUserGamificationPreferences = async (
  preferences: Partial<UserGamificationPreferences>
): Promise<UserGamificationPreferences> => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) throw new Error('User not authenticated');

  const { data, error } = await supabase
    .from('user_gamification_preferences')
    .upsert({
      user_id: userId,
      ...preferences
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Daily Challenges Functions
export const fetchTodaysChallenges = async (): Promise<DailyChallenge[]> => {
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('daily_challenges')
    .select('*')
    .eq('challenge_date', today)
    .eq('is_active', true);

  if (error) throw error;
  return data || [];
};

export const fetchUserDailyChallengeProgress = async (): Promise<UserDailyChallengeProgress[]> => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) return [];

  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('user_daily_challenge_progress')
    .select(`
      *,
      challenge:daily_challenges(*)
    `)
    .eq('user_id', userId)
    .gte('created_at', today)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const updateDailyChallengeProgress = async (
  challengeId: string,
  progress: Record<string, any>
): Promise<void> => {
  const userId = (await supabase.auth.getUser()).data.user?.id;
  if (!userId) return;

  const { error } = await supabase
    .from('user_daily_challenge_progress')
    .upsert({
      user_id: userId,
      challenge_id: challengeId,
      progress
    });

  if (error) throw error;
};

// Utility Functions
export const calculateLevelFromPoints = (points: number): { level: number; pointsToNext: number } => {
  const level = Math.floor(Math.sqrt(points / 100)) + 1;
  const pointsToNext = (level * level * 100) - points;
  return { level, pointsToNext };
};

export const getRarityColor = (rarity: string): string => {
  const colors = {
    common: '#6B7280',
    rare: '#3B82F6',
    epic: '#8B5CF6',
    legendary: '#F59E0B'
  };
  return colors[rarity as keyof typeof colors] || colors.common;
};

export const getDifficultyColor = (difficulty: string): string => {
  const colors = {
    easy: '#10B981',
    medium: '#F59E0B',
    hard: '#EF4444',
    extreme: '#8B5CF6'
  };
  return colors[difficulty as keyof typeof colors] || colors.medium;
};

// Mock data for development/testing
export const mockUserStats = {
  totalPoints: 1250,
  level: 4,
  pointsToNext: 350,
  badges: 8,
  achievements: 12,
  currentStreak: 7,
  longestStreak: 15,
  leaderboardPosition: 23
};

export const mockRecentPoints = [
  { points: 50, type: 'Mock Exam Completed', time: '2 hours ago' },
  { points: 25, type: 'Daily Challenge', time: '1 day ago' },
  { points: 100, type: 'Badge Earned: Perfect Score', time: '2 days ago' },
  { points: 30, type: 'Study Streak Bonus', time: '3 days ago' }
];

export const mockBadges = [
  { name: 'First Steps', rarity: 'common', earned: true },
  { name: 'Dedicated Learner', rarity: 'common', earned: true },
  { name: 'Perfect Score', rarity: 'rare', earned: true },
  { name: 'Streak Master', rarity: 'rare', earned: false },
  { name: 'OSCE Champion', rarity: 'legendary', earned: false }
];

export const mockAchievements = [
  { name: 'Getting Started', progress: 100, completed: true },
  { name: 'Study Habit', progress: 85, completed: false },
  { name: 'Mock Exam Master', progress: 60, completed: false },
  { name: 'Community Contributor', progress: 30, completed: false }
];

export const mockLeaderboard = [
  { position: 1, name: 'Sarah Johnson', points: 3450, avatar: '' },
  { position: 2, name: 'Ahmed Khan', points: 3200, avatar: '' },
  { position: 3, name: 'Priya Patel', points: 2980, avatar: '' },
  { position: 4, name: 'James Wilson', points: 2750, avatar: '' },
  { position: 5, name: 'Maria Garcia', points: 2650, avatar: '' }
];


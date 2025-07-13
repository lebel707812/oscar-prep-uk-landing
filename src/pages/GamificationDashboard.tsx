import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Trophy,
  Star,
  Flame,
  Target,
  Award,
  TrendingUp,
  Calendar,
  Users,
  Zap,
  Crown,
  Medal,
  Gift,
  ChevronRight,
  Lock,
  CheckCircle
} from 'lucide-react';
import {
  fetchUserTotalPoints,
  fetchUserBadges,
  fetchUserStreaks,
  fetchTodaysChallenges,
  fetchUserDailyChallengeProgress,
  mockUserStats,
  mockRecentPoints,
  mockBadges,
  mockLeaderboard,
  getRarityColor,
  getDifficultyColor,
  type UserTotalPoints,
  type UserBadge,
  type UserStreak,
  type DailyChallenge,
  type UserDailyChallengeProgress
} from '@/integrations/supabase/gamification';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext'; // Import useProgress
import { achievements as allAchievements } from '@/data/achievements'; // Import all achievements
import UnifiedHeader from '@/components/ui/UnifiedHeader';
import Footer from '@/components/Footer';

export default function GamificationDashboard() {
  const { user } = useAuth();
  const { earnedAchievements } = useProgress(); // Use earnedAchievements from context
  const [userStats, setUserStats] = useState<UserTotalPoints | null>(null);
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [streaks, setStreaks] = useState<UserStreak[]>([]);
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);
  const [challengeProgress, setChallengeProgress] = useState<UserDailyChallengeProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadGamificationData();
    }
  }, [user]);

  const loadGamificationData = async () => {
    try {
      // For now, use mock data since Supabase might not be configured yet
      // In production, these would be real API calls
      
      // Mock user stats
      setUserStats({
        user_id: user?.id || '',
        total_points: mockUserStats.totalPoints,
        level: mockUserStats.level,
        points_to_next_level: mockUserStats.pointsToNext,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      // Mock badges (convert mock data to proper format)
      const mockUserBadges: UserBadge[] = mockBadges.map((badge, index) => ({
        id: `badge-${index}`,
        user_id: user?.id || '',
        badge_id: `badge-def-${index}`,
        earned_at: new Date().toISOString(),
        is_featured: index === 0,
        badge: {
          id: `badge-def-${index}`,
          name: badge.name,
          slug: badge.name.toLowerCase().replace(/\s+/g, '-'),
          description: `You earned the ${badge.name} badge!`,
          color: getRarityColor(badge.rarity),
          category: 'progress',
          rarity: badge.rarity as any,
          points_reward: 50,
          requirements: {},
          is_active: true,
          sort_order: index,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      })).filter(badge => mockBadges[parseInt(badge.id.split('-')[1])].earned);

      setBadges(mockUserBadges);

      // Mock achievements are no longer needed here, we use earnedAchievements from context
      // setAchievements(mockUserAchievements);

      // Mock streaks
      const mockStreaks: UserStreak[] = [
        {
          id: 'streak-1',
          user_id: user?.id || '',
          streak_type: 'daily_login',
          current_streak: mockUserStats.currentStreak,
          longest_streak: mockUserStats.longestStreak,
          last_activity_date: new Date().toISOString().split('T')[0],
          streak_data: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];

      setStreaks(mockStreaks);

      // Mock daily challenges
      const mockChallenges: DailyChallenge[] = [
        {
          id: 'challenge-1',
          name: 'Daily Practice',
          description: 'Complete at least one practice session today',
          challenge_date: new Date().toISOString().split('T')[0],
          requirements: { practice_sessions: 1 },
          points_reward: 25,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'challenge-2',
          name: 'Knowledge Boost',
          description: 'Answer 20 questions correctly today',
          challenge_date: new Date().toISOString().split('T')[0],
          requirements: { correct_answers: 20 },
          points_reward: 50,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: 'challenge-3',
          name: 'Community Engagement',
          description: 'Make a helpful post in the forum today',
          challenge_date: new Date().toISOString().split('T')[0],
          requirements: { forum_posts: 1 },
          points_reward: 30,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];

      setDailyChallenges(mockChallenges);

      // Mock challenge progress
      const mockProgress: UserDailyChallengeProgress[] = [
        {
          id: 'progress-1',
          user_id: user?.id || '',
          challenge_id: 'challenge-1',
          progress: { practice_sessions: 1 },
          is_completed: true,
          completed_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          challenge: mockChallenges[0]
        },
        {
          id: 'progress-2',
          user_id: user?.id || '',
          challenge_id: 'challenge-2',
          progress: { correct_answers: 12 },
          is_completed: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          challenge: mockChallenges[1]
        }
      ];

      setChallengeProgress(mockProgress);

    } catch (error) {
      console.error('Error loading gamification data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return <Medal className="h-4 w-4" />;
      case 'rare': return <Star className="h-4 w-4" />;
      case 'epic': return <Crown className="h-4 w-4" />;
      case 'legendary': return <Trophy className="h-4 w-4" />;
      default: return <Medal className="h-4 w-4" />;
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <Target className="h-4 w-4" />;
      case 'medium': return <Zap className="h-4 w-4" />;
      case 'hard': return <Flame className="h-4 w-4" />;
      case 'extreme': return <Crown className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your achievements...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <UnifiedHeader />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Progress & Achievements
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track your learning journey, earn rewards, and compete with fellow nurses
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Points</p>
                  <p className="text-3xl font-bold">{userStats?.total_points.toLocaleString()}</p>
                </div>
                <Trophy className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Level</p>
                  <p className="text-3xl font-bold">{userStats?.level}</p>
                  <p className="text-purple-200 text-xs">{userStats?.points_to_next_level} to next level</p>
                </div>
                <Star className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Current Streak</p>
                  <p className="text-3xl font-bold">{mockUserStats.currentStreak}</p>
                  <p className="text-orange-200 text-xs">days in a row</p>
                </div>
                <Flame className="h-8 w-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Badges Earned</p>
                  <p className="text-3xl font-bold">{badges.length}</p>
                  <p className="text-green-200 text-xs">out of {mockBadges.length} total</p>
                </div>
                <Award className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Level {userStats?.level}</span>
                <span className="text-sm text-gray-500">
                  {userStats?.total_points} / {(userStats?.level || 1) * (userStats?.level || 1) * 100} points
                </span>
              </div>
              <Progress 
                value={((userStats?.total_points || 0) / ((userStats?.level || 1) * (userStats?.level || 1) * 100)) * 100} 
                className="h-3"
              />
              <p className="text-sm text-gray-600">
                {userStats?.points_to_next_level} points needed to reach Level {(userStats?.level || 1) + 1}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="challenges">Daily Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Points */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5" />
                    Recent Points Earned
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockRecentPoints.map((point, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{point.type}</p>
                          <p className="text-xs text-gray-500">{point.time}</p>
                        </div>
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          +{point.points} pts
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Badges */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Featured Badges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {badges.slice(0, 4).map((userBadge) => (
                      <div key={userBadge.id} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div 
                          className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center"
                          style={{ backgroundColor: userBadge.badge?.color }}
                        >
                          {getRarityIcon(userBadge.badge?.rarity || 'common')}
                        </div>
                        <p className="font-medium text-sm">{userBadge.badge?.name}</p>
                        <Badge 
                          variant="outline" 
                          className="text-xs mt-1"
                          style={{ borderColor: userBadge.badge?.color }}
                        >
                          {userBadge.badge?.rarity}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Badge Collection</CardTitle>
                <p className="text-sm text-gray-600">
                  Earn badges by completing various activities and milestones
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockBadges.map((badge, index) => (
                    <div 
                      key={index} 
                      className={`p-6 rounded-lg border-2 ${
                        badge.earned 
                          ? 'border-green-200 bg-green-50' 
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="text-center">
                        <div 
                          className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                            badge.earned ? '' : 'grayscale'
                          }`}
                          style={{ backgroundColor: getRarityColor(badge.rarity) }}
                        >
                          {badge.earned ? (
                            getRarityIcon(badge.rarity)
                          ) : (
                            <Lock className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <h3 className="font-semibold mb-2">{badge.name}</h3>
                        <Badge 
                          variant="outline"
                          style={{ borderColor: getRarityColor(badge.rarity) }}
                        >
                          {badge.rarity}
                        </Badge>
                        {badge.earned && (
                          <div className="mt-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mx-auto" />
                            <p className="text-xs text-green-600 mt-1">Earned!</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <p className="text-sm text-gray-600">
                  Complete achievements to earn points and unlock special rewards
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allAchievements.map((achievement) => {
                    const userEarned = earnedAchievements.find(ea => ea.id === achievement.id);
                    const isCompleted = !!userEarned;
                    return (
                      <div 
                        key={achievement.id} 
                        className={`p-6 border rounded-lg ${isCompleted ? 'border-green-200 bg-green-50' : 'hover:shadow-md transition-shadow'}`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${isCompleted ? '' : 'grayscale'}`}
                              style={{ backgroundColor: isCompleted ? '#3B82F6' : '#E5E7EB' }} // Placeholder color
                            >
                              {isCompleted ? (
                                <Trophy className="h-5 w-5 text-white" /> // Usar ícone da conquista se disponível
                              ) : (
                                <Lock className="h-5 w-5 text-gray-400" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">{achievement.name}</h3>
                              <p className="text-sm text-gray-600">{achievement.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={isCompleted ? "default" : "secondary"}
                              className={isCompleted ? "bg-green-100 text-green-800" : ""}
                            >
                              {isCompleted ? 'Earned' : 'Locked'}
                            </Badge>
                            {isCompleted && (
                              <p className="text-sm text-gray-500 mt-1">
                                Earned on {new Date(userEarned?.earnedAt || '').toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                        {!isCompleted && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>0%</span> {/* Não temos progresso parcial para conquistas ainda */}
                            </div>
                            <Progress value={0} className="h-2" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Daily Challenges Tab */}
          <TabsContent value="challenges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Challenges
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Complete daily challenges to earn bonus points and maintain your streak
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyChallenges.map((challenge) => {
                    const progress = challengeProgress.find(p => p.challenge_id === challenge.id);
                    const isCompleted = progress?.is_completed || false;
                    
                    return (
                      <div 
                        key={challenge.id} 
                        className={`p-6 border rounded-lg ${
                          isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              isCompleted ? 'bg-green-500' : 'bg-blue-500'
                            }`}>
                              {isCompleted ? (
                                <CheckCircle className="h-5 w-5 text-white" />
                              ) : (
                                <Target className="h-5 w-5 text-white" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">{challenge.name}</h3>
                              <p className="text-sm text-gray-600">{challenge.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge 
                              variant={isCompleted ? "default" : "secondary"}
                              className={isCompleted ? "bg-green-100 text-green-800" : ""}
                            >
                              {isCompleted ? 'Completed' : 'Available'}
                            </Badge>
                            <p className="text-sm text-gray-500 mt-1">
                              +{challenge.points_reward} pts
                            </p>
                          </div>
                        </div>
                        {isCompleted && (
                          <div className="mt-4 p-3 bg-green-100 rounded-lg">
                            <p className="text-sm text-green-800 font-medium">
                              🎉 Challenge completed! You earned {challenge.points_reward} points.
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Points Leaderboard
                </CardTitle>
                <p className="text-sm text-gray-600">
                  See how you rank against other OSCE prep students
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLeaderboard.map((entry) => (
                    <div 
                      key={entry.position} 
                      className={`flex items-center justify-between p-4 rounded-lg ${
                        entry.position <= 3 ? 'bg-gradient-to-r from-yellow-50 to-yellow-100' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          entry.position === 1 ? 'bg-yellow-500 text-white' :
                          entry.position === 2 ? 'bg-gray-400 text-white' :
                          entry.position === 3 ? 'bg-orange-500 text-white' :
                          'bg-gray-200 text-gray-700'
                        }`}>
                          {entry.position}
                        </div>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 font-semibold">
                            {entry.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold">{entry.name}</p>
                          <p className="text-sm text-gray-500">
                            {entry.points.toLocaleString()} points
                          </p>
                        </div>
                      </div>
                      {entry.position <= 3 && (
                        <Trophy className={`h-6 w-6 ${
                          entry.position === 1 ? 'text-yellow-500' :
                          entry.position === 2 ? 'text-gray-400' :
                          'text-orange-500'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
                
                {/* User's Position */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                        {mockUserStats.leaderboardPosition}
                      </div>
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {user?.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold">You</p>
                        <p className="text-sm text-gray-500">
                          {userStats?.total_points.toLocaleString()} points
                        </p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-blue-500 text-blue-700">
                      Your Rank
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      </div>
      <Footer />
    </>
  );
}



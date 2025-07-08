import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Flame, 
  Award, 
  TrendingUp,
  ChevronRight,
  Gift,
  Target
} from 'lucide-react';
import { 
  fetchUserTotalPoints,
  mockUserStats,
  mockRecentPoints,
  type UserTotalPoints
} from '@/integrations/supabase/gamification';
import { useAuth } from '@/contexts/AuthContext';

interface GamificationWidgetProps {
  variant?: 'compact' | 'full';
  showRecentPoints?: boolean;
  className?: string;
}

export default function GamificationWidget({ 
  variant = 'compact', 
  showRecentPoints = false,
  className = ''
}: GamificationWidgetProps) {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<UserTotalPoints | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserStats();
    }
  }, [user]);

  const loadUserStats = async () => {
    try {
      // For now, use mock data since Supabase might not be configured yet
      setUserStats({
        user_id: user?.id || '',
        total_points: mockUserStats.totalPoints,
        level: mockUserStats.level,
        points_to_next_level: mockUserStats.pointsToNext,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error loading user stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user || loading) {
    return null;
  }

  if (variant === 'compact') {
    return (
      <Card className={`bg-gradient-to-r from-blue-500 to-purple-600 text-white ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <p className="text-white/90 text-sm">Level {userStats?.level}</p>
                <p className="font-bold text-lg">{userStats?.total_points.toLocaleString()} pts</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild className="text-white hover:bg-white/20">
              <Link to="/dashboard/gamification">
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-xs text-white/80 mb-1">
              <span>Progress to Level {(userStats?.level || 1) + 1}</span>
              <span>{userStats?.points_to_next_level} pts needed</span>
            </div>
            <Progress 
              value={((userStats?.total_points || 0) / ((userStats?.level || 1) * (userStats?.level || 1) * 100)) * 100} 
              className="h-2 bg-white/20"
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Points</p>
                <p className="text-2xl font-bold">{userStats?.total_points.toLocaleString()}</p>
              </div>
              <Trophy className="h-6 w-6 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Level</p>
                <p className="text-2xl font-bold">{userStats?.level}</p>
              </div>
              <Star className="h-6 w-6 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Streak</p>
                <p className="text-2xl font-bold">{mockUserStats.currentStreak}</p>
              </div>
              <Flame className="h-6 w-6 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5" />
            Level Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
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

      {/* Recent Points */}
      {showRecentPoints && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Gift className="h-5 w-5" />
              Recent Points
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockRecentPoints.slice(0, 3).map((point, index) => (
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
      )}

      {/* Quick Actions */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">View Full Dashboard</h3>
              <p className="text-sm text-gray-600">See all your achievements, badges, and leaderboard position</p>
            </div>
            <Button asChild>
              <Link to="/dashboard/gamification">
                <Award className="mr-2 h-4 w-4" />
                View All
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Point Animation Component for celebrating point gains
export function PointsAnimation({ 
  points, 
  show, 
  onComplete 
}: { 
  points: number; 
  show: boolean; 
  onComplete: () => void; 
}) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="animate-bounce bg-green-500 text-white px-6 py-3 rounded-full shadow-lg">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          <span className="font-bold">+{points} Points!</span>
        </div>
      </div>
    </div>
  );
}

// Achievement Unlock Component
export function AchievementUnlock({ 
  achievement, 
  show, 
  onComplete 
}: { 
  achievement: { name: string; description: string; icon?: string }; 
  show: boolean; 
  onComplete: () => void; 
}) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <Card className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-2xl animate-pulse">
        <CardContent className="p-6 text-center">
          <Award className="h-12 w-12 mx-auto mb-3" />
          <h3 className="text-xl font-bold mb-2">Achievement Unlocked!</h3>
          <h4 className="text-lg font-semibold mb-1">{achievement.name}</h4>
          <p className="text-yellow-100">{achievement.description}</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Level Up Component
export function LevelUpNotification({ 
  newLevel, 
  show, 
  onComplete 
}: { 
  newLevel: number; 
  show: boolean; 
  onComplete: () => void; 
}) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onComplete, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
      <Card className="bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-2xl animate-bounce">
        <CardContent className="p-8 text-center">
          <Star className="h-16 w-16 mx-auto mb-4 animate-spin" />
          <h3 className="text-2xl font-bold mb-2">Level Up!</h3>
          <h4 className="text-3xl font-bold mb-2">Level {newLevel}</h4>
          <p className="text-purple-100">Congratulations on reaching a new level!</p>
        </CardContent>
      </Card>
    </div>
  );
}


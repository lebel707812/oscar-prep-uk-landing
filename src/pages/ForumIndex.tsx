import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageCircle, 
  Users, 
  Search, 
  Plus, 
  Pin, 
  Lock, 
  CheckCircle,
  Eye,
  Clock,
  TrendingUp,
  BookOpen,
  Trophy
} from 'lucide-react';
import { 
  fetchForumCategories, 
  fetchForumTopics, 
  searchForumContent,
  type ForumCategory,
  type ForumTopic 
} from '@/integrations/supabase/forum';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/ui/Header';

export default function ForumIndex() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchResults, setSearchResults] = useState<{ topics: ForumTopic[] } | null>(null);

  useEffect(() => {
    loadForumData();
  }, [selectedCategory]);

  const loadForumData = async () => {
    try {
      // Mock data since Supabase might not be configured yet
      const mockCategories: ForumCategory[] = [
        {
          id: '1',
          name: 'General Discussion',
          slug: 'general-discussion',
          description: 'General topics and introductions',
          color: '#3B82F6',
          icon: 'MessageCircle',
          sort_order: 1,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'OSCE Preparation',
          slug: 'osce-preparation',
          description: 'Questions and tips about OSCE exam preparation',
          color: '#10B981',
          icon: 'BookOpen',
          sort_order: 2,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Study Groups',
          slug: 'study-groups',
          description: 'Find and organize study groups',
          color: '#F59E0B',
          icon: 'Users',
          sort_order: 3,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Success Stories',
          slug: 'success-stories',
          description: 'Share your OSCE success stories and experiences',
          color: '#8B5CF6',
          icon: 'Trophy',
          sort_order: 4,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];

      const mockTopics: ForumTopic[] = [
        {
          id: '1',
          title: 'Welcome to the OSCE Prep UK Community Forum!',
          slug: 'welcome-osce-prep-uk-community-forum',
          content: 'Welcome everyone! This is our community space to share experiences, ask questions, and support each other on our OSCE journey.',
          author_id: 'admin',
          category_id: '1',
          is_pinned: true,
          is_locked: false,
          is_solved: false,
          view_count: 1247,
          reply_count: 23,
          last_reply_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          last_reply_by: 'user2',
          tags: ['welcome', 'community', 'introduction'],
          created_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          category: mockCategories[0],
          author: {
            user_id: 'admin',
            display_name: 'OSCE Prep UK Team',
            avatar_url: '',
            post_count: 15,
            reputation_score: 500,
            is_moderator: true,
            is_banned: false,
            last_seen_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        },
        {
          id: '2',
          title: 'Tips for Managing OSCE Anxiety - What Works for You?',
          slug: 'tips-managing-osce-anxiety-what-works',
          content: 'I\'m struggling with anxiety about my upcoming OSCE. What techniques have helped you stay calm and focused during the exam?',
          author_id: 'user1',
          category_id: '2',
          is_pinned: false,
          is_locked: false,
          is_solved: true,
          view_count: 342,
          reply_count: 18,
          last_reply_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          last_reply_by: 'user3',
          tags: ['anxiety', 'tips', 'mental-health'],
          created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          category: mockCategories[1],
          author: {
            user_id: 'user1',
            display_name: 'Sarah M.',
            avatar_url: '',
            post_count: 8,
            reputation_score: 45,
            is_moderator: false,
            is_banned: false,
            last_seen_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        },
        {
          id: '3',
          title: 'Looking for Study Partners - London Area',
          slug: 'looking-study-partners-london-area',
          content: 'Hi everyone! I\'m based in London and looking for study partners to practice OSCE scenarios together. Anyone interested?',
          author_id: 'user2',
          category_id: '3',
          is_pinned: false,
          is_locked: false,
          is_solved: false,
          view_count: 156,
          reply_count: 7,
          last_reply_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          last_reply_by: 'user4',
          tags: ['london', 'study-group', 'practice'],
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          category: mockCategories[2],
          author: {
            user_id: 'user2',
            display_name: 'Ahmed K.',
            avatar_url: '',
            post_count: 12,
            reputation_score: 78,
            is_moderator: false,
            is_banned: false,
            last_seen_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        },
        {
          id: '4',
          title: 'Passed My OSCE! Here\'s What Helped Me Most',
          slug: 'passed-osce-what-helped-me-most',
          content: 'Just wanted to share my success story and the strategies that helped me pass my OSCE on the first attempt!',
          author_id: 'user3',
          category_id: '4',
          is_pinned: false,
          is_locked: false,
          is_solved: false,
          view_count: 892,
          reply_count: 31,
          last_reply_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          last_reply_by: 'user5',
          tags: ['success', 'tips', 'celebration'],
          created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          category: mockCategories[3],
          author: {
            user_id: 'user3',
            display_name: 'Priya S.',
            avatar_url: '',
            post_count: 25,
            reputation_score: 156,
            is_moderator: false,
            is_banned: false,
            last_seen_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        }
      ];

      setCategories(mockCategories);
      
      // Filter topics by category if selected
      let filteredTopics = mockTopics;
      if (selectedCategory !== 'all') {
        filteredTopics = mockTopics.filter(topic => topic.category_id === selectedCategory);
      }
      
      setTopics(filteredTopics);

    } catch (error) {
      console.error('Error loading forum data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      // Mock search results
      const filteredTopics = topics.filter(topic =>
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      setSearchResults({ topics: filteredTopics });
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString('en-GB');
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      MessageCircle,
      BookOpen,
      Users,
      Trophy,
      TrendingUp
    };
    return icons[iconName] || MessageCircle;
  };

  const displayTopics = searchResults ? searchResults.topics : topics;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading forum...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Community Forum
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with fellow nurses, share experiences, ask questions, and support each other on your OSCE journey
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search topics and discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10"
                />
              </div>
              <Button onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/forum/new-topic">
                <Plus className="mr-2 h-4 w-4" />
                New Topic
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/forum/study-groups">
                <Users className="mr-2 h-4 w-4" />
                Study Groups
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory('all')}
                >
                  All Topics
                </Button>
                {categories.map((category) => {
                  const IconComponent = getIconComponent(category.icon || 'MessageCircle');
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <IconComponent className="mr-2 h-4 w-4" />
                      {category.name}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* Forum Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Forum Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Topics</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Posts</span>
                  <span className="font-semibold">8,932</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Members</span>
                  <span className="font-semibold">2,156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Online Now</span>
                  <span className="font-semibold text-green-600">47</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Topics List */}
          <div className="lg:col-span-3">
            {searchResults && (
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    Search Results for "{searchTerm}"
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchResults(null);
                      setSearchTerm('');
                    }}
                  >
                    Clear Search
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {displayTopics.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {searchResults ? 'No topics found' : 'No topics yet'}
                    </h3>
                    <p className="text-gray-500 mb-6">
                      {searchResults 
                        ? 'Try adjusting your search terms.' 
                        : 'Be the first to start a discussion in this category!'
                      }
                    </p>
                    {!searchResults && (
                      <Button asChild>
                        <Link to="/forum/new-topic">
                          <Plus className="mr-2 h-4 w-4" />
                          Create First Topic
                        </Link>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ) : (
                displayTopics.map((topic) => (
                  <Card key={topic.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                              {topic.author?.display_name?.charAt(0) || 'U'}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2">
                            {topic.is_pinned && (
                              <Pin className="h-4 w-4 text-blue-600" />
                            )}
                            {topic.is_locked && (
                              <Lock className="h-4 w-4 text-gray-500" />
                            )}
                            {topic.is_solved && (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            )}
                            {topic.category && (
                              <Badge
                                style={{ backgroundColor: topic.category.color }}
                                className="text-white"
                              >
                                {topic.category.name}
                              </Badge>
                            )}
                            {topic.author?.is_moderator && (
                              <Badge variant="secondary">Moderator</Badge>
                            )}
                          </div>

                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            <Link
                              to={`/forum/topic/${topic.slug}`}
                              className="hover:text-blue-600 transition-colors"
                            >
                              {topic.title}
                            </Link>
                          </h3>

                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {topic.content}
                          </p>

                          {/* Tags */}
                          {topic.tags && topic.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {topic.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Meta Info */}
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center gap-4">
                              <span>by {topic.author?.display_name}</span>
                              <span>{formatTimeAgo(topic.created_at)}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {topic.view_count}
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                {topic.reply_count}
                              </div>
                              {topic.last_reply_at && (
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {formatTimeAgo(topic.last_reply_at)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Load More Button */}
            {displayTopics.length > 0 && !searchResults && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Topics
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}


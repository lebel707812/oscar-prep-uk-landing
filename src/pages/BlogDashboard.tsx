import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  Clock, 
  Search,
  BarChart3,
  FileText,
  Users,
  TrendingUp
} from 'lucide-react';
import { fetchBlogPosts, deleteBlogPost } from '@/integrations/supabase/blog';
import { useAuth } from '@/contexts/AuthContext';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  status: 'draft' | 'published' | 'archived';
  published_at?: string;
  reading_time?: number;
  view_count?: number;
  blog_categories?: { name: string; slug: string; color: string };
}

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
}

export default function BlogDashboard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Mock data since Supabase might not be configured yet
      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: 'What is the OSCE and Why is it Crucial for International Nurses in the NHS?',
          slug: 'what-is-osce-crucial-international-nurses-nhs',
          excerpt: 'Discover everything about the Objective Structured Clinical Examination (OSCE) and its importance for international nurses wanting to work in the NHS.',
          status: 'published',
          published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          reading_time: 8,
          view_count: 245,
          blog_categories: { name: 'OSCE Exam Preparation', slug: 'osce-exam-preparation', color: '#3B82F6' }
        },
        {
          id: '2',
          title: 'The Art of History Taking: How to Collect Clinical History Effectively in the OSCE',
          slug: 'art-history-taking-clinical-history-osce',
          excerpt: 'Learn essential techniques for conducting effective history taking during the OSCE, including empathetic communication and structured information gathering.',
          status: 'published',
          published_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          reading_time: 12,
          view_count: 189,
          blog_categories: { name: 'Communication Skills in OSCE', slug: 'communication-skills-osce', color: '#10B981' }
        },
        {
          id: '3',
          title: 'My Journey from India to the NHS: An OSCE Success Story',
          slug: 'journey-india-nhs-osce-success-story',
          excerpt: 'The inspiring story of Priya, an Indian nurse who overcame challenges and secured her place in the NHS through the OSCE.',
          status: 'published',
          published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          reading_time: 15,
          view_count: 312,
          blog_categories: { name: 'Success Stories and Inspiration', slug: 'success-stories-inspiration', color: '#8B5CF6' }
        },
        {
          id: '4',
          title: 'Demystifying OSCE Stations: What to Expect at Each One',
          slug: 'demystifying-osce-stations-what-to-expect',
          excerpt: 'Detailed guide about the different OSCE stations, including what to expect, how to prepare, and tips for success at each one.',
          status: 'draft',
          reading_time: 18,
          view_count: 0,
          blog_categories: { name: 'OSCE Exam Preparation', slug: 'osce-exam-preparation', color: '#3B82F6' }
        }
      ];

      setPosts(mockPosts);

      // Calculate stats
      const totalPosts = mockPosts.length;
      const publishedPosts = mockPosts.filter(p => p.status === 'published').length;
      const draftPosts = mockPosts.filter(p => p.status === 'draft').length;
      const totalViews = mockPosts.reduce((sum, p) => sum + (p.view_count || 0), 0);

      setStats({
        totalPosts,
        publishedPosts,
        draftPosts,
        totalViews
      });

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteBlogPost(postId);
        setPosts(posts.filter(p => p.id !== postId));
        loadDashboardData(); // Refresh stats
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not published';
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      published: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    };
    return variants[status as keyof typeof variants] || variants.draft;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Blog Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your blog content and track performance</p>
            </div>
            <Button asChild>
              <Link to="/dashboard/blog/new">
                <Plus className="mr-2 h-4 w-4" />
                New Article
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPosts}</div>
              <p className="text-xs text-muted-foreground">
                All articles in your blog
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.publishedPosts}</div>
              <p className="text-xs text-muted-foreground">
                Live articles on your blog
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drafts</CardTitle>
              <Edit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.draftPosts}</div>
              <p className="text-xs text-muted-foreground">
                Articles in progress
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across all articles
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Manage Articles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'published' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('published')}
                >
                  Published
                </Button>
                <Button
                  variant={statusFilter === 'draft' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('draft')}
                >
                  Drafts
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Articles List */}
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-500 mb-6">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first article.'}
                </p>
                <Button asChild>
                  <Link to="/dashboard/blog/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Article
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getStatusBadge(post.status)}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </Badge>
                        {post.blog_categories && (
                          <Badge
                            style={{ backgroundColor: post.blog_categories.color || '#3B82F6' }}
                            className="text-white"
                          >
                            {post.blog_categories.name}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(post.published_at)}
                        </div>
                        {post.reading_time && (
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {post.reading_time} min
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {post.view_count || 0} views
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {post.status === 'published' && (
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/blog/${post.slug}`} target="_blank">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                      )}
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/dashboard/blog/edit/${post.id}`}>
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


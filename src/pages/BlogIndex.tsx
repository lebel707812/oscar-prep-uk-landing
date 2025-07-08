import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Eye, Search, Tag } from 'lucide-react';
import { fetchBlogPosts, fetchBlogCategories } from '@/integrations/supabase/blog';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image_url?: string;
  published_at: string;
  reading_time?: number;
  view_count?: number;
  blog_categories?: { name: string; slug: string; color: string };
}

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
}

export default function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadPosts();
  }, [selectedCategory, currentPage]);

  const loadInitialData = async () => {
    try {
      // Mock data since Supabase might not be configured yet
      const mockCategories: BlogCategory[] = [
        {
          id: '1',
          name: 'OSCE Exam Preparation',
          slug: 'osce-exam-preparation',
          description: 'Articles about effective OSCE exam preparation',
          color: '#3B82F6'
        },
        {
          id: '2',
          name: 'Communication Skills in OSCE',
          slug: 'communication-skills-osce',
          description: 'Tips and techniques for improving communication during OSCE',
          color: '#10B981'
        },
        {
          id: '3',
          name: 'Study Tips and Resources',
          slug: 'study-tips-resources',
          description: 'Study methodologies and useful resources for preparation',
          color: '#F59E0B'
        },
        {
          id: '4',
          name: 'NHS Updates and Culture',
          slug: 'nhs-updates-culture',
          description: 'Information about NHS and British culture for international nurses',
          color: '#EF4444'
        },
        {
          id: '5',
          name: 'Success Stories and Inspiration',
          slug: 'success-stories-inspiration',
          description: 'Inspiring stories from nurses who passed the OSCE',
          color: '#8B5CF6'
        }
      ];

      const mockPosts: BlogPost[] = [
        {
          id: '1',
          title: 'What is the OSCE and Why is it Crucial for International Nurses in the NHS?',
          slug: 'what-is-osce-crucial-international-nurses-nhs',
          excerpt: 'Discover everything about the Objective Structured Clinical Examination (OSCE) and its importance for international nurses wanting to work in the NHS.',
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
          published_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          reading_time: 18,
          view_count: 156,
          blog_categories: { name: 'OSCE Exam Preparation', slug: 'osce-exam-preparation', color: '#3B82F6' }
        }
      ];

      setPosts(mockPosts);
      setCategories(mockCategories);
      setHasMore(false); // No more posts to load in mock data

    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadPosts = async () => {
    if (currentPage === 1) return; // Already loaded in loadInitialData

    try {
      const result = await fetchBlogPosts(currentPage, 6, selectedCategory || undefined);
      if (result.data) {
        setPosts(prev => [...prev, ...result.data]);
        setHasMore(result.data.length === 6);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const handleCategoryFilter = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1);
    
    if (categorySlug) {
      const filteredPosts = posts.filter(post => 
        post.blog_categories?.slug === categorySlug
      );
      setPosts(filteredPosts);
    } else {
      loadInitialData();
    }
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              OSCE Prep UK Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Educational articles, preparation tips, and success stories for international nurses
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Search */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search Articles
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    placeholder="Type your search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button
                      variant={selectedCategory === null ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => handleCategoryFilter(null)}
                    >
                      All Articles
                    </Button>
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.slug ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => handleCategoryFilter(category.slug)}
                      >
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: category.color || '#3B82F6' }}
                        />
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    {searchTerm ? 'No articles found for your search.' : 'No articles available.'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden">
                      {post.featured_image_url ? (
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600">
                          <span className="text-white text-lg font-semibold">OSCE Prep UK</span>
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        {post.blog_categories && (
                          <Badge
                            style={{ backgroundColor: post.blog_categories.color || '#3B82F6' }}
                            className="text-white"
                          >
                            {post.blog_categories.name}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="line-clamp-2">
                        <Link
                          to={`/blog/${post.slug}`}
                          className="hover:text-blue-600 transition-colors"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
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
                        </div>
                        {post.view_count && (
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {post.view_count}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {hasMore && filteredPosts.length > 0 && (
              <div className="text-center mt-8">
                <Button
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  variant="outline"
                  size="lg"
                >
                  Load More Articles
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


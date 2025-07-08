import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Eye, ArrowLeft } from 'lucide-react';
import { fetchBlogPostsByCategory, fetchBlogCategory } from '@/integrations/supabase/blog';

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

export default function BlogCategory() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (categorySlug) {
      loadCategoryData();
    }
  }, [categorySlug]);

  const loadCategoryData = async () => {
    try {
      // Mock data since Supabase might not be configured yet
      const mockCategories: { [key: string]: BlogCategory } = {
        'osce-exam-preparation': {
          id: '1',
          name: 'OSCE Exam Preparation',
          slug: 'osce-exam-preparation',
          description: 'Comprehensive guides and tips for preparing for the OSCE examination',
          color: '#3B82F6'
        },
        'communication-skills-osce': {
          id: '2',
          name: 'Communication Skills in OSCE',
          slug: 'communication-skills-osce',
          description: 'Master communication techniques essential for OSCE success',
          color: '#10B981'
        },
        'study-tips-resources': {
          id: '3',
          name: 'Study Tips and Resources',
          slug: 'study-tips-resources',
          description: 'Effective study methodologies and useful resources for OSCE preparation',
          color: '#F59E0B'
        },
        'nhs-updates-culture': {
          id: '4',
          name: 'NHS Updates and Culture',
          slug: 'nhs-updates-culture',
          description: 'Understanding NHS culture and staying updated with healthcare changes',
          color: '#EF4444'
        },
        'success-stories-inspiration': {
          id: '5',
          name: 'Success Stories and Inspiration',
          slug: 'success-stories-inspiration',
          description: 'Inspiring stories from nurses who successfully passed the OSCE',
          color: '#8B5CF6'
        }
      };

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

      const categoryData = mockCategories[categorySlug!];
      if (categoryData) {
        setCategory(categoryData);
        
        // Filter posts by category
        const categoryPosts = mockPosts.filter(post => 
          post.blog_categories?.slug === categorySlug
        );
        setPosts(categoryPosts);
        setHasMore(false);
      }

    } catch (error) {
      console.error('Error loading category data:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <p className="mt-4 text-gray-600">Loading category...</p>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h2>
            <p className="text-gray-600 mb-6">The category you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button variant="outline" asChild className="mb-6">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: category.color || '#3B82F6' }}
              />
              <Badge
                style={{ backgroundColor: category.color || '#3B82F6' }}
                className="text-white text-lg px-4 py-2"
              >
                {category.name}
              </Badge>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No articles found in this category yet.
              </p>
              <p className="text-gray-400 mt-2">
                Check back soon for new content!
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
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

            {/* Load More Button */}
            {hasMore && (
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
          </>
        )}

        {/* Call to Action */}
        <div className="mt-12 p-6 bg-white rounded-lg shadow-sm border">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">
              Ready to Start Your OSCE Journey?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of international nurses who have successfully passed their OSCE with our comprehensive preparation platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/">
                  Start Free Trial
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/blog">
                  Explore More Articles
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


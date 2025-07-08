import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  MessageCircle, 
  Heart, 
  Share2, 
  Flag, 
  Pin, 
  Lock, 
  CheckCircle,
  Eye,
  Clock,
  Reply,
  MoreVertical,
  Edit,
  Trash2
} from 'lucide-react';
import { 
  fetchForumTopic, 
  fetchForumPosts, 
  createForumPost,
  likePost,
  unlikePost,
  checkPostLiked,
  incrementTopicViews,
  type ForumTopic,
  type ForumPost 
} from '@/integrations/supabase/forum';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/ui/Header';

export default function ForumTopic() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const [topic, setTopic] = useState<ForumTopic | null>(null);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (slug) {
      loadTopicData();
    }
  }, [slug]);

  const loadTopicData = async () => {
    try {
      // Mock data since Supabase might not be configured yet
      const mockTopic: ForumTopic = {
        id: '2',
        title: 'Tips for Managing OSCE Anxiety - What Works for You?',
        slug: 'tips-managing-osce-anxiety-what-works',
        content: `I'm struggling with anxiety about my upcoming OSCE exam. The closer it gets, the more nervous I become. I've heard that anxiety can really impact performance, and I want to make sure I'm as prepared as possible - not just academically, but mentally too.

I've been studying hard and feel confident about the clinical knowledge, but I'm worried about freezing up during the actual exam or making silly mistakes because of nerves.

What techniques have helped you stay calm and focused during the OSCE? I'd love to hear about:
- Breathing exercises or relaxation techniques
- Mental preparation strategies
- What to do on the day of the exam
- How to handle unexpected scenarios
- Any other tips that worked for you

Thanks in advance for sharing your experiences!`,
        author_id: 'user1',
        category_id: '2',
        is_pinned: false,
        is_locked: false,
        is_solved: true,
        view_count: 342,
        reply_count: 18,
        last_reply_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        last_reply_by: 'user3',
        tags: ['anxiety', 'tips', 'mental-health', 'preparation'],
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        category: {
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
        author: {
          user_id: 'user1',
          display_name: 'Sarah M.',
          bio: 'International nurse preparing for OSCE',
          avatar_url: '',
          location: 'Manchester, UK',
          specialization: 'Adult Nursing',
          experience_level: 'Student',
          post_count: 8,
          reputation_score: 45,
          is_moderator: false,
          is_banned: false,
          last_seen_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };

      const mockPosts: ForumPost[] = [
        {
          id: '1',
          topic_id: '2',
          author_id: 'user3',
          content: `Great question, Sarah! I completely understand your anxiety - I felt exactly the same way before my OSCE.

Here are the techniques that helped me the most:

**Breathing Exercises:**
- Practice the 4-7-8 technique: Breathe in for 4, hold for 7, exhale for 8
- Do this between stations to reset your mind
- I practiced this daily for weeks before the exam

**Mental Preparation:**
- Visualisation exercises - imagine yourself succeeding in each station
- Practice positive self-talk: "I am prepared, I am capable"
- Remember that some nervousness is normal and can actually help you perform better

**On the Day:**
- Arrive early but not too early (you don't want to overthink)
- Bring a small snack and water
- Listen to calming music on the way there
- Remember that the examiners want you to succeed!

The most important thing is to trust your preparation. You've put in the work, and your knowledge will come through even if you're nervous.

Good luck! 🍀`,
          parent_post_id: null,
          is_solution: true,
          like_count: 15,
          created_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          author: {
            user_id: 'user3',
            display_name: 'Priya S.',
            bio: 'Recently qualified nurse, OSCE success story',
            avatar_url: '',
            location: 'London, UK',
            specialization: 'Mental Health Nursing',
            experience_level: 'Newly Qualified',
            post_count: 25,
            reputation_score: 156,
            is_moderator: false,
            is_banned: false,
            last_seen_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        },
        {
          id: '2',
          topic_id: '2',
          author_id: 'user4',
          content: `I'd like to add to Priya's excellent advice! 

One thing that really helped me was creating a "confidence anchor" - a small physical gesture or phrase that I associated with feeling calm and confident. I practiced this during my study sessions, and then used it during the exam whenever I felt my anxiety rising.

Also, remember that it's okay to take a moment to collect your thoughts at each station. The examiners understand that this is a stressful situation.

Mock OSCEs were invaluable for me - the more you practice in exam-like conditions, the more comfortable you'll feel on the day.`,
          parent_post_id: null,
          is_solution: false,
          like_count: 8,
          created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          author: {
            user_id: 'user4',
            display_name: 'James R.',
            bio: 'Experienced nurse, OSCE mentor',
            avatar_url: '',
            location: 'Birmingham, UK',
            specialization: 'Adult Nursing',
            experience_level: 'Experienced',
            post_count: 42,
            reputation_score: 234,
            is_moderator: false,
            is_banned: false,
            last_seen_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        },
        {
          id: '3',
          topic_id: '2',
          author_id: 'user1',
          content: `Thank you both so much for these amazing tips! @Priya S. and @James R. - this is exactly what I needed to hear.

I'm definitely going to start practicing the 4-7-8 breathing technique daily, and I love the idea of a "confidence anchor". I think I'll use a small gesture like touching my watch - something subtle that I can do during the exam.

I have a mock OSCE scheduled for next week, so I'll try implementing these strategies then. It's so reassuring to know that others have felt the same way and still succeeded.

Really appreciate this community! 💙`,
          parent_post_id: null,
          is_solution: false,
          like_count: 5,
          created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          author: {
            user_id: 'user1',
            display_name: 'Sarah M.',
            bio: 'International nurse preparing for OSCE',
            avatar_url: '',
            location: 'Manchester, UK',
            specialization: 'Adult Nursing',
            experience_level: 'Student',
            post_count: 8,
            reputation_score: 45,
            is_moderator: false,
            is_banned: false,
            last_seen_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        }
      ];

      setTopic(mockTopic);
      setPosts(mockPosts);

      // Simulate incrementing view count
      mockTopic.view_count += 1;

    } catch (error) {
      console.error('Error loading topic:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReply = async () => {
    if (!replyContent.trim() || !user) return;

    setSubmitting(true);
    try {
      // Mock creating a new post
      const newPost: ForumPost = {
        id: Date.now().toString(),
        topic_id: topic!.id,
        author_id: user.id,
        content: replyContent,
        parent_post_id: null,
        is_solution: false,
        like_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        author: {
          user_id: user.id,
          display_name: user.email?.split('@')[0] || 'User',
          bio: '',
          avatar_url: '',
          post_count: 1,
          reputation_score: 10,
          is_moderator: false,
          is_banned: false,
          last_seen_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      };

      setPosts([...posts, newPost]);
      setReplyContent('');
      
      // Update topic reply count
      if (topic) {
        setTopic({
          ...topic,
          reply_count: topic.reply_count + 1,
          last_reply_at: new Date().toISOString(),
          last_reply_by: user.id
        });
      }

    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleLikePost = async (postId: string) => {
    if (!user) return;

    try {
      const isLiked = likedPosts.has(postId);
      
      if (isLiked) {
        // Unlike
        setLikedPosts(prev => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
        
        setPosts(posts.map(post => 
          post.id === postId 
            ? { ...post, like_count: post.like_count - 1 }
            : post
        ));
      } else {
        // Like
        setLikedPosts(prev => new Set(prev).add(postId));
        
        setPosts(posts.map(post => 
          post.id === postId 
            ? { ...post, like_count: post.like_count + 1 }
            : post
        ));
      }

    } catch (error) {
      console.error('Error liking post:', error);
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading topic...</p>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Topic Not Found</h2>
            <p className="text-gray-600 mb-6">The topic you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/forum">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Forum
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="outline" asChild className="mb-4">
            <Link to="/forum">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Forum
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Topic Header */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {/* Author Avatar */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {topic.author?.display_name?.charAt(0) || 'U'}
                  </span>
                </div>
              </div>

              <div className="flex-1">
                {/* Badges and Status */}
                <div className="flex items-center gap-2 mb-3">
                  {topic.is_pinned && (
                    <Badge variant="secondary">
                      <Pin className="mr-1 h-3 w-3" />
                      Pinned
                    </Badge>
                  )}
                  {topic.is_locked && (
                    <Badge variant="secondary">
                      <Lock className="mr-1 h-3 w-3" />
                      Locked
                    </Badge>
                  )}
                  {topic.is_solved && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Solved
                    </Badge>
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

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  {topic.title}
                </h1>

                {/* Author Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span>by <strong>{topic.author?.display_name}</strong></span>
                  <span>{formatTimeAgo(topic.created_at)}</span>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {topic.view_count} views
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {topic.reply_count} replies
                  </div>
                </div>

                {/* Content */}
                <div className="prose max-w-none mb-4">
                  <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {topic.content}
                  </div>
                </div>

                {/* Tags */}
                {topic.tags && topic.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {topic.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Flag className="mr-2 h-4 w-4" />
                    Report
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts/Replies */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Replies ({posts.length})
          </h2>

          {posts.map((post, index) => (
            <Card key={post.id} className={post.is_solution ? 'ring-2 ring-green-200' : ''}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Author Avatar */}
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">
                        {post.author?.display_name?.charAt(0) || 'U'}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    {/* Author Info */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">
                          {post.author?.display_name}
                        </span>
                        {post.author?.is_moderator && (
                          <Badge variant="secondary" className="text-xs">Moderator</Badge>
                        )}
                        {post.is_solution && (
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Solution
                          </Badge>
                        )}
                        <span className="text-sm text-gray-500">
                          {formatTimeAgo(post.created_at)}
                        </span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Content */}
                    <div className="prose max-w-none mb-4">
                      <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                        {post.content}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikePost(post.id)}
                        className={likedPosts.has(post.id) ? 'text-red-600' : ''}
                      >
                        <Heart className={`mr-1 h-4 w-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                        {post.like_count}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Reply className="mr-1 h-4 w-4" />
                        Reply
                      </Button>
                      {user && post.author_id === user.id && (
                        <>
                          <Button variant="ghost" size="sm">
                            <Edit className="mr-1 h-4 w-4" />
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600">
                            <Trash2 className="mr-1 h-4 w-4" />
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reply Form */}
        {user && !topic.is_locked ? (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Post a Reply</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={6}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setReplyContent('')}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmitReply}
                    disabled={!replyContent.trim() || submitting}
                  >
                    {submitting ? 'Posting...' : 'Post Reply'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : !user ? (
          <Card className="mt-8">
            <CardContent className="text-center py-8">
              <p className="text-gray-600 mb-4">
                Please log in to participate in the discussion.
              </p>
              <Button asChild>
                <Link to="/login">
                  Log In
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="mt-8">
            <CardContent className="text-center py-8">
              <Lock className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-gray-600">
                This topic is locked and no longer accepting replies.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
      </div>
    </>
  );
}


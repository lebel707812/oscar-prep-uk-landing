import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Eye, Plus, X } from 'lucide-react';
import { 
  fetchForumCategories,
  createForumTopic,
  type ForumCategory 
} from '@/integrations/supabase/forum';
import { useAuth } from '@/contexts/AuthContext';

export default function ForumNewTopic() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    category_id: '',
    tags: [] as string[]
  });
  
  const [categories, setCategories] = useState<ForumCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadCategories();
  }, [user, navigate]);

  const loadCategories = async () => {
    try {
      // Mock categories since Supabase might not be configured yet
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
          name: 'Clinical Skills',
          slug: 'clinical-skills',
          description: 'Discuss clinical procedures and techniques',
          color: '#EF4444',
          icon: 'Stethoscope',
          sort_order: 4,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '5',
          name: 'Communication Skills',
          slug: 'communication-skills',
          description: 'Practice and improve patient communication',
          color: '#8B5CF6',
          icon: 'MessageSquare',
          sort_order: 5,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '6',
          name: 'Success Stories',
          slug: 'success-stories',
          description: 'Share your OSCE success stories and experiences',
          color: '#06B6D4',
          icon: 'Trophy',
          sort_order: 6,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '7',
          name: 'Technical Support',
          slug: 'technical-support',
          description: 'Get help with the platform and technical issues',
          color: '#6B7280',
          icon: 'HelpCircle',
          sort_order: 7,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];

      setCategories(mockCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim()) && formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.content.trim() || !formData.category_id) {
      alert('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      // Mock creating topic
      const newTopicSlug = formData.slug || generateSlug(formData.title);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to the new topic
      navigate(`/forum/topic/${newTopicSlug}`);
      
    } catch (error) {
      console.error('Error creating topic:', error);
      alert('Error creating topic. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePreview = () => {
    // Open preview in new tab (would need to implement preview functionality)
    console.log('Preview functionality would be implemented here');
  };

  if (!user) {
    return null; // Will redirect to login
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link to="/forum">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Forum
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Topic</h1>
                <p className="text-gray-600 text-sm">Start a new discussion in the community</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={handlePreview}
                disabled={!formData.title || !formData.content}
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitting || !formData.title || !formData.content || !formData.category_id}
              >
                {submitting ? 'Creating...' : 'Create Topic'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Topic Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter a descriptive title for your topic..."
                    className="mt-1"
                    maxLength={200}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.title.length}/200 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="topic-url-slug"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    URL: /forum/topic/{formData.slug}
                  </p>
                </div>

                <div>
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your topic content here. Be clear and descriptive to help others understand your question or discussion point..."
                    rows={15}
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.content.length} characters
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Posting Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Be respectful and professional in your communication</p>
                  <p>• Use clear, descriptive titles that help others understand your topic</p>
                  <p>• Search existing topics before creating a new one</p>
                  <p>• Choose the most appropriate category for your topic</p>
                  <p>• Use relevant tags to help others find your discussion</p>
                  <p>• Provide context and details to help others assist you</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Category Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Category *</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, category_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <div>
                            <div className="font-medium">{category.name}</div>
                            <div className="text-xs text-gray-500">{category.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <p className="text-sm text-gray-600">Add up to 5 relevant tags</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                      disabled={formData.tags.length >= 5}
                    />
                    <Button 
                      onClick={handleAddTag} 
                      variant="outline"
                      disabled={!tagInput.trim() || formData.tags.length >= 5}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="cursor-pointer hover:bg-gray-200"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          {tag}
                          <X className="ml-1 h-3 w-3" />
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500">
                    {formData.tags.length}/5 tags used
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['osce', 'preparation', 'anxiety', 'study-tips', 'communication', 'clinical-skills', 'nhs', 'success-story'].map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-blue-50"
                      onClick={() => {
                        if (!formData.tags.includes(tag) && formData.tags.length < 5) {
                          setFormData(prev => ({
                            ...prev,
                            tags: [...prev.tags, tag]
                          }));
                        }
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <strong>Formatting:</strong> Use line breaks to separate paragraphs. 
                    You can use @username to mention other users.
                  </p>
                  <p>
                    <strong>Questions:</strong> Be specific about what you need help with. 
                    Include relevant details about your situation.
                  </p>
                  <p>
                    <strong>Discussions:</strong> Share your experiences and insights to 
                    help others in the community.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}


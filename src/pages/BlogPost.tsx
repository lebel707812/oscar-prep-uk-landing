import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Eye, ArrowLeft, Share2, User } from 'lucide-react';
import UnifiedHeader from '@/components/ui/UnifiedHeader';
import Footer from '@/components/Footer';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image_url?: string;
  published_at: string;
  reading_time?: number;
  view_count?: number;
  meta_title?: string;
  meta_description?: string;
  tags?: string[];
  author?: string;
  blog_categories?: { name: string; slug: string; color: string };
}

export default function BlogPost() {
  const { id, slug } = useParams<{ id?: string; slug?: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (id || slug) {
      loadPost();
    }
  }, [id, slug]);

  const loadPost = async () => {
    try {
      // Mock data com sistema de ID padronizado
      const mockPosts: { [key: string]: BlogPost } = {
        '1000151583': {
          id: '1000151583',
          title: 'What is the OSCE and Why is it Crucial for International Nurses in the NHS?',
          slug: 'what-is-osce-crucial-international-nurses-nhs',
          excerpt: 'Discover everything about the Objective Structured Clinical Examination (OSCE) and its importance for international nurses wanting to work in the NHS.',
          content: `
<div class="prose prose-lg max-w-none">
  <h1 class="heading-1 text-foreground mb-8">What is the OSCE and Why is it Crucial for International Nurses in the NHS?</h1>
  
  <p class="body-large text-muted-foreground mb-8 leading-relaxed">
    The <strong>Objective Structured Clinical Examination (OSCE)</strong> is a practical assessment method used to evaluate clinical skills, knowledge, and competencies of healthcare professionals. For international nurses seeking to work in the NHS, the OSCE represents a crucial step in the registration process.
  </p>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Understanding the OSCE Format</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    The OSCE consists of multiple stations, each designed to assess specific clinical skills:
  </p>

  <div class="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-primary mb-6">Station Types</h3>
    <ul class="space-y-4">
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">History Taking:</strong> 
          <span class="body-text text-muted-foreground ml-2">Gathering patient information through structured interviews</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Physical Examination:</strong> 
          <span class="body-text text-muted-foreground ml-2">Demonstrating proper examination techniques</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Communication:</strong> 
          <span class="body-text text-muted-foreground ml-2">Interacting effectively with patients and colleagues</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Clinical Procedures:</strong> 
          <span class="body-text text-muted-foreground ml-2">Performing specific nursing interventions</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Emergency Scenarios:</strong> 
          <span class="body-text text-muted-foreground ml-2">Responding to urgent clinical situations</span>
        </div>
      </li>
    </ul>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Why the OSCE Matters for International Nurses</h2>

  <div class="grid md:grid-cols-3 gap-6 mb-8">
    <div class="bg-secondary/10 border border-secondary/30 rounded-xl p-6">
      <h3 class="heading-4 text-secondary mb-4">Professional Registration Requirement</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        The Nursing and Midwifery Council (NMC) requires international nurses to pass the OSCE as part of the registration process.
      </p>
    </div>
    <div class="bg-accent/10 border border-accent/30 rounded-xl p-6">
      <h3 class="heading-4 text-accent mb-4">Skills Validation</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        The OSCE validates that your clinical skills meet UK standards, ensuring patient safety and quality care.
      </p>
    </div>
    <div class="bg-success/10 border border-success/30 rounded-xl p-6">
      <h3 class="heading-4 text-success mb-4">Cultural Adaptation</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        The examination helps international nurses understand UK healthcare practices and professional expectations.
      </p>
    </div>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Preparing for Success</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    Effective preparation is key to OSCE success. Here are proven strategies that have helped thousands of international nurses:
  </p>

  <div class="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-primary mb-6">Study Strategies</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <h4 class="heading-4 text-foreground mb-3">Knowledge Building</h4>
        <ul class="space-y-2">
          <li class="body-text text-muted-foreground">• Familiarise yourself with UK protocols</li>
          <li class="body-text text-muted-foreground">• Practice communication skills</li>
          <li class="body-text text-muted-foreground">• Master clinical procedures</li>
        </ul>
      </div>
      <div>
        <h4 class="heading-4 text-foreground mb-3">Practical Preparation</h4>
        <ul class="space-y-2">
          <li class="body-text text-muted-foreground">• Mock examinations</li>
          <li class="body-text text-muted-foreground">• Peer practice sessions</li>
          <li class="body-text text-muted-foreground">• Professional feedback</li>
        </ul>
      </div>
    </div>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">The Path Forward</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    Successfully passing the OSCE opens doors to a rewarding career in the NHS. The examination not only validates your clinical competence but also prepares you for the realities of nursing practice in the UK healthcare system.
  </p>

  <div class="bg-gradient-to-r from-success/10 to-accent/10 border border-success/30 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-success mb-4">Remember</h3>
    <p class="body-text text-muted-foreground leading-relaxed">
      The OSCE is not just an assessment—it's an opportunity to demonstrate your commitment to providing excellent patient care within the NHS framework. Your international experience, combined with UK-specific training, will make you a valuable addition to the NHS nursing workforce.
    </p>
  </div>
</div>
          `,
          published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          reading_time: 8,
          view_count: 245,
          author: 'Dr. Sarah Johnson, RN',
          meta_title: 'OSCE Guide for International Nurses | NHS Registration',
          meta_description: 'Complete guide to the OSCE examination for international nurses seeking NHS registration. Learn about format, preparation, and success strategies.',
          tags: ['OSCE', 'NHS', 'International Nurses', 'Registration', 'Exam Preparation'],
          blog_categories: { name: 'OSCE Exam Preparation', slug: 'osce-exam-preparation', color: '#005A9C' }
        },
        '1000151584': {
          id: '1000151584',
          title: 'The Art of History Taking: How to Collect Clinical History Effectively in the OSCE',
          slug: 'art-history-taking-clinical-history-osce',
          excerpt: 'Learn essential techniques for conducting effective history taking during the OSCE, including empathetic communication and structured information gathering.',
          content: `
<div class="prose prose-lg max-w-none">
  <h1 class="heading-1 text-foreground mb-8">The Art of History Taking: How to Collect Clinical History Effectively in the OSCE</h1>
  
  <p class="body-large text-muted-foreground mb-8 leading-relaxed">
    History taking is one of the most fundamental skills assessed in the OSCE examination. It requires a delicate balance of clinical knowledge, communication skills, and empathetic patient interaction. This comprehensive guide will help you master this essential competency.
  </p>

  <h2 class="heading-2 text-foreground mt-12 mb-6">The Foundation of Effective History Taking</h2>
  
  <div class="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-primary mb-6">Building Rapport</h3>
    <div class="grid md:grid-cols-2 gap-6">
      <div class="space-y-4">
        <div class="flex items-start">
          <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
          <div>
            <strong class="text-foreground">Introduce yourself professionally:</strong> 
            <span class="body-text text-muted-foreground ml-2">State your name, role, and purpose</span>
          </div>
        </div>
        <div class="flex items-start">
          <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
          <div>
            <strong class="text-foreground">Ensure patient comfort:</strong> 
            <span class="body-text text-muted-foreground ml-2">Check seating, privacy, and immediate needs</span>
          </div>
        </div>
      </div>
      <div class="space-y-4">
        <div class="flex items-start">
          <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
          <div>
            <strong class="text-foreground">Establish trust:</strong> 
            <span class="body-text text-muted-foreground ml-2">Use open body language and appropriate eye contact</span>
          </div>
        </div>
        <div class="flex items-start">
          <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
          <div>
            <strong class="text-foreground">Show empathy:</strong> 
            <span class="body-text text-muted-foreground ml-2">Acknowledge concerns and feelings</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">The SOCRATES Framework</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    For symptom analysis, use the SOCRATES mnemonic - a structured approach that ensures comprehensive assessment:
  </p>

  <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <div class="bg-secondary/10 border border-secondary/30 rounded-xl p-4 text-center">
      <div class="w-12 h-12 bg-secondary rounded-full flex items-center justify-center mx-auto mb-3">
        <span class="text-white font-bold">S</span>
      </div>
      <h4 class="heading-4 text-secondary mb-2">Site</h4>
      <p class="body-small text-muted-foreground">Where is the problem located?</p>
    </div>
    <div class="bg-accent/10 border border-accent/30 rounded-xl p-4 text-center">
      <div class="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
        <span class="text-white font-bold">O</span>
      </div>
      <h4 class="heading-4 text-accent mb-2">Onset</h4>
      <p class="body-small text-muted-foreground">When did it start? How did it begin?</p>
    </div>
    <div class="bg-success/10 border border-success/30 rounded-xl p-4 text-center">
      <div class="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-3">
        <span class="text-white font-bold">C</span>
      </div>
      <h4 class="heading-4 text-success mb-2">Character</h4>
      <p class="body-small text-muted-foreground">What does it feel like?</p>
    </div>
    <div class="bg-primary/10 border border-primary/30 rounded-xl p-4 text-center">
      <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
        <span class="text-white font-bold">R</span>
      </div>
      <h4 class="heading-4 text-primary mb-2">Radiation</h4>
      <p class="body-small text-muted-foreground">Does it spread anywhere?</p>
    </div>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Communication Techniques for Success</h2>
  
  <div class="bg-gradient-to-r from-secondary/5 to-accent/5 border border-secondary/20 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-secondary mb-6">Active Listening Skills</h3>
    <div class="space-y-4">
      <div class="flex items-start">
        <div class="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
          <span class="text-secondary font-semibold text-sm">1</span>
        </div>
        <div>
          <strong class="text-foreground">Paraphrasing:</strong> 
          <span class="body-text text-muted-foreground ml-2">"So what I understand is..."</span>
        </div>
      </div>
      <div class="flex items-start">
        <div class="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
          <span class="text-secondary font-semibold text-sm">2</span>
        </div>
        <div>
          <strong class="text-foreground">Clarification:</strong> 
          <span class="body-text text-muted-foreground ml-2">"Can you help me understand what you mean by...?"</span>
        </div>
      </div>
      <div class="flex items-start">
        <div class="w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
          <span class="text-secondary font-semibold text-sm">3</span>
        </div>
        <div>
          <strong class="text-foreground">Reflection:</strong> 
          <span class="body-text text-muted-foreground ml-2">"It sounds like this has been very worrying for you"</span>
        </div>
      </div>
    </div>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Building Confidence</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    Mastering the art of history taking requires practice, patience, and genuine care for patients. Remember that behind every clinical presentation is a person with concerns, fears, and hopes.
  </p>

  <div class="bg-gradient-to-r from-success/10 to-primary/10 border border-success/30 rounded-xl p-8">
    <h3 class="heading-3 text-success mb-4">Key Takeaway</h3>
    <p class="body-text text-muted-foreground leading-relaxed">
      The skills you develop for the OSCE will serve you throughout your nursing career in the NHS. Effective history taking forms the foundation of excellent patient care and will make you a valued member of any healthcare team.
    </p>
  </div>
</div>
          `,
          published_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          reading_time: 12,
          view_count: 189,
          author: 'Prof. Maria Santos, RN, PhD',
          meta_title: 'OSCE History Taking Guide | Clinical Skills for Nurses',
          meta_description: 'Master history taking for the OSCE with our comprehensive guide. Learn communication techniques, structured approaches, and common scenarios.',
          tags: ['History Taking', 'OSCE', 'Communication Skills', 'Clinical Assessment', 'Patient Care'],
          blog_categories: { name: 'Communication Skills in OSCE', slug: 'communication-skills-osce', color: '#00BFA6' }
        }
      };

      // Buscar por ID primeiro, depois por slug para compatibilidade
      const postKey = id || slug;
      const mockPost = mockPosts[postKey!];
      
      if (mockPost) {
        setPost(mockPost);
        // Simular incremento de visualizações
        mockPost.view_count = (mockPost.view_count || 0) + 1;
      }

    } catch (error) {
      console.error('Error loading post:', error);
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

  const handleShare = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-6 body-text text-muted-foreground">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <Card className="max-w-md mx-auto shadow-strong">
          <CardContent className="text-center py-12">
            <h2 className="heading-2 text-foreground mb-4">Article Not Found</h2>
            <p className="body-text text-muted-foreground mb-6">The article you're looking for doesn't exist.</p>
            <Button asChild className="bg-primary hover:bg-primary-dark">
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
    <>
      <UnifiedHeader />
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        {/* Header com breadcrumb */}
        <div className="bg-white/95 backdrop-blur-sm shadow-soft border-b border-border/50">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <Button variant="outline" asChild className="mb-4 hover:bg-primary hover:text-white transition-colors">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Conteúdo principal */}
            <article className="lg:col-span-3">
              {/* Featured Image */}
              {post.featured_image_url && (
                <div className="aspect-video bg-muted rounded-2xl overflow-hidden mb-8 shadow-medium">
                  <img
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Article Header */}
              <header className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  {post.blog_categories && (
                    <Badge
                      style={{ backgroundColor: post.blog_categories.color || '#005A9C' }}
                      className="text-white px-4 py-2 rounded-full"
                    >
                      {post.blog_categories.name}
                    </Badge>
                  )}
                </div>

                <h1 className="heading-1 text-foreground mb-6 leading-tight">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="body-small">{formatDate(post.published_at)}</span>
                  </div>
                  {post.reading_time && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="body-small">{post.reading_time} min read</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span className="body-small">{post.view_count} views</span>
                  </div>
                  {post.author && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="body-small">{post.author}</span>
                    </div>
                  )}
                </div>

                <p className="body-large text-muted-foreground leading-relaxed mb-8">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" onClick={handleShare} className="hover:bg-primary hover:text-white transition-colors">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Article
                    </Button>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-soft border border-border/50 mb-12">
                <div 
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-soft border border-border/50 mb-12">
                  <h3 className="heading-3 text-foreground mb-6">Related Topics</h3>
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="px-4 py-2 rounded-full hover:bg-primary hover:text-white transition-colors cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-primary via-primary-light to-secondary p-8 rounded-2xl text-white shadow-strong">
                <h3 className="heading-2 mb-4 text-white">Ready to Start Your OSCE Preparation?</h3>
                <p className="body-large text-white/95 mb-6 leading-relaxed">
                  Join thousands of international nurses who have successfully passed their OSCE with our comprehensive preparation platform.
                </p>
                <Button asChild className="bg-white text-primary hover:bg-muted hover:text-primary-dark font-semibold px-8 py-3 rounded-xl transition-all duration-300">
                  <Link to="/">
                    Start Your Free Trial
                  </Link>
                </Button>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Article Info */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-border/50">
                  <h3 className="heading-4 text-foreground mb-4">Article Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Article ID:</span>
                      <span className="font-mono text-primary">{post.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reading Time:</span>
                      <span className="text-foreground">{post.reading_time} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Views:</span>
                      <span className="text-foreground">{post.view_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Published:</span>
                      <span className="text-foreground">{formatDate(post.published_at)}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Navigation */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-soft border border-border/50">
                  <h3 className="heading-4 text-foreground mb-4">Quick Navigation</h3>
                  <div className="space-y-2">
                    <Button variant="ghost" asChild className="w-full justify-start hover:bg-primary hover:text-white">
                      <Link to="/blog">← All Articles</Link>
                    </Button>
                    <Button variant="ghost" asChild className="w-full justify-start hover:bg-primary hover:text-white">
                      <Link to="/blog/category/osce-exam-preparation">OSCE Preparation</Link>
                    </Button>
                    <Button variant="ghost" asChild className="w-full justify-start hover:bg-primary hover:text-white">
                      <Link to="/">Start Free Trial</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}


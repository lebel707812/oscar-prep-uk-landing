import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Eye, ArrowLeft, Share2 } from 'lucide-react';
import { fetchBlogPost, incrementPostViews } from '@/integrations/supabase/blog';
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
  blog_categories?: { name: string; slug: string; color: string };
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      loadPost();
    }
  }, [slug]);

  const loadPost = async () => {
    try {
      // Mock data since Supabase might not be configured yet
      const mockPosts: { [key: string]: BlogPost } = {
        'what-is-osce-crucial-international-nurses-nhs': {
          id: '1',
          title: 'What is the OSCE and Why is it Crucial for International Nurses in the NHS?',
          slug: 'what-is-osce-crucial-international-nurses-nhs',
          excerpt: 'Discover everything about the Objective Structured Clinical Examination (OSCE) and its importance for international nurses wanting to work in the NHS.',
          content: `
# What is the OSCE and Why is it Crucial for International Nurses in the NHS?

The **Objective Structured Clinical Examination (OSCE)** is a practical assessment method used to evaluate clinical skills, knowledge, and competencies of healthcare professionals. For international nurses seeking to work in the NHS, the OSCE represents a crucial step in the registration process.

## Understanding the OSCE Format

The OSCE consists of multiple stations, each designed to assess specific clinical skills:

### Station Types
- **History Taking**: Gathering patient information through structured interviews
- **Physical Examination**: Demonstrating proper examination techniques
- **Communication**: Interacting effectively with patients and colleagues
- **Clinical Procedures**: Performing specific nursing interventions
- **Emergency Scenarios**: Responding to urgent clinical situations

## Why the OSCE Matters for International Nurses

### 1. **Professional Registration Requirement**
The Nursing and Midwifery Council (NMC) requires international nurses to pass the OSCE as part of the registration process. Without this qualification, you cannot practice as a registered nurse in the UK.

### 2. **Skills Validation**
The OSCE validates that your clinical skills meet UK standards, ensuring patient safety and quality care within the NHS framework.

### 3. **Cultural Adaptation**
The examination helps international nurses understand UK healthcare practices, communication styles, and professional expectations.

## Preparing for Success

### Study Strategies
- **Familiarise yourself with UK protocols**: Understanding NHS guidelines and procedures
- **Practice communication skills**: Developing clear, empathetic patient interactions
- **Master clinical procedures**: Ensuring competency in essential nursing skills
- **Mock examinations**: Simulating OSCE conditions to build confidence

### Key Areas to Focus On
1. **Patient-centred care**: Demonstrating compassion and respect
2. **Evidence-based practice**: Applying current research and guidelines
3. **Professional communication**: Clear, appropriate interactions
4. **Clinical reasoning**: Logical decision-making processes
5. **Safety protocols**: Following infection control and risk management

## Common Challenges and Solutions

### Language Barriers
- Practice medical terminology in English
- Develop clear pronunciation and communication skills
- Understand regional accents and colloquialisms

### Cultural Differences
- Learn about UK healthcare culture and patient expectations
- Understand professional boundaries and ethical considerations
- Familiarise yourself with NHS values and principles

### Technical Skills
- Practice procedures according to UK standards
- Understand equipment commonly used in NHS settings
- Master documentation and record-keeping requirements

## The Path Forward

Successfully passing the OSCE opens doors to a rewarding career in the NHS. The examination not only validates your clinical competence but also prepares you for the realities of nursing practice in the UK healthcare system.

Remember, the OSCE is not just an assessment—it's an opportunity to demonstrate your commitment to providing excellent patient care within the NHS framework.

## Next Steps

1. **Register for the OSCE** through the NMC website
2. **Prepare thoroughly** using approved study materials and practice sessions
3. **Seek support** from preparation courses and study groups
4. **Stay confident** and trust in your clinical knowledge and skills

The journey to NHS registration may seem challenging, but with proper preparation and dedication, success is achievable. Your international experience, combined with UK-specific training, will make you a valuable addition to the NHS nursing workforce.
          `,
          published_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          reading_time: 8,
          view_count: 245,
          meta_title: 'OSCE Guide for International Nurses | NHS Registration',
          meta_description: 'Complete guide to the OSCE examination for international nurses seeking NHS registration. Learn about format, preparation, and success strategies.',
          tags: ['OSCE', 'NHS', 'International Nurses', 'Registration', 'Exam Preparation'],
          blog_categories: { name: 'OSCE Exam Preparation', slug: 'osce-exam-preparation', color: '#3B82F6' }
        },
        'art-history-taking-clinical-history-osce': {
          id: '2',
          title: 'The Art of History Taking: How to Collect Clinical History Effectively in the OSCE',
          slug: 'art-history-taking-clinical-history-osce',
          excerpt: 'Learn essential techniques for conducting effective history taking during the OSCE, including empathetic communication and structured information gathering.',
          content: `
# The Art of History Taking: How to Collect Clinical History Effectively in the OSCE

History taking is one of the most fundamental skills assessed in the OSCE examination. It requires a delicate balance of clinical knowledge, communication skills, and empathetic patient interaction. This comprehensive guide will help you master this essential competency.

## The Foundation of Effective History Taking

### Building Rapport
- **Introduce yourself professionally**: State your name, role, and purpose
- **Ensure patient comfort**: Check seating, privacy, and any immediate needs
- **Establish trust**: Use open body language and maintain appropriate eye contact
- **Show empathy**: Acknowledge the patient's concerns and feelings

### The SOCRATES Framework

For symptom analysis, use the SOCRATES mnemonic:

- **S**ite: Where is the problem located?
- **O**nset: When did it start? How did it begin?
- **C**haracter: What does it feel like? (sharp, dull, burning, etc.)
- **R**adiation: Does it spread anywhere else?
- **A**ssociated symptoms: What else do you notice?
- **T**ime course: How has it changed over time?
- **E**xacerbating/relieving factors: What makes it better or worse?
- **S**everity: How would you rate it on a scale of 1-10?

## Structured Approach to History Taking

### 1. Opening and Presenting Complaint
- Begin with open-ended questions: "What brings you here today?"
- Allow the patient to tell their story in their own words
- Listen actively without interrupting
- Summarise what you've heard to confirm understanding

### 2. History of Presenting Complaint
- Use the SOCRATES framework for symptom analysis
- Explore the timeline of events
- Identify any triggers or precipitating factors
- Assess the impact on daily activities

### 3. Past Medical History
- Previous illnesses, surgeries, or hospitalisations
- Current medications and dosages
- Known allergies and reactions
- Immunisation history where relevant

### 4. Family History
- Hereditary conditions
- Family members' health status
- Age and cause of death for deceased relatives
- Genetic predispositions

### 5. Social History
- Occupation and work environment
- Living arrangements and support systems
- Lifestyle factors (smoking, alcohol, exercise)
- Travel history if relevant

### 6. Systems Review
- Brief screening of other body systems
- Identify any additional symptoms
- Ensure nothing significant is missed

## Communication Techniques for Success

### Active Listening Skills
- **Paraphrasing**: "So what I understand is..."
- **Clarification**: "Can you help me understand what you mean by...?"
- **Reflection**: "It sounds like this has been very worrying for you"
- **Summarising**: "Let me make sure I have this right..."

### Managing Difficult Situations

#### Anxious Patients
- Speak slowly and calmly
- Provide reassurance where appropriate
- Break information into smaller chunks
- Allow extra time for responses

#### Language Barriers
- Speak clearly and avoid medical jargon
- Use simple, everyday language
- Check understanding frequently
- Consider cultural sensitivities

#### Emotional Patients
- Acknowledge their emotions
- Provide tissues and comfort
- Allow time for emotional expression
- Maintain professional boundaries

## Common OSCE Scenarios

### Chest Pain History
- Focus on cardiac risk factors
- Explore associated symptoms (shortness of breath, nausea, sweating)
- Assess severity and impact on function
- Consider differential diagnoses

### Abdominal Pain History
- Detailed pain analysis using SOCRATES
- Associated gastrointestinal symptoms
- Menstrual history for female patients
- Dietary factors and bowel habits

### Mental Health Assessment
- Approach with sensitivity and non-judgement
- Assess mood, sleep, appetite, and concentration
- Explore support systems and coping mechanisms
- Risk assessment where appropriate

## Documentation and Record Keeping

### Essential Elements
- Clear, legible handwriting or typing
- Accurate dates and times
- Objective language
- Relevant positive and negative findings
- Professional terminology

### Legal Considerations
- Maintain patient confidentiality
- Ensure accuracy and completeness
- Sign and date all entries
- Follow NHS documentation standards

## Preparation Strategies

### Practice Techniques
- **Role-playing**: Practice with colleagues or family members
- **Video review**: Record yourself to identify areas for improvement
- **Peer feedback**: Work with study partners for constructive criticism
- **Mock OSCEs**: Simulate examination conditions

### Study Resources
- NHS clinical guidelines
- Communication skills textbooks
- Online OSCE preparation platforms
- Professional development courses

## Common Mistakes to Avoid

### Communication Errors
- Interrupting the patient too frequently
- Using medical jargon without explanation
- Failing to show empathy or understanding
- Not maintaining appropriate eye contact

### Clinical Mistakes
- Rushing through the history
- Missing important red flag symptoms
- Failing to explore psychological factors
- Inadequate documentation

## Building Confidence

### Mental Preparation
- Visualise successful interactions
- Practice relaxation techniques
- Develop a personal routine for each station
- Trust in your clinical knowledge and training

### Continuous Improvement
- Seek feedback from mentors and colleagues
- Reflect on each practice session
- Identify strengths and areas for development
- Maintain a learning mindset

## Conclusion

Mastering the art of history taking requires practice, patience, and genuine care for patients. Remember that behind every clinical presentation is a person with concerns, fears, and hopes. Your role is not just to gather information, but to provide comfort, understanding, and professional care.

The skills you develop for the OSCE will serve you throughout your nursing career in the NHS. Effective history taking forms the foundation of excellent patient care and will make you a valued member of any healthcare team.

Keep practicing, stay confident, and remember that every expert was once a beginner. Your dedication to mastering these skills demonstrates your commitment to providing the highest standard of care to NHS patients.
          `,
          published_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          reading_time: 12,
          view_count: 189,
          meta_title: 'OSCE History Taking Guide | Clinical Skills for Nurses',
          meta_description: 'Master history taking for the OSCE with our comprehensive guide. Learn communication techniques, structured approaches, and common scenarios.',
          tags: ['History Taking', 'OSCE', 'Communication Skills', 'Clinical Assessment', 'Patient Care'],
          blog_categories: { name: 'Communication Skills in OSCE', slug: 'communication-skills-osce', color: '#10B981' }
        }
      };

      const mockPost = mockPosts[slug!];
      if (mockPost) {
        setPost(mockPost);
        // Simulate incrementing view count
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h2>
            <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
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
    <>
      <UnifiedHeader />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="outline" asChild className="mb-4">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article>
          {/* Featured Image */}
          {post.featured_image_url && (
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-8">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {post.blog_categories && (
                <Badge
                  style={{ backgroundColor: post.blog_categories.color || '#3B82F6' }}
                  className="text-white"
                >
                  {post.blog_categories.name}
                </Badge>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.published_at)}
                </div>
                {post.reading_time && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.reading_time} min read
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {post.view_count} views
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>

            <p className="text-xl text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: post.content.replace(/\n/g, '<br>').replace(/#{1,6}\s/g, match => {
                  const level = match.trim().length;
                  return `<h${level} class="text-${4-level}xl font-bold mt-8 mb-4 text-gray-900">`;
                }).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              }}
            />
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              Ready to Start Your OSCE Preparation?
            </h3>
            <p className="text-blue-700 mb-4">
              Join thousands of international nurses who have successfully passed their OSCE with our comprehensive preparation platform.
            </p>
            <Button asChild>
              <Link to="/">
                Start Your Free Trial
              </Link>
            </Button>
          </div>
        </article>
      </div>
      </div>
      <Footer />
    </>
  );
}


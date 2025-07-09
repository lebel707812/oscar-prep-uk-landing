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
          featured_image_url: '/images/osce_crucial.jpg',
          content: `
<div class="prose prose-lg max-w-none">
  <p class="body-large text-muted-foreground mb-8 leading-relaxed">
    The <strong>Objective Structured Clinical Examination (OSCE)</strong> is a practical assessment method used to evaluate clinical skills, knowledge, and competencies of healthcare professionals. For international nurses seeking to work in the NHS, the OSCE represents a crucial step in the registration process.
  </p>

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
          featured_image_url: '/images/history_taking.jpg',
          content: `
<div class="prose prose-lg max-w-none">
  <p class="body-large text-muted-foreground mb-8 leading-relaxed">
    History taking is one of the most fundamental skills assessed in the OSCE examination. It requires a delicate balance of clinical knowledge, communication skills, and empathetic patient interaction. This comprehensive guide will help you master this essential competency.
  </p>

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
        },
        '1000151585': {
          id: '1000151585',
          title: 'Physical Examination Techniques: Mastering Clinical Skills for OSCE Success',
          slug: 'physical-examination-techniques-clinical-skills-osce',
          excerpt: 'Comprehensive guide to physical examination techniques required for OSCE, including systematic approaches and common assessment criteria.',
          featured_image_url: '/images/physical_exam.webp',
          content: `
<div class="prose prose-lg max-w-none">
  <p class="body-large text-muted-foreground mb-8 leading-relaxed">
    Mastering physical examination techniques is paramount for success in the OSCE. This guide provides a systematic approach to common clinical assessments, ensuring you demonstrate competence and confidence.
  </p>

  <div class="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-primary mb-6">The IPPA Framework</h3>
    <ul class="space-y-4">
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Inspection:</strong> 
          <span class="body-text text-muted-foreground ml-2">Observe the patient for any visible signs</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Palpation:</strong> 
          <span class="body-text text-muted-foreground ml-2">Feel for abnormalities, tenderness, or masses</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Percussion:</strong> 
          <span class="body-text text-muted-foreground ml-2">Tap on the body surface to assess underlying structures</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Auscultation:</strong> 
          <span class="body-text text-muted-foreground ml-2">Listen to body sounds using a stethoscope</span>
        </div>
      </li>
    </ul>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Key Systems to Master</h2>

  <div class="grid md:grid-cols-2 gap-6 mb-8">
    <div class="bg-secondary/10 border border-secondary/30 rounded-xl p-6">
      <h3 class="heading-4 text-secondary mb-4">Cardiovascular System</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        Assess heart sounds, peripheral pulses, and signs of cardiac compromise.
      </p>
    </div>
    <div class="bg-accent/10 border border-accent/30 rounded-xl p-6">
      <h3 class="heading-4 text-accent mb-4">Respiratory System</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        Evaluate breath sounds, respiratory effort, and signs of respiratory distress.
      </p>
    </div>
    <div class="bg-success/10 border border-success/30 rounded-xl p-6">
      <h3 class="heading-4 text-success mb-4">Abdominal System</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        Perform systematic palpation, percussion, and auscultation of the abdomen.
      </p>
    </div>
    <div class="bg-primary/10 border border-primary/30 rounded-xl p-6">
      <h3 class="heading-4 text-primary mb-4">Neurological System</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        Assess cranial nerves, motor and sensory functions, and reflexes.
      </p>
    </div>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Tips for OSCE Success</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    Practice makes perfect. Focus on a systematic approach and clear communication.
  </p>

  <div class="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-primary mb-6">Key Strategies</h3>
    <ul class="space-y-2">
      <li class="body-text text-muted-foreground">• Follow the IPPA sequence consistently</li>
      <li class="body-text text-muted-foreground">• Explain each step to the patient</li>
      <li class="body-text text-muted-foreground">• Maintain professionalism and empathy</li>
      <li class="body-text text-muted-foreground">• Practice with peers and seek feedback</li>
    </ul>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Conclusion</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    Mastering physical examination techniques is a cornerstone of nursing practice and crucial for OSCE success. By adopting a systematic approach and honing your skills, you will be well-prepared to demonstrate competence and provide excellent patient care.
  </p>
</div>
          `,
          published_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
          reading_time: 15,
          view_count: 156,
          author: 'Dr. Emily White, RN',
          meta_title: 'OSCE Physical Examination Guide | Clinical Skills',
          meta_description: 'Comprehensive guide to physical examination techniques for OSCE. Master cardiovascular, respiratory, abdominal, and neurological assessments.',
          tags: ['Physical Examination', 'OSCE', 'Clinical Skills', 'Nursing Assessment'],
          blog_categories: { name: 'OSCE Exam Preparation', slug: 'osce-exam-preparation', color: '#005A9C' }
        },
        '1000151586': {
          id: '1000151586',
          title: 'Understanding NHS Culture: A Guide for International Nurses',
          slug: 'understanding-nhs-culture-guide-international-nurses',
          excerpt: 'Essential insights into NHS culture, values, and working practices that international nurses need to understand for successful integration.',
          featured_image_url: '/images/nhs_culture.jpg',
          content: `
<div class="prose prose-lg max-w-none">
  <h2 class="heading-2 text-foreground mt-12 mb-6">Core NHS Values</h2>
  
  <p class="body-large text-muted-foreground mb-8 leading-relaxed">
    For international nurses, understanding the culture of the National Health Service (NHS) in the UK is as crucial as mastering clinical skills. This guide provides essential insights into NHS values, working practices, and professional expectations.
  </p>

  <div class="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-primary mb-6">The NHS Constitution</h3>
    <ul class="space-y-4">
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Working together for patients:</strong> 
          <span class="body-text text-muted-foreground ml-2">Patients come first in everything the NHS does</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Respect and dignity:</strong> 
          <span class="body-text text-muted-foreground ml-2">Treating everyone with compassion and respect</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Commitment to quality of care:</strong> 
          <span class="body-text text-muted-foreground ml-2">Striving for excellence in all services</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Compassion:</strong> 
          <span class="body-text text-muted-foreground ml-2">Care provided with empathy and kindness</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Improving lives:</strong> 
          <span class="body-text text-muted-foreground ml-2">Making a difference to patients and communities</span>
        </div>
      </li>
    </ul>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Professional Expectations</h2>

  <div class="grid md:grid-cols-2 gap-6 mb-8">
    <div class="bg-secondary/10 border border-secondary/30 rounded-xl p-6">
      <h3 class="heading-4 text-secondary mb-4">Teamwork and Collaboration</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        The NHS emphasizes multidisciplinary teamwork. Nurses are expected to collaborate closely with doctors, allied health professionals, and support staff.
      </p>
    </div>
    <div class="bg-accent/10 border border-accent/30 rounded-xl p-6">
      <h3 class="heading-4 text-accent mb-4">Accountability and Professionalism</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        Nurses are accountable for their actions and must adhere to the NMC Code of Conduct, maintaining high professional standards.
      </p>
    </div>
    <div class="bg-success/10 border border-success/30 rounded-xl p-6">
      <h3 class="heading-4 text-success mb-4">Continuous Learning</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        The NHS promotes a culture of continuous professional development. Nurses are encouraged to update their knowledge and skills regularly.
      </p>
    </div>
    <div class="bg-primary/10 border border-primary/30 rounded-xl p-6">
      <h3 class="heading-4 text-primary mb-4">Patient-Centered Care</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        Care delivery is always focused on the individual needs and preferences of the patient, promoting shared decision-making.
      </p>
    </div>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Adapting to the UK Healthcare System</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    Cultural adaptation extends beyond clinical practice to daily interactions and communication styles.
  </p>

  <div class="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-primary mb-6">Communication Nuances</h3>
    <ul class="space-y-2">
      <li class="body-text text-muted-foreground">• Use clear, concise language</li>
      <li class="body-text text-muted-foreground">• Understand indirect communication</li>
      <li class="body-text text-muted-foreground">• Be aware of professional boundaries</li>
      <li class="body-text text-muted-foreground">• Seek clarification when unsure</li>
    </ul>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Conclusion</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    Embracing NHS culture is a journey that enriches your professional life and enhances patient care. By understanding and embodying these values, international nurses can thrive in the UK healthcare environment.
  </p>
</div>
          `,
          published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          reading_time: 10,
          view_count: 203,
          author: 'Dr. John Smith, NHS Consultant',
          meta_title: 'NHS Culture Guide for International Nurses',
          meta_description: 'A comprehensive guide for international nurses to understand NHS culture, values, and professional expectations for successful integration.',
          tags: ['NHS', 'Culture', 'International Nurses', 'Healthcare System'],
          blog_categories: { name: 'NHS Updates and Culture', slug: 'nhs-updates-culture', color: '#EF4444' }
        },
        '1000151587': {
          id: '1000151587',
          title: 'From Mumbai to Manchester: My OSCE Success Story',
          slug: 'mumbai-manchester-osce-success-story',
          excerpt: 'Personal journey of an international nurse from India who successfully passed the OSCE and now works in the NHS.',
          featured_image_url: '/images/mumbai_manchester.jpg',
          content: `
<div class="prose prose-lg max-w-none">
  <h2 class="heading-2 text-foreground mt-12 mb-6">The Decision to Move</h2>
  
  <p class="body-large text-muted-foreground mb-8 leading-relaxed">
    My name is Priya Sharma, and I am an international nurse from Mumbai, India. My journey to working in the NHS in Manchester was challenging but incredibly rewarding, culminating in passing the OSCE.
  </p>

  <div class="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-primary mb-6">Why the UK?</h3>
    <ul class="space-y-4">
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Career Growth:</strong> 
          <span class="body-text text-muted-foreground ml-2">Opportunities for specialization and professional development</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Quality of Life:</strong> 
          <span class="body-text text-muted-foreground ml-2">Better work-life balance and social infrastructure</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Global Experience:</strong> 
          <span class="body-text text-muted-foreground ml-2">Exposure to a world-class healthcare system</span>
        </div>
      </li>
    </ul>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">OSCE Preparation Journey</h2>

  <div class="grid md:grid-cols-2 gap-6 mb-8">
    <div class="bg-secondary/10 border border-secondary/30 rounded-xl p-6">
      <h3 class="heading-4 text-secondary mb-4">Challenges Faced</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        Adapting to new clinical guidelines and communication styles was initially challenging. The pressure of the exam was immense.
      </p>
    </div>
    <div class="bg-accent/10 border border-accent/30 rounded-xl p-6">
      <h3 class="heading-4 text-accent mb-4">Support System</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        I relied heavily on online resources, mock exams, and a study group with other international nurses. This community was invaluable.
      </p>
    </div>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">OSCE Exam Day</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    The exam day was nerve-wracking, but my preparation paid off. I focused on staying calm, following the structured approach, and communicating clearly.
  </p>

  <div class="bg-gradient-to-r from-success/10 to-primary/10 border border-success/30 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-success mb-4">Key Moment</h3>
    <p class="body-text text-muted-foreground leading-relaxed">
      The moment I received my OSCE pass result was one of the happiest of my life. All the hard work and sacrifices felt worth it.
    </p>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Life in the NHS</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    Working as a nurse in the NHS has been incredibly fulfilling. The team is supportive, and I am constantly learning and growing.
  </p>

  <div class="bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-8">
    <h3 class="heading-3 text-primary mb-6">Advice for Aspiring Nurses</h3>
    <ul class="space-y-2">
      <li class="body-text text-muted-foreground">• Start preparing early</li>
      <li class="body-text text-muted-foreground">• Join study groups</li>
      <li class="body-text text-muted-foreground">• Practice communication skills</li>
      <li class="body-text text-muted-foreground">• Believe in yourself</li>
    </ul>
  </div>
</div>
          `,
          published_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          reading_time: 7,
          view_count: 312,
          author: 'Priya Sharma, RN',
          meta_title: 'My OSCE Success Story | International Nurse NHS',
          meta_description: 'Read Priya Sharma\'s inspiring journey from Mumbai to Manchester, successfully passing the OSCE and working as a nurse in the NHS.',
          tags: ['Success Story', 'OSCE', 'International Nurses', 'NHS', 'Personal Journey'],
          blog_categories: { name: 'Success Stories and Inspiration', slug: 'success-stories-inspiration', color: '#8B5CF6' }
        },
        '1000151588': {
          id: '1000151588',
          title: 'Effective Study Techniques for OSCE Preparation: Evidence-Based Approaches',
          slug: 'effective-study-techniques-osce-preparation',
          excerpt: 'Research-backed study methods and techniques that have proven effective for OSCE preparation among international nursing candidates.',
          featured_image_url: '/images/study_techniques.jpeg',
          content: `
<div class="prose prose-lg max-w-none">
  <h2 class="heading-2 text-foreground mt-12 mb-6">Active Recall and Spaced Repetition</h2>
  
  <p class="body-large text-muted-foreground mb-8 leading-relaxed">
    Preparing for the OSCE requires more than just memorization; it demands effective study techniques that foster deep understanding and practical application. This guide explores evidence-based approaches to maximize your preparation.
  </p>

  <div class="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-primary mb-6">Why They Work</h3>
    <ul class="space-y-4">
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Active Recall:</strong> 
          <span class="body-text text-muted-foreground ml-2">Retrieving information from memory rather than passively re-reading</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Spaced Repetition:</strong> 
          <span class="body-text text-muted-foreground ml-2">Reviewing material at increasing intervals over time</span>
        </div>
      </li>
    </ul>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Practice-Based Learning</h2>

  <div class="grid md:grid-cols-2 gap-6 mb-8">
    <div class="bg-secondary/10 border border-secondary/30 rounded-xl p-6">
      <h3 class="heading-4 text-secondary mb-4">Mock OSCEs</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        Simulate the exam environment to build confidence and identify areas for improvement. Practice under timed conditions.
      </p>
    </div>
    <div class="bg-accent/10 border border-accent/30 rounded-xl p-6">
      <h3 class="heading-4 text-accent mb-4">Role-Playing</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        Practice communication and clinical skills with peers or mentors. Get constructive feedback on your performance.
      </p>
    </div>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Utilizing Resources Effectively</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    Leverage available resources to supplement your study plan.
  </p>

  <div class="bg-gradient-to-r from-success/10 to-primary/10 border border-success/30 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-success mb-4">Recommended Resources</h3>
    <ul class="space-y-2">
      <li class="body-text text-muted-foreground">• OSCE textbooks and guides</li>
      <li class="body-text text-muted-foreground">• Online video tutorials</li>
      <li class="body-text text-muted-foreground">• Clinical skills manuals</li>
      <li class="body-text text-muted-foreground">• Peer-reviewed articles</li>
    </ul>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Conclusion</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    By integrating evidence-based study techniques like active recall, spaced repetition, and practice-based learning, you can significantly enhance your OSCE preparation and increase your chances of success. Consistent effort and smart study habits are key.
  </p>
</div>
          `,
          published_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          reading_time: 11,
          view_count: 178,
          author: 'Prof. David Green, PhD',
          meta_title: 'OSCE Study Techniques | Evidence-Based Preparation',
          meta_description: 'Explore effective study techniques for OSCE preparation, including active recall, spaced repetition, and practice-based learning for international nurses.',
          tags: ['Study Tips', 'OSCE', 'Preparation', 'Evidence-Based', 'Learning'],
          blog_categories: { name: 'Study Tips and Resources', slug: 'study-tips-resources', color: '#F59E0B' }
        },
        '1000151589': {
          id: '1000151589',
          title: 'Medication Management in OSCE: Safe Practice and Calculation Skills',
          slug: 'medication-management-osce-safe-practice',
          excerpt: 'A detailed guide on medication management, safe drug administration, and dosage calculation skills essential for the OSCE and clinical practice.',
          featured_image_url: '/images/medication_management.jpg',
          content: `
<div class="prose prose-lg max-w-none">
  <h2 class="heading-2 text-foreground mt-12 mb-6">The Five Rights of Medication Administration</h2>
  
  <p class="body-large text-muted-foreground mb-8 leading-relaxed">
    Medication management is a critical component of nursing practice and a frequently assessed area in the OSCE. Ensuring patient safety through accurate administration and calculation is paramount.
  </p>

  <div class="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-primary mb-6">The 'Rights' Framework</h3>
    <ul class="space-y-4">
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Right Patient:</strong> 
          <span class="body-text text-muted-foreground ml-2">Verify patient identity using at least two identifiers</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Right Drug:</strong> 
          <span class="body-text text-muted-foreground ml-2">Check the medication name and form carefully</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Right Dose:</strong> 
          <span class="body-text text-muted-foreground ml-2">Ensure the dosage is correct and calculated accurately</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Right Route:</strong> 
          <span class="body-text text-muted-foreground ml-2">Confirm the correct route of administration</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Right Time:</strong> 
          <span class="body-text text-muted-foreground ml-2">Administer the medication at the prescribed time</span>
        </div>
      </li>
    </ul>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Dosage Calculation Skills</h2>

  <div class="grid md:grid-cols-2 gap-6 mb-8">
    <div class="bg-secondary/10 border border-secondary/30 rounded-xl p-6">
      <h3 class="heading-4 text-secondary mb-4">Oral Medications</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        Practice calculating doses for tablets, capsules, and liquid medications based on prescribed amounts and available concentrations.
      </p>
    </div>
    <div class="bg-accent/10 border border-accent/30 rounded-xl p-6">
      <h3 class="heading-4 text-accent mb-4">Parenteral Medications</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        Master calculations for injections (intramuscular, subcutaneous, intravenous) including reconstitution and dilution.
      </p>
    </div>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Safe Administration Practices</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    Beyond calculations, the OSCE assesses your ability to safely administer medications in a clinical setting.
  </p>

  <div class="bg-gradient-to-r from-success/10 to-primary/10 border border-success/30 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-success mb-4">Key Safety Checks</h3>
    <ul class="space-y-2">
      <li class="body-text text-muted-foreground">• Double-check calculations with another nurse</li>
      <li class="body-text text-muted-foreground">• Assess for allergies and contraindications</li>
      <li class="body-text text-muted-foreground">• Educate the patient about the medication</li>
      <li class="body-text text-muted-foreground">• Document administration accurately and promptly</li>
    </ul>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Conclusion</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    Proficiency in medication management is non-negotiable for nurses. By diligently practicing the 'Five Rights' and honing your calculation skills, you will demonstrate competence and ensure patient safety in the OSCE and beyond.
  </p>
</div>
          `,
          published_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
          reading_time: 9,
          view_count: 210,
          author: 'Nurse Educator',
          meta_title: 'OSCE Medication Management | Safe Practice & Calculations',
          meta_description: 'Guide to medication management for OSCE, covering safe administration, dosage calculation, and the Five Rights of medication.',
          tags: ['Medication Management', 'OSCE', 'Drug Calculation', 'Patient Safety', 'Nursing Skills'],
          blog_categories: { name: 'Clinical Skills', slug: 'clinical-skills', color: '#1976D2' }
        },
        '1000151590': {
          id: '1000151590',
          title: 'Wound Care Management: Best Practices for OSCE and Clinical Settings',
          slug: 'wound-care-management-best-practices',
          excerpt: 'Essential guide to wound care management, including assessment, dressing techniques, and infection control for OSCE and daily nursing practice.',
          featured_image_url: '/images/wound_care.jpg',
          content: `
<div class="prose prose-lg max-w-none">
  <h2 class="heading-2 text-foreground mt-12 mb-6">Wound Assessment Principles</h2>
  
  <p class="body-large text-muted-foreground mb-8 leading-relaxed">
    Effective wound care management is a fundamental nursing skill, crucial for patient recovery and a common station in the OSCE. This guide outlines best practices for assessment and intervention.
  </p>

  <div class="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-primary mb-6">TIME Framework for Wound Bed Preparation</h3>
    <ul class="space-y-4">
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Tissue:</strong> 
          <span class="body-text text-muted-foreground ml-2">Debridement of non-viable tissue</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Infection/Inflammation:</strong> 
          <span class="body-text text-muted-foreground ml-2">Management of infection and inflammation</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Moisture Imbalance:</strong> 
          <span class="body-text text-muted-foreground ml-2">Addressing exudate levels</span>
        </div>
      </li>
      <li class="flex items-start">
        <div class="w-2 h-2 bg-primary rounded-full mt-3 mr-4 flex-shrink-0"></div>
        <div>
          <strong class="text-foreground">Edge of Wound:</strong> 
          <span class="body-text text-muted-foreground ml-2">Non-advancing or undermined edges</span>
        </div>
      </li>
    </ul>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Dressing Selection and Application</h2>

  <div class="grid md:grid-cols-2 gap-6 mb-8">
    <div class="bg-secondary/10 border border-secondary/30 rounded-xl p-6">
      <h3 class="heading-4 text-secondary mb-4">Types of Dressings</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        Hydrocolloids, alginates, foams, films, and hydrogels – understand their indications and contraindications.
      </p>
    </div>
    <div class="bg-accent/10 border border-accent/30 rounded-xl p-6">
      <h3 class="heading-4 text-accent mb-4">Application Techniques</h3>
      <p class="body-text text-muted-foreground leading-relaxed">
        Sterile technique, proper sizing, and securement to promote healing and prevent infection.
      </p>
    </div>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Infection Control in Wound Care</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    Preventing infection is paramount in wound management. Adhere to strict aseptic techniques.
  </p>

  <div class="bg-gradient-to-r from-success/10 to-primary/10 border border-success/30 rounded-xl p-8 mb-8">
    <h3 class="heading-3 text-success mb-4">Key Infection Prevention Strategies</h3>
    <ul class="space-y-2">
      <li class="body-text text-muted-foreground">• Hand hygiene before and after contact</li>
      <li class="body-text text-muted-foreground">• Use of personal protective equipment (PPE)</li>
      <li class="body-text text-muted-foreground">• Aseptic non-touch technique (ANTT)</li>
      <li class="body-text text-muted-foreground">• Proper disposal of contaminated materials</li>
    </ul>
  </div>

  <h2 class="heading-2 text-foreground mt-12 mb-6">Conclusion</h2>
  
  <p class="body-text text-muted-foreground mb-6 leading-relaxed">
    Proficiency in medication management is non-negotiable for nurses. By diligently practicing the 'Five Rights' and honing your calculation skills, you will demonstrate competence and ensure patient safety in the OSCE and beyond.
  </p>
</div>
          `,
          published_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
          reading_time: 10,
          view_count: 195,
          author: 'Clinical Nurse Specialist',
          meta_title: 'OSCE Wound Care Management | Best Practices',
          meta_description: 'Guide to wound care management for OSCE, covering assessment, dressing techniques, and infection control for nurses.',
          tags: ['Wound Care', 'OSCE', 'Clinical Skills', 'Infection Control', 'Nursing Practice'],
          blog_categories: { name: 'Clinical Skills', slug: 'clinical-skills', color: '#1976D2' }
        }
      };

      // Buscar por ID primeiro, depois por slug para compatibilidade
      const postKey = id || slug;
      let foundPost = mockPosts[postKey!];

      // Fallback para buscar por slug se o ID não for encontrado
      if (!foundPost && slug) {
        for (const key in mockPosts) {
          if (mockPosts[key].slug === slug) {
            foundPost = mockPosts[key];
            break;
          }
        }
      }
      
      if (foundPost) {
        setPost(foundPost);
        // Simular incremento de visualizações
        foundPost.view_count = (foundPost.view_count || 0) + 1;
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








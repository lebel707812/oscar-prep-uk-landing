import { Brain, Calendar, MessageCircle, Target, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    icon: Brain,
    title: "AI Patient Simulation",
    description: "Practice with realistic AI patients that respond like real NHS cases, improving your clinical reasoning skills through immersive scenarios.",
    color: "text-secondary"
  },
  {
    icon: Calendar,
    title: "Personalised Study Plans",
    description: "Get customised learning paths based on your strengths and areas for improvement, optimised for your timeline and learning style.",
    color: "text-primary"
  },
  {
    icon: MessageCircle,
    title: "Real-time Feedback",
    description: "Receive instant, detailed feedback on your performance with actionable insights to improve your technique and confidence.",
    color: "text-success"
  },
  {
    icon: Target,
    title: "NHS-Focused Content",
    description: "All scenarios are tailored specifically for NHS protocols and standards, ensuring relevant and up-to-date preparation.",
    color: "text-accent"
  },
  {
    icon: Users,
    title: "Global Community",
    description: "Connect with fellow international nurses, share experiences, and learn from success stories in our supportive community.",
    color: "text-secondary"
  },
  {
    icon: Zap,
    title: "Performance Analytics",
    description: "Track your progress with detailed analytics showing your readiness level, strengths, and exam prediction insights.",
    color: "text-primary"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-6">
          <h2 className="heading-1 text-foreground">
            Why Choose Our OSCE Platform?
          </h2>
          <p className="body-large text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Designed specifically for international nurses preparing for NHS OSCE exams, 
            with evidence-based features that make the difference between pass and fail.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-strong transition-all duration-500 border border-border/50 bg-white/90 backdrop-blur-sm hover:bg-white hover:-translate-y-2 hover:scale-105 rounded-2xl overflow-hidden"
            >
              <CardHeader className="pb-6 space-y-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${benefit.color.split('-')[1]}/20 to-${benefit.color.split('-')[1]}/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-soft`}>
                  <benefit.icon className={`h-8 w-8 ${benefit.color}`} />
                </div>
                <CardTitle className="heading-3 text-foreground">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="body-text text-muted-foreground leading-relaxed">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-primary via-primary-light to-secondary p-12 rounded-3xl text-white shadow-strong hover:shadow-xl transition-shadow duration-300 max-w-4xl mx-auto">
            <h3 className="heading-2 mb-6 text-white">Ready to Start Your Journey?</h3>
            <p className="body-large text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join hundreds of international nurses who have successfully passed their OSCE exams with our comprehensive, AI-powered platform.
            </p>
            <button className="btn-text bg-white text-primary font-semibold px-12 py-4 rounded-xl hover:bg-muted hover:text-primary-dark transition-all duration-300 shadow-medium hover:shadow-strong transform hover:scale-105">
              Start Your Free Trial Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;


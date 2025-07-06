import { Brain, Calendar, MessageCircle, Target, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const benefits = [
  {
    icon: Brain,
    title: "AI Patient Simulation",
    description: "Practice with realistic AI patients that respond like real NHS cases, improving your clinical reasoning skills.",
    color: "text-accent"
  },
  {
    icon: Calendar,
    title: "Personalised Study Plans",
    description: "Get customised learning paths based on your strengths and areas for improvement, optimised for your timeline.",
    color: "text-primary"
  },
  {
    icon: MessageCircle,
    title: "Real-time Feedback",
    description: "Receive instant, detailed feedback on your performance with actionable insights to improve your technique.",
    color: "text-success"
  },
  {
    icon: Target,
    title: "NHS-Focused Content",
    description: "All scenarios are tailored specifically for NHS protocols and standards, ensuring relevant preparation.",
    color: "text-warning"
  },
  {
    icon: Users,
    title: "Global Community",
    description: "Connect with fellow international nurses, share experiences, and learn from success stories.",
    color: "text-accent"
  },
  {
    icon: Zap,
    title: "Performance Analytics",
    description: "Track your progress with detailed analytics showing your readiness level and exam prediction.",
    color: "text-primary"
  }
];

const BenefitsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Why Choose Our OSCE Platform?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Designed specifically for international nurses preparing for NHS OSCE exams, 
            with features that make the difference between pass and fail.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-1"
            >
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <benefit.icon className={`h-6 w-6 ${benefit.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {benefit.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary to-accent p-8 rounded-2xl text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join hundreds of international nurses who have successfully passed their OSCE exams with our platform.
            </p>
            <button className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-secondary hover:text-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Your Free Trial Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
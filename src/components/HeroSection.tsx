import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/10 to-primary/5 min-h-screen flex items-center">
      {/* Background Image */}
      <img
        src="/images/landingpage.png"
        alt="Background - International nurses celebrating OSCE certification"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/30 -z-10"></div>

      <div className="container mx-auto px-6 py-20 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary/20 text-secondary border border-secondary/30 backdrop-blur-sm">
                <span className="w-2 h-2 bg-success rounded-full mr-3 animate-pulse"></span>
                <span className="font-body font-medium text-sm">Trusted by 500+ nurses worldwide</span>
              </div>
              
              <h1 className="heading-1 text-foreground leading-[1.1]">
                Master Your{" "}
                <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
                  OSCE Exam
                </span>{" "}
                for the NHS
              </h1>
              
              <p className="body-large text-muted-foreground max-w-2xl leading-relaxed">
                Join international nurses from India, Philippines, Nigeria, and Brazil who successfully passed their OSCE with our AI-powered preparation platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Button 
                size="lg" 
                className="btn-text bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Free Trial
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="btn-text border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-4 rounded-xl transition-all duration-300 hover:shadow-lg"
              >
                <Play className="mr-3 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border/50">
              <div className="text-center space-y-2">
                <div className="heading-2 text-primary font-bold">95%</div>
                <div className="body-small text-muted-foreground font-medium">Pass Rate</div>
              </div>
              <div className="text-center space-y-2">
                <div className="heading-2 text-primary font-bold">500+</div>
                <div className="body-small text-muted-foreground font-medium">Nurses Trained</div>
              </div>
              <div className="text-center space-y-2">
                <div className="heading-2 text-primary font-bold">24/7</div>
                <div className="body-small text-muted-foreground font-medium">AI Support</div>
              </div>
            </div>
          </div>

          {/* Image Card */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
              <img 
                src="/images/landingpage.png"
                alt="International nurses preparing for OSCE exam"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-6 -right-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-border/50">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-success rounded-full animate-pulse"></div>
                <span className="body-small font-semibold text-foreground">Live AI Feedback</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-border/50">
              <div className="heading-3 text-primary font-bold">1000+</div>
              <div className="body-small text-muted-foreground font-medium">Practice Scenarios</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
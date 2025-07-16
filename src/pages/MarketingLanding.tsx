import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Play, Check, Star, Users, Clock, Trophy, Shield, BookOpen, Target, Zap, Heart } from "lucide-react";
import { useState } from "react";

const MarketingLanding = () => {
  const [email, setEmail] = useState("");

  const handleStartTrial = () => {
    // Redirect to signup/trial page
    window.location.href = "/auth";
  };

  const handleWatchDemo = () => {
    // Open demo video or redirect to demo page
    console.log("Watch demo clicked");
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Handle email submission for early access or newsletter
      console.log("Email submitted:", email);
      setEmail("");
      alert("Thank you! We'll be in touch soon.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-foreground">Oscar Prep UK</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">Success Stories</a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
              <Button onClick={handleStartTrial} className="bg-primary hover:bg-primary-dark">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/5 to-primary/5 py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-success/10 text-success border-success/30 px-4 py-2">
                  <span className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse"></span>
                  95% Pass Rate • Trusted by 500+ Nurses
                </Badge>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Pass Your{" "}
                  <span className="bg-gradient-to-r from-primary via-primary-light to-secondary bg-clip-text text-transparent">
                    OSCE Exam
                  </span>{" "}
                  in 30 Days
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Join international nurses from India, Philippines, Nigeria, and Brazil who successfully passed their OSCE with our AI-powered preparation platform. Get personalized feedback, unlimited practice, and 24/7 support.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={handleStartTrial}
                  className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Free 7-Day Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleWatchDemo}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg rounded-xl transition-all duration-300"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch 2-Min Demo
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">Pass Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Success Stories</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">AI Support</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.pexels.com/photos/7084406/pexels-photo-7084406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Nurses preparing for OSCE exam"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-sm">AI-Powered Feedback</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-muted-foreground">Practice Scenarios</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by International Nurses Worldwide</h2>
            <p className="text-muted-foreground">Join nurses from over 20 countries who have successfully passed their OSCE</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"Passed my OSCE on the first try! The AI feedback was incredibly helpful."</p>
              <div className="font-semibold">Priya S.</div>
              <div className="text-sm text-muted-foreground">From India • NHS Nurse</div>
            </Card>
            
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"The practice scenarios were exactly like the real exam. Highly recommend!"</p>
              <div className="font-semibold">Maria L.</div>
              <div className="text-sm text-muted-foreground">From Philippines • NHS Nurse</div>
            </Card>
            
            <Card className="text-center p-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"Amazing platform! The personalized study plan made all the difference."</p>
              <div className="font-semibold">Adaora N.</div>
              <div className="text-sm text-muted-foreground">From Nigeria • NHS Nurse</div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Everything You Need to Pass Your OSCE</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform combines AI technology with proven teaching methods to give you the best chance of success.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Feedback</h3>
              <p className="text-muted-foreground">Get instant, personalized feedback on your performance with detailed analysis and improvement suggestions.</p>
            </Card>

            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1000+ Practice Scenarios</h3>
              <p className="text-muted-foreground">Access a vast library of realistic OSCE scenarios covering all major clinical areas and specialties.</p>
            </Card>

            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Timed Practice Sessions</h3>
              <p className="text-muted-foreground">Practice with realistic 8-10 minute timers to simulate actual OSCE exam conditions.</p>
            </Card>

            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Support</h3>
              <p className="text-muted-foreground">Connect with fellow international nurses and get support from our active community forum.</p>
            </Card>

            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Progress Tracking</h3>
              <p className="text-muted-foreground">Monitor your improvement with detailed analytics and personalized study recommendations.</p>
            </Card>

            <Card className="p-6 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">NHS Protocol Updates</h3>
              <p className="text-muted-foreground">Stay current with the latest NHS protocols and guidelines integrated into all practice scenarios.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              Ready to Pass Your OSCE?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join hundreds of international nurses who have successfully passed their OSCE exam with our proven preparation platform. Start your free trial today - no credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={handleStartTrial}
                className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Your Free 7-Day Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <div className="text-white/80 text-sm">
                ✓ No credit card required ✓ Cancel anytime ✓ 30-day money-back guarantee
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that works best for your OSCE preparation journey</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 border border-border/50 rounded-3xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold">Free Starter</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold">£0</span>
                  <span className="text-muted-foreground ml-2">/forever</span>
                </div>
                <CardDescription className="text-lg">Perfect for exploring our platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-success mr-3" />
                    <span>5 AI simulations per month</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-success mr-3" />
                    <span>Basic performance analytics</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-success mr-3" />
                    <span>Community forum access</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-success mr-3" />
                    <span>Mobile app access</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-6 py-3 border-2 border-primary text-primary hover:bg-primary hover:text-white"
                  onClick={handleStartTrial}
                >
                  Get Started Free
                </Button>
              </CardContent>
            </Card>

            <Card className="p-8 border-2 border-primary rounded-3xl bg-white shadow-xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-white px-4 py-2">Most Popular</Badge>
              </div>
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold">Professional</CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-bold">£29</span>
                  <span className="text-muted-foreground ml-2">/month</span>
                </div>
                <CardDescription className="text-lg">Everything you need to pass your OSCE</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-success mr-3" />
                    <span>Unlimited AI simulations</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-success mr-3" />
                    <span>Personalized study plans</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-success mr-3" />
                    <span>Real-time detailed feedback</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-success mr-3" />
                    <span>Advanced analytics & predictions</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-success mr-3" />
                    <span>Priority support</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-success mr-3" />
                    <span>NHS protocol updates</span>
                  </div>
                </div>
                <Button 
                  className="w-full mt-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-xl"
                  onClick={handleStartTrial}
                >
                  Start 7-Day Free Trial
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Cancel anytime • 30-day money-back guarantee
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Don't Let Your OSCE Dreams Wait
            </h2>
            <p className="text-lg text-muted-foreground">
              Thousands of international nurses have already started their journey to NHS success. Join them today with our risk-free trial.
            </p>
            
            <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              <Button type="submit" className="bg-primary hover:bg-primary-dark px-6 py-3 rounded-xl">
                Get Started
              </Button>
            </form>
            
            <p className="text-sm text-muted-foreground">
              Start your free trial instantly. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">Oscar Prep UK</span>
              </div>
              <p className="text-white/70">
                Empowering international nurses to succeed in their OSCE exams and build rewarding careers in the NHS.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Practice Scenarios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Feedback</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Progress Tracking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Live Chat</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/70">
            <p>&copy; 2024 Oscar Prep UK. All rights reserved. Helping international nurses succeed in the NHS.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MarketingLanding;


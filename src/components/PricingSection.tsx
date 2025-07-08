import { Check, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Free Starter",
    price: "£0",
    period: "forever",
    description: "Perfect for getting started with OSCE preparation and exploring our platform",
    features: [
      "5 AI patient simulations per month",
      "Basic performance analytics",
      "Community forum access",
      "Standard email support",
      "Mobile app access"
    ],
    notIncluded: [
      "Personalised study plans",
      "Real-time feedback",
      "Progress tracking",
      "Priority support"
    ],
    cta: "Start Free Trial",
    popular: false,
    gradient: "from-muted to-muted/50"
  },
  {
    name: "Professional",
    price: "£29",
    period: "per month",
    description: "Everything you need to pass your OSCE exam with confidence and comprehensive support",
    features: [
      "Unlimited AI patient simulations",
      "Personalised study plans",
      "Real-time detailed feedback",
      "Advanced performance analytics",
      "Progress tracking & predictions",
      "Priority email & chat support",
      "Mobile app with offline mode",
      "NHS protocol updates",
      "Community mentorship program"
    ],
    notIncluded: [],
    cta: "Start Professional Trial",
    popular: true,
    gradient: "from-primary to-accent"
  }
];

const PricingSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-6">
          <h2 className="heading-1 text-foreground">
            Choose Your Path to Success
          </h2>
          <p className="body-large text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Start with our free plan to explore the platform, or upgrade to Professional for the complete OSCE preparation experience with unlimited access and premium support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative group hover:shadow-strong transition-all duration-500 border border-border/50 overflow-hidden rounded-3xl ${
                plan.popular ? 'ring-2 ring-primary ring-offset-4 scale-105 bg-white' : 'hover:-translate-y-3 bg-white/90 backdrop-blur-sm hover:bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-primary to-secondary text-white text-center py-3">
                    <Crown className="inline h-4 w-4 mr-2" />
                    <span className="body-small font-semibold">Most Popular Choice</span>
                  </div>
                </div>
              )}
              
              <CardHeader className={`${plan.popular ? 'pt-16' : 'pt-8'} pb-6 space-y-4`}>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="heading-2 text-foreground">
                    {plan.name}
                  </CardTitle>
                  {plan.popular && (
                    <Badge className="bg-gradient-to-r from-secondary to-accent text-white border-0 px-3 py-1">
                      <Sparkles className="h-3 w-3 mr-1" />
                      <span className="body-small font-medium">Recommended</span>
                    </Badge>
                  )}
                </div>
                
                <div className="mb-6">
                  <span className="text-5xl font-bold text-foreground font-heading">{plan.price}</span>
                  <span className="body-text text-muted-foreground ml-3">/{plan.period}</span>
                </div>
                
                <CardDescription className="body-text text-muted-foreground leading-relaxed">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0 px-8 pb-8">
                <div className="space-y-5 mb-10">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-success mt-1 mr-4 flex-shrink-0" />
                      <span className="body-text text-foreground leading-relaxed">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start opacity-60">
                      <div className="h-5 w-5 mt-1 mr-4 flex-shrink-0 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full border-2 border-muted-foreground"></div>
                      </div>
                      <span className="body-text text-muted-foreground line-through leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full py-4 btn-text rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-primary-light text-white hover:shadow-xl hover:from-primary-dark hover:to-primary' 
                      : 'border-2 border-primary text-primary hover:bg-primary hover:text-white hover:shadow-lg'
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                  size="lg"
                >
                  {plan.cta}
                </Button>

                {plan.popular && (
                  <p className="text-center body-small text-muted-foreground mt-4 leading-relaxed">
                    7-day free trial • Cancel anytime • No commitment
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Money-back guarantee */}
        <div className="text-center mt-20">
          <div className="bg-success/10 border border-success/30 rounded-3xl p-10 max-w-3xl mx-auto shadow-soft hover:shadow-medium transition-shadow duration-300">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center shadow-soft">
                <Check className="h-8 w-8 text-success" />
              </div>
            </div>
            <h3 className="heading-3 text-foreground mb-4">30-Day Money-Back Guarantee</h3>
            <p className="body-text text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We're so confident in our platform that if you don't pass your OSCE exam after using our Professional plan, 
              we'll refund your subscription. No questions asked, no hassle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;


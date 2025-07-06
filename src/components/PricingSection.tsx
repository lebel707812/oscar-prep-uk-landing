import { Check, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Free Starter",
    price: "£0",
    period: "forever",
    description: "Perfect for getting started with OSCE preparation",
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
    description: "Everything you need to pass your OSCE exam",
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
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Choose Your Path to Success
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start with our free plan or upgrade to Professional for the complete OSCE preparation experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative group hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden ${
                plan.popular ? 'ring-2 ring-primary ring-offset-4 scale-105' : 'hover:-translate-y-2'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0">
                  <div className="bg-gradient-to-r from-primary to-accent text-white text-center py-2 text-sm font-semibold">
                    <Crown className="inline h-4 w-4 mr-1" />
                    Most Popular Choice
                  </div>
                </div>
              )}
              
              <CardHeader className={`${plan.popular ? 'pt-12' : 'pt-6'} pb-4`}>
                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </CardTitle>
                  {plan.popular && (
                    <Badge className="bg-gradient-to-r from-primary to-accent text-white border-0">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Recommended
                    </Badge>
                  )}
                </div>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">/{plan.period}</span>
                </div>
                
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-success mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start opacity-50">
                      <div className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full border-2 border-muted-foreground"></div>
                      </div>
                      <span className="text-muted-foreground line-through">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className={`w-full py-6 text-lg font-semibold rounded-xl transition-all duration-300 ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-primary to-accent text-white hover:shadow-xl hover:scale-105' 
                      : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>

                {plan.popular && (
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    7-day free trial • Cancel anytime • No commitment
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Money-back guarantee */}
        <div className="text-center mt-16">
          <div className="bg-success/10 border border-success/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-success" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">30-Day Money-Back Guarantee</h3>
            <p className="text-muted-foreground">
              We're so confident in our platform that if you don't pass your OSCE exam, 
              we'll refund your subscription. No questions asked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;

import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Staff Nurse, Manchester Royal Infirmary",
    country: "Originally from Mumbai, India",
    content: "The AI patient simulations were incredibly realistic. I felt so prepared for my OSCE that I passed on my first attempt with flying colours!",
    rating: 5,
    avatar: "PS",
    image: "/placeholder.svg"
  },
  {
    name: "Maria Santos",
    role: "Registered Nurse, Birmingham Children's Hospital",
    country: "Originally from Manila, Philippines",
    content: "The personalised study plan was a game-changer. It focused on exactly what I needed to improve, and the feedback was spot-on.",
    rating: 5,
    avatar: "MS",
    image: "/placeholder.svg"
  },
  {
    name: "Adaora Okafor",
    role: "Theatre Nurse, Royal London Hospital",
    country: "Originally from Lagos, Nigeria",
    content: "I was nervous about the OSCE, but this platform gave me the confidence I needed. The NHS-specific scenarios were perfect preparation.",
    rating: 5,
    avatar: "AO",
    image: "/placeholder.svg"
  },
  {
    name: "Carlos Silva",
    role: "ICU Nurse, Leeds Teaching Hospitals",
    country: "Originally from São Paulo, Brazil",
    content: "Fantastic platform! The community support and detailed analytics helped me track my progress and stay motivated throughout my preparation.",
    rating: 5,
    avatar: "CS",
    image: "/placeholder.svg"
  },
  {
    name: "Fatima Al-Zahra",
    role: "Community Nurse, NHS Greater Glasgow",
    country: "Originally from Karachi, Pakistan",
    content: "The real-time feedback feature is brilliant. It's like having a personal tutor available 24/7. Couldn't recommend it enough!",
    rating: 5,
    avatar: "FA",
    image: "/placeholder.svg"
  },
  {
    name: "Rajesh Patel",
    role: "Mental Health Nurse, South London NHS Trust",
    country: "Originally from Ahmedabad, India",
    content: "This platform made the difference between pass and fail for me. The AI simulations are so realistic, you feel like you're in a real ward.",
    rating: 5,
    avatar: "RP",
    image: "/placeholder.svg"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Success Stories from Around the World
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from international nurses who have successfully passed their OSCE exams 
            and are now thriving in the NHS.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white hover:-translate-y-2 overflow-hidden"
            >
              <CardContent className="p-6">
                <div className="mb-4">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary text-white font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-primary font-medium">{testimonial.role}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.country}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-8">Trusted by Nurses Worldwide</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-white/80">First-time Pass Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-white/80">Nurses Certified</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50+</div>
              <div className="text-white/80">Countries Represented</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-white/80">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

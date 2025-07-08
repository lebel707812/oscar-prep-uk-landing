import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Staff Nurse, Manchester Royal Infirmary",
    country: "Originally from Mumbai, India",
    content: "The AI patient simulations were incredibly realistic and culturally sensitive. I felt so prepared for my OSCE that I passed on my first attempt with flying colours! The platform truly understands the challenges international nurses face.",
    rating: 5,
    avatar: "PS",
    image: "/diverse-nurses-1.jpg"
  },
  {
    name: "Maria Santos",
    role: "Registered Nurse, Birmingham Children's Hospital",
    country: "Originally from Manila, Philippines",
    content: "The personalised study plan was a game-changer for my learning style. It focused on exactly what I needed to improve, and the feedback was spot-on. The community support made me feel less alone in this journey.",
    rating: 5,
    avatar: "MS",
    image: "/diverse-nurses-2.jpg"
  },
  {
    name: "Adaora Okafor",
    role: "Theatre Nurse, Royal London Hospital",
    country: "Originally from Lagos, Nigeria",
    content: "I was nervous about the OSCE and adapting to NHS protocols, but this platform gave me the confidence I needed. The NHS-specific scenarios were perfect preparation, and the cultural guidance was invaluable.",
    rating: 5,
    avatar: "AO",
    image: "/diverse-nurses-3.jpg"
  },
  {
    name: "Carlos Silva",
    role: "ICU Nurse, Leeds Teaching Hospitals",
    country: "Originally from São Paulo, Brazil",
    content: "Fantastic platform with excellent support for international nurses! The community support and detailed analytics helped me track my progress and stay motivated throughout my preparation journey.",
    rating: 5,
    avatar: "CS",
    image: "/hero-illustration.png"
  },
  {
    name: "Fatima Al-Zahra",
    role: "Community Nurse, NHS Greater Glasgow",
    country: "Originally from Karachi, Pakistan",
    content: "The real-time feedback feature is brilliant and culturally aware. It's like having a personal tutor available 24/7 who understands the unique challenges we face. Couldn't recommend it enough!",
    rating: 5,
    avatar: "FA",
    image: "/success-illustration.png"
  },
  {
    name: "James Thompson",
    role: "Senior Nurse, Edinburgh Royal Infirmary",
    country: "Originally from Kingston, Jamaica",
    content: "This platform helped me transition smoothly into the NHS system. The comprehensive preparation and supportive community made all the difference in my OSCE success.",
    rating: 5,
    avatar: "JT",
    image: "/study-illustration.png"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 via-background to-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 space-y-6">
          <h2 className="heading-1 text-foreground">
            Success Stories from International Nurses
          </h2>
          <p className="body-large text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Hear from nurses who have successfully passed their OSCE exams and are now thriving in the NHS. 
            Their journeys inspire and guide others on the same path to healthcare excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-strong transition-all duration-500 border border-border/50 bg-white/95 backdrop-blur-sm hover:bg-white hover:-translate-y-2 rounded-2xl overflow-hidden"
            >
              <CardContent className="p-8 space-y-6">
                {/* Quote Icon */}
                <div className="flex justify-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Quote className="h-6 w-6 text-primary" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="body-text text-muted-foreground leading-relaxed text-center italic">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-center space-y-3 pt-4 border-t border-border/50">
                  <Avatar className="w-16 h-16 border-2 border-primary/20">
                    <AvatarImage src={testimonial.image} alt={testimonial.name} />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center space-y-1">
                    <h4 className="heading-4 text-foreground font-semibold">
                      {testimonial.name}
                    </h4>
                    <p className="body-small text-primary font-medium">
                      {testimonial.role}
                    </p>
                    <p className="body-small text-muted-foreground">
                      {testimonial.country}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-primary via-primary-light to-secondary p-12 rounded-3xl text-white shadow-strong max-w-4xl mx-auto">
            <h3 className="heading-2 mb-6 text-white">Join Our Success Community</h3>
            <p className="body-large text-white/95 mb-8 max-w-3xl mx-auto leading-relaxed">
              Become part of a supportive community of international nurses who are achieving their dreams 
              of working in the NHS. Your success story could be next!
            </p>
            <button className="btn-text bg-white text-primary font-semibold px-12 py-4 rounded-xl hover:bg-muted hover:text-primary-dark transition-all duration-300 shadow-medium hover:shadow-strong transform hover:scale-105">
              Start Your Success Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;


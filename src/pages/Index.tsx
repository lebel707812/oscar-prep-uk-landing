import UnifiedHeader from "../components/ui/UnifiedHeader";
import HeroSection from "../components/HeroSection";
import BenefitsSection from "../components/BenefitsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import PricingSection from "../components/PricingSection";
import Footer from "../components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <UnifiedHeader />
      <HeroSection />
      <BenefitsSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
    </div>
  );
};

export default Index;



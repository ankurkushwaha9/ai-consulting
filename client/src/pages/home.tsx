import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { FlipCards } from "@/components/flip-cards";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <FlipCards />
      <footer className="py-8 bg-[#1a2942] text-white/60">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm" data-testid="text-footer-copyright">
            AI Request Desk - Centralized AI Request Management
          </p>
        </div>
      </footer>
    </div>
  );
}

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingChips } from "./floating-chips";
import { Link } from "wouter";

export function HeroSection() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #1a2942 0%, #2d3f5f 100%)"
        }}
      />
      
      <div 
        className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full opacity-20 blur-3xl pointer-events-none bg-[#00d9ff]"
      />

      <FloatingChips />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight"
            data-testid="text-hero-title"
          >
            Centralized AI Request
            <br />
            <span className="text-[#00d9ff]">Management Platform</span>
          </h1>
          
          <p 
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
            data-testid="text-hero-subtitle"
          >
            Streamline your organization's AI initiatives with a single hub for submitting,
            tracking, and managing all AI-related requests across departments.
          </p>

          <Link href="/submit">
            <Button
              size="lg"
              className="bg-[#00d9ff] text-[#1a2942] px-8 py-6 text-lg font-semibold rounded-lg shadow-lg shadow-[#00d9ff]/20 hover:scale-105 transition-transform duration-200"
              data-testid="button-cta-submit"
            >
              Start an AI Request Desk request
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

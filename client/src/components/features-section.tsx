import { Zap, BarChart3, ShieldCheck, Users, RefreshCw, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Streamlined Submissions",
    description: "Submit AI requests with structured forms that capture all essential information for faster processing.",
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your request status in real-time from submission to completion.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Guidelines",
    description: "Built-in examples and templates help you craft requests that get prioritized.",
  },
  {
    icon: Users,
    title: "Cross-Department",
    description: "Centralize AI initiatives across Sales, Marketing, Product, and more.",
  },
  {
    icon: RefreshCw,
    title: "Iterative Process",
    description: "Collaborate with AI teams through comments and status updates.",
  },
  {
    icon: TrendingUp,
    title: "Impact Measurement",
    description: "Track success criteria and measure the ROI of implemented AI solutions.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24 bg-card">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-features-title">
            Why AI Request Desk?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to manage AI initiatives in one centralized platform.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-none bg-transparent" data-testid={`card-feature-${index}`}>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-[#00d9ff]/10 flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-[#00d9ff]" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

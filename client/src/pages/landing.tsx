import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  BarChart3, 
  Shield, 
  Users, 
  Link2, 
  TrendingUp,
  ArrowRight,
  X,
  Check,
  Bot
} from "lucide-react";

const floatingChips = [
  { label: "Sales", position: "top-32 left-16" },
  { label: "Marketing", position: "top-64 left-8" },
  { label: "Customer Success", position: "top-24 right-20" },
  { label: "Product", position: "top-48 right-8" },
  { label: "AI tool customization", position: "bottom-48 left-12" },
  { label: "AI Agents", position: "bottom-32 right-16" },
];

const features = [
  {
    icon: Zap,
    title: "Instant Requests",
    description: "Submit and manage AI resource requests in seconds. Real-time status tracking and instant notifications keep your team informed.",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    description: "Gain deep insights into resource utilization, spending patterns, and team productivity with comprehensive dashboards.",
    iconBg: "bg-orange-100 dark:bg-orange-900/30",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with role-based access control, audit logs, and compliance features built for enterprise environments.",
    iconBg: "bg-green-100 dark:bg-green-900/30",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Built-in collaboration tools allow teams to work together seamlessly on complex AI projects and requests.",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: Link2,
    title: "Integrations",
    description: "Seamlessly integrate with your existing tools and platforms. Connect with APIs, webhooks, and popular services.",
    iconBg: "bg-cyan-100 dark:bg-cyan-900/30",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
  {
    icon: TrendingUp,
    title: "Growth Ready",
    description: "Scale with your organization. From startups to enterprises, AI Request Desk grows with your AI infrastructure needs.",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
];

const recentRequests = [
  {
    id: "A5082",
    title: "GPT-4 Access - Marketing",
    description: "Requesting API keys for the copy generation tool pilot. Estimated token usage: 1M/month.",
    status: "Pending Approval",
    statusColor: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    time: "2 hrs ago",
  },
  {
    id: "A1088",
    title: "Llama 2 Fine-tuning",
    description: "Provisioning A100 instance for 48 hours. Internal product categorization model.",
    status: "Approved",
    statusColor: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    time: "Yesterday",
  },
  {
    id: "A1012",
    title: "Embedding Service",
    description: "Vector database setup for the knowledge base search update.",
    status: "Deployed",
    statusColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    time: "Oct 24",
  },
];

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] bg-gradient-to-br from-[#1a2942] via-[#1e3a5f] to-[#2d4a6f] overflow-hidden">
      {/* Floating Department Chips */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingChips.map((chip, index) => (
          <Badge
            key={chip.label}
            variant="outline"
            className={`absolute ${chip.position} bg-white/10 backdrop-blur-sm text-white/90 border-white/20 px-4 py-2 text-sm font-medium hidden md:inline-flex animate-pulse no-default-hover-elevate no-default-active-elevate`}
            style={{ animationDelay: `${index * 0.5}s`, animationDuration: "3s" }}
            data-testid={`chip-${chip.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {chip.label}
          </Badge>
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#00d9ff] flex items-center justify-center">
            <Bot className="w-5 h-5 text-[#1a2942]" />
          </div>
          <span className="text-xl font-bold text-white">AI Desk</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-white/80">
          <span className="cursor-pointer hover:text-white transition-colors">Home</span>
          <span className="cursor-pointer hover:text-white transition-colors">Requests</span>
          <span className="cursor-pointer hover:text-white transition-colors">Models</span>
          <span className="cursor-pointer hover:text-white transition-colors">Usage</span>
          <span className="cursor-pointer hover:text-white transition-colors">Settings</span>
        </div>
        <Link href="/auth">
          <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" data-testid="button-signin">
            Sign In
          </Button>
        </Link>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-16 pb-32">
        <Badge 
          variant="outline" 
          className="bg-[#00d9ff]/20 text-[#00d9ff] border-[#00d9ff]/30 mb-8 px-4 py-1.5 no-default-hover-elevate no-default-active-elevate"
          data-testid="badge-internal-tool"
        >
          INTERNAL TOOL
        </Badge>
        
        <h1 
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          style={{ fontFamily: "'Inter', sans-serif" }}
          data-testid="text-hero-title"
        >
          <span className="text-[#00d9ff]">AI</span> Request Desk
        </h1>
        
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed" data-testid="text-hero-description">
          Centralized resource management for all your artificial intelligence needs.
          Streamline access, track usage, and manage approvals in one unified platform.
        </p>
        
        <Link href="/auth">
          <Button 
            size="lg" 
            className="bg-[#00d9ff] text-[#1a2942] hover:bg-[#00d9ff]/90 px-8 py-6 text-lg font-semibold rounded-full"
            data-testid="button-get-started"
          >
            Start an AI Request Desk request
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card 
              key={feature.title} 
              className="border border-gray-200 dark:border-gray-800 shadow-sm"
              data-testid={`card-feature-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SubmissionComparisonSection() {
  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-comparison-title">
          What a good Request submission looks like
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-12">
          Hover over the cards below to see the difference between a weak and strong submission.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Weak Submission - Flip Card */}
          <div className="relative h-80 perspective-1000 group" data-testid="card-weak-submission">
            <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
              {/* Front */}
              <Card className="absolute inset-0 border border-gray-200 dark:border-gray-800 backface-hidden">
                <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-6">
                    <X className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Weak Submission
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 italic mb-6">
                    "I need AI for marketing."
                  </p>
                  <span className="text-sm text-[#00d9ff]">
                    Hover to see why
                  </span>
                </CardContent>
              </Card>
              {/* Back */}
              <Card className="absolute inset-0 border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/50 backface-hidden rotate-y-180">
                <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-4">
                    Why This Fails
                  </h3>
                  <ul className="text-left text-sm text-red-600 dark:text-red-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>No specific business problem defined</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>No success criteria or metrics</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>No data sources mentioned</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <X className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Impossible to estimate resources</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Strong Submission - Flip Card */}
          <div className="relative h-80 perspective-1000 group" data-testid="card-strong-submission">
            <div className="relative w-full h-full transition-transform duration-500 transform-style-3d group-hover:rotate-y-180">
              {/* Front */}
              <Card className="absolute inset-0 border border-gray-200 dark:border-gray-800 backface-hidden">
                <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Strong Submission
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 italic mb-6 text-sm">
                    "I need a generative AI model to create SEO-optimized blog posts based on our product documentation..."
                  </p>
                  <span className="text-sm text-[#00d9ff]">
                    Hover to see analysis
                  </span>
                </CardContent>
              </Card>
              {/* Back */}
              <Card className="absolute inset-0 border border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950/50 backface-hidden rotate-y-180">
                <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-4">
                    Why This Works
                  </h3>
                  <ul className="text-left text-sm text-green-600 dark:text-green-300 space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Clear use case: SEO blog content</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Data source: product documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Measurable output: blog posts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>Easy to scope and estimate</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RequestFormPreview() {
  return (
    <section className="py-24 px-6 bg-white dark:bg-gray-950">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Request completeness</span>
            <span className="text-sm font-semibold text-[#00d9ff]">0%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#00d9ff] to-[#00b8d9] w-0 rounded-full transition-all duration-500" />
          </div>
        </div>

        <Card className="border border-gray-200 dark:border-gray-800" data-testid="card-form-preview">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              New Request Details
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Business Problem
                </label>
                <div className="w-full h-24 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <span className="text-gray-400 text-sm">Describe the business problem you are trying to solve...</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Existing Inputs/Data
                </label>
                <div className="w-full h-20 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <span className="text-gray-400 text-sm">What data sources or inputs are currently available?</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Constraints/Risk
                </label>
                <div className="w-full h-20 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <span className="text-gray-400 text-sm">Are there any known constraints or risks?</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Success Criteria
                </label>
                <div className="w-full h-20 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4">
                  <span className="text-gray-400 text-sm">How will you measure success?</span>
                </div>
              </div>
            </div>

            <Button 
              className="w-full mt-8 bg-[#00d9ff] text-[#1a2942] hover:bg-[#00d9ff]/90 py-6 text-lg font-semibold"
              data-testid="button-submit-preview"
            >
              Submit Request
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function RecentRequestsSection() {
  return (
    <section className="py-24 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white" data-testid="text-recent-requests-title">
            Your Recent Requests
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer hover:text-[#00d9ff] transition-colors">
            View All
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentRequests.map((request) => (
            <Card 
              key={request.id} 
              className="border border-gray-200 dark:border-gray-800 hover-elevate"
              data-testid={`card-recent-${request.id}`}
            >
              <CardContent className="p-6">
                <Badge 
                  variant="secondary" 
                  className={`${request.statusColor} text-xs font-medium mb-4 no-default-hover-elevate no-default-active-elevate`}
                >
                  {request.status}
                </Badge>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {request.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {request.description}
                </p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-500">
                  <span>Req #{request.id}</span>
                  <span>{request.time}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = {
    product: ["Features", "Pricing", "Roadmap", "Changelog"],
    company: ["About Us", "Blog", "Careers", "Press"],
    resources: ["Documentation", "Support", "Community", "Status"],
    legal: ["Privacy Policy", "Terms of Service", "Security", "Compliance"],
  };

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 uppercase text-sm tracking-wider">
              Product
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link}>
                  <span className="text-gray-600 dark:text-gray-400 text-sm cursor-pointer hover:text-[#00d9ff] transition-colors">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 uppercase text-sm tracking-wider">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link}>
                  <span className="text-gray-600 dark:text-gray-400 text-sm cursor-pointer hover:text-[#00d9ff] transition-colors">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 uppercase text-sm tracking-wider">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link}>
                  <span className="text-gray-600 dark:text-gray-400 text-sm cursor-pointer hover:text-[#00d9ff] transition-colors">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4 uppercase text-sm tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link}>
                  <span className="text-gray-600 dark:text-gray-400 text-sm cursor-pointer hover:text-[#00d9ff] transition-colors">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded bg-[#00d9ff] flex items-center justify-center">
              <Bot className="w-4 h-4 text-[#1a2942]" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">AI Desk</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            © 2024 AI Request Desk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <SubmissionComparisonSection />
      <RequestFormPreview />
      <RecentRequestsSection />
      <Footer />
    </div>
  );
}

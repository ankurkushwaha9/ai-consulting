import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Mail, MessageSquare, BookOpen, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How long does it take to get a response to my AI request?",
    answer: "Initial review typically happens within 2-3 business days. Complex requests may require additional scoping discussions. You'll receive status updates via the platform as your request progresses."
  },
  {
    question: "What makes a request more likely to be prioritized?",
    answer: "Requests with clear business impact, well-defined success criteria, and available data sources are prioritized. Following our guidelines helps ensure your request contains all the information needed for quick assessment."
  },
  {
    question: "Can I update my request after submission?",
    answer: "Yes, you can add comments and additional information to your request. For major changes, it's best to discuss with the AI team through the comments section before updating."
  },
  {
    question: "Who reviews and implements AI requests?",
    answer: "Our AI Center of Excellence reviews all requests. They include data scientists, ML engineers, and business analysts who work together to scope, prioritize, and implement solutions."
  },
  {
    question: "What happens if my request is rejected?",
    answer: "If a request is rejected, you'll receive feedback explaining why. Common reasons include insufficient data, unclear business case, or misalignment with current priorities. You can revise and resubmit based on the feedback."
  },
  {
    question: "How are AI solutions maintained after implementation?",
    answer: "Once implemented, AI solutions are monitored for performance and accuracy. Regular reviews ensure they continue to meet success criteria. You can submit follow-up requests for improvements or changes."
  }
];

const resources = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive guides on using the AI Request Desk platform.",
    link: "#"
  },
  {
    icon: MessageSquare,
    title: "Slack Channel",
    description: "Join #ai-request-desk for quick questions and community support.",
    link: "#"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Contact ai-support@company.com for technical assistance.",
    link: "mailto:ai-support@company.com"
  }
];

export default function Help() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-help-title">
              Help & Support
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-help-subtitle">
              Find answers to common questions and get support when you need it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-12">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <Card key={index} className="hover-elevate cursor-pointer" data-testid={`card-resource-${index}`}>
                  <CardHeader className="pb-2">
                    <div className="w-10 h-10 rounded-lg bg-[#00d9ff]/10 flex items-center justify-center mb-2">
                      <Icon className="w-5 h-5 text-[#00d9ff]" />
                    </div>
                    <CardTitle className="text-base">{resource.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">{resource.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card data-testid="card-faq">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#00d9ff]" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger 
                      className="text-left hover:no-underline"
                      data-testid={`accordion-trigger-${index}`}
                    >
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground" data-testid={`accordion-content-${index}`}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

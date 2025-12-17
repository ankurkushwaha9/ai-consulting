import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Lightbulb, Target, AlertTriangle, BarChart3 } from "lucide-react";

const guidelines = [
  {
    icon: Target,
    title: "Define the Business Problem Clearly",
    description: "Start with what you're trying to achieve, not what technology you want. Explain the current pain points and their impact on business outcomes.",
    tips: [
      "Quantify the problem (hours spent, costs, error rates)",
      "Explain who is affected and how",
      "Describe current workarounds and their limitations"
    ]
  },
  {
    icon: BarChart3,
    title: "Provide Data Context",
    description: "AI solutions are only as good as the data they're built on. Be specific about what data you have available.",
    tips: [
      "List all relevant data sources",
      "Note data quality and completeness",
      "Mention any access or privacy constraints"
    ]
  },
  {
    icon: AlertTriangle,
    title: "Be Honest About Constraints",
    description: "Understanding limitations helps us scope appropriately and set realistic expectations.",
    tips: [
      "Budget and timeline constraints",
      "Compliance or regulatory requirements",
      "Technical environment limitations"
    ]
  },
  {
    icon: Lightbulb,
    title: "Define Measurable Success Criteria",
    description: "How will you know if the AI solution is working? Define concrete metrics upfront.",
    tips: [
      "Specific accuracy or performance targets",
      "Time or cost savings goals",
      "User adoption or satisfaction metrics"
    ]
  }
];

const dos = [
  "Include specific numbers and metrics",
  "Reference existing tools and data sources",
  "Set realistic timelines",
  "Describe the ideal outcome",
  "Mention stakeholders involved"
];

const donts = [
  "Submit vague or open-ended requests",
  "Skip the constraints section",
  "Forget to define success criteria",
  "Request solutions without explaining the problem",
  "Assume unlimited budget or resources"
];

export default function Guidelines() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-guidelines-title">
              Request Guidelines
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto" data-testid="text-guidelines-subtitle">
              Follow these guidelines to craft effective AI requests that get prioritized and implemented faster.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {guidelines.map((guideline, index) => {
              const Icon = guideline.icon;
              return (
                <Card key={index} data-testid={`card-guideline-${index}`}>
                  <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00d9ff]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-[#00d9ff]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{guideline.title}</CardTitle>
                      <p className="text-muted-foreground text-sm mt-1">{guideline.description}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {guideline.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm text-foreground">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-green-200 dark:border-green-900/50" data-testid="card-dos">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  Do
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {dos.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-red-200 dark:border-red-900/50" data-testid="card-donts">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <XCircle className="w-5 h-5" />
                  Don't
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {donts.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

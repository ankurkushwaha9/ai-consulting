import { Navigation } from "@/components/navigation";
import { RequestForm } from "@/components/request-form";

export default function Submit() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-submit-title">
              Submit an AI Request
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto" data-testid="text-submit-subtitle">
              Fill out the form below to submit your AI request. The more detail you provide, 
              the faster we can help you.
            </p>
          </div>
          <RequestForm />
        </div>
      </div>
    </div>
  );
}

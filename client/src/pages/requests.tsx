import { Navigation } from "@/components/navigation";
import { RequestList } from "@/components/request-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "wouter";

export default function Requests() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2" data-testid="text-requests-title">
                My Requests
              </h1>
              <p className="text-muted-foreground" data-testid="text-requests-subtitle">
                Track and manage all your AI requests
              </p>
            </div>
            <Link href="/submit">
              <Button className="bg-[#00d9ff] text-[#1a2942] font-semibold" data-testid="button-new-request">
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Button>
            </Link>
          </div>
          <RequestList />
        </div>
      </div>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import type { AiRequest } from "@shared/schema";
import { format } from "date-fns";

const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: "Pending", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", icon: Clock },
  in_progress: { label: "In Progress", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400", icon: AlertCircle },
  completed: { label: "Completed", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", icon: CheckCircle },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", icon: XCircle },
};

function RequestCard({ request }: { request: AiRequest }) {
  const status = statusConfig[request.status] || statusConfig.pending;
  const StatusIcon = status.icon;

  return (
    <Card className="hover-elevate active-elevate-2 transition-all cursor-pointer" data-testid={`card-request-${request.id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 rounded-lg bg-[#00d9ff]/10 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-[#00d9ff]" />
          </div>
          <div className="min-w-0 flex-1">
            <CardTitle className="text-base font-semibold truncate" data-testid={`text-request-title-${request.id}`}>
              {request.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {request.department} &bull; {format(new Date(request.createdAt), "MMM d, yyyy")}
            </p>
          </div>
        </div>
        <Badge variant="secondary" className={`${status.color} flex-shrink-0 no-default-hover-elevate no-default-active-elevate`}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {status.label}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2" data-testid={`text-request-problem-${request.id}`}>
          {request.businessProblem}
        </p>
      </CardContent>
    </Card>
  );
}

function RequestListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-6 w-20" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
        <FileText className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2" data-testid="text-empty-state-title">
        No requests yet
      </h3>
      <p className="text-muted-foreground max-w-sm mx-auto" data-testid="text-empty-state-description">
        Submit your first AI request to get started. All your requests will appear here.
      </p>
    </div>
  );
}

export function RequestList() {
  const { data: requests, isLoading, error } = useQuery<AiRequest[]>({
    queryKey: ["/api/requests"],
  });

  if (isLoading) {
    return <RequestListSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
          <XCircle className="w-8 h-8 text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load requests</h3>
        <p className="text-muted-foreground">Please try again later.</p>
      </div>
    );
  }

  if (!requests || requests.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} />
      ))}
    </div>
  );
}

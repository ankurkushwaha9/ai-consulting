import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";
import LandingPage from "@/pages/landing";
import Home from "@/pages/home";
import Submit from "@/pages/submit";
import Requests from "@/pages/requests";
import RequestDetail from "@/pages/request-detail";
import Guidelines from "@/pages/guidelines";
import Help from "@/pages/help";
import AuthPage from "@/pages/auth-page";
import AdminPage from "@/pages/admin";
import NotFound from "@/pages/not-found";
import { Loader2 } from "lucide-react";

function LandingOrDashboard() {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a2942] to-[#2d3f5f]">
        <Loader2 className="w-8 h-8 animate-spin text-[#00d9ff]" />
      </div>
    );
  }
  
  if (user) {
    return <Home />;
  }
  
  return <LandingPage />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingOrDashboard} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/dashboard" component={Home} />
      <ProtectedRoute path="/submit" component={Submit} />
      <ProtectedRoute path="/requests" component={Requests} />
      <ProtectedRoute path="/requests/:id" component={RequestDetail} />
      <ProtectedRoute path="/guidelines" component={Guidelines} />
      <ProtectedRoute path="/help" component={Help} />
      <ProtectedRoute path="/admin" component={AdminPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Router />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

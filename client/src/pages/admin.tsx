import { Navigation } from "@/components/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, Users, Clock, CheckCircle2, XCircle, Loader2, TrendingUp } from "lucide-react";
import { USER_ROLES, type AiRequest } from "@shared/schema";
import { useLocation } from "wouter";

type Stats = {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  rejected: number;
};

type UserWithoutPassword = {
  id: string;
  username: string;
  email: string;
  role: string;
  displayName: string | null;
  createdAt: Date;
};

export default function AdminPage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const { data: stats, isLoading: statsLoading } = useQuery<Stats>({
    queryKey: ["/api/stats"],
  });

  const { data: users, isLoading: usersLoading } = useQuery<UserWithoutPassword[]>({
    queryKey: ["/api/users"],
  });

  const { data: requests, isLoading: requestsLoading } = useQuery<AiRequest[]>({
    queryKey: ["/api/requests"],
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ userId, role }: { userId: string; role: string }) => {
      const res = await apiRequest("PATCH", `/api/users/${userId}/role`, { role });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users"] });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ requestId, status }: { requestId: number; status: string }) => {
      const res = await apiRequest("PATCH", `/api/requests/${requestId}/status`, { status });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/requests"] });
      queryClient.invalidateQueries({ queryKey: ["/api/stats"] });
    },
  });

  if (user?.role !== "admin") {
    navigate("/");
    return null;
  }

  const statCards = [
    { label: "Total Requests", value: stats?.total ?? 0, icon: BarChart3, color: "text-[#00d9ff]", bg: "bg-[#00d9ff]/10" },
    { label: "Pending", value: stats?.pending ?? 0, icon: Clock, color: "text-amber-400", bg: "bg-amber-400/10" },
    { label: "In Progress", value: stats?.inProgress ?? 0, icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Completed", value: stats?.completed ?? 0, icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Rejected", value: stats?.rejected ?? 0, icon: XCircle, color: "text-red-400", bg: "bg-red-400/10" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "in_progress": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "completed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "rejected": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin": return "bg-red-500/20 text-red-400 border-red-500/30";
      case "reviewer": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default: return "bg-[#00d9ff]/20 text-[#00d9ff] border-[#00d9ff]/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2942] to-[#2d3f5f]">
      <Navigation />
      
      <main className="pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2" data-testid="text-admin-title">
              Admin Dashboard
            </h1>
            <p className="text-gray-400">Manage users, requests, and view analytics</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {statCards.map((stat) => (
              <Card key={stat.label} className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-2xl font-bold text-white" data-testid={`stat-${stat.label.toLowerCase().replace(/\s/g, '-')}`}>
                    {statsLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : stat.value}
                  </p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#00d9ff]" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                {usersLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-[#00d9ff]" />
                  </div>
                ) : users && users.length > 0 ? (
                  <div className="space-y-3">
                    {users.map((u) => (
                      <div 
                        key={u.id} 
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                        data-testid={`user-row-${u.id}`}
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">{u.username}</p>
                          <p className="text-sm text-gray-400 truncate">{u.email}</p>
                        </div>
                        <Select
                          value={u.role}
                          onValueChange={(role) => updateRoleMutation.mutate({ userId: u.id, role })}
                          disabled={u.id === user?.id || updateRoleMutation.isPending}
                        >
                          <SelectTrigger 
                            className={`w-32 ${getRoleColor(u.role)} border`}
                            data-testid={`select-role-${u.id}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {USER_ROLES.map((role) => (
                              <SelectItem key={role} value={role}>
                                {role.charAt(0).toUpperCase() + role.slice(1)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No users found</p>
                )}
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#00d9ff]" />
                  Recent Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                {requestsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-[#00d9ff]" />
                  </div>
                ) : requests && requests.length > 0 ? (
                  <div className="space-y-3">
                    {requests.slice(0, 5).map((req) => (
                      <div 
                        key={req.id} 
                        className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
                        data-testid={`request-row-${req.id}`}
                      >
                        <div className="flex-1 min-w-0 mr-4">
                          <p className="text-white font-medium truncate">{req.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs bg-white/5 text-gray-300 border-white/20">
                              {req.department}
                            </Badge>
                          </div>
                        </div>
                        <Select
                          value={req.status}
                          onValueChange={(status) => updateStatusMutation.mutate({ requestId: req.id, status })}
                          disabled={updateStatusMutation.isPending}
                        >
                          <SelectTrigger 
                            className={`w-32 ${getStatusColor(req.status)} border`}
                            data-testid={`select-status-${req.id}`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">No requests found</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

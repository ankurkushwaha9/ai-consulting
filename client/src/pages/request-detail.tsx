import { Navigation } from "@/components/navigation";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useParams, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Clock, Send, Loader2, User, MessageSquare, Trash2 } from "lucide-react";
import { type AiRequest, type Comment, REQUEST_STATUSES } from "@shared/schema";
import { useState } from "react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

type CommentWithAuthor = Comment & { author: { username: string } };

export default function RequestDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");

  const requestId = parseInt(id || "0", 10);

  const { data: request, isLoading: requestLoading } = useQuery<AiRequest>({
    queryKey: ["/api/requests", requestId],
  });

  const { data: commentsData, isLoading: commentsLoading } = useQuery<CommentWithAuthor[]>({
    queryKey: ["/api/requests", requestId, "comments"],
  });

  const addCommentMutation = useMutation({
    mutationFn: async (content: string) => {
      const res = await apiRequest("POST", `/api/requests/${requestId}/comments`, { content });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/requests", requestId, "comments"] });
      setNewComment("");
      toast({ title: "Comment added successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to add comment", description: error.message, variant: "destructive" });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async (commentId: number) => {
      await apiRequest("DELETE", `/api/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/requests", requestId, "comments"] });
      toast({ title: "Comment deleted" });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async (status: string) => {
      const res = await apiRequest("PATCH", `/api/requests/${requestId}/status`, { status });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/requests", requestId] });
      queryClient.invalidateQueries({ queryKey: ["/api/requests"] });
      toast({ title: "Status updated successfully" });
    },
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addCommentMutation.mutate(newComment.trim());
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "in_progress": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "completed": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "rejected": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const canUpdateStatus = user?.role === "admin" || user?.role === "reviewer";

  if (requestLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a2942] to-[#2d3f5f] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#00d9ff]" />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a2942] to-[#2d3f5f]">
        <Navigation />
        <main className="pt-24 pb-12 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400">Request not found</p>
            <Button onClick={() => navigate("/requests")} className="mt-4">
              Back to Requests
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a2942] to-[#2d3f5f]">
      <Navigation />
      
      <main className="pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/requests")}
            className="mb-6 text-gray-400 hover:text-white"
            data-testid="button-back"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Requests
          </Button>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-8">
            <CardHeader>
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl text-white mb-2" data-testid="text-request-title">
                    {request.title}
                  </CardTitle>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Badge variant="outline" className="bg-white/5 text-gray-300 border-white/20">
                      {request.department}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      {format(new Date(request.createdAt), "MMM d, yyyy")}
                    </div>
                  </div>
                </div>
                
                {canUpdateStatus ? (
                  <Select
                    value={request.status}
                    onValueChange={(status) => updateStatusMutation.mutate(status)}
                    disabled={updateStatusMutation.isPending}
                  >
                    <SelectTrigger 
                      className={`w-36 ${getStatusColor(request.status)} border`}
                      data-testid="select-status"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {REQUEST_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status.replace("_", " ").charAt(0).toUpperCase() + status.replace("_", " ").slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge variant="outline" className={`${getStatusColor(request.status)} border`}>
                    {request.status.replace("_", " ")}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-[#00d9ff] mb-2">Business Problem</h3>
                <p className="text-gray-300 whitespace-pre-wrap">{request.businessProblem}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-[#00d9ff] mb-2">Existing Inputs / Data Sources</h3>
                <p className="text-gray-300 whitespace-pre-wrap">{request.existingInputs}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-[#00d9ff] mb-2">Constraints</h3>
                <p className="text-gray-300 whitespace-pre-wrap">{request.constraints}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-[#00d9ff] mb-2">Success Criteria</h3>
                <p className="text-gray-300 whitespace-pre-wrap">{request.successCriteria}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[#00d9ff]" />
                Discussion ({commentsData?.length || 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitComment} className="mb-6">
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarFallback className="bg-[#00d9ff]/20 text-[#00d9ff]">
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="mb-2 bg-white/5 border-white/20 text-white placeholder:text-gray-500 resize-none"
                      rows={3}
                      data-testid="textarea-comment"
                    />
                    <Button 
                      type="submit"
                      disabled={!newComment.trim() || addCommentMutation.isPending}
                      className="bg-[#00d9ff] text-[#1a2942] hover:bg-[#00d9ff]/90"
                      data-testid="button-add-comment"
                    >
                      {addCommentMutation.isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      Post Comment
                    </Button>
                  </div>
                </div>
              </form>

              {commentsLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-[#00d9ff]" />
                </div>
              ) : commentsData && commentsData.length > 0 ? (
                <div className="space-y-4">
                  {commentsData.map((comment) => (
                    <div 
                      key={comment.id} 
                      className="flex gap-3 p-4 rounded-lg bg-white/5 border border-white/10"
                      data-testid={`comment-${comment.id}`}
                    >
                      <Avatar className="w-10 h-10 flex-shrink-0">
                        <AvatarFallback className="bg-white/10 text-gray-300">
                          {comment.author.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white">{comment.author.username}</span>
                          <span className="text-xs text-gray-500">
                            {format(new Date(comment.createdAt), "MMM d, yyyy 'at' h:mm a")}
                          </span>
                        </div>
                        <p className="text-gray-300 whitespace-pre-wrap">{comment.content}</p>
                      </div>
                      {(comment.authorId === user?.id || user?.role === "admin") && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteCommentMutation.mutate(comment.id)}
                          disabled={deleteCommentMutation.isPending}
                          className="text-gray-500 hover:text-red-400 flex-shrink-0"
                          data-testid={`button-delete-comment-${comment.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No comments yet. Be the first to comment!</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

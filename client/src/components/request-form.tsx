import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProgressBar } from "./progress-bar";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Send, Loader2 } from "lucide-react";
import { DEPARTMENTS, insertAiRequestSchema } from "@shared/schema";

// Use the shared schema directly - status is optional with default "pending"
const formSchema = insertAiRequestSchema;

type FormData = z.infer<typeof formSchema>;

export function RequestForm() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [progress, setProgress] = useState(0);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      department: "",
      businessProblem: "",
      existingInputs: "",
      constraints: "",
      successCriteria: "",
    },
    mode: "onSubmit",
  });

  const watchedFields = form.watch();

  useEffect(() => {
    const fields = [
      watchedFields.businessProblem,
      watchedFields.existingInputs,
      watchedFields.constraints,
      watchedFields.successCriteria,
    ];
    const filledCount = fields.filter(field => field && field.trim().length > 0).length;
    setProgress((filledCount / 4) * 100);
  }, [watchedFields]);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/requests", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/requests"] });
      toast({
        title: "Request Submitted",
        description: "Your AI request has been submitted successfully.",
      });
      navigate("/requests");
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <ProgressBar progress={progress} />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Request Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="E.g., Lead Scoring AI Tool" 
                      {...field} 
                      data-testid="input-title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Department</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DEPARTMENTS.map((dept) => (
                        <SelectItem key={dept} value={dept} data-testid={`option-dept-${dept.toLowerCase().replace(/\s/g, '-')}`}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="businessProblem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Problem</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the business problem you're trying to solve. Be specific about pain points, current processes, and impact on the business."
                    className="min-h-[150px] resize-none"
                    {...field}
                    data-testid="textarea-business-problem"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="existingInputs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Existing Inputs / Data Sources</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="What data, tools, or resources are currently available? E.g., CRM data, spreadsheets, APIs, historical records."
                    className="min-h-[120px] resize-none"
                    {...field}
                    data-testid="textarea-existing-inputs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="constraints"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Constraints / Risks</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="What are the limitations? E.g., budget, timeline, compliance requirements, technical constraints, data privacy concerns."
                    className="min-h-[120px] resize-none"
                    {...field}
                    data-testid="textarea-constraints"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="successCriteria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Success Criteria</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="How will you measure success? E.g., 85% accuracy, 50% time savings, ROI targets, specific KPIs."
                    className="min-h-[120px] resize-none"
                    {...field}
                    data-testid="textarea-success-criteria"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            size="lg"
            disabled={mutation.isPending}
            className="w-full bg-[#00d9ff] text-[#1a2942] font-semibold hover:scale-[1.02] transition-transform"
            data-testid="button-submit-request"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" />
                Submit Request
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

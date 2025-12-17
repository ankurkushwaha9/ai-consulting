import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Valid status values
export const REQUEST_STATUSES = ["pending", "in_progress", "completed", "rejected"] as const;
export type RequestStatus = typeof REQUEST_STATUSES[number];

// Valid departments
export const DEPARTMENTS = [
  "Sales",
  "Marketing", 
  "Customer Success",
  "Product",
  "Engineering",
  "Finance",
  "HR",
  "Operations",
  "Other"
] as const;
export type Department = typeof DEPARTMENTS[number];

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// AI Requests table
export const aiRequests = pgTable("ai_requests", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  title: text("title").notNull(),
  department: text("department").notNull(),
  businessProblem: text("business_problem").notNull(),
  existingInputs: text("existing_inputs").notNull(),
  constraints: text("constraints").notNull(),
  successCriteria: text("success_criteria").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Enhanced insert schema with validation
export const insertAiRequestSchema = createInsertSchema(aiRequests)
  .omit({
    id: true,
    createdAt: true,
  })
  .extend({
    title: z.string().min(5, "Title must be at least 5 characters").max(200),
    department: z.string().refine(
      (val) => DEPARTMENTS.includes(val as typeof DEPARTMENTS[number]),
      { message: "Please select a department" }
    ),
    businessProblem: z.string().min(20, "Business problem must be at least 20 characters").max(5000),
    existingInputs: z.string().min(10, "Existing inputs must be at least 10 characters").max(5000),
    constraints: z.string().min(10, "Constraints must be at least 10 characters").max(5000),
    successCriteria: z.string().min(10, "Success criteria must be at least 10 characters").max(5000),
    status: z.enum(REQUEST_STATUSES).optional().default("pending"),
  });

export const updateStatusSchema = z.object({
  status: z.enum(REQUEST_STATUSES),
});

export type InsertAiRequest = z.infer<typeof insertAiRequestSchema>;
export type AiRequest = typeof aiRequests.$inferSelect;

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  // Future: link requests to users
}));

export const aiRequestsRelations = relations(aiRequests, ({ one }) => ({
  // Future: link to user who created
}));

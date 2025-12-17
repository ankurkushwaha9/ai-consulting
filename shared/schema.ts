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

// User roles
export const USER_ROLES = ["submitter", "reviewer", "admin"] as const;
export type UserRole = typeof USER_ROLES[number];

// Users table
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("submitter"),
  displayName: text("display_name"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users)
  .pick({
    username: true,
    password: true,
    email: true,
  })
  .extend({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    email: z.string().email("Invalid email address"),
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
  submitterId: varchar("submitter_id").references(() => users.id),
  assignedTo: varchar("assigned_to").references(() => users.id),
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

// Comments table
export const comments = pgTable("comments", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  content: text("content").notNull(),
  requestId: integer("request_id").notNull().references(() => aiRequests.id, { onDelete: "cascade" }),
  authorId: varchar("author_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertCommentSchema = createInsertSchema(comments)
  .omit({
    id: true,
    createdAt: true,
  })
  .extend({
    content: z.string().min(1, "Comment cannot be empty").max(2000),
  });

export type InsertComment = z.infer<typeof insertCommentSchema>;
export type Comment = typeof comments.$inferSelect;

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  requests: many(aiRequests),
  comments: many(comments),
}));

export const aiRequestsRelations = relations(aiRequests, ({ one, many }) => ({
  submitter: one(users, { fields: [aiRequests.submitterId], references: [users.id] }),
  comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  request: one(aiRequests, { fields: [comments.requestId], references: [aiRequests.id] }),
  author: one(users, { fields: [comments.authorId], references: [users.id] }),
}));

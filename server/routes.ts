import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAiRequestSchema, updateStatusSchema, insertCommentSchema, USER_ROLES } from "@shared/schema";
import { z } from "zod";
import { setupAuth } from "./auth";

function requireAuth(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Authentication required" });
  }
  next();
}

function requireRole(...roles: string[]) {
  return (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }
    next();
  };
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  setupAuth(app);
  
  // Get all AI requests (reviewers and admins can see all, submitters see only their own)
  app.get("/api/requests", requireAuth, async (req, res) => {
    try {
      const userRole = req.user!.role;
      let requests;
      
      if (userRole === "admin" || userRole === "reviewer") {
        requests = await storage.getAllRequests();
      } else {
        requests = await storage.getRequestsByUser(req.user!.id);
      }
      
      res.json(requests);
    } catch (error) {
      console.error("Error fetching requests:", error);
      res.status(500).json({ message: "Failed to fetch requests" });
    }
  });

  // Get a single AI request
  app.get("/api/requests/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid request ID" });
      }
      
      const request = await storage.getRequest(id);
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
      
      const userRole = req.user!.role;
      if (userRole === "submitter" && request.submitterId !== req.user!.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.json(request);
    } catch (error) {
      console.error("Error fetching request:", error);
      res.status(500).json({ message: "Failed to fetch request" });
    }
  });

  // Create a new AI request
  app.post("/api/requests", requireAuth, async (req, res) => {
    try {
      const validatedData = insertAiRequestSchema.parse(req.body);
      const request = await storage.createRequest({
        ...validatedData,
        submitterId: req.user!.id,
      });
      res.status(201).json(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      console.error("Error creating request:", error);
      res.status(500).json({ message: "Failed to create request" });
    }
  });

  // Update request status (reviewers and admins only)
  app.patch("/api/requests/:id/status", requireRole("reviewer", "admin"), async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid request ID" });
      }
      
      const validatedData = updateStatusSchema.parse(req.body);
      
      const request = await storage.updateRequestStatus(id, validatedData.status);
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
      
      res.json(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      console.error("Error updating request status:", error);
      res.status(500).json({ message: "Failed to update request status" });
    }
  });

  // Get request statistics (admin only)
  app.get("/api/stats", requireRole("admin"), async (req, res) => {
    try {
      const stats = await storage.getRequestStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch statistics" });
    }
  });

  // Get all users (admin only)
  app.get("/api/users", requireRole("admin"), async (req, res) => {
    try {
      const allUsers = await storage.getAllUsers();
      const usersWithoutPasswords = allUsers.map(({ password, ...user }) => user);
      res.json(usersWithoutPasswords);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  // Update user role (admin only)
  app.patch("/api/users/:id/role", requireRole("admin"), async (req, res) => {
    try {
      const { role } = req.body;
      if (!USER_ROLES.includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }
      
      const user = await storage.updateUserRole(req.params.id, role);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Failed to update user role" });
    }
  });

  // Get comments for a request
  app.get("/api/requests/:id/comments", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid request ID" });
      }
      
      const request = await storage.getRequest(id);
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
      
      const userRole = req.user!.role;
      if (userRole === "submitter" && request.submitterId !== req.user!.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const requestComments = await storage.getCommentsByRequest(id);
      res.json(requestComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      res.status(500).json({ message: "Failed to fetch comments" });
    }
  });

  // Create a comment
  app.post("/api/requests/:id/comments", requireAuth, async (req, res) => {
    try {
      const requestId = parseInt(req.params.id, 10);
      if (isNaN(requestId)) {
        return res.status(400).json({ message: "Invalid request ID" });
      }
      
      const request = await storage.getRequest(requestId);
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
      
      const userRole = req.user!.role;
      if (userRole === "submitter" && request.submitterId !== req.user!.id) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const validatedData = insertCommentSchema.parse({
        ...req.body,
        requestId,
        authorId: req.user!.id,
      });
      
      const comment = await storage.createComment(validatedData);
      res.status(201).json(comment);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation failed", 
          errors: error.errors 
        });
      }
      console.error("Error creating comment:", error);
      res.status(500).json({ message: "Failed to create comment" });
    }
  });

  // Delete a comment
  app.delete("/api/comments/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid comment ID" });
      }
      
      await storage.deleteComment(id, req.user!.id);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting comment:", error);
      res.status(500).json({ message: "Failed to delete comment" });
    }
  });

  return httpServer;
}

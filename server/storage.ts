import { 
  users, 
  aiRequests,
  comments,
  type User, 
  type InsertUser, 
  type AiRequest, 
  type InsertAiRequest,
  type Comment,
  type InsertComment
} from "@shared/schema";
import { db, pool } from "./db";
import { eq, desc, sql, count } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  sessionStore: session.Store;
  
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  updateUserRole(id: string, role: string): Promise<User | undefined>;
  
  getAllRequests(): Promise<AiRequest[]>;
  getRequestsByUser(userId: string): Promise<AiRequest[]>;
  getRequest(id: number): Promise<AiRequest | undefined>;
  createRequest(request: InsertAiRequest): Promise<AiRequest>;
  updateRequestStatus(id: number, status: string): Promise<AiRequest | undefined>;
  assignRequest(id: number, assignedTo: string): Promise<AiRequest | undefined>;
  getRequestStats(): Promise<{ total: number; pending: number; inProgress: number; completed: number; rejected: number }>;
  
  getCommentsByRequest(requestId: number): Promise<(Comment & { author: { username: string } })[]>;
  createComment(comment: InsertComment): Promise<Comment>;
  deleteComment(id: number, authorId: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users).orderBy(desc(users.createdAt));
  }

  async updateUserRole(id: string, role: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ role })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getAllRequests(): Promise<AiRequest[]> {
    return db.select().from(aiRequests).orderBy(desc(aiRequests.createdAt));
  }

  async getRequestsByUser(userId: string): Promise<AiRequest[]> {
    return db
      .select()
      .from(aiRequests)
      .where(eq(aiRequests.submitterId, userId))
      .orderBy(desc(aiRequests.createdAt));
  }

  async getRequest(id: number): Promise<AiRequest | undefined> {
    const [request] = await db.select().from(aiRequests).where(eq(aiRequests.id, id));
    return request || undefined;
  }

  async createRequest(insertRequest: InsertAiRequest): Promise<AiRequest> {
    const [request] = await db
      .insert(aiRequests)
      .values(insertRequest)
      .returning();
    return request;
  }

  async updateRequestStatus(id: number, status: string): Promise<AiRequest | undefined> {
    const [request] = await db
      .update(aiRequests)
      .set({ status })
      .where(eq(aiRequests.id, id))
      .returning();
    return request || undefined;
  }

  async assignRequest(id: number, assignedTo: string): Promise<AiRequest | undefined> {
    const [request] = await db
      .update(aiRequests)
      .set({ assignedTo, status: "in_progress" })
      .where(eq(aiRequests.id, id))
      .returning();
    return request || undefined;
  }

  async getRequestStats(): Promise<{ total: number; pending: number; inProgress: number; completed: number; rejected: number }> {
    const requests = await db.select().from(aiRequests);
    return {
      total: requests.length,
      pending: requests.filter(r => r.status === "pending").length,
      inProgress: requests.filter(r => r.status === "in_progress").length,
      completed: requests.filter(r => r.status === "completed").length,
      rejected: requests.filter(r => r.status === "rejected").length,
    };
  }

  async getCommentsByRequest(requestId: number): Promise<(Comment & { author: { username: string } })[]> {
    const result = await db
      .select({
        id: comments.id,
        content: comments.content,
        requestId: comments.requestId,
        authorId: comments.authorId,
        createdAt: comments.createdAt,
        author: {
          username: users.username,
        },
      })
      .from(comments)
      .leftJoin(users, eq(comments.authorId, users.id))
      .where(eq(comments.requestId, requestId))
      .orderBy(desc(comments.createdAt));
    
    return result.map(r => ({
      ...r,
      author: { username: r.author?.username || "Unknown" },
    }));
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const [comment] = await db
      .insert(comments)
      .values(insertComment)
      .returning();
    return comment;
  }

  async deleteComment(id: number, authorId: string): Promise<boolean> {
    const result = await db
      .delete(comments)
      .where(eq(comments.id, id));
    return true;
  }
}

export const storage = new DatabaseStorage();

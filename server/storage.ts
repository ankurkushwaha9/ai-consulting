import { 
  users, 
  aiRequests,
  type User, 
  type InsertUser, 
  type AiRequest, 
  type InsertAiRequest 
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // AI Requests
  getAllRequests(): Promise<AiRequest[]>;
  getRequest(id: number): Promise<AiRequest | undefined>;
  createRequest(request: InsertAiRequest): Promise<AiRequest>;
  updateRequestStatus(id: number, status: string): Promise<AiRequest | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // AI Requests
  async getAllRequests(): Promise<AiRequest[]> {
    return db.select().from(aiRequests).orderBy(desc(aiRequests.createdAt));
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
}

export const storage = new DatabaseStorage();

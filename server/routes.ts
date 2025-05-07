import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import {
  insertUserSchema,
  insertActionSchema,
  insertGroupSchema,
  insertGroupMemberSchema,
  insertBlogPostSchema,
  insertUserChallengeSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Auth routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const data = insertUserSchema.parse(req.body);
      
      // Check if email or username already exists
      const existingEmail = await storage.getUserByEmail(data.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email đã được sử dụng" });
      }
      
      const existingUsername = await storage.getUserByUsername(data.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Tên đăng nhập đã được sử dụng" });
      }
      
      const user = await storage.createUser(data);
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Lỗi khi đăng ký" });
    }
  });
  
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email và mật khẩu là bắt buộc" });
      }
      
      const user = await storage.getUserByEmail(email);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Email hoặc mật khẩu không đúng" });
      }
      
      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi đăng nhập" });
    }
  });
  
  app.get("/api/auth/me", async (req: Request, res: Response) => {
    try {
      const { userId } = req.query;
      
      if (!userId) {
        return res.status(401).json({ message: "Không xác thực" });
      }
      
      const user = await storage.getUser(Number(userId));
      
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng" });
    }
  });
  
  // User routes
  app.get("/api/users/top", async (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit) || 5;
      const topUsers = await storage.getTopUsers(limit);
      
      // Return users without passwords
      const usersWithoutPasswords = topUsers.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      res.status(200).json(usersWithoutPasswords);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy người dùng hàng đầu" });
    }
  });
  
  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await storage.getUser(Number(id));
      
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      
      // Return user without password
      const { password, ...userWithoutPassword } = user;
      
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng" });
    }
  });
  
  app.patch("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = Number(id);
      
      // Validate user exists
      const existingUser = await storage.getUser(userId);
      if (!existingUser) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      
      // Update user
      const updatedUser = await storage.updateUser(userId, req.body);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "Không thể cập nhật người dùng" });
      }
      
      // Return user without password
      const { password, ...userWithoutPassword } = updatedUser;
      
      res.status(200).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật người dùng" });
    }
  });
  
  // Action routes
  app.post("/api/actions", async (req: Request, res: Response) => {
    try {
      const data = insertActionSchema.parse(req.body);
      
      // Validate action type
      const actionType = await storage.getActionTypeById(data.actionTypeId);
      if (!actionType) {
        return res.status(404).json({ message: "Loại hành động không tồn tại" });
      }
      
      // Validate user
      const user = await storage.getUser(data.userId);
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      
      const action = await storage.createAction(data);
      res.status(201).json(action);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Lỗi khi tạo hành động" });
    }
  });
  
  app.get("/api/actions/user/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const actions = await storage.getActionsByUserId(Number(userId));
      res.status(200).json(actions);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy hành động của người dùng" });
    }
  });
  
  app.get("/api/actions/recent/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const limit = Number(req.query.limit) || 5;
      
      const recentActions = await storage.getRecentActions(Number(userId), limit);
      
      // Get action type details for each action
      const actionsWithTypes = await Promise.all(
        recentActions.map(async (action) => {
          const actionType = await storage.getActionTypeById(action.actionTypeId);
          return {
            ...action,
            actionType
          };
        })
      );
      
      res.status(200).json(actionsWithTypes);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy hành động gần đây" });
    }
  });
  
  // Action Types routes
  app.get("/api/action-types", async (_req: Request, res: Response) => {
    try {
      const actionTypes = await storage.getAllActionTypes();
      res.status(200).json(actionTypes);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách loại hành động" });
    }
  });
  
  // Badge routes
  app.get("/api/badges", async (_req: Request, res: Response) => {
    try {
      const badges = await storage.getAllBadges();
      res.status(200).json(badges);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách danh hiệu" });
    }
  });
  
  app.get("/api/badges/user/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const badges = await storage.getUserBadges(Number(userId));
      res.status(200).json(badges);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy danh hiệu của người dùng" });
    }
  });
  
  // Group routes
  app.get("/api/groups", async (_req: Request, res: Response) => {
    try {
      const groups = await storage.getAllGroups();
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách nhóm" });
    }
  });
  
  app.get("/api/groups/top", async (req: Request, res: Response) => {
    try {
      const limit = Number(req.query.limit) || 5;
      const topGroups = await storage.getTopGroups(limit);
      res.status(200).json(topGroups);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy nhóm hàng đầu" });
    }
  });
  
  app.post("/api/groups", async (req: Request, res: Response) => {
    try {
      const data = insertGroupSchema.parse(req.body);
      
      // Validate creator
      const creator = await storage.getUser(data.createdBy);
      if (!creator) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      
      const group = await storage.createGroup(data);
      res.status(201).json(group);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Lỗi khi tạo nhóm" });
    }
  });
  
  app.get("/api/groups/user/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const groups = await storage.getUserGroups(Number(userId));
      res.status(200).json(groups);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy nhóm của người dùng" });
    }
  });
  
  app.post("/api/groups/join", async (req: Request, res: Response) => {
    try {
      const data = insertGroupMemberSchema.parse(req.body);
      
      // Validate group
      const group = await storage.getGroupById(data.groupId);
      if (!group) {
        return res.status(404).json({ message: "Nhóm không tồn tại" });
      }
      
      // Validate user
      const user = await storage.getUser(data.userId);
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      
      const groupMember = await storage.addUserToGroup(data);
      res.status(201).json(groupMember);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Lỗi khi tham gia nhóm" });
    }
  });
  
  app.get("/api/groups/:id/members", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      // Validate group
      const group = await storage.getGroupById(Number(id));
      if (!group) {
        return res.status(404).json({ message: "Nhóm không tồn tại" });
      }
      
      const members = await storage.getGroupMembers(Number(id));
      
      // Get user details for each member
      const membersWithDetails = await Promise.all(
        members.map(async (member) => {
          const user = await storage.getUser(member.userId);
          if (!user) return null;
          
          const { password, ...userWithoutPassword } = user;
          
          return {
            ...member,
            user: userWithoutPassword
          };
        })
      );
      
      // Filter out null values
      const validMembers = membersWithDetails.filter(member => member !== null);
      
      res.status(200).json(validMembers);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy thành viên nhóm" });
    }
  });
  
  // Blog routes
  app.get("/api/blog-posts", async (_req: Request, res: Response) => {
    try {
      const blogPosts = await storage.getAllBlogPosts();
      
      // Get author details for each blog post
      const postsWithAuthors = await Promise.all(
        blogPosts.map(async (post) => {
          const author = await storage.getUser(post.authorId);
          if (!author) return null;
          
          const { password, ...authorWithoutPassword } = author;
          
          return {
            ...post,
            author: authorWithoutPassword
          };
        })
      );
      
      // Filter out null values
      const validPosts = postsWithAuthors.filter(post => post !== null);
      
      res.status(200).json(validPosts);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy danh sách bài đăng" });
    }
  });
  
  app.post("/api/blog-posts", async (req: Request, res: Response) => {
    try {
      const data = insertBlogPostSchema.parse(req.body);
      
      // Validate author
      const author = await storage.getUser(data.authorId);
      if (!author) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      
      const blogPost = await storage.createBlogPost(data);
      res.status(201).json(blogPost);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Lỗi khi tạo bài đăng" });
    }
  });
  
  app.get("/api/blog-posts/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const blogPost = await storage.getBlogPostById(Number(id));
      
      if (!blogPost) {
        return res.status(404).json({ message: "Bài đăng không tồn tại" });
      }
      
      // Get author details
      const author = await storage.getUser(blogPost.authorId);
      if (!author) {
        return res.status(404).json({ message: "Tác giả không tồn tại" });
      }
      
      const { password, ...authorWithoutPassword } = author;
      
      res.status(200).json({
        ...blogPost,
        author: authorWithoutPassword
      });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy bài đăng" });
    }
  });
  
  // Challenge routes
  app.get("/api/challenges/current", async (_req: Request, res: Response) => {
    try {
      const challenge = await storage.getCurrentChallenge();
      
      if (!challenge) {
        return res.status(404).json({ message: "Không có thử thách nào đang diễn ra" });
      }
      
      res.status(200).json(challenge);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy thử thách hiện tại" });
    }
  });
  
  app.post("/api/challenges/complete", async (req: Request, res: Response) => {
    try {
      const data = insertUserChallengeSchema.parse(req.body);
      
      // Validate challenge
      const challenge = await storage.getCurrentChallenge();
      if (!challenge || challenge.id !== data.challengeId) {
        return res.status(404).json({ message: "Thử thách không tồn tại hoặc không còn hiệu lực" });
      }
      
      // Validate user
      const user = await storage.getUser(data.userId);
      if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
      }
      
      const userChallenge = await storage.completeChallenge(data);
      res.status(201).json(userChallenge);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: error.errors });
      }
      res.status(500).json({ message: "Lỗi khi hoàn thành thử thách" });
    }
  });
  
  app.get("/api/challenges/user/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const challenges = await storage.getUserCompletedChallenges(Number(userId));
      res.status(200).json(challenges);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy thử thách đã hoàn thành" });
    }
  });
  
  app.get("/api/streaks/user/:userId", async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const streak = await storage.getUserStreak(Number(userId));
      
      if (!streak) {
        return res.status(404).json({ message: "Không tìm thấy chuỗi của người dùng" });
      }
      
      res.status(200).json(streak);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy chuỗi của người dùng" });
    }
  });

  return httpServer;
}

import { pgTable, text, serial, integer, boolean, timestamp, primaryKey, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name").notNull(),
  avatar: text("avatar"),
  bio: text("bio"),
  totalPoints: integer("total_points").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  displayName: true,
  avatar: true,
  bio: true,
});

// Actions table
export const actions = pgTable("actions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  actionTypeId: integer("action_type_id").notNull(),
  description: text("description").notNull(),
  points: integer("points").notNull(),
  location: text("location"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertActionSchema = createInsertSchema(actions).pick({
  userId: true,
  actionTypeId: true,
  description: true,
  points: true,
  location: true,
  imageUrl: true,
});

// Action Types table
export const actionTypes = pgTable("action_types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  points: integer("points").notNull(),
  icon: text("icon").notNull(),
});

export const insertActionTypeSchema = createInsertSchema(actionTypes).pick({
  name: true,
  description: true,
  points: true,
  icon: true,
});

// Badges table
export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  requiredPoints: integer("required_points").notNull(),
  level: text("level").notNull(),
});

export const insertBadgeSchema = createInsertSchema(badges).pick({
  name: true,
  description: true,
  icon: true,
  requiredPoints: true,
  level: true,
});

// User Badges table (many-to-many)
export const userBadges = pgTable("user_badges", {
  userId: integer("user_id").notNull(),
  badgeId: integer("badge_id").notNull(),
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.badgeId] }),
}));

export const insertUserBadgeSchema = createInsertSchema(userBadges).pick({
  userId: true,
  badgeId: true,
});

// Groups table
export const groups = pgTable("groups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  createdBy: integer("created_by").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  memberCount: integer("member_count").default(1).notNull(),
  totalPoints: integer("total_points").default(0).notNull(),
  monthlyTarget: integer("monthly_target").default(500).notNull(),
});

export const insertGroupSchema = createInsertSchema(groups).pick({
  name: true,
  description: true,
  icon: true,
  createdBy: true,
  monthlyTarget: true,
});

// Group Members table (many-to-many)
export const groupMembers = pgTable("group_members", {
  groupId: integer("group_id").notNull(),
  userId: integer("user_id").notNull(),
  joinedAt: timestamp("joined_at").defaultNow().notNull(),
  isAdmin: boolean("is_admin").default(false).notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.groupId, t.userId] }),
}));

export const insertGroupMemberSchema = createInsertSchema(groupMembers).pick({
  groupId: true,
  userId: true,
  isAdmin: true,
});

// Blog Posts table
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  authorId: integer("author_id").notNull(),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isPublished: boolean("is_published").default(true).notNull(),
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).pick({
  title: true,
  content: true,
  authorId: true,
  imageUrl: true,
  isPublished: true,
});

// Daily Challenges table
export const dailyChallenges = pgTable("daily_challenges", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  points: integer("points").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  active: boolean("active").default(true).notNull(),
});

export const insertDailyChallengeSchema = createInsertSchema(dailyChallenges).pick({
  title: true,
  description: true,
  points: true,
  active: true,
});

// User Challenges table (many-to-many)
export const userChallenges = pgTable("user_challenges", {
  userId: integer("user_id").notNull(),
  challengeId: integer("challenge_id").notNull(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.challengeId] }),
}));

export const insertUserChallengeSchema = createInsertSchema(userChallenges).pick({
  userId: true,
  challengeId: true,
});

// Weekly Streaks table
export const weeklyStreaks = pgTable("weekly_streaks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().unique(),
  currentStreak: integer("current_streak").default(0).notNull(),
  longestStreak: integer("longest_streak").default(0).notNull(),
  lastActionDate: timestamp("last_action_date"),
});

export const insertWeeklyStreakSchema = createInsertSchema(weeklyStreaks).pick({
  userId: true,
  currentStreak: true,
  longestStreak: true,
  lastActionDate: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Action = typeof actions.$inferSelect;
export type InsertAction = z.infer<typeof insertActionSchema>;

export type ActionType = typeof actionTypes.$inferSelect;
export type InsertActionType = z.infer<typeof insertActionTypeSchema>;

export type Badge = typeof badges.$inferSelect;
export type InsertBadge = z.infer<typeof insertBadgeSchema>;

export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = z.infer<typeof insertUserBadgeSchema>;

export type Group = typeof groups.$inferSelect;
export type InsertGroup = z.infer<typeof insertGroupSchema>;

export type GroupMember = typeof groupMembers.$inferSelect;
export type InsertGroupMember = z.infer<typeof insertGroupMemberSchema>;

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type DailyChallenge = typeof dailyChallenges.$inferSelect;
export type InsertDailyChallenge = z.infer<typeof insertDailyChallengeSchema>;

export type UserChallenge = typeof userChallenges.$inferSelect;
export type InsertUserChallenge = z.infer<typeof insertUserChallengeSchema>;

export type WeeklyStreak = typeof weeklyStreaks.$inferSelect;
export type InsertWeeklyStreak = z.infer<typeof insertWeeklyStreakSchema>;

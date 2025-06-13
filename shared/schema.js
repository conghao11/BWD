"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertWeeklyStreakSchema = exports.weeklyStreaks = exports.insertUserChallengeSchema = exports.userChallenges = exports.insertDailyChallengeSchema = exports.dailyChallenges = exports.insertBlogPostSchema = exports.blogPosts = exports.insertGroupMemberSchema = exports.groupMembers = exports.insertGroupSchema = exports.groups = exports.insertUserBadgeSchema = exports.userBadges = exports.insertBadgeSchema = exports.badges = exports.insertActionTypeSchema = exports.actionTypes = exports.insertActionSchema = exports.actions = exports.insertUserSchema = exports.users = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var drizzle_zod_1 = require("drizzle-zod");
// Users table
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    username: (0, pg_core_1.text)("username").notNull().unique(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    password: (0, pg_core_1.text)("password").notNull(),
    displayName: (0, pg_core_1.text)("display_name").notNull(),
    avatar: (0, pg_core_1.text)("avatar"),
    bio: (0, pg_core_1.text)("bio"),
    totalPoints: (0, pg_core_1.integer)("total_points").default(0).notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.insertUserSchema = (0, drizzle_zod_1.createInsertSchema)(exports.users).pick({
    username: true,
    email: true,
    password: true,
    displayName: true,
    avatar: true,
    bio: true,
});
// Actions table
exports.actions = (0, pg_core_1.pgTable)("actions", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull(),
    actionTypeId: (0, pg_core_1.integer)("action_type_id").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    points: (0, pg_core_1.integer)("points").notNull(),
    location: (0, pg_core_1.text)("location"),
    imageUrl: (0, pg_core_1.text)("image_url"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.insertActionSchema = (0, drizzle_zod_1.createInsertSchema)(exports.actions).pick({
    userId: true,
    actionTypeId: true,
    description: true,
    points: true,
    location: true,
    imageUrl: true,
});
// Action Types table
exports.actionTypes = (0, pg_core_1.pgTable)("action_types", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    points: (0, pg_core_1.integer)("points").notNull(),
    icon: (0, pg_core_1.text)("icon").notNull(),
});
exports.insertActionTypeSchema = (0, drizzle_zod_1.createInsertSchema)(exports.actionTypes).pick({
    name: true,
    description: true,
    points: true,
    icon: true,
});
// Badges table
exports.badges = (0, pg_core_1.pgTable)("badges", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    icon: (0, pg_core_1.text)("icon").notNull(),
    requiredPoints: (0, pg_core_1.integer)("required_points").notNull(),
    level: (0, pg_core_1.text)("level").notNull(),
});
exports.insertBadgeSchema = (0, drizzle_zod_1.createInsertSchema)(exports.badges).pick({
    name: true,
    description: true,
    icon: true,
    requiredPoints: true,
    level: true,
});
// User Badges table (many-to-many)
exports.userBadges = (0, pg_core_1.pgTable)("user_badges", {
    userId: (0, pg_core_1.integer)("user_id").notNull(),
    badgeId: (0, pg_core_1.integer)("badge_id").notNull(),
    earnedAt: (0, pg_core_1.timestamp)("earned_at").defaultNow().notNull(),
}, function (t) { return ({
    pk: (0, pg_core_1.primaryKey)({ columns: [t.userId, t.badgeId] }),
}); });
exports.insertUserBadgeSchema = (0, drizzle_zod_1.createInsertSchema)(exports.userBadges).pick({
    userId: true,
    badgeId: true,
});
// Groups table
exports.groups = (0, pg_core_1.pgTable)("groups", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    icon: (0, pg_core_1.text)("icon").notNull(),
    createdBy: (0, pg_core_1.integer)("created_by").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    memberCount: (0, pg_core_1.integer)("member_count").default(1).notNull(),
    totalPoints: (0, pg_core_1.integer)("total_points").default(0).notNull(),
    monthlyTarget: (0, pg_core_1.integer)("monthly_target").default(500).notNull(),
});
exports.insertGroupSchema = (0, drizzle_zod_1.createInsertSchema)(exports.groups).pick({
    name: true,
    description: true,
    icon: true,
    createdBy: true,
    monthlyTarget: true,
});
// Group Members table (many-to-many)
exports.groupMembers = (0, pg_core_1.pgTable)("group_members", {
    groupId: (0, pg_core_1.integer)("group_id").notNull(),
    userId: (0, pg_core_1.integer)("user_id").notNull(),
    joinedAt: (0, pg_core_1.timestamp)("joined_at").defaultNow().notNull(),
    isAdmin: (0, pg_core_1.boolean)("is_admin").default(false).notNull(),
}, function (t) { return ({
    pk: (0, pg_core_1.primaryKey)({ columns: [t.groupId, t.userId] }),
}); });
exports.insertGroupMemberSchema = (0, drizzle_zod_1.createInsertSchema)(exports.groupMembers).pick({
    groupId: true,
    userId: true,
    isAdmin: true,
});
// Blog Posts table
exports.blogPosts = (0, pg_core_1.pgTable)("blog_posts", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    content: (0, pg_core_1.text)("content").notNull(),
    authorId: (0, pg_core_1.integer)("author_id").notNull(),
    imageUrl: (0, pg_core_1.text)("image_url"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    isPublished: (0, pg_core_1.boolean)("is_published").default(true).notNull(),
});
exports.insertBlogPostSchema = (0, drizzle_zod_1.createInsertSchema)(exports.blogPosts).pick({
    title: true,
    content: true,
    authorId: true,
    imageUrl: true,
    isPublished: true,
});
// Daily Challenges table
exports.dailyChallenges = (0, pg_core_1.pgTable)("daily_challenges", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    points: (0, pg_core_1.integer)("points").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
    active: (0, pg_core_1.boolean)("active").default(true).notNull(),
});
exports.insertDailyChallengeSchema = (0, drizzle_zod_1.createInsertSchema)(exports.dailyChallenges).pick({
    title: true,
    description: true,
    points: true,
    active: true,
});
// User Challenges table (many-to-many)
exports.userChallenges = (0, pg_core_1.pgTable)("user_challenges", {
    userId: (0, pg_core_1.integer)("user_id").notNull(),
    challengeId: (0, pg_core_1.integer)("challenge_id").notNull(),
    completedAt: (0, pg_core_1.timestamp)("completed_at").defaultNow().notNull(),
}, function (t) { return ({
    pk: (0, pg_core_1.primaryKey)({ columns: [t.userId, t.challengeId] }),
}); });
exports.insertUserChallengeSchema = (0, drizzle_zod_1.createInsertSchema)(exports.userChallenges).pick({
    userId: true,
    challengeId: true,
});
// Weekly Streaks table
exports.weeklyStreaks = (0, pg_core_1.pgTable)("weekly_streaks", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    userId: (0, pg_core_1.integer)("user_id").notNull().unique(),
    currentStreak: (0, pg_core_1.integer)("current_streak").default(0).notNull(),
    longestStreak: (0, pg_core_1.integer)("longest_streak").default(0).notNull(),
    lastActionDate: (0, pg_core_1.timestamp)("last_action_date"),
});
exports.insertWeeklyStreakSchema = (0, drizzle_zod_1.createInsertSchema)(exports.weeklyStreaks).pick({
    userId: true,
    currentStreak: true,
    longestStreak: true,
    lastActionDate: true,
});

import {
  User, InsertUser, Action, InsertAction, ActionType, InsertActionType,
  Badge, InsertBadge, UserBadge, InsertUserBadge, Group, InsertGroup,
  GroupMember, InsertGroupMember, BlogPost, InsertBlogPost,
  DailyChallenge, InsertDailyChallenge, UserChallenge, InsertUserChallenge,
  WeeklyStreak, InsertWeeklyStreak
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<User>): Promise<User | undefined>;
  getTopUsers(limit: number): Promise<User[]>;

  // Action operations
  createAction(action: InsertAction): Promise<Action>;
  getActionsByUserId(userId: number): Promise<Action[]>;
  getRecentActions(userId: number, limit: number): Promise<Action[]>;
  
  // Action Type operations
  getAllActionTypes(): Promise<ActionType[]>;
  getActionTypeById(id: number): Promise<ActionType | undefined>;
  createActionType(actionType: InsertActionType): Promise<ActionType>;
  
  // Badge operations
  getAllBadges(): Promise<Badge[]>;
  getBadgeById(id: number): Promise<Badge | undefined>;
  createBadge(badge: InsertBadge): Promise<Badge>;
  getUserBadges(userId: number): Promise<Badge[]>;
  assignBadgeToUser(userBadge: InsertUserBadge): Promise<UserBadge>;
  
  // Group operations
  getAllGroups(): Promise<Group[]>;
  getGroupById(id: number): Promise<Group | undefined>;
  getUserGroups(userId: number): Promise<Group[]>;
  createGroup(group: InsertGroup): Promise<Group>;
  addUserToGroup(groupMember: InsertGroupMember): Promise<GroupMember>;
  getGroupMembers(groupId: number): Promise<GroupMember[]>;
  getTopGroups(limit: number): Promise<Group[]>;
  
  // Blog operations
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  
  // Challenge operations
  getCurrentChallenge(): Promise<DailyChallenge | undefined>;
  getAllChallenges(): Promise<DailyChallenge[]>;
  createChallenge(challenge: InsertDailyChallenge): Promise<DailyChallenge>;
  completeChallenge(userChallenge: InsertUserChallenge): Promise<UserChallenge>;
  getUserCompletedChallenges(userId: number): Promise<DailyChallenge[]>;
  
  // Streak operations
  getUserStreak(userId: number): Promise<WeeklyStreak | undefined>;
  updateUserStreak(userId: number, data: Partial<WeeklyStreak>): Promise<WeeklyStreak>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private actions: Map<number, Action>;
  private actionTypes: Map<number, ActionType>;
  private badges: Map<number, Badge>;
  private userBadges: Map<string, UserBadge>;
  private groups: Map<number, Group>;
  private groupMembers: Map<string, GroupMember>;
  private blogPosts: Map<number, BlogPost>;
  private dailyChallenges: Map<number, DailyChallenge>;
  private userChallenges: Map<string, UserChallenge>;
  private weeklyStreaks: Map<number, WeeklyStreak>;
  
  // Auto-incremented IDs
  private userId: number = 1;
  private actionId: number = 1;
  private actionTypeId: number = 1;
  private badgeId: number = 1;
  private groupId: number = 1;
  private blogPostId: number = 1;
  private challengeId: number = 1;
  private weeklyStreakId: number = 1;

  constructor() {
    this.users = new Map();
    this.actions = new Map();
    this.actionTypes = new Map();
    this.badges = new Map();
    this.userBadges = new Map();
    this.groups = new Map();
    this.groupMembers = new Map();
    this.blogPosts = new Map();
    this.dailyChallenges = new Map();
    this.userChallenges = new Map();
    this.weeklyStreaks = new Map();
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {

    // Khởi tạo người dùng mẫu
  const user: User = {
    id: 1,
    username: "conghao",
    email: "conghao1101@gmail.com",
    password: "password123", 
    displayName: "Lê Công Hào",
    avatar: "",
    bio: "Người yêu môi trường",
    totalPoints: 100,
    createdAt: new Date()
  };
  
  this.users.set(user.id, user);
    // Create action types
    const actionTypes: InsertActionType[] = [
      { name: "Trồng cây", description: "Trồng cây xanh hoặc hoa", points: 5, icon: "ri-plant-line" },
      { name: "Tái chế", description: "Phân loại và tái chế rác thải", points: 3, icon: "ri-recycle-line" },
      { name: "Tiết kiệm năng lượng", description: "Tắt điện, sử dụng thiết bị tiết kiệm", points: 2, icon: "ri-lightbulb-flash-line" },
      { name: "Sử dụng phương tiện công cộng", description: "Sử dụng xe buýt, xe đạp thay vì xe máy", points: 3, icon: "ri-bus-line" },
      { name: "Tiết kiệm nước", description: "Sử dụng nước hợp lý", points: 2, icon: "ri-water-flash-line" },
      { name: "Dọn rác", description: "Dọn rác khu vực công cộng", points: 4, icon: "ri-delete-bin-line" }
    ];

    // Create badges
    const badges: InsertBadge[] = [
      { name: "Lá xanh", description: "Người mới bắt đầu", icon: "ri-seedling-line", requiredPoints: 0, level: "Leaf" },
      { name: "Cây non", description: "Đã tích lũy 50 điểm", icon: "ri-leaf-line", requiredPoints: 50, level: "Sapling" },
      { name: "Cây trưởng thành", description: "Đã tích lũy 100 điểm", icon: "ri-plant-line", requiredPoints: 100, level: "Tree" }
    ];

    // Create challenges
    const challenges: InsertDailyChallenge[] = [
      { title: "Mang theo chai nước cá nhân", description: "Mang theo chai nước cá nhân thay vì sử dụng chai nhựa dùng một lần.", points: 2, active: true },
      { title: "Sử dụng túi vải", description: "Sử dụng túi vải thay vì túi nilon khi đi mua sắm.", points: 2, active: true },
      { title: "Tắt đèn 1 giờ", description: "Tắt đèn và các thiết bị điện không cần thiết trong 1 giờ.", points: 2, active: true }
    ];

    // Add action types
    actionTypes.forEach(type => this.createActionType(type));
    
    // Add badges
    badges.forEach(badge => this.createBadge(badge));
    
    // Add challenges
    challenges.forEach(challenge => this.createChallenge(challenge));
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const now = new Date();
    const user: User = {
      id,
      username: insertUser.username,
      email: insertUser.email,
      password: insertUser.password,
      displayName: insertUser.displayName,
      avatar: insertUser.avatar !== undefined ? insertUser.avatar : null,
      bio: insertUser.bio !== undefined ? insertUser.bio : null,
      totalPoints: 0,
      createdAt: now
    };
    this.users.set(id, user);
    
    // Create a streak for the user
    this.weeklyStreaks.set(id, {
      id: this.weeklyStreakId++,
      userId: id,
      currentStreak: 0,
      longestStreak: 0,
      lastActionDate: null
    });
    
    // Assign beginner badge
    const beginnerBadge = Array.from(this.badges.values()).find(badge => badge.level === "Leaf" && badge.requiredPoints === 0);
    if (beginnerBadge) {
      this.assignBadgeToUser({
        userId: id,
        badgeId: beginnerBadge.id
      });
    }
    
    return user;
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...data };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getTopUsers(limit: number): Promise<User[]> {
    return Array.from(this.users.values())
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, limit);
  }

  // Action operations
  async createAction(insertAction: InsertAction): Promise<Action> {
    const id = this.actionId++;
    const now = new Date();
    const action: Action = {
      id,
      userId: insertAction.userId,
      description: insertAction.description,
      actionTypeId: insertAction.actionTypeId,
      points: insertAction.points,
      location: insertAction.location !== undefined ? insertAction.location : null,
      imageUrl: insertAction.imageUrl !== undefined ? insertAction.imageUrl : null,
      createdAt: now
    };
    this.actions.set(id, action);
    
    // Update user points
    const user = this.users.get(insertAction.userId);
    if (user) {
      const updatedUser = {
        ...user,
        totalPoints: user.totalPoints + insertAction.points
      };
      this.users.set(user.id, updatedUser);
      
      // Check for new badges
      const userBadges = await this.getUserBadges(user.id);
      const eligibleBadges = Array.from(this.badges.values())
        .filter(badge => userBadges.every(ub => ub.id !== badge.id) && badge.requiredPoints <= updatedUser.totalPoints);
      
      for (const badge of eligibleBadges) {
        await this.assignBadgeToUser({
          userId: user.id,
          badgeId: badge.id
        });
      }
      
      // Update user streak
      const streak = await this.getUserStreak(user.id);
      if (streak) {
        const lastDate = streak.lastActionDate ? new Date(streak.lastActionDate) : null;
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        // Format dates to compare just the date part (not time)
        const todayStr = today.toISOString().split('T')[0];
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        const lastDateStr = lastDate ? lastDate.toISOString().split('T')[0] : null;
        
        let currentStreak = streak.currentStreak;
        
        if (!lastDate || lastDateStr === yesterdayStr) {
          // Continued streak
          currentStreak++;
        } else if (lastDateStr !== todayStr) {
          // Broke streak, restart
          currentStreak = 1;
        }
        
        await this.updateUserStreak(user.id, {
          currentStreak,
          longestStreak: Math.max(currentStreak, streak.longestStreak),
          lastActionDate: now
        });
      }
      
      // Update group points if user is in any groups
      const userGroups = await this.getUserGroups(user.id);
      for (const group of userGroups) {
        const updatedGroup = {
          ...group,
          totalPoints: group.totalPoints + insertAction.points
        };
        this.groups.set(group.id, updatedGroup);
      }
    }
    
    return action;
  }

  async getActionsByUserId(userId: number): Promise<Action[]> {
    return Array.from(this.actions.values())
      .filter(action => action.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getRecentActions(userId: number, limit: number): Promise<Action[]> {
    return (await this.getActionsByUserId(userId)).slice(0, limit);
  }

  // Action Type operations
  async getAllActionTypes(): Promise<ActionType[]> {
    return Array.from(this.actionTypes.values());
  }

  async getActionTypeById(id: number): Promise<ActionType | undefined> {
    return this.actionTypes.get(id);
  }

  async createActionType(insertActionType: InsertActionType): Promise<ActionType> {
    const id = this.actionTypeId++;
    const actionType: ActionType = {
      id,
      ...insertActionType
    };
    this.actionTypes.set(id, actionType);
    return actionType;
  }

  // Badge operations
  async getAllBadges(): Promise<Badge[]> {
    return Array.from(this.badges.values());
  }

  async getBadgeById(id: number): Promise<Badge | undefined> {
    return this.badges.get(id);
  }

  async createBadge(insertBadge: InsertBadge): Promise<Badge> {
    const id = this.badgeId++;
    const badge: Badge = {
      id,
      ...insertBadge
    };
    this.badges.set(id, badge);
    return badge;
  }

  async getUserBadges(userId: number): Promise<Badge[]> {
    const userBadgeEntries = Array.from(this.userBadges.values())
      .filter(userBadge => userBadge.userId === userId);
    
    return userBadgeEntries.map(entry => {
      const badge = this.badges.get(entry.badgeId);
      return badge!;
    }).filter(badge => badge !== undefined);
  }

  async assignBadgeToUser(insertUserBadge: InsertUserBadge): Promise<UserBadge> {
    const key = `${insertUserBadge.userId}-${insertUserBadge.badgeId}`;
    const now = new Date();
    const userBadge: UserBadge = {
      ...insertUserBadge,
      earnedAt: now
    };
    this.userBadges.set(key, userBadge);
    return userBadge;
  }

  // Group operations
  async getAllGroups(): Promise<Group[]> {
    return Array.from(this.groups.values());
  }

  async getGroupById(id: number): Promise<Group | undefined> {
    return this.groups.get(id);
  }

  async getUserGroups(userId: number): Promise<Group[]> {
    const userGroupMemberships = Array.from(this.groupMembers.values())
      .filter(membership => membership.userId === userId);
    
    return userGroupMemberships.map(membership => {
      const group = this.groups.get(membership.groupId);
      return group!;
    }).filter(group => group !== undefined);
  }

  async createGroup(insertGroup: InsertGroup): Promise<Group> {
    const id = this.groupId++;
    const now = new Date();
    const group: Group = {
      id,
      ...insertGroup,
      createdAt: now,
      memberCount: 1,
      totalPoints: 0,
      monthlyTarget: insertGroup.monthlyTarget ?? 0
    };
    this.groups.set(id, group);
    
    // Add creator as admin
    await this.addUserToGroup({
      groupId: id,
      userId: insertGroup.createdBy,
      isAdmin: true
    });
    
    return group;
  }

  async addUserToGroup(insertGroupMember: InsertGroupMember): Promise<GroupMember> {
    const key = `${insertGroupMember.groupId}-${insertGroupMember.userId}`;
    const now = new Date();
    const groupMember: GroupMember = {
      ...insertGroupMember,
      isAdmin: insertGroupMember.isAdmin ?? false,
      joinedAt: now
    };
    this.groupMembers.set(key, groupMember);
    
    // Update member count
    const group = this.groups.get(insertGroupMember.groupId);
    if (group) {
      const updatedGroup = {
        ...group,
        memberCount: group.memberCount + 1
      };
      this.groups.set(group.id, updatedGroup);
    }
    
    return groupMember;
  }

  async getGroupMembers(groupId: number): Promise<GroupMember[]> {
    return Array.from(this.groupMembers.values())
      .filter(member => member.groupId === groupId);
  }

  async getTopGroups(limit: number): Promise<Group[]> {
    return Array.from(this.groups.values())
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, limit);
  }

  // Blog operations
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .filter(post => post.isPublished)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostId++;
    const now = new Date();
    const blogPost: BlogPost = {
      id,
      title: insertBlogPost.title,
      content: insertBlogPost.content,
      authorId: insertBlogPost.authorId,
      imageUrl: insertBlogPost.imageUrl ?? null,
      createdAt: now,
      isPublished: insertBlogPost.isPublished ?? false
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }

  // Challenge operations
  async getCurrentChallenge(): Promise<DailyChallenge | undefined> {
    const activeChallenges = Array.from(this.dailyChallenges.values())
      .filter(challenge => challenge.active);
    
    if (activeChallenges.length === 0) return undefined;
    
    // Return a random active challenge
    const randomIndex = Math.floor(Math.random() * activeChallenges.length);
    return activeChallenges[randomIndex];
  }

  async getAllChallenges(): Promise<DailyChallenge[]> {
    return Array.from(this.dailyChallenges.values());
  }

  async createChallenge(insertChallenge: InsertDailyChallenge): Promise<DailyChallenge> {
    const id = this.challengeId++;
    const now = new Date();
    const challenge: DailyChallenge = {
      id,
      ...insertChallenge,
      active: insertChallenge.active ?? false,
      createdAt: now
    };
    this.dailyChallenges.set(id, challenge);
    return challenge;
  }

  async completeChallenge(insertUserChallenge: InsertUserChallenge): Promise<UserChallenge> {
    const key = `${insertUserChallenge.userId}-${insertUserChallenge.challengeId}`;
    const now = new Date();
    const userChallenge: UserChallenge = {
      ...insertUserChallenge,
      completedAt: now
    };
    this.userChallenges.set(key, userChallenge);
    
    // Award points to user
    const challenge = this.dailyChallenges.get(insertUserChallenge.challengeId);
    const user = this.users.get(insertUserChallenge.userId);
    
    if (challenge && user) {
      const updatedUser = {
        ...user,
        totalPoints: user.totalPoints + challenge.points
      };
      this.users.set(user.id, updatedUser);
      
      // Update group points
      const userGroups = await this.getUserGroups(user.id);
      for (const group of userGroups) {
        const updatedGroup = {
          ...group,
          totalPoints: group.totalPoints + challenge.points
        };
        this.groups.set(group.id, updatedGroup);
      }
    }
    
    return userChallenge;
  }

  async getUserCompletedChallenges(userId: number): Promise<DailyChallenge[]> {
    const completedChallenges = Array.from(this.userChallenges.values())
      .filter(userChallenge => userChallenge.userId === userId);
    
    return completedChallenges.map(completed => {
      const challenge = this.dailyChallenges.get(completed.challengeId);
      return challenge!;
    }).filter(challenge => challenge !== undefined);
  }

  // Streak operations
  async getUserStreak(userId: number): Promise<WeeklyStreak | undefined> {
    return Array.from(this.weeklyStreaks.values())
      .find(streak => streak.userId === userId);
  }

  async updateUserStreak(userId: number, data: Partial<WeeklyStreak>): Promise<WeeklyStreak> {
    const streak = await this.getUserStreak(userId);
    if (!streak) {
      throw new Error(`No streak found for user ${userId}`);
    }
    
    const updatedStreak = { ...streak, ...data };
    this.weeklyStreaks.set(streak.id, updatedStreak);
    return updatedStreak;
  }
}

export const storage = new MemStorage();

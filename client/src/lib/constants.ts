// Action types
export const ACTION_TYPES = {
  PLANT_TREE: "Trồng cây",
  RECYCLE: "Tái chế",
  SAVE_ENERGY: "Tiết kiệm năng lượng",
  PUBLIC_TRANSPORT: "Sử dụng phương tiện công cộng",
  SAVE_WATER: "Tiết kiệm nước",
  CLEAN_UP: "Dọn rác"
};

// Badge levels
export const BADGE_LEVELS = {
  LEAF: "Leaf",
  SAPLING: "Sapling", 
  TREE: "Tree"
};

// Blog categories
export const BLOG_CATEGORIES = {
  ALL: "all",
  ENVIRONMENT: "environment",
  SUSTAINABLE: "sustainable",
  COMMUNITY: "community"
};

// Points thresholds for badges
export const POINTS_THRESHOLDS = {
  LEAF: 0,
  SAPLING: 50,
  TREE: 100
};

// App routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  ACTIONS: "/actions",
  LEADERBOARD: "/leaderboard",
  GROUPS: "/groups",
  BLOG: "/blog", 
  PROFILE: "/profile"
};

// Mock data - replace with actual data from API
export const SAMPLE_IMAGES = {
  DEFAULT_AVATAR: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
  DEFAULT_GROUP: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
  DEFAULT_BLOG: "https://images.unsplash.com/photo-1591025207163-942350e47db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
};

// Default monthly target for groups
export const DEFAULT_MONTHLY_TARGET = 500;

// Days of week in Vietnamese
export const DAYS_OF_WEEK = [
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư", 
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
  "Chủ Nhật"
];

// Error messages
export const ERROR_MESSAGES = {
  LOGIN_FAILED: "Đăng nhập thất bại. Vui lòng kiểm tra email và mật khẩu.",
  REGISTER_FAILED: "Đăng ký thất bại. Vui lòng thử lại.",
  ACTION_FAILED: "Không thể ghi nhận hành động. Vui lòng thử lại.",
  GROUP_CREATE_FAILED: "Không thể tạo nhóm mới. Vui lòng thử lại.",
  GROUP_JOIN_FAILED: "Không thể tham gia nhóm. Vui lòng thử lại.",
  CHALLENGE_COMPLETE_FAILED: "Không thể hoàn thành thử thách. Vui lòng thử lại."
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: "Đăng nhập thành công!",
  REGISTER_SUCCESS: "Đăng ký thành công!",
  ACTION_SUCCESS: "Hành động xanh đã được ghi nhận!",
  GROUP_CREATE_SUCCESS: "Tổ xanh mới đã được tạo!",
  GROUP_JOIN_SUCCESS: "Bạn đã tham gia Tổ xanh!",
  CHALLENGE_COMPLETE_SUCCESS: "Thử thách đã hoàn thành!"
};

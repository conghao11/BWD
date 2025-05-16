import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { migrate } from 'drizzle-orm/neon-serverless/migrator';
import ws from "ws";
import * as schema from "./shared/schema";

// Setup database connection
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set");
}

async function main() {
  console.log("🚀 Starting database schema push");
  
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });
  
  console.log("🔧 Creating tables if they don't exist...");
  
  // This will create all tables based on schema
  // We're using direct push instead of migrations for simplicity
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      display_name TEXT NOT NULL,
      avatar TEXT,
      bio TEXT,
      total_points INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS action_types (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      points INTEGER NOT NULL,
      icon TEXT NOT NULL,
      description TEXT,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS actions (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users(id),
      action_type_id INTEGER NOT NULL REFERENCES action_types(id),
      description TEXT NOT NULL,
      points INTEGER NOT NULL,
      location TEXT,
      image_url TEXT,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS badges (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      level TEXT NOT NULL,
      icon TEXT NOT NULL,
      required_points INTEGER NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS user_badges (
      user_id INTEGER NOT NULL REFERENCES users(id),
      badge_id INTEGER NOT NULL REFERENCES badges(id),
      acquired_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      PRIMARY KEY (user_id, badge_id)
    );
    
    CREATE TABLE IF NOT EXISTS groups (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      created_by INTEGER NOT NULL REFERENCES users(id),
      member_count INTEGER NOT NULL DEFAULT 0,
      total_points INTEGER NOT NULL DEFAULT 0,
      monthly_target INTEGER NOT NULL DEFAULT 500,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS group_members (
      user_id INTEGER NOT NULL REFERENCES users(id),
      group_id INTEGER NOT NULL REFERENCES groups(id),
      is_admin BOOLEAN NOT NULL DEFAULT FALSE,
      joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      PRIMARY KEY (user_id, group_id)
    );
    
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author_id INTEGER NOT NULL REFERENCES users(id),
      image_url TEXT,
      is_published BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS daily_challenges (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      points INTEGER NOT NULL,
      active BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
    
    CREATE TABLE IF NOT EXISTS user_challenges (
      user_id INTEGER NOT NULL REFERENCES users(id),
      challenge_id INTEGER NOT NULL REFERENCES daily_challenges(id),
      completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
      PRIMARY KEY (user_id, challenge_id)
    );
    
    CREATE TABLE IF NOT EXISTS weekly_streaks (
      id SERIAL PRIMARY KEY,
      user_id INTEGER NOT NULL UNIQUE REFERENCES users(id),
      current_streak INTEGER NOT NULL DEFAULT 0,
      longest_streak INTEGER NOT NULL DEFAULT 0,
      last_action_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
    );
  `);
  
  console.log("✅ Database schema pushed successfully!");
  
  // Seed initial data if needed
  await seedInitialData(db);
  
  await pool.end();
}

async function seedInitialData(db: any) {
  console.log("🌱 Checking if initial data needs to be seeded...");
  
  // Check if action types exist
  const actionTypes = await db.query.actionTypes.findMany();
  
  if (actionTypes.length === 0) {
    console.log("📝 Seeding action types...");
    
    await db.execute(`
      INSERT INTO action_types (name, points, icon, description)
      VALUES 
        ('Trồng cây', 50, 'ri-plant-line', 'Trồng một cây mới'),
        ('Tái chế', 15, 'ri-recycle-line', 'Tái chế rác thải'),
        ('Tiết kiệm năng lượng', 10, 'ri-lightbulb-flash-line', 'Tiết kiệm điện và nước'),
        ('Phương tiện công cộng', 20, 'ri-bus-line', 'Sử dụng phương tiện công cộng thay vì xe cá nhân'),
        ('Dọn rác', 25, 'ri-delete-bin-line', 'Dọn rác ở khu vực công cộng');
    `);
  }
  
  // Check if badges exist
  const badges = await db.query.badges.findMany();
  
  if (badges.length === 0) {
    console.log("🏆 Seeding badges...");
    
    await db.execute(`
      INSERT INTO badges (name, description, level, icon, required_points)
      VALUES 
        ('Tân binh xanh', 'Bắt đầu hành trình bảo vệ môi trường', 'Leaf', 'ri-leaf-line', 0),
        ('Người bảo vệ', 'Đã tích lũy 500 điểm', 'Sapling', 'ri-plant-line', 500),
        ('Chiến binh môi trường', 'Đã tích lũy 1000 điểm', 'Tree', 'ri-forest-line', 1000);
    `);
  }
  
  // Check if daily challenges exist
  const challenges = await db.query.dailyChallenges.findMany();
  
  if (challenges.length === 0) {
    console.log("🎯 Seeding daily challenges...");
    
    await db.execute(`
      INSERT INTO daily_challenges (title, description, points, active)
      VALUES 
        ('Tiết kiệm nước', 'Giảm lượng nước sử dụng hôm nay', 15, true),
        ('Đi bộ hoặc đạp xe', 'Không sử dụng phương tiện xả khói', 20, true),
        ('Thu gom rác thải nhựa', 'Thu gom ít nhất 10 chai nhựa để tái chế', 25, true);
    `);
  }
  
  console.log("✅ Initial data seeding completed!");
}

main().catch((err) => {
  console.error("❌ Error during database schema push:", err);
  process.exit(1);
});
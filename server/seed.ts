import { db } from './db'; // Đảm bảo file db.ts đã được cấu hình
import * as schema from '@shared/schema';

export async function runSeed(db: any) {
  try {
    // Xóa dữ liệu cũ để tránh xung đột khóa chính
    await db.delete(schema.users);
    await db.delete(schema.actions);
    await db.delete(schema.actionTypes);
    await db.delete(schema.badges);
    await db.delete(schema.userBadges);
    await db.delete(schema.groups);
    await db.delete(schema.groupMembers);
    await db.delete(schema.blogPosts);
    await db.delete(schema.dailyChallenges);
    await db.delete(schema.userChallenges);
    await db.delete(schema.weeklyStreaks);

    // Thêm dữ liệu mẫu cho actionTypes
    console.log('📝 Seeding action types...');
    await db.insert(schema.actionTypes).values([
      { name: 'Trồng cây', description: 'Trồng một cây mới', points: 50, icon: 'ri-plant-line' },
      { name: 'Tái chế', description: 'Tái chế rác thải', points: 15, icon: 'ri-recycle-line' },
      { name: 'Tiết kiệm năng lượng', description: 'Tiết kiệm điện và nước', points: 10, icon: 'ri-lightbulb-flash-line' },
      { name: 'Phương tiện công cộng', description: 'Sử dụng phương tiện công cộng', points: 20, icon: 'ri-bus-line' },
      { name: 'Dọn rác', description: 'Dọn rác ở khu vực công cộng', points: 25, icon: 'ri-delete-bin-line' },
    ]);

    // Thêm dữ liệu mẫu cho users
    console.log('👤 Seeding users...');
    await db.insert(schema.users).values([
      {
        username: 'user1',
        email: 'user1@example.com',
        password: 'password123',
        displayName: 'GreenUser1',
        avatar: 'http://example.com/avatar1.jpg',
        bio: 'Love planting trees!',
        totalPoints: 100,
      },
      {
        username: 'user2',
        email: 'user2@example.com',
        password: 'password123',
        displayName: 'EcoWarrior2',
        avatar: 'http://example.com/avatar2.jpg',
        bio: 'Passionate about recycling',
        totalPoints: 50,
      },
    ]);

    // Thêm dữ liệu mẫu cho actions
    console.log('📋 Seeding actions...');
    await db.insert(schema.actions).values([
      {
        userId: 1,
        actionTypeId: 1,
        description: 'Planted 5 trees in the park',
        points: 50,
        location: 'Park A',
        imageUrl: 'http://example.com/action1.jpg',
      },
      {
        userId: 2,
        actionTypeId: 2,
        description: 'Cleaned 10kg of waste at the beach',
        points: 30,
        location: 'Beach B',
        imageUrl: 'http://example.com/action2.jpg',
      },
    ]);

    // Thêm dữ liệu mẫu cho badges
    console.log('🏆 Seeding badges...');
    await db.insert(schema.badges).values([
      { name: 'Tân binh xanh', description: 'Bắt đầu hành trình bảo vệ môi trường', level: 'Leaf', icon: 'ri-leaf-line', requiredPoints: 0 },
      { name: 'Người bảo vệ', description: 'Đã tích lũy 500 điểm', level: 'Sapling', icon: 'ri-plant-line', requiredPoints: 500 },
      { name: 'Chiến binh môi trường', description: 'Đã tích lũy 1000 điểm', level: 'Tree', icon: 'ri-forest-line', requiredPoints: 1000 },
    ]);

    // Thêm dữ liệu mẫu cho userBadges
    console.log('🎗️ Seeding user badges...');
    await db.insert(schema.userBadges).values([
      { userId: 1, badgeId: 1 }, // user1 earns Tân binh xanh
    ]);

    // Thêm dữ liệu mẫu cho groups
    console.log('🏢 Seeding groups...');
    await db.insert(schema.groups).values([
      {
        name: 'Green Warriors',
        description: 'A group for eco enthusiasts',
        icon: 'group1.png',
        createdBy: 1,
        memberCount: 2,
        totalPoints: 150,
        monthlyTarget: 500,
      },
    ]);

    // Thêm dữ liệu mẫu cho groupMembers
    console.log('👥 Seeding group members...');
    await db.insert(schema.groupMembers).values([
      { groupId: 1, userId: 1, isAdmin: true },
      { groupId: 1, userId: 2, isAdmin: false },
    ]);

    // Thêm dữ liệu mẫu cho blogPosts
    console.log('📝 Seeding blog posts...');
    await db.insert(schema.blogPosts).values([
      {
        title: 'How to Plant Trees',
        content: 'A guide to planting trees effectively...',
        authorId: 1,
        imageUrl: 'http://example.com/blog1.jpg',
      },
    ]);

    // Thêm dữ liệu mẫu cho dailyChallenges
    console.log('🎯 Seeding daily challenges...');
    await db.insert(schema.dailyChallenges).values([
      { title: 'Tiết kiệm nước', description: 'Giảm lượng nước sử dụng hôm nay', points: 15, active: true },
      { title: 'Đi bộ hoặc đạp xe', description: 'Không sử dụng phương tiện xả khói', points: 20, active: true },
      { title: 'Thu gom rác thải nhựa', description: 'Thu gom ít nhất 10 chai nhựa để tái chế', points: 25, active: true },
    ]);

    // Thêm dữ liệu mẫu cho userChallenges
    console.log('✅ Seeding user challenges...');
    await db.insert(schema.userChallenges).values([
      { userId: 1, challengeId: 1 }, // user1 completed Tiết kiệm nước
    ]);

    // Thêm dữ liệu mẫu cho weeklyStreaks
    console.log('📅 Seeding weekly streaks...');
    await db.insert(schema.weeklyStreaks).values([
      { userId: 1, currentStreak: 3, longestStreak: 5 },
      { userId: 2, currentStreak: 1, longestStreak: 1 },
    ]);

    console.log('✅ Seed data inserted successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

// Cho phép chạy trực tiếp nếu cần
if (import.meta.url === `file://${process.argv[1]}`) {
  runSeed(db).catch(console.error);
}

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { 
  FiUser, FiMail, FiCalendar, FiEdit, FiActivity, 
  FiAward, FiTrendingUp, FiUsers, FiMapPin, FiSettings,
  FiCamera, FiHeart, FiList, FiPieChart, FiBarChart2
} from "react-icons/fi";
import { Tab } from "@headlessui/react";


const sampleUserProfile = {
  id: 1,
  username: "leconghao",
  displayName: "Lê Công Hào",
  email: "conghao1101@gmail.com",
  avatar: "https://i.pinimg.com/736x/74/42/8d/74428d7c7e36e1a8b3c82d0e6069a9c5.jpg",
  coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&h=300&q=80",
  bio: "Người yêu thiên nhiên, hoạt động bảo vệ môi trường từ năm 2020. Chung tay vì một Việt Nam xanh, sạch, đẹp.",
  location: "Quảng Nam, Việt Nam",
  joinedDate: "2025-01-11",
  website: "haogreen.com",
  totalPoints: 2580,
  level: "Kim cương",
  rank: 5,
  groups: [
    { id: 1, name: "Hà Nội Xanh", logo: "https://images.unsplash.com/photo-1552664199-fd31f7431a55" },
    { id: 5, name: "Huế Xanh Di Sản", logo: "https://images.unsplash.com/photo-1618588507085-c79565432917" }
  ],
  badges: [
    { id: 1, name: "Người trồng cây", icon: "🌱", description: "Đã trồng ít nhất 10 cây xanh", earnedDate: "2022-04-10" },
    { id: 2, name: "Chiến binh tái chế", icon: "♻️", description: "Đã tham gia 5 hoạt động tái chế", earnedDate: "2022-05-22" },
    { id: 3, name: "Tiết kiệm năng lượng", icon: "💡", description: "Đã tiết kiệm 100kWh điện", earnedDate: "2022-06-15" },
    { id: 4, name: "Bảo vệ nguồn nước", icon: "💧", description: "Đã tham gia 3 hoạt động làm sạch nguồn nước", earnedDate: "2022-07-30" },
    { id: 5, name: "Giảm rác thải nhựa", icon: "🚫", description: "Đã giảm 5kg rác thải nhựa", earnedDate: "2022-08-18" },
    { id: 6, name: "Người ảnh hưởng", icon: "👑", description: "Đã lan tỏa thông điệp xanh đến 100 người", earnedDate: "2022-09-25" }
  ],
  stats: {
    recentPoints: [180, 250, 120, 300, 210, 270, 190],
    activityHistory: [15, 10, 8, 20, 14, 18, 12],
    totalActions: 97,
    weeklyActions: 12,
    averagePointsPerAction: 26.6,
    streak: 18,
    longestStreak: 25,
    treesPlanted: 15,
    wasteSorted: 45,
    energySaved: 120,
    waterPreserved: 80,
    plasticReduced: 35,
    footprintReduction: 62
  }
};

// Dữ liệu mẫu cho hành động gần đây
const sampleRecentActions = [
  {
    id: 1,
    title: "Trồng 3 cây xanh tại công viên Thống Nhất",
    type: "Trồng cây",
    points: 30,
    date: "2023-05-10",
    images: ["https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"],
    location: "Công viên Thống Nhất, Hà Nội",
    description: "Tham gia chương trình trồng cây xanh tại công viên Thống Nhất cùng nhóm Hà Nội Xanh."
  },
  {
    id: 2,
    title: "Thu gom và phân loại rác thải",
    type: "Tái chế",
    points: 25,
    date: "2023-05-05",
    images: ["https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"],
    location: "Quận Hai Bà Trưng, Hà Nội",
    description: "Thu gom và phân loại 5kg rác thải tại khu vực sống."
  },
  {
    id: 3,
    title: "Sử dụng túi vải thay túi nilon trong 1 tuần",
    type: "Giảm rác thải nhựa",
    points: 20,
    date: "2023-04-28",
    images: ["https://images.unsplash.com/photo-1591503ecfcbec1cd36955096266590b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"],
    location: "Hà Nội",
    description: "Thực hiện sử dụng túi vải thay thế túi nilon trong sinh hoạt hàng ngày."
  },
  {
    id: 4,
    title: "Dọn rác bãi biển Sầm Sơn",
    type: "Bảo vệ môi trường",
    points: 35,
    date: "2023-04-20",
    images: ["https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"],
    location: "Bãi biển Sầm Sơn, Thanh Hóa",
    description: "Tham gia chiến dịch làm sạch bãi biển Sầm Sơn cùng 50 tình nguyện viên khác."
  },
  {
    id: 5,
    title: "Sử dụng năng lượng mặt trời cho gia đình",
    type: "Tiết kiệm năng lượng",
    points: 40,
    date: "2023-04-15",
    images: ["https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"],
    location: "Hà Nội",
    description: "Lắp đặt hệ thống pin năng lượng mặt trời cho gia đình, giảm sử dụng điện lưới."
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const profileItemAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const containerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const badgeAnimation = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 300, 
      damping: 15 
    }
  },
  hover: { 
    scale: 1.1,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  }
};

const chartBarAnimation = {
  hidden: { height: 0 },
  visible: (custom: number) => ({
    height: `${custom}%`,
    transition: { duration: 1, delay: 0.2 }
  })
};

//bieudo
function PerformanceChart({ data, colorClass = "bg-green-500" }: { data: number[], colorClass?: string }) {
  const max = Math.max(...data);
  
  return (
    <div className="flex items-end h-32 gap-2">
      {data.map((value, index) => (
        <motion.div
          key={index}
          className={`${colorClass} rounded-t-md`}
          style={{ width: '12%' }}
          custom={(value / max) * 100}
          variants={chartBarAnimation}
          initial="hidden"
          animate="visible"
        />
      ))}
    </div>
  );
}

//tab
function ProfileTabs() {
  const tabs = ["Tổng quan", "Hành động", "Huy hiệu", "Thống kê", "Nhóm"];
  
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              `flex-1 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
                selected
                  ? 'bg-white text-green-700 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
              }`
            }
          >
            {tab}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel>
          <Overview userProfile={sampleUserProfile} />
        </Tab.Panel>
        <Tab.Panel>
          <RecentActions actions={sampleRecentActions} />
        </Tab.Panel>
        <Tab.Panel>
          <Badges badges={sampleUserProfile.badges} />
        </Tab.Panel>
        <Tab.Panel>
          <Statistics stats={sampleUserProfile.stats} />
        </Tab.Panel>
        <Tab.Panel>
          <Groups groups={sampleUserProfile.groups} />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}


function Overview({ userProfile }: { userProfile: typeof sampleUserProfile }) {
  return (
    <div>
      <motion.div 
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        
        <motion.div 
          variants={profileItemAnimation}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm font-medium">Tổng điểm xanh</h3>
            <FiTrendingUp className="text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-600">{userProfile.totalPoints.toLocaleString()}</p>
          <p className="text-gray-500 text-sm mt-1">Cấp độ: {userProfile.level}</p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <motion.div 
                className="bg-green-600 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">75% đến cấp độ tiếp theo</p>
          </div>
        </motion.div>

        <motion.div 
          variants={profileItemAnimation}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm font-medium">Tổng số hành động</h3>
            <FiActivity className="text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-600">{userProfile.stats.totalActions}</p>
          <p className="text-gray-500 text-sm mt-1">Tuần này: {userProfile.stats.weeklyActions} hành động</p>
          <div className="mt-4 flex items-center">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
              <span className="text-xs text-gray-500">Hoàn thành</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-amber-500 mr-1"></div>
              <span className="text-xs text-gray-500">Đang tiến hành</span>
            </div>
          </div>
        </motion.div>

     
        <motion.div 
          variants={profileItemAnimation}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 text-sm font-medium">Chuỗi hoạt động liên tục</h3>
            <FiAward className="text-amber-600" />
          </div>
          <p className="text-3xl font-bold text-amber-600">{userProfile.stats.streak} ngày</p>
          <p className="text-gray-500 text-sm mt-1">Kỷ lục: {userProfile.stats.longestStreak} ngày</p>
          <div className="mt-4 flex space-x-1">
            {Array.from({ length: 7 }).map((_, index) => (
              <motion.div 
                key={index}
                className={`h-5 w-5 rounded-sm ${index < 5 ? 'bg-amber-500' : 'bg-gray-200'}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        variants={profileItemAnimation}
        initial="hidden"
        animate="visible"
        className="mt-6 bg-white rounded-xl p-6 shadow-md"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-700 font-medium">Điểm số theo thời gian</h3>
          <div className="flex space-x-2">
            <button className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md">7 ngày</button>
            <button className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-md">30 ngày</button>
            <button className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-md">90 ngày</button>
          </div>
        </div>
        <div className="pt-4">
          <PerformanceChart data={userProfile.stats.recentPoints} colorClass="bg-green-500" />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">CN</span>
            <span className="text-xs text-gray-500">T2</span>
            <span className="text-xs text-gray-500">T3</span>
            <span className="text-xs text-gray-500">T4</span>
            <span className="text-xs text-gray-500">T5</span>
            <span className="text-xs text-gray-500">T6</span>
            <span className="text-xs text-gray-500">T7</span>
          </div>
        </div>
      </motion.div>

      <motion.div 
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
        className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
      >
        <motion.div variants={profileItemAnimation} className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-2">
            <span className="text-xl">🌱</span>
          </div>
          <p className="text-xl font-bold text-green-600">{userProfile.stats.treesPlanted}</p>
          <p className="text-xs text-gray-500">Cây xanh</p>
        </motion.div>
        
        <motion.div variants={profileItemAnimation} className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-2">
            <span className="text-xl">♻️</span>
          </div>
          <p className="text-xl font-bold text-amber-600">{userProfile.stats.wasteSorted}kg</p>
          <p className="text-xs text-gray-500">Rác phân loại</p>
        </motion.div>
        
        <motion.div variants={profileItemAnimation} className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-blue-100 flex items-center justify-center mb-2">
            <span className="text-xl">💡</span>
          </div>
          <p className="text-xl font-bold text-blue-600">{userProfile.stats.energySaved}kWh</p>
          <p className="text-xs text-gray-500">Điện tiết kiệm</p>
        </motion.div>
        
        <motion.div variants={profileItemAnimation} className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-cyan-100 flex items-center justify-center mb-2">
            <span className="text-xl">💧</span>
          </div>
          <p className="text-xl font-bold text-cyan-600">{userProfile.stats.waterPreserved}L</p>
          <p className="text-xs text-gray-500">Nước tiết kiệm</p>
        </motion.div>
        
        <motion.div variants={profileItemAnimation} className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-2">
            <span className="text-xl">🚫</span>
          </div>
          <p className="text-xl font-bold text-red-600">{userProfile.stats.plasticReduced}kg</p>
          <p className="text-xs text-gray-500">Nhựa giảm thiểu</p>
        </motion.div>
        
        <motion.div variants={profileItemAnimation} className="bg-white rounded-xl p-4 shadow-md text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-purple-100 flex items-center justify-center mb-2">
            <span className="text-xl">👣</span>
          </div>
          <p className="text-xl font-bold text-purple-600">{userProfile.stats.footprintReduction}%</p>
          <p className="text-xs text-gray-500">Giảm dấu chân</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function RecentActions({ actions }: { actions: typeof sampleRecentActions }) {
  return (
    <motion.div 
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {actions.map((action) => (
        <motion.div 
          key={action.id}
          variants={profileItemAnimation}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-48 h-48 md:h-auto">
              <img className="w-full h-full object-cover" src={action.images[0]} alt={action.title} />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                  {action.type}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(action.date).toLocaleDateString('vi-VN')}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{action.title}</h3>
              <p className="text-gray-600 mb-4">{action.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-500">
                  <FiMapPin className="mr-1" />
                  <span>{action.location}</span>
                </div>
                <div className="flex items-center font-medium text-green-600">
                  {action.points} điểm
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      
      <motion.div 
        variants={profileItemAnimation}
        className="text-center"
      >
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
          Xem thêm hành động
        </button>
      </motion.div>
    </motion.div>
  );
}
//huy hieu
function Badges({ badges }: { badges: typeof sampleUserProfile.badges }) {
  return (
    <motion.div 
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      {badges.map((badge) => (
        <motion.div 
          key={badge.id}
          variants={badgeAnimation}
          whileHover="hover"
          className="bg-white rounded-xl p-6 shadow-md text-center"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-4">
            <span className="text-3xl">{badge.icon}</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{badge.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{badge.description}</p>
          <p className="text-xs text-gray-500">
            Đạt được vào {new Date(badge.earnedDate).toLocaleDateString('vi-VN')}
          </p>
        </motion.div>
      ))}
      
      <motion.div 
        variants={badgeAnimation}
        className="bg-gray-100 rounded-xl p-6 shadow-md text-center border-2 border-dashed border-gray-300 flex flex-col items-center justify-center"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4">
          <FiAward className="text-gray-400 text-2xl" />
        </div>
        <h3 className="text-lg font-semibold text-gray-400 mb-2">Huy hiệu tiếp theo</h3>
        <p className="text-sm text-gray-500">Tiếp tục các hành động xanh để mở khóa thêm huy hiệu!</p>
      </motion.div>
    </motion.div>
  );
}

// thong ke
function Statistics({ stats }: { stats: typeof sampleUserProfile.stats }) {
  return (
    <div>
      <motion.div 
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
      >
        <motion.div 
          variants={profileItemAnimation}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Điểm theo ngày trong tuần</h3>
          <PerformanceChart data={stats.recentPoints} colorClass="bg-green-500" />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">CN</span>
            <span className="text-xs text-gray-500">T2</span>
            <span className="text-xs text-gray-500">T3</span>
            <span className="text-xs text-gray-500">T4</span>
            <span className="text-xs text-gray-500">T5</span>
            <span className="text-xs text-gray-500">T6</span>
            <span className="text-xs text-gray-500">T7</span>
          </div>
        </motion.div>
        
        <motion.div 
          variants={profileItemAnimation}
          className="bg-white rounded-xl p-6 shadow-md"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Số hành động theo ngày</h3>
          <PerformanceChart data={stats.activityHistory} colorClass="bg-blue-500" />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-gray-500">CN</span>
            <span className="text-xs text-gray-500">T2</span>
            <span className="text-xs text-gray-500">T3</span>
            <span className="text-xs text-gray-500">T4</span>
            <span className="text-xs text-gray-500">T5</span>
            <span className="text-xs text-gray-500">T6</span>
            <span className="text-xs text-gray-500">T7</span>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div 
        variants={containerAnimation}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <motion.div variants={profileItemAnimation} className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-600">Số hành động</h4>
            <FiActivity className="text-blue-500" />
          </div>
          <p className="text-2xl font-bold">{stats.totalActions}</p>
          <p className="text-xs text-gray-500 mt-1">+{stats.weeklyActions} tuần này</p>
        </motion.div>
        
        <motion.div variants={profileItemAnimation} className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-600">Điểm trung bình</h4>
            <FiBarChart2 className="text-green-500" />
          </div>
          <p className="text-2xl font-bold">{stats.averagePointsPerAction}</p>
          <p className="text-xs text-gray-500 mt-1">mỗi hành động</p>
        </motion.div>
        
        <motion.div variants={profileItemAnimation} className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-600">Ngày liên tiếp</h4>
            <FiAward className="text-amber-500" />
          </div>
          <p className="text-2xl font-bold">{stats.streak}</p>
          <p className="text-xs text-gray-500 mt-1">Kỷ lục: {stats.longestStreak} ngày</p>
        </motion.div>
        
        <motion.div variants={profileItemAnimation} className="bg-white rounded-xl p-4 shadow-md">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium text-gray-600">Dấu chân xanh</h4>
            <FiPieChart className="text-purple-500" />
          </div>
          <p className="text-2xl font-bold">{stats.footprintReduction}%</p>
          <p className="text-xs text-gray-500 mt-1">giảm lượng khí thải CO2</p>
        </motion.div>
      </motion.div>
      
      <motion.div
        variants={profileItemAnimation}
        initial="hidden"
        animate="visible" 
        className="bg-white rounded-xl p-6 shadow-md"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Phân loại hành động</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm text-gray-700">Trồng cây (15%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            <span className="text-sm text-gray-700">Tái chế (32%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
            <span className="text-sm text-gray-700">Tiết kiệm năng lượng (20%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-cyan-500 mr-2"></div>
            <span className="text-sm text-gray-700">Bảo vệ nguồn nước (10%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-sm text-gray-700">Giảm rác thải nhựa (18%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            <span className="text-sm text-gray-700">Khác (5%)</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// nhom
function Groups({ groups }: { groups: typeof sampleUserProfile.groups }) {
  return (
    <motion.div
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Nhóm đã tham gia</h3>
        <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
          Khám phá thêm nhóm
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group) => (
          <motion.div
            key={group.id}
            variants={profileItemAnimation}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0">
                  <img 
                    src={`${group.logo}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80`} 
                    alt={group.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{group.name}</h3>
                  <p className="text-sm text-gray-500">Thành viên từ 04/2022</p>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Thứ hạng của bạn</p>
                  <p className="text-lg font-bold text-green-600">15/128</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Đóng góp điểm</p>
                  <p className="text-lg font-bold text-green-600">350 điểm</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <p className="text-sm">Hoạt động sắp tới:</p>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    30/05/2023
                  </span>
                </div>
                <p className="text-gray-800 font-medium mt-1">Trồng cây xanh tại công viên Thống Nhất</p>
              </div>
            </div>
          </motion.div>
        ))}
        
        <motion.div
          variants={profileItemAnimation}
          className="bg-gray-100 rounded-xl p-6 shadow-md text-center border-2 border-dashed border-gray-300 flex flex-col items-center justify-center h-full"
        >
          <div className="w-16 h-16 mx-auto rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <FiUsers className="text-gray-400 text-2xl" />
          </div>
          <h3 className="text-lg font-semibold text-gray-400 mb-2">Tham gia thêm Tổ xanh</h3>
          <p className="text-sm text-gray-500 mb-4">Kết nối với cộng đồng để cùng nhau tạo tác động lớn hơn</p>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            Khám phá Tổ xanh
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProfilePage() {
  const { user: currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const userProfile = sampleUserProfile;
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="relative rounded-xl overflow-hidden h-[250px] mb-16"
        >
          <img 
            src={userProfile.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
          
          <button 
            className="absolute top-4 right-4 bg-white/30 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors"
            onClick={() => {}}
          >
            <FiCamera className="text-white" />
          </button>
          
          <div className="absolute -bottom-12 left-6 md:left-10">
            <div className="relative">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 260, damping: 20 }}
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden"
              >
                <img 
                  src={userProfile.avatar} 
                  alt={userProfile.displayName} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <button 
                className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                onClick={() => {}}
              >
                <FiCamera className="text-gray-600" />
              </button>
            </div>
          </div>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-4 right-4 px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-800 rounded-lg font-medium hover:bg-white transition-colors flex items-center"
            onClick={() => setIsEditing(!isEditing)}
          >
            <FiEdit className="mr-2" />
            Chỉnh sửa hồ sơ
          </motion.button>
        </motion.div>
        
        <motion.div 
          className="mb-8"
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
        >
          <div className="md:flex md:justify-between">
            <div className="md:pl-28">
              <motion.h1 
                variants={profileItemAnimation}
                className="text-3xl font-bold text-gray-800"
              >
                {userProfile.displayName}
              </motion.h1>
              <motion.p 
                variants={profileItemAnimation}
                className="text-gray-500 mt-1"
              >
                @{userProfile.username}
              </motion.p>
              <motion.p 
                variants={profileItemAnimation}
                className="text-gray-700 mt-4 max-w-2xl"
              >
                {userProfile.bio}
              </motion.p>
              
              <motion.div 
                variants={profileItemAnimation}
                className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-500"
              >
                <div className="flex items-center">
                  <FiMapPin className="mr-1.5" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="mr-1.5" />
                  <span>Tham gia từ {new Date(userProfile.joinedDate).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex items-center">
                  <FiMail className="mr-1.5" />
                  <span>{userProfile.email}</span>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              variants={profileItemAnimation}
              className="mt-6 md:mt-0 flex flex-wrap gap-3"
            >
              <div className="flex flex-col items-center px-4 py-2 bg-white rounded-lg shadow-sm">
                <span className="text-lg font-bold text-gray-800">{userProfile.rank}</span>
                <span className="text-xs text-gray-500">Thứ hạng</span>
              </div>
              <div className="flex flex-col items-center px-4 py-2 bg-white rounded-lg shadow-sm">
                <span className="text-lg font-bold text-gray-800">{userProfile.stats.totalActions}</span>
                <span className="text-xs text-gray-500">Hành động</span>
              </div>
              <div className="flex flex-col items-center px-4 py-2 bg-white rounded-lg shadow-sm">
                <span className="text-lg font-bold text-gray-800">{userProfile.badges.length}</span>
                <span className="text-xs text-gray-500">Huy hiệu</span>
              </div>
              <div className="flex flex-col items-center px-4 py-2 bg-white rounded-lg shadow-sm">
                <span className="text-lg font-bold text-gray-800">{userProfile.groups.length}</span>
                <span className="text-xs text-gray-500">Nhóm</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <ProfileTabs />
      </div>
    </div>
  );
}
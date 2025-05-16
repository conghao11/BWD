import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiAward, FiTrendingUp, FiUsers, FiCalendar, FiFilter, FiUser } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { Tab } from "@headlessui/react";


const sampleUsers = [
  {
    id: 1,
    username: "nguyenthanhtung",
    displayName: "Nguyễn Thanh Tùng",
    avatar: "https://i.pinimg.com/736x/71/77/b7/7177b782f387c916d4e8c29a9a207148.jpg",
    bio: "Người yêu thiên nhiên, hoạt động bảo vệ môi trường từ 2020",
    totalPoints: 2580,
    badges: ["Người trồng cây", "Chiến binh tái chế", "Tiết kiệm năng lượng"],
    recentPoints: [180, 250, 120, 300, 210, 270, 190],
    joinedDate: "2022-03-15",
    level: "Kim cương",
    weeklyRank: 1,
    monthlyRank: 2,
    allTimeRank: 5
  },
  {
    id: 2,
    username: "phuongtuanj97",
    displayName: "Trịnh Trần Phương Tuấn",
    avatar: "https://i.pinimg.com/736x/a8/d8/38/a8d8381b1cc47c7b0fceaa5d78942182.jpg",
    bio: "Kỹ sư môi trường, đam mê sống xanh và bền vững",
    totalPoints: 2480,
    badges: ["Người trồng cây", "Bảo vệ nguồn nước", "Người ảnh hưởng"],
    recentPoints: [200, 220, 180, 240, 190, 310, 150],
    joinedDate: "2022-04-10",
    level: "Kim cương",
    weeklyRank: 2,
    monthlyRank: 1,
    allTimeRank: 8
  },
  {
    id: 3,
    username: "peter123",
    displayName: "Đặng Tiến Hoàng",
    avatar: "https://i.pinimg.com/736x/c1/ad/d8/c1add83f71ceeebc7b9b08fc34466c15.jpg",
    bio: "Sinh viên ngành Môi trường, đam mê hành động vì khí hậu",
    totalPoints: 2310,
    badges: ["Chiến binh tái chế", "Bảo vệ nguồn nước", "Giảm rác thải nhựa"],
    recentPoints: [150, 210, 220, 180, 230, 190, 260],
    joinedDate: "2022-05-05",
    level: "Kim cương",
    weeklyRank: 3,
    monthlyRank: 3,
    allTimeRank: 12
  },
  {
    id: 4,
    username: "soohyun",
    displayName: "Kim SooHyun",
    avatar: "https://i.pinimg.com/736x/6b/a8/d6/6ba8d617846cd44434bd3cc8152b55e9.jpg",
    bio: "Nhà hoạt động môi trường, người sáng lập dự án Tái chế Vì Cộng Đồng",
    totalPoints: 2150,
    badges: ["Người trồng cây", "Chiến binh tái chế", "Người ảnh hưởng"],
    recentPoints: [170, 180, 210, 160, 220, 190, 170],
    joinedDate: "2022-03-22",
    level: "Bạch kim",
    weeklyRank: 4,
    monthlyRank: 6,
    allTimeRank: 3
  },
  {
    id: 5,
    username: "chiphien",
    displayName: "Khuyến Dương",
    avatar: "https://i.pinimg.com/736x/f8/15/0a/f8150aa55ec0c130db4fe073b8fa256a.jpg",
    bio: "Yêu thiên nhiên, thích khám phá và bảo vệ hệ sinh thái",
    totalPoints: 2020,
    badges: ["Người trồng cây", "Giảm rác thải nhựa", "Tiết kiệm năng lượng"],
    recentPoints: [120, 150, 180, 210, 190, 140, 180],
    joinedDate: "2022-06-12",
    level: "Bạch kim",
    weeklyRank: 5,
    monthlyRank: 4,
    allTimeRank: 15
  },
  {
    id: 6,
    username: "tranthanhhoai",
    displayName: "Trần Thanh Hoài",
    avatar: "https://i.pravatar.cc/150?img=12",
    bio: "Kỹ sư xây dựng với niềm đam mê về kiến trúc xanh và phát triển bền vững",
    totalPoints: 1980,
    badges: ["Tiết kiệm năng lượng", "Người ảnh hưởng", "Kiến trúc xanh"],
    recentPoints: [160, 140, 190, 170, 150, 160, 210],
    joinedDate: "2022-04-28",
    level: "Bạch kim",
    weeklyRank: 6,
    monthlyRank: 5,
    allTimeRank: 21
  },
  {
    id: 7,
    username: "kicm",
    displayName: "Nguyễn Bảo Khánh",
    avatar: "https://i.pinimg.com/736x/a6/49/da/a649da6da1b79a17570f1312155c9a05.jpg",
    bio: "Nhà hoạt động bảo vệ động vật hoang dã, yêu thiên nhiên",
    totalPoints: 1850,
    badges: ["Bảo vệ động vật", "Chiến binh tái chế", "Người ảnh hưởng"],
    recentPoints: [140, 160, 170, 130, 160, 150, 180],
    joinedDate: "2022-05-19",
    level: "Bạch kim",
    weeklyRank: 7,
    monthlyRank: 8,
    allTimeRank: 25
  },
  {
    id: 8,
    username: "phamthithaoduyen",
    displayName: "Phạm Thị Thảo Duyên",
    avatar: "https://i.pravatar.cc/150?img=16",
    bio: "Giáo viên tiểu học, truyền cảm hứng cho học sinh về bảo vệ môi trường",
    totalPoints: 1790,
    badges: ["Người ảnh hưởng", "Giảm rác thải nhựa", "Người trồng cây"],
    recentPoints: [120, 140, 150, 160, 140, 130, 170],
    joinedDate: "2022-07-03",
    level: "Vàng",
    weeklyRank: 8,
    monthlyRank: 7,
    allTimeRank: 32
  },
  {
    id: 9,
    username: "nguyenduchoang",
    displayName: "Nguyễn Đức Hoàng",
    avatar: "https://i.pravatar.cc/150?img=18",
    bio: "Sinh viên IT, phát triển ứng dụng di động về môi trường",
    totalPoints: 1720,
    badges: ["Tiết kiệm năng lượng", "Công nghệ xanh", "Người ảnh hưởng"],
    recentPoints: [110, 130, 150, 140, 160, 120, 150],
    joinedDate: "2022-06-30",
    level: "Vàng",
    weeklyRank: 9,
    monthlyRank: 11,
    allTimeRank: 40
  },
  {
    id: 10,
    username: "ledinhloi",
    displayName: "Lê Đình Lợi",
    avatar: "https://i.pravatar.cc/150?img=20",
    bio: "Nhiếp ảnh gia môi trường, kể câu chuyện về thiên nhiên qua ảnh",
    totalPoints: 1650,
    badges: ["Người ảnh hưởng", "Bảo vệ nguồn nước", "Chiến binh tái chế"],
    recentPoints: [120, 110, 140, 130, 150, 110, 140],
    joinedDate: "2022-08-05",
    level: "Vàng",
    weeklyRank: 10,
    monthlyRank: 9,
    allTimeRank: 45
  }
];

const sampleGroups = [
  {
    id: 1,
    name: "Hà Nội Xanh",
    location: "Hà Nội",
    memberCount: 1258,
    totalPoints: 12580,
    logo: "https://images.unsplash.com/photo-1552664199-fd31f7431a55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    recentPoints: [900, 1050, 850, 1200, 1100, 980, 1090],
    weeklyRank: 2,
    monthlyRank: 1,
    allTimeRank: 3
  },
  {
    id: 2,
    name: "Sài Gòn Trong Lành",
    location: "TP. Hồ Chí Minh",
    memberCount: 945,
    totalPoints: 12350,
    logo: "https://images.unsplash.com/photo-1622032493018-0ababe9513d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    recentPoints: [950, 980, 900, 1150, 1050, 1200, 1020],
    weeklyRank: 1,
    monthlyRank: 2,
    allTimeRank: 5
  },
  {
    id: 3,
    name: "Đà Nẵng Xanh Sạch",
    location: "Đà Nẵng",
    memberCount: 725,
    totalPoints: 10720,
    logo: "https://images.unsplash.com/photo-1548407260-da850faa41e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    recentPoints: [750, 820, 780, 900, 850, 780, 920],
    weeklyRank: 3,
    monthlyRank: 3,
    allTimeRank: 8
  },
  {
    id: 4,
    name: "Nha Trang Biển Xanh",
    location: "Nha Trang, Khánh Hòa",
    memberCount: 632,
    totalPoints: 9460,
    logo: "https://images.unsplash.com/photo-1582847175507-e6cc9d542c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    recentPoints: [650, 720, 680, 750, 820, 700, 880],
    weeklyRank: 5,
    monthlyRank: 4,
    allTimeRank: 12
  },
  {
    id: 5,
    name: "Huế Xanh Di Sản",
    location: "Huế, Thừa Thiên Huế",
    memberCount: 514,
    totalPoints: 8920,
    logo: "https://images.unsplash.com/photo-1618588507085-c79565432917?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    recentPoints: [600, 650, 720, 680, 750, 620, 800],
    weeklyRank: 4,
    monthlyRank: 5,
    allTimeRank: 15
  },
  {
    id: 6,
    name: "Tây Nguyên Rừng Xanh",
    location: "Đắk Lắk",
    memberCount: 428,
    totalPoints: 7580,
    logo: "https://images.unsplash.com/photo-1612387290123-34af734b5063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    recentPoints: [500, 580, 620, 550, 680, 580, 720],
    weeklyRank: 6,
    monthlyRank: 6,
    allTimeRank: 18
  },
  {
    id: 7,
    name: "Mekong Xanh",
    location: "Cần Thơ",
    memberCount: 386,
    totalPoints: 6920,
    logo: "https://images.unsplash.com/photo-1584415326659-a6a694b13c0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    recentPoints: [450, 520, 580, 500, 620, 550, 650],
    weeklyRank: 7,
    monthlyRank: 7,
    allTimeRank: 20
  },
  {
    id: 8,
    name: "Xanh Hòa Bình",
    location: "Hòa Bình",
    memberCount: 352,
    totalPoints: 6450,
    logo: "https://images.unsplash.com/photo-1596731498067-65a378cc1393?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    recentPoints: [420, 480, 520, 450, 580, 500, 600],
    weeklyRank: 8,
    monthlyRank: 9,
    allTimeRank: 22
  },
  {
    id: 9,
    name: "Phú Quốc Xanh",
    location: "Phú Quốc, Kiên Giang",
    memberCount: 321,
    totalPoints: 5980,
    logo: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    recentPoints: [380, 450, 500, 420, 550, 480, 580],
    weeklyRank: 9,
    monthlyRank: 8,
    allTimeRank: 25
  },
  {
    id: 10,
    name: "Hạ Long Xanh",
    location: "Hạ Long, Quảng Ninh",
    memberCount: 298,
    totalPoints: 5650,
    logo: "https://images.unsplash.com/photo-1591275644100-6de8a56f9397?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    recentPoints: [350, 420, 470, 400, 520, 450, 540],
    weeklyRank: 10,
    monthlyRank: 10,
    allTimeRank: 30
  }
];

//animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: { 
    duration: 2,
    ease: "easeInOut",
    times: [0, 0.5, 1],
    repeat: Infinity
  }
};

function getRankColorClass(rank: number) {
  if (rank === 1) return "from-yellow-400 to-yellow-600"; 
  if (rank === 2) return "from-gray-300 to-gray-500"; 
  if (rank === 3) return "from-amber-600 to-amber-800"; 
  return "from-green-500 to-green-700"; 
}

function PerformanceChart({ data, colorClass = "bg-green-500" }: { data: number[], colorClass?: string }) {
  const max = Math.max(...data);
  
  return (
    <div className="flex items-end h-10 gap-1">
      {data.map((value, index) => (
        <motion.div
          key={index}
          className={`${colorClass} rounded-sm`}
          style={{ 
            height: `${(value / max) * 100}%`, 
            width: '8px'
          }}
          initial={{ height: 0 }}
          animate={{ height: `${(value / max) * 100}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
        />
      ))}
    </div>
  );
}

const tabs = ["Tuần này", "Tháng này", "Tất cả"];

export default function Leaderboard() {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [filterType, setFilterType] = useState<"individual" | "group">("individual");
  
  const users = sampleUsers;
  const groups = sampleGroups;
  const isLoading = false;
  
  const getRankField = () => {
    switch(activeTab) {
      case 0: return "weeklyRank";
      case 1: return "monthlyRank";
      case 2: return "allTimeRank";
      default: return "weeklyRank";
    }
  };
  
  //sapxep
  const sortedUsers = [...users].sort((a, b) => {
    const rankField = getRankField();
    return (a[rankField as keyof typeof a] as number) - (b[rankField as keyof typeof b] as number);
  });
  
  const sortedGroups = [...groups].sort((a, b) => {
    const rankField = getRankField();
    return (a[rankField as keyof typeof a] as number) - (b[rankField as keyof typeof b] as number);
  });
  
  const displayData = filterType === "individual" ? sortedUsers : sortedGroups;

  useEffect(() => {
  }, [activeTab, filterType]);
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
  
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative rounded-xl overflow-hidden h-[200px] md:h-[300px] mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-90"></div>
          <img 
            src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Leaderboard banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12">
            <motion.h1 
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Bảng Xếp Hạng
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-white max-w-2xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Vinh danh những cá nhân và nhóm nỗ lực bảo vệ môi trường trong cộng đồng GreenChallenge
            </motion.p>
          </div>
        </motion.div>

        <div className="bg-white rounded-xl shadow-md mb-8 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            
            <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
              <Tab.List className="flex p-1 space-x-1 bg-gray-100 rounded-lg max-w-md">
                {tabs.map((tab) => (
                  <Tab
                    key={tab}
                    className={({ selected }) =>
                      `w-full py-2 text-sm font-medium rounded-md transition-all duration-200 ${
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
            </Tab.Group>
                      
            <div className="flex items-center bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setFilterType("individual")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  filterType === "individual"
                    ? "bg-white text-green-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <span className="flex items-center">
                  <FiUsers className="mr-1.5" />
                  Cá nhân
                </span>
              </button>
              <button
                onClick={() => setFilterType("group")}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  filterType === "group"
                    ? "bg-white text-green-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                <span className="flex items-center">
                  <FiUsers className="mr-1.5" />
                  Nhóm
                </span>
              </button>
            </div>
          </div>
        </div>
        
        <motion.div 
          className="mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Top 3 Nổi Bật</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayData.slice(0, 3).map((item, index) => {
              const rank = index + 1;
              const isUser = 'username' in item; //kt user
              
              return (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className={`relative bg-gradient-to-r ${getRankColorClass(rank)} text-white rounded-t-xl p-4`}>
                    <div className="absolute -top-4 -right-4">
                      <motion.div
                        animate={pulseAnimation}
                        className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-lg"
                      >
                        <span className="text-2xl font-bold" style={{ 
                          background: `linear-gradient(to bottom right, ${rank === 1 ? '#FFD700' : rank === 2 ? '#C0C0C0' : '#CD7F32'}, ${rank === 1 ? '#FFA500' : rank === 2 ? '#A9A9A9' : '#8B4513'})`,
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}>
                          #{rank}
                        </span>
                      </motion.div>
                    </div>
                    
                    <div className="flex justify-center mb-2">
                      <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden">
                        <img 
                          src={isUser ? item.avatar : item.logo} 
                          alt={isUser ? item.displayName : item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-xl font-bold truncate">
                        {isUser ? item.displayName : item.name}
                      </h3>
                      <p className="text-sm text-white/80 truncate">
                        {isUser ? `@${item.username}` : item.location}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-b-xl shadow-md">
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">Điểm số</span>
                        <span className="text-lg font-bold text-green-600">
                          {item.totalPoints.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div 
                          className={`h-2 rounded-full bg-gradient-to-r ${getRankColorClass(rank)}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(item.totalPoints / displayData[0].totalPoints) * 100}%` }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">Hiệu suất 7 ngày</span>
                      </div>
                      <PerformanceChart 
                        data={item.recentPoints} 
                        colorClass={rank === 1 ? "bg-yellow-500" : rank === 2 ? "bg-gray-400" : rank === 3 ? "bg-amber-600" : "bg-green-500"}
                      />
                    </div>
                    
                    {isUser && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {(item as typeof users[0]).badges.slice(0, 2).map((badge, idx) => (
                          <span key={idx} className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                            {badge}
                          </span>
                        ))}
                        {(item as typeof users[0]).badges.length > 2 && (
                          <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                            +{(item as typeof users[0]).badges.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {!isUser && (
                      <div className="flex items-center text-sm text-gray-500 mt-3">
                        <FiUsers className="mr-1" />
                        <span>{(item as typeof groups[0]).memberCount.toLocaleString()} thành viên</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-800">Bảng Xếp Hạng Đầy Đủ</h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              {displayData.slice(3).map((item, index) => {
                const rank = index + 4; 
                const isUser = 'username' in item;
                
                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${
                      currentUser && isUser && currentUser.id === item.id ? "bg-green-50" : ""
                    }`}
                  >
                    <div className="flex-shrink-0 w-12 text-center">
                      <span className={`font-bold text-lg ${
                        rank <= 10 ? "text-green-600" : "text-gray-500"
                      }`}>{rank}</span>
                    </div>
                    
                    <div className="flex-shrink-0 ml-2">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img 
                          src={isUser ? item.avatar : item.logo} 
                          alt={isUser ? item.displayName : item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-grow">
                      <h3 className="font-medium text-gray-900">{isUser ? item.displayName : item.name}</h3>
                      <p className="text-sm text-gray-500 truncate">
                        {isUser ? `@${item.username}` : `${item.location} • ${item.memberCount.toLocaleString()} thành viên`}
                      </p>
                    </div>
                    
                    <div className="ml-2 md:flex items-center hidden">
                      <div className="w-24 md:w-32">
                        <PerformanceChart data={item.recentPoints} />
                      </div>
                    </div>
                    
                    <div className="ml-4 text-right">
                      <div className="font-bold text-green-600">{item.totalPoints.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">điểm</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
        
        <motion.div 
          className="mt-12 bg-green-50 rounded-xl p-6 sm:p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="md:flex justify-between items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Làm thế nào để tăng thứ hạng?</h3>
              <p className="text-gray-600">Tham gia các hoạt động bảo vệ môi trường, ghi lại hành động xanh hàng ngày và tham gia vào các Tổ xanh để nhận thêm điểm</p>
            </div>
            <div>
              <a 
                href="/actions/new"
                className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Thêm hành động mới
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
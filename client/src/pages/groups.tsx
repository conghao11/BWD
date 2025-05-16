import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiUsers, FiMapPin, FiCalendar, FiPlus, FiAward, FiUser } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";


const sampleGroups = [
  {
    id: 1,
    name: "Hà Nội Xanh",
    description: "Cùng nhau hành động vì một Hà Nội xanh hơn, sạch hơn và đáng sống hơn.",
    memberCount: 1258,
    location: "Hà Nội",
    foundedDate: "2025-03-15",
    totalActions: 230,
    coverImage: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    profileImage: "https://images.unsplash.com/photo-1552664199-fd31f7431a55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    topMembers: [
      { id: 1, name: "Nguyễn Văn A", avatar: "https://i.pravatar.cc/150?img=1" },
      { id: 2, name: "Trần Thị B", avatar: "https://i.pravatar.cc/150?img=5" },
      { id: 3, name: "Lê Văn C", avatar: "https://i.pravatar.cc/150?img=7" }
    ],
    recentActivities: [
      { id: 101, title: "Dọn rác Hồ Tây", date: "2025-08-10" },
      { id: 102, title: "Trồng 100 cây xanh tại công viên Thống Nhất", date: "2025-07-22" }
    ],
    isJoined: true
  },
  {
    id: 2,
    name: "Sài Gòn Trong Lành",
    description: "Nhóm hoạt động vì môi trường tại TP.HCM, tập trung vào giảm ô nhiễm không khí và tăng cường không gian xanh.",
    memberCount: 945,
    location: "TP. Hồ Chí Minh",
    foundedDate: "2025-05-22",
    totalActions: 175,
    coverImage: "https://images.unsplash.com/photo-1540870171792-d1420a398fb4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    profileImage: "https://images.unsplash.com/photo-1622032493018-0ababe9513d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    topMembers: [
      { id: 4, name: "Phạm Thị D", avatar: "https://i.pravatar.cc/150?img=10" },
      { id: 5, name: "Hoàng Văn E", avatar: "https://i.pravatar.cc/150?img=12" },
      { id: 6, name: "Đỗ Thị F", avatar: "https://i.pravatar.cc/150?img=24" }
    ],
    recentActivities: [
      { id: 103, title: "Dọn rác kênh Nhiêu Lộc", date: "2025-08-05" },
      { id: 104, title: "Workshop về phân loại rác tại nguồn", date: "2025-07-15" }
    ],
    isJoined: false
  },
  {
    id: 3,
    name: "Đà Nẵng Xanh Sạch",
    description: "Chung tay xây dựng Đà Nẵng thành thành phố môi trường đáng sống bậc nhất Việt Nam.",
    memberCount: 725,
    location: "Đà Nẵng",
    foundedDate: "2025-07-10",
    totalActions: 142,
    coverImage: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    profileImage: "https://images.unsplash.com/photo-1548407260-da850faa41e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    topMembers: [
      { id: 7, name: "Trương Văn G", avatar: "https://i.pravatar.cc/150?img=20" },
      { id: 8, name: "Vũ Thị H", avatar: "https://i.pravatar.cc/150?img=30" },
      { id: 9, name: "Ngô Văn I", avatar: "https://i.pravatar.cc/150?img=41" }
    ],
    recentActivities: [
      { id: 105, title: "Dọn rác bãi biển Mỹ Khê", date: "2025-08-12" },
      { id: 106, title: "Trồng cây xanh dọc sông Hàn", date: "2025-07-29" }
    ],
    isJoined: false
  },
  {
    id: 4,
    name: "Nha Trang Biển Xanh",
    description: "Bảo vệ biển Nha Trang khỏi rác thải nhựa và ô nhiễm môi trường biển.",
    memberCount: 632,
    location: "Nha Trang, Khánh Hòa",
    foundedDate: "2024-09-05",
    totalActions: 98,
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    profileImage: "https://images.unsplash.com/photo-1582847175507-e6cc9d542c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    topMembers: [
      { id: 10, name: "Đinh Văn K", avatar: "https://i.pravatar.cc/150?img=50" },
      { id: 11, name: "Lý Thị L", avatar: "https://i.pravatar.cc/150?img=32" },
      { id: 12, name: "Bùi Văn M", avatar: "https://i.pravatar.cc/150?img=60" }
    ],
    recentActivities: [
      { id: 107, title: "Chiến dịch 'Nói không với ống hút nhựa'", date: "2025-08-08" },
      { id: 108, title: "Dọn rác đáy biển vịnh Nha Trang", date: "2025-07-16" }
    ],
    isJoined: false
  },
  {
    id: 5,
    name: "Huế Xanh Di Sản",
    description: "Bảo vệ môi trường và di sản văn hóa Huế, phát triển du lịch bền vững.",
    memberCount: 514,
    location: "Huế, Thừa Thiên Huế",
    foundedDate: "2025-11-18",
    totalActions: 85,
    coverImage: "https://images.unsplash.com/photo-1528127269322-539801943592?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    profileImage: "https://images.unsplash.com/photo-1618588507085-c79565432917?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    topMembers: [
      { id: 13, name: "Phùng Văn N", avatar: "https://i.pravatar.cc/150?img=65" },
      { id: 14, name: "Tạ Thị O", avatar: "https://i.pravatar.cc/150?img=36" },
      { id: 15, name: "Dương Văn P", avatar: "https://i.pravatar.cc/150?img=48" }
    ],
    recentActivities: [
      { id: 109, title: "Dọn rác dọc sông Hương", date: "2025-08-03" },
      { id: 110, title: "Tuyên truyền bảo vệ môi trường tại các điểm du lịch", date: "2025-07-20" }
    ],
    isJoined: true
  },
  {
    id: 6,
    name: "Tây Nguyên Rừng Xanh",
    description: "Bảo vệ và phục hồi rừng Tây Nguyên, chống nạn phá rừng và săn bắt động vật hoang dã.",
    memberCount: 428,
    location: "Đắk Lắk",
    foundedDate: "2025-01-05",
    totalActions: 65,
    coverImage: "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    profileImage: "https://images.unsplash.com/photo-1612387290123-34af734b5063?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
    topMembers: [
      { id: 16, name: "Mai Văn Q", avatar: "https://i.pravatar.cc/150?img=69" },
      { id: 17, name: "Cam Thị R", avatar: "https://i.pravatar.cc/150?img=38" },
      { id: 18, name: "Lưu Văn S", avatar: "https://i.pravatar.cc/150?img=57" }
    ],
    recentActivities: [
      { id: 111, title: "Trồng rừng tại vườn quốc gia Yok Đôn", date: "2025-08-01" },
      { id: 112, title: "Tuyên truyền bảo vệ động vật hoang dã", date: "2025-07-12" }
    ],
    isJoined: false
  }
];

//animatioon
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
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

const categories = ["Tất cả", "Đã tham gia", "Gần đây", "Nhiều thành viên", "Năng động nhất"];

export default function Groups() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("myGroups");
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Sử dụng dữ liệu mẫu 
  const groups = sampleGroups;
  const isLoading = false;
  
  // Tổ xanh của tôi
  const myGroups = groups.filter(group => group.isJoined);
  
  // Lọc tổ xanh theo danh mục và từ khóa tìm kiếm
  const filteredGroups = groups.filter(group => {
    // Lọc theo danh mục
    if (activeCategory === "Đã tham gia" && !group.isJoined) return false;
    if (activeCategory === "Nhiều thành viên" && group.memberCount < 600) return false;
    if (activeCategory === "Năng động nhất" && group.totalActions < 100) return false;
    
    // Lọc theo tìm kiếm
    const matchesSearch = !searchTerm || 
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  const displayGroups = activeTab === "myGroups" ? myGroups : filteredGroups;
  
  // Hàm xử lý tham gia/rời nhóm
  const handleJoinGroup = (groupId: number) => {
    // Trong thực tế sẽ gọi API để tham gia/rời nhóm
    console.log(`Xử lý tham gia/rời nhóm với ID: ${groupId}`);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="relative rounded-xl overflow-hidden h-[300px] md:h-[400px] mb-8"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-400 opacity-90"></div>
          <img 
            src="https://images.unsplash.com/photo-1559223607-b4d0555ae227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="GreenTeam banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12">
            <motion.h1 
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              GreenTeam
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-white max-w-2xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Tham gia các nhóm cộng đồng, cùng hành động vì môi trường và chia sẻ những ý tưởng bảo vệ hành tinh xanh
            </motion.p>
          </div>
        </motion.div>
        
        {/* Tab điều hướng */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setActiveTab("myGroups")}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === "myGroups"
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Nhóm của tôi
              </button>
              <button
                onClick={() => setActiveTab("explore")}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === "explore"
                    ? "bg-white text-gray-800 shadow-sm"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                Khám phá
              </button>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium flex items-center justify-center shadow-sm hover:bg-green-700 transition-colors"
            >
              <FiPlus className="mr-2" />
              Tạo nhóm mới
            </motion.button>
          </div>
        </motion.div>
        
        {/* Thanh tìm kiếm */}
        {activeTab === "explore" && (
          <motion.div 
            className="mb-8 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <input
              type="text"
              placeholder="Tìm kiếm nhóm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 pl-12 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </motion.div>
        )}
        
        {/* Danh mục */}
        {activeTab === "explore" && (
          <motion.div 
            className="mb-8 overflow-x-auto hide-scrollbar"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? "bg-green-600 text-white shadow-md"
                      : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : displayGroups.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {displayGroups.map((group) => (
              <motion.div
                key={group.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={group.coverImage}
                    alt={group.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/80 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                      <FiUsers className="mr-1" /> {group.memberCount.toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <div className="relative px-6 -mt-12 mb-4">
                  <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img
                      src={group.profileImage}
                      alt={`${group.name} logo`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="px-6 pt-0 pb-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{group.name}</h3>
                    <div className="flex items-center justify-center text-gray-500 text-sm mb-3">
                      <FiMapPin className="mr-1" />
                      <span>{group.location}</span>
                      <span className="mx-2">•</span>
                      <FiCalendar className="mr-1" />
                      <span>Từ {new Date(group.foundedDate).toLocaleDateString('vi-VN')}</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2">{group.description}</p>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-semibold text-gray-700">Thành viên nổi bật</h4>
                    </div>
                    <div className="flex justify-center -space-x-2">
                      {group.topMembers.map((member) => (
                        <img
                          key={member.id}
                          src={member.avatar}
                          alt={member.name}
                          title={member.name}
                          className="w-8 h-8 rounded-full border-2 border-white"
                        />
                      ))}
                      {group.memberCount > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs text-gray-600">
                          +{group.memberCount - 3}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-semibold text-gray-700">Hoạt động gần đây</h4>
                      <span className="text-xs text-green-600 font-medium">{group.totalActions} hoạt động</span>
                    </div>
                    {group.recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start mb-1 last:mb-0">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                        <div className="text-sm">
                          <span className="text-gray-700">{activity.title}</span>
                          <span className="text-gray-400 text-xs ml-1">
                            ({new Date(activity.date).toLocaleDateString('vi-VN')})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handleJoinGroup(group.id)}
                    className={`w-full py-2 rounded-lg font-medium transition-colors ${
                      group.isJoined
                        ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {group.isJoined ? "Đã tham gia" : "Tham gia ngay"}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            {activeTab === "myGroups" ? (
              <>
                <div className="text-6xl mb-4">👫</div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">Bạn chưa tham gia nhóm nào</h3>
                <p className="text-gray-500 mb-6">Khám phá và tham gia các nhóm để cùng hành động vì môi trường.</p>
                <button
                  onClick={() => setActiveTab("explore")}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Khám phá ngay
                </button>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">Không tìm thấy nhóm nào</h3>
                <p className="text-gray-500">Không có nhóm nào phù hợp với tìm kiếm của bạn.</p>
              </>
            )}
          </motion.div>
        )}
        
        {/* Thông tin thêm */}
        <motion.div 
          className="mt-16 bg-green-50 rounded-xl p-6 sm:p-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="md:flex justify-between items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Cùng hành động với GreenTeam</h3>
              <p className="text-gray-600">Tham gia các nhóm cộng đồng để có thêm động lực và sức mạnh trong hành trình bảo vệ môi trường</p>
            </div>
            <div>
              <button 
                onClick={() => setActiveTab("explore")}
                className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors w-full md:w-auto"
              >
                Khám phá nhóm
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
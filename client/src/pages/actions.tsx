// client/src/pages/actions.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { Plus, Filter, Calendar, MapPin, ThumbsUp, Heart } from "lucide-react";

export default function Actions() {
  const [filter, setFilter] = useState("all");
  
  const actions = [
    {
      id: 1,
      user: {
        id: 2,
        name: "Phạm Thị Thảo Duyên",
        avatar: "https://ui-avatars.com/api/?name=Nguyễn+Văn+A&background=4CAF50&color=fff"
      },
      type: "Trồng cây",
      description: "Đã trồng 5 cây xanh tại VKU",
      location: "Đà Nẵng",
      imageUrl: "https://images.unsplash.com/photo-1636898456120-ab6fea2c3cd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
      points: 50,
      likes: 99,
      createdAt: "2025-05-10T07:30:00Z"
    },
    {
      id: 2,
      user: {
        id: 3,
        name: "Lê Đình Lợi",
        avatar: "https://ui-avatars.com/api/?name=Trần+Thị+B&background=9C27B0&color=fff"
      },
      type: "Tái chế",
      description: "Thu gom và phân loại rác thải nhựa để tái chế",
      location: "Đà Nẵng",
      imageUrl: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      points: 15,
      likes: 99,
      createdAt: "2025-05-09T10:45:00Z"
    },
    {
      id: 3,
      user: {
        id: 4,
        name: "Lê Công Hào",
        avatar: "https://ui-avatars.com/api/?name=Lê+Minh+C&background=FF9800&color=fff"
      },
      type: "Tiết kiệm năng lượng",
      description: "Sử dụng bóng đèn LED tiết kiệm điện cho toàn bộ ngôi nhà",
      location: "Đà Nẵng",
      imageUrl: "https://images.unsplash.com/photo-1619513638810-23f40c215563?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      points: 10,
      likes: 100,
      createdAt: "2025-05-08T14:20:00Z"
    }
  ];
  
  const filteredActions = filter === 'all' 
    ? actions 
    : actions.filter(action => action.type === filter);
    
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900">Hành Động Xanh</h1>
            <p className="mt-2 text-gray-600">
              Khám phá những hành động bảo vệ môi trường từ cộng đồng
            </p>
          </motion.div>
          
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Link href="/actions/new">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-5 py-2.5 bg-green-600 text-white rounded-full font-medium shadow-md hover:bg-green-700 transition-all duration-200"
              >
                <Plus size={18} className="mr-2" />
                Hành động mới
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-5 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all duration-200"
            >
              <Filter size={18} className="mr-2" />
              Lọc
            </motion.button>
          </div>
        </div>
        
        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {["all", "Trồng cây", "Tái chế", "Tiết kiệm năng lượng", "Phương tiện công cộng", "Dọn rác"].map((type, index) => (
            <motion.button
              key={type}
              onClick={() => setFilter(type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                filter === type 
                  ? "bg-green-100 text-green-700 border-2 border-green-300" 
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {type === "all" ? "Tất cả" : type}
            </motion.button>
          ))}
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredActions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative">
                  <img 
                    src={action.imageUrl} 
                    alt={action.description}
                    className="w-full h-48 object-cover object-center"
                  />
                  <div className="absolute top-3 right-3 bg-green-600 text-white text-sm font-medium px-3 py-1 rounded-full shadow">
                    +{action.points} điểm
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <img
                      src={action.user.avatar}
                      alt={action.user.name}
                      className="w-10 h-10 rounded-full border-2 border-green-200"
                    />
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">{action.user.name}</h3>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Calendar size={14} className="mr-1" />
                        {new Date(action.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <span className="inline-block bg-green-100 text-green-700 text-xs font-medium px-2.5 py-1 rounded mr-2">
                      {action.type}
                    </span>
                    <span className="inline-flex items-center text-gray-500 text-xs">
                      <MapPin size={12} className="mr-1" />
                      {action.location}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    {action.description}
                  </p>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center text-gray-500 hover:text-green-600 transition-colors duration-200"
                    >
                      <ThumbsUp size={18} className="mr-1" />
                      <span>{action.likes}</span>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center text-gray-500 hover:text-red-500 transition-colors duration-200"
                    >
                      <Heart size={18} className="mr-1" />
                      Yêu thích
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
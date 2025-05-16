import React, { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FiCalendar, FiUser, FiTag, FiArrowRight, FiSearch } from "react-icons/fi";
import { useIsMobile } from "@/hooks/use-mobile";

// Dữ liệu mẫu cho blog posts
const sampleBlogPosts = [
  {
    id: 1,
    title: "7 Cách Đơn Giản Để Giảm Rác Thải Nhựa Trong Cuộc Sống Hàng Ngày",
    excerpt: "Khám phá những phương pháp đơn giản giúp giảm thiểu rác thải nhựa một cách hiệu quả trong cuộc sống hằng ngày, từ việc sử dụng túi vải thay vì túi nilon đến việc từ bỏ ống hút nhựa.",
    content: "Nhựa đang dần 'nuốt chửng' hành tinh của chúng ta. Theo thống kê, mỗi năm có khoảng 8 triệu tấn rác thải nhựa đổ ra đại dương, tương đương với việc đổ một xe rác đầy nhựa ra biển mỗi phút. Nếu tình trạng này tiếp tục, đến năm 2050, đại dương sẽ chứa nhiều nhựa hơn cá...",
    author: "Nguyễn Văn Anh",
    categories: ["Giảm rác thải", "Đời sống xanh"],
    date: "2023-05-15",
    readTime: "5 phút",
    imageUrl: "https://images.unsplash.com/photo-1605600659453-128663c3f0a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Trồng Cây Tại Nhà: Hướng Dẫn Chi Tiết Cho Người Mới Bắt Đầu",
    excerpt: "Bài viết hướng dẫn chi tiết cách trồng và chăm sóc cây xanh trong nhà, phù hợp với những người mới bắt đầu và không gian sống hạn chế.",
    content: "Trồng cây không chỉ làm đẹp không gian sống mà còn góp phần cải thiện chất lượng không khí và tạo cảm giác thư giãn. Nghiên cứu đã chỉ ra rằng việc chăm sóc cây xanh có thể giảm stress và tăng cường sức khỏe tinh thần...",
    author: "Trần Minh Hương",
    categories: ["Trồng cây", "Không gian xanh"],
    date: "2023-06-02",
    readTime: "8 phút",
    imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "Cùng Nhau Dọn Sạch Bãi Biển: Kết Quả Từ Chiến Dịch 'Biển Xanh 2023'",
    excerpt: "Tổng kết chiến dịch dọn sạch bãi biển lớn nhất năm 2023 với sự tham gia của hơn 2000 tình nguyện viên và kết quả ấn tượng.",
    content: "Vào ngày 10 tháng 7 vừa qua, chiến dịch 'Biển Xanh 2023' đã diễn ra thành công rực rỡ với sự tham gia của 2.347 tình nguyện viên đến từ khắp mọi miền đất nước. Trong vòng 8 giờ đồng hồ, chúng tôi đã thu gom được 15 tấn rác thải, trong đó có 70% là rác thải nhựa...",
    author: "Lê Thanh Hải",
    categories: ["Chiến dịch xanh", "Bảo vệ biển"],
    date: "2023-07-15",
    readTime: "6 phút",
    imageUrl: "https://images.unsplash.com/photo-1621947081720-86970823b77a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    title: "Thực Phẩm Hữu Cơ: Có Thực Sự Tốt Cho Môi Trường?",
    excerpt: "Phân tích sâu về lợi ích và thách thức của nông nghiệp hữu cơ đối với môi trường, so sánh với phương pháp canh tác truyền thống.",
    content: "Thuật ngữ 'hữu cơ' ngày càng phổ biến trong các cửa hàng thực phẩm và nhà hàng. Nhiều người lựa chọn thực phẩm hữu cơ không chỉ vì sức khỏe mà còn vì niềm tin rằng đây là lựa chọn thân thiện với môi trường. Nhưng liệu điều này có đúng không?...",
    author: "Phạm Quang Minh",
    categories: ["Thực phẩm xanh", "Nông nghiệp bền vững"],
    date: "2023-07-28",
    readTime: "10 phút",
    imageUrl: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    title: "5 Xu Hướng Thời Trang Bền Vững Đang Thay Đổi Ngành Công Nghiệp",
    excerpt: "Khám phá những xu hướng thời trang bền vững đang làm thay đổi cách chúng ta sản xuất, tiêu thụ và suy nghĩ về quần áo.",
    content: "Ngành công nghiệp thời trang được biết đến là một trong những ngành gây ô nhiễm lớn nhất thế giới, đứng thứ hai sau ngành dầu khí. Tuy nhiên, những năm gần đây chứng kiến sự trỗi dậy của 'thời trang bền vững' - một phong trào nhằm thay đổi cách chúng ta sản xuất và tiêu thụ quần áo...",
    author: "Đỗ Thị Mai Anh",
    categories: ["Thời trang bền vững", "Tiêu dùng xanh"],
    date: "2023-08-05",
    readTime: "7 phút",
    imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    title: "Tái Chế Sáng Tạo: Biến Rác Thải Thành Tác Phẩm Nghệ Thuật",
    excerpt: "Những ý tưởng sáng tạo và cách thực hiện để biến rác thải thành các tác phẩm nghệ thuật độc đáo, góp phần nâng cao nhận thức về bảo vệ môi trường.",
    content: "Nghệ thuật từ rác thải - một hình thức nghệ thuật đang ngày càng phổ biến - không chỉ mang lại vẻ đẹp thẩm mỹ mà còn truyền tải thông điệp mạnh mẽ về bảo vệ môi trường. Các nghệ sĩ trên khắp thế giới đang sáng tạo ra những tác phẩm đáng kinh ngạc từ những vật liệu mà nhiều người coi là 'rác'...",
    author: "Vũ Hoàng Nam",
    categories: ["Nghệ thuật xanh", "Tái chế sáng tạo"],
    date: "2023-08-20",
    readTime: "6 phút",
    imageUrl: "https://images.unsplash.com/photo-1567016526105-22da7c13161a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
];

// Animation variants
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

const categories = ["Tất cả", "Môi trường", "Sống xanh", "Cộng đồng", "Tái chế", "Trồng cây"];

export default function Blog() {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Thực tế, bạn sẽ gọi API để lấy dữ liệu
  // const { data: blogPosts, isLoading } = useQuery({
  //   queryKey: ["/api/blog-posts"],
  // });
  
  // Sử dụng dữ liệu mẫu 
  const blogPosts = sampleBlogPosts;
  const isLoading = false;
  
  // Lọc bài viết theo danh mục và từ khóa tìm kiếm
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === "Tất cả" || post.categories.some(cat => 
      cat.toLowerCase().includes(activeCategory.toLowerCase())
    );
    
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

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
            src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Blog banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-12">
            <motion.h1 
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Blog Xanh
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-white max-w-2xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Khám phá những câu chuyện, ý tưởng và hành động bảo vệ môi trường từ cộng đồng Cây Xanh Mỗi Ngày
            </motion.p>
          </div>
        </motion.div>
        
        {/* Thanh tìm kiếm */}
        <motion.div 
          className="mb-8 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
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
        
        {/* Danh mục */}
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
        
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : filteredPosts.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-4 flex gap-2 flex-wrap">
                    {post.categories.map((cat, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-green-500/80 text-white rounded-full">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center text-gray-500 text-sm mb-2">
                    <FiCalendar className="mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <FiUser className="mr-1" />
                    <span>{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <a 
                    href={`/blog/${post.id}`} 
                    className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors"
                  >
                    Đọc tiếp
                    <FiArrowRight className="ml-1" />
                  </a>
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
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Chưa có bài viết</h3>
            <p className="text-gray-500">Không tìm thấy bài viết nào phù hợp với tìm kiếm của bạn.</p>
          </motion.div>
        )}
        
        {/* Newsletter signup */}
        <motion.div 
          className="mt-16 bg-green-50 rounded-xl p-6 sm:p-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="md:flex justify-between items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Đăng ký nhận bản tin</h3>
              <p className="text-gray-600">Cập nhật những câu chuyện và hành động xanh mới nhất từ cộng đồng</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-grow max-w-md">
              <input 
                type="email" 
                placeholder="Email của bạn"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
                Đăng ký
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
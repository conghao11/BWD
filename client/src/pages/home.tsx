
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, TrendingUp, Users, Award, Calendar } from "lucide-react";
import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  duration?: number;
  delay?: number;
}
const StatItem: React.FC<StatItemProps> = ({ icon, value, label, duration = 2.5, delay = 0 }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="flex justify-center text-green-500 mb-3 text-4xl">
        {icon}
      </div>
      <h3 className="text-4xl font-bold text-gray-800 mb-2">
        {inView ? (
          <CountUp end={value} duration={duration} separator="," />
        ) : (
          0
        )}
        <span className="text-green-600">+</span>
      </h3>
      <p className="text-gray-600 font-medium">{label}</p>
    </motion.div>
  );
};
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 md:pr-12"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900"
              >
                Hành động xanh,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400">
                  Tương lai xanh
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6 text-xl text-gray-600 max-w-3xl"
              >
                Mỗi hành động nhỏ của bạn hôm nay sẽ tạo nên một tương lai xanh tươi cho thế hệ mai sau. Hãy cùng nhau xây dựng một cộng đồng bảo vệ môi trường vững mạnh.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-10 flex flex-col sm:flex-row gap-4"
              >
                <Link href="/actions">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
                  >
                    Bắt đầu hành động
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.button>
                </Link>
                
                <Link href="/leaderboard">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-green-600 border-2 border-green-500 rounded-full font-medium text-lg transition-all duration-300 flex items-center justify-center"
                  >
                    Xem bảng xếp hạng
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="md:w-1/2 mt-12 md:mt-0"
            >
              <div className="relative">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-green-400 to-green-600 opacity-50 blur-xl"></div>
                <img
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80"
                  alt="Bảo vệ môi trường"
                  className="relative rounded-3xl shadow-2xl object-cover w-full h-[500px]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
     <section className="py-20 bg-gray-50 relative overflow-hidden">
           <div className="absolute top-0 left-0 opacity-5">
             <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M58.5 48.5C58.5 75.062 37.062 96.5 10.5 96.5C-16.062 96.5 -37.5 75.062 -37.5 48.5C-37.5 21.938 -16.062 0.5 10.5 0.5C37.062 0.5 58.5 21.938 58.5 48.5Z" fill="#22C55E"/>
               <path d="M186.5 114.5C186.5 141.062 165.062 162.5 138.5 162.5C111.938 162.5 90.5 141.062 90.5 114.5C90.5 87.938 111.938 66.5 138.5 66.5C165.062 66.5 186.5 87.938 186.5 114.5Z" fill="#22C55E"/>
               <path d="M98.5 35.5C98.5 55.106 82.606 71 63 71C43.394 71 27.5 55.106 27.5 35.5C27.5 15.894 43.394 0 63 0C82.606 0 98.5 15.894 98.5 35.5Z" fill="#22C55E"/>
             </svg>
           </div>
           <div className="absolute bottom-0 right-0 opacity-5">
             <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M58.5 48.5C58.5 75.062 37.062 96.5 10.5 96.5C-16.062 96.5 -37.5 75.062 -37.5 48.5C-37.5 21.938 -16.062 0.5 10.5 0.5C37.062 0.5 58.5 21.938 58.5 48.5Z" fill="#22C55E"/>
               <path d="M186.5 114.5C186.5 141.062 165.062 162.5 138.5 162.5C111.938 162.5 90.5 141.062 90.5 114.5C90.5 87.938 111.938 66.5 138.5 66.5C165.062 66.5 186.5 87.938 186.5 114.5Z" fill="#22C55E"/>
             </svg>
           </div>
     
           <div className="container mx-auto px-4 relative z-10">
             <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               className="max-w-4xl mx-auto text-center mb-16"
             >
               <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tác động đến môi trường</h2>
               <p className="text-lg text-gray-600">
                 Cùng nhau, chúng ta đã tạo ra những thay đổi tích cực cho môi trường. Mỗi hành động đều quan trọng và có ý nghĩa.
               </p>
             </motion.div>
     
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
               <StatItem
                 icon={<i className="ri-plant-line"></i>}
                 value={1280}
                 label="Cây xanh đã trồng"
                 delay={0.1}
               />
               <StatItem
                 icon={<i className="ri-recycle-line"></i>}
                 value={3750}
                 label="kg rác tái chế"
                 delay={0.2}
               />
               <StatItem
                 icon={<i className="ri-drop-line"></i>}
                 value={4800}
                 label="lít nước tiết kiệm"
                 delay={0.3}
               />
               <StatItem
                 icon={<i className="ri-earth-line"></i>}
                 value={1920}
                 label="kg CO₂ giảm thiểu"
                 delay={0.4}
               />
             </div>
           </div>
         </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Tính năng nổi bật
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Những cách để bạn có thể đóng góp và xây dựng cộng đồng xanh
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                title: "Ghi chép hành động xanh",
                description: "Ghi lại mỗi hành động bảo vệ môi trường của bạn và nhận điểm thưởng.",
                icon: "🌱",
                delay: 0.1
              },
              {
                title: "Tham gia thử thách",
                description: "Tham gia các thử thách hàng ngày và cải thiện thành tích cá nhân.",
                icon: "🏆",
                delay: 0.2
              },
              {
                title: "Tạo nhóm cộng đồng",
                description: "Lập nhóm với bạn bè và cùng nhau tạo tác động tích cực đến môi trường.",
                icon: "👥",
                delay: 0.3
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: feature.delay }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-3 text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-gradient-to-r from-green-600 to-green-500 rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="px-8 py-16 sm:p-16 text-center sm:text-left flex flex-col sm:flex-row items-center">
            <div className="sm:w-2/3">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Sẵn sàng để bắt đầu?
              </h2>
              <p className="mt-4 text-lg text-green-100">
                Tham gia ngay hôm nay và trở thành một phần của phong trào bảo vệ môi trường Việt Nam.
              </p>
              <div className="mt-8">
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-green-700 bg-white hover:bg-green-50 transition-all duration-300"
                  >
                    Đăng ký ngay
                    <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
                  </motion.button>
                </Link>
              </div>
            </div>
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-10 sm:mt-0 sm:w-1/3 flex justify-center"
            >
              <div className="w-40 h-40 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center p-2">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-green-600 text-6xl">
                  🌍
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
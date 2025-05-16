import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";


const videoUrl = "https://player.vimeo.com/external/517090025.sd.mp4?s=ce25b012797dc9b59957700702adc7c2ef1b96e9&profile_id=164&oauth2_token_id=57447761";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
};

 function VideoHero() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Lớp video nền */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video 
          className="absolute min-w-full min-h-full object-cover" 
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          Trình duyệt của bạn không hỗ trợ video HTML5.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Nội dung */}
      <div className="relative z-10 h-full flex items-center justify-center text-white px-4">
        <motion.div 
          className="max-w-4xl text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4"
            variants={item}
          >
            Hành động <span className="text-green-400">xanh</span>, <br />
            <span className="text-green-400">Tương lai</span> xanh
          </motion.h1>

          <motion.p 
            className="text-xl md:text-2xl mb-8 opacity-90"
            variants={item}
          >
            Mỗi hành động nhỏ của bạn hôm nay sẽ tạo nên một tương lai
            xanh tươi cho thế hệ mai sau. Hãy cùng nhau xây dựng một cộng
            đồng bảo vệ môi trường vững mạnh.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            variants={item}
          >
            <Link href="/register">
              <Button className="bg-green-600 hover:bg-green-700 text-white text-lg py-6 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105">
                Bắt đầu hành động
              </Button>
            </Link>
            <Link href="/leaderboard">
              <Button variant="outline" className="border-white text-white hover:bg-white/20 text-lg py-6 px-8 rounded-full">
                Xem bảng xếp hạng
              </Button>
            </Link>
          </motion.div>

          <motion.div 
            className="mt-16 flex items-center justify-center"
            variants={item}
          >
            <div className="animate-bounce bg-white bg-opacity-30 p-2 w-10 h-10 ring-1 ring-white ring-opacity-20 rounded-full flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-white" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
export default VideoHero;
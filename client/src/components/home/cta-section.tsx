import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-green-600 to-green-500 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leaf" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M50 0 C75 25, 75 75, 50 100 C25 75, 25 25, 50 0" stroke="#FFF" fill="none" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#leaf)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Bắt đầu cuộc hành trình xanh của bạn ngay hôm nay
              </h2>
              <p className="text-white text-opacity-90 text-lg mb-6">
                Tham gia cùng hàng nghìn người khác, ghi lại các hành động xanh hàng ngày và tạo ra sự thay đổi tích cực cho môi trường.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-medium rounded-full shadow-lg transform transition-transform hover:scale-105">
                    Đăng ký miễn phí
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-6 text-lg font-medium rounded-full">
                    Tìm hiểu thêm
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="flex-1 flex justify-center"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-green-100 p-6 text-center">
                  <h3 className="text-2xl font-bold text-green-800">
                    Bạn đã sẵn sàng chưa?
                  </h3>
                </div>
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center text-green-600 font-semibold">1</div>
                      <p className="text-gray-700 font-medium">Đăng ký tài khoản miễn phí</p>
                    </div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center text-green-600 font-semibold">2</div>
                      <p className="text-gray-700 font-medium">Ghi lại các hành động xanh hàng ngày</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center text-green-600 font-semibold">3</div>
                      <p className="text-gray-700 font-medium">Nhận điểm thưởng và thách thức bản thân</p>
                    </div>
                  </div>
                  <Link href="/register" className="w-full block">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg">
                      Bắt đầu ngay
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
 export default CtaSection;
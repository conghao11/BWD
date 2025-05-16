import React, { useState } from "react";
import { motion } from "framer-motion";
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

 function ImpactStats() {
  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
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
  );
}

export default ImpactStats;
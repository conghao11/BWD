import React from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaUsers, FaMedal } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

 function ReasonsSection() {
  const reasons = [
    {
      icon: <FaLeaf className="text-4xl text-green-500" />,
      title: "Ghi nhận hành động",
      description: "Ghi lại các hành động xanh hàng ngày và nhận điểm thưởng để theo dõi quá trình bảo vệ môi trường của bạn."
    },
    {
      icon: <FaUsers className="text-4xl text-blue-500" />,
      title: "Tham gia cộng đồng",
      description: "Tạo hoặc tham gia các tổ xanh để cùng nhau tạo ra tác động lớn hơn trong việc bảo vệ môi trường."
    },
    {
      icon: <FaMedal className="text-4xl text-amber-500" />,
      title: "Nhận thành tích",
      description: "Đạt được các danh hiệu, khám phá thử thách mới và xếp hạng cao trong cộng đồng người bảo vệ môi trường."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tại sao nên tham gia <span className="text-green-600">Cây Xanh Mỗi Ngày</span></h2>
          <p className="text-lg text-gray-600">
            Chung tay cùng cộng đồng tạo ra tác động tích cực đến môi trường thông qua việc thay đổi thói quen hàng ngày và lan tỏa tinh thần sống xanh.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reasons.map((reason, index) => (
            <motion.div 
              key={index}
              className="bg-white border border-gray-100 rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-6 mx-auto">
                {reason.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">{reason.title}</h3>
              <p className="text-gray-600 text-center">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
export default ReasonsSection;

import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Home, Award, BarChart2, FileText, Users, LogOut } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  const navItems = [
    { path: "/home", label: "Trang chủ", icon: Home },
    { path: "/actions", label: "Hành động xanh", icon: Award },
    { path: "/leaderboard", label: "Bảng xếp hạng", icon: BarChart2 },
    { path: "/blog", label: "Blog", icon: FileText },
    { path: "/groups", label: "GreenChallenge", icon: Users },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <Link href={item.path} key={item.path}>
                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: index * 0.05 + 0.1 }
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className={`flex items-center px-4 py-3 rounded-xl ${
                    isActive(item.path)
                      ? "bg-green-100 text-green-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  <span className="font-medium">{item.label}</span>
                </motion.a>
              </Link>
            );
          })}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            transition: { delay: 0.3 }
          }}
          className="mt-6 pt-4 border-t border-gray-200"
        >
          <div className="flex items-center px-4 py-3">
            <img
              src="https://ui-avatars.com/api/?name=Lê+Công+Hào&background=27AE60&color=fff"
              alt="User"
              className="w-10 h-10 rounded-full border-2 border-green-300"
            />
            <div className="ml-3">
              <p className="font-medium text-gray-900">Lê Công Hào</p>
              <p className="text-sm text-gray-500">100 điểm</p>
            </div>
          </div>

          <Link href="/actions/new">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full mt-4 bg-gradient-to-r from-green-600 to-green-500 text-white py-3 rounded-xl font-medium shadow-sm hover:shadow transition-all duration-200"
            >
              Hành động mới
            </motion.button>
          </Link>
          
          <Link href="/logout">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full mt-2 flex justify-center items-center py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
            >
              <LogOut size={18} className="mr-2" />
              Đăng xuất
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import MobileNav from "./mobile-nav";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Link href="/home" className="flex items-center">
            <span className="text-primary text-3xl mr-2">🌱</span>
            <span className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-400">
              GreenChallenge
            </span>
          </Link>
        </motion.div>

       
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center space-x-1"
        >
          {[
            { path: "/home", label: "Trang chủ" },
            { path: "/actions", label: "Hành động xanh" },
            { path: "/leaderboard", label: "Bảng xếp hạng" },
            { path: "/blog", label: "Blog" },
            { path: "/groups", label: "GreenTeam" },
          ].map((item, index) => (
            <Link href={item.path} key={item.path}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-green-100 text-green-700"
                    : "text-gray-700 hover:bg-green-50 hover:text-green-600"
                }`}
              >
                {item.label}
              </motion.div>
            </Link>
          ))}
        </motion.nav>

        {/* User Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex items-center space-x-3"
        >
          <Link href="/profile">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-full hover:bg-green-200 transition-all duration-200"
            >
              <img
                src="https://ui-avatars.com/api/?name=Lê+Công+Hào&background=27AE60&color=fff"
                alt="User"
                className="w-6 h-6 rounded-full mr-2 border border-green-300"
              />
              <span>Lê Công Hào</span>
              <ChevronDown size={16} className="ml-1" />
            </motion.div>
          </Link>

          <Link href="/actions/new">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2 rounded-full font-medium shadow hover:shadow-md transition-all duration-200"
            >
              Hành động mới
            </motion.button>
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="block md:hidden text-gray-700 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-gray-900" />
          ) : (
            <Menu size={24} className="text-gray-900" />
          )}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>
    </header>
  );
}
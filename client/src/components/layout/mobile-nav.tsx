import React from "react";
import { Link, useLocation } from "wouter";
import { ActionModal } from "@/components/actions/action-modal";

export default function MobileNav() {
  const [location] = useLocation();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  return (
    <>
      <div className="md:hidden mobile-nav bg-white shadow-lg border-t border-neutral">
        <div className="flex justify-around py-3">
          <Link href="/">
            <a className={`flex flex-col items-center ${location === "/" ? "text-primary" : "text-gray-500"}`}>
              <i className="ri-home-4-line text-xl"></i>
              <span className="text-xs mt-1">Trang chủ</span>
            </a>
          </Link>
          <Link href="/leaderboard">
            <a className={`flex flex-col items-center ${location === "/leaderboard" ? "text-primary" : "text-gray-500"}`}>
              <i className="ri-bar-chart-line text-xl"></i>
              <span className="text-xs mt-1">Xếp hạng</span>
            </a>
          </Link>
          <button 
            className="flex flex-col items-center" 
            onClick={() => setIsModalOpen(true)}
          >
            <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center -mt-6">
              <i className="ri-add-line text-xl"></i>
            </div>
          </button>
          <Link href="/groups">
            <a className={`flex flex-col items-center ${location === "/groups" ? "text-primary" : "text-gray-500"}`}>
              <i className="ri-group-line text-xl"></i>
              <span className="text-xs mt-1">Nhóm</span>
            </a>
          </Link>
          <Link href="/profile">
            <a className={`flex flex-col items-center ${location === "/profile" ? "text-primary" : "text-gray-500"}`}>
              <i className="ri-user-line text-xl"></i>
              <span className="text-xs mt-1">Cá nhân</span>
            </a>
          </Link>
        </div>
      </div>
      
      <ActionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

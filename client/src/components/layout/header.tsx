import React from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ActionModal } from "@/components/actions/action-modal";

export default function Header() {
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <i className="ri-plant-line text-primary text-2xl"></i>
          <Link href="/">
            <a className="text-primary font-semibold text-xl md:text-2xl">Cây Xanh Mỗi Ngày</a>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <a className={`transition-colors ${location === "/" ? "text-primary" : "text-gray-700 hover:text-primary"}`}>
              Trang chủ
            </a>
          </Link>
          <Link href="/actions">
            <a className={`transition-colors ${location === "/actions" ? "text-primary" : "text-gray-700 hover:text-primary"}`}>
              Hành động
            </a>
          </Link>
          <Link href="/leaderboard">
            <a className={`transition-colors ${location === "/leaderboard" ? "text-primary" : "text-gray-700 hover:text-primary"}`}>
              Xếp hạng
            </a>
          </Link>
          <Link href="/blog">
            <a className={`transition-colors ${location === "/blog" ? "text-primary" : "text-gray-700 hover:text-primary"}`}>
              Blog
            </a>
          </Link>
          <Link href="/groups">
            <a className={`transition-colors ${location === "/groups" ? "text-primary" : "text-gray-700 hover:text-primary"}`}>
              Cộng đồng
            </a>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button 
                type="button" 
                className="hidden md:flex bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
                onClick={() => setIsModalOpen(true)}
              >
                <i className="ri-add-line mr-1"></i>Hành động mới
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1 focus:outline-none p-0">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.avatar || undefined} alt={user?.displayName} />
                      <AvatarFallback className="bg-primary-light text-white">
                        {getInitials(user?.displayName || "")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block text-sm font-medium">
                      {user?.displayName}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem className="cursor-pointer">
                      <i className="ri-user-line mr-2"></i>
                      Hồ sơ
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                    <i className="ri-logout-box-line mr-2"></i>
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">Đăng nhập</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-primary text-white hover:bg-primary-dark" size="sm">Đăng ký</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      <ActionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}

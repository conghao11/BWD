import React from "react";
import { useAuth } from "@/context/auth-context";
import DailyPoints from "@/components/dashboard/daily-points";
import RecentActions from "@/components/dashboard/recent-actions";
import Leaderboard from "@/components/dashboard/leaderboard";
import DailyChallenge from "@/components/dashboard/daily-challenge";
import Groups from "@/components/dashboard/groups";
import BlogList from "@/components/blog/blog-list";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center max-w-3xl">
          <h1 className="text-4xl font-bold text-primary mb-4">Cây Xanh Mỗi Ngày</h1>
          <p className="text-xl text-gray-600 mb-8">
            Chăm sóc môi trường qua từng hành động nhỏ
          </p>
          
          <div className="bg-white p-8 rounded-lg shadow-sm mb-10">
            <h2 className="text-2xl font-semibold text-primary mb-4">Tham gia ngay hôm nay</h2>
            <p className="text-gray-600 mb-6">
              Ghi nhận hành động xanh mỗi ngày, tích điểm và chia sẻ để truyền cảm hứng bảo vệ môi trường cùng cộng đồng.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <Button className="bg-primary hover:bg-primary-dark text-white text-lg py-6 px-8">
                  Đăng ký ngay
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary-light hover:text-white text-lg py-6 px-8">
                  Đăng nhập
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <i className="ri-plant-line"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Ghi nhận hành động</h3>
              <p className="text-gray-600">Ghi lại các hành động xanh hàng ngày và nhận điểm thưởng</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4">
                <i className="ri-team-line"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Tham gia cộng đồng</h3>
              <p className="text-gray-600">Tạo hoặc tham gia các nhóm cùng nhau bảo vệ môi trường</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-primary-dark text-2xl mx-auto mb-4">
                <i className="ri-medal-line"></i>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Nhận thành tích</h3>
              <p className="text-gray-600">Đạt được các danh hiệu và xếp hạng cao trong cộng đồng</p>
            </div>
          </div>
          
          <BlogList limit={3} />
        </div>
      </div>
    );
  }
  
  return (
    <>
      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DailyPoints userId={user?.id} />
          <RecentActions userId={user?.id} />
        </div>
      </section>
      
      <Leaderboard />
      
      <DailyChallenge userId={user?.id} />
      
      <BlogList limit={3} />
      
      <Groups userId={user?.id} />
    </>
  );
}

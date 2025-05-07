import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";
import { Link } from "wouter";

export default function Leaderboard() {
  const { data: topUsers, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['/api/users/top'],
    queryFn: () => fetch('/api/users/top?limit=3').then(res => res.json()),
  });
  
  const { data: badges, isLoading: isLoadingBadges } = useQuery({
    queryKey: ['/api/badges'],
    queryFn: () => fetch('/api/badges').then(res => res.json()),
  });
  
  if (isLoadingUsers || isLoadingBadges) {
    return (
      <Card className="dashboard-card p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-primary font-semibold text-lg">Bảng Xếp Hạng</h2>
          <Skeleton className="h-8 w-24" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <h3 className="font-medium text-gray-700 mb-4">Thành Tích</h3>
            <div className="flex justify-around">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <Skeleton className="w-16 h-16 rounded-full mb-2" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-medium text-gray-700 mb-4">Top Người Dùng</h3>
            <div className="space-y-3">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex items-center space-x-3 p-2 rounded-lg">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="h-5 w-32 flex-grow" />
                  <Skeleton className="h-5 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  }
  
  const getBadgeColor = (level: string) => {
    switch (level) {
      case 'Leaf':
        return 'bg-primary-light text-white';
      case 'Sapling':
        return 'bg-accent text-white';
      case 'Tree':
        return 'bg-secondary-light text-primary-dark';
      default:
        return 'bg-neutral text-gray-700';
    }
  };
  
  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-primary-light text-white';
      case 2:
        return 'bg-accent text-white';
      case 3:
        return 'bg-secondary-light text-primary-dark';
      default:
        return 'bg-neutral text-gray-700';
    }
  };
  
  return (
    <Card className="dashboard-card p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-primary font-semibold text-lg">Bảng Xếp Hạng</h2>
        <Link href="/leaderboard">
          <Button variant="link" className="text-primary hover:underline flex items-center text-sm p-0">
            <span>Xem chi tiết</span> <i className="ri-arrow-right-line ml-1"></i>
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <h3 className="font-medium text-gray-700 mb-4">Thành Tích</h3>
          <div className="flex justify-around">
            {badges && badges.slice(0, 3).map((badge: any) => (
              <div key={badge.id} className="badge flex flex-col items-center">
                <div className={`badge-icon ${getBadgeColor(badge.level)}`}>
                  <i className={`${badge.icon} text-2xl`}></i>
                </div>
                <span className="text-sm font-medium mt-2">{badge.level}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <h3 className="font-medium text-gray-700 mb-4">Top Người Dùng</h3>
          <div className="space-y-3">
            {topUsers && topUsers.map((user: any, index: number) => (
              <div key={user.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-light transition-colors">
                <div className={`flex-shrink-0 w-8 h-8 ${getRankColor(index + 1)} rounded-full flex items-center justify-center`}>
                  <span>{index + 1}</span>
                </div>
                <Avatar className="w-8 h-8 flex-shrink-0">
                  <AvatarImage src={user.avatar || undefined} alt={user.displayName} />
                  <AvatarFallback className="bg-secondary text-white">
                    {getInitials(user.displayName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h4 className="font-medium">{user.displayName}</h4>
                </div>
                <div className="text-primary font-medium">{user.totalPoints} điểm</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

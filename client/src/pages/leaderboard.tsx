import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from "@/lib/utils";
import Badges from "@/components/dashboard/badges";

export default function Leaderboard() {
  const [timeframe, setTimeframe] = React.useState("all");
  
  const { data: topUsers, isLoading: isLoadingUsers } = useQuery({
    queryKey: ['/api/users/top', { limit: 10 }],
    queryFn: () => fetch('/api/users/top?limit=10').then(res => res.json()),
  });
  
  const { data: topGroups, isLoading: isLoadingGroups } = useQuery({
    queryKey: ['/api/groups/top', { limit: 10 }],
    queryFn: () => fetch('/api/groups/top?limit=10').then(res => res.json()),
  });
  
  return (
    <>
      <Helmet>
        <title>Bảng xếp hạng - Cây Xanh Mỗi Ngày</title>
        <meta name="description" content="Bảng xếp hạng người dùng và nhóm có số điểm cao nhất trên Cây Xanh Mỗi Ngày." />
      </Helmet>
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary">Bảng Xếp Hạng</h1>
      </div>
      
      <Card className="dashboard-card mb-8">
        <CardHeader>
          <CardTitle className="text-primary">Thành Tích</CardTitle>
        </CardHeader>
        <CardContent>
          <Badges userId={1} /> {/* This will show all badges with earned status */}
        </CardContent>
      </Card>
      
      <Tabs defaultValue="users" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="users">Cá nhân</TabsTrigger>
          <TabsTrigger value="groups">Tổ xanh</TabsTrigger>
        </TabsList>
        
        <div className="mb-4 flex justify-end">
          <div className="flex gap-2 p-1 bg-neutral-light rounded-full">
            <button 
              className={`px-3 py-1 rounded-full text-sm ${timeframe === 'all' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'}`}
              onClick={() => setTimeframe('all')}
            >
              Tất cả
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-sm ${timeframe === 'month' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'}`}
              onClick={() => setTimeframe('month')}
            >
              Tháng này
            </button>
            <button 
              className={`px-3 py-1 rounded-full text-sm ${timeframe === 'week' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'}`}
              onClick={() => setTimeframe('week')}
            >
              Tuần này
            </button>
          </div>
        </div>
        
        <TabsContent value="users">
          <Card className="dashboard-card">
            <CardContent className="pt-6">
              {isLoadingUsers ? (
                <div className="space-y-4">
                  {Array(10).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-5 w-40 flex-grow" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {topUsers?.map((user: any, index: number) => (
                    <div key={user.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-neutral-light transition-colors">
                      <div className={`flex-shrink-0 w-8 h-8 ${getRankColor(index + 1)} rounded-full flex items-center justify-center`}>
                        <span>{index + 1}</span>
                      </div>
                      <Avatar className="w-9 h-9 flex-shrink-0">
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
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="groups">
          <Card className="dashboard-card">
            <CardContent className="pt-6">
              {isLoadingGroups ? (
                <div className="space-y-4">
                  {Array(10).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-5 w-40 flex-grow" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {topGroups?.map((group: any, index: number) => (
                    <div key={group.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-neutral-light transition-colors">
                      <div className={`flex-shrink-0 w-8 h-8 ${getRankColor(index + 1)} rounded-full flex items-center justify-center`}>
                        <span>{index + 1}</span>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-white flex-shrink-0">
                        <i className={group.icon || "ri-team-line"}></i>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium">{group.name}</h4>
                        <p className="text-xs text-gray-500">{group.memberCount} thành viên</p>
                      </div>
                      <div className="text-primary font-medium">{group.totalPoints} điểm</div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

function getRankColor(rank: number) {
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
}

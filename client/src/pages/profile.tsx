import React from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "@/context/auth-context";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials, formatDate, getBadgeLevel } from "@/lib/utils";
import DailyPoints from "@/components/dashboard/daily-points";
import Badges from "@/components/dashboard/badges";

export default function Profile() {
  const { user, logout } = useAuth();
  
  const { data: actions, isLoading: isLoadingActions } = useQuery({
    queryKey: ['/api/actions/user', user?.id],
    queryFn: () => fetch(`/api/actions/user/${user?.id}`).then(res => res.json()),
    enabled: !!user?.id,
  });
  
  const { data: userBadges, isLoading: isLoadingBadges } = useQuery({
    queryKey: ['/api/badges/user', user?.id],
    queryFn: () => fetch(`/api/badges/user/${user?.id}`).then(res => res.json()),
    enabled: !!user?.id,
  });
  
  const { data: actionTypes } = useQuery({
    queryKey: ['/api/action-types'],
    queryFn: () => fetch('/api/action-types').then(res => res.json()),
  });
  
  const getActionType = (actionTypeId: number) => {
    return actionTypes?.find((type: any) => type.id === actionTypeId);
  };
  
  const highestBadge = React.useMemo(() => {
    if (!userBadges || userBadges.length === 0) return null;
    
    // Find badge with highest required points
    return userBadges.reduce((highest: any, current: any) => {
      return (!highest || current.requiredPoints > highest.requiredPoints) ? current : highest;
    }, null);
  }, [userBadges]);
  
  return (
    <>
      <Helmet>
        <title>Hồ sơ - Cây Xanh Mỗi Ngày</title>
        <meta name="description" content="Hồ sơ cá nhân, thống kê và thành tích của bạn trên Cây Xanh Mỗi Ngày." />
      </Helmet>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="dashboard-card md:col-span-1 bg-white">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={user?.avatar || undefined} alt={user?.displayName} />
                <AvatarFallback className="bg-primary-light text-white text-2xl">
                  {getInitials(user?.displayName || "")}
                </AvatarFallback>
              </Avatar>
              
              <h1 className="text-xl font-bold">{user?.displayName}</h1>
              <p className="text-gray-500 mb-4">@{user?.username}</p>
              
              {highestBadge && (
                <div className="bg-neutral-light rounded-full px-4 py-1 text-sm text-primary-dark font-medium flex items-center mb-4">
                  <i className={`${highestBadge.icon} mr-2`}></i>
                  <span>{highestBadge.name}</span>
                </div>
              )}
              
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Điểm tích lũy</span>
                  <span className="font-bold text-primary">{user?.totalPoints || 0}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Cấp độ</span>
                  <span className="font-medium">{getBadgeLevel(user?.totalPoints || 0)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Ngày tham gia</span>
                  <span className="text-gray-600">{user?.createdAt ? formatDate(user.createdAt) : ""}</span>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full border-primary text-primary hover:bg-primary-light hover:text-white"
                onClick={logout}
              >
                <i className="ri-logout-box-line mr-2"></i>
                Đăng xuất
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="md:col-span-2">
          <DailyPoints userId={user?.id} />
        </div>
      </div>
      
      <Card className="dashboard-card mb-8">
        <CardHeader>
          <CardTitle className="text-primary">Thành tích</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoadingBadges ? (
            <div className="flex justify-around">
              {Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="w-16 h-16 rounded-full" />
              ))}
            </div>
          ) : (
            <Badges userId={user?.id} />
          )}
        </CardContent>
      </Card>
      
      <Tabs defaultValue="actions" className="mb-8">
        <TabsList className="mb-6">
          <TabsTrigger value="actions">Hành động gần đây</TabsTrigger>
          <TabsTrigger value="stats">Thống kê</TabsTrigger>
        </TabsList>
        
        <TabsContent value="actions">
          <Card className="dashboard-card">
            <CardContent className="p-6">
              {isLoadingActions ? (
                <div className="space-y-6">
                  {Array(5).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                  ))}
                </div>
              ) : !actions || actions.length === 0 ? (
                <div className="text-center py-8">
                  <i className="ri-plant-line text-5xl text-primary-light mb-3"></i>
                  <p className="text-gray-600">Bạn chưa có hành động xanh nào.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {actions.slice(0, 5).map((action: any) => {
                    const actionType = getActionType(action.actionTypeId);
                    
                    return (
                      <div key={action.id} className="flex items-start space-x-4 pb-6 border-b border-neutral last:border-0 last:pb-0">
                        <div className="flex-shrink-0">
                          <div className="bg-primary-light text-white w-10 h-10 rounded-full flex items-center justify-center">
                            <i className={actionType?.icon || "ri-leaf-line"}></i>
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{action.description}</h3>
                              <p className="text-sm text-gray-500">{formatDate(action.createdAt)}</p>
                            </div>
                            <span className="bg-secondary-light text-primary-dark text-xs font-medium px-2 py-1 rounded-full">
                              +{action.points} điểm
                            </span>
                          </div>
                          
                          {action.location && (
                            <p className="text-sm text-gray-600 mt-1">
                              <i className="ri-map-pin-line mr-1"></i>
                              {action.location}
                            </p>
                          )}
                          
                          {action.imageUrl && (
                            <div className="mt-2 rounded-lg overflow-hidden">
                              <img 
                                src={action.imageUrl} 
                                alt={action.description} 
                                className="w-full max-h-40 object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="stats">
          <Card className="dashboard-card">
            <CardContent className="p-6">
              {isLoadingActions ? (
                <div className="space-y-6">
                  <Skeleton className="h-64 w-full rounded-xl" />
                </div>
              ) : !actions || actions.length === 0 ? (
                <div className="text-center py-8">
                  <i className="ri-bar-chart-line text-5xl text-primary-light mb-3"></i>
                  <p className="text-gray-600">Chưa có dữ liệu thống kê.</p>
                </div>
              ) : (
                <div>
                  <h3 className="font-medium text-lg mb-4">Phân loại hành động</h3>
                  
                  <div className="space-y-4">
                    {actionTypes?.map((type: any) => {
                      const typeActions = actions.filter((a: any) => a.actionTypeId === type.id);
                      const typePoints = typeActions.reduce((sum: number, a: any) => sum + a.points, 0);
                      const percentage = actions.length > 0 
                        ? Math.round((typeActions.length / actions.length) * 100) 
                        : 0;
                      
                      return (
                        <div key={type.id}>
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center">
                              <i className={`${type.icon} mr-2 text-primary`}></i>
                              <span>{type.name}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-600 mr-4">{typeActions.length} hành động</span>
                              <span className="font-medium text-primary">{typePoints} điểm</span>
                            </div>
                          </div>
                          <div className="w-full bg-neutral h-2 rounded-full">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateShort } from "@/lib/utils";

interface RecentActionsProps {
  userId: number;
}

export default function RecentActions({ userId }: RecentActionsProps) {
  const { data: recentActions, isLoading } = useQuery({
    queryKey: ['/api/actions/recent', userId],
    queryFn: () => fetch(`/api/actions/recent/${userId}?limit=2`).then(res => res.json()),
    enabled: !!userId,
  });
  
  if (isLoading) {
    return (
      <Card className="dashboard-card p-6 col-span-1 md:col-span-2 bg-white">
        <h2 className="text-primary font-semibold text-lg mb-4">Hành Động Của Bạn</h2>
        <div className="space-y-4">
          {Array(2).fill(0).map((_, index) => (
            <div key={index} className="flex items-start space-x-3 pb-4 border-b border-neutral">
              <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <div>
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-40 w-full mt-2 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }
  
  if (!recentActions || recentActions.length === 0) {
    return (
      <Card className="dashboard-card p-6 col-span-1 md:col-span-2 bg-white">
        <h2 className="text-primary font-semibold text-lg mb-4">Hành Động Của Bạn</h2>
        <div className="text-center py-8 text-gray-500">
          <i className="ri-plant-line text-4xl text-primary-light mb-2"></i>
          <p>Bạn chưa có hành động xanh nào. Hãy bắt đầu ngay hôm nay!</p>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="dashboard-card p-6 col-span-1 md:col-span-2 bg-white">
      <h2 className="text-primary font-semibold text-lg mb-4">Hành Động Của Bạn</h2>
      
      <div className="space-y-4">
        {recentActions.map((action: any, index: number) => (
          <div key={action.id} className={`flex items-start space-x-3 ${index < recentActions.length - 1 ? 'pb-4 border-b border-neutral' : ''}`}>
            <div className="flex-shrink-0">
              <div className={`${index === 0 ? 'bg-primary-light' : 'bg-secondary'} text-white w-10 h-10 rounded-full flex items-center justify-center`}>
                <i className={action.actionType?.icon || 'ri-seedling-line'}></i>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{action.description}</h3>
                  <p className="text-sm text-gray-500">{formatDateShort(action.createdAt)}</p>
                </div>
                <span className="bg-secondary-light text-primary-dark text-xs font-medium px-2 py-1 rounded-full">+{action.points} điểm</span>
              </div>
              {action.imageUrl && (
                <div className="mt-2 rounded-lg overflow-hidden">
                  <img 
                    src={action.imageUrl} 
                    alt={action.description} 
                    className="w-full h-40 object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

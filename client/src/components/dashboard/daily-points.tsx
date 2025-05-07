import React from "react";
import { useQuery } from "@tanstack/react-query";
import { cn, weekdays, getCurrentWeekday } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface DailyPointsProps {
  userId: number;
}

export default function DailyPoints({ userId }: DailyPointsProps) {
  const { data: userActions, isLoading } = useQuery({
    queryKey: ['/api/actions/user', userId],
    enabled: !!userId,
  });
  
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ['/api/users', userId],
    enabled: !!userId,
  });
  
  const today = new Date();
  
  // Group actions by day of the week for the current week
  const getDayPoints = () => {
    if (!userActions) return Array(7).fill(0);
    
    const pointsByDay = Array(7).fill(0);
    const startOfWeek = new Date(today);
    const currentDay = getCurrentWeekday();
    startOfWeek.setDate(today.getDate() - currentDay);
    
    userActions.forEach((action: any) => {
      const actionDate = new Date(action.createdAt);
      // Only include actions from this week
      if (actionDate >= startOfWeek && actionDate <= today) {
        const dayOfWeek = (actionDate.getDay() || 7) - 1; // Convert 0 (Sunday) to 6, 1 (Monday) to 0, etc.
        pointsByDay[dayOfWeek] += action.points;
      }
    });
    
    return pointsByDay;
  };
  
  const pointsByDay = getDayPoints();
  const totalPointsThisWeek = pointsByDay.reduce((sum, points) => sum + points, 0);
  const weeklyTarget = 100; // Target points for the week
  const progressPercentage = Math.min((totalPointsThisWeek / weeklyTarget) * 100, 100);
  
  if (isLoading || isLoadingUser) {
    return (
      <Card className="dashboard-card p-6 col-span-1 bg-white">
        <div className="flex flex-col items-center">
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-14 w-14 rounded-full mb-4" />
          <Skeleton className="h-2 w-full rounded-full mb-4" />
          <div className="grid grid-cols-4 gap-2 w-full">
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <Skeleton className="h-4 w-6 mb-1" />
                <Skeleton className="h-1 w-10 rounded-full mb-1" />
                <Skeleton className="h-3 w-4" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="dashboard-card p-6 col-span-1 bg-white">
      <div className="flex flex-col items-center">
        <h2 className="text-gray-500 mb-1 text-sm">Điểm Mỗi Ngày</h2>
        <div className="text-primary text-5xl font-bold mb-4">
          {user?.totalPoints || 0}
        </div>
        <div className="w-full bg-neutral h-2 rounded-full mb-4">
          <div 
            className="bg-primary h-2 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="grid grid-cols-7 gap-2 w-full">
          {weekdays.map((day, index) => {
            const isToday = index === getCurrentWeekday();
            
            return (
              <div 
                key={index} 
                className={cn(
                  "flex flex-col items-center",
                  isToday && "font-bold"
                )}
              >
                <div className="text-sm font-medium">{pointsByDay[index]}</div>
                <div className={cn(
                  "h-1 w-10 rounded-full",
                  pointsByDay[index] > 0 ? "bg-primary-light" : "bg-neutral"
                )}></div>
                <div className={cn(
                  "text-xs",
                  isToday ? "text-primary" : "text-gray-500"
                )}>{day.short}</div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

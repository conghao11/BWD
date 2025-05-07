import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BadgesProps {
  userId: number;
}

export default function Badges({ userId }: BadgesProps) {
  const { data: userBadges, isLoading } = useQuery({
    queryKey: ['/api/badges/user', userId],
    queryFn: () => fetch(`/api/badges/user/${userId}`).then(res => res.json()),
    enabled: !!userId,
  });
  
  const { data: allBadges } = useQuery({
    queryKey: ['/api/badges'],
    queryFn: () => fetch('/api/badges').then(res => res.json()),
  });
  
  if (isLoading) {
    return (
      <div className="flex justify-around">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <Skeleton className="w-16 h-16 rounded-full mb-2" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    );
  }
  
  const getBadgeColor = (level: string, earned: boolean) => {
    if (!earned) return 'bg-neutral text-gray-400';
    
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
  
  // Combine all badges with earned status
  const badgesWithStatus = allBadges?.map((badge: any) => ({
    ...badge,
    earned: userBadges?.some((userBadge: any) => userBadge.id === badge.id) || false
  })) || [];
  
  return (
    <div className="flex justify-around">
      {badgesWithStatus.map((badge: any) => (
        <TooltipProvider key={badge.id}>
          <Tooltip>
            <TooltipTrigger>
              <div className="badge flex flex-col items-center">
                <div className={`badge-icon ${getBadgeColor(badge.level, badge.earned)}`}>
                  <i className={`${badge.icon} text-2xl`}></i>
                </div>
                <span className={`text-sm font-medium mt-2 ${!badge.earned && 'text-gray-400'}`}>
                  {badge.level}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="text-center">
                <p className="font-medium">{badge.name}</p>
                <p className="text-xs">{badge.description}</p>
                {!badge.earned && (
                  <p className="text-xs mt-1">Cần {badge.requiredPoints} điểm</p>
                )}
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}

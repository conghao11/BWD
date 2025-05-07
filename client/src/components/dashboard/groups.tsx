import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Link } from "wouter";

interface GroupsProps {
  userId: number;
}

export default function Groups({ userId }: GroupsProps) {
  const { data: userGroups, isLoading } = useQuery({
    queryKey: ['/api/groups/user', userId],
    queryFn: () => fetch(`/api/groups/user/${userId}`).then(res => res.json()),
    enabled: !!userId,
  });
  
  const { data: groupMembers, isLoading: isLoadingMembers } = useQuery({
    queryKey: ['/api/groups/members'],
    queryFn: async () => {
      if (!userGroups || userGroups.length === 0) return {};
      
      const membersMap: Record<number, any[]> = {};
      
      await Promise.all(
        userGroups.map(async (group: any) => {
          const response = await fetch(`/api/groups/${group.id}/members`);
          const members = await response.json();
          membersMap[group.id] = members.map((m: any) => m.user);
          return members;
        })
      );
      
      return membersMap;
    },
    enabled: !!userGroups && userGroups.length > 0,
  });
  
  if (isLoading) {
    return (
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-primary font-semibold text-lg">Tổ Xanh Của Bạn</h2>
          <Skeleton className="h-8 w-24" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(2).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-xl" />
          ))}
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </section>
    );
  }
  
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-primary font-semibold text-lg">Tổ Xanh Của Bạn</h2>
        <Link href="/groups">
          <Button variant="link" className="text-primary hover:underline flex items-center text-sm p-0">
            <i className="ri-add-line mr-1"></i>
            <span>Tạo Tổ mới</span>
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userGroups && userGroups.slice(0, 2).map((group: any) => (
          <Card key={group.id} className="dashboard-card p-6 bg-white">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white text-xl">
                <i className={group.icon || "ri-team-line"}></i>
              </div>
              <div className="ml-3">
                <h3 className="font-medium">{group.name}</h3>
                <p className="text-sm text-gray-500">{group.memberCount} thành viên</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Tiến độ tháng</span>
                <span className="text-sm font-medium">{group.totalPoints}/{group.monthlyTarget} điểm</span>
              </div>
              <div className="w-full bg-neutral h-2 rounded-full">
                <div 
                  className="bg-secondary h-2 rounded-full" 
                  style={{ width: `${Math.min((group.totalPoints / group.monthlyTarget) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            {groupMembers && groupMembers[group.id] && (
              <AvatarGroup 
                users={groupMembers[group.id] || []} 
                max={5}
                size="sm"
              />
            )}
          </Card>
        ))}
        
        <Card className="dashboard-card p-6 bg-neutral-light border-2 border-dashed border-primary-light flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-white border-2 border-primary-light flex items-center justify-center text-primary text-2xl mb-4">
            <i className="ri-add-line"></i>
          </div>
          <h3 className="font-medium text-primary mb-1">Tham gia Tổ Xanh</h3>
          <p className="text-sm text-gray-600 mb-4">Tạo hoặc tham gia nhóm để cùng nhau bảo vệ môi trường</p>
          <Link href="/groups">
            <Button className="bg-white text-primary hover:bg-primary-light hover:text-white border border-primary-light">
              Khám phá nhóm
            </Button>
          </Link>
        </Card>
      </div>
    </section>
  );
}

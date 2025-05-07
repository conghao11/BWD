import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

interface AvatarGroupProps {
  users: Array<{
    id: number;
    displayName: string;
    avatar?: string | null;
  }>;
  max?: number;
  size?: "sm" | "md" | "lg";
}

export function AvatarGroup({ users, max = 5, size = "md" }: AvatarGroupProps) {
  const displayUsers = users.slice(0, max);
  const remainingCount = users.length - max;
  
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "w-8 h-8 text-xs";
      case "lg":
        return "w-12 h-12 text-lg";
      default:
        return "w-10 h-10 text-sm";
    }
  };
  
  const sizeClass = getSizeClass();
  
  return (
    <div className="flex -space-x-2">
      {displayUsers.map((user) => (
        <Avatar
          key={user.id}
          className={`${sizeClass} border-2 border-white`}
        >
          <AvatarImage src={user.avatar || undefined} alt={user.displayName} />
          <AvatarFallback className="bg-secondary text-white">
            {getInitials(user.displayName)}
          </AvatarFallback>
        </Avatar>
      ))}
      
      {remainingCount > 0 && (
        <div className={`${sizeClass} flex items-center justify-center rounded-full bg-neutral border-2 border-white text-gray-700`}>
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

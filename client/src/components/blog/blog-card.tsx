import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, formatDate, truncateText } from "@/lib/utils";

interface BlogCardProps {
  post: {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    createdAt: string;
    author: {
      id: number;
      displayName: string;
      avatar?: string;
    };
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="dashboard-card overflow-hidden">
      <div className="relative h-48">
        <img 
          src={post.imageUrl || "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <h3 className="absolute bottom-4 left-4 text-white font-medium text-lg">{post.title}</h3>
      </div>
      <div className="p-4">
        <p className="text-gray-600 text-sm line-clamp-3">
          {truncateText(post.content, 120)}
        </p>
        <div className="flex items-center mt-4">
          <Avatar className="flex-shrink-0 w-8 h-8">
            <AvatarImage src={post.author.avatar || undefined} alt={post.author.displayName} />
            <AvatarFallback className="bg-primary-light text-white">
              {getInitials(post.author.displayName)}
            </AvatarFallback>
          </Avatar>
          <div className="ml-2">
            <p className="text-sm font-medium">{post.author.displayName}</p>
            <p className="text-xs text-gray-500">{formatDate(post.createdAt)}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

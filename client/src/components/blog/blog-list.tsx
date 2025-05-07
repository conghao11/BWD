import React from "react";
import { useQuery } from "@tanstack/react-query";
import BlogCard from "./blog-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

export default function BlogList({ limit }: { limit?: number }) {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['/api/blog-posts'],
    queryFn: () => fetch('/api/blog-posts').then(res => res.json()),
  });
  
  if (isLoading) {
    return (
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-primary font-semibold text-lg">Blog</h2>
          <Skeleton className="h-8 w-24" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array(limit || 3).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-[300px] rounded-xl" />
          ))}
        </div>
      </section>
    );
  }
  
  if (!posts || posts.length === 0) {
    return (
      <section className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-primary font-semibold text-lg">Blog</h2>
        </div>
        
        <div className="text-center py-10 bg-white rounded-lg dashboard-card">
          <i className="ri-article-line text-5xl text-primary-light mb-3"></i>
          <p className="text-gray-600">Chưa có bài viết nào được đăng.</p>
        </div>
      </section>
    );
  }
  
  const displayPosts = limit ? posts.slice(0, limit) : posts;
  
  return (
    <section className="mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-primary font-semibold text-lg">Blog</h2>
        {limit && (
          <Link href="/blog">
            <Button variant="link" className="text-primary hover:underline flex items-center text-sm p-0">
              <span>Xem tất cả</span> <i className="ri-arrow-right-line ml-1"></i>
            </Button>
          </Link>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayPosts.map((post: any) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

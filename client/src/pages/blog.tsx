import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BlogCard from "@/components/blog/blog-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Blog() {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const { data: posts, isLoading } = useQuery({
    queryKey: ['/api/blog-posts'],
    queryFn: () => fetch('/api/blog-posts').then(res => res.json()),
  });
  
  const filteredPosts = React.useMemo(() => {
    if (!posts) return [];
    if (!searchTerm) return posts;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return posts.filter((post: any) => 
      post.title.toLowerCase().includes(lowerSearchTerm) || 
      post.content.toLowerCase().includes(lowerSearchTerm) ||
      post.author.displayName.toLowerCase().includes(lowerSearchTerm)
    );
  }, [posts, searchTerm]);
  
  return (
    <>
      <Helmet>
        <title>Blog - Cây Xanh Mỗi Ngày</title>
        <meta name="description" content="Blog truyền cảm hứng về bảo vệ môi trường, sống xanh và các câu chuyện từ cộng đồng." />
      </Helmet>
      
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Blog</h1>
      </div>
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Tìm kiếm bài viết..."
          className="flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Tất cả</TabsTrigger>
          <TabsTrigger value="environment">Môi trường</TabsTrigger>
          <TabsTrigger value="sustainable">Sống xanh</TabsTrigger>
          <TabsTrigger value="community">Cộng đồng</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-[320px] rounded-xl" />
          ))}
        </div>
      ) : !filteredPosts || filteredPosts.length === 0 ? (
        <Card className="dashboard-card">
          <CardContent className="flex flex-col items-center py-12">
            <i className="ri-article-line text-5xl text-primary-light mb-4"></i>
            {searchTerm ? (
              <>
                <h2 className="text-xl font-semibold text-primary mb-2">Không tìm thấy kết quả</h2>
                <p className="text-gray-600 text-center">Không có bài viết nào phù hợp với tìm kiếm của bạn.</p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-primary mb-2">Chưa có bài viết</h2>
                <p className="text-gray-600 text-center">Hiện tại chưa có bài viết nào trong chuyên mục này.</p>
              </>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post: any) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}

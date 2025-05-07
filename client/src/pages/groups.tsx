import React from "react";
import { Helmet } from "react-helmet";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const groupSchema = z.object({
  name: z.string().min(3, { message: "Tên nhóm phải có ít nhất 3 ký tự" }).max(50, { message: "Tên nhóm tối đa 50 ký tự" }),
  description: z.string().min(10, { message: "Mô tả phải có ít nhất 10 ký tự" }).max(500, { message: "Mô tả tối đa 500 ký tự" }),
});

type GroupFormValues = z.infer<typeof groupSchema>;

export default function Groups() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState(false);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState<any>(null);
  
  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });
  
  const { data: allGroups, isLoading: isLoadingAllGroups } = useQuery({
    queryKey: ['/api/groups'],
    queryFn: () => fetch('/api/groups').then(res => res.json()),
  });
  
  const { data: userGroups, isLoading: isLoadingUserGroups } = useQuery({
    queryKey: ['/api/groups/user', user?.id],
    queryFn: () => fetch(`/api/groups/user/${user?.id}`).then(res => res.json()),
    enabled: !!user?.id,
  });
  
  const { data: groupMembers, isLoading: isLoadingMembers } = useQuery({
    queryKey: ['/api/groups/members'],
    queryFn: async () => {
      if (!allGroups || allGroups.length === 0) return {};
      
      const membersMap: Record<number, any[]> = {};
      
      await Promise.all(
        allGroups.map(async (group: any) => {
          const response = await fetch(`/api/groups/${group.id}/members`);
          const members = await response.json();
          membersMap[group.id] = members.map((m: any) => m.user);
          return members;
        })
      );
      
      return membersMap;
    },
    enabled: !!allGroups && allGroups.length > 0,
  });
  
  const createGroup = useMutation({
    mutationFn: async (values: GroupFormValues) => {
      if (!user) throw new Error("Người dùng chưa đăng nhập");
      
      return apiRequest("POST", "/api/groups", {
        name: values.name,
        description: values.description,
        createdBy: user.id,
        icon: "ri-team-line",
        monthlyTarget: 500,
      });
    },
    onSuccess: () => {
      toast({
        title: "Thành công!",
        description: "Tổ xanh mới đã được tạo.",
      });
      
      // Reset the form and close dialog
      form.reset();
      setIsCreateDialogOpen(false);
      
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['/api/groups'] });
      queryClient.invalidateQueries({ queryKey: ['/api/groups/user', user?.id] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Không thể tạo Tổ xanh.",
      });
    },
  });
  
  const joinGroup = useMutation({
    mutationFn: async (groupId: number) => {
      if (!user) throw new Error("Người dùng chưa đăng nhập");
      
      return apiRequest("POST", "/api/groups/join", {
        groupId,
        userId: user.id,
        isAdmin: false,
      });
    },
    onSuccess: () => {
      toast({
        title: "Thành công!",
        description: "Bạn đã tham gia Tổ xanh.",
      });
      
      // Close dialog
      setIsJoinDialogOpen(false);
      setSelectedGroup(null);
      
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['/api/groups'] });
      queryClient.invalidateQueries({ queryKey: ['/api/groups/user', user?.id] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Không thể tham gia Tổ xanh.",
      });
    },
  });
  
  const onCreateSubmit = (data: GroupFormValues) => {
    createGroup.mutate(data);
  };
  
  const openJoinDialog = (group: any) => {
    setSelectedGroup(group);
    setIsJoinDialogOpen(true);
  };
  
  const handleJoinGroup = () => {
    if (selectedGroup) {
      joinGroup.mutate(selectedGroup.id);
    }
  };
  
  // Check if user is already a member of a group
  const isUserMember = (groupId: number) => {
    return userGroups?.some((g: any) => g.id === groupId);
  };
  
  const userGroupIds = userGroups?.map((g: any) => g.id) || [];
  const otherGroups = allGroups?.filter((g: any) => !userGroupIds.includes(g.id)) || [];
  
  return (
    <>
      <Helmet>
        <title>Tổ Xanh - Cây Xanh Mỗi Ngày</title>
        <meta name="description" content="Tham gia hoặc tạo mới các Tổ xanh để cùng nhau bảo vệ môi trường." />
      </Helmet>
      
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Tổ Xanh</h1>
        <Button 
          className="bg-primary text-white hover:bg-primary-dark"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          <i className="ri-add-line mr-1"></i>
          Tạo Tổ mới
        </Button>
      </div>
      
      {isLoadingUserGroups ? (
        <Card className="dashboard-card mb-8">
          <CardHeader>
            <CardTitle className="text-primary">Tổ xanh của bạn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array(2).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-48 w-full rounded-xl" />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : !userGroups || userGroups.length === 0 ? (
        <Card className="dashboard-card mb-8">
          <CardHeader>
            <CardTitle className="text-primary">Tổ xanh của bạn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <i className="ri-team-line text-5xl text-primary-light mb-3"></i>
              <p className="text-gray-600 mb-4">Bạn chưa tham gia Tổ xanh nào.</p>
              <Button 
                className="bg-primary text-white hover:bg-primary-dark"
                onClick={() => setIsCreateDialogOpen(true)}
              >
                Tạo Tổ mới ngay
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="dashboard-card mb-8">
          <CardHeader>
            <CardTitle className="text-primary">Tổ xanh của bạn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userGroups.map((group: any) => (
                <Card key={group.id} className="dashboard-card bg-white">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white text-xl">
                        <i className={group.icon || "ri-team-line"}></i>
                      </div>
                      <div className="ml-3">
                        <h3 className="font-medium">{group.name}</h3>
                        <p className="text-sm text-gray-500">{group.memberCount} thành viên</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{group.description}</p>
                    
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {isLoadingAllGroups ? (
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-primary">Khám phá Tổ xanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Input
                placeholder="Tìm kiếm Tổ xanh..."
                className="max-w-md"
                disabled
              />
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full rounded-xl" />
              ))}
            </div>
          </CardContent>
        </Card>
      ) : otherGroups.length === 0 ? (
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-primary">Khám phá Tổ xanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <i className="ri-search-line text-5xl text-primary-light mb-3"></i>
              <p className="text-gray-600">Không có Tổ xanh nào để khám phá.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="dashboard-card">
          <CardHeader>
            <CardTitle className="text-primary">Khám phá Tổ xanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Input
                placeholder="Tìm kiếm Tổ xanh..."
                className="max-w-md"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {otherGroups.map((group: any) => (
                <div 
                  key={group.id} 
                  className="flex items-center justify-between p-4 rounded-lg border border-neutral hover:border-primary hover:bg-neutral-light transition-colors"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white text-xl mr-4">
                      <i className={group.icon || "ri-team-line"}></i>
                    </div>
                    <div>
                      <h3 className="font-medium">{group.name}</h3>
                      <p className="text-sm text-gray-500">{group.memberCount} thành viên</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="bg-secondary text-white hover:bg-secondary-dark"
                    onClick={() => openJoinDialog(group)}
                    disabled={isUserMember(group.id)}
                  >
                    {isUserMember(group.id) ? "Đã tham gia" : "Tham gia"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Create Group Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-primary text-xl">Tạo Tổ xanh mới</DialogTitle>
            <DialogDescription>
              Tạo một Tổ xanh để cùng nhau thực hiện các hành động bảo vệ môi trường.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onCreateSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên Tổ xanh</FormLabel>
                    <FormControl>
                      <Input placeholder="Ví dụ: Sinh viên Khoa Môi Trường" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Giới thiệu về Tổ xanh của bạn..." 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsCreateDialogOpen(false)}
                  disabled={createGroup.isPending}
                >
                  Hủy
                </Button>
                <Button 
                  type="submit" 
                  className="bg-primary text-white hover:bg-primary-dark ml-2"
                  disabled={createGroup.isPending}
                >
                  {createGroup.isPending ? "Đang tạo..." : "Tạo Tổ xanh"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Join Group Dialog */}
      <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-primary text-xl">Tham gia Tổ xanh</DialogTitle>
            <DialogDescription>
              Bạn muốn tham gia Tổ xanh {selectedGroup?.name}?
            </DialogDescription>
          </DialogHeader>
          
          {selectedGroup && (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white text-xl">
                  <i className={selectedGroup.icon || "ri-team-line"}></i>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium">{selectedGroup.name}</h3>
                  <p className="text-sm text-gray-500">{selectedGroup.memberCount} thành viên</p>
                </div>
              </div>
              
              <p className="text-gray-600">{selectedGroup.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Tiến độ tháng</span>
                  <span className="text-sm font-medium">{selectedGroup.totalPoints}/{selectedGroup.monthlyTarget} điểm</span>
                </div>
                <div className="w-full bg-neutral h-2 rounded-full">
                  <div 
                    className="bg-secondary h-2 rounded-full" 
                    style={{ width: `${Math.min((selectedGroup.totalPoints / selectedGroup.monthlyTarget) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                setIsJoinDialogOpen(false);
                setSelectedGroup(null);
              }}
              disabled={joinGroup.isPending}
            >
              Hủy
            </Button>
            <Button 
              type="button" 
              className="bg-primary text-white hover:bg-primary-dark ml-2"
              onClick={handleJoinGroup}
              disabled={joinGroup.isPending}
            >
              {joinGroup.isPending ? "Đang xử lý..." : "Xác nhận tham gia"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

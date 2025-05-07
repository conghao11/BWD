import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { apiRequest } from "@/lib/queryClient";

interface DailyChallengeProps {
  userId: number;
}

export default function DailyChallenge({ userId }: DailyChallengeProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [infoOpen, setInfoOpen] = React.useState(false);
  
  const { data: challenge, isLoading } = useQuery({
    queryKey: ['/api/challenges/current'],
    queryFn: () => fetch('/api/challenges/current').then(res => res.json()),
  });
  
  const { data: userChallenges, isLoading: isLoadingUserChallenges } = useQuery({
    queryKey: ['/api/challenges/user', userId],
    queryFn: () => fetch(`/api/challenges/user/${userId}`).then(res => res.json()),
    enabled: !!userId,
  });
  
  const { data: streak, isLoading: isLoadingStreak } = useQuery({
    queryKey: ['/api/streaks/user', userId],
    queryFn: () => fetch(`/api/streaks/user/${userId}`).then(res => res.json()),
    enabled: !!userId,
  });
  
  const completeMutation = useMutation({
    mutationFn: async () => {
      if (!challenge || !userId) return;
      return apiRequest("POST", "/api/challenges/complete", {
        userId,
        challengeId: challenge.id
      });
    },
    onSuccess: () => {
      toast({
        title: "Thành công!",
        description: `Bạn đã hoàn thành thử thách và nhận ${challenge?.points} điểm.`,
      });
      queryClient.invalidateQueries({ queryKey: ['/api/challenges/user', userId] });
      queryClient.invalidateQueries({ queryKey: ['/api/streaks/user', userId] });
      queryClient.invalidateQueries({ queryKey: ['/api/users', userId] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Không thể hoàn thành thử thách.",
      });
    },
  });
  
  // Check if user has completed the current challenge
  const isCompleted = React.useMemo(() => {
    if (!challenge || !userChallenges) return false;
    return userChallenges.some((c: any) => c.id === challenge.id);
  }, [challenge, userChallenges]);
  
  if (isLoading || isLoadingUserChallenges || isLoadingStreak) {
    return (
      <Card className="dashboard-card p-6 bg-white relative overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-64 mb-4" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-36 rounded-full" />
              <Skeleton className="h-10 w-28 rounded-full" />
            </div>
          </div>
          
          <Skeleton className="h-24 w-64 rounded-lg mt-6 md:mt-0" />
        </div>
      </Card>
    );
  }
  
  if (!challenge) {
    return (
      <Card className="dashboard-card p-6 bg-white relative overflow-hidden mb-8">
        <div className="text-center py-4">
          <i className="ri-calendar-check-line text-4xl text-primary-light mb-2"></i>
          <p className="text-gray-600">Không có thử thách nào đang diễn ra.</p>
        </div>
      </Card>
    );
  }
  
  return (
    <>
      <Card className="dashboard-card p-6 bg-white relative overflow-hidden mb-8">
        <div className="absolute right-0 top-0 w-32 h-32 opacity-10">
          <i className="ri-leaf-line text-9xl text-primary-light"></i>
        </div>
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h2 className="text-primary font-semibold text-lg mb-2">Thử Thách Hôm Nay</h2>
            <p className="text-gray-600 mb-4">{challenge.description}</p>
            <div className="flex items-center space-x-4">
              <Button
                className={isCompleted ? "bg-secondary text-white" : "bg-primary hover:bg-primary-dark text-white"}
                onClick={() => !isCompleted && completeMutation.mutate()}
                disabled={isCompleted || completeMutation.isPending}
              >
                {isCompleted ? (
                  <>
                    <i className="ri-check-line mr-1"></i>Đã Hoàn Thành
                  </>
                ) : completeMutation.isPending ? (
                  "Đang xử lý..."
                ) : (
                  <>
                    <i className="ri-check-line mr-1"></i>Đã Hoàn Thành
                  </>
                )}
              </Button>
              <Button variant="outline" className="text-primary hover:text-primary-dark border border-primary hover:border-primary-dark" onClick={() => setInfoOpen(true)}>
                <i className="ri-information-line mr-1"></i>Chi Tiết
              </Button>
            </div>
          </div>
          
          <div className="mt-6 md:mt-0">
            <div className="bg-neutral-light p-4 rounded-lg">
              <h3 className="font-medium text-primary mb-2">7 Ngày Xanh Liên Tục</h3>
              <div className="flex space-x-2">
                {Array(7).fill(null).map((_, i) => {
                  const day = i + 1;
                  const isActive = streak && streak.currentStreak >= day;
                  
                  return (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isActive
                          ? "bg-primary-light text-white"
                          : "bg-neutral text-gray-500"
                      }`}
                    >
                      {isActive ? <i className="ri-check-line"></i> : day}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <Dialog open={infoOpen} onOpenChange={setInfoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-primary">Thông tin thử thách</DialogTitle>
            <DialogDescription>
              Hoàn thành thử thách để nhận điểm và kéo dài chuỗi ngày xanh của bạn.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">{challenge.title}</h3>
              <p className="text-sm text-gray-600">{challenge.description}</p>
            </div>
            
            <div className="bg-neutral-light p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span>Điểm nhận được:</span>
                <span className="font-medium text-primary">{challenge.points} điểm</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Chuỗi ngày xanh</h4>
              <p className="text-sm text-gray-600">
                Hoàn thành thử thách mỗi ngày để duy trì chuỗi ngày xanh của bạn. Chuỗi hiện tại của bạn là: <span className="font-medium text-primary">{streak?.currentStreak || 0} ngày</span>.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Chuỗi dài nhất của bạn: <span className="font-medium text-primary">{streak?.longestStreak || 0} ngày</span>.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

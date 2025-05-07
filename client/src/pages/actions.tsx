import React from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ActionModal } from "@/components/actions/action-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getInitials, formatDate } from "@/lib/utils";

export default function Actions() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  
  const { data: actions, isLoading } = useQuery({
    queryKey: ['/api/actions/user', user?.id],
    queryFn: () => fetch(`/api/actions/user/${user?.id}`).then(res => res.json()),
    enabled: !!user?.id,
  });
  
  const { data: actionTypes } = useQuery({
    queryKey: ['/api/action-types'],
    queryFn: () => fetch('/api/action-types').then(res => res.json()),
  });
  
  const getActionType = (actionTypeId: number) => {
    return actionTypes?.find((type: any) => type.id === actionTypeId);
  };
  
  return (
    <>
      <Helmet>
        <title>Hành động xanh - Cây Xanh Mỗi Ngày</title>
        <meta name="description" content="Lịch sử các hành động xanh của bạn trên Cây Xanh Mỗi Ngày." />
      </Helmet>
      
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary">Hành Động Xanh</h1>
        <Button 
          className="bg-primary text-white hover:bg-primary-dark"
          onClick={() => setIsModalOpen(true)}
        >
          <i className="ri-add-line mr-1"></i>
          Hành động mới
        </Button>
      </div>
      
      {isLoading ? (
        <div className="space-y-6">
          {Array(5).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      ) : !actions || actions.length === 0 ? (
        <Card className="dashboard-card">
          <CardContent className="flex flex-col items-center py-12">
            <i className="ri-plant-line text-5xl text-primary-light mb-4"></i>
            <h2 className="text-xl font-semibold text-primary mb-2">Chưa có hành động nào</h2>
            <p className="text-gray-600 text-center mb-6">Hãy bắt đầu ghi nhận hành động xanh của bạn ngay hôm nay!</p>
            <Button 
              className="bg-primary text-white hover:bg-primary-dark"
              onClick={() => setIsModalOpen(true)}
            >
              <i className="ri-add-line mr-1"></i>
              Hành động mới
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {actions.map((action: any) => {
            const actionType = getActionType(action.actionTypeId);
            
            return (
              <Card key={action.id} className="dashboard-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="bg-primary-light text-white w-10 h-10 rounded-full flex items-center justify-center">
                          <i className={actionType?.icon || "ri-leaf-line"}></i>
                        </div>
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">{action.description}</h3>
                            <p className="text-sm text-gray-500">{formatDate(action.createdAt)}</p>
                          </div>
                          <span className="bg-secondary-light text-primary-dark text-xs font-medium px-2 py-1 rounded-full">
                            +{action.points} điểm
                          </span>
                        </div>
                        
                        <div className="mt-3 flex items-center">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={user?.avatar || undefined} alt={user?.displayName} />
                            <AvatarFallback className="bg-primary-light text-white text-xs">
                              {getInitials(user?.displayName || "")}
                            </AvatarFallback>
                          </Avatar>
                          <span className="ml-2 text-sm text-gray-600">{user?.displayName}</span>
                          {action.location && (
                            <>
                              <span className="mx-2 text-gray-400">•</span>
                              <i className="ri-map-pin-line text-gray-400 mr-1"></i>
                              <span className="text-sm text-gray-600">{action.location}</span>
                            </>
                          )}
                        </div>
                        
                        {action.imageUrl && (
                          <div className="mt-4 rounded-lg overflow-hidden">
                            <img 
                              src={action.imageUrl} 
                              alt={action.description} 
                              className="w-full max-h-80 object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      
      <ActionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

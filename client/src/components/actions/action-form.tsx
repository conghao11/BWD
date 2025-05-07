import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/context/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const actionFormSchema = z.object({
  actionTypeId: z.string().min(1, { message: "Vui lòng chọn loại hành động" }),
  description: z.string().min(3, { message: "Mô tả ít nhất 3 ký tự" }).max(200, { message: "Mô tả tối đa 200 ký tự" }),
  location: z.string().optional(),
  imageUrl: z.string().optional(),
});

type ActionFormValues = z.infer<typeof actionFormSchema>;

interface ActionFormProps {
  onSuccess?: () => void;
}

export default function ActionForm({ onSuccess }: ActionFormProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  
  const form = useForm<ActionFormValues>({
    resolver: zodResolver(actionFormSchema),
    defaultValues: {
      actionTypeId: "",
      description: "",
      location: "",
      imageUrl: "",
    },
  });
  
  const { data: actionTypes, isLoading: isLoadingActionTypes } = useQuery({
    queryKey: ['/api/action-types'],
    queryFn: () => fetch('/api/action-types').then(res => res.json()),
  });
  
  const createAction = useMutation({
    mutationFn: async (values: ActionFormValues) => {
      if (!user) throw new Error("Người dùng chưa đăng nhập");
      
      const actionTypeId = parseInt(values.actionTypeId);
      const actionType = actionTypes.find((type: any) => type.id === actionTypeId);
      
      if (!actionType) throw new Error("Loại hành động không hợp lệ");
      
      return apiRequest("POST", "/api/actions", {
        userId: user.id,
        actionTypeId,
        description: values.description,
        points: actionType.points,
        location: values.location || null,
        imageUrl: values.imageUrl || null,
      });
    },
    onSuccess: () => {
      toast({
        title: "Thành công!",
        description: "Hành động xanh của bạn đã được ghi nhận.",
      });
      
      // Reset the form
      form.reset();
      setImagePreview(null);
      
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['/api/actions/user', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['/api/actions/recent', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['/api/users', user?.id] });
      
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: error instanceof Error ? error.message : "Không thể ghi nhận hành động.",
      });
    },
  });
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // For demonstration, we're using a placeholder URL
    // In a real app, you would upload this to a service like Cloudinary
    const fakeUrl = "https://images.unsplash.com/photo-1551893665-f843f600794e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
    setImagePreview(fakeUrl);
    form.setValue("imageUrl", fakeUrl);
  };
  
  const onSubmit = (data: ActionFormValues) => {
    createAction.mutate(data);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="actionTypeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Loại hành động</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                disabled={isLoadingActionTypes || createAction.isPending}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại hành động" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {actionTypes?.map((type: any) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      <div className="flex items-center">
                        <i className={`${type.icon} mr-2`}></i>
                        <span>{type.name} ({type.points} điểm)</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  placeholder="Mô tả hành động của bạn..." 
                  className="resize-none" 
                  {...field} 
                  disabled={createAction.isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Địa điểm</FormLabel>
              <div className="flex space-x-2">
                <FormControl>
                  <Input 
                    placeholder="Nhập địa điểm" 
                    {...field} 
                    disabled={createAction.isPending}
                  />
                </FormControl>
                <Button 
                  type="button" 
                  className="bg-secondary-light text-primary hover:bg-secondary hover:text-white" 
                  disabled={createAction.isPending}
                >
                  <i className="ri-map-pin-line"></i>
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel>Ảnh minh họa</FormLabel>
              <div className="border-2 border-dashed border-neutral rounded-lg p-4 text-center">
                <input 
                  type="file" 
                  id="action-image" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  disabled={createAction.isPending}
                  {...field}
                />
                {imagePreview ? (
                  <div className="flex flex-col items-center">
                    <div className="relative w-full h-40 mb-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-2 right-2 bg-white rounded-full p-1"
                        onClick={() => {
                          setImagePreview(null);
                          onChange("");
                        }}
                      >
                        <i className="ri-close-line text-gray-500"></i>
                      </button>
                    </div>
                    <span className="text-sm text-gray-500">Nhấp để thay đổi</span>
                  </div>
                ) : (
                  <label htmlFor="action-image" className="flex flex-col items-center justify-center cursor-pointer">
                    <i className="ri-upload-cloud-line text-3xl text-gray-400 mb-2"></i>
                    <span className="text-sm text-gray-500">Nhấp để tải lên hoặc kéo thả hình ảnh</span>
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG (tối đa 5MB)</span>
                  </label>
                )}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-3 mt-6">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onSuccess}
            disabled={createAction.isPending}
          >
            Hủy
          </Button>
          <Button 
            type="submit" 
            className="bg-primary text-white hover:bg-primary-dark"
            disabled={createAction.isPending}
          >
            {createAction.isPending ? "Đang gửi..." : "Gửi hành động"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

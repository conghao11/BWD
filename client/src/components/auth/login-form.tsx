import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/context/auth-context";

const loginSchema = z.object({
  email: z.string().email({ message: "Email không hợp lệ" }),
  password: z.string().min(1, { message: "Vui lòng nhập mật khẩu" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  const { login } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const onSubmit = async (values: LoginFormValues) => {
  setIsSubmitting(true);
  try {
    const res = await apiRequest("POST", "/api/auth/login", values);
    await throwIfResNotOk(res);

    const me = await fetch("/api/auth/me", {
      credentials: "include",
    });

    if (!me.ok) throw new Error("Không xác thực");

    const user = await me.json();
login(user); // cập nhật context

toast({
  title: "Đăng nhập thành công",
  description: "Chào mừng bạn trở lại với GreenChallenge!",
});

// 👉 Thay vì reload toàn bộ, chỉ redirect bằng router
window.location.assign("/profile"); // hoặc nếu dùng react-router: navigate("/profile")

  } catch (error) {
    toast({
      variant: "destructive",
      title: "Đăng nhập thất bại",
      description:
        error instanceof Error ? error.message : "Email hoặc mật khẩu không đúng",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-primary text-2xl font-semibold">Đăng nhập</CardTitle>
        <CardDescription>
          Đăng nhập để tiếp tục hành trình bảo vệ môi trường của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="nguyenvan@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary-dark" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-600">
          Chưa có tài khoản?{" "}
          <Link href="/register">
            <a className="text-primary hover:underline font-medium">Đăng ký ngay</a>
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
}



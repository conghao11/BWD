import React from "react";
import { Helmet } from "react-helmet";
import RegisterForm from "@/components/auth/register-form";
import { Link } from "wouter";

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Đăng ký - GreenChallenge</title>
        <meta name="description" content="Đăng ký tài khoản Cây Xanh Mỗi Ngày để bắt đầu hành trình bảo vệ môi trường." />
      </Helmet>
      
      <div className="flex justify-center mb-8">
        <Link href="/" className="flex items-center text-primary">
  <i className="ri-plant-line text-3xl mr-2"></i>
  <span className="text-2xl font-semibold">GreenChallenge</span>
</Link>
      </div>
      
      <RegisterForm />
    </div>
  );
}

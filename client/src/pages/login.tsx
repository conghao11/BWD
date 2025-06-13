import React from "react";
import { Helmet } from "react-helmet";
import LoginForm from "@/components/auth/login-form";
import { Link } from "wouter";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Đăng nhập - GreenChallenge</title>
        <meta name="description" content="Đăng nhập vào ứng dụng GreenChallenge để tiếp tục hành trình bảo vệ môi trường của bạn." />
      </Helmet>
      
      <div className="flex justify-center mb-8">
        <Link href="/">
          <a className="flex items-center text-primary">
            <i className="ri-plant-line text-3xl mr-2"></i>
            <span className="text-2xl font-semibold">GreenChallenge</span>
          </a>
        </Link>
      </div>
      
      <LoginForm />
    </div>
  );
}

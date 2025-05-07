import React from "react";
import Header from "./header";
import MobileNav from "./mobile-nav";
import { useAuth } from "@/context/auth-context";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-6 mb-20 md:mb-6 flex-grow">
        {children}
      </main>
      {isAuthenticated && <MobileNav />}
    </div>
  );
}

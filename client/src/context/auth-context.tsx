import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

interface User {
  id: number;
  username: string;
  email: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  totalPoints: number;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Try to load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);
  
  // Check if stored user is still valid
  const { isLoading } = useQuery({
    queryKey: ['/api/auth/me', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      try {
        const response = await fetch(`/api/auth/me?userId=${user.id}`);
        if (!response.ok) {
          throw new Error("User session invalid");
        }
        
        const userData = await response.json();
        // Update user data if it's changed
        if (JSON.stringify(userData) !== JSON.stringify(user)) {
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
        
        return userData;
      } catch (error) {
        // If there's an error, the user session is probably invalid
        setUser(null);
        localStorage.removeItem("user");
        return null;
      }
    },
    enabled: !!user,
    retry: false,
  });
  
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Clear all queries when logging out
    queryClient.clear();
  };
  
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading: isLoading && !!user,
    login,
    logout,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

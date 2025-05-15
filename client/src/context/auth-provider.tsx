import React, { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from "wouter";

// Define the auth context type
interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [, setLocation] = useLocation();

  // Check for existing auth on mount
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Login function
  const login = (email: string, password: string) => {
    // This is just a placeholder for now
    console.log("Logging in with:", email, password);
    // Set as authenticated
    setIsAuthenticated(true);
    // Save token to localStorage
    localStorage.setItem("auth-token", "dummy-token");
    // Redirect to dashboard
    setLocation("/dashboard");
  };

  // Register function
  const register = (name: string, email: string, password: string) => {
    // This is just a placeholder for now
    console.log("Registering with:", name, email, password);
    // Set as authenticated
    setIsAuthenticated(true);
    // Save token to localStorage
    localStorage.setItem("auth-token", "dummy-token");
    // Redirect to dashboard
    setLocation("/dashboard");
  };

  // Logout function
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("auth-token");
    setLocation("/");
  };

  // Provide the auth context value
  const value = {
    isAuthenticated,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
} 
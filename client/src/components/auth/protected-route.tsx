import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/context/auth-provider";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     setLocation("/login");
  //   }
  // }, [isAuthenticated, setLocation]);

  // If not authenticated, return null (redirect happens in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  // If authenticated, render children
  return <>{children}</>;
} 
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface RequireAuthProps {
  children: JSX.Element;
  routeRole?: "user" | "admin" | "root"; // default is "user"
}

export default function RequireAuth({ children, routeRole = "user" }: RequireAuthProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) return <Navigate to="/" />;

  //TODO  refactor this use shared types
  const roleHierarchy = {
    user: 1,
    admin: 2,
    root: 3,
  };

  const userLevel = roleHierarchy[user.role as keyof typeof roleHierarchy];
  const requiredLevel = roleHierarchy[routeRole];

  if (userLevel < requiredLevel) {
    return <Navigate to="/" />;
  }

  return children;
}

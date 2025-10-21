import type { PropsWithChildren } from "react";
import { useAuth } from "../providers/AuthProvider";
import Loader from "./Loader";
import { Navigate, Outlet } from "react-router-dom";
import PermissionDenied from "./PermissionDenied";

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: string[];
};

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { currentUser ,isLoading } = useAuth();

  if (isLoading) return <Loader />;
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes((currentUser as any).role)) {
    return <PermissionDenied />;
  }

  return children ?? <Outlet />;
}

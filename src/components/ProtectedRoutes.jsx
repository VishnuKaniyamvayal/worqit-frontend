import { useAuth } from "../providers/AuthProvider";
import Loader from "./Loader";
import { Navigate, Outlet } from "react-router-dom";
import PermissionDenied from "./PermissionDenied";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser ,isLoading } = useAuth();

  if (isLoading) return <Loader />;
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes((currentUser).role)) {
    return <PermissionDenied />;
  }

  return children ?? <Outlet />;
}

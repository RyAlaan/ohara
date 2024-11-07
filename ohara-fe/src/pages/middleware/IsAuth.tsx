import { useAuth } from "@/context/AuthContext/AuthContext";
import { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminPage({ children }: { children?: ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children ? children : <Outlet />;
}

export default AdminPage;

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

export default function ProtectedAdminRoute({ children }) {
  const { user, token } = useAuth();

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}

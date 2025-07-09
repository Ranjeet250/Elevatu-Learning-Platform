// src/components/PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { toast } from "react-toastify";

export default function PrivateRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    toast.error("Login required to view this course");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

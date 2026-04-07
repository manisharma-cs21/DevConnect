import { Navigate } from "react-router-dom";
import AccessDenied from "../pages/AccessDenied";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  const payload = JSON.parse(atob(token.split(".")[1]));

  if (payload.role !== "admin") {
    return <AccessDenied/>;
  }

  return children;
}
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export function useAdminRedirect() {
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || (user.role !== "ADMIN" && user.role !== "STAFF")) {
      navigate("/"); // Redirect om ej admin
    }
  }, [user, navigate]);
  return !!user && (user.role === "ADMIN" || user.role === "STAFF");
}

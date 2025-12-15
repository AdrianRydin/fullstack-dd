import { logoutUser } from "../../api/auth";
import { useAuthStore } from "../../features/authentication/store/authStore";

export function useLogout() {
  const clearAuth = useAuthStore((s) => s.logout);

  return async () => {
    try {
      await logoutUser();          // POST /api/auth/logout (via apiFetch)
    } catch (e) {
      console.error("Logout failed", e);
      // även om backend failar vill vi ändå städa client state
    } finally {
      clearAuth();                 // tar bort user + token + localStorage
      window.location.href = "/login";
    }
  };
}
import { create } from "zustand";

/* eslint-disable  @typescript-eslint/no-explicit-any */
interface AuthState {
  user: any | null;
  token: string | null;
  login: (user: any, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => {
  const storedUser = localStorage.getItem("authUser");
  const storedToken = localStorage.getItem("authToken");

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken ?? null,

    login: (user, token) => {
      set({ user, token });
      localStorage.setItem("authUser", JSON.stringify(user));
      localStorage.setItem("authToken", token);
    },

    logout: () => {
      set({ user: null, token: null });
      localStorage.removeItem("authUser");
      localStorage.removeItem("authToken");
    },
  };
});

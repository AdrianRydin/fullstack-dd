import { apiFetch } from "./client";

interface Register {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface Login {
  email: string;
  name?: string;
  password: string;
}

export function registerUser(data: Register) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function loginUser(data: Login) {
  return apiFetch<{
    token: string;
    user: any;
  }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function logoutUser() {
  return apiFetch("/auth/logout", { method: "POST" });
}

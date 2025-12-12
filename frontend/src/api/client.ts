import { API_BASE_URL, API_KEY } from "../config/api";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string           // 👈 ny tredje parameter
): Promise<T> {
  const headers = new Headers(options.headers);

  headers.set("x-api-key", API_KEY);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include", // cookies skickas också om när vi börjar använda dem
  });

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

import { API_BASE_URL, API_KEY } from "../config/api";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers = new Headers(options.headers);

  headers.set("x-api-key", API_KEY);

  let authToken = token;
  if (!authToken && typeof window !== "undefined") {
    const stored = localStorage.getItem("authToken");
    if (stored && stored !== "undefined" && stored !== "null") {
      authToken = stored;
    }
  }

  if (authToken) {
    headers.set("Authorization", `Bearer ${authToken}`);
  }

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: "include", // cookies skickas också om de finns
  });

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}


// useAuthStatus.ts
import { useEffect, useState } from "react";
import { API_BASE_URL, API_KEY } from "../../config/api"; // justera path
import type { AuthUser } from "../../types/User";

type AuthStatus =
  | { loading: true; isLoggedIn: false; user: null }
  | { loading: false; isLoggedIn: boolean; user: AuthUser | null };

export function useAuthStatus(): AuthStatus {
  const [state, setState] = useState<AuthStatus>({
    loading: true,
    isLoggedIn: false,
    user: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "x-api-key": API_KEY,
      },
      signal: controller.signal,
    })
      .then(async (res) => {
        if (res.status === 401) {
          // Inte inloggad / ogiltig token
          setState({ loading: false, isLoggedIn: false, user: null });
          return;
        }

        const data = await res.json();

        if (!data.authenticated) {
          setState({ loading: false, isLoggedIn: false, user: null });
          return;
        }

        setState({
          loading: false,
          isLoggedIn: true,
          user: data.user as AuthUser,
        });
      })
      .catch(() => {
        setState({ loading: false, isLoggedIn: false, user: null });
      });

    return () => controller.abort();
  }, []);

  return state;
}

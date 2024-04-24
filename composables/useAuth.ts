import type { SResponse } from "~/types/s-response";
import type { Token } from "./app";

export function useAuth() {
  const app = useApp();
  const path = apiPath();
  const notif = useNotification();

  async function login(param: { email: string; password: string }) {
    const data: SResponse<User> = await $fetch(path.login(), {
      baseURL: "https://api.motionsportindonesia.id",
      method: "POST",
      body: JSON.stringify(param),
    });
    if (!data.data) {
      throw data;
    }

    const user = data.data;

    app.refreshToken = user.token.refresh_token;

    app.accessToken = user.token.access_token;

    navigateTo("/gallery");
  }
  async function refresh() {
    try {
      console.log(app.refreshToken, "APP REFREHS");

      const res = await fetch(
        "https://api.motionsportindonesia.id" + path.refresh(),
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${app.refreshToken ?? "invalid_token"}`,
          },
        }
      );

      const data: SResponse<Token> = await res.json();

      if (!data.data) {
        throw data;
      }

      const user = data.data;

      app.refreshToken = user.refresh_token;
      app.accessToken = user.access_token;
      return true;
    } catch (error) {
      notif.error({
        message: "Refresh token failed",
      });
      console.log(error);

      return false;
    }
  }

  async function logout() {
    app.refreshToken = undefined;
    app.accessToken = undefined;
    navigateTo("/login");
  }
  return {
    login,
    refresh,
    logout,
  };
}

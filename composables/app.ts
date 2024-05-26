import { defineStore } from "pinia";
import { page } from "~/types/t-table";

const REFRESH_TOKEN = "REFRESH_TOKEN_MOTION";
export type User = {
  name: string;
  email: string;
  userId: number;
  accountId: number;
  token: Token;
};

export type Token = {
  access_token: string;
  refresh_token: string;
};
export const useApp = defineStore("GlobalAppStore", () => {
  const isActive = ref(false);
  const accessToken = ref<string | undefined>("invalid_token");
  const refreshToken = useCookie<string | undefined>(REFRESH_TOKEN, {
    maxAge: 3600 * 30,
  });

  const pages = page;

  const router = useRouter();
  const pageForBanner = ["/gallery", "/products"];
  return {
    isActive,
    pages,
    pageForBanner,
    accessToken,
    clickSidebar() {
      isActive.value = !isActive.value;
    },
    turnOffSidebar() {
      isActive.value = false;
    },
    refreshToken,

    getAuthorization(){
      if (!accessToken.value) {
        router.push("/login");
        return;
      }else{
        return {
          Authorization: `Bearer ${accessToken.value}`
        }
      }
    }
  };
});

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/app/store/authStore";
import { useAppStore } from "@/app/store/appStore";

export const useLogin = () => {
  const [searchParams, updateSearchParams] = useSearchParams();

  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const { updateToken, updateUserId, updateIsLogin } = useAuthStore();
  const { updateIsAlertOpen } = useAppStore();
  useEffect(() => {
    const checkSession = () => {
      const loginTime = parseInt(
        sessionStorage.getItem("loginTime") || "0",
        10,
      );
      if (!loginTime) {
        return;
      }
      const now = new Date().getTime();

      const elapsed = now - loginTime;
      const thirtyMinutes = 30 * 60 * 1000;
      if (elapsed > thirtyMinutes) {
        sessionStorage.removeItem("loginTime");
        updateIsLogin(false);
        updateToken(null);
        updateUserId(null);

        updateIsAlertOpen({
          flag: true,
          message: "로그인 세션이 만료되었습니다. <br /> 다시 로그인해주세요.",
        });
      }
    };
    // 페이지가 로드될 때 세션 체크
    checkSession();
    const interval = setInterval(checkSession, 5 * 60 * 1000); // 5분마다 세션 체크
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!token || !userId) return;
    updateToken(token);
    updateUserId(userId);
    updateIsLogin(true);

    updateSearchParams({});

    sessionStorage.setItem("loginTime", new Date().getTime().toString());
  }, [token, userId]);
};

export const useLogout = () => {
  const { updateToken, updateUserId, updateIsLogin } = useAuthStore();
  const [searchParams, updateSearchParams] = useSearchParams();
  const logout = searchParams.get("logout");

  useEffect(() => {
    if (!Boolean(logout)) return;
    updateIsLogin(false);
    updateToken(null);
    updateUserId(null);

    updateSearchParams({});
  }, [logout]);
};

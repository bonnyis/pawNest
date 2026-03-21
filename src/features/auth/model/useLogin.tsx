import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/app/store/authStore";

export const useLogin = () => {
  const [searchParams, updateSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const { updateToken, updateUserId, updateIsLogin } = useAuthStore();
  useEffect(() => {
    if (!token || !userId) return;
    updateToken(token);
    updateUserId(userId);
    updateIsLogin(true);

    updateSearchParams({});
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

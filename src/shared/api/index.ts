import axios from "axios";
import { useAuthStore } from "@/app/store/authStore";
import { useAppStore } from "@/app/store/appStore";

export const api = axios.create({
  baseURL: "",
  withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use((config) => {
  // 토큰 넣기
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // ngrok
  config.headers["ngrok-skip-browser-warning"] = "true";
  return config;
});

// 응답 인터셉터
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // 공통 에러 처리
    const updateIsAlertOpen = useAppStore.getState().updateIsAlertOpen;
    const updateIsLogin = useAuthStore.getState().updateIsLogin;
    const isDev = import.meta.env.DEV;
    const status = err?.response?.status;
    if (status === 401) {
      // 토큰만료 시 강제 로그아웃
      updateIsAlertOpen({
        flag: true,
        message: "로그인 세션이 만료되었습니다. <br /> 다시 로그인해주세요.",
      });
      window.location.href = `${isDev ? "http://localhost:5173/?logout=true" : "https://paw-nest-green.vercel.app/?logout=true"}`;
      updateIsLogin(true);
    }
    return Promise.reject(err);
  },
);

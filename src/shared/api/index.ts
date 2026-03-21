import axios from "axios";
import { useAuthStore } from "@/app/store/authStore";

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
  return config;
});

// 응답 인터셉터
api.interceptors.response.use(
  (res) => res,
  (err) => {
    // 공통 에러 처리
    return Promise.reject(err);
  },
);

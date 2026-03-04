// 계정관련

import { create } from "zustand";

export type authState = {
  isLogin: boolean;
};

export type authAction = {
  updateIsLogin: (isLogin: authState["isLogin"]) => void;
};
export const useAuthStore = create<authState & authAction>((set) => ({
  isLogin: false,
  updateIsLogin: (isLogin) => set(() => ({ isLogin })),
}));

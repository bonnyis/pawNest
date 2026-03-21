import { create } from "zustand";
import { persist } from "zustand/middleware";

export type authState = {
  isLogin: boolean;
  token: string | null;
  userId: string | null;
};

export type authAction = {
  updateIsLogin: (isLogin: authState["isLogin"]) => void;
  updateToken: (token: authState["token"]) => void;
  updateUserId: (userId: authState["userId"]) => void;
};

export const useAuthStore = create<authState & authAction>()(
  persist(
    (set) => ({
      isLogin: false,
      token: null,
      userId: null,

      updateIsLogin: (isLogin) => set({ isLogin }),
      updateToken: (token) => set({ token }),
      updateUserId: (userId) => set({ userId }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        userId: state.userId,
        isLogin: state.isLogin,
      }),
    },
  ),
);

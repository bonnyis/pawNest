import { create } from "zustand";

export type authState = {
  chatStatus: boolean;
};
export type authAction = {
  updateChatStatus: (chatStatus: authState["chatStatus"]) => void;
};
export const useAuthStore = create<authState & authAction>((set) => ({
  chatStatus: false,
  updateChatStatus: (chatStatus: boolean) =>
    set(() => ({
      chatStatus: chatStatus,
    })),
}));

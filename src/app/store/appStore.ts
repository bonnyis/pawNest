// 전역 UI 상태 관리
import { getIsMobile } from "@/shared/lib/deviceType";
import { create } from "zustand";

export type appState = {
  isOpen: boolean;
  viewType: "MENU" | "CHAT";
  isMobile: boolean;
};

export type appAction = {
  updateIsOpen: (isOpen: appState["isOpen"]) => void;
  updateViewType: (viewType: appState["viewType"]) => void;
  updatedIsMobile: (deviceType: appState["isMobile"]) => void;
};

export const useAppStore = create<appState & appAction>((set) => ({
  isOpen: getIsMobile() ? false : true,
  viewType: "MENU",
  isMobile: getIsMobile(),
  updateIsOpen: (isOpen) =>
    set(() => ({
      isOpen,
    })),
  updateViewType: (viewType) =>
    set(() => ({
      viewType,
    })),
  updatedIsMobile: () => set({ isMobile: getIsMobile() }),
}));

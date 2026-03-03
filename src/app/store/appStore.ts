// 전역 UI 상태 관리
import { create } from "zustand";

export type appState = {
  isOpen: boolean;
  viewType: "MENU" | "CHAT";
  deviceType: "PC" | "MOBILE";
};

export type appAction = {
  updateIsOpen: (isOpen: appState["isOpen"]) => void;
  updateViewType: (viewType: appState["viewType"]) => void;
  updatedeviceType: (deviceType: appState["deviceType"]) => void;
};

export const useAppStore = create<appState & appAction>((set) => ({
  isOpen: true,
  viewType: "MENU",
  deviceType: "PC",
  updateIsOpen: (isOpen) =>
    set(() => ({
      isOpen,
    })),
  updateViewType: (viewType) =>
    set(() => ({
      viewType,
    })),
  updatedeviceType: (deviceType) =>
    set(() => ({
      deviceType,
    })),
}));

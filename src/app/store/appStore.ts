// 전역 UI 상태 관리
import { getIsMobile } from "@/shared/lib/deviceType";
import { create } from "zustand";

export type appState = {
  isOpen: boolean; // sidebar open value
  viewType: "MENU" | "CHAT";
  isMobile: boolean;
  isModalOpen: boolean;
  isAlert: boolean;
  isConfirm: boolean;
};

export type appAction = {
  updateIsOpen: (isOpen: appState["isOpen"]) => void;
  updateViewType: (viewType: appState["viewType"]) => void;
  updatedIsMobile: (deviceType: appState["isMobile"]) => void;
  updateIsModalOpen: (isOpen: appState["isModalOpen"]) => void;
  updateIsAlertOpen: (isOpen: appState["isAlert"]) => void;
  updateIsConfirmOpen: (isOpen: appState["isConfirm"]) => void;
};

export const useAppStore = create<appState & appAction>((set) => ({
  isOpen: getIsMobile() ? false : true,
  viewType: "MENU",
  isMobile: getIsMobile(),
  isModalOpen: false,
  isAlert: false,
  isConfirm: false,
  updateIsOpen: (isOpen) => set(() => ({ isOpen })),
  updateViewType: (viewType) => set(() => ({ viewType })),
  updatedIsMobile: () => set({ isMobile: getIsMobile() }),
  updateIsModalOpen: (isModalOpen) => set(() => ({ isModalOpen })),
  updateIsAlertOpen: (isAlert) => set(() => ({ isAlert })),
  updateIsConfirmOpen: (isConfirm) => set(() => ({ isConfirm })),
}));

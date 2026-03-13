// 전역 UI 상태 관리
import { getIsMobile } from "@/shared/lib/deviceType";
import { create } from "zustand";

export type appState = {
  isOpen: boolean; // sidebar open value
  viewType: "MENU" | "CHAT";
  isMobile: boolean;
  isModalOpen: boolean;
  isAlert: {
    flag: boolean;
    message: string | null;
  };
  isConfirm: {
    flag: boolean;
    message?: string | null;
    callback?: (() => void) | null;
  };
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
  isAlert: {
    flag: false,
    message: null,
  },
  isConfirm: {
    flag: false,
    message: null,
    callback: null,
  },
  updateIsOpen: (isOpen) => set(() => ({ isOpen })),
  updateViewType: (viewType) => set(() => ({ viewType })),
  updatedIsMobile: () => set({ isMobile: getIsMobile() }),
  updateIsModalOpen: (isModalOpen) => set(() => ({ isModalOpen })),
  updateIsAlertOpen: ({ flag, message }) =>
    set(() => ({
      isAlert: {
        flag,
        message: message ?? null,
      },
    })),
  updateIsConfirmOpen: ({ flag, message, callback }) =>
    set(() => ({
      isConfirm: {
        flag,
        message: message ?? null,
        callback: callback ?? null,
      },
    })),
}));

// 전역 UI 상태 관리
import { getIsMobile } from "@/shared/lib/deviceType";
import { create } from "zustand";

export type appState = {
  isOpen: boolean; // sidebar open value

  viewType: "MENU" | "CHAT";
  isMobile: boolean;
  isModalOpen: boolean; // 품종찾기 모달
  isAlert: {
    flag: boolean;
    message: string | null;
  };
  isConfirm: {
    flag: boolean;
    message?: string | null;
    callback?: (() => void) | null;
  };
  prevPath: string;
};

export type appAction = {
  updateIsOpen: (isOpen: boolean | ((prev: boolean) => boolean)) => void;
  updateViewType: (viewType: appState["viewType"]) => void;
  updatedIsMobile: (deviceType: appState["isMobile"]) => void;
  updateIsModalOpen: (isOpen: appState["isModalOpen"]) => void;
  updateIsAlertOpen: (isOpen: appState["isAlert"]) => void;
  updateIsConfirmOpen: (isOpen: appState["isConfirm"]) => void;
  updatePrevPath: (prevPath: string) => void;
};

export const useAppStore = create<appState & appAction>((set) => ({
  // state
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
  prevPath: "",

  // actions
  updateIsOpen: (valOrFn) =>
    set((state) => ({
      isOpen: typeof valOrFn === "function" ? valOrFn(state.isOpen) : valOrFn,
    })),
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
  updatePrevPath: (prevPath) => set(() => ({ prevPath })),
}));

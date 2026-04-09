import type { ChatPannelType } from "@/features/chatting/model/chatting.types";
import { create } from "zustand";
export type chatState = {
  chatPannelType: ChatPannelType;
  chatRoomId: number | null;
};

export type chatAction = {
  updateChatPannelType: (chatPannelType: chatState["chatPannelType"]) => void;
  updateChatRoomId: (roomId: number) => void;
};
export const useChatStore = create<chatState & chatAction>((set) => ({
  chatPannelType: "list",
  chatRoomId: null,
  updateChatPannelType: (chatPannelType) => set(() => ({ chatPannelType })),
  updateChatRoomId: (roomId) => set({ chatRoomId: roomId }),
}));

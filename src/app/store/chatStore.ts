import type { ChatPannelType } from "@/features/chatting/model";
import { create } from "zustand";
export type chatState = {
  chatPannelType: ChatPannelType;
};

export type chatAction = {
  updateChatPannelType: (chatPannelType: chatState["chatPannelType"]) => void;
};
export const useChatStore = create<chatState & chatAction>((set) => ({
  chatPannelType: "list",
  updateChatPannelType: (chatPannelType) => set(() => ({ chatPannelType })),
}));

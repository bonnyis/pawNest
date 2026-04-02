import { api } from "@/shared/api";
import type { ChatListResponse } from "../model/chatting.types";

export const GET_CHAT_LIST = async () => {
  try {
    const { data } = await api.get<ChatListResponse>(`/api/chat/rooms`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const MAKE_CHAT_ROOM = async (boardId: string) => {
  try {
    const { data } = await api.post("/api/chat/room", { boardId });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

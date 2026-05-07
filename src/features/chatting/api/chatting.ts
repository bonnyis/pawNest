import { api } from "@/shared/api";
import type {
  ChatListResponse,
  ChatSendMessageParams,
} from "../model/chatting.types";
import { useSocketStore } from "@/app/store/socketStore";

export const GET_CHAT_LIST = async () => {
  try {
    const { data } = await api.get<ChatListResponse>(`/api/chat/rooms`);
    return data;
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};

export const MAKE_CHAT_ROOM = async (boardId: number) => {
  try {
    const { data } = await api.post("/api/chat/room", { boardId });
    return data;
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};

export const GET_CHAT_HISTORY = async (roomId: number) => {
  try {
    const { data } = await api.get(`/api/chat/room/${roomId}/messages`);

    return data;
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};

// 채팅전송
export const SEND_MESSAGE = (roomId: number, content: string) => {
  const { client } = useSocketStore.getState();
  const payload: ChatSendMessageParams = {
    roomId,
    content,
    messageId: null,
    createdAt: null,
    senderId: null,
  };
  if (!client || !client.connected) {
    console.error("❌ 소켓이 활성화되지 않았습니다.");
    throw new Error("서버와 연결이 끊어졌습니다. 잠시 후 다시 시도해주세요.");
  }
  try {
    client.publish({
      destination: `/app/chat/message`,
      body: JSON.stringify({
        ...payload,
      }),
    });
    console.log("🚀 채팅 전송 시도 완료:", payload);
  } catch (error: any) {
    console.error("STOMP 전송 에러:", error);
    throw error.response?.data ?? error;
  }
};

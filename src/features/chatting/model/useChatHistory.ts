import { useQuery } from "@tanstack/react-query";
import { useAppStore } from "@/app/store/appStore";
import { GET_CHAT_HISTORY } from "../api/chatting";

export const useChatHistory = (roomId: number) => {
  return useQuery({
    queryKey: ["chatHistory", roomId],
    queryFn: () => GET_CHAT_HISTORY(roomId),
    enabled: roomId ? true : false,
  });
};

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSocketStore } from "@/app/store/socketStore";
import { GET_CHAT_HISTORY } from "../api/chatting";

export const useChatHistory = (roomId: number) => {
  const queryClient = useQueryClient();
  const { client } = useSocketStore();

  const query = useQuery({
    queryKey: ["chatHistory", roomId],
    queryFn: () => GET_CHAT_HISTORY(roomId),
    enabled: roomId ? true : false,
  });
  useEffect(() => {
    if (!roomId || !client || !client.active) {
      return;
    }
    const subscription = client.subscribe(
      `/topic/chat/room/${roomId}`,
      (msg) => {
        const newChat = JSON.parse(msg.body);
        console.log("📥 실시간 채팅 수신", newChat);

        queryClient.setQueryData(["chatHistory", roomId], (old: any) => {
          return old ? [...old, newChat] : [newChat];
        });
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [roomId, client]);

  return query;
};

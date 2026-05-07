import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSocketStore } from "@/app/store/socketStore";
import { GET_CHAT_HISTORY } from "../api/chatting";
import { useAuthStore } from "@/app/store/authStore";

export const useChatHistory = (roomId: number) => {
  const queryClient = useQueryClient();
  const { userId } = useAuthStore();
  const { client } = useSocketStore();

  const query = useQuery({
    queryKey: ["chatHistory", roomId],
    queryFn: () => GET_CHAT_HISTORY(roomId),
    enabled: roomId ? true : false,
  });

  useEffect(() => {
    if (!roomId || !client || !client.connected) {
      return;
    }
    const subscription = client.subscribe(
      `/topic/chat/room/${roomId}`,
      (msg) => {
        const newChat = JSON.parse(msg.body);
        console.log("📥 실시간 채팅 수신", newChat);

        queryClient.setQueryData(["chatHistory", roomId], (old: any[] = []) => {
          // 내가 보낸 메시지는 무시
          if (String(newChat.senderId) === String(userId)) {
            console.log("여기타니?");
            return old;
          }

          // message 없으면 무시 (빈 말풍선 방지)
          if (!newChat.content) {
            console.log("아님여기?");
            return old;
          }

          // 중복 방지
          if (old.some((m) => m.messageId === newChat.messageId)) {
            console.log("또 아니면 ?");
            return old;
          }

          return [...old, newChat];
        });
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [client?.connected, roomId, queryClient]);

  return query;
};

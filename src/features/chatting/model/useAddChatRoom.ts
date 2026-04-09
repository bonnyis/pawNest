import { useMutation } from "@tanstack/react-query";
import { MAKE_CHAT_ROOM } from "../api/chatting";
import { useAppStore } from "@/app/store/appStore";
import { useChatStore } from "@/app/store/chatStore";

export const useAddChatRoom = () => {
  const updateIsAlertOpen = useAppStore((state) => state.updateIsAlertOpen);
  const updateChatRoomId = useChatStore((state) => state.updateChatRoomId);
  return useMutation({
    mutationFn: (boardId: number) => MAKE_CHAT_ROOM(boardId),
    onSuccess: (data) => {
      const newRoomId = data.roomId;
      updateChatRoomId(newRoomId);
      console.log(`채팅방 ${newRoomId} 생성 성공`);
    },
    onError: (error: any) => {
      if (error?.response?.status === 401) return;
      updateIsAlertOpen({
        flag: true,
        message: error?.message || "오류가 발생했습니다.",
      });
    },
  });
};

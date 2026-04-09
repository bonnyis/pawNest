import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MAKE_CHAT_ROOM } from "../api/chatting";
import { useAppStore } from "@/app/store/appStore";

export const useAddChatRoom = () => {
  const queryClient = useQueryClient();
  const updateIsAlertOpen = useAppStore((state) => state.updateIsAlertOpen);
  return useMutation({
    mutationFn: (boardId: number) => MAKE_CHAT_ROOM(boardId),
    onSuccess: (data) => {
      const newRoomId = data.roomId;
      queryClient.invalidateQueries({
        queryKey: ["chatHistory", newRoomId],
      });
      console.log(`채팅방 ${newRoomId} 생성 성공`);
    },
    onError: (error: any) => {
      updateIsAlertOpen({
        flag: true,
        message: error?.message || "오류가 발생했습니다.",
      });
    },
  });
};

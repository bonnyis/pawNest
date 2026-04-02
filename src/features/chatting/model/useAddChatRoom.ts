import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MAKE_CHAT_ROOM } from "../api/chatting";
import { useAppStore } from "@/app/store/appStore";

export const useAddChatRoom = () => {
  const queryClient = useQueryClient();
  const updateIsAlertOpen = useAppStore((state) => state.updateIsAlertOpen);
  return useMutation({
    mutationFn: (boardId: string) => MAKE_CHAT_ROOM(boardId),
    onSuccess: (_, boardId) => {
      console.log("success");
      queryClient.invalidateQueries({
        queryKey: ["chatList", boardId],
      });
    },
    onError: (error: any) => {
      updateIsAlertOpen({
        flag: true,
        message: error?.message || "오류가 발생했습니다.",
      });
    },
  });
};

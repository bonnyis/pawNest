import { useQueryClient, useMutation } from "@tanstack/react-query";
import { SEND_MESSAGE } from "../api/chatting";
import { useAppStore } from "@/app/store/appStore";

interface SendMessageParams {
  roomId: number;
  content: string;
}
export const useChatting = () => {
  const queryClient = useQueryClient();
  const updateIsAlertOpen = useAppStore((state) => state.updateIsAlertOpen);
  return useMutation({
    mutationFn: async ({ roomId, content }: SendMessageParams) => {
      return SEND_MESSAGE(roomId, content);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["chatHistory"] });
    },
    onError: (error) => {
      updateIsAlertOpen({
        flag: true,
        message: error?.message || "메시지를 전송하지 못했습니다.",
      });
    },
  });
};

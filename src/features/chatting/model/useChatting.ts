import { useQueryClient, useMutation } from "@tanstack/react-query";
import { SEND_MESSAGE } from "../api/chatting";
import { useAppStore } from "@/app/store/appStore";
import { useAuthStore } from "@/app/store/authStore";
import { formatDate } from "@/shared/lib/formatDate";
interface SendMessageParams {
  roomId: number;
  content: string;
}

export const useChatting = () => {
  const queryClient = useQueryClient();
  const updateIsAlertOpen = useAppStore((state) => state.updateIsAlertOpen);
  const { userId } = useAuthStore(); // 🔥 senderId 맞추기 위해 필요

  return useMutation({
    mutationFn: async ({ roomId, content }: SendMessageParams) => {
      return SEND_MESSAGE(roomId, content);
    },

    onMutate: async ({ roomId, content }) => {
      await queryClient.cancelQueries({
        queryKey: ["chatHistory", roomId],
      });

      const prev = queryClient.getQueryData(["chatHistory", roomId]);

      const optimisticMessage = {
        messageId: Date.now(),
        message: content,
        createdAt: formatDate(new Date()),
        senderId: userId,
        mine: true,
      };

      queryClient.setQueryData(["chatHistory", roomId], (old: any[] = []) => [
        ...old,
        optimisticMessage,
      ]);

      return { prev };
    },

    onSuccess: () => {
      console.log("✅ 메시지 전송 성공");
    },

    onError: (error, variables, context) => {
      queryClient.setQueryData(
        ["chatHistory", variables.roomId],
        context?.prev,
      );

      updateIsAlertOpen({
        flag: true,
        message: error?.message || "메시지를 전송하지 못했습니다.",
      });
    },
  });
};

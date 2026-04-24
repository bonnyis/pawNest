import { useQueryClient, useMutation } from "@tanstack/react-query";
import { SEND_COMMENT } from "@/entities/comments/api/comments";
import { useAppStore } from "@/app/store/appStore";

export const useSendComments = () => {
  const queryClient = useQueryClient();
  const updateIsAlertOpen = useAppStore((state) => state.updateIsAlertOpen);

  return useMutation({
    mutationFn: async ({
      boardId,
      content,
    }: {
      boardId: number;
      content: string;
    }) => SEND_COMMENT(boardId, content),

    onSuccess: (_, boardId) => {
      queryClient.refetchQueries({
        queryKey: ["commentsList", String(boardId)],
      });
      console.log("✅ 댓글 전송 시도 성공");
    },

    onError: (error: Error) => {
      updateIsAlertOpen({
        flag: true,
        message: error.message || "등록 중 오류가 발생했습니다.",
      });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DELETE_COMMENT,
  MODIFY_COMMENT,
} from "@/entities/comments/api/comments";
import { useAppStore } from "@/app/store/appStore";

// 댓글 수정 및 삭제
export const useControlComments = () => {
  const updateIsAlertOpen = useAppStore((state) => state.updateIsAlertOpen);
  const queryClient = useQueryClient();
  const useDeleteComment = () => {
    return useMutation({
      mutationFn: (commentId: number) => DELETE_COMMENT(commentId),
      onSuccess: (_, boardId) => {
        queryClient.invalidateQueries({
          queryKey: ["commentsList", String(boardId)],
        });
        console.log("댓글 삭제 성공");
        updateIsAlertOpen({
          flag: true,
          message: "삭제완료!",
        });
      },
      onError: (error: Error) => {
        updateIsAlertOpen({
          flag: true,
          message: error.message || "삭제 중 오류가 발생했습니다.",
        });
      },
    });
  };
  const useModifyComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({
        commentId,
        content,
      }: {
        commentId: number;
        content: string;
      }) => MODIFY_COMMENT(commentId, content),
      onSuccess: (data) => {
        console.log(data, data.boardId);
        queryClient.invalidateQueries({
          queryKey: ["commentsList", String(data.boardId)],
        });
        console.log("댓글 수정 성공");
      },
      onError: (error: Error) => {
        updateIsAlertOpen({
          flag: true,
          message: error.message || "수정 중 오류가 발생했습니다.",
        });
      },
    });
  };

  return { useDeleteComment, useModifyComment };
};

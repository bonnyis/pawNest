import { useMutation } from "@tanstack/react-query";
import {
  DELETE_COMMENT,
  MODIFY_COMMENT,
} from "@/entities/comments/api/comments";
import { useAppStore } from "@/app/store/appStore";

// 댓글 수정 및 삭제
export const useControlComments = () => {
  const updateIsAlertOpen = useAppStore((state) => state.updateIsAlertOpen);

  const useDeleteComment = (commentId: number) => {
    return useMutation({
      mutationFn: () => DELETE_COMMENT(commentId),
      onSuccess: () => {
        console.log("댓글 삭제 성공");
      },
      onError: (error: Error) => {
        updateIsAlertOpen({
          flag: true,
          message: error.message || "삭제 중 오류가 발생했습니다.",
        });
      },
    });
  };
  const useModifyComment = (commentId: number, content: string) => {
    return useMutation({
      mutationFn: () => MODIFY_COMMENT(commentId, content),
      onSuccess: () => {
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

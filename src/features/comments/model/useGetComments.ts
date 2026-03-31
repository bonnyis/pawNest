import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { GET_COMMENT_LIST, SEND_COMMENT } from "../api/comments";
import { useAppStore } from "@/app/store/appStore";

export const useGetComments = ({
  boardId,
  enabled,
}: {
  boardId: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["commentsList", boardId],
    queryFn: () => GET_COMMENT_LIST(Number(boardId)),
    enabled: enabled && !!boardId,
    placeholderData: (prev) => prev,
  });
};

export const useSendComments = () => {
  const queryClient = useQueryClient();
  const updateIsAlertOpen = useAppStore((state) => state.updateIsAlertOpen);
  return useMutation({
    mutationFn: ({ boardId, content }: { boardId: number; content: string }) =>
      SEND_COMMENT(Number(boardId), content),
    onSuccess(data, variables) {
      console.log("data", data);
      console.log("vivivia", variables);
      queryClient.invalidateQueries({
        queryKey: ["commentList", String(variables.boardId)],
      });
      console.log("등록 성공!", data);
    },
    onError(error, variables, onMutateResult, context) {
      console.log(error, variables, onMutateResult, context);
      updateIsAlertOpen({
        flag: true,
        message: error.message || "등록 중 오류가 발생했습니다.",
      });
    },
  });
};

import { FAVORITE_TOGGLE } from "../api/favorite-toggle";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useAppStore } from "@/app/store/appStore";
export const useFavoriteToggle = () => {
  const queryClient = useQueryClient();
  const updateIsAlertOpen = useAppStore((state) => state.updateIsAlertOpen);

  return useMutation({
    mutationFn: (boardId: number) => FAVORITE_TOGGLE(boardId),
    onSuccess: (_, boardId) => {
      queryClient.invalidateQueries({
        queryKey: ["missingDetail", String(boardId)],
      });
    },
    onError: (error: Error) => {
      updateIsAlertOpen({
        flag: true,
        message: error.message ?? "처리중 오류가 발생했습니다.",
      });
    },
  });
};

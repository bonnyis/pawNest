import { useMutation } from "@tanstack/react-query";
import { CREATE_MISSING_BOARD } from "@/entities/missing-insert/api/missingInsert";
import { useAppStore } from "@/app/store/appStore";
import type { MissingBoardInputRequest } from "@/entities/missing-insert/model/missingInsert.type";
import { useNavigate } from "react-router-dom";

export const useAddMissingBoard = () => {
  const updateIsAlertOpen = useAppStore((state) => state.updateIsAlertOpen);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({
      params,
      files,
    }: {
      params: MissingBoardInputRequest;
      files: File[];
    }) => CREATE_MISSING_BOARD(params, files),

    onSuccess: () => {
      console.log("실종 게시글 등록 성공");
      updateIsAlertOpen({ flag: true, message: "게시글 등록 성공" });
      navigate(-1);
    },

    onError: (error: any) => {
      if (error?.response?.status === 401) return;

      updateIsAlertOpen({
        flag: true,
        message: error?.message || "게시글 등록 중 오류가 발생했습니다.",
      });
    },
  });
};

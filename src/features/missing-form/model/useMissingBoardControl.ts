import { useMutation } from "@tanstack/react-query";
import {
  CREATE_MISSING_BOARD,
  UPDATE_MISSING_BOARD,
  DELETE_MISSING_BOARD,
} from "@/entities/missing-form/api/missingForm";
import { useAppStore } from "@/app/store/appStore";
import type { MissingBoardInputRequest } from "@/entities/missing-form/model/missingform.type";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/routes/routes";
export const useMissingBoardControl = () => {
  const useAddMissingBoard = () => {
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
  const useEditMissingBoard = (boardId: string) => {
    const updateIsAlertOpen = useAppStore((state) => state.updateIsAlertOpen);
    const navigate = useNavigate();
    return useMutation({
      mutationFn: ({
        boardId,
        params,
        files,
      }: {
        boardId: string;
        params: MissingBoardInputRequest;
        files: File[];
      }) => UPDATE_MISSING_BOARD(boardId, params, files),

      onSuccess: () => {
        updateIsAlertOpen({ flag: true, message: "게시글 수정 성공" });
        navigate(`${ROUTES.MISSING}?id=${boardId}`);
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

  return { useAddMissingBoard, useEditMissingBoard };
};

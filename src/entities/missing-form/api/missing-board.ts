import { api } from "@/shared/api";
import type { MissingBoardInputRequest } from "../model/missingform.type";
import type { ApiResponse } from "@/shared/types/api";

// 게시글 등록
export const CREATE_MISSING_BOARD = async (
  params: MissingBoardInputRequest,
  files: File[],
) => {
  try {
    const formData = new FormData();

    formData.append(
      "request",
      new Blob([JSON.stringify(params)], {
        type: "application/json",
      }),
    );

    files.forEach((file) => {
      formData.append("file", file, file.name);
    });

    const { data } = await api.post<ApiResponse<unknown>>(
      "/api/board",
      formData,
    );

    return data;
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};
// 게시글 수정
export const UPDATE_MISSING_BOARD = async (
  boardId: string,
  params: MissingBoardInputRequest,
  files: File[],
) => {
  try {
    const formData = new FormData();

    formData.append(
      "request",
      new Blob([JSON.stringify(params)], {
        type: "application/json",
      }),
    );

    files.forEach((file) => {
      formData.append("file", file, file.name);
    });

    const { data } = await api.put<ApiResponse<unknown>>(
      `/api/board/${boardId}`,
      formData,
    );

    return data;
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};
// 게시글 삭제
export const DELETE_MISSING_BOARD = async (boardId: string) => {
  try {
    const { data } = await api.delete(`/api/board/${boardId}`);
    return data;
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};

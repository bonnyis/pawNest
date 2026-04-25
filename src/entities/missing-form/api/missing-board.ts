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

    // JSON
    formData.append("request", JSON.stringify(params));

    // 파일 (파일명 명시)
    files.forEach((file) => {
      formData.append("file", file, file.name);
    });

    const { data } = await api.post<ApiResponse<unknown>>(
      "/api/board",
      formData,
      { headers: { "Content-Type": undefined } },
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

    formData.append("request", JSON.stringify(params));

    files.forEach((file) => {
      formData.append("file", file, file.name);
    });

    const { data } = await api.put<ApiResponse<unknown>>(
      `/api/board/${boardId}`,
      formData,
      { headers: { "Content-Type": undefined } },
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

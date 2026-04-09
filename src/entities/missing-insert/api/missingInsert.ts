import { api } from "@/shared/api";
import type { MissingBoardInputRequest } from "../model/missingInsert.type";
import type { ApiResponse } from "@/shared/types/api";

export const CREATE_MISSING_BOARD = async (
  params: MissingBoardInputRequest,
) => {
  try {
    const { data } = await api.post<ApiResponse<unknown>>("/api/board", params);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const UPDTAE_MISSING_BOARD = async (
  boardId: string,
  params: MissingBoardInputRequest,
) => {
  try {
    const { data } = await api.put<ApiResponse<unknown>>(
      `/api/board/${boardId}`,
      { params },
    );
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const DELETE_MISSING_BOARD = async (boardId: string) => {
  try {
    const { data } = await api.delete(`/api/baord/${boardId}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

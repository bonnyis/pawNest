import { api } from "@/shared/api";

import type {
  BoardListRequest,
  GetBoardListResponse,
  GetPreviewResponse,
} from "../model/missing-api-type";

export const GET_MISSING_LIST = async (params?: BoardListRequest) => {
  try {
    const { data } = await api.get<GetBoardListResponse>(`/api/board`, {
      params,
    });
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return {
        content: [],
        totalPages: 0,
      };
    }
  }
};

export const GET_MISSING_PREVIEW = async () => {
  try {
    const { data } = await api.get<GetPreviewResponse>(`/api/board/main`);
    return data;
  } catch (error: any) {
    throw new Error(error?.response?.message);
  }
};

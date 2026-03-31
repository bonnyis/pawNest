import { api } from "@/shared/api";
import {
  BoardListRequest,
  GetBoardListResponse,
} from "../model/missing-api-type";

export const GET_MISSING_LIST = async (params?: BoardListRequest) => {
  try {
    const URL = "/api/board";
    const { data } = await api.get<GetBoardListResponse>(URL, { params });
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

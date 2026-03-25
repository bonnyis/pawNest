import axios from "axios";
import {
  BoardListRequest,
  GetBoardListResponse,
} from "../model/missing-api-type";

export const GET_MISSING_LIST = async (params?: BoardListRequest) => {
  try {
    const URL = "/api/board";
    const { data } = await axios.get<GetBoardListResponse>(URL, {
      params,
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
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

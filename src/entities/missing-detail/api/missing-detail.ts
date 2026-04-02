import { api } from "@/shared/api";
import type { MissingDetailResponse } from "../model/missing-detail-types";

export const GET_MISSING_DETAIL = async (boardId: string) => {
  try {
    const URL = `/api/board/${boardId}`;
    const { data } = await api.get<MissingDetailResponse>(URL);
    return data;
  } catch (error: any) {
    if (error) {
      return {
        boardId: "",
        writerId: "",
        breed1: "",
        breed2: "",
        gender: "",
        age: "",
        color: "",
        title: "",
        features: "",
        missingDate: "",
        missingLocation: "",
        viewCount: 0,
        createdAt: "",
        images: [],
        likeCnt: 0,
        liked: false,
      };
    }
  }
};

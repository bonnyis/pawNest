import axios from "axios";
import type { MissingDetailResponse } from "../model/missing-detail";

export const GET_MISSING_DETAIL = async (boardId: string) => {
  try {
    const URL = `/api/board/${boardId}`;
    const { data } = await axios.get<MissingDetailResponse>(URL, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
    });
    console.log(data);
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

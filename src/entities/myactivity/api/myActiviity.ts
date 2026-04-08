import { api } from "@/shared/api";
import { MyListRequest, MyListResponse } from "../model/myActivity.type";
export const GET_MY_POSTS = async (params: MyListRequest) => {
  try {
    const { data } = await api.get<MyListResponse>(`/api/board/myPosts`, {
      params,
    });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const GET_MY_LIKES = async (params: MyListRequest) => {
  try {
    const { data } = await api.get<MyListResponse>("/api/board/myLikes", {
      params,
    });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

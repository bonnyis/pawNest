import { api } from "@/shared/api";
import { CommentListResponse } from "../model/comment.type";

export const GET_COMMENT_LIST = async (boardId: number) => {
  try {
    const URL = `/api/comments/${boardId}`;
    const { data } = await api.get<CommentListResponse>(URL);
    return data;
  } catch (error: any) {
    if (error) {
      return [];
    }
  }
};

export const SEND_COMMENT = async (boardId: number, content: string) => {
  try {
    const response = await api.post(`/app/comment/${boardId}`, { content });
    console.log("res", response);
    console.log("content", content);
    return response.data;
  } catch (error: any) {
    if (error) {
      throw new Error(error);
    }
  }
};

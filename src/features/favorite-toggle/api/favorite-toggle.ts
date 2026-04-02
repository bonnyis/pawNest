import { api } from "@/shared/api";

export const FAVORITE_TOGGLE = async (boardId: number) => {
  try {
    const response = await api.post(`/api/board/like/${boardId}`);
    console.log(response);
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
};

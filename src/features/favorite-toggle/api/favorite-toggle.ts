import { api } from "@/shared/api";

export const FAVORITE_TOGGLE = async (boardId: number) => {
  try {
    const { data } = await api.post(`/api/board/like/${boardId}`);
    return data;
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};

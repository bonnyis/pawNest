import { api } from "@/shared/api";

export const GET_BREED_FINDER = async (file: File) => {
  const formData = new FormData();
  try {
    formData.append("file", file);
    const { data } = await api.post("/api/ai/detect-breed", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: any) {
    throw error.response?.data ?? error;
  }
};

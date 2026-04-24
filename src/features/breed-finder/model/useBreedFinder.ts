import { useMutation } from "@tanstack/react-query";
import { GET_BREED_FINDER } from "@/entities/breed-finder/api/breed-finder";
import { useAppStore } from "@/app/store/appStore";

export const useBreedFinder = () => {
  const updateIsAlertOpen = useAppStore((state) => state.updateIsAlertOpen);
  return useMutation({
    mutationFn: (file: File) => GET_BREED_FINDER(file),
    onSuccess: (data) => {
      console.log("✅ 품종 찾기 성공", data);
    },
    onError: (error: Error) => {
      console.error("❌ 품종 찾기 실패", error);
      updateIsAlertOpen({
        flag: true,
        message: error.message || "품종 찾기에 실패했습니다.",
      });
    },
  });
};

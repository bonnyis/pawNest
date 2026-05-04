import { useMutation } from "@tanstack/react-query";
import { GET_BREED_FINDER } from "@/entities/breed-finder/api/breed-finder";
import { useAppStore } from "@/app/store/appStore";
import { useBreedFinderStore } from "@/app/store/breedFinderStore";

export const useBreedFinder = () => {
  const updateIsAlertOpen = useAppStore((state) => state.updateIsAlertOpen);
  const updateBreedFinderResult = useBreedFinderStore(
    (state) => state.updateBreedFinderResult,
  );
  return useMutation({
    mutationFn: (file: File) => GET_BREED_FINDER(file),
    onSuccess: (data) => {
      console.log("✅ 품종 찾기 성공", data);
      const breedResult = data.join(", ");
      updateBreedFinderResult(breedResult);
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

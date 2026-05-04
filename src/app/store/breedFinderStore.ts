import { create } from "zustand";
import type { BreedFinderResultItem } from "@/entities/breed-finder/model/breed-finder.type";
export type breedFinderState = {
  modalFlag: boolean;
  breedFinderImg: File | null;
  breedFinderResult: BreedFinderResultItem[];
};

export type breedFinderAction = {
  updateModalFlag: (flag: breedFinderState["modalFlag"]) => void;
  updateBreedFinderImg: (file: breedFinderState["breedFinderImg"]) => void;
  updateBreedFinderResult: (
    result: breedFinderState["breedFinderResult"],
  ) => void;
};

export const useBreedFinderStore = create<breedFinderState & breedFinderAction>(
  (set) => ({
    // state
    modalFlag: false,
    breedFinderImg: null,
    breedFinderResult: [
      {
        title: "리트리버",
        value: 88,
      },
      {
        title: "칼라",
        value: 79,
      },
      {
        title: "개 목걸이",
        value: 79,
      },
    ],
    // actions
    updateModalFlag: (modalFlag) => set(() => ({ modalFlag })),
    updateBreedFinderImg: (breedFinderImg) => set(() => ({ breedFinderImg })),
    updateBreedFinderResult: (breedFinderResult) =>
      set(() => ({ breedFinderResult })),
  }),
);

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
    breedFinderResult: [],
    // actions
    updateModalFlag: (modalFlag) => set(() => ({ modalFlag })),
    updateBreedFinderImg: (breedFinderImg) => set(() => ({ breedFinderImg })),
    updateBreedFinderResult: (breedFinderResult) =>
      set(() => ({ breedFinderResult })),
  }),
);

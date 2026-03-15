import { create } from "zustand";

export type breedFinderState = {
  modalFlag: boolean;
  breedFinderImg: string;
};

export type breedFinderAction = {
  updateModalFlag: (flag: breedFinderState["modalFlag"]) => void;
  updateBreedFinderImg: (file: breedFinderState["breedFinderImg"]) => void;
};

export const useBreedFinderStore = create<breedFinderState & breedFinderAction>(
  (set) => ({
    // state
    modalFlag: false,
    breedFinderImg: "",
    // actions
    updateModalFlag: (modalFlag) => set(() => ({ modalFlag })),
    updateBreedFinderImg: (breedFinderImg) => set(() => ({ breedFinderImg })),
  }),
);

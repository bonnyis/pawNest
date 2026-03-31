import { create } from "zustand";

export type missingDetailState = {
  detailModalFlag: boolean;
  detailBoardId: string | number;
};
export type missingDetailAction = {
  updateDetailModalFlag: (val: missingDetailState["detailModalFlag"]) => void;
  updateDetailBoardId: (val: missingDetailState["detailBoardId"]) => void;
};

export const useMissingDetailStore = create<
  missingDetailState & missingDetailAction
>((set) => ({
  detailModalFlag: false,
  detailBoardId: "",
  updateDetailModalFlag: (detailModalFlag) => set(() => ({ detailModalFlag })),
  updateDetailBoardId: (detailBoardId) => set(() => ({ detailBoardId })),
}));

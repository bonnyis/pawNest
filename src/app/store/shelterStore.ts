import { create } from "zustand";

interface ShelterCity {
  name: string;
  code: string;
}

interface ShelterPositionItem {
  title: string;
  latlng: { lat: number; lng: number };
}

interface CityState {
  cities: ShelterCity[];
  setCities: (cities: ShelterCity[]) => void;
  positionList: ShelterPositionItem[]; // 오타 수정: positionnList -> positionList
  setPositionList: (items: ShelterPositionItem[]) => void;
}

export const useShelterStore = create<CityState>((set) => ({
  cities: [],
  positionList: [], // 초기값 키 이름 일치시킴

  setCities: (cities) => set({ cities }),
  setPositionList: (items) => set({ positionList: items }),
}));

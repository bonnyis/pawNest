import { create } from "zustand";
import type { ShelfterListRequest } from "@/entities/shelter/model/shelter.types";
export interface ShelterCity {
  label: string;
  value: string;
}

export interface ShelterPositionItem {
  title: string;
  latlng: { lat: number; lng: number };
}

interface CityState {
  cities: ShelterCity[];
  setCities: (cities: ShelterCity[]) => void;
  positionList: ShelterPositionItem[];
  setPositionList: (items: ShelterPositionItem[]) => void;
  centerPosition: { lat: number; lng: number };
  setCenterPosition: (center: { lat: number; lng: number }) => void;
  shelterRequestParams: ShelfterListRequest;
  setShelterRequestParams: (request: ShelfterListRequest) => void;
}

export const useShelterStore = create<CityState>((set) => ({
  cities: [],
  positionList: [],
  shelterRequestParams: {
    pSize: 5,
    pIndex: 1,
    type: "json",
    key: import.meta.env.VITE_APP_OPEN_API_KEY,
  },
  centerPosition: { lat: 37.5665, lng: 126.978 },
  setCities: (cities) => set({ cities }),
  setPositionList: (items) => set({ positionList: items }),
  setCenterPosition: (center) => set({ centerPosition: center }),
  setShelterRequestParams: (request) => set({ shelterRequestParams: request }),
}));

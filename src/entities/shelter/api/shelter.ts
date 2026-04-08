import { api } from "@/shared/api";
import type {
  ShelfterListRequest,
  ShelterApiResponse,
} from "../model/shelter.types";
export const GET_SHELTER_LIST = async (params: ShelfterListRequest) => {
  try {
    const { data } = await api.get<ShelterApiResponse>(
      "/OrganicAnimalProtectionFacilit",
      {
        params,
      },
    );
    const { OrganicAnimalProtectionFacilit } = data;
    return OrganicAnimalProtectionFacilit[1];
  } catch (error: any) {
    throw new Error(error);
  }
};

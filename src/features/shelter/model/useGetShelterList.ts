import { GET_SHELTER_LIST } from "@/entities/shelter/api/shelter";
import { ShelfterListRequest } from "@/entities/shelter/model/shelter.types";
import { useQuery } from "@tanstack/react-query";

export const useGetShelterList = (params: ShelfterListRequest) => {
  const query = useQuery({
    queryKey: ["shelterList", params],
    queryFn: () => GET_SHELTER_LIST(params),
    placeholderData: (prev) => prev,
  });

  return query;
};

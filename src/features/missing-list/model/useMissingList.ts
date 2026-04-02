import { useQuery } from "@tanstack/react-query";
import { BoardListRequest } from "@/entities/missing-list/model/missing-api-type";
import { GET_MISSING_LIST } from "@/entities/missing-list/api/missing-list";

export const useMissingList = (params?: BoardListRequest) => {
  return useQuery({
    queryKey: ["missingList", params],
    queryFn: () => GET_MISSING_LIST(params),
    placeholderData: (prev) => prev,
  });
};

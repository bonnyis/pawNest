import { useQuery } from "@tanstack/react-query";
import { GET_MISSING_LIST } from "../api/missing-list";
import type { BoardListRequest } from "./missing-api-type";

export const useMissingList = (params?: BoardListRequest) => {
  return useQuery({
    queryKey: ["missingList", params],
    queryFn: () => GET_MISSING_LIST(params),
    placeholderData: (prev) => prev,
  });
};

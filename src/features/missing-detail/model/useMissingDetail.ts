import { useQuery } from "@tanstack/react-query";
import { GET_MISSING_DETAIL } from "../api/missing-detail";
import { MissingDetailRequest } from "./missing-detail";

export const useMissingDetail = ({
  boardId,
  enabled,
}: MissingDetailRequest) => {
  return useQuery({
    queryKey: ["missingDetail", boardId],
    queryFn: () => GET_MISSING_DETAIL(String(boardId)),
    placeholderData: (prev) => prev,
    enabled: enabled && !!boardId,
  });
};

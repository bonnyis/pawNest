import { useQuery } from "@tanstack/react-query";
import { GET_MISSING_DETAIL } from "../../../entities/missing-detail/api/missing-detail";
import { MissingDetailRequest } from "../../../entities/missing-detail/model/missing-detail-types";

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

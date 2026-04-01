import { GET_MISSING_PREVIEW } from "@/entities/missing/api/missing-list";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useGetMissingPreview = () => {
  const [tab, setTab] = useState<"popular" | "recent">("popular");
  const { data, isLoading } = useQuery({
    queryKey: ["missingPreview"],
    queryFn: () => GET_MISSING_PREVIEW(),
    staleTime: 1000 * 60,
  });
  const list =
    tab === "popular"
      ? (data?.popularBoardList ?? [])
      : (data?.recentBoardList ?? []);
  return { list, tab, setTab, isLoading };
};

import {
  GET_MY_LIKES,
  GET_MY_POSTS,
} from "@/entities/myactivity/api/myActiviity";
import { useQuery } from "@tanstack/react-query";
import type {
  MyListRequest,
  MyListType,
} from "@/entities/myactivity/model/myActivity.type";

interface GetListParams {
  params: MyListRequest;
  type: MyListType;
}

export const useGetMyList = ({ params, type }: GetListParams) => {
  return useQuery({
    queryKey: [type === "post" ? "mypost" : "myLikes", type, params],
    queryFn: () =>
      type === "post" ? GET_MY_POSTS(params) : GET_MY_LIKES(params),
    placeholderData: (prev) => prev,
  });
};

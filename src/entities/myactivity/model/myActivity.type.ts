import { CommonImage } from "@/shared/types/api";

export type MyListType = "post" | "bookmark";

export interface MyListRequest {
  page: number;
  size: number;
  sort?: [string];
}
export type MyPostsContent = {
  boardId: number;
  writerId: string;
  breed1: string;
  breed2: string;
  gender: string;
  age: string;
  color: string;
  title: string;
  features: string;
  missingDate: string;
  missingLocation: string;
  viewCount: number;
  createdAt: string;
  images: CommonImage[];
  likeCnt: number;
  liked: boolean;
};
export interface MyListResponse {
  totalElements: number;
  totalPages: number;
  size: number;
  content: MyPostsContent[];
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    unpaged: boolean;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
  };
  empty: boolean;
}

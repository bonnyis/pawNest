import { CommonImage, PageResponse } from "@/shared/types/api";

export interface BoardListRequest {
  page?: number;
  size?: number;
  searchText?: string;
  breed1?: string;
  color?: string;
}

export interface BoardItem {
  boardId: number;
  writerId: string;
  breed1: string;
  breed2: string;
  gender: string;
  age: string;
  color: string;
  title: string;
  features: string;
  missingDate: string; // Date로 바꿀 수도 있음
  missingLocation: string;
  viewCount: number;
  createdAt: string;
  images: CommonImage[];
  likeCnt: number;
  liked: boolean;
}

export type GetBoardListResponse = PageResponse<BoardItem>;

export interface PreviewItem {
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
  viewCount: 1073741824;
  createdAt: string;
  images: CommonImage[];
  likeCnt: number;
  liked: boolean;
}

export type GetPreviewResponse = {
  popularBoardList: PreviewItem[];
  recentBoardList: PreviewItem[];
};

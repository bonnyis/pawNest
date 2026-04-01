import type { CommonImage } from "@/shared/types/api";

export interface MissingDetailRequest {
  boardId: string | number;
  enabled: boolean;
}

export interface MissingDetailResponse {
  boardId: string | number;
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
}

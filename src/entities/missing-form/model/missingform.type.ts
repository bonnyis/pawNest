import { CommonImage } from "@/shared/types/api";

// 실종게시글 작성 및 수정 DTO
export interface MissingBoardInputRequest {
  breed1: string;
  breed2: string;
  gender: string;
  age: string;
  color: string;
  title?: string;
  features: string;
  missingDate: Date;
  missingLocation: string;
  images?: CommonImage[] | null; // 수정 시 기존 이미지 유지 위해 optional 및 null 허용
}

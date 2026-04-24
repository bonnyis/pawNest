export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success: string | number;
}
export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// 공통 이미지 타입
export interface CommonImage {
  originalFileName: string;
  savedFileName: string;
  imgPath: string;
}

// 실종게시글 작성 및 수정 DTO
export interface MissingBoardInputRequest {
  breed1: string;
  breed2: string;
  gender: string;
  age: string;
  color: string;
  title: string;
  features: string;
  missingDate: Date;
  missingLocation: string;
}

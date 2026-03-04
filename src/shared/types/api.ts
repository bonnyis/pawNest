export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: string | number;
}

export type Pagination = {
  page: number;
  pageSize: number;
  pageIndex: number;
  totalPage: number;
};

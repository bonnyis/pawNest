export interface CommentListItem {
  commentId?: number | string;
  content?: string;
  userId?: string;
  createdAt?: string;
  deletedAt?: string;
  mine?: boolean;
}

export type CommentListResponse = CommentListItem[];

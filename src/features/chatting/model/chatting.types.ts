export type ChatPannelType = "list" | "chat";
export interface ChatPannelProps {
  updatePannelType: (val: ChatPannelType) => void;
}

export interface ChatListItem {
  roomId: number;
  lastMessage: string;
  boardId: number;
  senderId: string;
  receiverId: string;
  createdAt: string;
  displayId: string;
}

export type ChatListResponse = ChatListItem[];

export interface ChatSendMessageParams {
  roomId: number;
  content: string;
  commentId?: string | null; // 서버에서 메시지 ID를 반환하지 않는 경우를 대비해 optional로 설정
  senderId?: string | null; // 메시지 발신자 ID (옵션)
  createdAt?: string | null; // 메시지 생성 시간 (옵션)
}

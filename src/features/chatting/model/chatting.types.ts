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
}

export type ChatListResponse = ChatListItem[];

export type ChatPannelType = "list" | "chat";
export interface ChatPannelProps {
  updatePannelType: (val: ChatPannelType) => void;
}

import { useQuery } from "@tanstack/react-query";
import { GET_CHAT_LIST } from "../api/chatting";

export const useChatList = ({ enabled }: { enabled: boolean }) => {
  return useQuery({
    queryKey: ["chatList"],
    queryFn: () => GET_CHAT_LIST(),
    enabled,
  });
};

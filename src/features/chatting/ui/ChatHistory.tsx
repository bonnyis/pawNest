import { useChatStore } from "@/app/store/chatStore";
import {} from "react";
import { useChatHistory } from "../model/useChatHistory";
import LoadingSpinner from "@/shared/ui/common/LoadingSpinner";

const ChatHistory = () => {
  const { chatRoomId } = useChatStore();
  const { data, isLoading } = useChatHistory(Number(chatRoomId));
  if (data) console.log(data);
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          {isLoading ? <LoadingSpinner /> : data}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;

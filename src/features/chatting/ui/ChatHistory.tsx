import { useEffect, useEffectEvent, useRef } from "react";
import { useChatStore } from "@/app/store/chatStore";
import { useAuthStore } from "@/app/store/authStore";
import { useChatHistory } from "../model/useChatHistory";
import LoadingSpinner from "@/shared/ui/common/LoadingSpinner";

type ChatMessage = {
  messageId: number;
  createdAt: string;
  message: string;
  mine?: boolean;
  senderId: string;
};

const ChatHistory = () => {
  const { chatRoomId } = useChatStore();
  const { userId } = useAuthStore();
  const { data, isLoading } = useChatHistory(Number(chatRoomId));

  const messages: ChatMessage[] = Array.isArray(data) ? data : [];
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log(messages);
  }, [messages]);
  return (
    <div className="flex-1 overflow-y-auto p-4 relative">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : messages.length > 0 ? (
        <div className="space-y-4">
          {messages.map((item, idx) => {
            return (
              <div
                key={`${item.messageId} + ${idx + 1}`}
                className={`flex ${item.mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-3xl p-3 max-w-[80%] break-words shadow-sm ${
                    item.mine
                      ? "bg-orgColor text-white rounded-br-none"
                      : "bg-gray-100 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p>{item.message}</p>
                  <p
                    className={`mt-2 text-xs text-right ${item.mine ? "text-gray-100" : "text-gray-300"}`}
                  >
                    {item.createdAt}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex h-full items-center justify-center text-sm text-gray-500">
          채팅 내역이 없습니다.
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatHistory;

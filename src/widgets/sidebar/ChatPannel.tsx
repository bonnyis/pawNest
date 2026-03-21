import {} from "react";
import Button from "@/shared/ui/common/Button";
import ChatUserList from "@/features/chatting/ui/ChatUserList";
import ChatHistory from "@/features/chatting/ui/ChatHistory";
import { useChatStore } from "@/app/store/chatStore";
const ChatPannel = () => {
  const { chatPannelType, updateChatPannelType } = useChatStore();
  return (
    <>
      {chatPannelType === "list" ? (
        <ChatUserList />
      ) : (
        <>
          <ChatHistory />
          {/* 신규채팅 전송 */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="메시지를 입력하세요."
                className="flex-1 border rounded-lg px-3 py-2 outline-none focus:border-orange-500"
              />
              <Button size="md" variant="primary">
                전송
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChatPannel;

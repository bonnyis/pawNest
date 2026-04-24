import { useRef } from "react";
import Button from "@/shared/ui/common/Button";
import ChatUserList from "@/features/chatting/ui/ChatUserList";
import ChatHistory from "@/features/chatting/ui/ChatHistory";
import { useChatStore } from "@/app/store/chatStore";
import { useAppStore } from "@/app/store/appStore";
import { useChatting } from "@/features/chatting/model/useChatting";

const ChatPannel = () => {
  const { chatPannelType, chatRoomId } = useChatStore();
  const { updateIsAlertOpen } = useAppStore();
  const { mutate } = useChatting();
  const chatInputRef = useRef<HTMLInputElement>(null);
  const handleSendMessage = () => {
    const message = chatInputRef.current?.value;
    if (!message) {
      updateIsAlertOpen({ flag: true, message: "메시지를 입력해주세요." });
    } else {
      mutate({ roomId: Number(chatRoomId), content: message });
    }
  };

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
                id="chatInput"
                type="text"
                placeholder="메시지를 입력하세요."
                className="flex-1 border rounded-lg px-3 py-2 outline-none focus:border-orange-500"
                ref={chatInputRef}
              />
              <Button
                size="md"
                variant="primary"
                onClick={() => handleSendMessage()}
              >
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

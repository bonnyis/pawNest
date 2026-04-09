import { useEffect } from "react";
import { useChatStore } from "@/app/store/chatStore";
import { useChatList } from "../model/useChatList";
import { useAuthStore } from "@/app/store/authStore";
import LoadingSpinner from "@/shared/ui/common/LoadingSpinner";
import NoData from "@/shared/ui/common/NoData";

const ChatUserList = () => {
  const { updateChatPannelType, chatPannelType } = useChatStore();
  const { token } = useAuthStore();
  const ColorList = ["bg-gray-200", "bg-blue-200", "bg-red-50"];
  const chooseColor = ColorList[1];
  const { data, isLoading } = useChatList({
    enabled: chatPannelType === "list" && !!token,
  });

  return (
    <div className="flex-1 overflow-y-auto p-3">
      <ul className="flex flex-col gap-2">
        {isLoading ? (
          <LoadingSpinner />
        ) : data && data?.length > 0 ? (
          data?.map((chat: any) => (
            <li
              key={chat.boardId}
              className="bg-gray-100 p-4 rounded-lg cursor-pointer"
              onClick={() => updateChatPannelType("chat")}
            >
              <div className="flex items-center gap-">
                <div
                  className={`${chooseColor} border w-10 h-10 rounded-full mr-3`}
                ></div>

                <div className="w-3/4">
                  <h5 className="text-lg font-semibold">{chat?.receiverId}</h5>
                  <p className="text-sm text-gray-500">{chat.lastMessage}</p>
                </div>
                <div className="">
                  <p className="text-xs font-light text-gray-400">
                    {chat.createdAt}
                  </p>
                </div>
              </div>
            </li>
          ))
        ) : (
          <NoData message="채팅내역이 없습니다." />
        )}
      </ul>
    </div>
  );
};

export default ChatUserList;

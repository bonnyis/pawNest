import {} from "react";

const ChatHistory = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="space-y-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          채팅 내역이 여기에 표시됩니다.
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;

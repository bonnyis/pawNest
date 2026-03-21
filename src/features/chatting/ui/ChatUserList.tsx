import {} from "react";
import { useChatStore } from "@/app/store/chatStore";

const ChatUserList = () => {
  const { updateChatPannelType } = useChatStore();
  const ColorList = ["bg-gray-200", "bg-blue-200", "bg-red-50"];
  const chooseColor = ColorList[1];
  return (
    <div className="flex-1 overflow-y-auto p-3">
      <ul className="flex flex-col gap-2">
        <li
          className="bg-gray-100 p-4 rounded-lg cursor-pointer"
          onClick={() => updateChatPannelType("chat")}
        >
          <div className="flex items-center gap-">
            <div
              className={`${chooseColor} border w-10 h-10 rounded-full mr-3`}
            ></div>

            <div className="w-3/4">
              <h5 className="text-lg font-semibold">홍길동</h5>
              <p className="text-sm text-gray-500">감사합니다!!</p>
            </div>
            <div className="">
              <p className="text-xs font-light text-gray-400">1분전</p>
            </div>
          </div>
        </li>
        <li
          className="bg-gray-100 p-4 rounded-lg cursor-pointer"
          onClick={() => updateChatPannelType("chat")}
        >
          <div className="flex items-center gap-">
            <div
              className={`${chooseColor} border w-10 h-10 rounded-full mr-3`}
            ></div>

            <div className="w-3/4">
              <h5 className="text-lg font-semibold">홍길동</h5>
              <p className="text-sm text-gray-500">감사합니다!!</p>
            </div>
            <div className="">
              <p className="text-xs font-light text-gray-400">1분전</p>
            </div>
          </div>
        </li>
        <li
          className="bg-gray-100 p-4 rounded-lg cursor-pointer"
          onClick={() => updateChatPannelType("chat")}
        >
          <div className="flex items-center gap-">
            <div
              className={`${chooseColor} border w-10 h-10 rounded-full mr-3`}
            ></div>

            <div className="w-3/4">
              <h5 className="text-lg font-semibold">홍길동</h5>
              <p className="text-sm text-gray-500">감사합니다!!</p>
            </div>
            <div className="">
              <p className="text-xs font-light text-gray-400">1분전</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ChatUserList;

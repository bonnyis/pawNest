import { useState } from "react";
import { useAppStore } from "@/app/store/appStore";
import closeImg from "@img/icons/close_big.png";
import arrow_back from "@img/icons/arrow_back.png";
import LoginModal from "@/features/auth/ui/LoginModal";
import ChatPannel from "@/widgets/sidebar/ChatPannel";
import SideMenu from "./SideMenu";
import UserInfo from "@/features/auth/ui/UserInfo";
import { useChatStore } from "@/app/store/chatStore";

const SideBar = () => {
  const { isOpen, viewType, updateIsOpen, updateViewType } = useAppStore();
  const { updateChatPannelType, chatPannelType } = useChatStore();
  const [isLoginModal, setIsLoginModal] = useState<boolean>(false);

  const goBack = () => {
    if (viewType === "CHAT") {
      if (chatPannelType === "chat") {
        updateChatPannelType("list");
      } else updateViewType("MENU");
    }
  };
  return (
    <aside
      className={`transition-all duration-300 overflow-hidden ${
        isOpen ? "w-[400px]" : "w-0"
      }`}
    >
      <div className="fixed right-0 top-0 h-full w-[320px] sm:w-[400px] bg-white z-50 shadow-2xl">
        <div className="h-full bg-white shadow-2xl flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            {viewType === "MENU" ? (
              <>
                <h2 className="text-lg font-bold">전체메뉴</h2>
                <button
                  className="p-2 hover:bg-gray-100 rounded-full"
                  onClick={() => updateIsOpen(false)}
                >
                  <img src={closeImg} alt="전체 메뉴 닫기" />
                </button>
              </>
            ) : (
              <>
                <button onClick={() => goBack()}>
                  <img src={arrow_back} alt="전체메뉴로 돌아가기" />
                </button>

                <span className="text-lg font-bold">실시간 채팅</span>

                <button
                  onClick={() => updateIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <img src={closeImg} alt="전체 메뉴 닫기" />
                </button>
              </>
            )}
          </div>
          {/* 이용자 계정정보 */}
          {viewType === "MENU" && (
            <UserInfo
              setIsLoginModal={(val: boolean) => setIsLoginModal(val)}
            />
          )}

          {/* 콘텐츠 */}
          {viewType === "MENU" ? <SideMenu /> : <ChatPannel />}
        </div>
      </div>
      <LoginModal loginModal={isLoginModal} setLoginModal={setIsLoginModal} />
    </aside>
  );
};

export default SideBar;

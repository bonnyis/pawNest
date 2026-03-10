import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppStore } from "@/app/store/appStore";
import { useAuthStore } from "@/app/store/authStore";
import { ROUTES } from "@/shared/routes/routes";
import chatImg from "@img/icons/chat.png";
import closeImg from "@img/icons/close_big.png";
import arrow_back from "@img/icons/arrow_back.png";

const SideBar = () => {
  const { isOpen, viewType, updateIsOpen, updateViewType } = useAppStore();
  const { isLogin } = useAuthStore();
  const { pathname } = useLocation();

  const goChat = () => {
    if (!isLogin) {
      window.alert("로그인 후 이용 가능합니다.");
    }
    return updateViewType("CHAT");
  };

  return (
    <aside className="fixed right-0 top-0 h-full w-[320px] sm:w-[400px] bg-white z-50 shadow-2xl">
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
              <button onClick={() => updateViewType("MENU")}>
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
          <div className="p-5 border-b bg-gray-50">
            {isLogin ? (
              <div className="space-y-3">
                <p className="text-lg font-medium">안녕하세요! </p>
                <p className="text-gray-700 text-lg font-medium">
                  <span className="py-1 font-bold text-lg">테스트아이디</span>
                  <span className="text-lg font-medium"> 님</span>
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-700 text-lg font-medium">
                  로그인 해주세요
                </p>
                <Link
                  to={"/"}
                  className="block w-full text-center py-2 rounded-md bg-oliveGr text-white"
                >
                  로그인
                </Link>
              </div>
            )}
          </div>
        )}

        {/* 콘텐츠 */}
        <div className="flex-1 overflow-y-auto p-4">
          {viewType === "MENU" ? (
            <ul className="space-y-4 text-lg">
              <li>
                <Link to={ROUTES.MISSING} className="hover:text-orange-500">
                  실종동물 게시판
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SHELTER} className="hover:text-orange-500">
                  유기동물 보호소
                </Link>
              </li>
              <li>
                <button
                  className="hover:text-orange-500"
                  onClick={() => alert("준비중입니다.")}
                >
                  AI 품종찾기
                </button>
              </li>
              {isLogin && (
                <li>
                  <Link to={ROUTES.SHELTER} className="hover:text-orange-500">
                    마이페이지
                  </Link>
                </li>
              )}
            </ul>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                채팅 내역이 여기에 표시됩니다.
              </div>
            </div>
          )}
        </div>

        {/* 하단 */}
        <div className="p-4 border-t">
          {viewType === "CHAT" ? (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="메시지를 입력하세요..."
                className="flex-1 border rounded-lg px-3 py-2 outline-none focus:border-orange-500"
              />
              <button className="px-4 rounded-md bg-gray-400">전송</button>
            </div>
          ) : (
            <button onClick={() => goChat()}>
              <img src={chatImg} alt="채팅하기" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;

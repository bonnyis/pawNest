import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAppStore } from "@/app/store/appStore";
import { ROUTES } from "@/shared/routes/routes";
import chatImg from "@img/icons/chat.png";
import closeImg from "@img/icons/close_big.png";
import arrow_back from "@img/icons/arrow_back.png";
const SideBar = () => {
  const { isOpen, viewType, updateIsOpen, updateViewType } = useAppStore();
  const { pathname } = useLocation();
  const close = () => {
    updateIsOpen(false);
  };
  useEffect(() => {
    console.log(pathname);
    if (pathname !== "/" && isOpen) {
      close();
    }
  }, [pathname]);
  return (
    <>
      {/* 1. 배경 레이어 (Overlay) 
          사이드바가 열렸을 때만 존재 + 클릭 시 바로 닫히게 설정. */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998] opacity-0 cursor-pointer"
          onClick={() => updateIsOpen(false)}
        />
      )}
      <aside
        className={`fixed top-0 right-0 h-full w-[320px] sm:w-[400px] bg-white shadow-2xl z-[9999] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* 헤더 영역 */}
          <div className="flex items-center justify-between p-4 border-b">
            {viewType === "MENU" ? (
              <>
                <h2 className="text-lg font-bold">전체메뉴</h2>
                <button
                  onClick={() => close()}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <img src={closeImg} alt="전체 메뉴 닫기" />
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={() => updateViewType("MENU")}>
                  <img src={arrow_back} alt="전체메뉴로 돌아가기" />
                </button>
                <span className="text-lg font-bold">실시간 채팅</span>

                <button
                  onClick={() => close()}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <img src={closeImg} alt="전체 메뉴 닫기" />
                </button>
              </>
            )}
          </div>

          {/* 콘텐츠 영역 (조건부 렌더링) */}
          <div className="flex-1 overflow-y-auto p-4">
            {viewType === "MENU" ? (
              <ul className="space-y-4">
                <li>
                  <Link
                    to={ROUTES.MISSING}
                    className="hover:text-orange-500 cursor-pointer"
                  >
                    실종동물 게시판
                  </Link>
                </li>
                <li>
                  <Link
                    to={ROUTES.SHELTER}
                    className="hover:text-orange-500 cursor-pointer"
                  >
                    유기동물 보호소
                  </Link>
                </li>
                <li className="hover:text-orange-500 cursor-pointer">
                  <button type="button">AI 품종찾기</button>
                </li>
              </ul>
            ) : (
              <div className="space-y-4">
                <div className="bg-gray-100 p-3 rounded-lg">
                  채팅 내역이 여기에 표시됩니다.
                </div>
                {/* 채팅 입력창 등 추가 */}
              </div>
            )}
          </div>

          {/* 하단 푸터 (채팅 모드일 때 입력창 등 배치 가능) */}

          <div className="p-4 border-t ">
            {viewType === "CHAT" ? (
              <div className="flex justify-evenly">
                <input
                  type="text"
                  placeholder="메시지를 입력하세요..."
                  className="w-4/5 border rounded-lg px-3 py-2 outline-none focus:border-orange-500"
                />
                <button type="button" className="w-1/6 rounded-md bg-gray-400">
                  전송
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => updateViewType("CHAT")}>
                <img src={chatImg} alt="채팅하기" />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;

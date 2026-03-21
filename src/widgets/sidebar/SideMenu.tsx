import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTE_PATHS, ROUTES } from "@/shared/routes/routes";
import { useAppStore } from "@/app/store/appStore";
import { useBreedFinderStore } from "@/app/store/breedFinderStore";
import { useAuthStore } from "@/app/store/authStore";
import chatImg from "@img/icons/chat.png";

const SideMenu = () => {
  const { isOpen, updateIsOpen, updateViewType, updateIsAlertOpen } =
    useAppStore();
  const { modalFlag, updateModalFlag } = useBreedFinderStore();
  const { isLogin } = useAuthStore();
  const { pathname } = useLocation();
  const [activeMenu, updateActiveMenu] = useState<string>(pathname);
  const goChat = () => {
    if (!isLogin) {
      updateIsAlertOpen({
        flag: true,
        message: "로그인 후 이용 가능합니다.",
      });
    }
    return updateViewType("CHAT");
  };
  useEffect(() => {
    // activeMenu
    updateActiveMenu(pathname);
  }, [pathname]);

  useEffect(() => {
    if (!modalFlag && activeMenu === "ai") {
      updateActiveMenu(pathname);
    }
  }, [modalFlag]);

  return (
    <>
      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-4 text-lg">
          <li>
            <Link
              to={ROUTES.MISSING}
              className={`hover:text-orange-500 ${activeMenu === ROUTES.MISSING ? "text-orange-500" : ""}`}
            >
              실종동물 게시판
            </Link>
          </li>
          <li>
            <Link
              to={ROUTES.SHELTER}
              className={`hover:text-orange-500  ${activeMenu === ROUTES.SHELTER ? "text-orange-500" : ""}`}
            >
              유기동물 보호소
            </Link>
          </li>
          <li>
            <button
              className={`hover:text-orange-500 ${modalFlag ? "text-orange-500" : ""}`}
              onClick={() => {
                updateActiveMenu("ai");
                updateModalFlag(true);
              }}
            >
              AI 품종찾기
            </button>
          </li>
          {isLogin && (
            <li>
              <Link
                to={ROUTES.MYPAGE}
                className={`hover:text-orange-500  ${activeMenu?.includes(ROUTES.MYPAGE) ? "text-orange-500" : ""}`}
              >
                마이페이지
              </Link>
            </li>
          )}
        </ul>
      </div>

      {/* 하단 */}
      <div className="p-4 border-t">
        <button onClick={() => goChat()}>
          <img src={chatImg} alt="채팅하기" />
        </button>
      </div>
    </>
  );
};

export default SideMenu;

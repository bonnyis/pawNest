import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTES } from "@/shared/routes/routes";
import logoImg from "@/shared/assets/img/mainHomeLogo.png";
import chat from "@/shared/assets/img/icons/chat.png";
import chat_fill from "@/shared/assets/img/icons/chat_fill.png";
import { useAuthStore } from "@/app/store/authStore";
const Header = () => {
  const focueActiveCss = `relative inline-block pb-1
             before:content-[''] before:absolute before:bottom-[-2px] before:left-0 
             before:h-[1px] before:w-0 before:opacity-0 before:bg-pinkColor 
             before:transition-[width] before:duration-300 before:tansition-all
             hover:before:w-full hover:before:opacity-100`;

  const chatStatus = useAuthStore((state) => state.chatStatus);
  const updateChatStatus = useAuthStore((state) => state.updateChatStatus);
  return (
    <nav className="w-full header h-24 flex items-center justify-center border-b-1">
      <div className="flex justify-between items-center w-full max-w-[1480px] ">
        {/* TODO 모바일인 경우 justify-center로 바꿔주기 */}
        {/* <div className="flex justify-center items-center w-full max-w-[1480px] ">*/}
        <div className="w-40">
          <Link to={ROUTES.HOME}>
            <img src={logoImg} alt="pawnest 로고 이미지" />
          </Link>
        </div>

        <ul className="menu flex space-x-8">
          <li className={focueActiveCss}>
            <Link to={ROUTES.MISSING}>MISSING</Link>
          </li>

          <li className={focueActiveCss}>
            <Link to={ROUTES.SHELTER}>SHELTER</Link>
          </li>

          <li className={focueActiveCss}>
            <button type="button">LOGIN </button>
          </li>

          <li className={focueActiveCss}>
            <Link to={ROUTES.MYPAGE}>MYPAGE </Link>
          </li>
          <li>
            <button type="button">
              {!chatStatus ? (
                <img src={chat} alt="채팅창 열기" />
              ) : (
                <img src={chat_fill} alt="채팅창 닫기" />
              )}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

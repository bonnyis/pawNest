import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ROUTES } from "@/shared/routes/routes";
import logoImg from "@/shared/assets/img/mainHomeLogo.png";
import hamberger from "@/shared/assets/img/icons/hamberger.png";
import hamberger_open from "@/shared/assets/img/icons/hamberger_open.png";
import { useAppStore } from "@/app/store/appStore";
const Header = () => {
  const { isOpen, updateIsOpen } = useAppStore();
  return (
    <nav
      className={`${
        isOpen ? "" : "justify-center"
      } w-full justify-end px-2.5 header h-24 flex items-center  border-b-1`}
    >
      <div
        className={`flex justify-between items-center max-w-[1480px] ${
          isOpen ? "w-[calc(100%-320px)] sm:w-[calc(100%-400px)] " : "w-full"
        }`}
      >
        {/* TODO 모바일인 경우 justify-center로 바꿔주기 */}
        {/* <div className="flex justify-center items-center w-full max-w-[1480px] ">*/}
        <div className="w-40">
          <Link to={ROUTES.HOME}>
            <img src={logoImg} alt="pawnest 로고 이미지" />
          </Link>
        </div>
        <div className="">
          {isOpen ? (
            <button type="button" onClick={() => updateIsOpen(false)}>
              <img src={hamberger_open} alt="메뉴닫기" />
            </button>
          ) : (
            <button type="button" onClick={() => updateIsOpen(true)}>
              <img src={hamberger} alt="메뉴열기" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

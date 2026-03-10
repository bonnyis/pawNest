import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/routes/routes";
import logoImg from "@/shared/assets/img/mainHomeLogo.png";
import hamberger from "@/shared/assets/img/icons/hamberger.png";
import hamberger_open from "@/shared/assets/img/icons/hamberger_open.png";
import { useAppStore } from "@/app/store/appStore";

const Header = () => {
  const { isOpen, updateIsOpen, isMobile } = useAppStore();

  return (
    <nav className="w-full h-24 flex items-center border-b px-4">
      <div
        className={`flex ${isMobile ? "justify-center" : "justify-between"} items-center max-w-[1480px] w-full mx-auto`}
      >
        <div className="w-40 flex-shrink-0">
          <Link to={ROUTES.HOME}>
            <img src={logoImg} alt="pawnest 로고 이미지" className="w-full" />
          </Link>
        </div>
        {!isMobile && (
          <button
            type="button"
            onClick={() => {
              updateIsOpen(!isOpen);
            }}
          >
            <img
              src={isOpen ? hamberger_open : hamberger}
              alt={isOpen ? "메뉴닫기" : "메뉴열기"}
            />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;

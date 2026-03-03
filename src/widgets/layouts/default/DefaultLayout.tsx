import { Outlet, useLocation } from "react-router-dom";
import Header from "@/shared/ui/headers/Header";
import Footer from "@/shared/ui/footer/Footer";
import SubHeader from "@/shared/ui/headers/SubHeader";
import SideBar from "@/widgets/sidebar/SideBar";
import { useAppStore } from "@/app/store/appStore";
// defualt Layout
const DefaultLayout = () => {
  const { pathname } = useLocation();
  const { isOpen } = useAppStore();
  // 메인 홈(/)이 아닐 때만 SubHeader를 보여주도록 설정
  const isHome = pathname === "/";
  return (
    <article
      className={"min-h-screen relative w-full overflow-hidden bg-white"}
    >
      <section
        className={`flex flex-col min-h-screen transition-transform duration-300 ease-in-out ${
          isOpen
            ? "-translate-x-[320px] sm:-translate-x-[400px]"
            : "translate-x-0"
        }`}
      >
        <Header />
        {/* 홈이 아닐 때만 서브헤더 노출 */}
        {!isHome && <SubHeader />}

        <Outlet />
        <Footer />
      </section>
      {/* 사이드바 */}
      <SideBar />
    </article>
  );
};

export default DefaultLayout;

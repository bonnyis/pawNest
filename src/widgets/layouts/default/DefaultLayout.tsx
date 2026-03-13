import { Outlet, useLocation } from "react-router-dom";
import Header from "@/widgets/headers/Header";
import Footer from "@/widgets/footer/Footer";
import SubHeader from "@/widgets/headers/SubHeader";
import SideBar from "@/widgets/sidebar/SideBar";
import { useAppStore } from "@/app/store/appStore";
import { useEffect } from "react";
import Alert from "@/shared/ui/common/Alert";
import Confirm from "@/shared/ui/common/Confirm";
const DefaultLayout = () => {
  const { pathname } = useLocation();
  const { isOpen } = useAppStore();
  const isHome = pathname === "/";
  useEffect(() => {}, [isOpen]);
  return (
    <article className="min-h-screen bg-white">
      <div className="sm:flex min-h-screen">
        {/* 메인 영역 */}

        <div className="flex-1 flex flex-col">
          <Header />
          {!isHome && <SubHeader />}

          <main className="flex-1 w-full h-lvh">
            <Outlet />
          </main>

          <Footer />
        </div>

        {/* PC 사이드바 (레이아웃 일부) */}
        {isOpen && <SideBar />}
        {/* 알람창 및 확인창 */}
        <Alert />
        <Confirm />
      </div>

      {/* ================= Mobile (drawer) ================= */}
      {/* <div className="sm:hidden min-h-screen flex flex-col">
        <Header />
        {!isHome && <SubHeader />}

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />

        {isOpen && (
          <>
            
            <div
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => updateIsOpen(false)}
            />

            <SideBar />
          </>
        )}
      </div> */}
    </article>
  );
};

export default DefaultLayout;

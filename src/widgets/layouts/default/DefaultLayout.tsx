import { Outlet, useLocation } from "react-router-dom";
import Header from "@/shared/ui/headers/Header";
import Footer from "@/shared/ui/footer/Footer";
import SubHeader from "@/shared/ui/headers/SubHeader";
import SideBar from "@/widgets/sidebar/SideBar";
import { useAppStore } from "@/app/store/appStore";
import { useEffect } from "react";
const DefaultLayout = () => {
  const { pathname } = useLocation();
  const { isOpen } = useAppStore();
  const isHome = pathname === "/";
  useEffect(() => {
    console.log("!!!", isOpen);
  }, [isOpen]);
  return (
    <article className="min-h-screen bg-white">
      <div className="hidden sm:flex min-h-screen">
        {/* 메인 영역 */}

        <div className="flex-1 flex flex-col">
          <Header />
          {!isHome && <SubHeader />}

          <main className="flex-1 w-full">
            <Outlet />
          </main>

          <Footer />
        </div>

        {/* PC 사이드바 (레이아웃 일부) */}
        <aside
          className={`transition-all duration-300 overflow-hidden ${
            isOpen ? "w-[400px]" : "w-0"
          }`}
        >
          {isOpen && <SideBar />}
        </aside>
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

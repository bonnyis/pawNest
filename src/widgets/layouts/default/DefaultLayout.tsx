// import { useEffect } from "react";
import { useAppStore } from "@/app/store/appStore";
import { Outlet, useLocation } from "react-router-dom";

import Header from "@/widgets/headers/Header";
import Footer from "@/widgets/footer/Footer";
import SubHeader from "@/widgets/headers/SubHeader";
import SideBar from "@/widgets/sidebar/SideBar";
import Alert from "@/shared/ui/common/Alert";
import Confirm from "@/shared/ui/common/Confirm";
import BreedFinderModal from "@/features/breed-finder/ui/BreedFinderModal";

// import { useLogin } from "@/features/auth/hooks/useLogin";

const DefaultLayout = () => {
  const { pathname } = useLocation();
  const { isOpen } = useAppStore();
  const isHome = pathname === "/";

  // login여부

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

        {/* AI품종찾기 모달창 */}
        <BreedFinderModal />
      </div>
    </article>
  );
};

export default DefaultLayout;

import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/shared/routes/routes";
import DefaultLayout from "@/widgets/layouts/default/DefaultLayout";
import MainPage from "@/pages/main/Main";
import MissingIndex from "@/pages/missing/MissingIndex";
import ShelterIndex from "@/pages/shelter/ShelterIndex";
import MissingInsertPage from "@/pages/missing/MissingInsertPage";
import NotFound from "@/shared/ui/common/NotFound";
import MypageIndex from "@/pages/mypage/MypageIndex";
import MissingEditPage from "@/pages/missing/MissingEditPage";

export const router = createBrowserRouter([
  // Default Layout
  {
    path: ROUTES.HOME,
    element: <DefaultLayout />,
    children: [
      { path: "*", element: <NotFound /> },
      { index: true, element: <MainPage /> },
      { path: ROUTES.MISSING, element: <MissingIndex /> },
      { path: ROUTES.SHELTER, element: <ShelterIndex /> },
      { path: ROUTES.MISSINGINSERT, element: <MissingInsertPage /> },
      { path: ROUTES.MISSINGEDIT, element: <MissingEditPage /> },
      { path: ROUTES.MYPAGE, element: <MypageIndex /> },
      //  로그아웃 인식 페이지
      { path: ROUTES.LOGOUT, element: <MainPage /> },
    ],
  },
]);

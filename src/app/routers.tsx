import { createBrowserRouter } from "react-router-dom";
import { ROUTE_PATHS } from "@/shared/routes/routes";
import DefaultLayout from "@/widgets/layouts/default/DefaultLayout";
import MainPage from "@/pages/main/Main";
import MissingIndex from "@/pages/missing/MissingIndex";
import ShelterIndex from "@/pages/shelter/ShelterIndex";
import MissingInsertPage from "@/pages/missing/MissingInsertPage";
import NotFound from "@/shared/ui/common/NotFound";
import MypageIndex from "@/pages/mypage/MypageIndex";
// TODO: 게시글 수정 시 InsertPage를 재사용하기 위해 MissingInsertPage -> MissingFormPage로 네이밍 변경 필요
export const router = createBrowserRouter([
  // Default Layout
  {
    path: ROUTE_PATHS.ROOT,
    element: <DefaultLayout />,
    children: [
      { path: "*", element: <NotFound /> },
      { index: true, element: <MainPage /> },
      { path: ROUTE_PATHS.MISSING, element: <MissingIndex /> },
      { path: ROUTE_PATHS.SHELTER, element: <ShelterIndex /> },
      { path: ROUTE_PATHS.MISSINGINSERT, element: <MissingInsertPage /> },
      { path: ROUTE_PATHS.MYPAGE, element: <MypageIndex /> },
      //  로그아웃 인식 페이지
      { path: ROUTE_PATHS.LOGOUT, element: <MainPage /> },
    ],
  },
]);

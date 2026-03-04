import { createBrowserRouter } from "react-router-dom";
import { ROUTE_PATHS } from "@/shared/routes/routes";
import DefaultLayout from "@/widgets/layouts/default/DefaultLayout";
import MainPage from "@/pages/main/Main";
import MissingIndex from "@/pages/missing/MissingIndex";
import ShelterIndex from "@/pages/shelter/ShelterIndex";
import NotFound from "@/pages/NotFound";
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
      // { path: ROUTE_PATHS.MYPAGE, element: <MainPage /> },
    ],
  },
  // 마이페이지 전용
  {
    path: ROUTE_PATHS.MYPAGE,
    element: <DefaultLayout />,
    children: [
      { index: true, element: <MainPage /> },
      // { path: ROUTE_PATHS.MYPAGE, element: <MainPage /> },
    ],
  },
]);

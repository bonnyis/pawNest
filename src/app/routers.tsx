import { createBrowserRouter } from "react-router-dom";
import { ROUTE_PATHS, ROUTES } from "@/shared/routes/routes";
import DefaultLayout from "@/widgets/layouts/default/DefaultLayout";
import MainPage from "@/pages/main/Main";
import MissingIndex from "@/pages/missing/MissingIndex";
import ShelterIndex from "@/pages/shelter/ShelterIndex";
import MissingInsertPage from "@/pages/missing/MissingInsertPage";
import NotFound from "@/shared/ui/common/NotFound";
import MypageIndex from "@/pages/mypage/MypageIndex";
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
    ],
  },
]);

import type { RouteMeta } from "@/shared/types/routes";
export const ROUTE_PATHS = {
  ROOT: "/",
  MISSING: "missing",
  SHELTER: "shelter",
  MYPAGE: "mypage",
} as const;

export const ROUTES = {
  HOME: "/",
  MISSING: "/missing",
  SHELTER: "/shelter",
  MYPAGE: "/mypage",
} as const;

export const ROUTES_INFO: RouteMeta[] = [
  {
    path: ROUTES.MISSING,
    title: "실종동물 게시판",
    desc: "사라진 아이들을 함께 찾아주세요.",
  },
  {
    path: ROUTES.SHELTER,
    title: "유기동물 보호소",
    desc: "내 주변 가까운 보호소가 어딘지 확인해요.",
  },
  {
    path: ROUTES.MYPAGE,
    title: "마이페이지",
    desc: "내 계정정보와 내 활동을 관리해요.",
  },
] as const;
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

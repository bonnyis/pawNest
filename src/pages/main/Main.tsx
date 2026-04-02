import MainBanner from "@/widgets/home/contents/MainBanner";
import ContentsSection from "@/widgets/home/contents/ContentsSection";
import { useLogin, useLogout } from "@/features/auth/model/useLogin";

const Main = () => {
  // 소셜로그인 확인
  useLogin();

  // 소셜로그인 후 로그아웃 확인
  useLogout();

  return (
    <>
      <MainBanner />
      {/* contents */}
      <ContentsSection />
    </>
  );
};

export default Main;

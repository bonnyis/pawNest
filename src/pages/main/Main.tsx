import MainBanner from "@img/mainBanner_PC.png";
import ContentsSection from "@/widgets/home/contents/ContentsSection";
import { useLogin, useLogout } from "@/features/auth/model/useLogin";

const Main = () => {
  // 소셜로그인 확인
  useLogin();

  // 소셜로그인 후 로그아웃 확인
  useLogout();

  return (
    <>
      <img src={MainBanner} alt="" className={`main-banner`} />
      {/* contents */}
      <ContentsSection />
    </>
  );
};

export default Main;

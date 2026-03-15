import {} from "react";
import SideBar from "@/widgets/mypage/SideBar";
import ContentsSection from "@/widgets/mypage/ContentsSection";
const MypageIndex = () => {
  return (
    <section className="max-w-[1480px] mx-auto pt-4">
      <div className="grid grid-flow-col justify-items-stretch justify-start">
        <SideBar />
        <ContentsSection />
      </div>
    </section>
  );
};

export default MypageIndex;

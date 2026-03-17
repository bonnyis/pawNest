import { useAppStore } from "@/app/store/appStore";

import NearShelterSection from "./NearShelterSection";
import MissingBoardSection from "./MissingBoardSection";
// 메인 컨텐츠 영역
const ContentsSection = () => {
  const { isOpen } = useAppStore();

  return (
    <div
      className={`w-full flex flex-col lg:flex-row gap-6 px-6 my-6 min-h-96 ${isOpen ? "justify-evenly" : "justify-center"}`}
    >
      {/* 근처 보호소 */}
      <NearShelterSection />
      {/* 실종게시판 */}
      <MissingBoardSection />
    </div>
  );
};

export default ContentsSection;

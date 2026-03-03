import MainBanner from "@img/mainBanner_PC.png";
import ContentsSection from "@/widgets/home/contents/ContentsSection";
const Main = () => {
  return (
    <div className="max-w-full">
      <img src={MainBanner} alt="" className="main-banner" />
      {/* contents */}
      <ContentsSection />
    </div>
  );
};

export default Main;

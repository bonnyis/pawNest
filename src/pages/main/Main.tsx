import MainBanner from "@img/mainBanner_PC.png";
import ContentsSection from "@/widgets/home/contents/ContentsSection";
const Main = () => {
  return (
    <>
      <img src={MainBanner} alt="" className={`main-banner`} />
      {/* contents */}
      <ContentsSection />
    </>
  );
};

export default Main;

import { useAppStore } from "@/app/store/appStore";
import banner_pc from "@img/mainBanner_PC.png";
import banner_mb from "@img/mainBanner_mb.png";

const MainBanner = () => {
  const { isMobile } = useAppStore();
  return (
    <div>
      {isMobile ? (
        <img
          src={banner_mb}
          alt="pawNest 메인 배너"
          className={`w-full`}
          fetchPriority="high"
        />
      ) : (
        <img
          src={banner_pc}
          alt="pawNest 메인 배너"
          className={`main-banner`}
          fetchPriority="high"
        />
      )}
    </div>
  );
};

export default MainBanner;

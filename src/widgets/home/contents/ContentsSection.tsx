import { useState } from "react";
import ShelterListItem from "@/entities/shelter/ui/ShelterListItem";
import noImg from "@img/no_img.png";

// 메인 컨텐츠 영역
const ContentsSection = () => {
  const activeCss = `relative inline-block pb-1
             before:content-[''] before:absolute before:bottom-[-2px] before:left-0 
             before:h-[1px] before:bg-pinkColor 
             before:transition-[width] before:duration-300 before:tansition-all
             before:w-full before:opacity-100`;
  const [actvieTab, setActiveTab] = useState<string>("popular");
  const [curSlide, setCurSlide] = useState<number>(0);
  return (
    <div className="w-full flex justify-center my-6 min-h-96">
      {/* 근처 보호소 */}
      <div className="w-2/5 p-5 border rounded-2xl">
        <div className="flex justify-between mb-2">
          <h2 className="text-2xl font-bold">근처 보호소 위치</h2>
          <button type="button" className="text-2xl font-bold">
            +
          </button>
        </div>
        <div className="">
          <ShelterListItem />
        </div>
      </div>
      {/* 실종게시판 */}
      <div className="w-2/5 p-5 border rounded-2xl ml-4">
        {/* TODO 슬라이드 라이브러리 다운로드 필요! */}
        <div className="flex justify-between mb-2">
          <h2 className="text-2xl font-bold">실종게시판</h2>
          <button type="button" className="text-2xl font-bold">
            +
          </button>
        </div>

        <ul className="flex justify-between w-48 text-xl">
          <li className="">
            <button
              type="button"
              onClick={() => setActiveTab("popular")}
              className={`${actvieTab === "popular" ? activeCss : ""}`}
            >
              인기게시글
            </button>
          </li>
          <li className="">
            <button
              type="button"
              onClick={() => setActiveTab("recent")}
              className={`${actvieTab === "recent" ? activeCss : ""}`}
            >
              최근게시글
            </button>
          </li>
        </ul>
        <div className="w-full p-5 relative">
          <div className="w-full overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${curSlide * 100}%)` }}
            >
              <div className="w-full flex-shrink-0">
                <div className="flex justify-between">
                  <div className="img-box">
                    <img src={noImg} alt="대표이미지 없음" />
                  </div>
                  <div className="w-3/4">
                    <h4 className="text-lg font-semibold">[믹스견] 2살 갈색</h4>
                    <p className="mx-auto p-2 text-lg">
                      얼굴에 흰색과 갈색이 섞여있어요! 00동 근처에서 마지막으로
                      목격신고 있었습니다. 그 이후에 보신 분 있으시면 연락
                      부탁드립니다.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex-shrink-0">
                <div className="flex justify-between">
                  <div className="img-box">
                    <img src={noImg} alt="대표이미지 없음" />
                  </div>
                  <div className="w-3/4">
                    <h4 className="text-lg font-semibold">[믹스견] 2살 갈색</h4>
                    <p className="mx-auto p-2 text-lg">
                      얼굴에 흰색과 갈색이 섞여있어요! 00동 근처에서 마지막으로
                      목격신고 있었습니다. 그 이후에 보신 분 있으시면 연락
                      부탁드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-2 -translate-y-1/2 ">
            <button
              type="button"
              className={`font-bold text-2xl text-gray-400 ${curSlide === 0 ? "opacity-0" : "opacity-100"}`}
              onClick={() => setCurSlide(curSlide - 1)}
            >
              {"<"}
            </button>
            <button
              type="button"
              className=" font-bold text-2xl text-gray-400"
              onClick={() => setCurSlide(curSlide + 1)}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentsSection;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/routes/routes";
import MissingBoardItem from "@/entities/missing/ui/MissingBoardItem";

const MissingBoardSection = () => {
  const activeCss = `relative inline-block pb-1
             before:content-[''] before:absolute before:bottom-[-2px] before:left-0 
             before:h-[1px] before:bg-pinkColor 
             before:transition-[width] before:duration-300 before:tansition-all
             before:w-full before:opacity-100`;
  const [actvieTab, setActiveTab] = useState<string>("popular");
  const [curSlide, setCurSlide] = useState<number>(0);
  const navigation = useNavigate();

  return (
    <div className="md:w-2/5 p-5 border rounded-2xl sm:ml-4">
      <div className="flex justify-between mb-2">
        <h2 className="text-2xl font-bold">실종게시판</h2>
        <button
          type="button"
          className="text-2xl font-bold"
          onClick={() => {
            navigation(ROUTES.MISSING);
          }}
        >
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
            <MissingBoardItem />
            <MissingBoardItem />
            <MissingBoardItem />
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
  );
};

export default MissingBoardSection;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/routes/routes";
import MissingPreviewItem from "@/entities/missing/ui/MissingPreviewItem";
import { useGetMissingPreview } from "@/features/missing-preview/model/useGetMissingPreview";
import LoadingSpinner from "@/shared/ui/common/LoadingSpinner";

const MissingBoardSection = () => {
  const activeCss = `relative inline-block pb-1
             before:content-[''] before:absolute before:bottom-[-2px] before:left-0 
             before:h-[2px] before:bg-orgColor 
             before:transition-[width] before:duration-300 before:tansition-all
             before:w-full before:opacity-100
             font-bold`;

  const [curSlide, setCurSlide] = useState<number>(0);
  const navigation = useNavigate();
  const { setTab, tab, list, isLoading } = useGetMissingPreview();

  const onSlide = (type: "prev" | "next") => {
    if (type === "prev" && curSlide > 0) {
      setCurSlide(curSlide - 1);
    } else if (type === "next" && curSlide < 4) {
      setCurSlide(curSlide + 1);
    }
  };

  const goMissingDetail = (id?: number) => {
    navigation(id ? `${ROUTES.MISSING}?id=${id}` : ROUTES.MISSING);
  };
  return (
    <div className="lg:w-2/5 p-5 border rounded-2xl sm:ml-4">
      <div className="flex justify-between mb-2">
        <h2 className="text-2xl font-bold">실종게시판</h2>
        <button
          type="button"
          className="text-2xl font-bold"
          onClick={() => goMissingDetail()}
        >
          +
        </button>
      </div>

      <ul className="flex justify-between w-48 text-xl">
        <li className="">
          <button
            type="button"
            onClick={() => setTab("popular")}
            className={`${tab === "popular" ? activeCss : ""}`}
          >
            인기게시글
          </button>
        </li>
        <li className="">
          <button
            type="button"
            onClick={() => setTab("recent")}
            className={`${tab === "recent" ? activeCss : ""}`}
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
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              list &&
              list?.map((item) => (
                <MissingPreviewItem
                  list={item}
                  key={item.boardId}
                  onClick={() => goMissingDetail(item.boardId)}
                />
              ))
            )}
          </div>
        </div>
        <div className="absolute top-1/2 left-0 right-0 flex justify-between px-2 -translate-y-1/2 ">
          <button
            type="button"
            className={`font-bold text-2xl text-gray-400 ${curSlide === 0 ? "opacity-0" : "opacity-100"}`}
            onClick={() => onSlide("prev")}
          >
            {"<"}
          </button>
          <button
            type="button"
            className=" font-bold text-2xl text-gray-400"
            onClick={() => onSlide("next")}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissingBoardSection;

import Pagination from "@/shared/ui/common/Pagination";
import { useState } from "react";
import Select from "@/shared/ui/common/Select";
type SubTabTypes = "post" | "bookmark";
const MyActivity = () => {
  const [subTab, setSubTab] = useState<SubTabTypes>("post");
  const [page, setPage] = useState<number>(1);
  const changePage = (num: number) => {
    setPage(num);
  };
  const [, updateSearchOption] = useState<string | number>("");
  const searchOptions = [
    { label: "10건", value: 10 },
    { label: "20건", value: 20 },
    { label: "30건", value: 30 },
    { label: "10건", value: 50 },
    { label: "20건", value: 100 },
    { label: "30건", value: 300 },
  ];
  const changeOptions = (val: string | number) => {
    updateSearchOption(val);
  };
  return (
    <>
      {/* 서브 탭 네비게이션 */}
      <div className="flex bg-gray-100 p-1.5 rounded-xl w-full">
        <button
          onClick={() => setSubTab("post")}
          className={`flex-1 px-8 py-2.5 rounded-lg text-sm font-bold transition-all
              ${
                subTab === "post"
                  ? "bg-[#F4A261] text-white shadow-md"
                  : "text-gray-600 hover:bg-white/50"
              }`}
        >
          내가 쓴 글
        </button>
        <button
          onClick={() => setSubTab("bookmark")}
          className={`flex-1 px-8 py-2.5 rounded-lg text-sm font-bold transition-all
              ${
                subTab === "bookmark"
                  ? "bg-[#F4A261] text-white shadow-md"
                  : "text-gray-600 hover:bg-white/50"
              }`}
        >
          관심 게시글
        </button>
      </div>

      {/* 필터 옵션 */}
      <div className="flex items-center gap-6 text-sm w-full justify-end">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="type"
              className="w-4 h-4 accent-[#A6A57A]"
              defaultChecked
            />
            <span className="text-gray-600 group-hover:text-[#A6A57A]">
              게시글
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              name="type"
              className="w-4 h-4 accent-[#A6A57A]"
            />
            <span className="text-gray-600 group-hover:text-[#A6A57A]">
              댓글
            </span>
          </label>
        </div>

        <Select options={searchOptions} changeEvt={changeOptions}></Select>
      </div>

      {/* 리스트 본문 (subTab 상태에 따라 데이터 필터링 가능) */}
      <div className="divide-y divide-gray-50 md:w-full">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="p-6 hover:bg-gray-50 transition-colors flex justify-between items-center group"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {/* <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 bg-blue-50 text-blue-500 rounded uppercase">
                  {subTab === "post" ? "MY" : "LIKE"}
                </span> */}
                <h3 className="text-base font-semibold text-gray-900 truncategroup-hover:text-[#F4A261] transition-colors cursor-pointer">
                  {subTab === "post"
                    ? `내가 작성한 ${item}번째 소중한 게시글 제목`
                    : `관심 등록한 ${item}번째 게시글 제목`}
                </h3>
              </div>
              <p className="text-sm text-gray-400 truncate pl-10">
                2026.03.17 · 조회 124 · 댓글 5
              </p>
            </div>

            {/* 더보기 버튼 (수정/삭제 등) */}
            <button className="ml-4 p-2 text-gray-300 hover:text-[#F4A261] hover:bg-white rounded-full transition-all">
              <svg
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {/* 데이터가 없을 경우 처리 예시 */}
      {/* <div className="p-20 text-center text-gray-400">데이터가 없습니다.</div> */}
      <Pagination totalPage={10} currentPage={page} onPageChange={changePage} />
    </>
  );
};

export default MyActivity;

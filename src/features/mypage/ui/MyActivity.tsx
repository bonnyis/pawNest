import Pagination from "@/shared/ui/common/Pagination";
import { useEffect, useState } from "react";
import Select from "@/shared/ui/common/Select";
import MyListItem from "@/entities/myactivity/ui/MyListItem";
import { useGetMyList } from "../model/useGetMyList";
import LoadingSpinner from "@/shared/ui/common/LoadingSpinner";
import type { MyListType } from "@/entities/myactivity/model/myActivity.type";
import NoData from "@/shared/ui/common/NoData";

const MyActivity = () => {
  const [subTab, setSubTab] = useState<MyListType>("post");
  const [page, setPage] = useState<number>(1);
  const changePage = (num: number) => {
    setPage(num);
  };
  const [searchOption, updateSearchOption] = useState<string | number>("");
  const searchOptions = [
    { label: "10건", value: 10 },
    { label: "20건", value: 20 },
    { label: "30건", value: 30 },
    { label: "50건", value: 50 },
    { label: "100건", value: 100 },
    { label: "300건", value: 300 },
  ];
  const changeOptions = (val: string | number) => {
    updateSearchOption(val);
  };
  // 2. 컴포넌트에서 호출 시
  const { data, isLoading } = useGetMyList({
    params: {
      page,
      size: Number(searchOption) || 10,
      sort: ["string"],
    },
    type: subTab, // 하나의 객체 안에 담아서 전달
  });
  useEffect(() => {
    console.log(subTab);
  }, [subTab]);
  if (isLoading) return <LoadingSpinner />;
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
        {/* <div className="flex items-center gap-4">
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
        </div> */}

        <Select options={searchOptions} changeEvt={changeOptions}></Select>
      </div>

      {/* 리스트 본문 (subTab 상태에 따라 데이터 필터링 가능) */}
      {data && data.totalPages >= 1 ? (
        data?.content?.map((item) => (
          <MyListItem key={item.title} subTab={subTab} list={item} />
        ))
      ) : (
        <NoData message="조회되는 게시글이 없습니다." />
      )}

      {/* 데이터가 없을 경우 처리 예시 */}
      {data && data.totalPages >= 1 ? (
        <Pagination
          totalPage={data?.totalPages ?? 1}
          currentPage={page}
          onPageChange={changePage}
        />
      ) : null}
    </>
  );
};

export default MyActivity;

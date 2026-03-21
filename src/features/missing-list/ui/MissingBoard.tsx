import React, { useState } from "react";
import MissingCardItem from "@/entities/missing/ui/MissingCardItem";
import Select from "@/shared/ui/common/Select";
import Button from "@/shared/ui/common/Button";
import MissingDetailModal from "@/features/missing-detail/ui/MissingDetailModal";
import Pagination from "@/shared/ui/common/Pagination";
import LoadingSpinner from "@/shared/ui/common/LoadingSpinner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@/shared/routes/routes";
import { useAppStore } from "@/app/store/appStore";
import { SearchOptions } from "@/shared/types/data-types";
import { useMissingList } from "../model/useMissingList";
import { BoardItem } from "../model/missing-api-type";
import NoData from "@/shared/ui/common/NoData";

const MissingBoard = () => {
  const { isOpen } = useAppStore();
  const navigation = useNavigate();
  // 검색조건관련
  const [searchParmas, setSearchParams] = useSearchParams();
  const breedOptions: SearchOptions[] = [
    { label: "개", value: "강아지" },
    { label: "고양이", value: "고양이" },
    { label: "기타", value: "기타" },
  ];
  const colorOptions: SearchOptions[] = [
    { label: "검정색", value: "검정색" },
    { label: "갈색", value: "갈색" },
    { label: "흰색", value: "흰색" },
    { label: "회색", value: "회색" },
  ];
  const breed = searchParmas.get("breed") ?? "";
  const color = searchParmas.get("color") ?? "";
  const searchText = searchParmas.get("searchText") ?? "";
  const [inputText, updateInpuText] = useState<string>("");

  // 페이지
  const page = Number(searchParmas.get("page")) || 1;
  const onPage = (val: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", String(val));
      return next;
    });
  };
  const updateParams = (key: string, val: string | number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set(key, String(val));
      next.set("page", "1");
      return next;
    });
  };
  // 게시글 리스트 조회
  const { isLoading, data } = useMissingList({
    page,
    size: 10,
    breed1: breed,
    color,
    searchText,
  });

  // 상세관련
  const [detailFlag, updateDetailFlag] = useState<boolean>(false);
  const [boardId, updateBoardId] = useState<string>("");
  // 로딩중
  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      {/* search options */}
      <div className="mt-5 flex justify-end md:max-w-[1460px] gap-2">
        <Select
          options={breedOptions}
          changeEvt={(e) => {
            updateParams("breed", e);
          }}
        />
        <Select
          options={colorOptions}
          changeEvt={(e) => {
            updateParams("color", e);
          }}
        />
        <input
          type="text"
          name="missingListInput"
          id="missingListInput"
          className="border rounded-md pl-3"
          placeholder="검색어를 입력해주세요."
          value={inputText}
          onChange={(e) => updateInpuText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateParams("searchText", inputText);
            }
          }}
        />

        <Button
          variant="primary"
          size="md"
          onClick={() => {
            updateParams("searchText", inputText);
          }}
        >
          검색
        </Button>
      </div>

      {/* 리스트 시작 */}
      <div
        className={`grid mt-5 justify-items-center grid-cols-2 gap-2 md:grid-cols-3 ${isOpen ? "md:grid-cols-2 md:gap-3 lg:grid-cols-4" : "lg:grid-cols-5"} lg:gap-5`}
      >
        {data?.content.map((item: BoardItem) => (
          <MissingCardItem
            data={item}
            updateFlag={() => {
              updateBoardId(String(item.boardId));
              updateDetailFlag(!detailFlag);
            }}
            key={item.boardId}
          />
        ))}
        {(!data || data?.totalPages === 0) && <NoData />}
        {}
      </div>
      <div className="flex justify-end my-5 md:max-w-[1460px]">
        <Button
          size={"lg"}
          variant="primary"
          onClick={() => {
            navigation(ROUTES.MISSINGINSERT);
          }}
        >
          글쓰기
        </Button>
      </div>

      {/* 페이지네이션 */}
      {data?.totalPages && data?.totalPages > 0 ? (
        <Pagination
          currentPage={page}
          totalPage={data?.totalPages ?? 1}
          pageSize={10}
          onPageChange={onPage}
        />
      ) : null}

      {/* 상세 */}
      <MissingDetailModal
        flag={detailFlag}
        updateFlag={updateDetailFlag}
        boardId={boardId}
      />
    </>
  );
};

export default MissingBoard;

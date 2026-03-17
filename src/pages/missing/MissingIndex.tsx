import { useState } from "react";
import MissingCardItem from "@/entities/missing/ui/MissingCardItem";
import Select from "@/shared/ui/common/Select";
import Button from "@/shared/ui/common/Button";
import type { MissingDetailModalProps } from "@/features/missing-detail/types/missing-detail";
import MissingDetailModal from "@/features/missing-detail/ui/MissingDetailModal";
import Pagination from "@/shared/ui/common/Pagination";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/routes/routes";
import { useAppStore } from "@/app/store/appStore";
const MissingIndex = () => {
  const { isMobile } = useAppStore();
  const searchOptions = [
    { label: "개", value: "dog" },
    { label: "고양이", value: "cat" },
    { label: "기타", value: "etc" },
  ];
  const [, updateSearchOption] = useState<string>("");
  const navigation = useNavigate();
  const onChangeEvt = (val: string) => {
    updateSearchOption(val);
  };
  const [detailFlag, updateDetailFlag] =
    useState<MissingDetailModalProps["flag"]>(false);
  const [page, setPage] = useState<number>(1);
  const onPage = (val: number) => {
    console.log("?page ", val);
    setPage(val);
  };
  return (
    <section className="max-w-[1480px] mx-auto">
      {/* search options */}
      <div className="mt-5 flex justify-end md:max-w-[1460px] gap-2">
        <Select options={searchOptions} changeEvt={onChangeEvt} />
        <Select options={searchOptions} changeEvt={onChangeEvt} />
        <input
          type="text"
          name=""
          id=""
          className="border rounded-md pl-3"
          placeholder="검색어를 입력해주세요."
        />

        <Button variant="primary" size="md">
          검색
        </Button>
      </div>

      {/* 리스트 시작 */}
      <div
        className={`grid mt-5 justify-items-center ${isMobile ? "grid-cols-2 gap-2" : "grid-cols-5 gap-5 "}`}
      >
        <MissingCardItem onClick={() => updateDetailFlag(true)} />
        <MissingCardItem onClick={() => updateDetailFlag(true)} />
        <MissingCardItem onClick={() => updateDetailFlag(true)} />
        <MissingCardItem onClick={() => updateDetailFlag(true)} />
        <MissingCardItem onClick={() => updateDetailFlag(true)} />
        <MissingCardItem onClick={() => updateDetailFlag(true)} />
        <MissingCardItem onClick={() => updateDetailFlag(true)} />
        <MissingCardItem onClick={() => updateDetailFlag(true)} />
        <MissingCardItem onClick={() => updateDetailFlag(true)} />
        <MissingCardItem onClick={() => updateDetailFlag(true)} />
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
      <Pagination
        currentPage={page}
        totalPage={10}
        pageSize={10}
        onPageChange={onPage}
      />
      {/* 상세 */}
      <MissingDetailModal flag={detailFlag} updateFlag={updateDetailFlag} />
    </section>
  );
};

export default MissingIndex;

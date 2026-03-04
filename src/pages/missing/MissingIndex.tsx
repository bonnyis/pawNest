import MissingCardItem from "@/entities/missing/ui/MissingCardItem";
import Select from "@/shared/ui/Select";
import { useEffect, useState } from "react";
const MissingIndex = () => {
  const searchOptions = [
    { label: "개", value: "dog" },
    { label: "고양이", value: "cat" },
    { label: "기타", value: "etc" },
  ];
  const [searchOption, updateSearchOption] = useState<string>("");
  const onChangeEvt = (val: string) => {
    updateSearchOption(val);
  };

  return (
    <section className="max-w-[1480px] mx-auto ">
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
        <button type="button" className="border rounded-md px-3 bg-gray-100">
          검색
        </button>
      </div>
      {/* 리스트 시작 */}
      <div className="grid grid-cols-5 gap-5 mt-5 justify-items-center">
        <MissingCardItem />
        <MissingCardItem />
        <MissingCardItem />
        <MissingCardItem />
        <MissingCardItem />
        <MissingCardItem />
        <MissingCardItem />
        <MissingCardItem />
      </div>
      {/* 페이지네이션 */}
    </section>
  );
};

export default MissingIndex;

import { useState } from "react";
import Select from "@/shared/ui/Select";
import ShelterListItem from "@/entities/shelter/ui/ShelterListItem";
import ShelterKakaoMap from "@/entities/shelter/ui/ShelterKakaoMap";
import ShelterListBox from "@/entities/shelter/ui/ShelterListBox";

const ShelterIndex = () => {
  const [searchOption, updateSearchOption] = useState<string>("");
  const searchOptions = [
    { label: "서울", value: "seoul" },
    { label: "경기", value: "gyeonggi" },
    { label: "인천", value: "incheon" },
  ];
  const onChangeEvt = (val: string) => {
    updateSearchOption(val);
  };
  return (
    <section className="max-w-[1480px] mx-auto">
      {/* 검색조건 영역 */}
      <div className="my-5 flex justify-end md:max-w-[1460px] gap-2">
        <Select options={searchOptions} changeEvt={onChangeEvt} />
        <Select options={searchOptions} changeEvt={onChangeEvt} />
      </div>
      {/* contents 영역 */}
      <div className="flex justify-end md:max-w-[1460px] gap-2 min-h-min">
        {/* 카카오지도 */}
        <div className="w-2/4  border rounded-lg p-5">
          <ShelterKakaoMap />
        </div>
        {/* 보호소 리스트 */}
        <div className="w-2/4 border rounded-lg p-5">
          <h2 className="text-center text-xl font-bold mb-3">보호소 리스트</h2>
          <ShelterListBox />
        </div>
      </div>
    </section>
  );
};

export default ShelterIndex;

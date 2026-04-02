import { useState } from "react";
import Select from "@/shared/ui/common/Select";
import ShelterMap from "@/features/shelter/ui/ShelterMap";
import ShelterListBox from "@/features/shelter/ui/ShelterListBox";

const ShelterIndex = () => {
  const [, updateSearchOption] = useState<string>("");
  const searchOptions = [{ label: "경기도", value: "gyeonggi" }];
  const searchCityOptions = [{}];
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
          <ShelterMap />
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

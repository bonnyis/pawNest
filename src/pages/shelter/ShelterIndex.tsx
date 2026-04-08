// import Select from "@/shared/ui/common/Select";
import ShelterMap from "@/features/shelter/ui/ShelterMap";
import ShelterListBox from "@/features/shelter/ui/ShelterListBox";
import { useShelterStore } from "@/app/store/shelterStore";
// import type { ShelterCity } from "@/app/store/shelterStore";
const ShelterIndex = () => {
  const { cities, shelterRequestParams, setShelterRequestParams } =
    useShelterStore();

  const changeCities = (val: string) => {
    setShelterRequestParams({
      ...shelterRequestParams,
      SIGUN_CD: val,
    });
  };
  return (
    <section className="max-w-[1480px] mx-auto">
      {/* 검색조건 영역 */}
      {/* <div className="my-5 flex justify-end md:max-w-[1460px] gap-2">
        <Select options={cities} changeEvt={changeCities} />
      </div> */}
      {/* contents 영역 */}
      <div className="my-5 flex justify-end md:max-w-[1460px] gap-2 min-h-min">
        {/* 카카오지도 */}
        <div className="w-2/4 border rounded-lg p-5 h-96">
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

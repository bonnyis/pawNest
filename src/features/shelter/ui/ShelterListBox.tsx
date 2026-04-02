import { useEffect, useState } from "react";
import ShelterListItem from "../../../entities/shelter/ui/ShelterListItem";
import { useGetShelterList } from "../model/useGetShelterList";
import LoadingSpinner from "@/shared/ui/common/LoadingSpinner";
import NoData from "@/shared/ui/common/NoData";
import type { ShelterItem } from "@/entities/shelter/model/shelter.types";
import { useShelterStore } from "@/app/store/shelterStore";
const ShelterListBox = () => {
  const [pageIndex, updatePageIndex] = useState<number>(1);
  const { setCities, setPositionList } = useShelterStore();
  const { data, isLoading } = useGetShelterList({
    key: import.meta.env.VITE_APP_OPEN_API_KEY,
    pIndex: pageIndex,
    pSize: 100,
    type: "json",
  });
  useEffect(() => {
    if (data?.row) {
      const cityMap = new Map();
      const positionMap = new Map(); // Map을 사용하여 중복 방지 (선택 사항)

      data.row.forEach((item: any) => {
        // 1. 시군 정보 중복 제거 및 추출
        if (!cityMap.has(item.SIGUN_CD)) {
          cityMap.set(item.SIGUN_CD, {
            name: item.SIGUN_NM,
            code: item.SIGUN_CD,
          });
        }

        // 2. 위치 정보 추출 (중복 검사 키를 업체명 ENTRPS_NM으로 변경)
        // 지번 주소나 업체명을 키로 써야 모든 보호소가 다 쌓입니다. (SIGUN_CD를 쓰면 도시당 1개만 나옵니다!)
        if (!positionMap.has(item.ENTRPS_NM)) {
          positionMap.set(item.ENTRPS_NM, {
            title: item.ENTRPS_NM,
            latlng: {
              // 숫자로 변환해야 카카오맵 마커가 인식합니다!
              lat: Number(item.REFINE_WGS84_LAT),
              lng: Number(item.REFINE_WGS84_LOGT),
            },
          });
        }
      });

      const uniqueCities = Array.from(cityMap.values());
      const uniquePositions = Array.from(positionMap.values());

      // 3. Zustand 스토어에 저장!
      setCities(uniqueCities);
      setPositionList(uniquePositions);

      // 디버깅용 로그 (저장 후 값이 있는지 확인)
      console.log("저장된 위치 리스트:", uniquePositions);
    }
    // 의존성 배열에 setPositionList도 추가하는 것이 안전합니다.
  }, [data, setCities, setPositionList]);
  return (
    <div className="flex flex-col gap-3">
      {isLoading ? (
        <LoadingSpinner />
      ) : data?.row && data?.row.length > 0 ? (
        data?.row?.map((item: ShelterItem) => (
          <ShelterListItem key={item.REFINE_LOTNO_ADDR} list={item} />
        ))
      ) : (
        <NoData message="조회되는 결과가 없습니다." />
      )}
    </div>
  );
};

export default ShelterListBox;

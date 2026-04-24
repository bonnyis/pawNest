import { useEffect } from "react";
import ShelterListItem from "../../../entities/shelter/ui/ShelterListItem";
import { useGetShelterList } from "../model/useGetShelterList";
import LoadingSpinner from "@/shared/ui/common/LoadingSpinner";
import NoData from "@/shared/ui/common/NoData";
import type { ShelterItem } from "@/entities/shelter/model/shelter.types";
import { useShelterStore } from "@/app/store/shelterStore";

// TODO: 다섯개씩 끊어서 보여주기! 더보기 버튼 만들기 (페이지네이션)
const ShelterListBox = () => {
  const { setCities, setPositionList, shelterRequestParams } =
    useShelterStore();
  const { data, isLoading } = useGetShelterList({
    ...shelterRequestParams,
    pIndex: 1,
  });

  useEffect(() => {
    if (data?.row) {
      const cityMap = new Map();
      const positionMap = new Map();

      data.row.forEach((item: any) => {
        // 1. 시군 정보 중복 제거 및 추출
        if (!cityMap.has(item.SIGUN_CD)) {
          cityMap.set(item.SIGUN_CD, {
            label: item.SIGUN_NM,
            value: item.SIGUN_CD,
          });
        }

        if (!positionMap.has(item.ENTRPS_NM)) {
          positionMap.set(item.ENTRPS_NM, {
            title: item.ENTRPS_NM,
            latlng: {
              lat: Number(item.REFINE_WGS84_LAT),
              lng: Number(item.REFINE_WGS84_LOGT),
            },
          });
        }
      });

      const uniqueCities = Array.from(cityMap.values());
      const uniquePositions = Array.from(positionMap.values());

      setCities(uniqueCities);
      setPositionList(uniquePositions);
    }
  }, [data, setCities, setPositionList, shelterRequestParams]);
  return (
    <div className="flex flex-col gap-3 ">
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

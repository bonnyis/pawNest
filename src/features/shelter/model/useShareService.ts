import type { ShelterItem } from "@/entities/shelter/model/shelter.types";

export const useShareService = () => {
  // 길찾기 바로가기
  const handleAddress = (list: ShelterItem) => {
    const url = `https://map.kakao.com/link/to/${list.ENTRPS_NM},${list.REFINE_WGS84_LOGT},${list.REFINE_WGS84_LAT}`;

    window.open(url);
  };
  const returnAddress = (list: ShelterItem) => {
    const url = `https://map.kakao.com/link/to/${list.ENTRPS_NM},${list.REFINE_WGS84_LOGT},${list.REFINE_WGS84_LAT}`;
    return url;
  };
  return { handleAddress, returnAddress };
};

import type { ShelterItem } from "@/entities/shelter/model/shelter.types";

export const useShareService = () => {
  // 길찾기 바로가기
  const handleAddress = (list: ShelterItem) => {
    const url = `https://map.kakao.com/link/to/${list.ENTRPS_NM},${list.REFINE_WGS84_LAT},${list.REFINE_WGS84_LOGT}`;
    window.open(url);
  };
  // 지도 바로가기
  const returnAddress = (list: ShelterItem) => {
    const url = `https://map.kakao.com/link/map/${list.ENTRPS_NM},${list.REFINE_WGS84_LAT},${list.REFINE_WGS84_LOGT}`;
    return url;
  };
  return { handleAddress, returnAddress };
};

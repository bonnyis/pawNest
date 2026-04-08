import { useShelterStore } from "@/app/store/shelterStore";
import React, { useEffect, useState } from "react";
import { Map, MapTypeControl, ZoomControl } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  center?: { lat: number; lng: number };
  level?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const KakaoMaps = ({
  level = 3,
  children,
  style = { width: "100%", height: "100%" },
}: KakaoMapProps) => {
  const { centerPosition } = useShelterStore();
  const [myLocation, setMyLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  // 1. 사용자의 현재 위치(Geolocation) 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("위치 정보를 가져오는데 실패했습니다:", error);
          // 실패 시 기본 좌표(예: 서울시청) 설정
          setMyLocation({ lat: 37.5665, lng: 126.978 });
        },
      );
    }
  }, []);

  /**
   * 2. 우선순위 결정
   * - 1순위: 스토어에 저장된 좌표 (리스트 클릭 시 발생)
   * - 2순위: 내 현재 위치 (Geolocation 성공 시)
   * - 3순위: 기본값 (둘 다 없을 때)
   */
  const finalCenter =
    centerPosition.lat !== 0
      ? centerPosition
      : myLocation || { lat: 37.5665, lng: 126.978 };

  return (
    <Map center={finalCenter} level={level} style={style}>
      <MapTypeControl position={"TOPLEFT"} />
      <ZoomControl position={"LEFT"} />
      {children}
    </Map>
  );
};
export default KakaoMaps;

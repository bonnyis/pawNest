import React, { useEffect, useState } from "react";
import { Map } from "react-kakao-maps-sdk";

interface KakaoMapProps {
  center?: { lat: number; lng: number };
  level?: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const KakaoMaps = ({
  center = { lat: 33.450701, lng: 126.570667 },
  level = 3,
  children,
  style = { width: "100%", height: "100%" },
}: KakaoMapProps) => {
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  }>({ lat: center.lat, lng: center.lng }); // 사용자의 현재 위치를 가져오는 함수
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: Number(position.coords.latitude),
            lng: Number(position.coords.longitude),
          });
        },
        (error) => {
          console.error("Error occurred while fetching location:", error);
        },
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <Map center={currentPosition} level={level} style={style}>
      {children}
    </Map>
  );
};

export default KakaoMaps;

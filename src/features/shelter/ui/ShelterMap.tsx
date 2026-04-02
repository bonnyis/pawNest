import { useShelterStore } from "@/app/store/shelterStore";
import KakaoMaps from "@/shared/ui/maps/KakaoMaps";
import { MapMarker } from "react-kakao-maps-sdk";
const ShelterMap = () => {
  const { positionList } = useShelterStore();
  console.log(positionList);
  return (
    <KakaoMaps>
      {positionList?.map((position, index) => (
        <MapMarker
          key={`${position.title}-${position.latlng}`}
          position={position.latlng} // 마커를 표시할 위치
          image={{
            src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
            size: {
              width: 24,
              height: 35,
            }, // 마커이미지의 크기입니다
          }}
          title={position.title}
        />
      ))}
    </KakaoMaps>
  );
};

export default ShelterMap;

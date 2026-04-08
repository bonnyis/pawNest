import { useShelterStore } from "@/app/store/shelterStore";
import KakaoMaps from "@/shared/ui/maps/KakaoMaps";
import EventMarkerContainer from "@/shared/ui/maps/EventMarkerContainer";
const ShelterMap = () => {
  const { positionList } = useShelterStore();

  return (
    <KakaoMaps>
      {positionList?.map((position, index) => (
        <EventMarkerContainer
          position={position.latlng}
          key={`EventMarkerContainer-${position.latlng.lat}-${position.latlng.lng}`}
          content={position.title}
        />
      ))}
    </KakaoMaps>
  );
};

export default ShelterMap;

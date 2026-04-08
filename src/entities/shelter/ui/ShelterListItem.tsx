import { useShelterStore } from "@/app/store/shelterStore";
import type { ShelterItem } from "../model/shelter.types";

interface ShelterProps {
  list: ShelterItem;
}

// 근처 보호소 리스트 Item
const ShelterListItem = ({ list }: ShelterProps) => {
  const { setCenterPosition } = useShelterStore();

  const changeCenterPosition = (position: { lat: number; lng: number }) => {
    if (window.scrollY >= 150) {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }

    setCenterPosition(position);
  };
  return (
    <div
      className={`border rounded-md py-4 pr-4 pl-6 border-grayColor hover:bg-gray-100 cursor-pointer `}
      onClick={() =>
        changeCenterPosition({
          lat: Number(list.REFINE_WGS84_LAT),
          lng: Number(list.REFINE_WGS84_LOGT),
        })
      }
    >
      <p className="text-xl font-semibold">{list.ENTRPS_NM}</p>
      <p className="text-base mt-2">{list.REFINE_ROADNM_ADDR}</p>
    </div>
  );
};

export default ShelterListItem;

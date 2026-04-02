import type { ShelterItem } from "../model/shelter.types";

interface ShelterProps {
  list: ShelterItem;
}

// 근처 보호소 리스트 Item
const ShelterListItem = ({ list }: ShelterProps) => {
  return (
    <div className="border rounded-md py-4 pr-4 pl-6 border-grayColor hover:bg-gray-100">
      <p className="text-xl font-semibold">{list.ENTRPS_NM}</p>
      <p className="text-base mt-2">{list.REFINE_ROADNM_ADDR}</p>
    </div>
  );
};

export default ShelterListItem;

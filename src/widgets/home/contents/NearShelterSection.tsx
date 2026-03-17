import {} from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/routes/routes";
import ShelterListBox from "@/entities/shelter/ui/ShelterListBox";
const NearShelterSection = () => {
  const navigation = useNavigate();
  return (
    <div className="lg:w-2/5 p-5 border rounded-2xl">
      <div className="flex justify-between mb-3">
        <h2 className="text-2xl font-bold">근처 보호소 위치</h2>
        <button
          type="button"
          className="text-2xl font-bold"
          onClick={() => navigation(ROUTES.SHELTER)}
        >
          +
        </button>
      </div>
      {/* 메인은 세개까지만 나올 수 있도록 설정할 것  */}
      <ShelterListBox />
    </div>
  );
};

export default NearShelterSection;

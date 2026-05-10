import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/routes/routes";
import NoData from "@/shared/ui/common/NoData";
import { useGetShelterList } from "@/features/shelter/model/useGetShelterList";
import ShelterListItem from "@/entities/shelter/ui/ShelterListItem";
import { useEffect } from "react";

const NearShelterSection = () => {
  const navigation = useNavigate();
  const { data } = useGetShelterList({
    key: import.meta.env.VITE_APP_OPEN_API_KEY,
    pIndex: 1,
    pSize: 3,
    type: "json",
  });
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_APP_KAKAO_KEY);
    }
  }, []);
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
      <div className="flex flex-col gap-3">
        {data?.row && data?.row?.length > 0 ? (
          data?.row?.map((item) => (
            <ShelterListItem
              key={item.ENTRPS_TELNO}
              list={item}
              type={"main"}
            />
          ))
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
};

export default NearShelterSection;

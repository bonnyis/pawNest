import { useShelterStore } from "@/app/store/shelterStore";
import type { ShelterItem } from "../model/shelter.types";
import { useState } from "react";
import { useShareService } from "@/features/shelter/model/useShareService";
import { handleShare } from "@/features/share-post/model/webShare";
interface ShelterProps {
  list: ShelterItem;
  type?: "main" | "detail";
}
// 근처 보호소 리스트 Item
const ShelterListItem = ({ list, type = "detail" }: ShelterProps) => {
  const { setCenterPosition } = useShelterStore();
  const { handleAddress, returnAddress } = useShareService();
  const [more, setMore] = useState<boolean>(false);

  const changeCenterPosition = (position: { lat: number; lng: number }) => {
    if (window.scrollY >= 150) {
      window.scroll({ top: 0, left: 0, behavior: "smooth" });
    }

    setCenterPosition(position);
  };
  return (
    <div
      className={`border rounded-md py-4 pr-4 pl-6 border-grayColor hover:bg-gray-100 ${type === "detail" ? "cursor-pointer" : ""}`}
      onClick={() => {
        if (type === "detail") {
          changeCenterPosition({
            lat: Number(list.REFINE_WGS84_LAT),
            lng: Number(list.REFINE_WGS84_LOGT),
          });
        }
      }}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-xl font-semibold">{list.ENTRPS_NM}</p>
          <p className="text-base mt-2">{list.REFINE_ROADNM_ADDR}</p>
        </div>

        <div className="relative">
          <button
            className="ml-4 p-2 text-gray-300 hover:text-black rounded-full transition-all"
            onClick={(e) => {
              e.stopPropagation();
              setMore(!more);
            }}
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>

          {more && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setMore(false)}
              />

              <div className="absolute top-[40px] right-[10px] z-20">
                <div className="flex flex-col border border-gray-200 w-24 rounded-md shadow-lg bg-white">
                  <div className="p-3 border-b">
                    <button
                      type="button"
                      onClick={() => {
                        handleAddress(list);
                      }}
                    >
                      길찾기
                    </button>
                  </div>
                  <div className="p-3 border-b">
                    <button
                      type="button"
                      onClick={() =>
                        handleShare({
                          title: list.ENTRPS_NM,
                          text: list.REFINE_ROADNM_ADDR,
                          url: returnAddress(list),
                        })
                      }
                    >
                      공유하기
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShelterListItem;

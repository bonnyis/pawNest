import { useEffect, useState, useRef } from "react";
import ShelterListItem from "../../../entities/shelter/ui/ShelterListItem";
import { useGetShelterList } from "../model/useGetShelterList";
import LoadingSpinner from "@/shared/ui/common/LoadingSpinner";
import NoData from "@/shared/ui/common/NoData";
import type { ShelterItem } from "@/entities/shelter/model/shelter.types";
import { useShelterStore } from "@/app/store/shelterStore";

interface ShelterListBoxProps {
  scrollRef: HTMLDivElement | null;
}
const ShelterListBox = ({ scrollRef }: ShelterListBoxProps) => {
  const [pIndex, setPIndex] = useState(1);
  const [shelterList, setShelterList] = useState<ShelterItem[]>([]);
  const observerRef = useRef<HTMLDivElement>(null);
  const { setCities, setPositionList, shelterRequestParams } =
    useShelterStore();
  const { data, isLoading } = useGetShelterList({
    ...shelterRequestParams,
    pIndex,
  });
  useEffect(() => {
    if (!scrollRef || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // observer
        if (entry.isIntersecting && !isLoading) {
          setPIndex((prev) => prev + 1);
        }
      },
      {
        root: scrollRef,
        threshold: 0.5,
      },
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [scrollRef, isLoading]);

  useEffect(() => {
    if (data?.row) {
      setShelterList((prev) => [...prev, ...data.row]);
    }
  }, [data]);
  useEffect(() => {
    if (data?.row) {
      const cityMap = new Map();
      const positionMap = new Map();

      data.row.forEach((item: any) => {
        // 1. 시군 정보 중복 제거 및 추출
        if (!cityMap.has(item.SIGUN_CD)) {
          cityMap.set(item.SIGUN_CD, {
            label: item.SIGUN_NM,
            value: item.SIGUN_CD,
          });
        }

        if (!positionMap.has(item.ENTRPS_NM)) {
          positionMap.set(item.ENTRPS_NM, {
            title: item.ENTRPS_NM,
            latlng: {
              lat: Number(item.REFINE_WGS84_LAT),
              lng: Number(item.REFINE_WGS84_LOGT),
            },
          });
        }
      });

      const uniqueCities = Array.from(cityMap.values());
      const uniquePositions = Array.from(positionMap.values());

      setCities(uniqueCities);
      setPositionList(uniquePositions);
    }
  }, [data, setCities, setPositionList, shelterRequestParams]);

  return (
    <div className="flex flex-col gap-3">
      {isLoading ? (
        <LoadingSpinner />
      ) : shelterList && shelterList.length > 0 ? (
        shelterList.map((item: ShelterItem) => (
          <ShelterListItem key={item.REFINE_LOTNO_ADDR} list={item} />
        ))
      ) : (
        <NoData message="조회되는 결과가 없습니다." />
      )}
      <div ref={observerRef} className="h-10" />
    </div>
  );
};

export default ShelterListBox;

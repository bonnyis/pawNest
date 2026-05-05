import { onImgError } from "@/shared/lib/onError";
import { BoardItem } from "../model/missing-api-type";
import noImg from "@img/Image.png";
import { useEffect } from "react";
// 개별메뉴 실종동물 카드리스트 UI
interface Props {
  data: BoardItem;
  onClick: () => void;
}
const MissingCardItem = ({ data, onClick }: Props) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const img = entry.target as HTMLImageElement;
      console.log("img", img);
    });
  });
  useEffect(() => {
    const images = document.querySelectorAll("img");
    images.forEach((img) => observer.observe(img));
  }, []);

  return (
    <div
      className="w-[95%] md:w-60 border border-gray-300 rounded-md p-5 h-80 cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-4 h-44 overflow-hidden">
        {data.images?.map((item) => (
          <img
            key={item.imgPath}
            src={`https://unbribably-unhilly-danyell.ngrok-free.dev${item.imgPath}`}
            onError={(e) => onImgError(e)}
            title={`${data.title} 대표이미지`}
            className="object-cover"
          />
        ))}
        {data.images?.length === 0 && (
          <img
            src={noImg}
            id="img"
            title={`${data.title} 대표이미지`}
            loading="lazy"
          />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold line-clamp-1">{data.title}</h3>
        <p>{data.writerId}</p>
        <p>{data.missingDate}</p>
      </div>
    </div>
  );
};

export default MissingCardItem;

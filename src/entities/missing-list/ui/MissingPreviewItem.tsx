import {} from "react";
import noImg from "@img/no_img.png";
import type { PreviewItem } from "../model/missing-api-type";
import type { CommonImage } from "@/shared/types/api";

interface Props {
  list: PreviewItem;
  onClick?: () => void;
}

const MissingPreviewItem = ({ list, onClick }: Props) => {
  return (
    <div className="w-full flex-shrink-0">
      <div className="flex justify-between cursor-pointer" onClick={onClick}>
        <div className="w-32 md:w-48 h-32 md:h-48 flex-shrink-0 overflow-hidden">
          {list?.images.length > 0 ? (
            list?.images.map((image: CommonImage) => (
              <img
                key={image.originalFileName}
                src={`https://unbribably-unhilly-danyell.ngrok-free.dev${image.imgPath}`}
                loading="lazy"
                alt={`${list.title} 대표이미지`}
                onError={(e) => {
                  e.currentTarget.src = noImg;
                }}
                className="object-fit"
              />
            ))
          ) : (
            <img src={noImg} alt="대표이미지 없음" />
          )}
        </div>
        <div className="w-3/4 ml-3 p-2">
          <h4 className="font-semibold text-lg mb-2">{list?.title}</h4>
          <p className="">
            <span>성별 : </span>
            {list?.gender}
          </p>
          <p className="">
            <span>실종날짜 : </span>
            {list?.missingDate}
          </p>
          <p className="">
            <span>실종장소 : </span>
            {list?.missingLocation}
          </p>
          <p className="line-clamp-4">
            <span>성격 : </span>
            {list?.features}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissingPreviewItem;

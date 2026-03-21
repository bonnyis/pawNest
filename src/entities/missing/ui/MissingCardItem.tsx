import { BoardItem } from "@/features/missing-list/model/missing-api-type";
import { onImgError } from "@/shared/lib/onError";
import noImg from "@img/Image.png";
// 개별메뉴 실종동물 카드리스트 UI
interface Props {
  data: BoardItem;
  updateFlag: (val: boolean) => void;
}
const MissingCardItem = ({ data, updateFlag }: Props) => {
  return (
    <div
      className="w-60 border border-gray-300 rounded-md p-5 h-80 cursor-pointer"
      onClick={() => updateFlag(true)}
    >
      <div className="mb-4">
        {data.images?.map((item) => (
          <img
            key={item.imgPath}
            src={`https://unbribably-unhilly-danyell.ngrok-free.dev${item.originalFileName}`}
            onError={(e) => onImgError(e)}
            title={`${data.title} 대표이미지`}
          />
        ))}
        {data.images?.length === 0 && (
          <img src={noImg} title={`${data.title} 대표이미지`} />
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

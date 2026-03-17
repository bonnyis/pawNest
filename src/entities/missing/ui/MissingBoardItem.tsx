import {} from "react";
import noImg from "@img/no_img.png";

// 메인 실종동물 리스트형식 UI
const MissingBoardItem = () => {
  return (
    <div className="w-full flex-shrink-0">
      <div className="flex justify-between">
        <div className="img-box">
          <img src={noImg} alt="대표이미지 없음" />
        </div>
        <div className="w-3/4 ml-3 p-2 text-lg">
          <h4 className="font-semibold">[믹스견] 2살 갈색</h4>
          <p className="line-clamp-4">
            얼굴에 흰색과 갈색이 섞여있어요! 00동 근처에서 마지막으로 목격신고
            있었습니다. 그 이후에 보신 분 있으시면 연락 부탁드립니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MissingBoardItem;

import noImg from "@img/Image.png";

// 개별메뉴 실종동물 카드리스트 UI
const MissingCardItem = ({ ...props }) => {
  return (
    <div
      className="w-60 border border-gray-300 rounded-md p-5 h-80 cursor-pointer"
      {...props}
    >
      <div className="mb-4">
        <img src={noImg} alt="대표 이미지 없음" className="" />
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold line-clamp-2">
          [골든리트리버] 6세 남자
        </h3>
        <p>테스트아이디</p>
        <p>2026.01.22</p>
      </div>
    </div>
  );
};

export default MissingCardItem;

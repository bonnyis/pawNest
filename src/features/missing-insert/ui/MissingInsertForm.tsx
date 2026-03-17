import {} from "react";
import Button from "@/shared/ui/common/Button";
import help_icon from "@img/icons/help.png";
import help_fill_icon from "@img/icons/help_fill.png";
// import attach from "@img/icons/attachFile.png";
import { useBreedFinderStore } from "@/app/store/breedFinderStore";
const MissingInsertForm = () => {
  const { modalFlag, updateModalFlag } = useBreedFinderStore();

  const labelWrapperStyle =
    "w-[100px] md:w-[180px] bg-slate-100 flex items-center justify-center border-r border-gray-200 shrink-0";
  const labelTextStyle =
    "text-[12px] md:text-sm font-semibold text-gray-700 break-keep text-center";
  const settingModal = (val: boolean) => {
    updateModalFlag(val);
  };
  return (
    <form className="max-w-[1480px] mx-auto border-t-2 border-slate-400">
      {/* 1. 실종일자 & 실종장소 (데스크톱에서만 2열, 모바일은 각각 한 줄씩) */}
      <div className="flex flex-col lg:flex-row border-b border-gray-200">
        <div className="flex flex-1 border-b lg:border-b-0 lg:border-r border-gray-200 items-stretch">
          <div className={labelWrapperStyle}>
            <label className={labelTextStyle}>
              <span className="text-red-500 mr-1">*</span>실종일자
            </label>
          </div>
          <div className="flex-1 p-2 md:p-4 flex items-center">
            <input
              type="datetime-local"
              className="w-full border rounded-md p-2 text-sm md:text-base outline-none focus:border-primary"
            />
          </div>
        </div>
        <div className="flex flex-1 items-stretch">
          <div className={labelWrapperStyle}>
            <label className={labelTextStyle}>
              <span className="text-red-500 mr-1">*</span>실종장소
            </label>
          </div>
          <div className="flex-1 p-2 md:p-4">
            <textarea
              className="w-full border rounded-md p-2 text-sm md:text-base min-h-[60px] md:min-h-[80px] resize-none outline-none focus:border-primary"
              placeholder="텍스트를 입력해 주세요."
            />
          </div>
        </div>
      </div>

      {/* 2. 품종 */}
      <div className="flex border-b border-gray-200 items-stretch">
        <div className={labelWrapperStyle}>
          <label className={labelTextStyle}>
            <span className="text-red-500 mr-1">*</span>품종
          </label>
        </div>
        <div className="flex-1 p-2 md:p-4 flex flex-wrap items-center gap-2">
          <select className="border rounded-md p-1 md:p-2 w-[48%] md:w-[150px] h-[36px] md:h-[40px] text-sm">
            <option>개</option>
          </select>
          <select className="border rounded-md p-1 md:p-2 w-[48%] md:w-[150px] h-[36px] md:h-[40px] text-sm">
            <option>골든리트리버</option>
          </select>
          <input
            type="text"
            className="w-full md:flex-1 border rounded-md p-2 bg-gray-100 h-[36px] md:h-[40px] text-sm"
            placeholder="기타 시 입력"
          />
          {/*  */}
          {/* 툴팁을 포함한 아이콘 영역 */}

          <button
            className="group relative w-6 h-6 ml-1 cursor-pointer flex items-center justify-center"
            type="button"
            onClick={() => {
              console.log(modalFlag);
              settingModal(true);
            }}
          >
            {/* 1. 기본 아이콘 (hover 시 사라짐) */}

            <img
              src={help_icon}
              alt="정보 아이콘"
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 group-hover:opacity-0"
            />

            {/* 2. Hover 아이콘 (hover 시 나타남) */}
            <img
              src={help_fill_icon}
              alt="정보 아이콘 호버"
              className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
            />

            {/* 3. 말풍선 (Tooltip) */}
            <div
              className={`absolute bottom-full mb-2 left-1/2 -translate-x-3/4 w-[220px] p-2 bg-gray-800 text-white text-base md:text-sm rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10 text-center`}
            >
              {/* 말풍선 멘트 */}
              사진을 업로드하면 AI가 반려동물의 품종을 추정해 드려요.
            </div>
          </button>
        </div>
      </div>

      {/* 3. 색상 */}
      <div className="flex border-b border-gray-200 items-stretch">
        <div className={labelWrapperStyle}>
          <label className={labelTextStyle}>
            <span className="text-red-500 mr-1">*</span>색상
          </label>
        </div>
        <div className="flex-1 p-2 md:p-4 flex flex-col md:flex-row items-start md:items-center gap-2">
          <select className="border rounded-md p-1 md:p-2 w-full md:w-[200px] h-[36px] md:h-[40px] text-sm">
            <option>검은색</option>
          </select>
          <input
            type="text"
            className="w-full md:max-w-[400px] border rounded-md p-2 bg-gray-100 h-[36px] md:h-[40px] text-sm"
            placeholder="기타 색상 입력"
          />
        </div>
      </div>

      {/* 4. 성별 & 나이 (데스크톱 2열, 모바일 1열) */}
      <div className="flex flex-col lg:flex-row border-b border-gray-200">
        <div className="flex flex-1 border-b lg:border-b-0 lg:border-r border-gray-200 items-stretch">
          <div className={labelWrapperStyle}>
            <label className={labelTextStyle}>
              <span className="text-red-500 mr-1">*</span>성별
            </label>
          </div>
          <div className="flex-1 p-2 md:p-4 flex items-center gap-4 md:gap-6 min-h-[50px] text-sm md:text-base">
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" defaultChecked /> 남자
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" /> 여자
            </label>
          </div>
        </div>
        <div className="flex flex-1 items-stretch">
          <div className={labelWrapperStyle}>
            <label className={labelTextStyle}>
              <span className="text-red-500 mr-1">*</span>나이
            </label>
          </div>
          <div className="flex-1 p-2 md:p-4 flex items-center">
            <input
              type="text"
              className="w-full border rounded-md p-2 outline-none h-[36px] md:h-[40px] text-sm"
              placeholder="나이 입력"
            />
          </div>
        </div>
      </div>

      {/* 5. 특징 */}
      <div className="flex border-b border-gray-200 items-stretch">
        <div className={labelWrapperStyle + " min-h-[120px] md:min-h-[180px]"}>
          <label className={labelTextStyle}>특징</label>
        </div>
        <div className="flex-1 p-2 md:p-4">
          <textarea
            className="w-full h-[120px] md:h-[150px] border rounded-md p-2 text-sm md:text-base resize-none outline-none"
            placeholder="내용을 입력해 주세요."
          />
        </div>
      </div>

      {/* 6. 사진첨부 */}
      <div className="flex border-b border-gray-200 items-stretch">
        <div className={labelWrapperStyle}>
          <label className={labelTextStyle}>대표사진 첨부</label>
        </div>
        <div className="flex-1 p-2 md:p-4">
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="file"
              onChange={(f) => {
                console.log(f);
              }}
            />
            {/* <div className="flex items-center gap-2 text-[12px] md:text-sm text-gray-600 bg-gray-50 px-2 py-1 border rounded">
              <span>
                <span className="none md:block">
                  <img
                    src={attach}
                    alt="첨부파일 아이콘"
                    className="w-[15px]"
                  />
                </span>
                test.png
              </span>
              <button type="button" className="text-gray-400">
                ✕
              </button>
            </div> */}
          </div>
          <p className="text-[10px] md:text-sm text-blue-500 mt-2">
            * 게시글의 대표사진으로 등록됩니다.
          </p>
        </div>
      </div>

      {/* 버튼 섹션 */}
      <div className="flex justify-center gap-2 md:gap-3 mt-10 mb-20 px-4">
        <Button
          variant="cancel"
          size="md"
          className="flex-1 md:flex-none md:w-[120px]"
        >
          취소
        </Button>
        <Button
          variant="primary"
          size="md"
          type="submit"
          className="flex-1 md:flex-none md:w-[120px]"
        >
          등록하기
        </Button>
      </div>
    </form>
  );
};

export default MissingInsertForm;

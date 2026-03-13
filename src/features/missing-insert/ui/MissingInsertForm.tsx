import React from "react";
import Button from "@/shared/ui/common/Button";

const MissingInsertForm = () => {
  return (
    <form className="max-w-[1480px] mx-auto border-t-2 border-slate-400 px-4 md:px-0">
      {/* 실종일자 & 실종장소 (md 이상에서 2열 배치) */}
      <div className="flex flex-col md:flex-row border-b border-gray-200">
        {/* 실종일자 */}
        <div className="flex flex-col md:flex-row flex-1 border-b md:border-b-0 md:border-r border-gray-200">
          <div className="w-full md:w-[180px] bg-slate-100 p-3 md:p-4 flex items-center md:justify-center">
            <label className="text-base font-medium">
              <span className="text-red-500 mr-1">*</span>실종일자
            </label>
          </div>
          <div className="flex-1 p-3 md:p-4">
            <input
              type="datetime-local"
              className="w-full border rounded-md p-2 outline-none focus:border-primary"
            />
          </div>
        </div>
        {/* 실종장소 */}
        <div className="flex flex-col md:flex-row flex-1">
          <div className="w-full md:w-[180px] bg-slate-100 p-3 md:p-4 flex items-center md:justify-center">
            <label className="text-base font-medium">
              <span className="text-red-500 mr-1">*</span>실종장소
            </label>
          </div>
          <div className="flex-1 p-3 md:p-4">
            <textarea
              className="w-full border rounded-md p-2 h-[80px] md:h-full min-h-[80px] resize-none outline-none focus:border-primary"
              placeholder="텍스트를 입력해 주세요."
            />
          </div>
        </div>
      </div>

      {/* 품종 */}
      <div className="flex flex-col md:flex-row border-b border-gray-200">
        <div className="w-full md:w-[180px] bg-slate-100 p-3 md:p-4 flex items-center md:justify-center">
          <label className="text-base font-medium">
            <span className="text-red-500 mr-1">*</span>품종
          </label>
        </div>
        <div className="flex-1 p-3 md:p-4 flex flex-wrap items-center gap-2 md:gap-3">
          <select className="border rounded-md p-2 w-[48%] md:w-[150px]">
            <option>개</option>
          </select>
          <select className="border rounded-md p-2 w-[48%] md:w-[150px]">
            <option>골든리트리버</option>
          </select>
          <input
            type="text"
            disabled
            className="w-full md:flex-1 border rounded-md p-2 bg-gray-100 mt-1 md:mt-0"
            placeholder="품종 기타 시 입력 가능합니다."
          />
        </div>
      </div>

      {/* 색상 */}
      <div className="flex flex-col md:flex-row border-b border-gray-200">
        <div className="w-full md:w-[180px] bg-slate-100 p-3 md:p-4 flex items-center md:justify-center">
          <label className="text-base font-medium">
            <span className="text-red-500 mr-1">*</span>색상
          </label>
        </div>
        <div className="flex-1 p-3 md:p-4 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3">
          <select className="border rounded-md p-2 w-full md:w-[200px]">
            <option>검은색</option>
          </select>
          <input
            type="text"
            className="w-full md:max-w-[400px] border rounded-md p-2 bg-gray-100"
            placeholder="색상 기타 시 입력 가능합니다."
          />
        </div>
      </div>

      {/* 성별 & 나이 */}
      <div className="flex flex-col md:flex-row border-b border-gray-200">
        <div className="flex flex-col md:flex-row flex-1 border-b md:border-b-0 md:border-r border-gray-200">
          <div className="w-full md:w-[180px] bg-slate-100 p-3 md:p-4 flex items-center md:justify-center">
            <label className="text-base font-medium">
              <span className="text-red-500 mr-1">*</span>성별
            </label>
          </div>
          <div className="flex-1 p-3 md:p-4 flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" defaultChecked /> 남자
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" /> 여자
            </label>
          </div>
        </div>
        <div className="flex flex-col md:flex-row flex-1">
          <div className="w-full md:w-[180px] bg-slate-100 p-3 md:p-4 flex items-center md:justify-center">
            <label className="text-base font-medium">
              <span className="text-red-500 mr-1">*</span>나이
            </label>
          </div>
          <div className="flex-1 p-3 md:p-4">
            <input
              type="text"
              className="w-full border rounded-md p-2 outline-none"
              placeholder="텍스트를 입력해 주세요."
            />
          </div>
        </div>
      </div>

      {/* 특징 */}
      <div className="flex flex-col md:flex-row border-b border-gray-200 md:h-[200px]">
        <div className="w-full md:w-[180px] bg-slate-100 p-3 md:p-4 flex items-center md:justify-center">
          <label className="text-base font-medium">특징</label>
        </div>
        <div className="flex-1 p-3 md:p-4">
          <textarea
            className="w-full h-[150px] md:h-full border rounded-md p-2 resize-none outline-none"
            placeholder="내용을 입력해 주세요."
          />
        </div>
      </div>

      {/* 사진첨부 */}
      <div className="flex flex-col md:flex-row border-b border-gray-200">
        <div className="w-full md:w-[180px] bg-slate-100 p-3 md:p-4 flex items-center md:justify-center">
          <label className="text-base font-medium">사진첨부</label>
        </div>
        <div className="flex-1 p-3 md:p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-2 py-1 rounded">
              <span>📎 test.png</span>
              <button type="button" className="text-gray-400">
                X
              </button>
            </div>
            <button
              type="button"
              className="bg-gray-200 px-4 py-2 rounded text-sm hover:bg-gray-300 transition-colors"
            >
              파일 선택
            </button>
          </div>
          <p className="text-xs md:text-sm text-blue-500 mt-2">
            * 게시글의 대표사진으로 등록되는 사진입니다.
          </p>
        </div>
      </div>

      {/* 버튼 섹션 */}
      <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-3 mt-8 mb-16">
        <Button
          variant="cancel"
          size="lg"
          className="w-full md:w-auto order-2 md:order-1"
        >
          취소
        </Button>
        <Button
          variant="primary"
          size="lg"
          type="submit"
          className="w-full md:w-auto order-1 md:order-2"
        >
          등록하기
        </Button>
      </div>
    </form>
  );
};

export default MissingInsertForm;

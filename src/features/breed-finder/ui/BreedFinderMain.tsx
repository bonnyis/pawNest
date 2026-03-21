import React, { useState } from "react";
import type { BreedFinderMainProps } from "../model/breed-finder.type";
import Button from "@/shared/ui/common/Button";
import { useBreedFinderStore } from "@/app/store/breedFinderStore";

const BreedFinderMain = ({
  contentsType,
  updateContentsType,
}: BreedFinderMainProps) => {
  const { updateBreedFinderImg } = useBreedFinderStore();
  const [selectImage, setSelectImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      updateBreedFinderImg(url);
    }
  };
  return (
    <div className={`${contentsType} p-6 md:p-8 flex flex-col gap-8`}>
      {/* 제목 섹션 */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold inline-block">AI 품종 찾기 서비스</h1>
        <p className="w-full border-b-4 border-black"></p>
        <h3 className="text-xl font-semibold text-gray-800">
          AI로 실종동물 품종을 추정해보세요.
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 font-medium">
          <li>사진 한 장으로 분석 가능</li>
          <li>실종 동물 등록에 바로 활용 가능</li>
        </ul>
      </div>

      {/* 하단 인터랙션 영역 */}
      <div className="flex flex-col md:flex-row justify-stretch items-center gap-6">
        {/* 좌측: 안내 박스 */}
        <div className="w-full md:w-1/2 h-[280px] rounded-2xl bg-gray-100 p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="md:text-lg">📌</span>
            <h4 className="md:text-lg font-bold">이런 사진이 좋아요!</h4>
          </div>
          <ul className="space-y-3 text-lg font-medium text-gray-600">
            <li className="flex items-start gap-2">
              <span className="mt-2.5 w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0" />
              조명이 밝은 사진
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2.5 w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0" />
              한 마리만 나온 사진
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2.5 w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0" />
              동물의 얼굴이 잘 보이는 정면 사진
            </li>
          </ul>
        </div>

        {/* 우측: 업로드 박스 */}
        <div className="w-full md:w-1/2 h-[280px] border-4 rounded-2xl border-dotted border-gray-300 flex flex-col items-center justify-center gap-6 bg-white hover:bg-gray-50 transition-colors cursor-pointer">
          {selectImage !== null ? (
            <img
              src={previewUrl ?? previewUrl}
              alt="미리보기"
              className="w-full h-full object-contain mb-2 rounded-lg"
            />
          ) : (
            <p className="text-xl font-bold text-gray-400">
              사진을 업로드하세요.
            </p>
          )}

          <input
            type="file"
            id="breedFinderImage"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              onFileChange(e);
            }}
          />

          {/* input을 트리거하는 라벨 (버튼처럼 디자인) */}

          <label
            htmlFor="breedFinderImage"
            tabIndex={0}
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === "Enter") {
                e.preventDefault();
                document.getElementById("breedFinderImage")?.click();
              }
            }}
            className="px-8 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold rounded-full transition-all cursor-pointer"
          >
            파일 선택
          </label>
        </div>
      </div>
      <Button
        size="lg"
        className="bg-blue-200 font-semibold"
        onClick={() => {
          updateContentsType("result");
        }}
      >
        AI 품종 찾기
      </Button>
    </div>
  );
};

export default BreedFinderMain;

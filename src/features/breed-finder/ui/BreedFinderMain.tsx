import { useState, useEffect } from "react";
import type { BreedFinderMainProps } from "../../../entities/breed-finder/model/breed-finder.type";
import Button from "@/shared/ui/common/Button";
import { useBreedFinderStore } from "@/app/store/breedFinderStore";
import ImageInput from "@/shared/ui/common/ImageInput";
import { useBreedFinder } from "../model/useBreedFinder";

// TODO: AI 품종찾기 API 연동작업!!, 결과 페이지로 이동하는 형태로 변경 필요

const BreedFinderMain = ({
  contentsType,
  updateContentsType,
}: BreedFinderMainProps) => {
  const { updateBreedFinderImg, breedFinderImg } = useBreedFinderStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { mutate, isPending, isSuccess } = useBreedFinder();
  const onFileChange = (file: File | File[] | null) => {
    // AI 품종찾기는 한 장의 사진만 업로드 가능!
    if (!file) return;
    // 👉 기존 URL 정리
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const singleFile = Array.isArray(file) ? file[0] : file;
    setImageFile(singleFile);
    updateBreedFinderImg(singleFile);
    const url = URL.createObjectURL(singleFile);
    setPreviewUrl(url); 
  };

  const handleBreedFinder = () => {
    if (!imageFile) return;
    mutate(imageFile);
    updateContentsType("result");
    if (isSuccess) {
      updateContentsType("result");
    }
  };
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);
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
          {previewUrl !== null ? (
            <img
              src={previewUrl}
              alt="미리보기"
              className="w-full overflow-hidden object-cover mb-2 rounded-lg"
            />
          ) : (
            <p className="text-xl font-bold text-gray-400">
              사진을 업로드하세요.
            </p>
          )}

          <ImageInput onFileChange={onFileChange} id="breedFinderImage" />
        </div>
      </div>
      <Button
        size="lg"
        className="bg-blue-200 font-semibold"
        onClick={() => {
          handleBreedFinder();
        }}
        disabled={isPending}
      >
        AI 품종 찾기
      </Button>
    </div>
  );
};

export default BreedFinderMain;

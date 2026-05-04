import { useEffect, useState } from "react";
import type { BreedFinderMainProps } from "../../../entities/breed-finder/model/breed-finder.type";
import { useBreedFinderStore } from "@/app/store/breedFinderStore";
import BreedFinderGraph from "../../../entities/breed-finder/ui/BreedFinderGraph";
import Button from "@/shared/ui/common/Button";
// BreedFinderResult.tsx
const BreedFinderResult = ({ updateContentsType }: BreedFinderMainProps) => {
  const {
    breedFinderImg,

    breedFinderResult,
    updateBreedFinderResult,
  } = useBreedFinderStore();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (breedFinderImg) {
      const url = URL.createObjectURL(breedFinderImg);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [breedFinderImg]);

  return (
    <div className="p-6 md:p-10 flex flex-col gap-8 bg-white rounded-3xl">
      {/* 헤더 섹션 */}
      <div className="space-y-4">
        <h1 className="font-bold text-3xl md:text-4xl text-gray-900">
          AI 품종 찾기 서비스
        </h1>
        <div className="w-full h-[3px] bg-gray-900" />
        <h3 className="text-lg font-medium text-gray-600">
          AI가 분석한 결과입니다.
        </h3>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* 좌측: 업로드 이미지 */}
        <div className="w-full lg:w-1/2 flex flex-col gap-3">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
            <img
              src={previewUrl || "/default-dog.jpg"}
              alt="분석 대상"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-gray-400 flex items-start gap-1">
            <span className="mt-0.5">⚠️</span>
            <span>
              AI 분석은 참고용이며, 사진 상태에 따라 결과가 다를 수 있습니다.
            </span>
          </p>
        </div>

        {/* 우측: 결과 분석 */}
        {breedFinderResult?.length > 0 ? (
          <div className="w-full lg:w-1/2 space-y-8">
            <section>
              <h4 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">
                가장 유력한 품종
              </h4>

              <div className="flex items-center gap-6">
                <BreedFinderGraph
                  chartData={breedFinderResult}
                  width={200}
                  height={200}
                />
              </div>
              <ul className="divide-y border-t border-b mt-2">
                {breedFinderResult?.length > 0 &&
                  breedFinderResult.map((item) => (
                    <li
                      key={item.title}
                      className="py-2 flex justify-between text-gray-600"
                    >
                      <span>• {item.title}</span>
                      <span className="font-semibold">{item.value}%</span>
                    </li>
                  ))}
              </ul>
            </section>
          </div>
        ) : (
          <div className="w-full lg:w-1/2 flex justify-center items-center min-h-[280px]">
            <p className="text-gray-500 text-center font-semibold">
              분석 결과가 없습니다.
            </p>
          </div>
        )}
      </div>
      {/* 버튼 영역 */}
      <div className="flex flex-col justify-center sm:flex-row gap-3 pt-4">
        {
          // <Button variant="confirm" size="md">
          //   이 정보로 실종동물 등록하기
          // </Button>
        }

        <Button
          variant="cancel"
          size="md"
          onClick={() => {
            updateBreedFinderResult([]);
            setPreviewUrl(null);
            updateContentsType("main");
          }}
        >
          재검색하기
        </Button>
      </div>
    </div>
  );
};

export default BreedFinderResult;

import {} from "react";
import type { BreedFinderMainProps } from "../types";
import { useBreedFinderStore } from "@/app/store/breedFinderStore";
import BreedFinderGraph from "./BreedFinderGraph";
import Button from "@/shared/ui/common/Button";
// BreedFinderResult.tsx
const BreedFinderResult = ({}: BreedFinderMainProps) => {
  const { breedFinderImg } = useBreedFinderStore();

  // 가공된 데이터 (실제로는 스토어나 서버에서 오겠죠?)
  const chartData = [
    { title: "진돗개", value: 72 },
    { title: "말티즈", value: 18 },
    { title: "푸들", value: 10 },
  ];

  const mainBreed = chartData[0]; // 가장 확률 높은 품종

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
              src={breedFinderImg || "/default-dog.jpg"}
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
        <div className="w-full lg:w-1/2 space-y-8">
          <section>
            <h4 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">
              가장 유력한 품종
            </h4>
            <div className="flex items-center gap-6">
              <BreedFinderGraph
                chartData={chartData}
                width={200}
                height={200}
              />
              {/* <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {mainBreed.title}
                </h2>
                <span className="inline-block mt-2 px-3 py-1 bg-gray-500 text-white text-xs rounded-md">
                  신뢰도: 높음
                </span>
              </div> */}
            </div>
          </section>

          {/* 다른 가능성 섹션 */}
          <section className="space-y-3">
            <h4 className="text-md font-bold text-gray-700">다른 가능성</h4>
            <ul className="divide-y border-t border-b">
              {chartData.slice(1).map((item) => (
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
      </div>
      {/* 버튼 영역 */}
      <div className="flex flex-col justify-center sm:flex-row gap-3 pt-4">
        <Button variant="confirm" size="md">
          이 정보로 실종동물 등록하기
        </Button>
        <Button variant="cancel" size="md">
          재검색하기
        </Button>
      </div>
    </div>
  );
};

export default BreedFinderResult;

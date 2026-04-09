import { useRef, useState } from "react";
import Button from "@/shared/ui/common/Button";
import help_icon from "@img/icons/help.png";
import help_fill_icon from "@img/icons/help_fill.png";
import attach from "@img/icons/attachFile.png";
import { useBreedFinderStore } from "@/app/store/breedFinderStore";
import type { MissingBoardInputRequest } from "@/entities/missing-insert/model/missingInsert.type";
import { CAT_BREEDS, DOG_BREEDS, BREED_COLORS } from "@/shared/constant/breed";
import { useAppStore } from "@/app/store/appStore";
import { useNavigate } from "react-router-dom";
import { SearchOptions } from "@/shared/types/data-types";
import { useAddMissingBoard } from "../model/useMissingBoardInput";
const MissingInsertForm = () => {
  const navigate = useNavigate();
  const { updateModalFlag } = useBreedFinderStore();
  const { updateIsConfirmOpen, updateIsAlertOpen } = useAppStore();
  const [files, setFiles] = useState<File[]>([]);
  const labelWrapperStyle =
    "w-[100px] md:w-[180px] bg-slate-100 flex items-center justify-center border-r border-gray-200 shrink-0";
  const labelTextStyle =
    "text-[12px] md:text-sm font-semibold text-gray-700 break-keep text-center";
  const settingModal = (val: boolean) => {
    updateModalFlag(val);
  };
  const { mutate } = useAddMissingBoard();
  const [colorEtc, setColorEtc] = useState<string>("");
  const [formData, setFormData] = useState<MissingBoardInputRequest>({
    breed1: "선택",
    breed2: "",
    gender: "남자",
    age: "",
    color: "",
    features: "",
    missingDate: new Date(),
    missingLocation: "",
  });
  const changeFormData = (type: string, val: string | Date) => {
    setFormData((prev: MissingBoardInputRequest) => {
      return { ...prev, [type]: val };
    });
  };
  const formatDateTime = (dateTime: Date) => {
    const offset = dateTime.getTimezoneOffset() * 60000;
    return new Date(dateTime.getTime() - offset).toISOString().slice(0, 16);
  };
  const invalidData = () => {
    if (formData.missingLocation === "") {
      updateIsAlertOpen({ flag: true, message: "실종장소를 작성해주세요." });
      return;
    }
    if (formData.breed1 === "선택") {
      updateIsAlertOpen({ flag: true, message: "품종을 선택해주세요." });
      return;
    }
    if (formData.breed2 === "") {
      updateIsAlertOpen({ flag: true, message: "품종을 선택해주세요." });
      return;
    }
    if (formData.color === "기타" && colorEtc === "") {
      updateIsAlertOpen({ flag: true, message: "색상에 대해 작성해주세요." });
      return;
    }
    if (formData.age) {
      updateIsAlertOpen({ flag: true, message: "나이를 작성해주세요." });
      return;
    }
    return true;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (invalidData()) {
      mutate(
        { params: formData, files },
        {
          onSuccess: () => {
            navigate("/");
          },
        },
      );
    }
  };
  return (
    <form
      className="max-w-[1480px] mx-auto border-t-2 border-slate-400"
      onSubmit={handleSubmit}
    >
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
              value={formatDateTime(new Date(formData.missingDate))}
              onChange={(e) =>
                changeFormData("missingDate", new Date(e.target.value))
              }
            />
          </div>
        </div>
        <div className="flex flex-1 items-stretch">
          <div className={labelWrapperStyle}>
            <label className={labelTextStyle}>
              <span className="text-red-500 mr-1">*</span>실종장소
            </label>
          </div>
          <div className="flex justify-between items-center p-2 md:p-4">
            <div className="mr-2">
              <input
                type="text"
                className="w-full border rounded-md p-2 text-sm md:text-base min-h-[60px]"
                placeholder="주소를 검색해 주세요."
                value={formData.missingLocation}
                readOnly
              />
            </div>
            <Button size="md" variant="primary">
              주소검색
            </Button>
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
          <select
            className="border rounded-md p-1 md:p-2 w-[48%] md:w-[150px] h-[36px] md:h-[40px] text-sm"
            onChange={(e) => {
              changeFormData("breed1", e.target.value);
            }}
            value={formData.breed1}
          >
            <option value={"선택"}>선택</option>
            <option value={"개"}>개</option>
            <option value={"고양이"}>고양이</option>
            <option value={"기타"}>기타</option>
          </select>
          {formData.breed1 !== "기타" ? (
            <select
              className="border rounded-md p-1 md:p-2 w-[48%] md:w-[150px] h-[36px] md:h-[40px] text-sm"
              value={formData.breed2}
              onChange={(e) => changeFormData("breed2", e.target.value)}
            >
              {formData.breed1 === "개" &&
                DOG_BREEDS.map((dog: SearchOptions) => (
                  <option value={dog.value} key={dog.label}>
                    {dog.label}
                  </option>
                ))}
              {formData.breed1 === "고양이" &&
                CAT_BREEDS.map((cat: SearchOptions) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
            </select>
          ) : (
            <input
              type="text"
              className="w-full md:flex-1 border rounded-md p-2 bg-gray-100 h-[36px] md:h-[40px] text-sm"
              placeholder="기타 시 입력"
            />
          )}

          {/* 툴팁을 포함한 아이콘 영역 */}

          <button
            className="group relative w-6 h-6 ml-1 cursor-pointer flex items-center justify-center"
            type="button"
            onClick={() => {
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
          <select
            className="border rounded-md p-1 md:p-2 w-full md:w-[200px] h-[36px] md:h-[40px] text-sm"
            onChange={(e) => {
              changeFormData("color", e.target.value);
              // if (e.target.value !== "기타") {
              //   setColorEtc("");
              // }
            }}
          >
            {BREED_COLORS.map((color: SearchOptions) => (
              <option key={color.label} value={color.value}>
                {color.label}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="w-full md:max-w-[400px] border rounded-md p-2 bg-gray-100 h-[36px] md:h-[40px] text-sm"
            placeholder="기타 색상 입력"
            disabled={formData.color !== "기타"}
            value={colorEtc}
            onChange={(e) => setColorEtc(e.target.value)}
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
              <input
                type="radio"
                name="gender"
                className="w-4 h-4"
                checked={formData.gender === "남자"}
                onChange={() => changeFormData("gender", "남자")}
              />
              남자
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="gender"
                className="w-4 h-4"
                checked={formData.gender === "여자"}
                onChange={() => changeFormData("gender", "여자")}
              />
              여자
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
              value={formData.age}
              onChange={(e) => {
                changeFormData("age", e.target.value);
              }}
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
            value={formData.features}
            onChange={(e) => {
              changeFormData("features", e.target.value);
            }}
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
              onChange={(e) => {
                if (!e.target.files) return;
                setFiles(Array.from(e.target.files));
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
          onClick={() => {
            updateIsConfirmOpen;
            ({
              flag: true,
              message: "게시글 등록을 취소하시겠습니까?",
              callback: () => navigate(-1),
            });
          }}
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

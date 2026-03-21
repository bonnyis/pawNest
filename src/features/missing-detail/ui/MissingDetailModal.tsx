import { useState, useEffect } from "react";
import ContentsModal from "@/shared/ui/modal/ContentsModal";
import like from "@img/icons/star.png";
import like_fill from "@img/icons/star_fill.png";
import comment from "@img/icons/comment_2.png";
import MissingDetailCommentsItem from "./MissingDetailCommentsItem";
import { onImgError } from "@/shared/lib/onError";
import Button from "@/shared/ui/common/Button";

import { useAuthStore } from "@/app/store/authStore";
import { useAppStore } from "@/app/store/appStore";
import { useMissingDetail } from "@/features/missing-detail/model/useMissingDetail";
import LoadingSpinner from "@/shared/ui/common/LoadingSpinner";

type MissingDetailModalProps = {
  flag: boolean;
  updateFlag: (value: boolean) => void;
  boardId: string | number;
};

const MissingDetailModal = ({
  flag,
  updateFlag,
  boardId,
}: MissingDetailModalProps) => {
  const { isOpen, updateIsOpen, updateIsAlertOpen, updateViewType } =
    useAppStore();
  const { isLoading, data } = useMissingDetail({ boardId, enabled: flag });
  const [likeFlag, updateLikeFlag] = useState<boolean>(false);
  const { isLogin } = useAuthStore();
  const labelWrapperStyle =
    "w-[100px] bg-slate-100 flex items-center justify-center border-r border-gray-200 shrink-0";
  const labelTextStyle =
    "text-[12px] md:text-sm font-semibold text-gray-700 break-keep text-center";
  const close = () => {
    updateFlag(false);
  };

  const goComment = () => {
    const target = document.getElementById("commentInput");
    if (target) {
      target.focus();
    }
  };
  const goChat = () => {
    if (!isLogin) {
      updateIsAlertOpen({
        flag: true,
        message: "로그인 후 이용 가능합니다.",
      });
    }
    if (!isOpen) {
      updateIsOpen(true);
    }
    return updateViewType("CHAT");
  };

  useEffect(() => {
    if (flag && isOpen) {
      updateIsOpen(!isOpen);
      console.log(boardId);
    }
  }, [flag, isOpen]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <ContentsModal onClose={close} flag={flag}>
      {data ? (
        <div className="grid gap-5 px-3 justify-items-center">
          <div className="flex justify-between items-center mt-5 w-[90%]">
            <h2 className="text-left font-semibold text-xl max-w-[85%] line-clamp-2">
              {data?.title}
            </h2>
            <button
              type="button"
              className=""
              onClick={() => {
                updateLikeFlag(!likeFlag);
              }}
            >
              {likeFlag ? (
                <img src={like} alt="관심글 저장하기" />
              ) : (
                <img src={like_fill} alt="관심글 저장 취소하기" />
              )}
            </button>
          </div>
          <div className="flex justify-between items-center w-[90%]">
            <p className="text-gray-600 text-base">{data.writerId}</p>
            <p className="text-gray-600 text-base">{data.createdAt}</p>
            <p className="text-gray-600 text-base">
              <span className="mr-4">조회수</span>
              {data.viewCount}
            </p>
          </div>
          {/* contents */}
          <div className="w-[90%] my-5">
            {data.images?.length > 0 && (
              <div className="flex justify-center items-center h-52 border rounded-md bg-gray-300 ">
                {/* <p className="text-center text-white ">IMAGE</p> */}
                {data.images?.map((item) => (
                  <img src={`${item.imgPath}`} onError={(e) => onImgError(e)} />
                ))}
              </div>
            )}
            {/* 상세 정보 표 영역 */}
            <div className="w-full border-t border-l border-gray-200 mt-5">
              {/* 한 행 (breed, gender) */}
              <div className="flex border-b border-r border-gray-200">
                <div className={labelWrapperStyle}>
                  <span className={labelTextStyle}>품종</span>
                </div>
                <div className="flex-1 p-3 text-sm text-gray-800">
                  {data.breed1 || "정보 없음"}
                </div>
                <div className={labelWrapperStyle}>
                  <span className={labelTextStyle}>상세품종</span>
                </div>
                <div className="flex-1 p-3 text-sm text-gray-800">
                  {data.breed2 || ""}
                </div>
              </div>

              {/* 한 행 (colors) */}
              <div className="flex border-b border-r border-gray-200">
                <div className={labelWrapperStyle}>
                  <span className={labelTextStyle}>색상</span>
                </div>
                <div className="flex-1 p-3 text-sm text-gray-800">
                  {data.color || "정보 없음"}
                </div>
                <div className={labelWrapperStyle}>
                  <span className={labelTextStyle}>성별</span>
                </div>
                <div className="flex-1 p-3 text-sm text-gray-800">
                  {data.gender || "정보 없음"}
                </div>
              </div>

              {/* 추가 정보 (특징 등) */}
              <div className="flex border-b border-r border-gray-200">
                <div className={labelWrapperStyle}>
                  <span className={labelTextStyle}>특징</span>
                </div>
                <div className="flex-1 p-3 text-sm text-gray-800 whitespace-pre-wrap">
                  {data.features || "상세 내용이 없습니다."}
                </div>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 my-4 ">
              <Button variant="cancel" size={"md"} onClick={() => goComment()}>
                댓글 작성
              </Button>
              <Button
                variant="primary"
                size={"md"}
                onClick={() => {
                  goChat();
                }}
              >
                채팅 전송
              </Button>
              {isLogin && (
                <Button
                  variant="cancel"
                  size={"md"}
                  onClick={() => goComment()}
                >
                  게시글 수정
                </Button>
              )}
              {isLogin && (
                <Button
                  variant="primary"
                  size={"md"}
                  onClick={() => {
                    goChat();
                  }}
                >
                  게시글 삭제
                </Button>
              )}
            </div>
          </div>
          {/* 댓글 영역 */}
          <div className="border-b-2 w-[90%] ">
            <div className="flex gap-2 items-center mb-4">
              <img
                src={comment}
                alt="댓글 아이콘"
                className="w-[20px] h-[20px]"
              />
              <p className="leading-none">
                댓글
                <span className="ml-1">12</span>
              </p>
            </div>

            <MissingDetailCommentsItem />

            {/* 댓글 총 3개까지만 보여주고 더 볼 사람만 눌러서 더 보여주는 식으로 진행! */}
          </div>
          <div className="flex w-[90%]">
            <input
              type="text"
              className="border rounded-md pl-3 w-4/5
            "
              id="commentInput"
              placeholder={`${isLogin ? "글자 수는 최대 100자까지 등록 가능합니다." : "로그인 후 등록 가능합니다."}`}
              disabled={!isLogin ? true : false}
            />
            <Button
              size="md"
              className="ml-2 w-1/5"
              disabled={!isLogin ? true : false}
            >
              등록
            </Button>
          </div>
        </div>
      ) : null}
    </ContentsModal>
  );
};

export default MissingDetailModal;

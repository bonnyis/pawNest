import { useState } from "react";
import ContentsModal from "@/shared/ui/modal/ContentsModal";
import type { MissingDetailModalProps } from "../types/missing-detail";

import like from "@img/icons/star.png";
import like_fill from "@img/icons/star_fill.png";
import comment from "@img/icons/comment_2.png";
import MissingDetailCommentsItem from "./MissingDetailCommentsItem";
import MissingDetailContents from "./MissingDetailContents";
import Button from "@/shared/ui/common/Button";

import { useAuthStore } from "@/app/store/authStore";

const MissingDetailModal = ({ flag, updateFlag }: MissingDetailModalProps) => {
  const [likeFlag, updateLikeFlag] = useState<boolean>(false);
  const { isLogin } = useAuthStore();
  const close = () => {
    updateFlag(false);
  };

  return (
    <ContentsModal onClose={close} flag={flag}>
      <div className="grid gap-5 px-3 justify-items-center">
        <div className="flex justify-between items-center mt-5 w-[90%]">
          <h2 className="text-left font-semibold text-xl max-w-[85%] line-clamp-2">
            게시글 제목제목제목제목
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
          <p className="text-gray-600 text-base">이름이름</p>
          <p className="text-gray-600 text-base">2026.01.01</p>
          <p className="text-gray-600 text-base">
            <span className="mr-4">조회수</span>1268
          </p>
        </div>
        {/* contents */}
        <MissingDetailContents />
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
          <MissingDetailCommentsItem />
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
          />
          <Button size="md" className="ml-2 w-1/5">
            등록
          </Button>
        </div>
      </div>
    </ContentsModal>
  );
};

export default MissingDetailModal;

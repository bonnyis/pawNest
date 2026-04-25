import { useState, useEffect } from "react";
import ContentsModal from "@/shared/ui/modal/ContentsModal";
import FavoriteBtn from "@/features/favorite-toggle/ui/FavoriteBtn";
import { onImgError } from "@/shared/lib/onError";
import Button from "@/shared/ui/common/Button";
import { useMissingDetailStore } from "@/app/store/missingDetailStore";
import { useAuthStore } from "@/app/store/authStore";
import { useAppStore } from "@/app/store/appStore";
import { useMissingDetail } from "@/features/missing-detail/model/useMissingDetail";
import LoadingSpinner from "@/shared/ui/common/LoadingSpinner";
import CommentsSection from "@/entities/comments/ui/CommentsSection";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAddChatRoom } from "@/features/chatting/model/useAddChatRoom";
import { useChatStore } from "@/app/store/chatStore";
import { useMissingBoardControl } from "@/features/missing-form/model/useMissingBoardControl";
import { ROUTE_PATHS } from "@/shared/routes/routes";

const MissingDetailModal = () => {
  const {
    isOpen,
    updateIsOpen,
    updateIsAlertOpen,
    updateViewType,
    updateIsConfirmOpen,
  } = useAppStore();
  const { updateChatPannelType } = useChatStore();
  const { useDeleteMissingBoard } = useMissingBoardControl();
  const deleteMissingBoard = useDeleteMissingBoard();
  const navigate = useNavigate();
  const { detailBoardId, detailModalFlag, updateDetailModalFlag } =
    useMissingDetailStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const detailId = searchParams.get("id"); // 메인&수정에서 상세 바로 올 때 쓰는 boardId
  const { isLoading, data } = useMissingDetail({
    boardId: detailId ? detailId : detailBoardId,
    enabled: detailModalFlag,
  });

  const { mutate } = useAddChatRoom();
  const [imgErr, setImgErr] = useState<boolean>(false);

  const { isLogin, userId } = useAuthStore();
  const labelWrapperStyle =
    "w-[100px] bg-slate-100 flex items-center justify-center border-r border-gray-200 shrink-0";
  const labelTextStyle =
    "text-[12px] md:text-sm font-semibold text-gray-700 brpaeak-keep text-center";
  // 모달 닫기
  const close = () => {
    updateDetailModalFlag(false);
    if (detailId) {
      setSearchParams({});
    }
  };
  const goComment = () => {
    const target = document.getElementById("commentInput");
    if (isLogin && target) {
      return target.focus();
    } else
      return updateIsAlertOpen({
        flag: true,
        message: "로그인 후 이용 가능합니다.",
      });
  };
  // 채팅영역 오픈을 위한 로직
  const handleChatRoom = () => {
    const targetId = Number(detailId) || Number(detailBoardId);
    mutate(targetId);
    updateDetailModalFlag(false);
    updateIsOpen(true);
    updateViewType("CHAT");
    updateChatPannelType("chat");
  };
  // 게시글 삭제 로직
  const handleDelete = (id: string | number) => {
    deleteMissingBoard.mutate(String(id), {
      onSuccess: () => {
        console.log("성공");
        updateIsAlertOpen({
          flag: true,
          message: "게시글이 삭제되었습니다.",
        });
        updateDetailModalFlag(false);
      },
      onError: () => {
        updateIsAlertOpen({
          flag: true,
          message: "게시글 삭제에 실패했습니다. 다시 시도해주세요.",
        });
      },
    });
  };
  // 게시글 수정
  const handleModify = (id: string | number) => {
    updateDetailModalFlag(false);
    navigate(`${ROUTE_PATHS.MISSINGEDIT}/${id}`);
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
    handleChatRoom();
  };

  useEffect(() => {
    if (detailId) {
      updateDetailModalFlag(true);
    }
  }, [detailId]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <ContentsModal onClose={close} flag={detailModalFlag}>
      {data ? (
        <div className="grid gap-5 px-3 justify-items-center">
          <div className="flex justify-between items-center mt-5 w-[90%]">
            <h2 className="text-left font-semibold text-xl max-w-[85%] line-clamp-2">
              {data?.title}
            </h2>
            <FavoriteBtn liked={Boolean(data?.liked)} />
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
              <div
                className={`flex justify-center items-center h-auto ${!imgErr} ? 'border rounded-md':'' w-full`}
              >
                {data.images?.map((item) => (
                  <img
                    src={`https://unbribably-unhilly-danyell.ngrok-free.dev${item.imgPath}`}
                    onError={(e) => {
                      setImgErr(true);
                      onImgError(e);
                    }}
                    className="border rounded-md"
                    title={`${data.title} 대표이미지`}
                    key={item.imgPath}
                  />
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
              {isLogin && userId === data.writerId && (
                <Button
                  variant="cancel"
                  size={"md"}
                  onClick={() => handleModify(data.boardId)}
                >
                  게시글 수정
                </Button>
              )}
              {isLogin && userId === data.writerId && (
                <Button
                  variant="primary"
                  size={"md"}
                  onClick={() =>
                    updateIsConfirmOpen({
                      flag: true,
                      message: "정말 삭제하시겠습니까?",
                      callback: () => handleDelete(data.boardId),
                    })
                  }
                >
                  게시글 삭제
                </Button>
              )}
            </div>
          </div>
          {/* 댓글 영역 */}
          <CommentsSection />
        </div>
      ) : null}
    </ContentsModal>
  );
};

export default MissingDetailModal;

import { useRef } from "react";
import Button from "@/shared/ui/common/Button";
import { useAuthStore } from "@/app/store/authStore";
import { useSendComments } from "../model/useGetComments";
import { useMissingDetailStore } from "@/app/store/missingDetailStore";
import { useAppStore } from "@/app/store/appStore";
const CommentInput = () => {
  const { isLogin } = useAuthStore();
  const { updateIsAlertOpen } = useAppStore();
  const commentInput = useRef<HTMLInputElement | null>(null);
  const { detailBoardId } = useMissingDetailStore();
  const { mutate, isPending } = useSendComments();
  const handleComment = () => {
    const content = commentInput.current?.value ?? null;
    if (content) {
      mutate({
        boardId: Number(detailBoardId),
        content,
      });
    } else
      return updateIsAlertOpen({ flag: true, message: "댓글을 입력해주세요." });
  };
  return (
    <div className="flex ">
      <input
        type="text"
        className="border rounded-md pl-3 w-4/5"
        id="commentInput"
        placeholder={`${isLogin ? "글자 수는 최대 100자까지 등록 가능합니다." : "로그인 후 등록 가능합니다."}`}
        disabled={!isLogin || isPending}
        ref={commentInput}
        autoComplete="off"
      />
      <Button
        type="button"
        size="md"
        className="ml-2 w-1/5"
        disabled={!isLogin || isPending}
        onClick={() => handleComment()}
      >
        {isPending ? "등록중" : "등록"}
      </Button>
    </div>
  );
};

export default CommentInput;

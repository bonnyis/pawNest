import { useRef } from "react";
import Button from "@/shared/ui/common/Button";
import { useAuthStore } from "@/app/store/authStore";
import { useMissingDetailStore } from "@/app/store/missingDetailStore";
import { useAppStore } from "@/app/store/appStore";
import { useSendComments } from "../model/useSendComments";

const CommentInput = () => {
  const { isLogin } = useAuthStore();
  const { updateIsAlertOpen } = useAppStore();
  const commentInput = useRef<HTMLInputElement | null>(null);
  const { detailBoardId } = useMissingDetailStore();
  const { mutate, isPending } = useSendComments();
  const handleComment = () => {
    const content = commentInput.current?.value;

    if (!content || content.trim() === "") {
      return updateIsAlertOpen({ flag: true, message: "댓글을 입력해주세요." });
    }
    mutate(
      { boardId: Number(detailBoardId), content },
      {
        onSuccess: () => {
          // 등록 성공 시 입력창 비우기
          if (commentInput.current) {
            commentInput.current.value = "";
          }
        },
      },
    );
  };
  return (
    <div className="flex ">
      <input
        type="text"
        className="border rounded-md pl-3 w-4/5"
        id="commentInput"
        placeholder={`${isLogin ? "글자 수는 최대 200자까지 등록 가능합니다." : "로그인 후 등록 가능합니다."}`}
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
        {"등록"}
      </Button>
    </div>
  );
};

export default CommentInput;

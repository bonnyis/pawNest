import {} from "react";
import Button from "@/shared/ui/common/Button";
import { useAppStore } from "@/app/store/appStore";
import { useAuthStore } from "@/app/store/authStore";

const MissingDetailContents = () => {
  const { isOpen, updateIsOpen, updateViewType, updateIsAlertOpen } =
    useAppStore();
  const { isLogin } = useAuthStore();
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
  return (
    <div className="w-[90%] my-5">
      <div className="flex justify-center items-center h-52 border rounded-md bg-gray-300 ">
        <p className="text-center text-white ">IMAGE</p>
      </div>
      <div className="flex justify-center items-center h-52">
        <p className="text-center text-lg ">내용</p>
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
          <Button variant="cancel" size={"md"} onClick={() => goComment()}>
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
  );
};

export default MissingDetailContents;

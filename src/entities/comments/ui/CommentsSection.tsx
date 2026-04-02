import {} from "react";
import CommentList from "../../../features/comments/ui/CommentList";
import CommentInput from "../../../features/comments/ui/CommentInput";
const CommentsSection = () => {
  return (
    <div className="w-[90%] ">
      <CommentList />

      {/* 댓글 총 3개까지만 보여주고 더 볼 사람만 눌러서 더 보여주는 식으로 진행! */}
      <CommentInput />
    </div>
  );
};

export default CommentsSection;

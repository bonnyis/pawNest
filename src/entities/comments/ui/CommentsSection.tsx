import {} from "react";
import CommentList from "../../../features/comments/ui/CommentList";
import CommentInput from "../../../features/comments/ui/CommentInput";
const CommentsSection = () => {
  return (
    <div className="w-[90%] ">
      <CommentList />
      <CommentInput />
    </div>
  );
};

export default CommentsSection;

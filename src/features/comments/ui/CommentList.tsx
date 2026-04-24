import comment from "@img/icons/comment_2.png";
import CommentsItem from "./CommentsItem";
import { useGetComments } from "../model/useGetComments";
import LoadingSpinner from "@/shared/ui/common/LoadingSpinner";
import { useMissingDetailStore } from "@/app/store/missingDetailStore";
import NoData from "@/shared/ui/common/NoData";

const CommentList = () => {
  const { detailBoardId, detailModalFlag } = useMissingDetailStore();
  const { isLoading, data } = useGetComments({
    boardId: String(detailBoardId),
    enabled: detailModalFlag,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div className="flex gap-2 items-center mb-4">
        <img src={comment} alt="댓글 아이콘" className="w-[20px] h-[20px]" />
        <p className="leading-none">
          댓글
          <span className="ml-1">{data?.length ?? "0"}</span>
        </p>
      </div>
      {data && data?.length > 0 ? (
        data?.map((item) => <CommentsItem list={item} key={item.commentId} />)
      ) : (
        <NoData message="등록된 댓글이 없습니다." />
      )}
      {}
    </>
  );
};

export default CommentList;

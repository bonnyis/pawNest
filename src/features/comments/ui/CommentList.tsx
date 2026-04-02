import { useEffect } from "react";
import comment from "@img/icons/comment_2.png";
import CommentsItem from "../../../entities/comments/ui/CommentsItem";
import { useGetComments } from "../model/useGetComments";
import LoadingSpinner from "@/shared/ui/common/LoadingSpinner";
import { useMissingDetailStore } from "@/app/store/missingDetailStore";
import { useSocketStore } from "@/app/store/socketStore";

const CommentList = () => {
  const { detailBoardId, detailModalFlag } = useMissingDetailStore();
  const { isLoading, data } = useGetComments({
    boardId: String(detailBoardId),
    enabled: detailModalFlag,
  });
  const { client } = useSocketStore();
  useEffect(() => {
    if (!client || !client.connected) return;

    // 특정 토픽 구독
    const subscription = client.subscribe(
      `/topic/board/${detailBoardId}`,
      (message) => {
        const newMessage = JSON.parse(message.body);
        console.log("새 메시지:", newMessage);
        // 여기서 상태 업데이트 (Tanstack Query의 setQueryData 등을 활용 가능)
      },
    );

    // 컴포넌트 나갈 때 구독 해제 (소켓 연결은 유지됨)
    return () => {
      subscription.unsubscribe();
    };
  }, [client, detailBoardId]);

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
      {data && data?.length > 0 ? <CommentsItem list={data} /> : null}
      {}
    </>
  );
};

export default CommentList;

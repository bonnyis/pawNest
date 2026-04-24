import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GET_COMMENT_LIST } from "@/entities/comments/api/comments";
import { useSocketStore } from "@/app/store/socketStore";

export const useGetComments = ({
  boardId,
  enabled,
}: {
  boardId: string;
  enabled?: boolean;
}) => {
  const queryClient = useQueryClient();
  const { client } = useSocketStore();

  // 1. 기존 HTTP 데이터 조회 (Tanstack Query)
  const query = useQuery({
    queryKey: ["commentsList", boardId],
    queryFn: () => GET_COMMENT_LIST(Number(boardId)),
    enabled: enabled && !!boardId,
    placeholderData: (prev) => prev,
  });

  // 2. 실시간 소켓 구독 로직 결합
  useEffect(() => {
    // 훅이 비활성화되어 있거나 소켓 연결이 없으면 구독하지 않음
    if (!enabled || !boardId || !client || !client.active) {
      console.log("error");
      return;
    }

    // 댓글 실시간 수신 구독
    const subscription = client.subscribe(
      `/topic/board/${boardId}`,
      (message) => {
        const newComment = JSON.parse(message.body);
        console.log("📥 실시간 댓글 수신:", newComment);

        queryClient.setQueryData(["commentsList", boardId], (oldData: any) => {
          return oldData ? [...oldData, newComment] : [newComment];
        });
      },
    );

    // 에러 수신 구독
    const errorSub = client.subscribe("/user/queue/errors", (msg) => {
      console.error("❌ 소켓 서버 에러:", msg.body);
    });

    return () => {
      subscription.unsubscribe();
      errorSub.unsubscribe();
    };
  }, [enabled, boardId, client, queryClient]);

  return query;
};

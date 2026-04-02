import { api } from "@/shared/api";
import { CommentListResponse } from "../model/comment.type";
import { useSocketStore } from "@/app/store/socketStore";
import { useAppStore } from "@/app/store/appStore";

export const GET_COMMENT_LIST = async (boardId: number) => {
  try {
    const URL = `/api/comments/${boardId}`;
    const { data } = await api.get<CommentListResponse>(URL);
    return data;
  } catch (error: any) {
    if (error) {
      return [];
    }
  }
};

export const SEND_COMMENT = (boardId: number, content: string) => {
  const { client } = useSocketStore.getState();

  // 1. 소켓 연결 상태를 먼저 체크합니다.
  if (!client || !client.active) {
    console.error("❌ 소켓이 활성화되지 않았습니다.");
    // 에러를 던져서 useMutation의 onError가 잡게 합니다.
    throw new Error("서버와 연결이 끊어졌습니다. 잠시 후 다시 시도해주세요.");
  }

  // 2. WebSocket으로 데이터 전송
  try {
    client.publish({
      destination: `/app/comment/${boardId}`,
      // 서버에서 기대하는 JSON 형식을 맞춰주세요 (예: content, userId 등)
      body: JSON.stringify({
        content: content,
        // 필요하다면 추가 정보 전송
      }),
    });

    console.log("🚀 댓글 전송 시도 완료:", content);
  } catch (error: any) {
    console.error("STOMP 전송 에러:", error);
    throw new Error(error);
  }
};

export const DELETE_COMMENT = async (commentId: number) => {
  try {
    const { data } = await api.delete(`/api/comment/${commentId}`);
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const MODIFY_COMMENT = async (commentId: number, content: string) => {
  try {
    const { data } = await api.patch(`/api/comment/${commentId}`, { content });
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

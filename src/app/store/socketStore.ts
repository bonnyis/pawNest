import { create } from "zustand";
import { Client } from "@stomp/stompjs";
import { createSocketClient } from "@/shared/lib/socket";
import { useAppStore } from "@/app/store/appStore"; // 알림창 연동

interface SocketState {
  client: Client | null;
  connect: (token: string) => void;
  disconnect: () => void;
}

export const useSocketStore = create<SocketState>((set, get) => ({
  client: null,

  connect: (token) => {
    const currentClient = get().client;
    if (currentClient?.active) {
      currentClient.deactivate();
    }

    const client = createSocketClient(token);

    client.onConnect = (frame) => {
      console.log("✅ WebSocket 연결됨", frame);

      // 🔥 전역 에러 구독 시작
      client.subscribe("/user/queue/errors", (msg) => {
        const errorData = JSON.parse(msg.body);
        console.error("❌ 서버 비즈니스 에러 수신:", errorData);

        // 전역 알림창 띄우기
        useAppStore.getState().updateIsAlertOpen({
          flag: true,
          message: errorData.message || "요청 처리에 실패했습니다.",
        });
      });
    };

    client.onStompError = (frame) => {
      console.error("❌ STOMP 에러 (프로토콜 레벨)", frame);
    };

    client.activate();
    set({ client });
  },

  disconnect: () => {
    const { client } = get();
    if (client) {
      client.deactivate();
      set({ client: null });
    }
  },
}));

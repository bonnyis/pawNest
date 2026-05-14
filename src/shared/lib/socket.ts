import { Client } from "@stomp/stompjs";

export const createSocketClient = (token: string) => {
  // 모바일 접속 시 ngrok의 웹소켓 지원이 불안정하여 SockJS 대신 기본 WebSocket 사용
  return new Client({
    brokerURL: "wss://unbribably-unhilly-danyell.ngrok-free.dev/ws",
    connectHeaders: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
    reconnectDelay: 5000,
    debug: (str) => console.log("[STOMP]", str),
  });
};

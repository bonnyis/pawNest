import { Client } from "@stomp/stompjs";
// import SockJS from "sockjs-client";

export const createSocketClient = (token: string) => {
  return new Client({
    brokerURL: "wss://unbribably-unhilly-danyell.ngrok-free.dev/ws",
    connectHeaders: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "69420",
    },
    reconnectDelay: 5000,
    debug: (str) => console.log("[STOMP]", str),
  });
  // return new Client({
  //   webSocketFactory: () =>
  //     new SockJS("https://unbribably-unhilly-danyell.ngrok-free.dev/ws"),
  //   connectHeaders: {
  //     Authorization: `Bearer ${token}`,
  //     "ngrok-skip-browser-warning": "69420",
  //   },
  //   reconnectDelay: 5000,
  //   debug: (str) => console.log("[STOMP]", str),
  // });
};

import "text-encoding-polyfill";

import { Client } from "@stomp/stompjs";

export const client = new Client({
  brokerURL: "ws://10.49.163.145:8080/ws",
  reconnectDelay: 5000,
  debug: function (str) {
    console.log("STOMP Debug: ", str);
  },
  appendMissingNULLonIncoming: true,
  reconnectDelay: 5000,
  heartbeatIncoming: 0,
  heartbeatOutgoing: 0,
  forceBinaryWSFrames: true,
});

client.debug = (str) => console.log("STOMP:", str);
client.onStompError = (f) => console.log("STOMP ERROR", f.headers, f.body);
client.onWebSocketError = (e) => console.log("WS ERROR", e);
client.onWebSocketClose = (e) => console.log("WS CLOSED", e);

client.activate();

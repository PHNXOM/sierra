import "text-encoding-polyfill";

import { Client } from "@stomp/stompjs";

export const client = new Client({
  brokerURL: "ws://10.0.2.2:8080/ws",
  reconnectDelay: 5000,
  appendMissingNULLonIncoming: true,
  reconnectDelay: 5000,
  heartbeatIncoming: 0,
  heartbeatOutgoing: 0,
  forceBinaryWSFrames: true,
});

client.activate();

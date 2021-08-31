/* eslint-disable no-restricted-globals */
import { WORKER_EVENTS } from "shared/core/events";
// import { runBigTask } from "shared/utils";

var port;
self.onmessage = (e) => {
  const { data } = e;

  console.log(`[WORKER-A-RECIEVE]`, data);
  switch (data.type) {
    case WORKER_EVENTS.PORT_INIT:
      // HANDLE

      console.log(`[WORKER-A-PORT INIT]`);
      port = e.ports[0];
      break;
    case WORKER_EVENTS.SEND_EVENT:
      console.log(`[WORKER-A-SEND-EVENT]`);
      // i am just a messenger, so pass it to w2
      // this port is used to talk to who eles get the other port of the MessageChannel
      port.postMessage("boss wants me(worker1) to tell you: " + e.data);
      break;
    default:
      throw new Error("Unhandled Event");
  }
};

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
      // I will pass this to  another eorker
      // this port is used to talk to who part of MessageChannel
      port.postMessage({ type: WORKER_EVENTS.INPUT_QUEUE, data: data.data });
      break;

    case WORKER_EVENTS.SEND_MAYHEM_EVENT:
      console.log(`[WORKER-A-SEND-EVENT]`);
      // I will pass this to  another eorker
      // this port is used to talk to who part of MessageChannel
      port.postMessage({
        type: WORKER_EVENTS.INPUT_MAYHEM_QUEUE,
        data: { data: data.data.value, index: data.data.index },
      });
      break;
    default:
      throw new Error("Unhandled Event");
  }
};

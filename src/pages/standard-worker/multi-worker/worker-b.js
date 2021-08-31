/* eslint-disable no-restricted-globals */
import { WORKER_EVENTS } from "shared/core/events";
// import { runBigTask } from "shared/utils";

let port;

self.onmessage = (e) => {
  const { data } = e;

  console.log(`[WORKER-B-RECIEVE]`, data);

  if (e.data.type === WORKER_EVENTS.PORT_INIT) {
    port = e.ports[0];
    // listen on this port, message comming from worker1 will get here
    port.onmessage = function (e) {
      console.log("WORKER B PORT RECIEVE - ", e);
      // tell boss that I have got the message from him through worker1
      postMessage("I have got you message, boss. You said: " + e.data);
    };
  }
};

//   switch (data.type) {
//     case WORKER_EVENTS.RUN_BIG_TASK:
//       // HANDLE
//       const t0 = performance.now();
//       const result = runBigTask(data.data);
//       const t1 = performance.now();
//       console.log(`RUN BIG TAKS TOOK ${t1 - t0} milliseconds.`);

//       self.postMessage({ type: WORKER_EVENTS.RUN_BIG_TASK, data: result });
//       break;
//     default:
//       throw new Error("Invalid Event");
//   }

/* eslint-disable no-restricted-globals */
import { WORKER_EVENTS } from "shared/core/events";
import { runBigTask } from "shared/utils";

let port;

self.onmessage = (e) => {
  const { data } = e;

  console.log(`[WORKER-B-RECIEVE]`, data);

  if (e.data.type === WORKER_EVENTS.PORT_INIT) {
    console.log(`[WORKER-B-PORT INIT]`);
    port = e.ports[0];
    // listen on this port, message comming from worker1 will get here
    port.onmessage = function (e) {
      switch (e.data.type) {
        case WORKER_EVENTS.INPUT_QUEUE:
          // WE HAVE NEW DATA TO PROCESS
          console.log("WORKER-B-RECIEVE-DATA", e.data);
          const result = runBigTask(e.data.data);
          // tell boss that I have got the message from him through worker1
          postMessage({
            type: WORKER_EVENTS.RECIEVE_EVENT,
            data: result,
          });
          break;
        case WORKER_EVENTS.INPUT_MAYHEM_QUEUE:
          // WE HAVE NEW DATA TO PROCESS

          const { data, index } = e.data.data;
          console.log("WORKER-B-MAYHEM QUEUE", data, index);
          const t0 = performance.now();
          const result2 = runBigTask(data);
          const t1 = performance.now();
          console.log(`RUN BIG TAKS TOOK ${t1 - t0} milliseconds.`);
          // tell boss that I have got the message from him through worker1
          postMessage({
            type: WORKER_EVENTS.RECIEVE_EVENT,
            data: { result: result2, index },
          });
          break;
        default:
          throw new Error("Unhanlded Event");
      }
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

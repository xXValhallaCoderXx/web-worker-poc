/* eslint-disable no-restricted-globals */
import { WORKER_EVENTS } from "shared/core/events";
import { runBigTask } from "shared/utils";

self.onmessage = (e) => {
  const { data } = e;

  console.log(`[WORKER-RECIEVE]`, data);
  switch (data.type) {
    case WORKER_EVENTS.RUN_BIG_TASK:
      // HANDLE
      const t0 = performance.now();
      const result = runBigTask(data.data);
      const t1 = performance.now();
      console.log(`RUN BIG TAKS TOOK ${t1 - t0} milliseconds.`);

      self.postMessage({ type: WORKER_EVENTS.RUN_BIG_TASK, data: result });
      break;
    default:
      throw new Error("Invalid Event");
  }
};

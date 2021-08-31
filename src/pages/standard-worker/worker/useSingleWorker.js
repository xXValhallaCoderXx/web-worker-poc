import { useEffect, useRef } from "react";
import { WORKER_EVENTS } from "shared/core/events";

const useWebworkerHook = () => {
  const workerRef = useRef(
    new Worker("./standard-worker", {
      name: "standard-worker",
      type: "module",
    })
  );

  useEffect(() => {
    workerRef.current.onmessage = (e) => {
      // console.log(`[From Worker]`, e.data);
      switch (e.data.type) {
        case WORKER_EVENTS.RUN_BIG_TASK:
          console.log("RUN BIG TASK", e.data);
          break;
        default:
          throw new Error("Unknown event");
      }
    };
  }, [workerRef]);

  const disconnect = () => {
    workerRef.current.terminate();
  };

  const runBigTask = (value) => {
    workerRef.current.postMessage({
      type: WORKER_EVENTS.RUN_BIG_TASK,
      data: value,
    });
  };

  return { worker: workerRef, disconnect, runBigTask };
};

export default useWebworkerHook;

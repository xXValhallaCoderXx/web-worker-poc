import { useEffect, useRef } from "react";
// import { runBigTask } from "shared/utils";
import { WORKER_EVENTS } from "shared/core/events";

const useMultiWebWorkerHook = () => {
  const workerA = useRef(
    new Worker("./worker-a", {
      name: "worker-a",
      type: "module",
    })
  );

  const workerB = useRef(
    new Worker("./worker-b", {
      name: "worker-b",
      type: "module",
    })
  );

  const mc = useRef(new MessageChannel());

  useEffect(() => {
    workerA.current.onmessage = (e) => {
      console.log(`[From Worker-A]`, e.data);
      // switch (e.data.type) {
      //   case WORKER_EVENTS.RUN_BIG_TASK:
      //     console.log("RUN BIG TASK", e.data);
      //     break;
      //   default:
      //     throw new Error("Unknown event");
      // }
    };
  }, [workerA]);

  useEffect(() => {
    workerB.current.onmessage = (e) => {
      console.log(`[From Worker-B]`, e.data);
      // switch (e.data.type) {
      //   case WORKER_EVENTS.RUN_BIG_TASK:
      //     console.log("RUN BIG TASK", e.data);
      //     break;
      //   default:
      //     throw new Error("Unknown event");
      // }
    };
  }, [workerB]);

  const disconnect = () => {
    workerA.current.terminate();
    workerB.current.terminate();
  };

  const initializePorts = () => {
    workerA.current.postMessage({ type: WORKER_EVENTS.PORT_INIT }, [
      mc.current.port1,
    ]);
    workerB.current.postMessage({ type: WORKER_EVENTS.PORT_INIT }, [
      mc.current.port2,
    ]);
  };

  const sampleEventB = (value) => {
    // post the message to w1
    // let w1 pass the message to w2
    workerA.current.postMessage("this message is for worker2");
  };

  const sendDataWorkerAPassWorkerB = (value) => {
    // Post message to worker A
    // Let Worker A pass message to Worker B
    workerA.current.postMessage({
      type: WORKER_EVENTS.SEND_EVENT,
      data: value,
    });
  };

  return {
    workerA,
    workerB,
    disconnect,
    initializePorts,
    sampleEventB,
    sendDataWorkerAPassWorkerB,
  };
};

export default useMultiWebWorkerHook;

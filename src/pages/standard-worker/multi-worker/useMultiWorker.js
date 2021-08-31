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
    };
  }, [workerA]);

  useEffect(() => {
    workerB.current.onmessage = (e) => {
      switch (e.data.type) {
        case WORKER_EVENTS.RECIEVE_EVENT:
          console.log("EVENT RECIEVED", e.data);
          break;
        default:
          throw new Error("Unknown event");
      }
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

  const sendDataWorkerAPassWorkerB = (value) => {
    // Post message to worker A
    // Let Worker A pass message to Worker B
    workerA.current.postMessage({
      type: WORKER_EVENTS.SEND_EVENT,
      data: value,
    });
  };

  const mayhemButton = (value, index) => {
    workerA.current.postMessage({
      type: WORKER_EVENTS.SEND_MAYHEM_EVENT,
      data: { value, index },
    });
  };

  return {
    workerA,
    workerB,
    disconnect,
    mayhemButton,
    initializePorts,
    sendDataWorkerAPassWorkerB,
  };
};

export default useMultiWebWorkerHook;

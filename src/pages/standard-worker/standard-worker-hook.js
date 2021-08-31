import { useEffect, useRef } from "react";

const useWebworkerHook = () => {
  const workerRef = useRef(
    new Worker("../worker/standard-worker", {
      name: "standard-worker",
      type: "module",
    })
  );

  useEffect(() => {
    workerRef.current.onmessage = (e) => {
      console.log(`[From Worker]`, e);
    };
  }, [workerRef]);

  const disconnect = () => {
    workerRef.current.terminate();
  };

  const sum = (a, b) => {
    workerRef.current.postMessage({ type: "wwww", data: { a, b } });
  };

  return { worker: workerRef, disconnect, sum };
};

export default useWebworkerHook;

import { useEffect, useRef } from "react";
import { spawn, Worker } from "threads";

const useThreadWorker = () => {
  const workerRef = useRef(null);

  useEffect(() => {
    (async () => {
      const worker = await spawn(new Worker("./worker/thread-worker"));
      workerRef.current = worker;
    })();
  }, []);

  const runBigTask = async (value) => {
    const result = await workerRef.current.runBigTask(value);
    console.log("RESUT: ", result);
  };

  return { runBigTask };
};

export default useThreadWorker;

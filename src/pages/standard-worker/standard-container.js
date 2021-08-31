import { useState } from "react";
import useWebworkerHook from "./worker/useSingleWorker";
import useMultiWebWorkerHook from "./multi-worker/useMultiWorker";
import styles from "./standard-worker.module.css";
import { randomRange } from "shared/utils";

const StandardContainer = () => {
  const [count, setCount] = useState(0);
  const { disconnect, runBigTask } = useWebworkerHook();
  const { initializePorts, mayhemButton, sendDataWorkerAPassWorkerB } =
    useMultiWebWorkerHook();

  const onClickSendMessage = () => {
    // runBigTask(32000000);
    for (let index = 0; index < 5; index++) {
      runBigTask(32000000);
    }
  };
  const onClickDisconnect = () => {
    disconnect();
  };

  const onClickInitializePorts = () => initializePorts();
  const onClickSendDataWorkerAPassWorkerB = () => {
    sendDataWorkerAPassWorkerB(32000000);
  };

  const onCLickMayhem = () => {
    for (let index = 0; index < 5; index++) {
      mayhemButton(randomRange(3200000, 32000000), index);
    }
  };
  const onClickIncrement = () => setCount(count + 1);
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h4>Simple Hook Worker Example</h4>
        <button onClick={onClickSendMessage}>SEND MESSAGE WORKER</button>
        <button onClick={onClickDisconnect}>DISCONNECT</button>
      </div>
      <div className={styles.section}>
        <h4>Simple Hook Multi Worker Example</h4>
        <button onClick={onClickInitializePorts}>INITIALIZE PORTS</button>

        <button onClick={onClickSendDataWorkerAPassWorkerB}>SEND DATA</button>
        <button
          style={{ backgroundColor: "red", fontWeight: "bold" }}
          onClick={onCLickMayhem}
        >
          MAYHEM BUTTON
        </button>
      </div>
      <div className={styles.section}>
        <h4>Counter - {count}</h4>
        <button onClick={onClickIncrement}>INCREMENT</button>
      </div>
    </div>
  );
};

export default StandardContainer;

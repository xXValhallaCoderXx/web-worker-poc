import useWebworkerHook from "./worker/useSingleWorker";
import useMultiWebWorkerHook from "./multi-worker/useMultiWorker";
import styles from "./standard-worker.module.css";

const StandardContainer = () => {
  const { disconnect, runBigTask } = useWebworkerHook();
  const { initializePorts, sampleEventB, sendDataWorkerAPassWorkerB } =
    useMultiWebWorkerHook();

  const onClickSendMessage = () => {
    runBigTask(32000000);
  };
  const onClickDisconnect = () => {
    disconnect();
  };

  const onClickInitializePorts = () => initializePorts();
  const onClickEventB = () => sampleEventB();

  const onClickSendDataWorkerAPassWorkerB = () => {
    sendDataWorkerAPassWorkerB(100);
  };
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
        <button onClick={onClickEventB}>EVENT B</button>
        <button onClick={onClickSendDataWorkerAPassWorkerB}>SEND DATA</button>
      </div>
    </div>
  );
};

export default StandardContainer;

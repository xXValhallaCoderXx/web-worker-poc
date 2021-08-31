import useWebworkerHook from "./standard-worker-hook";

const StandardContainer = () => {
  const { disconnect, runBigTask } = useWebworkerHook();
  const onClickSendMessage = () => {
    runBigTask(32000000);
  };
  const onClickDisconnect = () => {
    disconnect();
  };
  return (
    <div>
      <button onClick={onClickSendMessage}>SEND MESSAGE WORKER</button>
      <button onClick={onClickDisconnect}>DISCONNECT</button>
    </div>
  );
};

export default StandardContainer;

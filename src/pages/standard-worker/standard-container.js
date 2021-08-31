import useWebworkerHook from "./standard-worker-hook";

const StandardContainer = () => {
  const { disconnect, sum } = useWebworkerHook();
  const onClickSendMessage = () => {
    sum(5, 10);
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

import useThreadWorker from "./useThreadWorker";
const ThreadsContainer = () => {
  const { runBigTask } = useThreadWorker();

  const onClickBigTask = () => {
    runBigTask(100);
  };
  return (
    <div>
      <h4>Threads JS</h4>
      <button onClick={onClickBigTask}>SEND MESSAGE WORKER</button>
    </div>
  );
};

export default ThreadsContainer;

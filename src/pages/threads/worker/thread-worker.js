import { expose } from "threads/worker";
import { runBigTask } from "shared/utils";
expose({
  runBigTask(value) {
    return runBigTask(value);
  },
});

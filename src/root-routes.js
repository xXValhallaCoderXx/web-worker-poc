import { Switch, Route } from "react-router-dom";
import BasicWorker from "./pages/standard-worker";
import Hamster from "./pages/hamster";
import Comlink from "./pages/comlink-worker";

const RootRoutes = () => {
  return (
    <Switch>
      <Route path="/basic" exact>
        <BasicWorker />
      </Route>
      <Route path="/hamster" exact>
        <Hamster />
      </Route>
      <Route path="/comlink" exact>
        <Comlink />
      </Route>
      <Route>
        <BasicWorker />
      </Route>
    </Switch>
  );
};

export default RootRoutes;

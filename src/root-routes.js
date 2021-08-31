import { Switch, Route } from "react-router-dom";
import BasicWorker from "./pages/standard-worker";
import Hamster from "./pages/hamster";
import Comlink from "./pages/comlink-worker";
import MainLayout from "shared/layout/main/main-layout";
import { ROUTES } from "shared/core/routes";

const RootRoutes = () => {
  return (
    <MainLayout>
      <Switch>
        <Route path={ROUTES.STANDARD} exact>
          <BasicWorker />
        </Route>
        <Route path={ROUTES.HAMSTER} exact>
          <Hamster />
        </Route>
        <Route path={ROUTES.COMLINK} exact>
          <Comlink />
        </Route>
        <Route>
          <BasicWorker />
        </Route>
      </Switch>
    </MainLayout>
  );
};

export default RootRoutes;

import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from './pages/Home';
import OfflineGame from "./pages/OfflineGame/index";
import ErrorGame from './pages/ErrorGame';


const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/offline" component={OfflineGame} />
      <Route path="/error" component={ErrorGame} />
    </Switch>
  );
};

export default Routes;
import { Route, Switch } from "react-router-dom";

import MemoryGame from './pages/MemoryGame';
import ProtectEggGame from './pages/ProtectEggGame';
import React from 'react'

function ErrorGame({ match }) {
  return (
    <Switch>
      <Route path={`${match.path}/1`} exact component={MemoryGame} /> 
      <Route path={`${match.path}/2`} exact component={ProtectEggGame} />
    </Switch>
  )
}

export default ErrorGame;

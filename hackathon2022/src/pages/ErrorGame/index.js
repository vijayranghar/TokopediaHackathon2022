import React from 'react'
import { Switch, Route } from "react-router-dom";

import MemoryGame from './pages/MemoryGame';
import Game2 from './pages/AryselGame';

function ErrorGame({ match }) {
  return (
    <Switch>
      <Route path={`${match.path}/1`} exact component={MemoryGame} /> 
      <Route path={`${match.path}/2`} exact component={Game2} />
    </Switch>
  )
}

export default ErrorGame

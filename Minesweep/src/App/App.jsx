import React from "react";
import styles from "./App.module.scss";
import AppLayout from "./AppLayout";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Home, FinishedGamesList, GameBoard } from "./modules";

function App() {
  return (
    <div className={styles.container}>
      <Router basename="/minesweep">
        <AppLayout />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={Home} />
          <Route path="/finished-games-list" component={FinishedGamesList} />
          <Route
            path="/game-board&difficulty=:difficulty&rows=:rows&columns=:columns&bombs=:bombs"
            component={GameBoard}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

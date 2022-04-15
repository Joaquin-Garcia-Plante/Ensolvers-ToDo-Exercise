import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailFolder from "./components/DetailFolder";
import EditTask from "./components/EditTask";
import Home from "./components/Home";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/folder/:id">
            <DetailFolder />
          </Route>
          <Route exact path="/editTask/:idFolder/:idTask">
            <EditTask />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

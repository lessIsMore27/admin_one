import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./views/Login";

function Routes () {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Login />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );  
}
export default Routes;


//Library imports
import React from "react";
import { Switch, Route } from "react-router-dom";

//Component imports
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/projects" component={Projects} />
    </Switch>
  );
};

export default Routes;

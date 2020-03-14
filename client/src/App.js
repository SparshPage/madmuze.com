import React, { Fragment } from "react";
import "./App.css";
import { Login } from "./auth/Login";
import { Navbar } from "./layout/Navbar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Register } from "./auth/Register";
import Landing from "./layout/Landing";

function App() {
  return (
    <div>
      <Router>
        <Fragment>
          <Navbar></Navbar>
          <Route exact path="/" component={Landing} />
          <section>
            <Switch>
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;

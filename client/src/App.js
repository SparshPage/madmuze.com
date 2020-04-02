import React, { Fragment, useEffect } from "react";
import "./App.css";
import Login from "./auth/Login";
import Navbar from "./layout/Navbar";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Register from "./auth/Register";
import Landing from "./layout/Landing";
import { loadUser } from "./actions/auth";
//redux
import store from "./store";
import { Provider } from "react-redux";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;

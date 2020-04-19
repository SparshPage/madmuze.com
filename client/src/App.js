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
import Strings from "./layout/Strings";
import AdmLogin from "./AdminViews/AdmLogin";
import Dashboard from "./layout/Dashboard";
import UploadProduct from "./AdminViews/UploadProduct";
import PrivateRoute from "./Routing/PrivateRoute";
import DetailProduct from "./layout/ProductDetailPage/DetailProduct";
import CartPage from "./layout/CartPage/CartPage";

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
              <Route path="/string" component={Strings} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <PrivateRoute path="/upload" component={UploadProduct} />
              <Route path="/product/:productId" component={DetailProduct} />
              <PrivateRoute path="/user/cart" component={CartPage} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

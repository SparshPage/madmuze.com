import React, { useEffect, useState } from "react";
import { loadUser } from "../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import DisplayProds from "./DisplayProds";

import { getProducts } from "../actions/products";

const Dashboard = ({ loadUser, auth: { user, isAuthenticated } }) => {
  const [Val, setVal] = useState();
  useEffect(() => {
    loadUser();
  }, []);
  console.log(user);

  if (user && user.isAdmin) {
    return <Redirect to="/upload" />;
  }

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  const handleFilters = (filters) => {
    console.log(filters);
    setVal(filters);
  };
  console.log(Val);

  return (
    <div>
      <DisplayProds
        isAuthenticated={isAuthenticated}
        filter={Val}
      ></DisplayProds>
    </div>
  );
};
Dashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser, getProducts })(Dashboard);

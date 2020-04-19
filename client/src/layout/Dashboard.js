import React, { useEffect, Render } from "react";
import { loadUser } from "../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import UploadProduct from "../AdminViews/UploadProduct";
import { Redirect } from "react-router-dom";
import DisplayProds from "./DisplayProds";

const Dashboard = ({ loadUser, auth: { user, isAuthenticated } }) => {
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

  return (
    <div>
      <div>
        <h2>Welcome {user && user.name}</h2>
      </div>
      <DisplayProds isAuthenticated={isAuthenticated}></DisplayProds>
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

export default connect(mapStateToProps, { loadUser })(Dashboard);

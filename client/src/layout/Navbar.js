import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import PropTypes from "prop-types";

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const guestLinks = (
    <ul id="nav-mobile" className="right ">
      <li>
        <Link to="/">Home</Link>{" "}
      </li>
      <li>
        <Link to="/register">Register</Link>{" "}
      </li>
      <li>
        <Link to="/login">Login</Link>{" "}
      </li>
    </ul>
  );

  const authLinks = (
    <ul id="nav-mobile" className="right ">
      <li>
        <a onClick={logout} href="/login">
          <i className="fas fa-sign-out-alt"></i> <span>logout</span>
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="nav-wrapper  teal lighten-3">
      <Link
        to="/dashboard"
        className="brand-logo center"
        style={{ textDecoration: "none" }}
      >
        MadMuze.com{" "}
      </Link>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);

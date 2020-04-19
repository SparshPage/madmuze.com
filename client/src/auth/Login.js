import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import { Redirect } from "react-router-dom";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const onchange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onsubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard"></Redirect>;
  }

  return (
    <div className="field" onSubmit={(e) => onsubmit(e)}>
      <div className="container center-align">
        <form className="white" style={{ fontSize: "30px" }}>
          <h5 className="grey-text darken-3 center-align">
            <i className="large  material-icons">person</i>
            <br />
            Sign In
          </h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              name="email"
              onChange={(e) => onchange(e)}
            ></input>
          </div>
          <div className="input-field">
            <label htmlFor="password">password</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={(e) => onchange(e)}
            ></input>
          </div>
          <div className="input-field">
            <button className="btn blue darken-2 z-depth-0">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

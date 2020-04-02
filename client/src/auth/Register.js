import React, { useState } from "react";
import { register } from "../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

export const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { name, email, password } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    register({ name, email, password });
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div>
      <div className="field">
        <div className="container  center-align">
          <form className="white" onSubmit={e => onSubmit(e)}>
            <h5 className="grey-text darken-3 center-align">
              <i className=" medium material-icons">person_add</i>
              <br />
              Sign Up
            </h5>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={e => onChange(e)}
              ></input>
            </div>
            <div className="input-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={e => onChange(e)}
              ></input>
            </div>

            <div className="input-field">
              <label htmlFor="password">password</label>
              <input
                type="password"
                id="password"
                value={password}
                name="password"
                onChange={e => onChange(e)}
              ></input>
            </div>
            <div className="input-field">
              <button className="btn blue darken-2 z-depth-0 align-center">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(Register);

import React from "react";

export const Login = () => {
  return (
    <div className="field">
      <div className="container center-align">
        <form className="white">
          <h5 className="grey-text darken-3 center-align">
            <i className="medium  material-icons">person</i>
            <br />
            Sign In
          </h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email"></input>
          </div>
          <div className="input-field">
            <label htmlFor="password">password</label>
            <input type="password" id="password"></input>
          </div>
          <div className="input-field">
            <button className="btn blue darken-2 z-depth-0">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

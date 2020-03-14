import React from "react";

export const Register = () => {
  return (
    <div>
      <div className="field">
        <div className="container">
          <form className="white">
            <h5 className="grey-text darken-3">
              Sign Up <i className="  material-icons">person</i>
            </h5>
            <div className="input-field">
              <label htmlFor="email">Email</label>
              <input type="email" id="email"></input>
            </div>
            <div className="input-field">
              <label htmlFor="name">Name</label>
              <input type="text" id="name"></input>
            </div>

            <div className="input-field">
              <label htmlFor="password">password</label>
              <input type="password" id="password"></input>
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { Link } from "react-router-dom";
export const Navbar = () => {
  return (
    <nav className="nav-wrapper blue darken-3">
      <ul id="nav-mobile" class="right hide-on-med-and-down">
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
    </nav>
  );
};

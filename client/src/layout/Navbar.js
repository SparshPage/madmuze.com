import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import PropTypes from "prop-types";
import logo2 from "../images/logo3.png";
import { Menu, Badge } from "antd";
import Icon from "@ant-design/icons";
import "antd/dist/antd.css";
import MenuItem from "antd/lib/menu/MenuItem";

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const guestLinks = (
    <Menu style={{ float: "right" }}>
      <Menu.Item>
        <Link to="/">Home</Link>{" "}
      </Menu.Item>
      <Menu.Item>
        <Link to="/register">Register</Link>{" "}
      </Menu.Item>
      <Menu.Item>
        <Link to="/login">Login</Link>{" "}
      </Menu.Item>
    </Menu>
  );

  const authLinks = (
    <Menu mode="horizontal" style={{ float: "right" }}>
      <Menu.Item key="cart">
        <Badge count="1" style={{ marginRight: 20 }}>
          <a href="/user/cart" style={{ marginRight: -30, color: "black" }}>
            <Icon
              type="shopping-cart"
              style={{
                fontSize: 30,
                marginBottom: 1,
                marginRight: 30,
                backgroundColor: "black",
              }}
            ></Icon>
          </a>
        </Badge>
      </Menu.Item>

      <Menu.Item key="logout">
        <a onClick={logout}>Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Menu className="menu">
      <div className="menu__container ">
        <h3 className="menu__logo ">MadMuze.com</h3>

        {!loading && (
          <Fragment className="right-align">
            {isAuthenticated ? authLinks : guestLinks}
          </Fragment>
        )}
      </div>
    </Menu>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);

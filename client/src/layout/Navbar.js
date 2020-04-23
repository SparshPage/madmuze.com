import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import PropTypes from "prop-types";
import logo2 from "../images/MadMuze.png";
import { Menu, Badge, Avatar } from "antd";
import Icon from "@ant-design/icons";
import "antd/dist/antd.css";
import IconMat from "@material-ui/core/Icon";
import "antd/dist/antd.css";

const Navbar = ({ logout, auth: { isAuthenticated, loading, user } }) => {
  const guestLinks = (
    <Menu style={{ float: "right" }} mode="horizontal">
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
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          float: "left",
          marginTop: "30px",
        }}
      >
        <Avatar alt={user && user.name} src={user && user.avatar} />
        {""}
        {""}
        <h5>Wlecome {user && user.name}</h5>
      </div>

      <Menu mode="horizontal" style={{ float: "right" }}>
        <Menu.Item key="cart">
          <Badge
            count={user && user.cart.length}
            style={{ marginRight: 3, marginTop: 10 }}
          >
            <a href="/user/cart" style={{ marginRight: -30, color: "black" }}>
              <i
                className="material-icons"
                style={{
                  alignItems: "center",
                  margin: "15px 15px 10px 10px",
                }}
              >
                local_grocery_store
              </i>
            </a>
          </Badge>
        </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logout}>Logout</a>
        </Menu.Item>
      </Menu>
    </React.Fragment>
  );

  return (
    <Menu className="menu">
      <div className="menu__container ">
        <a href="/dashboard">
          {" "}
          <img
            src={logo2}
            style={{ height: "100px", width: "250px", marginLeft: "25%" }}
          ></img>
        </a>

        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
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

import axios from "axios";
import {
  REGISTER_SUCCESS,
  AUTH_ERR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:1000/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: AUTH_ERR
    });
  }
};

//register user

export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(
      "http://localhost:1000/api/users",
      body,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    console.log(res.data);

    dispatch(loadUser());
  } catch (err) {
    alert(err);
  }
};

//login user
export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "http://localhost:1000/api/auth",
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    console.log(res.data);

    dispatch(loadUser());
  } catch (err) {
    alert(err);
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};

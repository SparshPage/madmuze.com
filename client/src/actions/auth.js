import axios from "axios";
import {
  REGISTER_SUCCESS,
  AUTH_ERR,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGOUT,
  ADM_LOGIN,
  ADMAUTH_ERR,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("http://localhost:1000/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
    console.log(res.data);
  } catch (err) {
    dispatch({
      type: AUTH_ERR,
    });
  }
};

//register user

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
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
      payload: res.data,
    });
    console.log(res.data);

    dispatch(loadUser());
  } catch (err) {
    alert(err);
  }
};

//login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
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
      payload: res.data,
    });
    console.log(res.data);

    dispatch(loadUser());
  } catch (err) {
    alert(err);
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const adminLogin = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      ContentType: "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      "http://localhost:1000/api/adminAuth",
      body,
      config
    );

    dispatch({
      type: ADM_LOGIN,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    alert(err);
    dispatch({
      type: ADMAUTH_ERR,
    });
  }
};

export const addToCart = (id) => async (dispatch) => {
  const request = await axios
    .get(`http://localhost:1000/api/users/addToCart?productId=${id}`)
    .then((response) => response.data);

  dispatch({
    type: ADD_TO_CART,
    payload: request,
  });
};

export const getCartItems = (cartItems, userCart) => async (dispatch) => {
  const request = await axios
    .get(
      `http://localhost:1000/api/products/product_by_id?id=${cartItems}&type=array `
    )
    .then((response) => {
      var data = JSON.stringify(response.data);

      userCart.forEach((cartItem) => {
        response.data.forEach((productDetail, i) => {
          console.log(cartItem, productDetail);

          if (cartItem.id === productDetail._id._id) {
            response.data[i].quantity = cartItem.quantity;
          }
        });
      });

      return response.data;
    });

  dispatch({
    type: GET_CART_ITEMS,
    payload: request,
  });
};

export const removeCartItem = (id) => async (dispatch) => {
  const request = await axios
    .get(`http://localhost:1000/api/users/removeFromCart?_id=${id} `)
    .then((response) => {
      response.data.cart.forEach((item) => {
        response.data.cartDetail.forEach((k, i) => {
          if (item.id == k.id) {
            response.data.cartDetail[i].quantity = item.quantity;
          }
        });
      });

      return response.data;
    });

  dispatch({
    type: REMOVE_CART_ITEM,
    payload: request,
  });
};

export function onSuccessBuy(data) {
  return {
    type: ON_SUCCESS_BUY,
    payload: data,
  };
}

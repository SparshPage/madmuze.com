import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ADMAUTH_ERR,
  ADM_LOGIN,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case ADM_LOGIN:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ADMAUTH_ERR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case ADD_TO_CART:
      return {
        ...state,
        user: {
          ...state.user,
          cart: payload,
        },
      };
    case GET_CART_ITEMS:
      return {
        ...state,
        cartDetail: payload,
      };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartDetail: payload.cartDetail,
        user: {
          ...state.user,
          cart: payload.cart,
        },
      };
    case ON_SUCCESS_BUY:
      return {
        ...state,
        user: {
          ...state.user,
          cart: payload.cart,
        },
        cartDetail: payload.cartDetail,
      };

    default:
      return state;
  }
}

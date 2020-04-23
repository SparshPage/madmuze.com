import { GET_PRODUCTS, PROD_ERR } from "./types";
import axios from "axios";

export const getProducts = (vars) => async (dispatch) => {
  try {
    const res = await axios.post("http://localhost:1000/api/products", vars);
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: PROD_ERR,
      payload: { msg: err.json },
    });
  }
};

import { GET_PRODUCTS, PROD_ERR } from "./types";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:1000/api/products");
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

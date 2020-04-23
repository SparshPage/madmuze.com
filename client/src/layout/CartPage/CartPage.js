import React, { useEffect, useState } from "react";
import Item from "antd/lib/list/Item";
import Axios from "axios";
import { useDispatch, connect } from "react-redux";
import { getCartItems, removeCartItem, onSuccessBuy } from "../../actions/auth";
import PropTypes from "prop-types";
import { loadUser } from "../../actions/auth";
import UserCardBlock from "./Sections/UserCardBlock";
import { Result, Empty } from "antd";
import StripeCheckout from "react-stripe-checkout";
import { TransactionOutlined } from "@ant-design/icons";

const CartPage = (props) => {
  const dispatch = useDispatch();
  const [Total, setTotal] = useState(0);
  const [showTotal, setShowTotal] = useState(false);
  const [showSuccess, setshowSuccess] = useState(false);

  useEffect(() => {
    console.log(props.user && props.user.cart);

    let cartItems = [];
    if (props.user && props.user.cart) {
      if (props.user.cart.length > 0) {
        props.user.cart.forEach((item) => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, props.user.cart));
        console.log("cartItems", cartItems);
      }
    }
  }, [props.user]);

  useEffect(() => {
    if (props.cartDetail && props.cartDetail.length > 0) {
      calculateTotal(props.cartDetail);
    }
  }, [props.cartDetail]);

  const calculateTotal = (cartDetail) => {
    let total = 0;
    cartDetail.map((item) => {
      total += parseInt(item.price, 10) * parseInt(item.quantity, 10);
    });

    setTotal(total);
    setShowTotal(true);
  };

  const removeFromCart = (productId) => {
    dispatch(removeCartItem(productId)).then(() => {
      Axios.get("http://localhost:1000/api/users/userCartInfo").then(
        (response) => {
          if (response.data.succcess) {
            if (response.data.cartDetail.length <= 0) {
              setShowTotal(false);
            } else {
              calculateTotal(response.data.cartDetail);
            }
          } else {
            alert("fuck");
          }
        }
      );
    });
  };

  const handleToken = (token) => {
    console.log(token);
    let variables = {
      cartDetail: props.cartDetail,
      token: token,
    };
    Axios.post("http://localhost:1000/api/users/successBuy", variables).then(
      (response) => {
        if (response.data.succcess) {
          setshowSuccess(true);
          setShowTotal(false);

          dispatch(
            onSuccessBuy({
              cart: response.data.cart,
              cartDetail: response.data.cartDetail,
            })
          );
        } else {
          alert(response.data.err);
        }
      }
    );
  };
  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h1>My Cart</h1>
      <div>
        <UserCardBlock
          products={props.cartDetail && props.cartDetail}
          removeItem={removeFromCart}
        ></UserCardBlock>

        {showTotal ? (
          <div style={{ marginTop: "3rem" }}>
            <h3>Total amount: ${Total}</h3>
          </div>
        ) : showSuccess ? (
          <Result status="success" title="successfully purchased items" />
        ) : (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <br />
            <Empty description="Empty" />
            <p>No items in cart</p>
          </div>
        )}
      </div>
      <StripeCheckout
        stripeKey="pk_test_6uxhoucDz36NccEy5NWq5whN00sdMGOd93"
        token={handleToken}
        billingAddress
        shippingAddress
        amount={Total}
      ></StripeCheckout>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);

  return {
    user: state.auth.user,
    cartDetail: state.auth.cartDetail,
  };
};

export default connect(mapStateToProps, { loadUser })(CartPage);

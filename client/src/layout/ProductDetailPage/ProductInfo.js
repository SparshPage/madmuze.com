import React, { useEffect } from "react";
import { Button, Descriptions } from "antd";
import PropTypes from "prop-types";
import { loadUser } from "../../actions/auth";
import { connect } from "react-redux";

const ProductInfo = (props, isAuthenticated) => {
  // if (!props.detail) {
  //   alert("This shit empty");
  // }
  console.log(props.detail._id);

  const addToCartHandler = () => {
    if (!props.isAuthenticated) {
      alert("Please Log in first");
    }

    props.addToCart(props.detail._id._id);
  };

  return (
    <div>
      <Descriptions title="product-info">
        <Descriptions.Item label="price">
          {props.detail && props.detail.price}
        </Descriptions.Item>
        <Descriptions.Item label="Quantity">
          {props.detail.quant}
        </Descriptions.Item>
        <Descriptions.Item label="type">
          {props.detail && props.detail.type}
        </Descriptions.Item>
        <Descriptions.Item label="Description"></Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          size="large"
          shape="round"
          type="danger"
          onClick={addToCartHandler}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

ProductInfo.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(ProductInfo);

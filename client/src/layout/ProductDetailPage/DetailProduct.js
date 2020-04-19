import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";
import { addToCart } from "../../actions/auth";
import Axios from "axios";
import { useDispatch } from "react-redux";

const DetailProduct = (props) => {
  const ProductId = props.match.params.productId;
  const [Product, setProduct] = useState([]);
  const Dispatch = useDispatch();

  console.log(ProductId);

  const getprod = async () => {
    try {
      const res = await Axios.get(
        `http://localhost:1000/api/products/product_by_id?id=${ProductId}&type=single`
      );
      console.log(res.data[0]);
      // console.log(res.data.category);

      setProduct(res.data[0]);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getprod();
  }, []);

  const addToCartHandler = (ProductId) => {
    Dispatch(addToCart(ProductId));
  };

  return (
    <div
      div
      className="postPage"
      style={{ width: "100%", padding: "3rem 4rem" }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>{Product && Product.name}</h2>
      </div>

      <br />

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <ProductImage detail={Product}></ProductImage>
        </Col>
        <Col lg={12} xs={24}>
          <ProductInfo
            detail={Product}
            addToCart={addToCartHandler}
          ></ProductInfo>
        </Col>
      </Row>
    </div>
  );
};

export default DetailProduct;

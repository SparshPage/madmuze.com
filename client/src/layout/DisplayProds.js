import React, { useEffect, useState } from "react";
import { Icon, Col, Card, Row, Checkbox, Collapse, Radio } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProducts } from "../actions/products";
import CheckBox from "./CheckBox";
import RadioBox from "./RadioBox";
const { Meta } = Card;

const DisplayProds = ({ getProducts, products }, props) => {
  useEffect(() => {
    getProducts();
  }, []);

  const [Filters, setFilters] = useState({
    ProductCategories: [],
    price: [],
  });
  const renderCards = products.products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <div key={index}>
              <a href={`/product/${product._id}`}>
                <img
                  style={{ width: "100%", maxHeight: "150px" }}
                  src={`http://localhost:1000/${product.image}`}
                ></img>
              </a>
            </div>
          }
        >
          <Meta title={product.name} description={`$${product.price}`}>
            {" "}
          </Meta>
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    getProducts(filters);
  };

  const handleFilters = (filters, categoty) => {
    console.log(filters);
    const newFilters = { ...Filters };
    console.log(newFilters);

    newFilters[categoty] = filters;
    if (categoty === "price") {
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  return (
    <div
      style={{
        width: "75%",
        margin: "3rem aut0",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "3rem",
        marginLeft: "6.5rem",
      }}
    >
      <div style={{ marginLeft: "19rem" }}>
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            <CheckBox
              handleFilters={(filters) => handleFilters(filters, "category")}
              style={{ marginLeft: "20px" }}
            />
          </Col>
          <Col lg={12} xs={24}>
            <RadioBox
              handleFilters={(filters) => handleFilters(filters, "category")}
            ></RadioBox>
          </Col>
        </Row>
      </div>

      {products.length === 0 && products.products.quant > 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <br />
          <br />
          <h2>Unable to load products</h2>
        </div>
      ) : (
        <div style={{ justifyContent: "center", marginLeft: "20%" }}>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>Load More</button>
      </div>
    </div>
  );
};

DisplayProds.propTypes = {
  getProducts: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps, { getProducts })(DisplayProds);

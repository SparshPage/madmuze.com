import React, { useEffect } from "react";
import { Icon, Col, Card, Row } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProducts } from "../actions/products";
const { Meta } = Card;

const DisplayProds = ({ getProducts, products }) => {
  useEffect(() => {
    getProducts();
  }, []);

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

  return (
    <div style={{ width: "75%", margin: "3rem aut0" }}>
      <div style={{ textAlign: "center" }}>
        <h2>Our Products</h2>
      </div>

      {products.length === 0 ? (
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

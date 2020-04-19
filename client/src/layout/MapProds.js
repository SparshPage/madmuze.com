import React, { Component } from "react";

export class MapProds extends Component {
  render() {
    return this.props.products.products.map((product) => (
      <section className="Products">
        <div className="row">
          <div className="column">
            <div className="Products-card">
              <div className="Products-image">
                <img src={product.image}></img>
                <br />
              </div>
              <div className="Products-info">
                <p>$ {product.price}</p>
                <p>{product.name}</p>
              </div>
              <button type="button"> ADD TO CART </button>
            </div>
          </div>
        </div>
      </section>
    ));
  }
}

export default MapProds;

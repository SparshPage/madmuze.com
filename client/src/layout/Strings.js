import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getProducts } from "../actions/products";
import electric from "../images/electric.jpg";
import acoustic from "../images/acoustic.jpg";
import bass from "../images/basss.jpg";

import DisplayProds from "./DisplayProds";

const Strings = () => {
  return (
    <div>
      <div
        id="myCarousel"
        className="carousel slide"
        data-ride="carousel"
        style={{ height: "700px", width: "100%", maxHeight: "700px" }}
      >
        <ol className="carousel-indicators">
          <li
            data-target="#myCarousel"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>
        </ol>

        <div className="carousel-inner">
          <div className="item active">
            <img src={electric} alt="Los Angeles" className="d-block w-100" />
            <div className=" captn carousel-caption d-none d-md-block">
              <button className="carBtn">Electric Guitars</button>
            </div>
          </div>

          <div className="item">
            <img src={acoustic} alt="Chicago" className="d-block w-100" />
            <div className=" captn carousel-caption d-none d-md-block">
              <button className="carBtn">acoustic Guitars</button>
            </div>
          </div>

          <div className="item">
            <img src={bass} alt="New York" className="d-block w-100" />
            <div className=" captn carousel-caption d-none d-md-block">
              <button className="carBtn">Bass guitars</button>
            </div>
          </div>
        </div>

        <a
          className="left carousel-control"
          href="#myCarousel"
          data-slide="prev"
        >
          <span className="glyphicon glyphicon-chevron-left"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="right carousel-control"
          href="#myCarousel"
          data-slide="next"
        >
          <span className="glyphicon glyphicon-chevron-right"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      <DisplayProds></DisplayProds>
    </div>
  );
};

export default Strings;

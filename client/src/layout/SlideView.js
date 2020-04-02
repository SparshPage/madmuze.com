import React, { Component } from "react";
import img1 from "../images/offer1.jpg";
import img2 from "../images/images.jpeg";

export class SlideView extends Component {
  render() {
    return (
      <div>
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li
              data-target="#myCarousel"
              data-slide-to="0"
              className="active"
            ></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>

          <div className="carousel-inner" style={{ marginTop: "100px" }}>
            <div className="item active">
              <img src={img1} alt="Los Angeles" />
            </div>

            <div className="item">
              <img src={img2} alt="Chicago" />
            </div>

            <div className="item">
              <img src={img1} alt="New York" />
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
      </div>
    );
  }
}

export default SlideView;

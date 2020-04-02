import React from "react";
import thumb from "../images/images.jpeg";
import drums from "../images/drums.png";
import sax from "../images/sax.jpg";
import synth from "../images/synth.jpeg";

const Categories = () => {
  return (
    <div className="categories card-panel  lighten-2 ">
      <h3 style={{ color: "White" }} className="center-align">
        OUR PRODUCTS
      </h3>
      <div className="card-container ">
        <div className="catCard col s2  card panel  z-depth-4 ">
          <img
            src={thumb}
            className="circle responsive-image"
            style={{ height: "80px", width: "80px" }}
          ></img>
          <span className="label">String Instruments</span>
        </div>
        <div className="catCard col s2  card panel  z-depth-4 ">
          <img
            src={drums}
            className="circle responsive-image"
            style={{ height: "80px", width: "80px" }}
          ></img>
          <span className="label">Percussion</span>
        </div>
        <div className="catCard col s2  card panel  z-depth-4 ">
          <img
            src={sax}
            className="circle responsive-image"
            style={{ height: "80px", width: "80px" }}
          ></img>
          <span className="label">Wind Instruments</span>
        </div>
        <div className="catCard col s2  card panel  z-depth-4 ">
          <img
            src={synth}
            className="circle responsive-image"
            style={{ height: "80px", width: "80px" }}
          ></img>
          <span className="label">Synths and Pianos</span>
        </div>
      </div>
    </div>
  );
};

export default Categories;

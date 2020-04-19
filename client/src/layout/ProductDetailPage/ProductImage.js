import React from "react";

const ProductImage = (props) => {
  return (
    <div>
      <img src={`http://localhost:1000/${props.detail.image}`}></img>
    </div>
  );
};

export default ProductImage;

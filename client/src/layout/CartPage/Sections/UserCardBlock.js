import React from "react";
import { Button } from "antd";

const UserCardBlock = (props) => {
  console.log("cartItemsss: ", props.products && props.products);

  const renderItems = () =>
    props.products &&
    props.products.map((product) => (
      <tr key={product._id}>
        <td>
          <img
            style={{ width: "70px" }}
            alt="product"
            src={`http://localhost:1000/${product.image}`}
          ></img>
        </td>

        <td>{product.quantity} EA</td>
        <td> {product.price} </td>
        <td>
          <Button onClick={() => props.removeItem(product._id._id)}>
            {" "}
            Remove
          </Button>
        </td>
      </tr>
    ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Remove from Cart</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );
};

export default UserCardBlock;

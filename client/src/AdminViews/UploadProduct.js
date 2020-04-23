import React, { useState } from "react";
import Select from "react-select";
import FileUpload from "../utils/FileUpload";
import Axios from "axios";

const categories = [
  { key: 1, value: "String" },
  { key: 2, value: "Percussion" },
  { key: 3, value: "Wind" },
  { key: 4, value: "Synths" },
];

const UploadProduct = (props) => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    description: "",
    price: 0,
    quant: 0,
    category: "",
  });
  const [Image, setImage] = useState([]);

  const { name, description, price, quant, category } = formData;
  const onchange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onsubmit = async (e) => {
    e.preventDefault();
    const variables = {
      name: name,
      type: description,
      price: price,
      quant: quant,
      category: category,
      image: Image,
    };

    try {
      await Axios.post("http://localhost:1000/api/Admin", variables);
    } catch (err) {
      alert(err);
    }
  };
  const updateImage = (newImage) => {
    console.log(newImage);

    setImage(newImage);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h2>Upload Products</h2>
      </div>

      <form onSubmit={onsubmit}>
        {/*DropZone */}
        <FileUpload refreshFunction={updateImage} />

        <br />
        <br />

        <label>Title</label>
        <input onChange={(e) => onchange(e)} value={name} name="name"></input>

        <br />
        <br />

        <label>Description</label>
        <textarea
          onChange={(e) => onchange(e)}
          value={description}
          name="description"
        ></textarea>

        <br />
        <br />

        <label>Price</label>
        <input
          onChange={(e) => onchange(e)}
          value={price}
          type="number"
          name="price"
        ></input>

        <label>Stock</label>
        <input
          onChange={(e) => onchange(e)}
          value={quant}
          name="quant"
          type="number"
        ></input>
        <br />
        <br />
        <div className="input-field ">
          <select
            onChange={(e) => onchange(e)}
            name="category"
            className="browser-default"
          >
            {categories.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
        </div>

        <br />
        <br />

        <button onClick>Submit</button>
      </form>
    </div>
  );
};

export default UploadProduct;

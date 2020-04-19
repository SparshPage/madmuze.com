import React, { useState } from "react";
import DropZone from "react-dropzone";
import { PlusOutlined as Icon } from "@ant-design/icons";
import axios from "axios";

const FileUpload = (props) => {
  const [Image, setImage] = useState([]);

  const onDrop = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("image", file);
    console.log(file);

    try {
      const response = await axios.post(
        "http://localhost:1000/api/Admin/uploadImage",
        formData,
        config
      );
      console.log(response.data);

      setImage(response.data.image);
      props.refreshFunction(response.data.image);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div
        style={{
          width: "300px",
          height: "240px",
          border: "1px solid lightgray",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input type="file" onChange={onDrop} />
        <Icon style={{ fontSize: "3rem" }} />
      </div>

      <div
        style={{
          display: "flex",
          width: "350px",
          height: "240px",
          overflowX: "scroll",
        }}
      >
        <div>
          <img
            style={{ minWidth: "300px", width: "300px", height: "240px" }}
            src={`http://localhost:1000/${Image}`}
            alt={"fuck"}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;

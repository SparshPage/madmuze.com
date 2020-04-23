import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

const ProductCategories = [
  {
    _id: 1,
    name: "String",
  },
  {
    _id: 2,
    name: "Percussion",
  },
  {
    _id: 3,
    name: "Wind",
  },
  {
    _id: 4,
    name: "Synths",
  },
];

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckBox = () =>
    ProductCategories.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          type="checkbox"
          checked={Checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));
  return (
    <div>
      <Collapse defaultActiveKey={[0]}>
        <Panel header="Categories" key="1">
          {renderCheckBox()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;

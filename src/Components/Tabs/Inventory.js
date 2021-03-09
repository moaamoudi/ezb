import React, { useState, useEffect } from "react";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import PopUpProducts from "../PopUpProducts";
export default function Inventory() {
  const [Selected, setSelected] = useState("");
  useEffect(() => {}, [Selected]);
  return (
    <div>
      <div style={{ display: "inline-flex" }}>
        <p className="ml-3">Products</p>
        <div style={{ position: "absolute" ,right:"50px"}}>
        <PopUpProducts />
      </div>
      </div>
      

      <div className="text-center">
        <DropdownButton
          as={ButtonGroup}
          key="right"
          id={`dropdown-button-drop-right`}
          drop="right"
          variant="secondary"
          title={`Sort ${Selected}`}
        >
          <Dropdown.Item
            eventKey="1"
            onSelect={() => setSelected("Best Selling")}
          >
            Best Selling
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="2"
            onSelect={() => setSelected("Alphabatical")}
          >
            Alphabatical
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  ButtonGroup,
  Container,
  Dropdown,
  DropdownButton,
  Card,
  Button,
} from "react-bootstrap";

import { useAuth } from "../../Context/AuthContext";
import PopUpProducts from "../PopUpProducts";
export default function Inventory() {
  const [Selected, setSelected] = useState("");
  const { selectedProjectInventory, sortInventory } = useAuth();

  function handleClick(prod) {}

  function handleSelect(sort) {
    setSelected(sort);
    let temp = selectedProjectInventory;
    switch (sort) {
      case "Best Selling":
        temp = temp.sort(sortBestSelling);
        sortInventory(temp);
        break;
      case "Alphabetical":
        temp = temp.sort(sortAlphabetical);
        sortInventory(temp);
        break;
      case "Highest Price":
        temp = temp.sort(sortHighestPrice);
        sortInventory(temp);
        break;
      case "Lowest Price":
        temp = temp.sort(sortLowestPrice);
        sortInventory(temp);
        break;
      case "Most Quantity":
        temp = temp.sort(sortMostQuantity);
        sortInventory(temp);
        break;
      case "Least Quantity":
        temp = temp.sort(sortLeastQuantity);
        sortInventory(temp);
        break;

      default:
        break;
    }

    // if (sort === "Best Selling") {
    //   temp = temp.sort(sortBestSelling);
    // } else if (sort === "Alphabetical") {
    //   temp = temp.sort(sortAlphabetical);
    // } else if (sort === "Highest Price") {
    //   temp = temp.sort(sortHighestPrice);
    // } else if (sort === "Lowest Price") {
    //   temp = temp.sort(sortLowestPrice);
    // } else if (sort === "Most Quantity") {
    //   temp = temp.sort(sortMostQuantity);
    // } else if (sort === "Least Quantity") {
    //   temp = temp.sort(sortLeastQuantity);
    // }
  }

  function sortBestSelling(a, b) {
    if (
      a.productSellingPrice * a.productUnitsSold <
      b.productSellingPrice * b.productUnitsSold
    )
      return 1;
    if (
      a.productSellingPrice * a.productUnitsSold >
      b.productSellingPrice * b.productUnitsSold
    )
      return -1;

    return 0;
  }

  function sortAlphabetical(a, b) {
    const bandA = a.productName.toUpperCase();
    const bandB = b.productName.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  }

  function sortHighestPrice(a, b) {
    if (a.productPrice > b.productPrice) return 1;
    if (a.productPrice < b.productPrice) return -1;

    return 0;
  }

  function sortLowestPrice(a, b) {
    if (a.productPrice < b.productPrice) return 1;
    if (a.productPrice > b.productPrice) return -1;

    return 0;
  }

  function sortMostQuantity(a, b) {
    if (a.productQuantity > b.productQuantity) return 1;
    if (a.productQuantity < b.productQuantity) return -1;

    return 0;
  }

  function sortLeastQuantity(a, b) {
    if (parseInt(a.productQuantity) > parseInt(b.productQuantity)) return 1;
    if (parseInt(b.productQuantity) < parseInt(a.productQuantity)) return -1;

    return 0;
  }

  useEffect(() => {}, [Selected]);
  return (
    <div>
      <div style={{ display: "inline-flex" }}>
        <h4 className="ml-3">Products</h4>
        <div style={{ position: "absolute", right: "50px" }}>
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
            onSelect={() => handleSelect("Alphabetical")}
          >
            Alphabatical
          </Dropdown.Item>

          <Dropdown.Item
            eventKey="2"
            onSelect={() => {
              handleSelect("Best Selling");
            }}
          >
            Best Selling
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="3"
            onSelect={() => {
              handleSelect("Highest Price");
            }}
          >
            Highest Price
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="4"
            onSelect={() => {
              handleSelect("Lowest Price");
            }}
          >
            Lowest Price
          </Dropdown.Item>
          <Dropdown.Item
            eventKey="5"
            onSelect={() => {
              handleSelect("Most Quantity");
            }}
          >
            Most Quantity
          </Dropdown.Item>

          <Dropdown.Item
            eventKey="6"
            onSelect={() => {
              handleSelect("Least Quantity");
            }}
          >
            Least Quantity
          </Dropdown.Item>
        </DropdownButton>

        <Container fluid style={{ width: "100%", height: "100%" }}>
          <div
            className="text-center"
            style={{ overflow: "auto", height: "900px" }}
          >
            <div className="container-fluid ">
              <div className="row justify-content-center">
                {selectedProjectInventory.length>0?selectedProjectInventory.map((prod) => (
                  <Card
                    style={{
                      width: "250px",
                      height: "350px",
                      margin: "25px",
                      padding: "10px",
                    }}
                  >
                    <div className="mb-2">
                      <h2>{prod.productName}</h2>
                    </div>
                    <div className="mb-2">
                      <h5>Quantity: {prod.productQuantity}</h5>
                    </div>
                    <div className="mb-2">
                      <h5>Price: ${prod.productPrice}</h5>
                    </div>
                    <div className="mb-2">
                      <h5>Selling Price: ${prod.productSellingPrice}</h5>
                    </div>
                    <div className="mb-2">
                      <h5>Units Sold: {prod.productUnitsSold}</h5>
                    </div>
                    <div className="mb-3">
                      <h5>
                        Profit: $
                        {prod.productUnitsSold * prod.productSellingPrice}
                      </h5>
                    </div>
                    <div className="mt-3">
                      <Button
                        style={{ width: "50%" }}
                        onClick={() => handleClick(prod)}
                      >
                        Edit
                      </Button>
                    </div>
                  </Card>
                )):<div>{"<<loading>"}</div>}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

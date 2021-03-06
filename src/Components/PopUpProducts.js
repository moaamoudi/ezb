import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import { Form, Button, Card } from "react-bootstrap";
import React, { useRef } from "react";

import "react-google-flight-datepicker/dist/main.css";

import "./styles/PopUp.css";

export default function PopUpProducts(props) {
  const ProductName = useRef();
  const ProductPrice = useRef();
  const ProductSellingPrice = useRef();
  const ProductQuantity = useRef();
  const Productsold = useRef();

  const { insertProductToFirestore } = useAuth();

  function handleSubmit() {
    const name = ProductName.current.value;
    const price = ProductPrice.current.value;
    const sellingP = ProductSellingPrice.current.value;
    const quantity = ProductQuantity.current.value;
    const sold = Productsold.current.value;

    insertProductToFirestore(name, price, sellingP, quantity, sold);
  }

  return (
    <Popup
      trigger={<Button disabled={!props.checkOwner()}> Add Product</Button>}
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card className="main-shadow" style={{ width: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Add Product</h2>
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            <Form>
              <Form.Group id="ProductName">
                <Form.Label>Product Name:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={ProductName}
                  required
                  className="form-control button-bg "
                />
              </Form.Group>

              <Form.Group id="ProductPrice">
                <Form.Label>Product Price:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={ProductPrice}
                  required
                  className="form-control button-bg"
                />
              </Form.Group>
              <Form.Group id="ProductSPrice">
                <Form.Label>Product Selling Price:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={ProductSellingPrice}
                  required
                  className="form-control button-bg"
                />
              </Form.Group>
              <Form.Group id="ProductQuantity">
                <Form.Label>Product Quantity:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={ProductQuantity}
                  required
                  className="form-control button-bg"
                />
              </Form.Group>
              <Form.Group id="Productsold">
                <Form.Label>Units Sold:</Form.Label>
                <Form.Control
                  type="Name"
                  ref={Productsold}
                  required
                  className="form-control button-bg"
                />
              </Form.Group>
              <div className="text-center">
                <Button
                  className="w-50  mt-3"
                  onClick={() => {
                    handleSubmit();
                    close();
                  }}
                >
                  Add
                </Button>
              </div>
              <div className="text-center">
                <Button
                  className="w-50  mt-3"
                  onClick={() => {
                    close();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Popup>
  );
}

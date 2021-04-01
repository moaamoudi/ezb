import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useAuth } from "../Context/AuthContext";
import { Form, Button, Card } from "react-bootstrap";
import React, { useRef } from "react";
import "react-google-flight-datepicker/dist/main.css";
import "./styles/PopUp.css";

export default function PopUpProductDetails(props) {
  const name = useRef();
  const quantity = useRef();
  const price = useRef();
  const sellingPrice = useRef();
  const units = useRef();
  const { updateProduct } = useAuth();

  function handleSubmit() {
    updateProduct(
      props.prod.id,
      name.current.value,
      quantity.current.value,
      price.current.value,
      sellingPrice.current.value,
      units.current.value
    );
    props.handleSelect("Alphabetical");
  }

  return (
    <Popup
      trigger={<Button>Edit</Button>}
      position="center center"
      modal
      nested
    >
      {(close) => (
        <Card className="main-shadow" style={{ width: "400px" }}>
          <Card.Body>
            <h2 className="text-center mb-4">Add Note</h2>
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            <Form>
              <Form.Group id="Name">
                <Form.Label>Product Name:</Form.Label>
                <Form.Control
                  type="string"
                  ref={name}
                  defaultValue={props.prod.productName}
                  required
                  className="form-control button-bg "
                />
              </Form.Group>
              <Form.Group id="Quantity">
                <Form.Label>Product Quantity:</Form.Label>
                <Form.Control
                  type="string"
                  ref={quantity}
                  defaultValue={props.prod.productQuantity}
                  required
                  className="form-control button-bg "
                />
              </Form.Group>
              <Form.Group id="price">
                <Form.Label>Product Price:</Form.Label>
                <Form.Control
                  type="string"
                  ref={price}
                  defaultValue={props.prod.productPrice}
                  required
                  className="form-control button-bg "
                />
              </Form.Group>
              <Form.Group id="sellingPrice">
                <Form.Label>Product Selling Price:</Form.Label>
                <Form.Control
                  type="string"
                  ref={sellingPrice}
                  defaultValue={props.prod.productSellingPrice}
                  required
                  className="form-control button-bg "
                />
              </Form.Group>
              <Form.Group id="units">
                <Form.Label>Units Sold:</Form.Label>
                <Form.Control
                  type="string"
                  ref={units}
                  defaultValue={props.prod.productUnitsSold}
                  required
                  className="form-control button-bg "
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
                  Save
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

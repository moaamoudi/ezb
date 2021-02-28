import React from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import "../styles/npv.css";
export default function NPV() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>
        <Form className="form">
          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text>Initial investment:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="inlineFormInputGroup"
              placeholder="Ex:200000000$"
            />
            <InputGroup.Prepend>
              <Form.Control
                style={{ marginLeft: "10px" }}
                as="select"
                className="mr-sm-2"
                id="inlineFormCustomSelect"
                custom
                required
              >
                <option value="0">Currency</option>
                <option value="1">SR</option>
                <option value="2">POUND</option>
                <option value="3">DOLLAR</option>
              </Form.Control>
            </InputGroup.Prepend>
          </InputGroup>
          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text>Discount Rate:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="inlineFormInputGroup" placeholder="Ex:20%" />
            <InputGroup.Prepend className="mr-2">
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
          <Form.Label>Cash Flow:</Form.Label>
          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text>Year 1: $</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="inlineFormInputGroup"
              placeholder="Ex: 200,000,000/200000000"
            />
            <InputGroup.Prepend>
              <Button>x</Button>
            </InputGroup.Prepend>
          </InputGroup>
          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text>Year 1: $</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="inlineFormInputGroup"
              placeholder="Ex: 200,000,000/200000000"
            />
            <InputGroup.Prepend>
              <Button>x</Button>
            </InputGroup.Prepend>
          </InputGroup>

          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text>Year 1: $</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="inlineFormInputGroup"
              placeholder="Ex: 200,000,000/200000000"
            />
            <InputGroup.Prepend>
              <Button style={{ borderRadius: "4px" }}>X</Button>
            </InputGroup.Prepend>
          </InputGroup>

          <div className="text-center">
            <Button
              variant="light"
              className="w-50 button-bg mt-3"
              type="submit"
            >
              Calculate
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

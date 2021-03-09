import { set, setYear } from "date-fns";
import React, { useState, useEffect, useRef } from "react";
import { Form, Button, InputGroup, FormControl } from "react-bootstrap";
import "../styles/npv.css";
export default function NPV() {
  const Future = useRef();
  const Discount = useRef();
  const firstYear = useRef();
  const secYear = useRef();
  const thirdYear = useRef();
  const forthYear = useRef();
  const fifthYear = useRef();
  const [NPV , setNpv]  =useState(0);
  function calculateNpv() {
    var valArr=[firstYear.current.value,secYear.current.value,
      thirdYear.current.value,forthYear.current.value,fifthYear.current.value]
    var npv=0
    
    const disc=Discount.current.value/100
      for (let index = 0; index < valArr.length; index++) {
        if(valArr[index]>0){
          npv+=valArr[index]/(Math.pow((disc+1),(index+1)))
          
        }
        
      }
      npv=npv-Future.current.value;
      
      setNpv(npv.toFixed(2));
     
  }
useEffect(() => {
  
}, [NPV])
function handleSubmit(e){
  e.preventDefault();
  calculateNpv();
}

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="text-center">
        <Form className="form" 
        onSubmit={handleSubmit}
        >
          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text>Initial investment:</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="inlineFormInputGroup"
              placeholder="Ex:200000000$"
              ref={Future}
              required
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
            <FormControl id="inlineFormInputGroup" placeholder="Ex:20%" ref={Discount} required />
            <InputGroup.Prepend className="mr-2">
              <InputGroup.Text>%</InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
          <Form.Label>Cash Flow:</Form.Label>
          {/* Years start------------------------------------------------ */}
          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text>Year 1: $</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="inlineFormInputGroup"
              placeholder="Ex:200000000"
              ref={firstYear}
              required
            />
          </InputGroup>
          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text>Year 2: $</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="inlineFormInputGroup"
              placeholder="Ex:200000000"
              ref={secYear}
            />
          </InputGroup>
          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text>Year 3: $</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="inlineFormInputGroup"
              placeholder="Ex:200000000"
              ref={thirdYear}
            />
          </InputGroup>
          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text>Year 4: $</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="inlineFormInputGroup"
              placeholder="Ex:200000000"
              ref={forthYear}
            />
          </InputGroup>
          <InputGroup className="mb-2">
            <InputGroup.Prepend>
              <InputGroup.Text>Year 5: $</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              id="inlineFormInputGroup"
              placeholder="Ex:200000000"
              ref={fifthYear}
            />
          </InputGroup>
          {/* Years Ends------------------------------------------------ */}
          <div className="text-center">
            <Button
              variant="light"
              className="w-50 button-bg mt-3"
              type="submit"
            >
              Calculate
            </Button>
          </div>
          <div><p>NPV:{NPV}</p></div>
          
        </Form>
        
      </div>
      
    </div>
  );
}

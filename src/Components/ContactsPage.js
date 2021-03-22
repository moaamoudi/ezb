import React, { useState } from "react";
import "./styles/ContactsPage.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Card, Button, Col, Container, Row } from "react-bootstrap";
import PopUpAddEmployee from "./PopUpAddEmployee";
import PopUpAddClient from "./PopUpClients";
import PopUpEmail from "./PopUpEmail";
import { useAuth } from "../Context/AuthContext";

export default function ContactsPage() {
  const {
    selectedCompanyClients,
    selectedCompanyEmployee,
    deleteEmployee,
    deleteClient,
  } = useAuth();
  const [email, setEmail] = useState("");

  const columns = [
    {
      dataField: "ClientName",
      text: "Client Name",
    },
    {
      dataField: "ClientEmail",
      text: "Email",
    },
  ];

  const col = [
    {
      dataField: "EmployeeName",
      text: "Employee Name",
    },
    {
      dataField: "EmployeeEmail",
      text: "Email",
    },
  ];

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    style: { backgroundColor: "#f5a494" },
    onSelect: (row, isSelect, rowIndex, e) => {
      setEmail(row.EmployeeEmail);
    },
  };
  const selectRow2 = {
    mode: "checkbox",
    clickToSelect: true,
    style: { backgroundColor: "#f5a494" },
    onSelect: (row, isSelect, rowIndex, e) => {
      setEmail(row.ClientEmail);
    },
  };
  function handledelete() {
    if (email) {
      deleteEmployee(email);
    }
  }
  function handledeleteClient() {
    if (email) {
      deleteClient(email);
    }
  }

  // function condom(){
  //   let temp =[...selectedCompanyClients]
  //   return temp
  // }

  return (
    <Container fluid style={{ display: "inline-flex" }}>
      <Col md={6}>
        <div>
          <Card
            className="main-shadow"
            style={{ height: "85vh", padding: "50px", marginTop: "50px" }}
          >
            <div>
              <PopUpAddEmployee />
            </div>
            <Card.Body>
              <BootstrapTable
                style={{ maxHeight: "550px" }}
                keyField="EmployeeEmail"
                data={selectedCompanyEmployee}
                columns={col}
                pagination={paginationFactory()}
                selectRow={selectRow}
              />
            </Card.Body>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <PopUpEmail Email={email}></PopUpEmail>
              <Button
                style={{ width: "20%", margin: "50px" }}
                onClick={() => {
                  handledelete();
                }}
              >
                Delete
              </Button>
            </div>
          </Card>
        </div>
      </Col>

      <Col md={6}>
        <div>
          <Card
            className="main-shadow"
            style={{ height: "85vh", padding: "50px", marginTop: "50px" }}
          >
            <div>
              <PopUpAddClient className="Btn mb-2">Add</PopUpAddClient>
            </div>
            <Card.Body>
              <BootstrapTable
                style={{ height: "550px" }}
                keyField="ClientEmail"
                data={selectedCompanyClients}
                columns={columns}
                pagination={paginationFactory()}
                selectRow={selectRow2}
              />
            </Card.Body>
            <div
              style={{
                width: "100%",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              <PopUpEmail Email={email}></PopUpEmail>
              <Button
                style={{ width: "20%", margin: "50px" }}
                onClick={() => {
                  handledeleteClient();
                }}
              >
                Delete
              </Button>
            </div>
          </Card>
        </div>
      </Col>
    </Container>
  );
}

import React, { useState, useEffect } from "react";
import "./styles/ContactsPage.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Card, Button, Col, Container } from "react-bootstrap";
import PopUpAddEmployee from "./PopUpAddEmployee";
import PopUpAddClient from "./PopUpClients";
import PopUpEmail from "./PopUpEmail";
import { useAuth } from "../Context/AuthContext";
import PopUpEditClient from "./PopUpEditClient";

export default function ContactsPage() {
  const {
    selectedCompanyClients,
    selectedCompanyEmployee,
    deleteEmployee,
    deleteClient,
    userDetails,
    selectCompany,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [client, setClient] = useState("");

  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    for (let index = 0; index < selectCompany.users.length; index++) {
      if (selectCompany.users[index].email === userDetails.email) {
        setCurrentUser(selectCompany.users[index]);
      }
    }
  }, [currentUser, userDetails.email, selectCompany.users]);

  function checkOwner() {
    let isOwner = false;
    if (currentUser.type !== undefined) {
      if (currentUser.type === "owner") {
        isOwner = true;
      }
    }

    return isOwner;
  }

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
      dataField: "name",
      text: "Employee Name",
    },
    {
      dataField: "email",
      text: "Email",
    },
  ];

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    style: { backgroundColor: "#f5a494" },
    onSelect: (row, isSelect, rowIndex, e) => {
      setEmail(row.email);
    },
  };
  const selectRow2 = {
    mode: "radio",
    clickToSelect: true,
    style: { backgroundColor: "#f5a494" },
    onSelect: (row, isSelect, rowIndex, e) => {
      setEmail1(row.ClientEmail);
      setClient(row);
    },
  };
  function handledelete() {
    if (email) {
      deleteEmployee(email);
    }
  }
  function handledeleteClient() {
    if (email1) {
      deleteClient(email1);
    }
  }

  return (
    <Container fluid style={{ display: "inline-flex" }}>
      <Col md={6}>
        <div>
          <Card
            className="main-shadow"
            style={{ height: "85vh", padding: "50px", marginTop: "50px" }}
          >
            <div>
              <PopUpAddEmployee checkOwner={checkOwner} />
            </div>
            <Card.Body>
              <BootstrapTable
                style={{ maxHeight: "550px" }}
                keyField="email"
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
                variant="danger"
                style={{ width: "20%", margin: "50px" }}
                disabled={email === "" || !checkOwner()}
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
              <PopUpAddClient className="Btn mb-2" checkOwner={checkOwner}>
                Add
              </PopUpAddClient>
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
              <PopUpEmail Email={email1}></PopUpEmail>
              <PopUpEditClient client={client} checkOwner={checkOwner} />
              <Button
                variant="danger"
                disabled={email1 === "" || !checkOwner()}
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

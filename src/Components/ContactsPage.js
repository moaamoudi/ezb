import React, { useState } from "react";
import "./styles/ContactsPage.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Card, Button } from "react-bootstrap";
import PopUpAddEmployee from './PopUpAddEmployee';
import PopUpAddClient from './PopUpClients'
import PopUpEmail from "./PopUpEmail"
export default function ContactsPage() {
  const [email,setEmail]=useState("");
  const columns = [
    {
      dataField: "name",
      text: "Client Name",
    },
    {
      dataField: "Email",
      text: "Email",
    },
  ];

  const data = [
    {
      name: "ana anan",
      Email: "asdasd",
    },
    {
      name: "saden mg",
      Email: "Test@outlook.com",
    },
  ];

  const col = [
    {
      dataField: "name",
      text: "Employee Name",
    },
    {
      dataField: "Email",
      text: "Email",
    },
  ];

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    style: { backgroundColor: "#f5a494" },
    onSelect: (row, isSelect, rowIndex, e) => {
      setEmail(row.Email)
      
    }
  };

  const data2 = [
    {
      name: "hesham amoudi",
      Email: "hesham69mez@gmail.com",
    },
    {
      name: "omar",
      Email: "fast.omar@gmail.com",
    },
  ];

  return (
    <div>
      <div className="main">
        <div className="test" style={{ height: "fit-content" }}>
        <PopUpAddEmployee  />
          <div>
            <Card className="main-shadow">
              <Card.Body>
                <BootstrapTable
                  keyField="Email"
                  data={data2}
                  columns={col}
                  pagination={paginationFactory()}
                  selectRow={selectRow}
                />
              </Card.Body>
            </Card>
          </div>
          <PopUpEmail className="mt-2 ml-1" Email={email}></PopUpEmail>
          <Button className="mt-2 ml-1"> delete</Button>
        </div>

        <div className="space"> </div>
        <div className="test" style={{ height: "fit-content" }}>
          <PopUpAddClient className="Btn mb-2">Add</PopUpAddClient>
          <div>
            <Card className="main-shadow">
              <Card.Body>
                <BootstrapTable
                  keyField="Email"
                  data={data}
                  columns={columns}
                  pagination={paginationFactory()}
                  selectRow={selectRow}
                />
              </Card.Body>
            </Card>
          </div>
          <PopUpEmail className="mt-2 ml-1" Email={email}></PopUpEmail>
          <Button className="mt-2 ml-1"> delete</Button>
        </div>
      </div>
    </div>
  );
}

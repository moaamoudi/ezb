import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import html2pdf from "html2pdf.js";

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";

export default function ContractsPage() {
  const [header, setHeader] = useState("");
  const [content, setcontent] = useState("");
  const [subtitle, setsubtitle] = useState("");
  const [title, settitle] = useState("");
  const [save, setsave] = useState(false);

  function handleSave() {
    setsave(!save);
  }
  return (
    <div style={{ display: "flex" }}>
      <div className=" ml-5" style={{marginRight:"15%"}}>
        <Form>
          {/* <Form.Group id="header">
            <Form.Label>Header:</Form.Label>
            <Form.Control
                style={{width:"400px"}}
              as="textarea"
              type="string"
              onChange={(e) => {
                if (e.target) {
                  console.log(e.target.value);
                  setHeader(e.target.value);
                  setsave(false);
                }
              }}
              required
              className="button-bg"
            />
          </Form.Group> */}
          <Form.Group id="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
                style={{width:"400px"}}
              as="textarea"
              type="string"
              onChange={(e) => {
                if (e.target) {
                  console.log(e.target.value);
                  settitle(e.target.value);
                  setsave(false);
                }
              }}
              required
              className="button-bg"
            />
          </Form.Group>
          <Form.Group id="title">
            <Form.Label>Sub-Title:</Form.Label>
            <Form.Control
                style={{width:"400px"}}
              as="textarea"
              type="string"
              onChange={(e) => {
                if (e.target) {
                  console.log(e.target.value);
                  setsubtitle(e.target.value);
                  setsave(false);
                }
              }}
              required
              className="button-bg"
            />
          </Form.Group>
          <Form.Group id="content">
            <Form.Label>Body:</Form.Label>
            <Form.Control
              as="textarea"
              type="string"
              onChange={(e) => {
                if (e.target) {
                  console.log(e.target.value);
                  setcontent(e.target.value);
                  setsave(false);
                }
              }}
              required
              className="button-bg"
            />
          </Form.Group>
        </Form>

        <Button onClick={() => handleSave()}>Save</Button>
      </div>

      <div style={{ width: "fit-content" }}>
        <PDFViewer style={{ width: "8in", height: "8in", marginTop: "2%" }}>
          <Document>
            <Page style={styles.body}>
              {/* <Text style={styles.header} fixed>
                {save ? header : "this is the page header"}
              </Text> */}
              <Text style={styles.title} fixed>{save ? title : "this is the page title"}</Text>
              <Text style={styles.author}>{save ? subtitle : "this is the Company Name"}</Text>
              <Text style={styles.author}>
                ------------------------------------------------------------------
              </Text>
              
              <Text style={styles.text}>
              
                {save ? content : "this is the body of the page"}
              </Text>
              <Text style={styles.text}>
              
                {save ? "" : "Note!: it wont update unless you save and once you start editing again it will reverse the additions till you save again"}
              </Text>
              <Text style={styles.text}>
              
                {save ? "" : "Note!:you can write praragraphs inside the body and separate them with the KEY (ENTER)"}
              </Text>
              
            </Page>
          </Document>
        </PDFViewer>
      </div>
    </div>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

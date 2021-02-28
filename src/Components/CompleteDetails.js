import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuth } from "../Context/AuthContext.js";

export default function CompleteDetails() {
  const mobileRef = useRef();
  const companyRef = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { insertCompanyToFirestore, checkUserExist, getCompanies } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      var name = auth.currentUser.displayName.split(" ");

      var companies = [companyRef.current.value];

      await db
        .collection("Users")
        .doc("" + auth.currentUser.email)
        .set({
          email: "" + auth.currentUser.email,
          firstName: "" + name[0],
          lastName: "" + name[1],
          phone: "" + mobileRef.current.value,
          companyName: companies,
          uid: "" + auth.currentUser.uid,
        })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });

      await insertCompanyToFirestore(companies);
      await checkUserExist();
      await getCompanies();

      history.push("/");
    } catch {
      setError("Failed to submit Details!");
    }
    setLoading(false);
  }

  return (
    <div className="fulls">
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Complete Details</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="company">
              <Form.Label>Company Name:</Form.Label>
              <Form.Control type="text" ref={companyRef} required />
            </Form.Group>
            <Form.Group id="phone">
              <Form.Label>Mobile Phone:</Form.Label>
              <Form.Control
                type="phone"
                ref={mobileRef}
                required
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100">
              Continue
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import logo from "../imgs/ezb3.png";

export default function Signup() {
  const firstNameref = useRef();
  const lastNameref = useRef();
  const mobileRef = useRef();
  const companyRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {
    signup,
    insertDetailsToFirestore,
    updateProfile,
    initialUpdateDetails,
  } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }
    if (
      passwordRef.current.value.length < 8 ||
      passwordConfirmRef.current.value.length < 8
    ) {
      return setError("Password should at least be 8 characters long!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      await updateProfile(
        firstNameref.current.value,
        lastNameref.current.value
      );

      var companies = [companyRef.current.value];
      console.log("before insert");
      await insertDetailsToFirestore(
        firstNameref.current.value,
        lastNameref.current.value,
        mobileRef.current.value,
        companies
      );
      console.log("after fetch");
      console.log("before fetch");
      await initialUpdateDetails();
      console.log("after fetch");
      history.push("/");
    } catch {
      setError("Failed to create an account!");
    }
    setLoading(false);
  }

  return (
    <>
      <Card className="main-shadow">
        <Card.Body>
          <img
            alt=""
            src={logo}
            width="210vh"
            height="100%"
            className="center-img mb-4"
          />
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="fname">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="Name"
                ref={firstNameref}
                required
                className="button-bg"
              />
            </Form.Group>
            <Form.Group id="lname">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="Name"
                ref={lastNameref}
                required
                className="button-bg"
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                className="button-bg"
              />
            </Form.Group>
            <Form.Group id="phone">
              <Form.Label>Mobile Phone:</Form.Label>
              <Form.Control
                type="phone"
                ref={mobileRef}
                required
                className="button-bg"
              ></Form.Control>
            </Form.Group>
            <Form.Group id="company">
              <Form.Label>Company Name:</Form.Label>
              <Form.Control
                type="text"
                ref={companyRef}
                required
                className="button-bg"
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
                className="button-bg"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation:</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                required
                className="button-bg"
              />
            </Form.Group>
            <Button
              disabled={loading}
              type="submit"
              variant="light"
              className="w-100 button-bg mt-3"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body>
        <div className="w-100 text-center mt-2 mb-3">
          Already Have An Account?{" "}
          <Link to="/login" className="a-login">
            Log In
          </Link>
        </div>
      </Card>
    </>
  );
}

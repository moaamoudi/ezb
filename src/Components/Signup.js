import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { auth, db } from "../firebase";
import logo from "../imgs/logo.png";

export default function Signup() {
  const firstNameref = useRef();
  const lastNameref = useRef();
  const mobileRef = useRef();
  const companyRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      console.log(mobileRef.current.value);
      await auth.currentUser
        .updateProfile({
          displayName:
            firstNameref.current.value + " " + lastNameref.current.value,
        })
        .then(function () {
          console.log("success");
        })
        .catch(function (error) {
          console.log("failed");
        });

      await db
        .collection("Users")
        .doc("" + auth.currentUser.uid)
        .set({
          firstName: "" + firstNameref.current.value,
          lastName: "" + lastNameref.current.value,
          phone: "" + mobileRef.current.value,
          companyName: "" + companyRef.current.value,
        })
        .then(function () {
          console.log("Document successfully written!");
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });

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
            width="200vh"
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
              type="submit"
              className="w-100 button-bg mt-3"
            >
              Sign Up
            </Button>
          </Form>
        </Card.Body><div className="w-100 text-center mt-2 mb-3">
        Already Have An Account?{" "}
        <Link to="/login" className="a-login">
          Log In
        </Link>
      </div>
      </Card>
      
    </>
  );
}

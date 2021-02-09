import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed To Reset Password!");
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
          <h2 className="text-center mb-4">Forgot Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
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
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login" className="a-login">
              Login
            </Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Dont Have An Account?{" "}
        <Link to="/signup" className="a-login">
          Sign Up
        </Link>
      </div>
    </>
  );
}

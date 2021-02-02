import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import GoogleButton from "react-google-button";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, authLogin, checkUserExist } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function responseGoogle() {
    try {
      setError("");
      setLoading(true);
      await authLogin();
      if (await checkUserExist()) {
        history.push("/");
      } else {
        history.push("/complete-details");
      }
    } catch {
      setError("Failed to log in");
    }

    setLoading(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in!");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
                className="form-control"
              />
            </Form.Group>

            <Button disabled={loading} type="submit" className="w-100">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <div className="w-100 text-center mt-3">
            <h5>Or</h5>
          </div>
          <div className="w-100 text-center mt-3">
            <GoogleButton
              style={{ borderRadius: "4px" }}
              className="w-100 text-center mt-2"
              onClick={responseGoogle}
            ></GoogleButton>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Dont Have An Account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}

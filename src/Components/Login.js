import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import GoogleButton from "react-google-button";
import "./styles/Login.css";
import logo from "../imgs/logo.png";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, authLogin, checkUserExist, updateDetails } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function responseGoogle() {
    try {
      setError("");
      setLoading(true);
      await authLogin();
      var exists = await checkUserExist()

      if (exists == 1) {
        await updateDetails();
        history.push("/");
      } else if(exists == 0){
        history.push("/complete-details");
      }else{
        
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
    await updateDetails();
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
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
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

            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
                className="form-control button-bg"
              />
            </Form.Group>

            <Button
              disabled={loading}
              variant="light"
              type="submit"
              className="w-100 button-bg mt-3"
            >
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password" className="a-login">
              Forgot Password?
            </Link>
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
        <div className="w-100 text-center mt-2 mb-3 ">
          Dont Have An Account?{" "}
          <Link to="/signup" className="a-login">
            Sign Up
          </Link>
        </div>
      </Card>
    </>
  );
}

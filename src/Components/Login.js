import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, authLogin } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function responseGoogle(response) {
    try {
      setError("");
      setLoading(true);
      console.log(response.profileObj);
      await authLogin(response);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }

  function logout(){
    
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
            <GoogleLogin
              clientId="949205911863-n8hilbrtehs14uokcpegl7puuegm9r0v.apps.googleusercontent.com"
              buttonText="Log In With Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <GoogleLogout
              clientId="949205911863-n8hilbrtehs14uokcpegl7puuegm9r0v.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={logout}
            ></GoogleLogout>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Dont Have An Account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}

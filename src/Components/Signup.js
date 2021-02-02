import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert} from "react-bootstrap";
import { Link , useHistory} from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { auth } from "../firebase";


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
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match!");
    }

    try {
        setError('')
        setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value);
      await auth.currentUser.updateProfile({
        displayName: firstNameref.current.value+" "+lastNameref.current.value,
        // phoneNumber: mobileRef.current.value+"",
      }).then(function() {
        console.log("success")
      }).catch(function(error) {
        console.log("failed")
      });
      
      console.log(auth.currentUser);
      history.push("/")
    } catch {
        setError('Failed to create an account!')
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="fname">
              <Form.Label>First Name:</Form.Label>
              <Form.Control type="Name" ref={firstNameref} required />
            </Form.Group>
            <Form.Group id="lname">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control type="Name" ref={lastNameref} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="phone">
              <Form.Label>Mobile Phone:</Form.Label>
              <Form.Control type="phone" ref={mobileRef} required ></Form.Control>
            </Form.Group>
            <Form.Group id="company">
              <Form.Label>Company Name:</Form.Label>
              <Form.Control type="text" ref={companyRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
{/* fsdpofsdf */}
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation:</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} type="submit" className="w-100">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already Have An Account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}

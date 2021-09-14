import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Bootstrap
import { Card, Button, Form, Alert } from "react-bootstrap";

// Context
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      setError("");
      history.push("/");
    } catch (err) {
      setError("Failed to log in.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                required
                minLength={6}
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100 my-2" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need a new account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;

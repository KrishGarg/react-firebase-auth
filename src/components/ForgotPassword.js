import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

// Bootstrap
import { Card, Button, Form, Alert } from "react-bootstrap";

// Context
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await resetPassword(emailRef.current.value);
      setError("");
      setLoading(true);
      setMessage("Check your inbox for further instructions.");
    } catch (err) {
      setError("Failed to reset password.");
    }
    setLoading(false);
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="info">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100 my-2" type="submit">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
        Got your password? <Link to="/login">Log In</Link>
      </div>
      <div className="w-100 text-center">
        Need a new account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;

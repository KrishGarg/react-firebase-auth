import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Bootstrap
import { Card, Button, Form, Alert } from "react-bootstrap";

// Context
import { useAuth } from "../context/AuthContext";

const UpdateProfile = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match.");
    }

    const promises = [];

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      if (passwordConfirmRef.current.value !== passwordRef.current.value) {
        return setError("Password do not match.");
      }
      promises.push(updatePassword(passwordRef.current.value));
    }

    setError("");
    setLoading(true);

    Promise.all(promises)
      .then(() => {
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setError("Failed to update account.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                defaultValue={currentUser.email}
                type="email"
                ref={emailRef}
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                placeholder="Leave blank to keep the same."
                type="password"
                ref={passwordRef}
                minLength={6}
              ></Form.Control>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                placeholder="Leave blank to keep the same."
                minLength={6}
                type="password"
                ref={passwordConfirmRef}
              ></Form.Control>
            </Form.Group>
            <Button disabled={loading} className="w-100 my-2" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Want to go back? <Link to="/">Dashboard</Link>
      </div>
    </div>
  );
};

export default UpdateProfile;

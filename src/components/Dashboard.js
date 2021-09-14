import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

// Bootstrap
import { Card, Button, Alert } from "react-bootstrap";

// Context
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();

  let history = useHistory();

  const handleLogout = async () => {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch (err) {
      setError("Failed to log out.");
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>
          {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;

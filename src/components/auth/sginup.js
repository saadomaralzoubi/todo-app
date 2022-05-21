import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import { Modal, Button, Form } from "react-bootstrap";

function Signup(props) {
  const contextType = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else {
      setRole(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onHide();
    contextType.signup(username, email, password, role);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Signup</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="username"
              required
              type="text"
              placeholder="Enter username"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="email"
              required
              type="email"
              placeholder="example@LTUC.com"
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={handleChange}
              name="password"
              required
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect1">
            <Form.Label>Role</Form.Label>
            <Form.Control onChange={handleChange} name="role" as="select">
              <option value="user">User</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info" onClick={handleSubmit}>
          Signup
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Signup;

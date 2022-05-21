import React, { useState, useContext } from "react";
import { Navbar, Button } from "react-bootstrap";
import Signin from "../auth/signin";
import Signup from "../auth/sginup";
import { If, Else, Then } from "react-if";
import { AuthContext } from "../../context/auth";

const NavBar = () => {
  const contextType = useContext(AuthContext);
  const [signinShow, setSigninShow] = useState(false);
  const [signupShow, setSignupShow] = useState(false);
  return (
    <Navbar bg="primary" variant="dark" expand="true">
      <Navbar.Brand href="#home">Home</Navbar.Brand>
      <If condition={contextType.loggedIn}>
        <Then>
          <Navbar.Brand>
            <Button variant="danger" onClick={contextType.logout}>
              Logout
            </Button>
          </Navbar.Brand>
        </Then>
        <Else>
          <Navbar.Brand className="d-flex justify-content-between">
            <Button
              className="mr-3"
              variant="outline-light"
              onClick={() => setSigninShow(true)}
            >
              Signin
            </Button>

            <Button variant="light" onClick={() => setSignupShow(true)}>
              Signup
            </Button>
          </Navbar.Brand>
        </Else>
      </If>
      <Signin show={signinShow} onHide={() => setSigninShow(false)} />
      <Signup show={signupShow} onHide={() => setSignupShow(false)} />
    </Navbar>
  );
};

export default NavBar;

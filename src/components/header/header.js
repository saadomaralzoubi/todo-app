import React from "react";
import { Navbar } from "react-bootstrap";
const Header = (props) => {
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand className="header">Home</Navbar.Brand>
      </Navbar>
    </>
  );
};
export default Header;

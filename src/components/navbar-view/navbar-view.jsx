import React from 'react';

import './navbar-view.scss';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

export class Navbar extends React.Component {



  render() {
    return (
      <Navbar variant="dark" className="navbarSkullify">
        <Container>
          <Navbar.Brand href="#home" className="skullifyBrand">
            SKULLIFY
          </Navbar.Brand>
          <Nav className="me-auto" variant="dark">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#register">Register</Nav.Link>
            <Nav.Link href="#login">Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}
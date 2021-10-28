import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './navbar-view.scss';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { RegisterView } from '../register-view/register-view';

export class Navbar extends React.Component {

  render() {
    return (
      <Navbar variant="dark" className="navbarSkullify">
        <Container>
          <Link className="navbarLinkText" to={`/`}>
            <div className="skullifyBrand">
              SKULLIFY
            </div>
          </Link>
          <Nav className="me-auto" variant="dark">
            <Link className="navbarLinkText" to={`/`}>
              Home
            </Link>
            <Link className="navbarLinkText" to={`/register`}>
              Register
            </Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
}
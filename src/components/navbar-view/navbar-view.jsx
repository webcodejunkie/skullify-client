import React from 'react';

import { Link } from 'react-router-dom';

import './navbar-view.scss';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

export class NavbarView extends React.Component {


  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  render() {
    const { user } = this.props;
    return (
      <Navbar collaspeonselect="true" expand="lg" variant="dark" className="navbarSkullify">
        <Container>
          <Link className="navbarLinkText" to={`/`}>
            <div className="skullifyBrand">
              SKULLIFY
            </div>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav className="me-auto" variant="dark">
                <Link className="navbarLinkText" to={`/`}>
                  HOME
                </Link>
                <Link className="navbarLinkText" to={`/register`}>
                  REGISTER
                </Link>
                <Link className="navbarLinkText" to={`/users/${user}`}>
                  MY ACCOUNT
                </Link>
                <a className="navbarLinkText" onClick={() => this.onLoggedOut()} >LOG OFF</a>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
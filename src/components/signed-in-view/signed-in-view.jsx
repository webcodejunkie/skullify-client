import React from 'react';

import Container from 'react-bootstrap/Container';

import './signed-in-view.scss';

export class SignedInView extends React.Component {

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  render() {

    const username = localStorage.getItem('user');


    return (
      <Container className="signedInContainer">
        <p>SIGNED IN AS {username}</p>
        <div className="logOutButton">
          <a className="navbarLinkText" onClick={() => this.onLoggedOut()} >LOG OUT</a>
        </div>
      </Container>
    );
  }

}
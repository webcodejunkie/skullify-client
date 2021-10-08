import React from 'react';
import axios from 'axios';

import './profile-view.scss';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

export class ProfileView extends React.Component {


  render() {
    const { user, onBackClick } = this.props;

    return (
      <Container>
        <Image src="https://via.placeholder.com/150" roundedCircle />
        <div>
          <h2>{user}</h2>
        </div>
      </Container>
    );
  }
}
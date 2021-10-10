import React, { useState } from 'react';
import axios from 'axios';

import './profile-view.scss';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      user: null
    }
  }

  getAuth(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('token', authData.user.Username);

    this.getUser(authData.token);
  }

  getUser(token) {
    axios.get('https://skullify.herokuapp.com/users', {
      header: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          user: response.data
        },
          console.log(user));
      })
      .catch(function (error) {
        console.log(error);
      })
  }




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
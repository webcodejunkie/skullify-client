import React, { useState } from 'react';
import axios from 'axios';

import './profile-view.scss';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null
    }
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    localStorage.setItem('token', accessToken);
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem('token');

    axios.get(`https://skullify.herokuapp.com/users/${username}`, {
      header: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password
        },
          console.log(username, password));
      })
      .catch(function (error) {
        console.log(error);
      })
  }




  render() {

    const { username, onBackClick } = this.props;

    return (
      <Container>
        <Image src="https://via.placeholder.com/150" roundedCircle />
        <div>
          <h2>{username}</h2>
          <Button onClick={() => { onBackClick() }}>Back</Button>
        </div>
      </Container>
    );
  }
}
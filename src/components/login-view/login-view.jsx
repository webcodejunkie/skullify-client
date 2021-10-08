import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Navbar } from '../navbar-view/navbar-view';

import './login-view.scss';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://skullify.herokuapp.com/login', {
      Username: Username,
      Password: Password
    })
      .then(responce => {
        const data = responce.data;
        props.onLoggedIn(data);
      })
      .catch(err => {
        console.log('no such user exists')
      });
  };

  return (
    <div className="d-flex flex-column">
      <Navbar />
      <Container fluid className="loginLayout">
        <div>
          <h1 className="headersWhite">Resume The <span className="creepyHeaders">Terror</span></h1>
        </div>
        <Form className="d-flex flex-column">
          <Form.Group>
            Username
            <Form.Control type='text' value={Username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group>
            Password
            <Form.Control type='password' value={Password} onChange={e => setPassword(e.target.value)} />

          </Form.Group>
          <Button variant="primary" type='submit' onClick={handleSubmit}>Login</Button>
        </Form>
      </Container>
    </div>
  );
}

LoginView.propTypes = {
  login: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }),
  onLoggedIn: PropTypes.func.isRequired
};

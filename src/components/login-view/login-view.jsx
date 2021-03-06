import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { NavbarView } from '../navbar-view/navbar-view';

import './login-view.scss';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');

  const errorMessage = () => {
    setError('This user does not exist.');
  }

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
        console.log(err + ' no such user exists');
        errorMessage();
      });


  };

  return (
    <div className="d-flex flex-column">
      <NavbarView />
      <Container fluid className="loginLayout">
        <div>
          <h1 className="creepyHeaders">Resume The Terror</h1>
        </div>

        <Form className="d-flex flex-column align-items-center">
          <Form.Group className="p-2">
            Username
            <Form.Control type='text' value={Username} onChange={e => setUsername(e.target.value)} required />
          </Form.Group>

          <Form.Group className="p-2">
            Password
            <Form.Control type='password' value={Password} onChange={e => setPassword(e.target.value)} required />

          </Form.Group>
          <div className="importantText">{error}</div>
          <Form.Group className="p-2">

            <Button variant="primary" type='submit' onClick={handleSubmit}>Login</Button>
          </Form.Group>

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


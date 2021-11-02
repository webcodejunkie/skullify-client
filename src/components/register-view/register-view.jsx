import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { NavbarView } from '../navbar-view/navbar-view';

import './register-view.scss';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export function RegisterView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);

    axios.post('https://skullify.herokuapp.com/register', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(responce => {
        const data = responce.data;
        console.log(data)
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user')
      });
  };

  return (
    <div className="registerScreen">
      < NavbarView />
      <Container className="registerLayout">

        <div className="text-center">
          <h1 className="creepyHeaders">Welcome To Skullify</h1>
          <p>Skullify is a platform created specifically for horror fanatics. Enjoy browsing a multitude of content such as TV series, movies, and reviews!</p>
          <p>Explore the deeper world of terror that awaits you..</p>
        </div>

        <Form className="d-flex flex-column">
          <Form.Group>
            Username
            <Form.Control type='text' value={username} onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group>
            Password
            <Form.Control type='password' value={password} onChange={e => setPassword(e.target.value)} />

          </Form.Group>
          <Form.Group>
            Email Address
            <Form.Control type='email' value={email} onChange={e => setEmail(e.target.value)} />
            <Form.Text className="importantText">We'll never share your email with anyone else </Form.Text>

          </Form.Group>
          <Form.Group>
            Birthday
            <Form.Control type='date' value={birthday} onChange={e => setBirthday(e.target.value)} />

          </Form.Group>
          <Button variant="success" type='submit' onClick={handleSubmit}>Register</Button>
        </Form>
      </Container>
    </div>
  );
}

RegisterView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  })
};


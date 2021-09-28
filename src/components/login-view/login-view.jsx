import React, { useState } from 'react';
import PropTypes from 'prop-types';

export function LoginView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    console.log(Username, Password);
    props.onLoggedIn(Username);
  };

  return (
    <form>
      <label>
        Username:
        <input type='text' value={Username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type='password' value={Password} onChange={e => setPassword(e.target.value)} />

      </label>
      <button type='submit' onClick={handleSubmit}>Submit</button>
    </form>
  );
}

LoginView.propTypes = {
  login: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired
  }).isRequired,
  onLoggedIn: PropTypes.func.isRequired
};

import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import './profile-view.scss';

import { MovieCard } from '../movie-card/movie-card';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { NavbarView } from '../navbar-view/navbar-view';

import { Link } from 'react-router-dom'
import { CarouselView } from '../carousel-view/carousel-view';

export class ProfileView extends React.Component {

  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: []
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  // Get The Current User

  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://skullify.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  // Edit The Current User

  editUser(e) {
    e.preventDefault();
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.put(`https://skullify.herokuapp.com/users/${username}`,
      {
        Username: this.state.Username,
        Password: this.state.Password,
        Email: this.state.Email,
        Birthday: this.state.Birthday
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday
        });
        localStorage.setItem('user', this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert(username + " has been updated!");
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  // Delete A Favorite Movie From Users Favorite 

  onUnfavorite(id) {
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios.delete(`https://skullify.herokuapp.com/users/${username}/movies/` + (id), {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Delete A User

  onDeleteUser() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    axios.delete(`https://skullify.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
        alert(username + ' has been deleted.');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  setUsername(value) {
    this.state.Username = value;
  }

  setPassword(value) {
    this.state.Password = value;
  }

  setEmail(value) {
    this.state.Email = value;
  }

  setBirthday(value) {
    this.state.Birthday = value;
  }


  render() {

    const { onBackClick, movies, user } = this.props;

    const FavoritedMovies = movies.filter(m => {
      return this.state.FavoriteMovies.includes(m._id)
    });

    return (
      <Container className="profileWrapper">
        <NavbarView />
        <Button className="backProfileButton" variant="danger" onClick={() => { onBackClick() }}>Back</Button>
        <div className="profileInformation">
          <div className="profileContent">
            <h4>PROFILE</h4>
          </div>
          <div className="profileContent">
            <Image src="https://via.placeholder.com/150" roundedCircle />
          </div>
          <div className="profileContent">
            <h4>USERNAME</h4>
            <div>
              <p>{this.state.Username}</p>
            </div>
          </div>
          <div className="profileContent">
            <h4>EMAIL</h4>
            <div>
              <p>{this.state.Email}</p>
            </div>
          </div>
          <div className="profileContent">
            <h4>BIRTHDAY</h4>
            <div>
              <p>{this.state.Birthday}</p>
            </div>
          </div>
          <div>
            <h4>EDIT PROFILE</h4>
          </div>
          <Form className="formDisplay" onSubmit={(e) => this.editUser(e)}>
            <Form.Group>
              Username
              <Form.Control type='text' name="Username" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              Password
              <Form.Control type='password' name="Password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} required />

            </Form.Group>
            <Form.Group>
              Email Address
              <Form.Control type='email' name="Email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)} required />

            </Form.Group>
            <Form.Group>
              Birthday
              <Form.Control type='date' name="Birthday" onChange={(e) => this.setBirthday(e.target.value)} />

            </Form.Group>
            <div className="marginSpacer">
              <Button variant="success" type="submit" >Update</Button>
            </div>
          </Form>
          <div className="marginSpacer">
            <Button variant="danger" onClick={() => this.onDeleteUser()} >Delete Profile</Button>
          </div>
        </div>
        <div className="favoriteMoviesView">
          <h2>{user}'s Favorites</h2>
          <div className="responsiveMovieWrapper">
            {
              FavoritedMovies.map((movie) => (
                <Row className="justify-content-center flex-wrap" key={movie._id}>
                  <Col className="m-2 d-flex flex-column">
                    <div className="d-flex flex-column align-items-center favoriteListMovies">
                      <MovieCard movie={movie} />
                      <Button className="unfavoriteMovieButton" variant="danger" onClick={() => { this.onUnfavorite(movie._id) }} >Unfavorite</Button>
                    </div>
                  </Col>
                </Row>
              ))
            }
          </div>
        </div>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  })
};
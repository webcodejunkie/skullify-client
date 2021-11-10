import axios from 'axios';
import React from 'react';

// React Router

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

// SCSS Import

import './main-view.scss';

// React Components

import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { RegisterView } from '../register-view/register-view';
import { NavbarView } from '../navbar-view/navbar-view';
import { CarouselView } from '../carousel-view/carousel-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { SignedInView } from '../signed-in-view/signed-in-view';

// React Bootstrap 

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';


// Redux Imports

import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';


export class MainView extends React.Component {


  getUser(token) {
    const username = localStorage.getItem('user');
    axios.get(`https://skullify.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        this.props.setUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  getMovies(token) {
    axios.get(`https://skullify.herokuapp.com/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  onLoggedIn(authData) {
    console.log(authData);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.props.setUser(authData.user);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser({});
    window.open('/', '_self');
  }

  render() {

    const { movies, user } = this.props;

    return (
      <Router>
        <Route exact path="/" render={() => {

          if (!('Username' in user)) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

          return (
            <div>
              <NavbarView user={user} />
              <SignedInView />
              <CarouselView />
              <Container className="main-view">
                <MoviesList movies={movies} />
              </Container>
            </div>
          );
        }} />

        <Route path="/register" render={() => {
          if (!('Username' in user)) return <RegisterView />

          if (user) return <Redirect to="/" />

          return <RegisterView />
        }} />

        <Route path="/users/:username" render={({ history }) => {
          if (!('Username' in user)) return <RegisterView />

          if (movies.length === 0) return <MoviesList movies={movies} />;

          return <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
        }} />

        <Route path="/movies/:movieId" render={({ match, history }) => {
          if (!('Username' in user)) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

          if (movies.length === 0) return <MoviesList movies={movies} />;

          return <div>
            <MovieView user={user} movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
          </div>
        }} />

        <Route path="/directors/:name" render={({ match, history }) => {
          if (!('Username' in user)) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

          if (!movies) return <MoviesList movies={movies} />
          return <Col>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
          </Col>
        }} />

        <Route path="/genres/:title" render={({ match, history }) => {
          if (!('Username' in user)) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

          if (!movies) return <MoviesList movies={movies} />
          return <Col>
            <GenreView genre={movies.find(m => m.Genre.Title === match.params.title).Genre} onBackClick={() => history.goBack()} />
          </Col>
        }} />
      </Router >
    );
  }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

export default connect(mapStateToProps, { setMovies, setUser })(MainView);

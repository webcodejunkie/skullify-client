import axios from 'axios';
import React from 'react';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegisterView } from '../register-view/register-view';
import { NavbarView } from '../navbar-view/navbar-view';
import { CarouselView } from '../carousel-view/carousel-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';


export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  getMovies(token) {
    axios.get(`https://skullify.herokuapp.com/movies`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {

    const { user } = this.state;
    const { movies } = this.props;

    return (
      <Router>
        <Route exact path="/" render={() => {

          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

          if (movies.length === 0) return <MoviesList movies={movies} />;

          return (
            <div>
              <NavbarView />
              <Container className="d-flex flex-row justify-content-end align-items-baseline">
                <div className="mr-2">
                  <p>Signed in as <span> <Link to={`/users/${user}`}>{localStorage.getItem('user')}</Link> </span> </p>
                </div>
                <Button variant="danger" onClick={() => { this.onLoggedOut() }}>Log off</Button>
              </Container>
              <CarouselView />
              <Container className="main-view">

                {
                  movies.map(m => (
                    <Row className="justify-content-center" key={m._id}>
                      <Col className="m-2">
                        <MovieCard movie={m} />
                      </Col>
                    </Row>
                  ))
                }

              </Container>
            </div>
          );
        }} />

        <Route path="/register" render={() => {
          if (user) return <Redirect to="/" />

          return <RegisterView />
        }} />

        <Route path="/users/:username" render={({ history }) => {
          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

          if (movies.length === 0) return <MoviesList movies={movies} />;

          return <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
        }} />

        <Route path="/movies/:movieId" render={({ match, history }) => {
          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

          if (movies.length === 0) return <MoviesList movies={movies} />;

          return <Col>
            <MovieView user={user} movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
          </Col>
        }} />

        <Route path="/directors/:name" render={({ match, history }) => {
          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

          if (!movies) return <MoviesList movies={movies} />
          return <Col>
            <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
          </Col>
        }} />

        <Route path="/genres/:title" render={({ match, history }) => {
          if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />

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
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);

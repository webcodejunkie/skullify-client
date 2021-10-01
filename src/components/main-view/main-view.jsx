import axios from 'axios';
import React from 'react';

import './main-view.scss';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegisterView } from '../register-view/register-view';
import { Navbar } from '../navbar-view/navbar-view';
import { CarouselView } from '../carousel-view/carousel-view';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null
    };
  }


  componentDidMount() {
    axios.get('https://skullify.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onRegister(register) {
    this.setState({
      register
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }


  render() {

    const { movies, selectedMovie, user, register } = this.state;

    if (!register) return <RegisterView onRegister={register => this.onRegister(register)} />

    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />


    if (movies.length === 0) return <div className="main-view"></div>;

    return (
      <div>

        <Navbar />

        <CarouselView />

        <Container className="main-view">
          {selectedMovie

            ? <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />

            : movies.map(movie => (

              <Row className="justify-content-center" key={movie._id}>

                <Col className="m-2">

                  <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />

                </Col>
              </Row>
            ))
          }
        </Container>
      </div>
    );
  }
}

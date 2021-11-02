import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';

import { CommentSection } from '../comment-section-view/comment-section-view';
import { CarouselView } from '../carousel-view/carousel-view';
import { NavbarView } from '../navbar-view/navbar-view';

import './movie-view.scss';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

export class MovieView extends React.Component {

  constructor() {
    super();
    this.state = {
      isFavorite: 'Favorite'
    };
  }

  onFavorite() {
    this.setState({
      isFavorite: 'Favorited!'
    });
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');


    axios.post(`https://skullify.herokuapp.com/users/${username}/movies/` + this.props.movie._id, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }




  render() {
    const { movie, onBackClick, user } = this.props;


    return (
      <Container>
        <NavbarView />
        <Container className="d-flex flex-row justify-content-end align-items-baseline">
          <div className="mr-2">
            <p>Signed in as <span> <Link to={`/users/${user}`}>{user}</Link> </span> </p>
          </div>
          <Button variant="danger" onClick={() => { this.onLoggedOut() }}>Log off</Button>
        </Container>
        <CarouselView />
        <div className="movie-view">
          <Row>
            <Col className="d-flex flex-column">
              <div>
                <Image className="movie-poster" src={movie.ImagePath} />
              </div>
              <Button className="followButton" onClick={() => this.onFavorite()} >{this.state.isFavorite}</Button>

            </Col>
            <Col className="movieViewBlock">
              <div className="movie-title">
                <div className="label">Title</div>
                <span className="value">{movie.Title}</span>
              </div>
              <div className="movie-description">
                <div className="label">Description</div>
                <span className="value">{movie.Description}</span>
              </div>
              <div className="genre-title">
                <div className="label">Genre</div>
                <Link to={`/genres/${movie.Genre.Title}`}>
                  <span className="value">{movie.Genre.Title}</span>
                </Link>
              </div>
              <div className="director-title">
                <div className="label">Director</div>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <span className="value">{movie.Director.Name}</span>
                </Link>
              </div>
            </Col>
          </Row>
          <CommentSection />
          <Button className="m-4" variant="danger" onClick={() => { onBackClick(null); }}>Back</Button>
        </div>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    }),
  }).isRequired
}
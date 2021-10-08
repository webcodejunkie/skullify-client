import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { CommentSection } from '../comment-section-view/comment-section-view';
import { CarouselView } from '../carousel-view/carousel-view';
import { Navbar } from '../navbar-view/navbar-view';

import './movie-view.scss';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;


    return (
      <Container>
        <Navbar />
        <CarouselView />
        <div className="movie-view">
          <Row>
            <Col>
              <div>
                <Image className="movie-poster" src={movie.ImagePath} />
              </div>
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
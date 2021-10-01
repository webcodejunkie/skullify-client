import React from 'react';
import PropTypes from 'prop-types';

import { MovieCard } from '../movie-card/movie-card';
import { CommentSection } from '../comment-section-view/comment-section-view';

import './movie-view.scss';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

export class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;


    return (
      <Container>
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
                <span className="value">{movie.Genre.Title}</span>
              </div>
              <div className="genre-description">
                <div className="label">Genre Description</div>
                <span className="value">{movie.Genre.Description}</span>
              </div>
              <div className="director-title">
                <div className="label">Director</div>
                <span className="value">{movie.Director.Name}</span>
              </div>
              <div className="director-bio">
                <div className="label">Bio</div>
                <span className="value">{movie.Director.Bio}</span>
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
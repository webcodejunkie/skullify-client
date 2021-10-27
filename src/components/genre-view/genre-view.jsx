import React from 'react';
import PropTypes from 'prop-types';

import './genre-view.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { Navbar } from '../navbar-view/navbar-view';

export class GenreView extends React.Component {
  render() {

    const { genre, onBackClick } = this.props;

    return (
      <Container>
        <Navbar />
        <Row>
          <Col className="p-5">
            <div>
              <div className="label">Genre</div>
              <div className="value">{genre.Title}</div>
              <div className="genre-bio">
                <div className="label">Description</div>
                <span className="value">{genre.Description}</span>
              </div>
              <Button variant="danger" className="mt-2" onClick={() => { onBackClick(null); }}>Back</Button>
            </div>
          </Col>
        </Row>
      </Container >
    );
  }
}

GenreView.propTypes = {
  movie: PropTypes.shape({
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
  })
};
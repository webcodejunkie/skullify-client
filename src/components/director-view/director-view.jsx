import React from 'react';
import PropTypes from 'prop-types';

import './director-view.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { NavbarView } from '../navbar-view/navbar-view';
import { GenreView } from '../genre-view/genre-view';
import { SignedInView } from '../signed-in-view/signed-in-view';
import { CarouselView } from '../carousel-view/carousel-view';

export class DirectorView extends React.Component {
  render() {

    const { director, onBackClick } = this.props;

    return (
      <Container>
        <NavbarView />
        <SignedInView />
        <Row>
          <Col className="p-5">
            <div>
              <div className="label">Name</div>
              <div className="value">{director.Name}</div>
              <div className="director-bio">
                <div className="label">Bio</div>
                <span className="value">{director.Bio}</span>
              </div>
              <Button variant="danger" className="mt-2" onClick={() => { onBackClick(null); }}>Back</Button>
            </div>
          </Col>
        </Row>
      </Container >
    );
  }
}

DirectorView.propTypes = {
  movie: PropTypes.shape({
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired
    }).isRequired,
  })
};
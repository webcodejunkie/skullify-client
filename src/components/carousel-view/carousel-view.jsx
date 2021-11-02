import React from 'react';

import './carousel-view.scss';

import imageOne from './movie-posters/sinister2.png';
import imageTwo from './movie-posters/oculus.png';
import imageThree from './movie-posters/redeye.png';

import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';

export class CarouselView extends React.Component {


  render() {

    return (
      <Container className="carouselSpace">
        <Carousel fade>
          <Carousel.Item>
            <img
              className="d-block w-100 carouselImages"
              src={imageOne}
              alt="First slide"
            />
            <Carousel.Caption className="captionBackground position-static">
              <h3>Coming Soon</h3>
              <p>
                Washed-up true crime writer Ellison Oswalt finds a box of super 8 home movies in his new home
                that suggest the murder that he is currently researching is the work of a serial killer whose legacy dates back to the 1960s.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carouselImages"
              src={imageTwo}
              alt="Second slide"
            />

            <Carousel.Caption className="captionBackground position-static">
              <h3>Coming Soon</h3>
              <p>
                A woman tries to exonerate her brother, who was convicted of murder, by proving that the crime was committed by a supernatural phenomenon.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carouselImages"
              src={imageThree}
              alt="Third slide"
            />

            <Carousel.Caption className="captionBackground position-static">
              <h3>Coming Soon</h3>
              <p>
                A woman is kidnapped by a stranger on a routine flight. Threatened by the potential murder of her father,
                she is pulled into a plot to assist her captor in a political assassination.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    );
  }
}
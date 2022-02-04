import React from 'react';

import './carousel-view.scss';

import imageOne from './movie-posters/readyornotposter.jpg';
import imageTwo from './movie-posters/chuckyposter.jpg';
import imageThree from './movie-posters/dawnofthedead.jpg';

import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';

export class CarouselView extends React.Component {


  render() {

    return (
      <div>
        <div className="carouselSpace">
          <Carousel fade>
            <Carousel.Item>
              <img
                className="d-block carouselImages"
                src={imageOne}
                alt="First slide"
              />
              <Carousel.Caption className="captionBackground position-static">
                <h3>Ready Or Not</h3>
                <p>
                  A bride's wedding night takes a sinister turn when her eccentric new in-laws force her to take part in a terrifying game.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block carouselImages"
                src={imageTwo}
                alt="Second slide"
              />

              <Carousel.Caption className="captionBackground position-static">
                <h3>Child's Play</h3>
                <p>
                  A single mother gives her son a much sought-after doll for his birthday, only to discover that it is possessed by the soul of a serial killer.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block carouselImages"
                src={imageThree}
                alt="Third slide"
              />

              <Carousel.Caption className="captionBackground position-static">
                <h3>Dawn Of The Dead</h3>
                <p>
                  A nurse, a policeman, a young married couple, a salesman and other survivors of a worldwide plague that is producing aggressive, flesh-eating zombies, take refuge in a mega Midwestern shopping mall.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}
import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1, Title: 'Friday The 13th',
          Description: 'A group of camp counselors are stalked and murdered by an unknown assailant while trying to reopen a summer camp which was the site of a child\'s drowning and a grisly double murder years before.',
          Director: 'Sean S. Cunningham',
          Genre: 'Slasher',
          ImagePath: '/images/fridaythe13th.jpg'
        },
        {
          _id: 2,
          Title: 'Nightmare On Elm Street',
          Description: 'The monstrous spirit of a slain child murderer seeks revenge by invading the dreams of teenagers whose parents were responsible for his untimely death.',
          Director: 'Wes Craven',
          Genre: 'Slasher',
          ImagePath: '/images/nightmareonelmstreet.jpg'
        },
        {
          _id: 3,
          Title: 'Silent Hill',
          Description: 'A woman, Rose, goes in search for her adopted daughter within the confines of a strange, desolate town called Silent Hill.',
          Director: 'Christophe Gans',
          Genre: 'Pyschological',
          ImagePath: '/images/silenthill.jpg'
        }
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;
    if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />;

    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}

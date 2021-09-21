import React from 'react';
import { MovieCard } from '../movie-card/movie-card';

export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Friday The 13th', Description: 'Description 1', ImagePath: '...' },
        { _id: 2, Title: 'Nightmare On Elm Street', Description: 'Description 2', ImagePath: '...' },
        { _id: 3, Title: 'SilentHill', Description: 'Description 3', ImagePath: '...' },
      ]
    }
  }

  render() {
    const { movies } = this.state;
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>
    return (
      <div className="main-view">
        {movies.map(movie => <MovieCard />)}
      </div>
    );
  }
}

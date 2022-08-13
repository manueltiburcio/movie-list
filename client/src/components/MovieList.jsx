import React from 'react';
import MovieListEntry from './MovieListEntry.jsx';

const MovieList = ({ movies }) => (
  <div className="movie-list">

  {movies.map(movie => {
    return <MovieListEntry key={movie.id} title={movie.title} watch={movie.watch} />
  })}

  </div>
);

export default MovieList;
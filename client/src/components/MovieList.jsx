import React from 'react';
import MovieListEntry from './MovieListEntry.jsx';

let keyId = 0;

const MovieList = ({ movies }) => (
  <div className="movie-list">

  {movies.map(movie => {
    return <MovieListEntry key={keyId++} title={movie.title} watch={movie.watch} />
  })}

  </div>
);

export default MovieList;
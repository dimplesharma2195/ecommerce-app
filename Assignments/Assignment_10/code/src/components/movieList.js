import React from 'react';
import './movieList.css';

const movies = [
  { id: 1, title: 'A New Hope', year: 1977 },
  { id: 2, title: 'The Empire Strikes Back', year: 1980 },
  { id: 3, title: 'Return of the Jedi', year: 1983 },
  { id: 4, title: 'The Phantom Menace', year: 1999 },
  { id: 5, title: 'Attack of the Clones', year: 2002 },
  { id: 6, title: 'Revenge of the Sith', year: 2005 },
];

const MovieList = () => {
  return (
    <div className="movielist-container">
      <h2>Movie List</h2>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ({movie.year})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
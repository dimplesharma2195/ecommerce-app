import React, { useMemo } from 'react';
import './MovieInfo.css';

const MovieInfo = ({ movies, onDeleteMovie }) => {
  const movieCards = useMemo(
    () =>
      movies.map(movie => (
        <div key={movie.id} className="movie-card">
          <h2>{movie.title}</h2>
          <p className="movie-detail">
            <span className="detail-label">Director:</span>
            <span className="detail-value"> {movie.director}</span>
          </p>
          <p className="movie-detail">
            <span className="detail-label">Genre:</span>
            <span className="detail-value"> {movie.genre}</span>
          </p>
          <p className="movie-detail">
            <span className="detail-label">Release Date:</span>
            <span className="detail-value"> {movie.release_date}</span>
          </p>
          <p>{movie.opening_crawl}</p>
          <button className="fetch-button delete-button" onClick={() => onDeleteMovie(movie.id)}>
            Delete Movie
          </button>
        </div>
      )),
    [movies, onDeleteMovie]
  );

  return <>{movieCards}</>;
};

export default MovieInfo;
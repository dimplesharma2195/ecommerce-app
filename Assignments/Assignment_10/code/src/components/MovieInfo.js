import React, { useMemo } from 'react';
import './MovieInfo.css';

const MovieInfo = ({ movies }) => {
  const movieCards = useMemo(
    () =>
      movies.map((movie) => (
        <div key={movie.episode_id} className="movie-card">
          <h2>{movie.title}</h2>
          <p className="movie-detail">
            <span className="detail-label">Director:</span>
            <span className="detail-value"> {movie.director}</span>
          </p>
          <p className="movie-detail">
            <span className="detail-label">Producer:</span>
            <span className="detail-value"> {movie.producer}</span>
          </p>
          <p className="movie-detail">
            <span className="detail-label">Release Date:</span>
            <span className="detail-value"> {movie.release_date}</span>
          </p>
          <p>{movie.opening_crawl}</p>
        </div>
      )),
    [movies]
  );

  return <>{movieCards}</>;
};

export default MovieInfo;
import React, { useState } from 'react';
import './movie.css';

const Movie = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadMovie = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/1/');
      if (!response.ok) {
        throw new Error('Failed to fetch movie data');
      }
      const data = await response.json();
      setMovie({
        title: data.title,
        director: data.director,
        producer: data.producer,
        release_date: data.release_date,
        opening_crawl: data.opening_crawl,
      });
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="movie-container">
      <button className="fetch-btn" onClick={loadMovie}>
        Fetch Movie
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      {movie && (
        <div className="movie-info">
          <h2>{movie.title}</h2>
          <p>
            <strong>Director:</strong> {movie.director}
          </p>
          <p>
            <strong>Producer:</strong> {movie.producer}
          </p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>{movie.opening_crawl}</p>
        </div>
      )}
    </div>
  );
};

export default Movie;
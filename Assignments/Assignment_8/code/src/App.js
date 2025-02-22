import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const retryTimeoutId = useRef(null);

  const fetchMovies = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying');
      }
      const data = await response.json();
      setMovies(data.results); 
      setError(null);
      setIsLoading(false);
      if (retryTimeoutId.current) {
        clearTimeout(retryTimeoutId.current);
        retryTimeoutId.current = null;
      }
    } catch (err) {
      setError(err.message);
      retryTimeoutId.current = setTimeout(() => {
        fetchMovies();
      }, 5000);
    }
  };

  const cancelRetry = () => {
    if (retryTimeoutId.current) {
      clearTimeout(retryTimeoutId.current);
      retryTimeoutId.current = null;
    }
    setIsLoading(false);
    setError(null);
  };

  return (
    <div className="app-container">
      <button className="fetch-button" onClick={fetchMovies}>
        Fetch Movies
      </button>
      {error && (
        <button className="fetch-button" onClick={cancelRetry} style={{ marginLeft: '10px' }}>
          Cancel
        </button>
      )}
      <hr className="divider" />

      {isLoading && <p style={{ color: 'white' }}>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {movies.map((movie) => (
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
      ))}
    </div>
  );
}

export default App;
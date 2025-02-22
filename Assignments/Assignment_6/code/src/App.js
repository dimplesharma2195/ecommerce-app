import React, { useState } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = async () => {
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      setMovies(data.results); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <button className="fetch-button" onClick={fetchMovies}>
        Fetch Movies
      </button>
      <hr className="divider" />

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
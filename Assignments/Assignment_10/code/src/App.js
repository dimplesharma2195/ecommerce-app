import React, { useState, useEffect, useRef, useCallback } from 'react';
import MovieForm from './components/MovieForm';
import MovieInfo from './components/MovieInfo';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const retryTimeoutId = useRef(null);

  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://swapi.dev/api/films/');
      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying');
      }
      const data = await response.json();
      setMovies(data.results);
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
  }, []);

  const cancelRetry = useCallback(() => {
    if (retryTimeoutId.current) {
      clearTimeout(retryTimeoutId.current);
      retryTimeoutId.current = null;
    }
    setIsLoading(false);
    setError(null);
  }, []);

  useEffect(() => {
    fetchMovies();
    return () => {
      if (retryTimeoutId.current) {
        clearTimeout(retryTimeoutId.current);
      }
    };
  }, [fetchMovies]);

  const handleAddMovie = useCallback((newMovie) => {
    console.log('NewMovieObj:', newMovie);
  }, []);

  return (
    <div className="app-container">
      <MovieForm onAddMovie={handleAddMovie} />
      <hr className="form-separator" />
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
      <MovieInfo movies={movies} />
    </div>
  );
}

export default App;
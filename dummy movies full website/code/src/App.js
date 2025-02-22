import React, { useState, useEffect, useRef, useCallback } from 'react';
import MovieForm from './components/MovieForm';
import MovieInfo from './components/MovieInfo';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const retryTimeoutId = useRef(null);

  // Fetch movies from Firebase Realtime Database
  const fetchMovies = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dummy-movie-27ae3-default-rtdb.firebaseio.com/movies.json');
      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying');
      }
      const data = await response.json();
      let loadedMovies = [];
      if (data) {
        loadedMovies = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
      }
      setMovies(loadedMovies);
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

  const handleAddMovie = useCallback(async (newMovie) => {
    try {
      const response = await fetch('https://dummy-movie-27ae3-default-rtdb.firebaseio.com/movies.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMovie)
      });
      if (!response.ok) {
        throw new Error('Failed to add movie');
      }
      const data = await response.json();
      const createdMovie = { id: data.name, ...newMovie };
      setMovies(prevMovies => [...prevMovies, createdMovie]);
    } catch (err) {
      console.error(err);
    }
  }, []);

  // Handler to delete a movie (DELETE request to Firebase)
  const handleDeleteMovie = useCallback(async (id) => {
    try {
      const response = await fetch(`https://dummy-movie-27ae3-default-rtdb.firebaseio.com/movies/${id}.json`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete movie');
      }
      setMovies(prevMovies => prevMovies.filter(movie => movie.id !== id));
    } catch (err) {
      console.error(err);
    }
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
      {movies.length === 0 && !isLoading && !error ? (
        <p style={{ color: 'white' }}>Currently, no movies are present.</p>
      ) : (
        <MovieInfo movies={movies} onDeleteMovie={handleDeleteMovie} />
      )}
    </div>
  );
}

export default App;
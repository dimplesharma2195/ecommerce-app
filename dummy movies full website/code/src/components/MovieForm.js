import React, { useState, useCallback, useMemo } from 'react';
import './MovieForm.css';

const FormField = ({ field, value, onChange }) => (
  <div className="form-group">
    <label className="form-label">{field.label}</label>
    {field.type === 'textarea' ? (
      <textarea
        name={field.name}
        placeholder={field.placeholder}
        value={value}
        onChange={onChange}
        className="form-input"
        required
      />
    ) : (
      <input
        type={field.type}
        name={field.name}
        placeholder={field.placeholder}
        value={value}
        onChange={onChange}
        className="form-input"
        required
      />
    )}
  </div>
);

const MovieForm = ({ onAddMovie }) => {
  const [newMovie, setNewMovie] = useState({
    title: '',
    director: '',
    genre: '', 
    release_date: '',
    opening_crawl: '',
  });

  const formFields = useMemo(
    () => [
      { label: 'Title', name: 'title', type: 'text', placeholder: 'Movie Title' },
      { label: 'Director', name: 'director', type: 'text', placeholder: 'Director Name' },
      { label: 'Genre', name: 'genre', type: 'text', placeholder: 'Genre' }, 
      { label: 'Release Date', name: 'release_date', type: 'date', placeholder: 'Release Date' },
      { label: 'Description', name: 'opening_crawl', type: 'textarea', placeholder: 'Opening Crawl' },
    ],
    []
  );

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewMovie(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onAddMovie(newMovie);
      setNewMovie({
        title: '',
        director: '',
        genre: '', 
        release_date: '',
        opening_crawl: '',
      });
    },
    [newMovie, onAddMovie]
  );

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {formFields.map(field => (
          <FormField
            key={field.name}
            field={field}
            value={newMovie[field.name]}
            onChange={handleInputChange}
          />
        ))}
        <button type="submit" className="fetch-button">
          Add Movie
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
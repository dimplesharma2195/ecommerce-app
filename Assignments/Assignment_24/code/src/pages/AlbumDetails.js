import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button } from 'react-bootstrap';
import { FaMusic, FaStar, FaRegStar } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';

const albumData = {
  'Album 1': {
    title: 'Album 1',
    price: 100,
    baseImage: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
    filters: [
      { label: 'Original', css: 'none' },
      { label: 'Grayscale', css: 'grayscale(100%)' },
      { label: 'Vibrant', css: 'saturate(200%)' },
    ],
    songs: [
      'Song 1 - Intro',
      'Song 2 - The Journey',
      'Song 3 - The Anthem',
      'Song 4 - Interlude',
      'Song 5 - Finale',
    ],
    reviews: [
      { username: 'John', rating: 5, comment: 'Amazing album! Loved every track.' },
      { username: 'Alice', rating: 4, comment: 'Great beats and soulful lyrics.' },
      { username: 'Bob', rating: 3, comment: 'Good, but could be a bit more varied.' },
    ],
  },
  'Album 2': {
    title: 'Album 2',
    price: 50,
    baseImage: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
    filters: [
      { label: 'Original', css: 'none' },
      { label: 'Grayscale', css: 'grayscale(100%)' },
      { label: 'Vibrant', css: 'saturate(200%)' },
    ],
    songs: [
      'Track 1 - Opening',
      'Track 2 - Echoes',
      'Track 3 - The Beat',
      'Track 4 - Ballad',
      'Track 5 - Closing',
    ],
    reviews: [
      { username: 'Charlie', rating: 4, comment: 'Really enjoyed the vibes.' },
      { username: 'Dave', rating: 5, comment: 'A masterpiece of sound!' },
      { username: 'Eve', rating: 4, comment: 'Energetic and vibrant.' },
    ],
  },
  'Album 3': {
    title: 'Album 3',
    price: 70,
    images: [
      'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
    ],
    filters: [
      { label: 'Original', css: 'none' },
      { label: 'Grayscale', css: 'grayscale(100%)' },
      { label: 'Vibrant', css: 'saturate(200%)' },
    ],
    songs: [
      'Intro - Awakening',
      'Rising - The Sound',
      'Midday - Groove',
      'Sunset - Reflection',
      'Night - Dreams',
    ],
    reviews: [
      { username: 'Frank', rating: 5, comment: 'Incredible sound and production!' },
      { username: 'Grace', rating: 5, comment: 'Loved every track on this album.' },
      { username: 'Heidi', rating: 4, comment: 'Very moving and soulful.' },
    ],
  },
  'Album 4': {
    title: 'Album 4',
    price: 90,
    images: [
      'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
    ],
    filters: [
      { label: 'Original', css: 'none' },
      { label: 'Grayscale', css: 'grayscale(100%)' },
      { label: 'Vibrant', css: 'saturate(200%)' },
    ],
    songs: [
      'Opener - Rise',
      'Flow - Momentum',
      'Beat - Pulse',
      'Chill - Breeze',
      'Closer - Farewell',
    ],
    reviews: [
      { username: 'Ivan', rating: 3, comment: 'Average album; not my taste.' },
      { username: 'Judy', rating: 4, comment: 'Good vibes and catchy tunes.' },
      { username: 'Karl', rating: 2, comment: 'Could be better executed.' },
    ],
  },
};

const AlbumDetails = () => {
  const { albumTitle } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [selectedFilterIndex, setSelectedFilterIndex] = useState(0);
  const [backgroundPos, setBackgroundPos] = useState('center');
  const [hovering, setHovering] = useState(false);

  const album = albumData[albumTitle];

  if (!album) {
    return (
      <Container className="mt-5 pt-5">
        <h2>Album Not Found</h2>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  const baseImage = album.baseImage ? album.baseImage : (album.images ? album.images[0] : '');

  const thumbnails = album.filters
    ? album.filters.map((f) => ({
        label: f.label,
        css: f.css,
        image: baseImage,
      }))
    : [{ label: 'Original', css: 'none', image: baseImage }];

  const getOtherAlbumImage = (otherTitle) => {
    const other = albumData[otherTitle];
    return other.baseImage ? other.baseImage : (other.images ? other.images[0] : '');
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} color="gold" />);
      } else {
        stars.push(<FaRegStar key={i} color="gold" />);
      }
    }
    return stars;
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  const mainImageStyle = {
    width: '100%',
    height: '450px',
    backgroundImage: `url(${baseImage})`,
    backgroundSize: hovering ? '200%' : 'cover',
    backgroundPosition: hovering ? backgroundPos : 'center',
    filter: thumbnails[selectedFilterIndex].css,
    transition: 'background-size 0.2s ease, background-position 0.2s ease',
    cursor: hovering ? 'zoom-out' : 'zoom-in',
  };

  return (
    <Container className="mt-5 pt-5">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
        &larr; Back to Albums
      </Button>

      <Row>
        <Col xs={2}>
          {thumbnails.map((thumb, index) => (
            <div
              key={index}
              onMouseEnter={() => setSelectedFilterIndex(index)}
              style={{
                width: '80px',
                height: '80px',
                marginBottom: '10px',
                backgroundImage: `url(${thumb.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: thumb.css,
                cursor: 'pointer',
                border: selectedFilterIndex === index ? '2px solid blue' : '1px solid #ccc',
              }}
            />
          ))}
        </Col>

        <Col xs={10} md={6}>
          <div
            style={mainImageStyle}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onMouseMove={handleMouseMove}
          />
        </Col>

        <Col md={4} className="mt-4 mt-md-0">
          <h2>{album.title}</h2>
          <h4 className="mt-3">Price: ${album.price}</h4>
          <Button
            variant="success"
            className="fw-bold mt-2 mb-4"
            onClick={() => addToCart({ ...album, quantity: 1 })}
          >
            Add to Cart
          </Button>

          <h5>Songs</h5>
          <ListGroup variant="flush" className="mb-4">
            {album.songs.map((song, index) => (
              <ListGroup.Item key={index}>
                <FaMusic className="me-2" />
                {song}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <h5>Reviews</h5>
          <ListGroup variant="flush">
            {album.reviews.map((review, index) => (
              <ListGroup.Item key={index}>
                <strong>{review.username}</strong> {renderStars(review.rating)}
                <p>{review.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h4>Other Albums You Might Like</h4>
          <Row>
            {Object.keys(albumData)
              .filter((title) => title !== albumTitle)
              .map((otherTitle, index) => (
                <Col xs={6} md={3} key={index} className="mb-3">
                  <Link
                    to={`/album/${otherTitle}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '150px',
                        backgroundImage: `url(${getOtherAlbumImage(otherTitle)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        border: '1px solid #ccc',
                      }}
                    />
                    <p className="mt-2 text-center">{otherTitle}</p>
                  </Link>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AlbumDetails;
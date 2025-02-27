import React, { useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, ListGroup, Button, Form } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa'; 
import { CartContext } from '../context/CartContext';

import tshirt1 from '../assets/tshirt/tshirt1/tshirt_1.jpg';
import tshirt1_1 from '../assets/tshirt/tshirt1/tshirt_1.1.jpg';
import tshirt1_2 from '../assets/tshirt/tshirt1/tshirt_1.2.jpg';
import tshirt1_3 from '../assets/tshirt/tshirt1/tshirt_1.3.jpg';

import tshirt2 from '../assets/tshirt/tshirt2/tshirt_2.jpg';
import tshirt2_1 from '../assets/tshirt/tshirt2/tshirt_2.1.jpg';
import tshirt2_2 from '../assets/tshirt/tshirt2/tshirt_2.2.jpg';
import tshirt2_3 from '../assets/tshirt/tshirt2/tshirt_2.3.jpg';

import tshirt3 from '../assets/tshirt/tshirt3/tshirt_3.jpg';
import tshirt3_1 from '../assets/tshirt/tshirt3/tshirt_3.1.jpg';
import tshirt3_2 from '../assets/tshirt/tshirt3/tshirt_3.2.jpg';
import tshirt3_3 from '../assets/tshirt/tshirt3/tshirt_3.3.jpg';

import cup1 from '../assets/cup/cup1/cup1.jpg';
import cup1_1 from '../assets/cup/cup1/cup1.1.jpg';
import cup1_2 from '../assets/cup/cup1/cup1.2.jpg';
import cup1_3 from '../assets/cup/cup1/cup1.3.jpg';

import cup2 from '../assets/cup/cup2/cup2.jpg';
import cup2_1 from '../assets/cup/cup2/cup2.1.jpg';
import cup2_2 from '../assets/cup/cup2/cup2.2.jpg';
import cup2_3 from '../assets/cup/cup2/cup2.3.jpg';

import cup3 from '../assets/cup/cup3/cup3.jpg';
import cup3_1 from '../assets/cup/cup3/cup3.1.jpg';
import cup3_2 from '../assets/cup/cup3/cup3.2.jpg';
import cup3_3 from '../assets/cup/cup3/cup3.3.jpg';

const merchData = {
  tshirt: {
    '1': {
      title: 'T-Shirt',
      price: 19.99,
      description: 'A high-quality, comfortable t-shirt made from 100% cotton. Perfect for casual wear.',
      sizes: ['S', 'M', 'L', 'XL'],
      thumbnails: [tshirt1, tshirt1_1, tshirt1_2, tshirt1_3],
      reviews: [
        { username: 'Alice', rating: 5, comment: 'Excellent quality!' },
        { username: 'Bob', rating: 4, comment: 'Very comfortable.' },
      ],
    },
    '2': {
      title: 'T-Shirt',
      price: 21.99,
      description: 'A stylish t-shirt perfect for everyday wear.',
      sizes: ['S', 'M', 'L', 'XL'],
      thumbnails: [tshirt2, tshirt2_1, tshirt2_2, tshirt2_3],
      reviews: [
        { username: 'Charlie', rating: 4, comment: 'Nice design!' },
        { username: 'Dave', rating: 3, comment: 'Could be better.' },
      ],
    },
    '3': {
      title: 'T-Shirt',
      price: 18.99,
      description: 'A casual t-shirt with a modern look.',
      sizes: ['S', 'M', 'L', 'XL'],
      thumbnails: [tshirt3, tshirt3_1, tshirt3_2, tshirt3_3],
      reviews: [
        { username: 'Eve', rating: 5, comment: 'Love it!' },
        { username: 'Frank', rating: 4, comment: 'Great value.' },
      ],
    },
  },
  cup: {
    '1': {
      title: 'Coffee Cup',
      price: 6.99,
      description: 'A durable ceramic coffee cup to kickstart your day with style.',
      thumbnails: [cup1, cup1_1, cup1_2, cup1_3],
      reviews: [
        { username: 'Grace', rating: 4, comment: 'Nice cup.' },
        { username: 'Heidi', rating: 5, comment: 'Very stylish.' },
      ],
    },
    '2': {
      title: 'Coffee Cup',
      price: 7.99,
      description: 'A modern coffee cup with a sleek design.',
      thumbnails: [cup2, cup2_1, cup2_2, cup2_3],
      reviews: [
        { username: 'Ivan', rating: 4, comment: 'Good quality.' },
        { username: 'Judy', rating: 3, comment: 'Not bad.' },
      ],
    },
    '3': {
      title: 'Coffee Cup',
      price: 6.49,
      description: 'A classic coffee cup that never goes out of style.',
      thumbnails: [cup3, cup3_1, cup3_2, cup3_3],
      reviews: [
        { username: 'Karl', rating: 5, comment: 'Perfect cup!' },
        { username: 'Laura', rating: 5, comment: 'I love it!' },
      ],
    },
  },
};

const MerchDetails = () => {
  const { merchType, productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [backgroundPos, setBackgroundPos] = useState('center');
  const [hovering, setHovering] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');

  const product = merchData[merchType]?.[productId];
  if (!product) {
    return (
      <Container className="mt-5 pt-5">
        <h2>Product Not Found</h2>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  if (merchType === 'tshirt' && !selectedSize && product.sizes?.length) {
    setSelectedSize(product.sizes[0]);
  }

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  const mainImageStyle = {
    width: '100%',
    height: '450px',
    backgroundImage: `url(${product.thumbnails[selectedImageIndex]})`,
    backgroundSize: hovering ? '200%' : 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: hovering ? backgroundPos : 'center',
    transition: 'background-size 0.2s ease, background-position 0.2s ease',
    cursor: hovering ? 'zoom-out' : 'zoom-in',
  };

  const similarProducts = Object.keys(merchData[merchType]).filter((id) => id !== productId);

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

  const QuantitySelector = () => (
    <div style={{ display: 'flex', alignItems: 'center', maxWidth: '120px' }}>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
      >
        –
      </Button>
      <Form.Control
        type="text"
        value={quantity}
        readOnly
        style={{ textAlign: 'center', maxWidth: '40px', margin: '0 5px', padding: '0.2rem' }}
      />
      <Button variant="secondary" size="sm" onClick={() => setQuantity((prev) => prev + 1)}>
        +
      </Button>
    </div>
  );

  return (
    <Container className="mt-5 pt-5">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
        &larr; Back
      </Button>

      <Row>
        <Col xs={2}>
          {product.thumbnails.map((img, index) => (
            <div key={index} style={{ marginBottom: '10px', textAlign: 'center' }}>
              <div
                onMouseEnter={() => setSelectedImageIndex(index)}
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  cursor: 'pointer',
                  border: selectedImageIndex === index ? '2px solid blue' : '1px solid #ccc',
                }}
              />
              <small>Image {index + 1}</small>
            </div>
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
          <h2>{product.title}</h2>
          <h4 className="mt-3">Price: ${product.price}</h4>
          <p className="mt-3">{product.description}</p>

          {merchType === 'tshirt' && product.sizes && (
            <>
              <h5 className="mt-3">Select Size</h5>
              <Form>
                {product.sizes.map((size, idx) => (
                  <Form.Check
                    inline
                    key={idx}
                    type="radio"
                    label={size}
                    name="sizeOptions"
                    id={`size-${size}`}
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                  />
                ))}
              </Form>
            </>
          )}

          <h5 className="mt-3">Select Quantity</h5>
          <QuantitySelector />

          <Button
            variant="success"
            className="fw-bold mt-3"
            onClick={() =>
              addToCart({
                ...product,
                quantity,
                ...(merchType === 'tshirt' ? { size: selectedSize } : {}),
              })
            }
          >
            Add to Cart
          </Button>

          <h5 className="mt-4">Reviews</h5>
          <ListGroup variant="flush">
            {product.reviews.map((review, idx) => (
              <ListGroup.Item key={idx}>
                <strong>{review.username}</strong> {renderStars(review.rating)}
                <p className="mb-0">{review.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h4>Other {merchType === 'tshirt' ? 'T-Shirts' : 'Cups'} You Might Like</h4>
          <Row>
            {similarProducts.map((otherId, index) => (
              <Col xs={6} md={3} key={index} className="mb-3">
                <Link
                  to={`/merch/${merchType}/${otherId}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '150px',
                      backgroundImage: `url(${merchData[merchType][otherId].thumbnails[0]})`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      border: '1px solid #ccc',
                    }}
                  />
                  <p className="mt-2 text-center">{merchData[merchType][otherId].title}</p>
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MerchDetails;
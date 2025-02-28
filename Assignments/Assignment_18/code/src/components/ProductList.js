import React, { useContext, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import tshirt1 from '../assets/tshirt/tshirt1/tshirt_1.jpg';
import cup1 from '../assets/cup/cup1/cup1.jpg';

const musicArr = [
  {
    title: 'Album 1',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
  },
  {
    title: 'Album 2',
    price: 50,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
  },
  {
    title: 'Album 3',
    price: 70,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
  },
  {
    title: 'Album 4',
    price: 100,
    imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
  },
];

const merchArr = [
  {
    type: 'tshirt',
    productId: '1',
    title: 'T-Shirt',
    price: 19.99,
    imageUrl: tshirt1,
  },
  {
    type: 'cup',
    productId: '1',
    title: 'Coffee Cup',
    price: 6.99,
    imageUrl: cup1,
  },
];

const ProductList = () => {
  const { addToCart, openCart } = useContext(CartContext);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <div className="bg-secondary text-center py-4 mt-5">
        <h1 className="text-white fw-bold" style={{ fontSize: '6rem', fontFamily: 'Times New Roman' }}>
          The Generics
        </h1>
      </div>

      <div className="text-center py-2">
        <h3 className="fw-bold text-uppercase" style={{ fontFamily: 'cursive' }}>Music</h3>
      </div>
      <Container className="my-3">
        <Row className="g-4 justify-content-center">
          {musicArr.map((item, index) => (
            <Col md={6} key={index} className="text-center d-flex flex-column align-items-center">
              <Link to={`/album/${item.title}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)} style={{ overflow: 'hidden', width: '250px', height: '250px' }}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      transform: hoveredIndex === index ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
                </div>
                <h5 className="fw-bold mb-2 mt-3" style={{ fontFamily: 'Times New Roman' }}>{item.title}</h5>
              </Link>
              <p className="mt-1" style={{ fontSize: '1.2rem' }}>${item.price}</p>
              <Button variant="info" style={{ color: '#fff' }} className="fw-bold px-4" onClick={() => addToCart(item)}>ADD TO CART</Button>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="text-center py-2">
        <h3 className="fw-bold text-uppercase" style={{ fontFamily: 'cursive' }}>Merch</h3>
      </div>
      <Container className="my-3">
        <Row className="g-4 justify-content-center">
          {merchArr.map((item, idx) => (
            <Col md={6} key={idx} className="text-center d-flex flex-column align-items-center">
              <Link to={`/merch/${item.type}/${item.productId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div onMouseEnter={() => setHoveredIndex(`merch-${idx}`)} onMouseLeave={() => setHoveredIndex(null)} style={{ overflow: 'hidden', width: '250px', height: '250px' }}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      transform: hoveredIndex === `merch-${idx}` ? 'scale(1.1)' : 'scale(1)',
                    }}
                  />
                </div>
                <h5 className="fw-bold mb-2 mt-3" style={{ fontFamily: 'Times New Roman' }}>{item.title}</h5>
              </Link>
              <p className="mt-1" style={{ fontSize: '1.2rem' }}>${item.price}</p>
              <Button variant="info" style={{ color: '#fff' }} className="fw-bold px-4" onClick={() => addToCart(item)}>ADD TO CART</Button>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="text-center mb-4">
        <Button variant="secondary" className="fw-bold px-4" onClick={openCart}>See the cart</Button>
      </div>
    </>
  );
};

export default ProductList;
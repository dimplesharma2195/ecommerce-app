import React, { useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

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
    title: 'T-Shirt',
    price: 19.99,
    imageUrl: 'https://raw.githubusercontent.com/prasadyash2411/ecom-website/main/img/Shirt.png',
  },
  {
    title: 'Coffee Cup',
    price: 6.99,
    imageUrl: 'https://raw.githubusercontent.com/prasadyash2411/ecom-website/main/img/Cofee.png',
  },
];

const ProductList = () => {
  const { addToCart, openCart } = useContext(CartContext);

  return (
    <>
      <div className="bg-secondary text-center py-4 mt-5">
        <h1 className="text-white fw-bold" style={{ fontSize: '6rem', fontFamily: 'Times New Roman' }}>
          The Generics
        </h1>
      </div>

      <div className="text-center py-2">
        <h3 className="fw-bold text-uppercase" style={{ fontFamily: 'cursive' }}>
          Music
        </h3>
      </div>

      <Container className="my-3">
        <Row className="g-4 justify-content-center">
          {musicArr.map((item, index) => (
            <Col md={6} key={index} className="text-center d-flex flex-column align-items-center">
              <h5 className="fw-bold mb-2" style={{ fontFamily: 'Times New Roman' }}>
                {item.title}
              </h5>
              <img src={item.imageUrl} alt={item.title} style={{ width: '250px', height: '250px', objectFit: 'cover' }} />
              <p className="mt-2" style={{ fontSize: '1.2rem' }}>
                ${item.price}
              </p>
              <Button variant="info" style={{ color: '#fff' }} className="fw-bold px-4" onClick={() => addToCart(item)}>
                ADD TO CART
              </Button>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="text-center py-2">
        <h3 className="fw-bold text-uppercase" style={{ fontFamily: 'cursive' }}>
          Merch
        </h3>
      </div>

      <Container className="my-3">
        <Row className="g-4 justify-content-center">
          {merchArr.map((item, idx) => (
            <Col md={6} key={idx} className="text-center d-flex flex-column align-items-center">
              <h5 className="fw-bold mb-2" style={{ fontFamily: 'Times New Roman' }}>
                {item.title}
              </h5>
              <img src={item.imageUrl} alt={item.title} style={{ width: '250px', height: '250px', objectFit: 'cover' }} />
              <p className="mt-2" style={{ fontSize: '1.2rem' }}>
                ${item.price}
              </p>
              <Button variant="info" style={{ color: '#fff' }} className="fw-bold px-4" onClick={() => addToCart(item)}>
                ADD TO CART
              </Button>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="text-center mb-4">
        <Button variant="secondary" className="fw-bold px-4" onClick={openCart}>
          See the cart
        </Button>
      </div>
    </>
  );
};

export default ProductList;
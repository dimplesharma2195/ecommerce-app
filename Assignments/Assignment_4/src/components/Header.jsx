import React, { useContext } from 'react';
import { Navbar, Container, Nav, Button, Badge, Row, Col } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';
import { FaShoppingCart } from 'react-icons/fa';

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container fluid>
        <Row className="w-100 align-items-center">
          <Col xs={4}></Col>
          <Col xs={4} className="text-center">
            <Nav className="justify-content-center">
              <Nav.Link className="text-uppercase" href="#">HOME</Nav.Link>
              <Nav.Link className="text-uppercase" href="#">STORE</Nav.Link>
              <Nav.Link className="text-uppercase" href="#">ABOUT</Nav.Link>
            </Nav>
          </Col>
          <Col xs={4} className="text-end">
            <Button 
              style={{ backgroundColor: 'black', border: '1px solid white' }} 
              className="position-relative"
            >
              <FaShoppingCart color="white" />
              <span className="ms-1 text-uppercase" style={{ color: 'white' }}>Cart</span>
              <Badge 
                bg="light" 
                text="dark" 
                pill 
                className="position-absolute top-0 start-100 translate-middle"
              >
                {cartCount}
              </Badge>
            </Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Header;
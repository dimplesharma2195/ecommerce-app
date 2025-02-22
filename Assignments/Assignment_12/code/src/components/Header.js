import React, { useContext } from 'react';
import { Navbar, Container, Nav, Button, Badge, Row, Col } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { NavLink, useLocation } from 'react-router-dom';

const Header = () => {
  const { cartItems, openCart } = useContext(CartContext);
  const location = useLocation();

  // Sum all item quantities
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Navbar fixed="top" style={{ backgroundColor: '#000000', fontFamily: 'Times New Roman' }} variant="dark">
      <Container fluid>
        <Row className="w-100 align-items-center">
          {/* Left (empty) */}
          <Col xs={4} />

          {/* Center Navigation */}
          <Col xs={4}>
            <Nav className="justify-content-center">
              <NavLink
                to="/"
                className="mx-4"
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  letterSpacing: '2px',
                  textDecoration: 'none',
                  color: '#fff',
                }}
              >
                HOME
              </NavLink>

              <NavLink
                to="/store"
                className="mx-4"
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  letterSpacing: '2px',
                  textDecoration: 'none',
                  color: '#fff',
                }}
              >
                STORE
              </NavLink>

              <NavLink
                to="/about"
                className="mx-4"
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  letterSpacing: '2px',
                  textDecoration: 'none',
                  color: '#fff',
                }}
              >
                ABOUT
              </NavLink>
              
              {/* New Contact US Link */}
              <NavLink
                to="/contact"
                className="mx-4"
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.2rem',
                  letterSpacing: '2px',
                  textDecoration: 'none',
                  color: '#fff',
                }}
              >
                CONTACT US
              </NavLink>
            </Nav>
          </Col>

          {/* Right - Cart Button (ONLY on Store page) */}
          <Col xs={4} className="text-end">
            {location.pathname === '/store' && (
              <Button
                style={{
                  backgroundColor: 'black',
                  border: '1px solid white',
                  fontFamily: 'Times New Roman',
                  fontWeight: 'bold',
                }}
                className="position-relative"
                onClick={openCart}
              >
                CART <FaShoppingCart color="white" style={{ marginLeft: '6px' }} />
                <Badge bg="light" text="dark" pill className="position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </Badge>
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default Header;
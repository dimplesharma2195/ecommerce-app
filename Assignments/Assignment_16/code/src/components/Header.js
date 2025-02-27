import React, { useContext } from 'react';
import { Navbar, Container, Nav, Button, Badge, Row, Col } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { CartContext } from '../context/CartContext';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const { cartItems, openCart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const showCartButton =
    location.pathname === '/store' ||
    location.pathname.startsWith('/album/') ||
    location.pathname.startsWith('/merch/');

  const handleAuthClick = () => {
    navigate('/auth');
  };

  return (
    <Navbar fixed="top" style={{ backgroundColor: '#000', fontFamily: 'Times New Roman' }} variant="dark">
      <Container fluid>
        <Row className="w-100 align-items-center">
          <Col xs={4} />
          <Col xs={4}>
            <Nav className="justify-content-center">
              <NavLink to="/" style={navLinkStyle}>
                HOME
              </NavLink>
              <NavLink to="/store" style={navLinkStyle}>
                STORE
              </NavLink>
              <NavLink to="/about" style={navLinkStyle}>
                ABOUT<br />US
              </NavLink>
              <NavLink to="/contact" style={navLinkStyle}>
                CONTACT
              </NavLink>
            </Nav>
          </Col>
          <Col xs={4} className="text-end">
            <Button
              onClick={handleAuthClick}
              style={{
                backgroundColor: 'black',
                border: '1px solid white',
                fontFamily: 'Times New Roman',
                fontWeight: 'bold',
                marginRight: '10px',
              }}
              className="position-relative"
            >
              LOG IN / SIGN UP
            </Button>
            {showCartButton && (
              <Button
                onClick={openCart}
                style={{
                  backgroundColor: 'black',
                  border: '1px solid white',
                  fontFamily: 'Times New Roman',
                  fontWeight: 'bold',
                }}
                className="position-relative"
              >
                CART <FaShoppingCart color="white" style={{ marginLeft: '6px' }} />
                <Badge
                  bg="light"
                  text="dark"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
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

const navLinkStyle = {
  fontWeight: 'bold',
  fontSize: '1.2rem',
  letterSpacing: '2px',
  textDecoration: 'none',
  color: '#fff',
  margin: '0 10px',
  textAlign: 'center',
};

export default Header;
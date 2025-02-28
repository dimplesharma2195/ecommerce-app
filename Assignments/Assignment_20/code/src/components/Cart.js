import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Container, ListGroup } from 'react-bootstrap';

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <Container className="mt-3">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ListGroup>
          {cartItems.map((item, index) => (
            <ListGroup.Item key={index}>
              {item.title} – {item.quantity}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Cart;
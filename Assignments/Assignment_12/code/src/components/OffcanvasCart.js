import React, { useContext } from 'react';
import { Offcanvas, Button, Table } from 'react-bootstrap';
import { CartContext } from '../context/CartContext';

const OffcanvasCart = () => {
  const {
    cartItems,
    showCart,
    closeCart,
    setCartItems,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
    openPurchaseMessage,
  } = useContext(CartContext);

  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  // Purchase handler
  const handlePurchase = () => {
    if (cartItems.length === 0) {
      openPurchaseMessage('Cart is empty. Please add items for purchase.');
    } else {
      openPurchaseMessage('Congratulations on your purchase! 🎉');
      setCartItems([]); // Reset cart after purchase
      closeCart();
    }
  };

  return (
    <Offcanvas show={showCart} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="mx-auto fs-3 fw-bold">CART</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="text-center">
        {/* Table Header */}
        <Table borderless>
          <thead>
            <tr className="fw-bold border-bottom">
              <th>ITEM</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{ width: '50px', height: '50px', marginRight: '8px' }}
                      />
                    )}
                    {item.title}
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <Button variant="light" size="sm" onClick={() => decreaseQuantity(item.title)}>
                      –
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button variant="light" size="sm" onClick={() => increaseQuantity(item.title)}>
                      +
                    </Button>
                  </td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => removeItem(item.title)}>
                      REMOVE
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3"></td> 
              </tr>
            )}
          </tbody>
        </Table>

        
        <h4 className="fw-bold mt-3">
          Total <span className="fs-5">${totalPrice}</span>
        </h4>

        <Button
          variant="info"
          className="text-white fw-bold px-4 mt-3"
          onClick={handlePurchase}
        >
          PURCHASE
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasCart;
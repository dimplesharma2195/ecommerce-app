// src/context/CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // For purchase message (centered modal)
  const [showPurchaseMessage, setShowPurchaseMessage] = useState(false);
  const [purchaseMessage, setPurchaseMessage] = useState('');

  // Open/Close Cart Offcanvas
  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  // Open/Close Purchase Message
  const openPurchaseMessage = (message) => {
    setPurchaseMessage(message);
    setShowPurchaseMessage(true);
  };
  const closePurchaseMessage = () => {
    setPurchaseMessage('');
    setShowPurchaseMessage(false);
    // Ensure cart is closed if user closes the message
    closeCart();
  };

  // Add item or increase quantity
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.title === product.title);
      if (existing) {
        return prevItems.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  // Increase/Decrease quantity
  const increaseQuantity = (title) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.title === title ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const decreaseQuantity = (title) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.title === title
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item altogether
  const removeItem = (title) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.title !== title));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        showCart,
        openCart,
        closeCart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        // Purchase message
        showPurchaseMessage,
        openPurchaseMessage,
        closePurchaseMessage,
        purchaseMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
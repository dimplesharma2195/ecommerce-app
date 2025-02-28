import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

const API_BASE = 'https://crudcrud.com/api/YOUR_UNIQUE_ENDPOINT';

export const CartProvider = ({ children }) => {
  const { userEmail } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  const sanitizeEmail = (email) => {
    return email.replace(/[@.]/g, '');
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.title === product.title);
      let updated;
      if (existing) {
        updated = prevItems.map((item) =>
          item.title === product.title
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        updated = [...prevItems, product];
      }
      saveCartToBackend(updated);
      return updated;
    });
  };

  const saveCartToBackend = async (items) => {
    if (!userEmail) return;
    const sanitizedEmail = sanitizeEmail(userEmail);
    try {
      await fetch(`${API_BASE}/cart${sanitizedEmail}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(items),
      });
    } catch (err) {
      console.error('Error saving cart to backend:', err);
    }
  };

  const loadCartFromBackend = async () => {
    if (!userEmail) return;
    const sanitizedEmail = sanitizeEmail(userEmail);
    try {
      const response = await fetch(`${API_BASE}/cart${sanitizedEmail}`);
      const data = await response.json();
      if (data && data.length > 0) {
        setCartItems(data[data.length - 1]);
      }
    } catch (err) {
      console.error('Error loading cart from backend:', err);
    }
  };

  useEffect(() => {
    loadCartFromBackend();
  }, [userEmail]);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, addToCart, loadCartFromBackend }}>
      {children}
    </CartContext.Provider>
  );
};
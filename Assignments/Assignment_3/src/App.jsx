// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import OffcanvasCart from './components/CartPage';
import PurchaseMessageModal from './components/Modal';
import ProductList from './components/ProductList';
import Footer from './components/Footer'; 

const App = () => {
  return (
    <CartProvider>
      <Header />
      <OffcanvasCart />
      <PurchaseMessageModal />
      <ProductList />
      <Footer />
    </CartProvider>
  );
};

export default App;
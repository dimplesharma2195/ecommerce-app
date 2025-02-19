import React from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Header />
      <div>
        <ProductList />
      </div>
      <Footer />
    </CartProvider>
  );
}

export default App;

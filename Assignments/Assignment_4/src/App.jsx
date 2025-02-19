import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import OffcanvasCart from './components/CartPage';
import PurchaseMessageModal from './components/Modal';
import About from './pages/About';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
        <OffcanvasCart />
        <PurchaseMessageModal />
        <Footer />
      </Router>
    </CartProvider>
  );
};

export default App;
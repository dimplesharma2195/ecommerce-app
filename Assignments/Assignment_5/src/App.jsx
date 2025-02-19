import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import OffcanvasCart from './components/CartPage';
import PurchaseMessageModal from './components/Modal';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
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
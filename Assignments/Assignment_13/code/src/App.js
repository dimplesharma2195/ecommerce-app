import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import Contact from './pages/Contact';
import AlbumDetails from './pages/AlbumDetails';
import MerchDetails from './pages/MerchDetails';
import { CartProvider } from './context/CartContext';
import OffcanvasCart from './components/OffcanvasCart';
import PurchaseMessageModal from './components/Modal';

function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/album/:albumTitle" element={<AlbumDetails />} />
          <Route path="/merch/:merchType/:productId" element={<MerchDetails />} />
        </Routes>
        <Footer />
        <OffcanvasCart />
        <PurchaseMessageModal />
      </Router>
    </CartProvider>
  );
}

export default App;
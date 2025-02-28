import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import OffcanvasCart from './components/OffcanvasCart';
import PurchaseMessageModal from './components/Modal';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import Contact from './pages/Contact';
import AlbumDetails from './pages/AlbumDetails';
import MerchDetails from './pages/MerchDetails';
import Auth from './pages/Auth';
import ChangePassword from './pages/ChangePassword';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/store"
              element={
                <ProtectedRoute>
                  <Store />
                </ProtectedRoute>
              }
            />
            <Route
              path="/album/:albumTitle"
              element={
                <ProtectedRoute>
                  <AlbumDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/merch/:merchType/:productId"
              element={
                <ProtectedRoute>
                  <MerchDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route path="/auth" element={<Auth />} />
          </Routes>
          <Footer />
          <OffcanvasCart />
          <PurchaseMessageModal />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
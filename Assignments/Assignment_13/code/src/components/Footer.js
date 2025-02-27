import React from 'react';
import { Container } from 'react-bootstrap';
import { FaYoutube, FaSpotify, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-info text-white py-4"> 
      <Container className="d-flex flex-column align-items-center">
        <h2 className="fw-bold mb-2">The Generics</h2> 
        <div className="d-flex gap-3">
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube size={30} color="white" />
          </a>
          <a href="https://spotify.com" target="_blank" rel="noopener noreferrer">
            <FaSpotify size={30} color="white" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={30} color="white" />
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
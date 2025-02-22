import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const Contact = () => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!contactData.name || !contactData.email || !contactData.phone) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('https://ecomm-web-eb417-default-rtdb.firebaseio.com/contacts.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        setError('Failed to submit data.');
      }
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <>
      <div className="bg-secondary text-center py-4 mt-5">
        <h1 className="text-white fw-bold" style={{ fontSize: '6rem', fontFamily: 'Times New Roman' }}>
          The Generics
        </h1>
      </div>
      <Container className="my-5">
        <h2 className="text-center mb-4">Contact Us</h2>
        {submitted ? (
          <p className="text-center text-success fw-bold">
            Thank you for contacting us. We will get back to you soon.
          </p>
        ) : (
          <Form onSubmit={handleSubmit}>
            {error && <p className="text-danger text-center">{error}</p>}

            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your name" 
                name="name" 
                value={contactData.name} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter your email" 
                name="email" 
                value={contactData.email} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter your phone number" 
                name="phone" 
                value={contactData.phone} 
                onChange={handleChange} 
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="fw-bold">
              Submit
            </Button>
          </Form>
        )}
      </Container>
    </>
  );
};

export default Contact;

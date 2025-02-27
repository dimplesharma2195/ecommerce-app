import React, { useState } from 'react';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        'https://ecomm-web-eb417-default-rtdb.firebaseio.com/users.json',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Sign Up Failed');
      }
      setIsLoading(false);
      alert('Sign Up successful!');
      setEmail('');
      setPassword('');
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container className="flex-grow-1 mt-5 pt-5" style={{ maxWidth: '500px' }}>
        <h2 className="mb-4">Sign Up</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSignUp}>
          <Form.Group className="mb-3" controlId="signupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="signupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="text-center">
            {isLoading ? (
              <Button variant="primary" disabled>
                <Spinner animation="border" size="sm" className="me-2" />
                Signing Up...
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            )}
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default SignUp;
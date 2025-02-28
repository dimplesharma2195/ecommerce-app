import React, { useState, useContext } from 'react';
import { Container, Form, Button, Spinner, Alert, Nav } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Auth = () => {
  const [authMode, setAuthMode] = useState('login');
  
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  
  const [name, setName]         = useState('');
  const [phone, setPhone]       = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]         = useState('');
  
  const { login } = useContext(AuthContext);
  
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    if (authMode === 'login') {
      try {
        const response = await fetch(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=YOUR_API_KEY',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email,
              password,
              returnSecureToken: true,
            }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error.message || 'Authentication failed');
        }
        login(data.idToken);
        console.log("Login successful, token:", data.idToken);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    } else {
      try {
        const response = await fetch(
          'https://ecomm-web-eb417-default-rtdb.firebaseio.com/users.json',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone, email, password }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Sign Up failed');
        }
        setIsLoading(false);
        alert('Sign Up successful!');
        setName('');
        setPhone('');
        setEmail('');
        setPassword('');
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flexGrow: 1 }}>
        <Container className="mt-5 pt-5" style={{ maxWidth: '500px' }}>
          <h2 className="mb-4 text-center">
            {authMode === 'login' ? 'Login' : 'Create Account'}
          </h2>
          
          <Nav variant="tabs" defaultActiveKey="login" className="mb-4">
            <Nav.Item>
              <Nav.Link
                eventKey="login"
                onClick={() => setAuthMode('login')}
                active={authMode === 'login'}
              >
                Login
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="signup"
                onClick={() => setAuthMode('signup')}
                active={authMode === 'signup'}
              >
                Create Account
              </Nav.Link>
            </Nav.Item>
          </Nav>
          
          {error && <Alert variant="danger">Authentication failed: {error}</Alert>}
          
          <Form onSubmit={handleAuthSubmit}>
            {authMode === 'signup' && (
              <>
                <Form.Group className="mb-3" controlId="signupName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="signupPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={phone}
                    required
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </>
            )}
            
            <Form.Group className="mb-3" controlId="authEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            
            <Form.Group className="mb-4" controlId="authPassword">
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
                  {authMode === 'login' ? 'Logging In...' : 'Creating Account...'}
                </Button>
              ) : (
                <Button variant="primary" type="submit">
                  {authMode === 'login' ? 'Login' : 'Create Account'}
                </Button>
              )}
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default Auth;
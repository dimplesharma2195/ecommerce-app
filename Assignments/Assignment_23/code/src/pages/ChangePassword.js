import React, { useState, useContext, useEffect } from 'react';
import { Container, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const { token, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/auth');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=YOUR_API_KEY`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            idToken: token,
            password: newPassword,
            returnSecureToken: true,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message || 'Password change failed');
      }
      login(data.idToken);
      setSuccess('Password changed successfully! Please use your new password next time.');
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <Container className="mt-5 pt-5" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4 text-center">Change Password</h2>
      {error && <Alert variant="danger">Error: {error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="newPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            required
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </Form.Group>
        <div className="text-center">
          {isLoading ? (
            <Button variant="primary" disabled>
              <Spinner animation="border" size="sm" className="me-2" />
              Changing...
            </Button>
          ) : (
            <Button variant="primary" type="submit">
              Change Password
            </Button>
          )}
        </div>
      </Form>
    </Container>
  );
};

export default ChangePassword;
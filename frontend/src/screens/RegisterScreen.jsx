import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import useRegister from '../features/auth/useRegister';

function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { register, isPending } = useRegister();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) return;
    if (password !== confirmPassword) return;

    register(
      { name, email, password },
      {
        onSettled: () => {
          setName('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
        },
      }
    );
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          disabled={
            !name || !email || !password || !confirmPassword || isPending
          }
        >
          Register
        </Button>
      </Form>

      {/* <Row>
        <Col>
          New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row> */}

      <Row className="py-3">
        <Col>
          Already have an account?{' '}
          <Link to="/login">
            <strong>Sign In</strong>
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterScreen;

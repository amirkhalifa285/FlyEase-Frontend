import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Styled Components (same as before)
const Body = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url('/logo.jpeg') no-repeat center center/cover;
  background-size: cover;
`;

const Container = styled.div`
  background: rgba(255, 255, 255, 0.9);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3);
  text-align: center;
  width: 90%;
  max-width: 400px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 28px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0px 0px 5px rgba(0, 123, 255, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(135deg, #4c8cfa, #006aff);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #006aff, #4c8cfa);
    transform: translateY(-3px);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(2px);
  }
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      const { role, token } = response.data;

      // Save token for future authenticated requests
      localStorage.setItem('token', token);

      // Redirect based on role
      if (role === 'service_provider') {
        navigate('/service-provider-interface');
      } else if (role === 'passenger') {
        navigate('/UserInterface');
      } else {
        alert('Unknown role. Please contact support.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid username or password');
    }
  };

  return (
    <Body>
      <Container>
        <Title>Login</Title>
        <form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit">Login</Button>
        </form>
      </Container>
    </Body>
  );
};

export default Login;
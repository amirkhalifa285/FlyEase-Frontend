import React from 'react';
import styled from 'styled-components';

// Styled Components
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
    border-color: #28a745;
    box-shadow: 0px 0px 5px rgba(40, 167, 69, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(135deg, #34c759, #28a745);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #28a745, #34c759);
    transform: translateY(-3px);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(2px);
  }
`;

const Signup = () => {
  return (
    <Body>
      <Container>
        <Title>Sign Up</Title>
        <form>
          <Input type="text" placeholder="Full Name" required />
          <Input type="email" placeholder="Email" required />
          <Input type="password" placeholder="Password" required />
          <Input type="password" placeholder="Confirm Password" required />
          <Button type="submit">Sign Up</Button>
        </form>
      </Container>
    </Body>
  );
};

export default Signup;
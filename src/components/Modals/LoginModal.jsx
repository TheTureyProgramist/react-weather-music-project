import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  0% {
    transform: translateY(100%) scale(0.5);
    opacity: 0;
  }
  100% {
    transform: translateY(0%) scale(1);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% { 
    transform: translateY(0%) scale(1); 
    opacity: 1; 
  }
  100% { 
    transform: translateY(100%) scale(0.5); 
    opacity: 0; 
  }
`;

const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  backdrop-filter: blur(3px);
  align-items: center;
  z-index: 1000;
  animation: ${props => (props.$isClosing ? fadeOut : "none")} 0.5s ease-out forwards;
`;

const ModalContent = styled.form`
  background: white;
  padding: 30px;
  border-radius: 15px;
  background: #00f7ffa9;
  width: 90%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
  animation: ${props => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out forwards;
`;
const Input = styled.input`
  padding: 12px;
  border: 2px solid black;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  background: #ffb36c;
  color: black;
  font-weight: bold;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid black;
  cursor: pointer;
  &:hover {
    background: #ffa04d;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 34px;
  cursor: pointer;
  color: #000000;
  &:hover {
    color: #ff7b00;
  }
`;
const Title = styled.h3`
font-weight: 900;
color: black;
`
const LoginModal = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("active_user")) || 
                      JSON.parse(localStorage.getItem("registered_user"));
    if (
      savedUser &&
      savedUser.account === email &&
      savedUser.password === pass
    ) {
      onLogin(savedUser);
      handleClose();
    } else {
      setError("Невірний Gmail або пароль!");
    }
  };
  return (
    <ModalOverlay $isClosing={isClosing} onClick={handleClose}>
      <ModalContent $isClosing={isClosing} onClick={(e) => e.stopPropagation()} onSubmit={handleLogin}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <Title style={{ textAlign: "center" }}>Вхід</Title>
        <Input
          name="email"
          type="email"
          placeholder="Gmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Пароль"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          autoComplete="current-password"
          required
        />
        {error && (
          <p style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
            {error}
          </p>
        )}
        <SubmitButton type="submit">Увійти</SubmitButton>
      </ModalContent>
    </ModalOverlay>
  );
};
export default LoginModal;

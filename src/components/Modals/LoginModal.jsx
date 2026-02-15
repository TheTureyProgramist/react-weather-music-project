import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
const slideIn = keyframes`
0% {
transform: translateY(100%) scale(0.5);
}
100% {
transform: translateY(0%)
scale(1);
}
`;
const slideOut = keyframes`
  0% { transform: translateY(0%) scale(1); opacity: 1; }
  100% { transform: translateY(100%) scale(0.5); opacity: 0; }
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
  align-items: center;
  z-index: 1000;
`;
const ModalContent = styled.form`
  background: white;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: relative;
  animation: ${slideIn} 1s ease-out forwards;
`;
const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
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
  border: none;
  cursor: pointer;
  &:hover {
    background: #ffa04d;
  }
`;
const LoginModal = ({ onClose, onLogin }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const savedUser = JSON.parse(localStorage.getItem("registered_user"));
    if (
      savedUser &&
      savedUser.account === email &&
      savedUser.password === pass
    ) {
      onLogin(savedUser);
      onClose();
    } else {
      setError("Невірний Gmail або пароль!");
    }
  };
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} onSubmit={handleLogin}>
        <h3 style={{ textAlign: "center" }}>Вхід</h3>
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

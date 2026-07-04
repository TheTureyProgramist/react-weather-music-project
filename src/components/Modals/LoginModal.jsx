import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import localforage from "localforage";
import { auth, googleProvider, signInWithPopup } from "../../firebase";
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
  animation: ${(props) => (props.$isClosing ? fadeOut : "none")} 0.5s ease-out
    forwards;
`;

const ModalContent = styled.form`
  background: linear-gradient(135deg, #ffffff, #f7fffe);
  padding: 26px;
  border-radius: 14px;
  width: 92%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.45s cubic-bezier(.2,.9,.2,1)
    forwards;
`;
const Input = styled.input`
  padding: 12px;
  border: 1px solid rgba(0,0,0,0.12);
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  background: rgba(255,255,255,0.9);
  font-size: 14px;
`;

const SubmitButton = styled.button`
  background: #ffb36c;
  color: #000;
  font-weight: 700;
  padding: 12px 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-shadow: 0 6px 12px rgba(255,179,108,0.18);
  width: 100%;
  &:hover { transform: translateY(-1px); }
`;

const GoogleButton = styled.button`
  background: #4285f4;
  color: white;
  font-weight: 700;
  padding: 10px 12px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin-top: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  box-shadow: 0 6px 12px rgba(66,133,244,0.18);
  &:hover { transform: translateY(-1px); }
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
`;
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const activeUser = await localforage.getItem("active_user");
    const registeredUser = await localforage.getItem("registered_user");
    const savedUser = activeUser || registeredUser;

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

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const mappedUser = {
        uid: firebaseUser.uid,
        id: firebaseUser.uid,
        account: firebaseUser.email || "",
        firstName: firebaseUser.displayName || firebaseUser.email || "Користувач",
        avatar: firebaseUser.photoURL || "",
        email: firebaseUser.email || "",
      };
      await localforage.setItem("active_user", mappedUser);
      onLogin(mappedUser);
      handleClose();
    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Помилка Google: " + (err.message || err.toString()));
    }
  };
  return (
    <ModalOverlay $isClosing={isClosing} onClick={handleClose}>
      <ModalContent
        $isClosing={isClosing}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleLogin}
      >
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <Title style={{ textAlign: "center" }}>Вхід</Title>
        <div style={{ textAlign: 'center', fontSize: 13, color: '#444', marginTop: -6 }}>Використайте Gmail або натисніть «Увійти з Google»</div>
        <Input
          name="email"
          type="email"
          placeholder="Ваш Gmail (наприклад: you@gmail.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="username"
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="Пароль (локальний акаунт)"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          autoComplete="current-password"
          required
        />
        {error && (
          <div style={{ color: "#9b2c2c", fontSize: "13px", textAlign: "center", background: 'rgba(255,77,77,0.06)', padding: '8px', borderRadius: 8 }}>{error}</div>
        )}
        <SubmitButton type="submit">🔒 Увійти</SubmitButton>
        <div style={{ textAlign: "center", margin: "6px 0", fontSize: "13px", color: '#666' }}>АБО</div>
        <GoogleButton type="button" onClick={handleGoogleLogin}>🔑 Увійти з Google</GoogleButton>
      </ModalContent>
    </ModalOverlay>
  );
};
export default LoginModal;

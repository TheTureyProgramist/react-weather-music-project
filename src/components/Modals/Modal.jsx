import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
const flow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const AnimatedText = styled.h1`
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  font-weight: bold;
  background: linear-gradient(270deg, #ff7eb3, #ff758c, #7afcff, #feffb7, #58e2c2);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${flow} 5s ease infinite;
  @media (min-width: 768px) { 
  font-size: 15px; 
  }
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
const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
`;
const Title = styled.h3`
  text-align: center;
  margin: 0;
  color: #333;
`;
const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  &:focus {
    outline: none;
    border-color: #ffb36c;
  }
`;
const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  color: #555;
  margin-bottom: -10px;
`;
const ImageSelectionContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-start;
  width: 100%;
  box-sizing: border-box;
  margin: 10px 0;
  overflow-x: auto;
  padding: 5px 2px;
  &::-webkit-scrollbar { 
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb36c;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
`;
const AvatarOption = styled.div`
  width: 60px;
  height: 60px;
  min-width: 60px; 
  min-height: 60px; 
  box-sizing: border-box; 
  border-radius: 50%;
  border: 2px solid ${props => (props.$isSelected ? "#ffb36c" : "transparent")};
  cursor: pointer;
  overflow: hidden; 
  position: relative;
  isolation: isolate;
  flex-shrink: 0;
  flex-grow: 0;
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  transition: all 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 50%;
  }
`;
const SubmitButton = styled.button`
  background: #ffb36c;
  color: black;
  font-weight: bold;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  margin-top: 10px;
  &:hover {
    background: #ffa04d;
  }
`;
const ErrorMsg = styled.div`
  color: red;
  font-size: 12px;
  text-align: center;
`;
const Modal = ({ onClose, onRegister, availableAvatars }) => {
  const [formData, setFormData] = useState({
    account: "",
    firstName: "",
    password: "",
    confirmPassword: "",
    avatarIndex: 0
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };
  const handleSubmit = () => {
    if (!formData.account || !formData.firstName || !formData.password) {
      setError("Заповніть всі поля!");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Паролі не співпадають!");
      return;
    }
    onRegister({
      account: formData.account,
      firstName: formData.firstName,
      password: formData.password, 
      avatar: availableAvatars[formData.avatarIndex]
    });
    onClose();
  };
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Реєстрація</Title>
        <Input name="account" placeholder="Gmail" onChange={handleChange} />
        <Input name="firstName" placeholder="Ім'я та прізвище" onChange={handleChange} />
        <Label>Оберіть аватар, примітка для вкористання першого треба<AnimatedText>Стихія+</AnimatedText></Label>
        <ImageSelectionContainer>
          {availableAvatars.map((imgSrc, index) => (
            <AvatarOption
              key={index}
              $isSelected={formData.avatarIndex === index}
              onClick={() => setFormData({ ...formData, avatarIndex: index })}
            >
              <img src={imgSrc} alt={`Опції аватара ${index}`} />
            </AvatarOption>
          ))}
        </ImageSelectionContainer>
        <Input 
          type="password" 
          name="password" 
          placeholder="Пароль (власний придумайте, не акаунтний)" 
          onChange={handleChange} 
        />
        <Input 
          type="password" 
          name="confirmPassword" 
          placeholder="Підтвердіть пароль" 
          onChange={handleChange} 
        />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <SubmitButton onClick={handleSubmit}>Зареєструватися</SubmitButton>
      </ModalContent>
    </ModalOverlay>
  );
};
export default Modal;
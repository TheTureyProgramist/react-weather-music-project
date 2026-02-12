import React, { useState } from "react";
import styled from "styled-components";
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
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
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
  padding: 12px;
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
  justify-content: center;
  margin: 10px 0;
`;
const AvatarOption = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: ${props => props.$isSelected ? '3px solid #ffb36c' : '2px solid transparent'};
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
    lastName: "",
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
    if (!formData.account || !formData.firstName || !formData.lastName || !formData.password) {
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
      lastName: formData.lastName,
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
        <Label>Оберіть аватар:</Label>
        <ImageSelectionContainer>
            {availableAvatars.map((imgSrc, index) => (
                <AvatarOption 
                    key={index} 
                    $isSelected={formData.avatarIndex === index}
                    onClick={() => setFormData({...formData, avatarIndex: index})}
                >
                   <img src={imgSrc} alt={`Опції аватара ${index}`} />
                </AvatarOption>
            ))}
        </ImageSelectionContainer>
        <Input type="password" name="password" placeholder="Пароль (власний придумайте, не акаунтний)" onChange={handleChange} />
        <Input type="password" name="confirmPassword" placeholder="Підтвердіть пароль" onChange={handleChange} />
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <SubmitButton onClick={handleSubmit}>Зареєструватися</SubmitButton>
      </ModalContent>
    </ModalOverlay>
  );
};
export default Modal;
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
  max-width: 450px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  max-height: 90vh;
  overflow-y: auto;
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
const Button = styled.button`
  background: #ffb36c;
  color: black;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  border: none;
    padding: 1px 0px 0px 3px;
   height: 40px;
   flex: 1;
  font-size: 14px;
  &:hover {
    background: #ffa04d;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;
const CancelButton = styled.button`
  background: #ddd;
  color: black;
  font-weight: bold;
  padding: 1px 1px 0 6px;
  border-radius: 8px;
  cursor: pointer;
  border: none; 
  height: 40px;
  font-size: 14px;
  flex: 1;
  &:hover {
    background: #ccc;
  }
`;
const ErrorMsg = styled.div`
  color: red;
  font-size: 12px;
  text-align: center;
`;
const SuccessMsg = styled.div`
  color: green;
  font-size: 12px;
  text-align: center;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
`;
const UserSettingsModal = ({ onClose, user, currentAvatar, availableAvatars, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    avatarIndex: availableAvatars.indexOf(currentAvatar)
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };
  const handleAvatarChange = (index) => {
    setFormData({ ...formData, avatarIndex: index });
    setError("");
    setSuccess("");
  };
  const handleSubmit = () => {
    setError("");
    setSuccess("");
    if (!formData.firstName || !formData.lastName) {
      setError("Ім'я та прізвище не можуть бути порожніми!");
      return;
    }
    if (formData.newPassword || formData.confirmPassword || formData.currentPassword) {
      if (!formData.currentPassword) {
        setError("Введіть поточний пароль!");
        return;
      }
      if (!formData.newPassword) {
        setError("Введіть новий пароль!");
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError("Новий пароль та підтвердження не співпадають!");
        return;
      }
      if (formData.newPassword.length < 6) {
        setError("Новий пароль повинен містити мінімум 6 символів!");
        return;
      }
    }
    const updatedData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      avatar: availableAvatars[formData.avatarIndex]
    };
    if (formData.newPassword) {
      updatedData.newPassword = formData.newPassword;
    }
    onUpdate(updatedData);
    setSuccess("Зміни збережені!");
    setTimeout(() => {
      onClose();
    }, 1500);
  };
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Налаштування профілю</Title>
        <Section>
          <Label>Ім'я та прізвище:</Label>
          <Input
            type="text"
            name="firstName"
            placeholder="Ім'я та прізвище"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Section>
        <Section>
          <Label>Оберіть аватар:</Label>
          <ImageSelectionContainer>
            {availableAvatars.map((imgSrc, index) => (
              <AvatarOption
                key={index}
                $isSelected={formData.avatarIndex === index}
                onClick={() => handleAvatarChange(index)}
              >
                <img src={imgSrc} alt={`Опції аватара ${index}`} />
              </AvatarOption>
            ))}
          </ImageSelectionContainer>
        </Section>
        <Section>
          <Label>Змінити пароль (необов'язково):</Label>
          <Input
            type="password"
            name="currentPassword"
            placeholder="Поточний пароль"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="newPassword"
            placeholder="Новий пароль"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Підтвердіть новий пароль"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Section>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        {success && <SuccessMsg>{success}</SuccessMsg>}
        <ButtonGroup>
          <CancelButton onClick={onClose}>Скасувати</CancelButton>
          <Button onClick={handleSubmit}>Зберегти зміни</Button>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};
export default UserSettingsModal;
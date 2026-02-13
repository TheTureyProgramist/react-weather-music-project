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
  border-radius: 20px;
  width: 90%;
  max-width: 450px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
  max-height: 90vh;
  overflow-y: auto;
`;
const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #999;
  &:hover { color: #333; }
`;
const Title = styled.h3`
  text-align: center;
  margin: 0 0 10px 0;
  color: #333;
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
  &:last-of-type { border-bottom: none; }
`;
const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: #666;
`;
const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: #ffb36c;
  }
`;
const AvatarSlider = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px 5px;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb36c;
    border-radius: 10px;
  }
`;
const AvatarOption = styled.div`
  width: 70px;
  height: 70px;
  flex: 0 0 70px; 
  border-radius: 50%;
  border: ${props => props.$isSelected ? '4px solid #ffb36c' : '2px solid #eee'};
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  &:hover {
    transform: translateY(-3px);
    border-color: #ffb36c;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;
const BaseButton = styled.button`
  height: 45px;
  flex: 1;
  border-radius: 10px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: opacity 0.2s;
  &:hover { opacity: 0.9; }
`;
const SaveButton = styled(BaseButton)`
  background: #ffb36c;
  color: #000;
`;
const CancelButton = styled(BaseButton)`
  background: #eee;
  color: #555;
`;
const ErrorMsg = styled.div` color: #e74c3c; font-size: 12px; text-align: center; font-weight: 500; `;
const SuccessMsg = styled.div` color: #27ae60; font-size: 12px; text-align: center; font-weight: 500; `;
const UserSettingsModal = ({ onClose, user, currentAvatar, availableAvatars, onUpdate }) => {
  const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  const [formData, setFormData] = useState({
    name: fullName || "",
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
  };
  const handleSubmit = () => {
    setError("");
    if (!formData.name.trim()) return setError("Введіть ім'я!");
    if (formData.newPassword || formData.currentPassword) {
      if (!formData.currentPassword) return setError("Потрібен поточний пароль!");
      if (formData.newPassword.length < 6) return setError("Мінімум 6 символів для нового пароля!");
      if (formData.newPassword !== formData.confirmPassword) return setError("Паролі не збігаються!");
    }
    const [firstName, ...lastNameArr] = formData.name.trim().split(" ");
    onUpdate({
      firstName,
      lastName: lastNameArr.join(" "),
      avatar: availableAvatars[formData.avatarIndex],
      ...(formData.newPassword && { newPassword: formData.newPassword })
    });
    setSuccess("Оновлено!");
    setTimeout(onClose, 1200);
  };
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Профіль</Title>
        <Section>
          <Label>Як вас звати?</Label>
          <Input 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Ім'я та Прізвище" 
          />
        </Section>
        <Section>
          <Label>Оберіть образ:</Label>
          <AvatarSlider>
            {availableAvatars.map((img, i) => (
              <AvatarOption 
                key={i} 
                $isSelected={formData.avatarIndex === i}
                onClick={() => setFormData({...formData, avatarIndex: i})}
              >
                <img src={img} alt="avatar" />
              </AvatarOption>
            ))}
          </AvatarSlider>
        </Section>
        <Section>
          <Label>Безпека (пароль):</Label>
          <Input 
            type="password" 
            name="currentPassword" 
            placeholder="Поточний пароль" 
            onChange={handleChange} 
          />
          <Input 
            type="password" 
            name="newPassword" 
            placeholder="Новий пароль" 
            onChange={handleChange} 
          />
          <Input 
            type="password" 
            name="confirmPassword" 
            placeholder="Повторіть пароль" 
            onChange={handleChange} 
          />
        </Section>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        {success && <SuccessMsg>{success}</SuccessMsg>}
        <ButtonGroup>
          <CancelButton onClick={onClose}>Назад</CancelButton>
          <SaveButton onClick={handleSubmit}>Зберегти</SaveButton>
        </ButtonGroup>
      </ModalContent>
    </ModalOverlay>
  );
};
export default UserSettingsModal;
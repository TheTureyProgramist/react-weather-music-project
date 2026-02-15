import React, { useState, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import InfoModal from "./InfoModal";
const slideIn = keyframes`
0% { transform: translateY(100%) scale(0.5); }
100% { transform: translateY(0%) scale(1); }
`;
const flow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const slideOut = keyframes`
  0% { transform: translateY(0%) scale(1); opacity: 1; }
  100% { transform: translateY(100%) scale(0.5); opacity: 0; }
`;
const AnimatedText = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 11px;
  font-weight: bold;
  background: linear-gradient(
    270deg,
    #ff7eb3,
    #ff758c,
    #7afcff,
    #feffb7,
    #58e2c2
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${flow} 5s ease infinite;
  display: inline-block;
  margin-left: 5px;
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
  border-radius: 20px;
  width: 90%;
  max-width: 450px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideIn} 1s ease-out forwards;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
`;
const Select = styled.select`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 10px;
  flex: 1;
  background: white;
  font-size: 14px;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #ffb36c;
  }
`;

const DateRow = styled.div`
  display: flex;
  gap: 10px;
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #555;
`;

const TermsBtn = styled.span`
  color: #ffb36c;
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
`;

const AvatarOption = styled.div`
  width: 60px;
  height: 60px;
  min-width: 60px;
  border-radius: 50%;
  border: 2px solid
    ${(props) => (props.$isSelected ? "#ffb36c" : "transparent")};
  cursor: pointer;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const AvatarSlider = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 10px 0;
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb36c;
    border-radius: 10px;
  }
`;

const SaveButton = styled.button`
  background: #ffb36c;
  height: 45px;
  flex: 1;
  border-radius: 10px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const CancelButton = styled.button`
  background: #eee;
  height: 45px;
  flex: 1;
  border-radius: 10px;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;
const UserSettingsModal = ({ onClose, user, availableAvatars, onUpdate }) => {
  const [y, m, d] = user?.birthDate ? user.birthDate.split("-") : ["", "", ""];
  const [formData, setFormData] = useState({
    name: user?.firstName || "",
    day: parseInt(d) || "",
    month: parseInt(m) || "",
    year: parseInt(y) || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    avatarIndex: availableAvatars.indexOf(user?.avatar) || 0,
  });
  const [showTerms, setShowTerms] = useState(false);
  const accepted = true;
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1909 + 1 },
    (_, i) => currentYear - i,
  );
  const isInvalidDate = useMemo(() => {
    if (!formData.day || !formData.month || !formData.year) return false;
    const date = new Date(formData.year, formData.month - 1, formData.day);
    return (
      date.getFullYear() !== parseInt(formData.year) ||
      date.getMonth() !== parseInt(formData.month) - 1 ||
      date.getDate() !== parseInt(formData.day)
    );
  }, [formData.day, formData.month, formData.year]);
  const handleSubmit = () => {
    if (isInvalidDate) {
      alert("Введена некоректна дата!");
      return;
    }
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        alert("Нові паролі не збігаються!");
        return;
      }
      if (formData.newPassword.length < 6) {
        alert("Пароль занадто короткий!");
        return;
      }
    }
    onUpdate({
      firstName: formData.name,
      avatar: availableAvatars[formData.avatarIndex],
      birthDate: `${formData.year}-${formData.month.toString().padStart(2, "0")}-${formData.day.toString().padStart(2, "0")}`,
      ...(formData.newPassword
        ? {
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
          }
        : {}),
    });
    onClose();
  };
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h3 style={{ textAlign: "center" }}>Налаштування</h3>
        <Section>
          <label style={{ fontSize: "13px", fontWeight: "bold" }}>Ім'я</label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Section>
        <Section>
          <label style={{ fontSize: "13px", fontWeight: "bold" }}>
            Дата народження
          </label>
          <DateRow>
            <Select
              value={formData.day}
              onChange={(e) =>
                setFormData({ ...formData, day: e.target.value })
              }
            >
              <option value="">День</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </Select>
            <Select
              value={formData.month}
              onChange={(e) =>
                setFormData({ ...formData, month: e.target.value })
              }
            >
              <option value="">Місяць</option>
              {months.map((m, i) => (
                <option key={i} value={i + 1}>
                  {m}
                </option>
              ))}
            </Select>
            <Select
              value={formData.year}
              onChange={(e) =>
                setFormData({ ...formData, year: e.target.value })
              }
            >
              <option value="">Рік</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </Select>
          </DateRow>
          {isInvalidDate && (
            <span style={{ color: "red", fontSize: "11px" }}>
              Такої дати не існує!
            </span>
          )}
        </Section>
        <Section>
          <label style={{ fontSize: "13px", fontWeight: "bold" }}>
            Безпека
          </label>
          <Input
            type="password"
            placeholder="Поточний пароль"
            onChange={(e) =>
              setFormData({ ...formData, oldPassword: e.target.value })
            }
            style={{ marginBottom: "8px" }}
          />
          <Input
            type="password"
            placeholder="Новий пароль"
            onChange={(e) =>
              setFormData({ ...formData, newPassword: e.target.value })
            }
            style={{ marginBottom: "8px" }}
          />
          <Input
            type="password"
            placeholder="Підтвердіть новий пароль"
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </Section>
        <Section>
          <div style={{ fontSize: "12px", fontWeight: "bold", color: "grey" }}>
            Оберіть аватар, 1-ий доступний з<AnimatedText>Стихія+</AnimatedText>
          </div>
          <AvatarSlider>
            {availableAvatars.map((img, i) => (
              <AvatarOption
                key={i}
                $isSelected={formData.avatarIndex === i}
                onClick={() => setFormData({ ...formData, avatarIndex: i })}
              >
                <img src={img} alt="avatar" />
              </AvatarOption>
            ))}
          </AvatarSlider>
        </Section>
        <CheckboxRow>
          <input
            type="checkbox"
            checked={accepted}
            readOnly
            style={{ accentColor: "#ffb36c" }}
          />
          <label>
            Ви погодились з{" "}
            <TermsBtn onClick={() => setShowTerms(true)}>Угодою</TermsBtn>
          </label>
        </CheckboxRow>
        <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
          <CancelButton onClick={onClose}>Назад</CancelButton>
          <SaveButton onClick={handleSubmit} disabled={isInvalidDate}>
            Зберегти
          </SaveButton>
        </div>
        {showTerms && <InfoModal onClose={() => setShowTerms(false)} />}
      </ModalContent>
    </ModalOverlay>
  );
};
export default UserSettingsModal;

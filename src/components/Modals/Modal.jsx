import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import InfoModal from "./InfoModal";
const slideIn = keyframes`
0% {
transform: translateY(100%) scale(0.5);
}
100% {
transform: translateY(0%)
scale(1);
}
`
const flow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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
  margin-left: 5px;
  display: inline-block;
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
  padding: 30px 15px 15px 15px;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  animation: ${slideIn} 1s ease-out forwards;
  }
  @media (min-width: 768px) { 
  padding: 30px 30px;
   }
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

const DateRow = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const DateInput = styled(Input)`
  flex: 1;
  text-align: center;
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
  transition: all 0.2s ease;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageSelectionContainer = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 5px 2px;
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb36c;
    border-radius: 10px;
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
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Modal = ({ onClose, onRegister, availableAvatars }) => {
  const [formData, setFormData] = useState({
    account: "",
    firstName: "",
    password: "",
    confirmPassword: "",
    avatarIndex: 0,
  });
  const [birthDate, setBirthDate] = useState({ day: "", month: "", year: "" });
  const [accepted, setAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [error, setError] = useState("");

  const calculateAge = (d, m, y) => {
    const today = new Date();
    const birth = new Date(y, m - 1, d);
    let age = today.getFullYear() - birth.getFullYear();
    const mDiff = today.getMonth() - birth.getMonth();
    if (mDiff < 0 || (mDiff === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const handleSubmit = () => {
    if (
      !formData.account ||
      !formData.firstName ||
      !formData.password ||
      !birthDate.day ||
      !birthDate.month ||
      !birthDate.year
    ) {
      return setError("Заповніть всі поля!");
    }
    if (formData.password !== formData.confirmPassword)
      return setError("Паролі не співпадають!");
    if (!accepted) return setError("Прийміть угоду!");

    const age = calculateAge(birthDate.day, birthDate.month, birthDate.year);
    if (age < 9) return setError("Реєстрація дозволена лише з 9 років!");

    onRegister({
      ...formData,
      avatar: availableAvatars[formData.avatarIndex],
      birthDate: `${birthDate.year}-${birthDate.month.padStart(2, "0")}-${birthDate.day.padStart(2, "0")}`,
    });
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>Реєстрація</Title>
        <Input
          placeholder="Gmail"
          onChange={(e) =>
            setFormData({ ...formData, account: e.target.value })
          }
        />
        <Input
          placeholder="Ім'я та прізвище"
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />

        <DateRow>
          <DateInput
            placeholder="День"
            type="number"
            onChange={(e) =>
              setBirthDate({ ...birthDate, day: e.target.value })
            }
          />
          <DateInput
            placeholder="Місяць"
            type="number"
            onChange={(e) =>
              setBirthDate({ ...birthDate, month: e.target.value })
            }
          />
          <DateInput
            placeholder="Рік"
            type="number"
            onChange={(e) =>
              setBirthDate({ ...birthDate, year: e.target.value })
            }
          />
        </DateRow>

        <div style={{ fontSize: "11px", fontWeight: "bold", color: "grey" }}>
          Аватар оберіть, 1-ий доступний з<AnimatedText>Стихія+</AnimatedText>
        </div>
        <ImageSelectionContainer>
          {availableAvatars.map((imgSrc, index) => (
            <AvatarOption
              key={index}
              $isSelected={formData.avatarIndex === index}
              onClick={() => setFormData({ ...formData, avatarIndex: index })}
            >
              <img src={imgSrc} alt="avatar" />
            </AvatarOption>
          ))}
        </ImageSelectionContainer>

        <Input
          type="password"
          placeholder="Пароль"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <Input
          type="password"
          placeholder="Підтвердіть пароль"
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
        />

        <CheckboxRow>
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <label>
            Я погоджуюсь з{" "}
            <TermsBtn onClick={() => setShowTerms(true)}>Угодою</TermsBtn>
          </label>
        </CheckboxRow>

        {error && (
          <div style={{ color: "red", fontSize: "12px", textAlign: "center" }}>
            {error}
          </div>
        )}
        <SubmitButton onClick={handleSubmit} disabled={!accepted}>
          Зареєструватися
        </SubmitButton>
        {showTerms && <InfoModal onClose={() => setShowTerms(false)} />}
      </ModalContent>
    </ModalOverlay>
  );
};
export default Modal;

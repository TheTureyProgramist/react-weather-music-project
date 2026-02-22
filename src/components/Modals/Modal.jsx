import React, { useState, useMemo } from "react";
import styled, { keyframes, css } from "styled-components";
import InfoModal from "./InfoModal";

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

const flow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const rainbowAnimation = css`
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
`;

const AnimatedText = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 11px;
  font-weight: bold;
  ${rainbowAnimation}
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
  backdrop-filter: blur(3px);
  z-index: 1000;
  animation: ${props => (props.$isClosing ? fadeOut : "none")} 0.5s ease-out forwards;
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
  max-height: 90vh;
  overflow-y: auto;
  animation: ${props => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out forwards;
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
  font-size: 34px;
  cursor: pointer;
  color: #000000;
  &:hover {
    color: #ffb36c;
  }
`;

const Title = styled.h3`
  text-align: center;
  margin: 0;
  font-weight: 900;
  color: #000000;
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

const NameInput = styled(Input)`
  font-weight: bold;
  caret-color: black;

  ${(props) => {
    const isGradient = props.$color?.includes("linear-gradient");
    const isAnimated = props.$color?.includes("270deg");

    if (isGradient) {
      return css`
        background: ${props.$color};
        color: #fff;
        ${isAnimated ? css`
          background-size: 400% 400%;
          animation: ${flow} 5s ease infinite;
        ` : css`
          background-size: 100% 100%;
          animation: none;
        `}
      `;
    } else {
      return css`
        color: ${props.$color || "black"};
        background: transparent;
      `;
    }
  }}
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  background: white;
  cursor: pointer;
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
  min-height: 60px;
  flex-shrink: 0;
  border-radius: 50%;
  padding: 3px;
  background: ${(props) => (props.$isSelected ? props.$borderColor : "transparent")};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  ${(props) => {
    const isAnimated = props.$borderColor?.includes("270deg");
    if (props.$isSelected && props.$borderColor?.includes("linear-gradient")) {
        return isAnimated ? css`
            background-size: 400% 400%;
            animation: ${flow} 5s ease infinite;
        ` : css`
            background-size: 100% 100%;
            animation: none;
        `;
    }
  }}
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    display: block;
  }
`;

const ImageSelectionContainer = styled.div`
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 5px 2px;
  min-height: 75px;
  align-items: center;
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ffb36c;
    border-radius: 10px;
  }
`;

const ColorSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ColorLabel = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: grey;
`;

const ColorContainer = styled.div`
  display: flex;
  gap: 10px;
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

const ColorCircle = styled.div`
  width: 30px;
  height: 30px;
  min-width: 30px;
  border-radius: 50%;
  background: ${(props) => props.$color};
  cursor: pointer;
  border: 2px solid ${(props) => (props.$isSelected ? "#000" : "transparent")};
  box-shadow: ${(props) => (props.$isSelected ? "0 0 5px rgba(0,0,0,0.5)" : "0 0 2px rgba(0,0,0,0.2)")};

  ${(props) => {
    const isAnimated = props.$color?.includes("270deg");
    if (props.$color?.includes("linear-gradient")) {
      return isAnimated ? css`
        background-size: 400% 400%;
        animation: ${flow} 5s ease infinite;
      ` : css`
        background-size: 100% 100%;
        animation: none;
      `;
    }
  }}
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

const GreenText = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: green;
  margin: 0;
  display: inline;
`;

const COLORS = [
  { name: "Сірий", value: "grey" },
  { name: "Помаранчевий", value: "orange" },
  { name: "Фіолетовий", value: "purple" },
  { name: "Червоний", value: "red" },
  { name: "Веселковий Анімований", value: "linear-gradient(270deg, #ff7eb3, #ff758c, #7afcff, #feffb7, #58e2c2)" },
  { name: "Голубий", value: "#00e1ff" },
  { name: "Синій", value: "blue" },
  { name: "Веселковий Статичний", value: "linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #8b00ff)" },
];

const Modal = ({ onClose, onRegister, availableAvatars = [] }) => {
  const [formData, setFormData] = useState({
    account: "",
    firstName: "",
    password: "",
    confirmPassword: "",
    avatarIndex: 0,
    textColor: "grey",
    borderColor: "grey",
  });
  const [birthDate, setBirthDate] = useState({ day: "", month: "", year: "" });
  const [accepted, setAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [error, setError] = useState("");
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  const months = [
    "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
    "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
  ];
  const years = Array.from(
    { length: new Date().getFullYear() - 1909 + 1 },
    (_, i) => 1909 + i,
  ).reverse();
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const isInvalidDate = useMemo(() => {
    const { day, month, year } = birthDate;
    if (!day || !month || !year) return false;
    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);
    const dateCheck = new Date(y, m - 1, d);
    return (
      dateCheck.getFullYear() !== y ||
      dateCheck.getMonth() !== m - 1 ||
      dateCheck.getDate() !== d
    );
  }, [birthDate]);

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
    if (isInvalidDate) return setError("Такої дати не існує!");
    if (formData.password !== formData.confirmPassword)
      return setError("Паролі не співпадають!");
    if (!accepted) return setError("Прийміть угоду!");

    const age = calculateAge(
      parseInt(birthDate.day),
      parseInt(birthDate.month),
      parseInt(birthDate.year),
    );
    if (age < 13) return setError("Реєстрація дозволена лише з 13 років!");

    onRegister({
      account: formData.account,
      firstName: formData.firstName,
      password: formData.password,
      avatar: availableAvatars[formData.avatarIndex],
      textColor: formData.textColor,
      borderColor: formData.borderColor,
      birthDate: `${birthDate.year}-${birthDate.month.padStart(2, "0")}-${birthDate.day.padStart(2, "0")}`,
    });
    handleClose();
  };

  return (
    <ModalOverlay $isClosing={isClosing} onClick={handleClose}>
      <ModalContent $isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <Title>Реєстрація</Title>

        <Input
          placeholder="Gmail"
          onChange={(e) =>
            setFormData({ ...formData, account: e.target.value })
          }
        />
        
        <NameInput
          $color={formData.textColor}
          style={!formData.textColor?.includes('linear-gradient') ? { color: formData.textColor } : { color: '#fff' }}
          placeholder="Ім'я та прізвище"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
        />

        <DateRow>
          <Select
            value={birthDate.day}
            onChange={(e) =>
              setBirthDate({ ...birthDate, day: e.target.value })
            }
          >
            <option value="" disabled>День</option>
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </Select>

          <Select
            value={birthDate.month}
            onChange={(e) =>
              setBirthDate({ ...birthDate, month: e.target.value })
            }
          >
            <option value="" disabled>Місяць</option>
            {months.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </Select>

          <Select
            value={birthDate.year}
            onChange={(e) =>
              setBirthDate({ ...birthDate, year: e.target.value })
            }
          >
            <option value="" disabled>Рік</option>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </Select>
        </DateRow>

        {isInvalidDate && (
          <div style={{ color: "red", fontSize: "11px", textAlign: "center", marginTop: "-10px" }}>
            Такої дати не існує!
          </div>
        )}

        <ColorSection>
          <ColorLabel>Оберіть колір тексту</ColorLabel>
          <ColorContainer>
            {COLORS.map((color, index) => (
              <ColorCircle
                key={index}
                $color={color.value}
                $isSelected={formData.textColor === color.value}
                title={color.name}
                onClick={() => setFormData({ ...formData, textColor: color.value })}
              />
            ))}
          </ColorContainer>
        </ColorSection>

        <ColorSection>
          <ColorLabel>Оберіть колір рамки аватара</ColorLabel>
          <ColorContainer>
            {COLORS.map((color, index) => (
              <ColorCircle
                key={index}
                $color={color.value}
                $isSelected={formData.borderColor === color.value}
                title={color.name}
                onClick={() => setFormData({ ...formData, borderColor: color.value })}
              />
            ))}
          </ColorContainer>
        </ColorSection>

        <div style={{ fontSize: "11px", fontWeight: "bold", color: "grey" }}>
          Аватар оберіть, 1-ий доступний з<AnimatedText>Стихія+</AnimatedText>, наступні 2 за <GreenText>досягнення</GreenText>, та ще 3 за 🧧, та сама логіка з вибором кольору імені, та рамки аватара.
        </div>
        
        <ImageSelectionContainer>
          {availableAvatars.map((imgSrc, index) => (
            <AvatarOption
              key={index}
              $isSelected={formData.avatarIndex === index}
              $borderColor={formData.borderColor}
              onClick={() => setFormData({ ...formData, avatarIndex: index })}
            >
              <img 
                src={typeof imgSrc === 'string' ? imgSrc : imgSrc?.default || imgSrc} 
                alt={`avatar-${index}`} 
              />
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

        <SubmitButton
          onClick={handleSubmit}
          disabled={!accepted || isInvalidDate}
        >
          Зареєструватися
        </SubmitButton>
        {showTerms && <InfoModal onClose={() => setShowTerms(false)} />}
      </ModalContent>
    </ModalOverlay>
  );
};
export default Modal;
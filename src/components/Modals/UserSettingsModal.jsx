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
  backdrop-filter: blur(3px);
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${(props) => (props.$isClosing ? fadeOut : "none")} 0.5s ease-out
    forwards;
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
  background: #d3b0d3;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out
    forwards;
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
    color: #00e1ff;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 15px;
  border-bottom: 1px solid #000000;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #000000;
  border-radius: 10px;
  width: 100%;
  background: transparent;
  box-sizing: border-box;
`;
const NameInput = styled(Input)`
  caret-color: black;
  font-weight: bold;
  ${(props) => {
    const color = props.$textColor || "inherit";
    const isGradient = color.includes("linear");
    const isAnimated = color.includes("270deg");
    if (isGradient) {
      return css`
        background: ${color};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        ${isAnimated &&
        css`
          background-size: 400% 400%;
          animation: ${flow} 5s ease infinite;
        `}
      `;
    } else {
      return css`
        color: ${color};
        background: transparent;
        -webkit-background-clip: none;
        -webkit-text-fill-color: currentcolor;
      `;
    }
  }}
`;
const Select = styled.select`
  padding: 12px;
  border: 1px solid #000000;
  background: transparent;
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
  flex-wrap: wrap;
  gap: 5px;
`;

const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #5a5a5a;
`;

const TermsBtn = styled.span`
  color: #ff7b00;
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
`;
const AvatarOption = styled.div`
  width: 60px;
  height: 60px;
  min-width: 60px;
  border-radius: 50%;
  padding: 3px;
  background: ${(props) =>
    props.$isSelected ? props.$borderColor : "transparent"};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${(props) =>
    props.$isSelected &&
    props.$borderColor?.includes("270deg") &&
    css`
      background-size: 400% 400%;
      animation: ${flow} 5s ease infinite;
    `}
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
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

const ColorContainer = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 5px 0;
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
  box-shadow: ${(props) =>
    props.$isSelected ? "0 0 5px rgba(0,0,0,0.5)" : "0 0 2px rgba(0,0,0,0.2)"};
  ${(props) =>
    props.$color.includes("270deg") &&
    css`
      background-size: 400% 400%;
      animation: ${flow} 5s ease infinite;
    `}
`;
const SaveButton = styled.button`
  background: #ffb36c;
  height: 45px;
  border: 2px solid black;
  flex: 1;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  background: transparent;
  height: 45px;
  flex: 1;
  border-radius: 10px;
  font-weight: bold;
  border: 2px solid black;
  cursor: pointer;
`;
const GreenText = styled.p`
  font-size: 12px;
  font-weight: bold;
  color: green;
`;
const Title = styled.h3`
  font-weight: 900;
  color: black;
`;

const COLORS = [
  { name: "Сірий", value: "grey" },
  { name: "Помаранчевий", value: "orange" },
  { name: "Фіолетовий", value: "purple" },
  { name: "Червоний", value: "red" },
  {
    name: "Веселковий",
    value: "linear-gradient(45deg, red, orange, yellow, green, blue, purple)",
  },
  {
    name: "Анімований",
    value:
      "linear-gradient(270deg, #ff7eb3, #ff758c, #7afcff, #feffb7, #58e2c2)",
  },
  { name: "Голубий", value: "#00e1ff" },
  { name: "Синій", value: "blue" },
];

const DEFAULT_SECTIONS = [
  "name",
  "birthDate",
  "security",
  "textColor",
  "borderColor",
  "avatar",
];

const SECTION_LABELS = {
  name: "Ім'я",
  birthDate: "Дата народження",
  security: "Безпека",
  textColor: "Колір тексту",
  borderColor: "Колір рамки",
  avatar: "Аватар",
};

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
    avatarIndex:
      availableAvatars.indexOf(user?.avatar) !== -1
        ? availableAvatars.indexOf(user?.avatar)
        : 0,
    textColor: user?.textColor || "grey",
    borderColor: user?.borderColor || "grey",
  });
  const [showTerms, setShowTerms] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [sectionsOrder, setSectionsOrder] = useState([...DEFAULT_SECTIONS]);

  const handleClose = (e) => {
    if (e) e.stopPropagation();
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

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
      account: user?.account || formData.name,
      firstName: formData.name,
      avatar: availableAvatars[formData.avatarIndex],
      birthDate: `${formData.year}-${formData.month.toString().padStart(2, "0")}-${formData.day.toString().padStart(2, "0")}`,
      textColor: formData.textColor,
      borderColor: formData.borderColor,
      ...(formData.newPassword
        ? {
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
          }
        : {}),
    });
    handleClose();
  };

  const moveSection = (idx, dir) => {
    setSectionsOrder((prev) => {
      const arr = [...prev];
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= arr.length) return arr;
      [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
      return arr;
    });
  };

  const resetSectionsOrder = () => {
    setSectionsOrder([...DEFAULT_SECTIONS]);
  };

  const accepted = true;
  return (
    <ModalOverlay $isClosing={isClosing} onClick={handleClose}>
      <ModalContent $isClosing={isClosing} onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>&times;</CloseButton>
        <Title style={{ textAlign: "center" }}>Налаштування</Title>
        {sectionsOrder.map((section) => {
          let content = null;
          if (section === "name") {
            content = (
              <Section key="name">
                <label style={{ fontSize: "13px", fontWeight: "bold" }}>Ім'я</label>
                <NameInput
                  $textColor={formData.textColor}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </Section>
            );
          } else if (section === "birthDate") {
            content = (
              <Section key="birthDate">
                <label style={{ fontSize: "13px", fontWeight: "bold" }}>Дата народження</label>
                <DateRow>
                  <Select
                    value={formData.day}
                    onChange={(e) =>
                      setFormData({ ...formData, day: e.target.value })
                    }
                  >
                    <option value="">День</option>
                    {days.map((d) => (
                      <option key={d} value={d}>{d}</option>
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
                      <option key={i} value={i + 1}>{m}</option>
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
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </Select>
                </DateRow>
                {isInvalidDate && (
                  <span style={{ color: "red", fontSize: "11px" }}>Такої дати не існує!</span>
                )}
              </Section>
            );
          } else if (section === "security") {
            content = (
              <Section key="security">
                <label style={{ fontSize: "13px", fontWeight: "bold" }}>Безпека</label>
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
            );
          } else if (section === "textColor") {
            content = (
              <Section key="textColor">
                <label style={{ fontSize: "13px", fontWeight: "bold" }}>Колір тексту</label>
                <ColorContainer>
                  {COLORS.map((color, i) => (
                    <ColorCircle
                      key={i}
                      $color={color.value}
                      $isSelected={formData.textColor === color.value}
                      title={color.name}
                      onClick={() => setFormData({ ...formData, textColor: color.value })}
                    />
                  ))}
                </ColorContainer>
              </Section>
            );
          } else if (section === "borderColor") {
            content = (
              <Section key="borderColor">
                <label style={{ fontSize: "13px", fontWeight: "bold" }}>Колір рамки аватара</label>
                <ColorContainer>
                  {COLORS.map((color, i) => (
                    <ColorCircle
                      key={i}
                      $color={color.value}
                      $isSelected={formData.borderColor === color.value}
                      title={color.name}
                      onClick={() => setFormData({ ...formData, borderColor: color.value })}
                    />
                  ))}
                </ColorContainer>
              </Section>
            );
          } else if (section === "avatar") {
            content = (
              <Section key="avatar">
                <div style={{ fontSize: "12px", fontWeight: "bold", color: "grey" }}>
                  Аватар оберіть, 1-ий доступний з<AnimatedText>Стихія+</AnimatedText>, наступні 2 за <GreenText>досягнення</GreenText>. Та ще 3 за 🧧, та сама логіка з вибором кольору імені, та рамки аватара.
                </div>
                <AvatarSlider>
                  {availableAvatars.map((img, i) => (
                    <AvatarOption
                      key={i}
                      $isSelected={formData.avatarIndex === i}
                      $borderColor={formData.borderColor}
                      onClick={() => setFormData({ ...formData, avatarIndex: i })}
                    >
                      <img src={img} alt="avatar" />
                    </AvatarOption>
                  ))}
                </AvatarSlider>
              </Section>
            );
          }
          return content;
        })}
        <div style={{ marginTop: 30, marginBottom: 10 }}>
          <h4 style={{ fontWeight: 700, fontSize: 16, marginBottom: 10 }}>Порядок секцій:</h4>
          {sectionsOrder.map((section, idx) => (
            <div key={section} style={{ display: "flex", alignItems: "center", marginBottom: 6 }}>
              <span style={{ minWidth: 120, fontWeight: 500 }}>{SECTION_LABELS[section]}</span>
              <button
                style={{ fontSize: "16px", padding: "2px 8px", borderRadius: "6px", border: "1px solid #aaa", background: "#eee", marginLeft: 8, cursor: idx === 0 ? "not-allowed" : "pointer" }}
                disabled={idx === 0}
                onClick={() => moveSection(idx, -1)}
                title="Вище"
              >↑</button>
              <button
                style={{ fontSize: "16px", padding: "2px 8px", borderRadius: "6px", border: "1px solid #aaa", background: "#eee", marginLeft: 4, cursor: idx === sectionsOrder.length - 1 ? "not-allowed" : "pointer" }}
                disabled={idx === sectionsOrder.length - 1}
                onClick={() => moveSection(idx, 1)}
                title="Нижче"
              >↓</button>
            </div>
          ))}
          <button
            style={{ marginTop: 10, padding: "6px 18px", borderRadius: "8px", border: "1px solid #aaa", background: "#ffe0b2", fontWeight: 600, cursor: "pointer" }}
            onClick={resetSectionsOrder}
          >Скинути порядок</button>
        </div>
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
          <CancelButton onClick={handleClose}>Назад</CancelButton>
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
import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCustomDay,
  removeCustomDay,
} from "../../features/counter/Counter.js";
import styled, { keyframes, css } from "styled-components";
import InfoModal from "./UserSearchModal.jsx";
import KatSceneModal from "./KatSceneModal";
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
  background: ${(props) => (props.$isDarkMode ? "#2e1d30" : "#d3b0d3")};
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "inherit")};
  padding: 4px 30px 10px 10px;
  border-radius: 10px;
  width: 90%;
  max-width: 450px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${(props) => (props.$isClosing ? slideOut : slideIn)} 0.5s ease-out
    forwards;

  @media (min-width: 768px) {
    max-width: 750px;
  }
  @media (min-width: 1024px) {
    max-width: 900px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${(props) => (props.$isDarkMode ? "#5e3e61" : "#a981a9")};
    border-radius: 10px;
  }
`;

const SectionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const CloseButton = styled.button`
  position: absolute;
  top: -3px;
  right: 5px;
  background: none;
  border: none;
  font-size: 34px;
  cursor: pointer;
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "#000000")};
  &:hover {
    color: #00e1ff;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  background: ${(props) => (props.$isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.4)")};
  border-radius: 12px;
  border: 1px solid ${(props) => (props.$isDarkMode ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.5)")};
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  min-width: 0;
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "inherit")};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
`;

const Input = styled.input`
  padding: 4px;
  border: 1px solid ${(props) => (props.$isDarkMode ? "rgba(255, 255, 255, 0.3)" : "#000000")};
  border-radius: 10px;
  font-size: 14px; 
  width: 100%;
  background: transparent;
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "black")};
  box-sizing: border-box;
  &::placeholder {
    color: ${(props) => (props.$isDarkMode ? "rgba(255, 255, 255, 0.6)" : "#000000")};
    font-style: italic;
    font-size: 14px;
    opacity: 1; 
  }
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
  border: 1px solid ${(props) => (props.$isDarkMode ? "rgba(255, 255, 255, 0.3)" : "#000000")};
  background: ${(props) => (props.$isDarkMode ? "#4a3b4c" : "white")};
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "black")};
  border-radius: 10px;
  flex: 1;
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
  gap: 3px;
  font-size: 14px;
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "black")};
`;

const TermsBtn = styled.span`
  color: #ff7b00;
  text-decoration: underline;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
`;
const AvatarOption = styled.div`
  width: 50px;
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
  gap: 5px;
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
  gap: 3px;
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
  border: 2px solid ${(props) => (props.$isDarkMode ? "transparent" : "black")};
  flex: 1;
  color: black;
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
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "black")};
  flex: 1;
  border-radius: 10px;
  font-weight: bold;
  border: 2px solid ${(props) => (props.$isDarkMode ? "rgba(255,255,255,0.5)" : "black")};
  cursor: pointer;
`;
const Title = styled.h3`
  font-weight: 900;
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "black")};
`;
const PasswordStrengthContainer = styled.div`
  background: rgba(0, 0, 0, 0.1);
  height: 6px;
  border-radius: 3px;
  width: 100%;
  margin-top: -2px;
  margin-bottom: 2px;
  overflow: hidden;
`;

const PasswordStrengthBar = styled.div`
  height: 100%;
  border-radius: 3px;
  background-color: ${(props) => props.$color || "transparent"};
  width: ${(props) => props.$width || "0%"};
  transition:
    width 0.3s ease,
    background-color 0.3s ease;
`;

const PasswordStrengthLabel = styled.span`
  font-size: 11px;
  font-weight: bold;
  color: ${(props) => props.$color};
  align-self: flex-end;
  margin-bottom: 8px;
`;

const OrderButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid ${(props) => (props.disabled ? (props.$isDarkMode ? "#555" : "#aaa") : (props.$isDarkMode ? "rgba(255, 255, 255, 0.3)" : "#000"))};
  background: ${(props) => (props.disabled ? "transparent" : (props.$isDarkMode ? "#3e2b42" : "#fff"))};
  color: ${(props) => (props.disabled ? (props.$isDarkMode ? "#555" : "#aaa") : (props.$isDarkMode ? "#fff" : "#000"))};
  margin-left: 6px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: all 0.2s;
  box-shadow: ${(props) => (props.disabled ? "none" : (props.$isDarkMode ? "0 2px 0 rgba(255,255,255,0.2)" : "0 2px 0 #000"))};

  &:hover:not(:disabled) {
    background: #ffb36c;
    color: #000;
    transform: translateY(-1px);
    box-shadow: 0 3px 0 ${(props) => (props.$isDarkMode ? "rgba(255,255,255,0.3)" : "#000")};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
    box-shadow: 0 0 0 ${(props) => (props.$isDarkMode ? "rgba(255,255,255,0.3)" : "#000")};
  }
`;
const Label = styled.label`
  font-size: 13px;
  font-weight: bold;
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "black")};
`;
const ResetOrderButton = styled.button`
  margin-top: 10px;
  padding: 8px 18px;
  border-radius: 8px;
  border: 2px solid ${(props) => (props.$isDarkMode ? "rgba(255, 255, 255, 0.5)" : "#000")};
  background: transparent;
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "black")};
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 0 ${(props) => (props.$isDarkMode ? "rgba(255, 255, 255, 0.5)" : "#000")};

  &:hover {
    background: #ffe0b2;
    color: #000;
    transform: translateY(-1px);
    box-shadow: 0 3px 0 ${(props) => (props.$isDarkMode ? "rgba(255, 255, 255, 0.7)" : "#000")};
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 0 0 ${(props) => (props.$isDarkMode ? "rgba(255, 255, 255, 0.7)" : "#000")};
  }
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
  "voiceActing",
  "dateDisplay",
  "interfaceSettings", // New section
  "weatherLayout",
  "newsLayout",
];
const WEATHER_BLOCK_LABELS = {
  current: "Температура та іконка",
  details: "Деталі (Вологість, Вітер...)",
  ai: "Підсумок ШІ",
  hourly: "Годинний графік",
  daily: "Прогноз на 16 днів",
};

const NEWS_BLOCK_LABELS = {
  image: "Зображення",
  title: "Заголовок",
  description: "Опис",
};

const UserSettingsModal = ({ 
  onClose, 
  user, 
  availableAvatars, 
  onUpdate, 
  weatherCardLayout, 
  onUpdateLayout,
  showUpdateTimer,
  setShowUpdateTimer 
}) => {
  const dispatch = useDispatch();
  const customDays = useSelector((state) => state.calendar?.customDays || []);
  const [newDay, setNewDay] = useState({ d: "", m: "", reason: "" });

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
        : (user?.avatar && typeof user.avatar === 'string' && user.avatar.startsWith('http') && availableAvatars.indexOf(user.avatar) === -1) ? -1 : 0,
    textColor: user?.textColor || "grey",
    borderColor: user?.borderColor || "grey",
    showSeconds: user?.showSeconds !== false,
    dateDisplayMode: user?.dateDisplayMode || "both",
    hour12: user?.hour12 === true,
    voiceActingMode: user?.voiceActingMode || "malyatko",
    showUpdateTimer: showUpdateTimer !== false, 
  });
  const [showTerms, setShowTerms] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [sectionsOrder, setSectionsOrder] = useState([...DEFAULT_SECTIONS]);
  const [newsLayout, setNewsLayout] = useState(user?.newsLayout || [
    { key: "image", visible: true },
    { key: "title", visible: true },
    { key: "description", visible: true },
  ]);

  // Зберігаємо початковий стан користувача для відкату у разі скасування без збереження
  const initialUser = useMemo(() => ({ ...user }), [user]);

  const finishClosing = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setIsClosing(true);
    setTimeout(() => onClose(), 500);
  };

  const handleCancel = (e) => {
    if (e) e.stopPropagation();
    // Відкочуємо зміни в App.js до стану, який був при відкритті вікна
    onUpdate(initialUser);
    finishClosing();
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

  // Функція для миттєвого оновлення вигляду годинника в App.js
  const updateLivePreview = (updates) => {
    const newFormData = { ...formData, ...updates };
    setFormData(newFormData);

    // Оновлюємо стан у App.js миттєво
    if (updates.hasOwnProperty("showUpdateTimer")) {
      setShowUpdateTimer(updates.showUpdateTimer);
    }

    // Викликаємо onUpdate відразу, щоб App.js перерендерився з новими налаштуваннями
    onUpdate({
      ...user,
      firstName: newFormData.name,
      avatar: newFormData.avatarIndex === -1 ? user?.avatar : availableAvatars[newFormData.avatarIndex],
      birthDate: `${newFormData.year}-${newFormData.month.toString().padStart(2, "0")}-${newFormData.day.toString().padStart(2, "0")}`,
      textColor: newFormData.textColor,
      borderColor: newFormData.borderColor,
      showSeconds: newFormData.showSeconds,
      dateDisplayMode: newFormData.dateDisplayMode,
      hour12: newFormData.hour12,
      voiceActingMode: newFormData.voiceActingMode,
      showUpdateTimer: newFormData.showUpdateTimer,
      newsLayout: updates.newsLayout || newsLayout,
    });
  };

  const isInvalidDate = useMemo(() => {
    if (!formData.day || !formData.month || !formData.year) return false;
    const date = new Date(formData.year, formData.month - 1, formData.day);
    return (
      date.getFullYear() !== parseInt(formData.year) ||
      date.getMonth() !== parseInt(formData.month) - 1 ||
      date.getDate() !== parseInt(formData.day)
    );
  }, [formData.day, formData.month, formData.year]);
  const getPasswordStrength = (password) => {
    if (!password) return { width: "0%", color: "transparent", label: "" };
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password) || /[a-z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score <= 2) return { width: "33%", color: "#ff4d4d", label: "Слабкий" };
    if (score <= 4)
      return { width: "66%", color: "#ffb36c", label: "Середній" };
    return { width: "100%", color: "#4caf50", label: "Надійний" };
  };

  const pwStrength = getPasswordStrength(formData.newPassword);

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
      avatar: formData.avatarIndex === -1 ? user?.avatar : availableAvatars[formData.avatarIndex],
      birthDate: `${formData.year}-${formData.month.toString().padStart(2, "0")}-${formData.day.toString().padStart(2, "0")}`,
      textColor: formData.textColor,
      borderColor: formData.borderColor,
      showSeconds: formData.showSeconds,
      dateDisplayMode: formData.dateDisplayMode,
      hour12: formData.hour12,
      voiceActingMode: formData.voiceActingMode,
      showUpdateTimer: formData.showUpdateTimer, // Save new setting
      newsLayout: newsLayout,
      ...(formData.newPassword
        ? {
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
          }
        : {}),
    });
    finishClosing();
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

  const moveWeatherBlock = (idx, dir) => {
    const arr = [...weatherCardLayout];
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= arr.length) return;
    [arr[idx], arr[newIdx]] = [arr[newIdx], arr[idx]];
    onUpdateLayout(arr);
  };

  const toggleWeatherBlockVisibility = (key) => {
    const visibleCount = weatherCardLayout.filter((b) => b.visible).length;
    const block = weatherCardLayout.find((b) => b.key === key);
    
    if (block.visible && visibleCount <= 1) {
      alert("Має бути видимим хоча б один елемент!");
      return;
    }

    const newLayout = weatherCardLayout.map((b) =>
      b.key === key ? { ...b, visible: !b.visible } : b
    );
    onUpdateLayout(newLayout);
  };

  const toggleNewsBlockVisibility = (key) => {
    const visibleCount = newsLayout.filter((b) => b.visible).length;
    const block = newsLayout.find((b) => b.key === key);
    
    if (block.visible && visibleCount <= 1) {
      alert("Має бути видимим хоча б один елемент!");
      return;
    }

    const newLayout = newsLayout.map((b) =>
      b.key === key ? { ...b, visible: !b.visible } : b
    );
    setNewsLayout(newLayout);
    updateLivePreview({ newsLayout: newLayout });
  };

  const accepted = true;
  const [showKatScene, setShowKatScene] = useState(false);
  const handleKatSceneClose = () => {
    setShowKatScene(false);
    finishClosing();
  };
  const hasExternalAvatar = user?.avatar && typeof user.avatar === 'string' && user.avatar.startsWith('http') && availableAvatars.indexOf(user.avatar) === -1;
  const isGoogleAccount = Boolean(user?.email && !user?.password);

  const renderSectionHeader = (sectionKey, idx, label) => (
    <SectionHeader>
      <Label style={{ fontSize: "13px", fontWeight: "bold" }}>{label}</Label>
      <div style={{ display: "flex", gap: "2px" }}>
        <OrderButton
          disabled={idx === 0}
          onClick={() => moveSection(idx, -1)}
          title="Вище"
          style={{ width: "22px", height: "22px", fontSize: "12px" }}
        >
          ↑
        </OrderButton>
        <OrderButton
          disabled={idx === sectionsOrder.length - 1}
          onClick={() => moveSection(idx, 1)}
          title="Нижче"
          style={{ width: "22px", height: "22px", fontSize: "12px" }}
        >
          ↓
        </OrderButton>
      </div>
    </SectionHeader>
  );

  return (
    <>
      {showKatScene && <KatSceneModal onClose={handleKatSceneClose} />}
      <ModalOverlay $isClosing={isClosing} onClick={handleCancel}>
        <ModalContent
          $isClosing={isClosing}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={handleCancel}>&times;</CloseButton>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Title style={{ margin: 0 }}>Налаштування</Title>
              <div style={{ fontSize: 12, color: '#666' }}>{user?.email || user?.account}</div>
            </div>
            <button
              style={{
                background: "#ffb36c",
                color: "#000",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 14,
                padding: "8px 16px",
                cursor: "pointer",
                boxShadow: "0 2px 8px #0002",
              }}
              onClick={() => setShowKatScene(true)}
            >
              📹︎ 
            </button>
          </div>
          {/* ВСІ секції */}
          <SectionsContainer>
          {sectionsOrder.map((section, idx) => {
            let content = null;
            if (section === "name") {
              content = (
                <Section key="name">
                  {renderSectionHeader(section, idx, "Ім'я")}
                  <NameInput
                    $textColor={formData.textColor}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </Section>
              );
            } else if (section === "birthDate") {
              content = (
                <Section key="birthDate">
                  {renderSectionHeader(section, idx, "Дата народження")}
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
              );
            } else if (section === "security") {
              content = (
                <Section key="security">
                  {renderSectionHeader(section, idx, "Безпека")}
                        {isGoogleAccount ? (
                          <div style={{ fontSize: 13, color: '#444' }}>Google-акаунт — змінюйте пароль у налаштуваннях Google.</div>
                        ) : (
                          <> 
                            <Input
                              type="password"
                              placeholder="Поточний пароль"
                              disabled
                              readOnly
                              value="********"
                              style={{
                                marginBottom: "8px",
                                opacity: 0.6,
                                cursor: "not-allowed",
                              }}
                            />
                            <Input
                              type="password"
                              placeholder="Новий пароль"
                              onChange={(e) =>
                                setFormData({ ...formData, newPassword: e.target.value })
                              }
                              style={{
                                marginBottom: formData.newPassword ? "4px" : "8px",
                              }}
                            />
                            {formData.newPassword && (
                              <>
                                <PasswordStrengthContainer>
                                  <PasswordStrengthBar
                                    $width={pwStrength.width}
                                    $color={pwStrength.color}
                                  />
                                </PasswordStrengthContainer>
                                <PasswordStrengthLabel $color={pwStrength.color}>
                                  Надійність: {pwStrength.label}
                                </PasswordStrengthLabel>
                              </>
                            )}
                            <Input
                              type="password"
                              placeholder="Підтвердіть новий пароль"
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  confirmPassword: e.target.value,
                                })
                              }
                            />
                          </>
                        )}
                </Section>
              );
            } else if (section === "textColor") {
              content = (
                <Section key="textColor">
                  {renderSectionHeader(section, idx, "Колір тексту")}
                  <ColorContainer>
                    {COLORS.map((color, i) => (
                      <ColorCircle
                        key={i}
                        $color={color.value}
                        $isSelected={formData.textColor === color.value}
                        title={color.name}
                        onClick={() =>
                          setFormData({ ...formData, textColor: color.value })
                        }
                      />
                    ))}
                  </ColorContainer>
                </Section>
              );
            } else if (section === "borderColor") {
              content = (
                <Section key="borderColor">
                  {renderSectionHeader(section, idx, "Колір рамки аватара")}
                  <ColorContainer>
                    {COLORS.map((color, i) => (
                      <ColorCircle
                        key={i}
                        $color={color.value}
                        $isSelected={formData.borderColor === color.value}
                        title={color.name}
                        onClick={() =>
                          setFormData({ ...formData, borderColor: color.value })
                        }
                      />
                    ))}
                  </ColorContainer>
                </Section>
              );
            } else if (section === "avatar") {
              content = (
                <Section key="avatar">
                  {renderSectionHeader(section, idx, "Аватар")}
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    Аватар оберіть. Активуйте
                    <AnimatedText>Стихія+</AnimatedText> яка, дає доступ до відео аватарів. Отримуйте з магазину доміно, за сезонний пропуск
                  </div>
                  <AvatarSlider>
                    {availableAvatars.map((img, i) => (
                      <AvatarOption
                        key={i}
                        $isSelected={formData.avatarIndex === i}
                        $borderColor={formData.borderColor}
                        onClick={() =>
                          setFormData({ ...formData, avatarIndex: i })
                        }
                      >
                        <img src={img} alt="avatar" />
                      </AvatarOption>
                    ))}
                    {hasExternalAvatar && (
                      <AvatarOption
                        key="external"
                        $isSelected={formData.avatarIndex === -1}
                        $borderColor={formData.borderColor}
                        title="Google аватарка"
                        onClick={() => setFormData({ ...formData, avatarIndex: -1 })}
                      >
                        <img src={user.avatar} alt="google-avatar" />
                      </AvatarOption>
                    )}
                  </AvatarSlider>
                </Section>
              );
            } else if (section === "dateDisplay") {
              content = (
                <Section key="dateDisplay">
                  {renderSectionHeader(section, idx, "Налаштування годинника")}
                  <CheckboxRow>
                    <input
                      type="checkbox"
                      checked={formData.showSeconds}
                      onChange={(e) =>
                        updateLivePreview({ showSeconds: e.target.checked })
                      }
                    />
                    <label>Показувати секунди (17:23:17)</label>
                  </CheckboxRow>
                  <CheckboxRow>
                    <input
                      type="checkbox"
                      checked={formData.hour12}
                      onChange={(e) =>
                        updateLivePreview({ hour12: e.target.checked })
                      }
                    />
                    <label>12-годинний формат (AM/PM)</label>
                  </CheckboxRow>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                      marginTop: "5px",
                    }}
                  >
                    <Select
                      value={formData.dateDisplayMode}
                      onChange={(e) =>
                        updateLivePreview({ dateDisplayMode: e.target.value })
                      }
                    >
                      <option value="both">Час та Дата (разом)</option>
                      <option value="time">Тільки Час</option>
                      <option value="date">Тільки Дата</option>
                    </Select>
                  </div>
                </Section>
              );
            } else if (section === "customCalendar") {
              content = (
                <Section key="customCalendar">
                  <label style={{ fontSize: "13px", fontWeight: "bold" }}>
                    Мої пам'ятні дні (макс. 10)
                  </label>
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
                      marginBottom: "10px",
                    }}
                  >
                    <Select
                      value={newDay.d}
                      onChange={(e) =>
                        setNewDay({ ...newDay, d: e.target.value })
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
                      value={newDay.m}
                      onChange={(e) =>
                        setNewDay({ ...newDay, m: e.target.value })
                      }
                    >
                      <option value="">Місяць</option>
                      {months.map((m, i) => (
                        <option key={i} value={i + 1}>
                          {m}
                        </option>
                      ))}
                    </Select>
                  </div>
                  <Input
                    placeholder="Чому цей день важливий?"
                    value={newDay.reason}
                    onChange={(e) =>
                      setNewDay({ ...newDay, reason: e.target.value })
                    }
                    style={{ marginBottom: "5px" }}
                  />
                  <button
                    style={{
                      background: "#004cff",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      padding: "8px",
                      cursor: "pointer",
                    }}
                    disabled={
                      !newDay.d ||
                      !newDay.m ||
                      !newDay.reason ||
                      customDays.length >= 10
                    }
                    onClick={() => {
                      const formattedDate = `${newDay.d.toString().padStart(2, "0")}.${newDay.m.toString().padStart(2, "0")}`;
                      dispatch(
                        addCustomDay({
                          date: formattedDate,
                          reason: newDay.reason,
                        }),
                      );
                      setNewDay({ d: "", m: "", reason: "" });
                    }}
                  >
                    Додати день
                  </button>
                  <div
                    style={{
                      marginTop: "10px",
                      maxHeight: "150px",
                      overflowY: "auto",
                    }}
                  >
                    {customDays.map((day) => (
                      <div
                        key={day.date}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: "#f0f0f0",
                          padding: "5px",
                          marginBottom: "3px",
                          borderRadius: "5px",
                          fontSize: "12px",
                        }}
                      >
                        <span style={{ color: "#004cff", fontWeight: "bold" }}>
                          {day.date}
                        </span>
                        <span
                          style={{ flex: 1, marginLeft: "10px", color: "#333" }}
                        >
                          {day.reason}
                        </span>
                        <button
                          onClick={() => dispatch(removeCustomDay(day.date))}
                          style={{
                            background: "none",
                            border: "none",
                            color: "red",
                            cursor: "pointer",
                            fontWeight: "bold",
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </Section>
              );
            } else if (section === "interfaceSettings") { // New section for interface settings
              content = (
                <Section key="interfaceSettings">
                  {renderSectionHeader(section, idx, "Налаштування інтерфейсу")}
                  <CheckboxRow>
                    <input
                      type="checkbox"
                      checked={formData.showUpdateTimer}
                      onChange={(e) =>
                        updateLivePreview({ showUpdateTimer: e.target.checked })
                      }
                    />
                    <label>Показувати таймер оновлення погоди</label>
                  </CheckboxRow>
                </Section>
              );
            }  else if (section === "weatherLayout") {
              content = (
                <Section key="weatherLayout">
                  {renderSectionHeader(section, idx, "Налаштування картки погоди")}
                  <p style={{ fontSize: "11px", color: "#666", margin: "0 0 5px 0" }}>
                    Виберіть, які блоки відображати та в якому порядку.
                  </p>
                  {weatherCardLayout.map((block, idx) => (
                    <div key={block.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.3)", padding: "5px 10px", borderRadius: "8px", marginBottom: "4px" }}>
                      <CheckboxRow style={{ flex: 1 }}>
                        <input
                          type="checkbox"
                          checked={block.visible}
                          onChange={() => toggleWeatherBlockVisibility(block.key)}
                        />
                        <span style={{ fontSize: "12px", fontWeight: 500 }}>{WEATHER_BLOCK_LABELS[block.key]}</span>
                      </CheckboxRow>
                      <div style={{ display: "flex", gap: "2px" }}>
                        <OrderButton
                          style={{ width: "22px", height: "22px", fontSize: "12px" }}
                          disabled={idx === 0}
                          onClick={() => moveWeatherBlock(idx, -1)}
                        >
                          ↑
                        </OrderButton>
                        <OrderButton
                          style={{ width: "22px", height: "22px", fontSize: "12px" }}
                          disabled={idx === weatherCardLayout.length - 1}
                          onClick={() => moveWeatherBlock(idx, 1)}
                        >
                          ↓
                        </OrderButton>
                      </div>
                    </div>
                  ))}
                </Section>
              );
            } else if (section === "newsLayout") {
              content = (
                <Section key="newsLayout">
                  {renderSectionHeader(section, idx, "Налаштування новин")}
                  <p style={{ fontSize: "11px", color: "#666", margin: "0 0 5px 0" }}>
                    Виберіть, які елементи новин відображати.
                  </p>
                  {newsLayout.map((block) => (
                    <div key={block.key} style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.3)", padding: "5px 10px", borderRadius: "8px", marginBottom: "4px" }}>
                      <CheckboxRow style={{ flex: 1 }}>
                        <input
                          type="checkbox"
                          checked={block.visible}
                          onChange={() => toggleNewsBlockVisibility(block.key)}
                        />
                        <span style={{ fontSize: "12px", fontWeight: 500 }}>{NEWS_BLOCK_LABELS[block.key]}</span>
                      </CheckboxRow>
                    </div>
                  ))}
                </Section>
              );
            }
            return content;
          })}
          </SectionsContainer>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
            <ResetOrderButton onClick={resetSectionsOrder}>
              Скинути порядок
            </ResetOrderButton>
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
              <TermsBtn
                onClick={(e) => {
                  setShowTerms(true);
                }}
              >
                Угодою
              </TermsBtn>
            </label>
          </CheckboxRow>
          <div style={{ display: "flex", gap: "4px", marginTop: "3px" }}>
            <CancelButton onClick={handleCancel}>Скасувати</CancelButton>
            <SaveButton onClick={handleSubmit} disabled={isInvalidDate}>
              Зберегти
            </SaveButton>
          </div>
        </ModalContent>
      </ModalOverlay>
      {showTerms && (
        <InfoModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
      )}
    </>
  );
};

export default UserSettingsModal;

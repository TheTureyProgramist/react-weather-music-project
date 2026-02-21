import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import logo from "../../photos/hero-header/logo.png";
import bell from "../../mp3/bell.mp3";

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -2px;
  background-color: #ff4444;
  color: white;
  font-size: 10px;
  font-weight: bold;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  animation: ${pulse} 1.5s infinite ease-in-out;
  pointer-events: none;
`;

const flow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const VipTextWrapper = styled.div`
  display: grid;
  cursor: pointer;
  align-items: center;
`;

const RainbowText = styled.h1`
  grid-area: 1 / 1;
  font-family: "Inter", sans-serif;
  font-size: 9px;
  font-weight: bold;
  margin: 0;
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7f00,
    #ffff00,
    #00ff00,
    #0000ff,
    #8b00ff
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.$show ? 1 : 0)};

  @media (min-width: 768px) {
    font-size: 15px;
  }
`;
const UltraText = styled.h1`
  grid-area: 1 / 1;
  font-family: "Inter", sans-serif;
  font-size: 9px;
  font-weight: bold;
  margin: 0;
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
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.$show ? 1 : 0)};

  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

const HeaderDiv = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid ${(props) => (props.$isDarkMode ? "#444" : "black")};
  position: fixed;
  background: ${(props) => (props.$isDarkMode ? "#1a1a1a" : "white")};
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background-color 0.3s ease;
  @media (min-width: 768px) {
    height: 70px;
    padding: 0 30px;
  }
  @media (min-width: 1200px) {
    height: 80px;
  }
`;

const HeaderFix = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  @media (min-width: 768px) {
    gap: 20px;
  }
  @media (min-width: 1200px) {
    gap: 29px;
  }
`;

const ThemeButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.$isDarkMode ? "13px" : "12px")};
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.1);
  }
  @media (min-width: 768px) {
    font-size: ${(props) => (props.$isDarkMode ? "21px" : "18px")};
  }
  @media (min-width: 1200px) {
    font-size: ${(props) => (props.$isDarkMode ? "23px" : "20px")};
  }
`;

const LoginLink = styled.span`
  font-size: 12px;
  cursor: pointer;
  padding: 9px 18px;
  background: #e0e0e0;
  border-radius: 8px;
  text-decoration: underline;
  color: ${(props) => (props.$isDarkMode ? "#ffb36c" : "#555")};
  font-weight: 600;
  &:hover {
    opacity: 0.8;
  }
  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

const HeaderButton = styled.button`
  background: #ffb36c;
  font-weight: 600;
  cursor: pointer;
  border: none;
  border-radius: 8px;
  padding: 9px 18px;
  font-size: 11px;
  transition: background 0.2s;
  &:hover {
    background: #ffa04d;
  }
  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 13px;
  display: flex;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#1a1a1a")};
  align-items: center;
  @media (min-width: 768px) {
    font-size: 16px;
  }
  @media (min-width: 1200px) {
    font-size: 19px;
  }
`;

const CounterText = styled.span`
  font-size: 6px;
  font-weight: 700;
  letter-spacing: -0.5px;
  @media (min-width: 768px) {
    font-size: 10px;
  }
`;

const HeaderLogo = styled.img`
  height: 45px;
  border-radius: 50%;
  @media (min-width: 768px) {
    height: 65px;
  }
  @media (min-width: 1200px) {
    height: 75px;
  }
`;

const HeaderAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  border: 2px solid transparent;
  background-image: ${(props) =>
    props.$bColor?.includes("linear-gradient")
      ? `linear-gradient(white, white), ${props.$bColor}`
      : "none"};
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-color: ${(props) =>
    props.$bColor?.includes("linear-gradient") ? "transparent" : "transparent"};
  border-color: ${(props) =>
    props.$bColor?.includes("linear-gradient")
      ? "transparent"
      : props.$bColor || "transparent"};
  ${(props) =>
    props.$bColor?.includes("270deg") &&
    css`
      background-size:
        100% 100%,
        400% 400%;
      animation: ${flow} 5s ease infinite;
    `}

  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
  @media (min-width: 1200px) {
    width: 50px;
    height: 50px;
  }
`;

const UserName = styled.span`
  font-size: 9px;
  font-weight: bold;
  margin-right: 5px;
  ${(props) => {
    const isGradient = props.$uColor?.includes("linear");
    const isAnimated = props.$uColor?.includes("270deg");
    if (isGradient) {
      return css`
        background: ${props.$uColor};
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
        color: ${props.$uColor || "inherit"};
        background: none;
        -webkit-background-clip: none;
        -webkit-text-fill-color: currentcolor;
      `;
    }
  }}
  @media (min-width: 768px) {
    font-size: 15px;
    margin-right: 5px;
  }
`;

const Header = ({
  onOpenRegister,
  onOpenLogin,
  onOpenSettings,
  onOpenVip,
  onOpenShop,
  user,
  isDarkMode,
  toggleTheme,
  onOpenAchievements,
  currentAvatar,
  onLogout,
}) => {
  const [showUltra, setShowUltra] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowUltra((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleThemeToggle = () => {
    const audio = new Audio(bell);
    audio.play().catch((err) => console.log("Audio play prevented: ", err));
    toggleTheme();
  };

  return (
    <HeaderDiv $isDarkMode={isDarkMode}>
      <HeaderFix>
        <HeaderLogo src={logo} alt="Логотип Стихії: Погода надійніша з нами!"/>
        {user && (
          <VipTextWrapper onClick={onOpenVip}>
            <RainbowText $show={!showUltra}>Стихія+</RainbowText>
            <UltraText $show={showUltra}>Стихія+ Ультра</UltraText>
          </VipTextWrapper>
        )}
      </HeaderFix>
      <HeaderFix>
        <ThemeButton onClick={handleThemeToggle} $isDarkMode={isDarkMode}>
          {isDarkMode ? "☀️" : "🌑"}
        </ThemeButton>
        {user ? (
          <>
            <IconWrapper>
              <IconButton
                onClick={onOpenShop}
                title="Магазин конвертів"
                $isDarkMode={isDarkMode}
              >
                <CounterText>2000/2000</CounterText>🧧
              </IconButton>
              <NotificationBadge>!</NotificationBadge>
            </IconWrapper>
            <IconButton
              title="Досягнення"
              onClick={onOpenAchievements}
              $isDarkMode={isDarkMode}
            >
              🏆
            </IconButton>
            <IconButton
              onClick={onOpenSettings}
              title="Налаштування"
              $isDarkMode={isDarkMode}
            >
              ⚙️
            </IconButton>
            <IconButton
              onClick={onLogout}
              title="Вийти"
              $isDarkMode={isDarkMode}
            >
              🚪
            </IconButton>
            <UserName $uColor={user.textColor}>{user.firstName}</UserName>
            <HeaderAvatar src={currentAvatar} $bColor={user.borderColor} />
          </>
        ) : (
          <>
            <LoginLink onClick={onOpenLogin}>Увійти</LoginLink>
            <HeaderButton onClick={onOpenRegister}>Реєстрація</HeaderButton>
          </>
        )}
      </HeaderFix>
    </HeaderDiv>
  );
};
export default Header;

import styled, { keyframes } from "styled-components";
import logo from "../../photos/hero-header/logo.png";

const flow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const AnimatedText = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 9px;
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
  cursor: pointer;

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
  @media (min-width: 768px) {
    height: 80px;
  }
`;

const HeaderFix = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (min-width: 768px) {
    gap: 20px;
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
  @media (min-width: 1200px) {
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
  align-items: center;
  @media (min-width: 768px) {
    font-size: 16px;
  }
  @media (min-width: 768px) {
    font-size: 19px;
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
  border: 1px solid #ddd;
  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const UserName = styled.span`
  font-size: 9px;
  font-weight: 500;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
  margin-right: 5px;
  @media (min-width: 768px) {
    font-size: 15px;
  }
`;

const Header = ({
  onOpenRegister,
  onOpenLogin,
  onOpenSettings,
  onOpenVip,
  user,
  isDarkMode,
  toggleTheme,
  currentAvatar,
  onLogout,
}) => {
  return (
    <HeaderDiv $isDarkMode={isDarkMode}>
      <HeaderFix>
        <HeaderLogo src={logo} />
        {user && <AnimatedText onClick={onOpenVip}>Стихія+</AnimatedText>}
      </HeaderFix>
      <HeaderFix>
        <ThemeButton onClick={toggleTheme} $isDarkMode={isDarkMode}>
          {isDarkMode ? "☀️" : "🌑"}
        </ThemeButton>
        {user ? (
          <>
            <IconButton onClick={onOpenSettings} title="Налаштування">
              ⚙️
            </IconButton>
            <IconButton onClick={onLogout} title="Вийти">
              🚪
            </IconButton>
            <UserName $isDarkMode={isDarkMode}>
              {user.firstName} {user.lastName}
            </UserName>
            <HeaderAvatar src={currentAvatar} alt="User" />
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

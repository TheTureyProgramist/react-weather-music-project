import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import logo from "../../photos/hero-header/logo.png";
import BurgerMenu from "./Menu.jsx";
import bell from "../../mp3/bell.mp3";
import UserSearchModal from "../Modals/UserSearchModal.jsx";

const flow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HeaderDiv = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 2px solid #8f8f8f;
  position: fixed;
  background: ${(props) => (props.$isDarkMode ? "#1a1a1a" : "white")};
  top: 0;
  left: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
  box-sizing: border-box;
  margin: 0;

  @media (min-width: 768px) {
    height: 80px;
    padding: 0 20px;
  }
  @media (min-width: 1920px) {
    height: 130px;
    padding: 0 60px;
  }
`;

const HeaderFix = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 5px; /* Невеликий проміжок між іконками */

  @media (min-width: 768px) {
    gap: 10px;
  }
  @media (min-width: 1920px) {
    gap: 20px;
  }
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#1a1a1a")};
  align-items: center;
  justify-content: center;
  padding: 4px;
  flex-shrink: 0;
  font-size: 9px;

  @media (min-width: 768px) {
    font-size: 22px;
  }
  @media (min-width: 1920px) {
    font-size: 44px;
  }
`;

const EmojiWrapper = styled.span`
  display: inline-block;
  font-size: 12px;
  @media (min-width: 720px) {
    font-size: 24px;
  }
  @media (min-width: 1920px) {
    font-size: 44px;
  }
`;

const UserName = styled.span`
  font-size: 7px;
  font-weight: bold;
  max-width: 80px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 3px;
  flex-shrink: 2;

  @media (min-width: 400px) {
    max-width: 100px;
  }
  @media (min-width: 768px) {
    font-size: 16px;
    max-width: 250px;
  }
  @media (min-width: 1920px) {
    font-size: 28px;
    max-width: 500px;
  }

  ${(props) => {
    if (props.$uColor?.includes("linear")) {
      return css`
        background: ${props.$uColor};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        background-size: 400% 400%;
        animation: ${flow} 5s ease infinite;
      `;
    }
    return `color: ${props.$uColor || "inherit"};`;
  }}
`;

const HeaderAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  min-width: 30px;
  margin-right: 0; /* ВИДАЛЕНО ВСІ МАРДЖІНИ */
  object-fit: cover;
  flex-shrink: 0;
  border: 1.5px solid transparent;
  box-sizing: border-box;
  background-image: ${(props) =>
    props.$bColor?.includes("linear-gradient")
      ? `linear-gradient(white, white), ${props.$bColor}`
      : "none"};
  background-origin: border-box;
  background-clip: content-box, border-box;
  border-color: ${(props) =>
    props.$bColor?.includes("linear-gradient")
      ? "transparent"
      : props.$bColor || "transparent"};

  @media (min-width: 768px) {
    width: 42px;
    height: 42px;
  }
  @media (min-width: 1920px) {
    width: 85px;
    height: 85px;
    border-width: 4px;
  }
`;

const VipTextWrapper = styled.div`
  display: grid;
  cursor: pointer;
  align-items: center;
  margin-left: 5px;
  flex-shrink: 0;
`;

const RainbowText = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 7px;
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
  grid-area: 1/1;
  @media (min-width: 768px) {
    font-size: 15px;
  }
  @media (min-width: 1920px) {
    font-size: 32px;
  }
`;

const UltraText = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 7px;
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
  grid-area: 1/1;
  @media (min-width: 768px) {
    font-size: 15px;
  }
  @media (min-width: 1920px) {
    font-size: 32px;
  }
`;

const HeaderLogo = styled.img`
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  @media (min-width: 768px) {
    height: 50px;
  }
  @media (min-width: 1920px) {
    height: 100px;
  }
`;

const Spa = styled.span`
  font-size: 9px;
  @media (min-width: 768px) {
    font-size: 18px;
  }
  @media (min-width: 1920px) {
    font-size: 32px;
  }
`;

const Spn = styled.span`
  font-size: 5px;
  @media (min-width: 768px) {
    font-size: 9px;
  }
  @media (min-width: 1920px) {
    font-size: 13px;
  }
`;

const ShopIconInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: -3px; 

  @media (min-width: 768px) {
    gap: 12px; 
  }

  @media (min-width: 1920px) {
    gap: 25px; 
  }
`;
const Header = ({
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
  siteSections,
  moveSiteSection,
  resetSiteSections,
  isRoutingMode,
  setIsRoutingMode,
  currentPath,
}) => {
  const [showUltra, setShowUltra] = useState(false);
  const [isUserSearchOpen, setIsUserSearchOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setShowUltra((prev) => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  const handleThemeToggle = () => {
    new Audio(bell).play().catch(() => {});
    toggleTheme();
  };

  return (
    <>
      <HeaderDiv $isDarkMode={isDarkMode}>
        <HeaderFix>
          <HeaderLogo src={logo} alt="Logo" />
          {user && (
            <VipTextWrapper onClick={onOpenVip}>
              <RainbowText $show={!showUltra}>Стихія+</RainbowText>
              <UltraText $show={showUltra}>Стихія+ Ultra</UltraText>
            </VipTextWrapper>
          )}
        </HeaderFix>

        <HeaderFix>
          {user ? (
            <>
              <ButtonsGroup>
                <IconButton
                  onClick={handleThemeToggle}
                  $isDarkMode={isDarkMode}
                >
                  <EmojiWrapper>{isDarkMode ? "☀️" : "🌑"}</EmojiWrapper>
                </IconButton>

                <IconButton
                  onClick={() => setIsUserSearchOpen(true)}
                  $isDarkMode={isDarkMode}
                >
                  <EmojiWrapper style={{ fontWeight: 900 }}>+</EmojiWrapper>
                </IconButton>

                <IconButton onClick={onOpenShop} $isDarkMode={isDarkMode}>
                  <ShopIconInner>
                    <Spa>🧧</Spa>
                    <Spn style={{ fontWeight: 800 }}>10к/10к</Spn>
                  </ShopIconInner>
                </IconButton>

                <IconButton
                  onClick={onOpenAchievements}
                  $isDarkMode={isDarkMode}
                >
                  🏆
                </IconButton>

                <IconButton onClick={onOpenSettings} $isDarkMode={isDarkMode}>
                  ⚙️
                </IconButton>

                <IconButton onClick={onLogout} $isDarkMode={isDarkMode}>
                  🚪
                </IconButton>

                <IconButton
                  onClick={() => setIsBurgerOpen(true)}
                  $isDarkMode={isDarkMode}
                >
                  <EmojiWrapper>☰</EmojiWrapper>
                </IconButton>
              </ButtonsGroup>
              <UserName $uColor={user.textColor}>{user.firstName}</UserName>
              <HeaderAvatar src={currentAvatar} $bColor={user.borderColor} />
            </>
          ) : (
            <>
              <IconButton onClick={handleThemeToggle} $isDarkMode={isDarkMode}>
                <EmojiWrapper>{isDarkMode ? "☀️" : "🌑"}</EmojiWrapper>
              </IconButton>
              <button
                onClick={onOpenLogin}
                style={{
                  fontSize: "11px",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  textDecoration: "underline",
                  color: isDarkMode ? "#fff" : "#000",
                }}
              >
                Увійти
              </button>
            </>
          )}
        </HeaderFix>
      </HeaderDiv>

      <BurgerMenu
        isOpen={isBurgerOpen}
        onClose={() => setIsBurgerOpen(false)}
        isDarkMode={isDarkMode}
        siteSections={siteSections}
        moveSiteSection={moveSiteSection}
        resetSiteSections={resetSiteSections}
        onToggleTheme={handleThemeToggle}
        onOpenShop={onOpenShop}
        onOpenAchievements={onOpenAchievements}
        onOpenSettings={onOpenSettings}
        onLogout={onLogout}
        isRoutingMode={isRoutingMode}
        setIsRoutingMode={setIsRoutingMode}
        currentPath={currentPath}
      />
      <UserSearchModal
        isOpen={isUserSearchOpen}
        onClose={() => setIsUserSearchOpen(false)}
        currentAvatar={currentAvatar}
      />
    </>
  );
};

export default Header;

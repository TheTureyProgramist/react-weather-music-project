import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import logo from "../../photos/hero-header/logo.png";
import bell from "../../mp3/bell.mp3";
import UserSearchModal from "../Modals/UserSearchModal.jsx";

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const flow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const slideDown = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

const slideUp = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-100%); }
`;

const IconWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
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
  @media (min-width: 1920px) {
    font-size: 32px;
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
  @media (min-width: 1920px) {
    font-size: 32px;
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
  @media (min-width: 1920px) {
    height: 130px;
    padding: 0 60px;
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
  @media (min-width: 1920px) {
    gap: 60px;
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
  @media (min-width: 1920px) {
    font-size: 45px;
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
  @media (min-width: 768px) {
    font-size: 15px;
  }
  @media (min-width: 1920px) {
    font-size: 28px;
    padding: 20px 40px;
    border-radius: 15px;
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
  @media (min-width: 768px) {
    font-size: 15px;
  }
  @media (min-width: 1920px) {
    font-size: 28px;
    padding: 20px 40px;
    border-radius: 15px;
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
  @media (min-width: 1920px) {
    font-size: 45px;
  }
`;

const ShopIconInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
`;

const ShopEmoji = styled.span`
  line-height: 1;
    font-size: 20px;
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1920px) {
    font-size: 50px;
  }
`;

const CounterText = styled.span`
  font-size: 6px;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 1;
  @media (min-width: 768px) {
    font-size: 10px;
  }
  @media (min-width: 1920px) {
    font-size: 22px;
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
  @media (min-width: 1920px) {
    height: 110px;
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
  border-color: ${(props) =>
    props.$bColor?.includes("linear-gradient")
      ? "transparent"
      : props.$bColor || "transparent"};

  @media (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
  @media (min-width: 1200px) {
    width: 50px;
    height: 50px;
  }
  @media (min-width: 1920px) {
    width: 90px;
    height: 90px;
    border-width: 5px;
  }
`;

const UserName = styled.span`
  font-size: 9px;
  font-weight: bold;
  margin-right: 5px;
  @media (min-width: 768px) {
    font-size: 15px;
    margin-right: 5px;
  }
  @media (min-width: 1920px) {
    font-size: 30px;
    margin-right: 15px;
  }

  ${(props) => {
    const isGradient = props.$uColor?.includes("linear");
    if (isGradient) {
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

const BurgerButton = styled(IconButton)`
  font-size: 20px;
  padding: 5px;
  @media (min-width: 768px) {
    font-size: 20px;
  }
  @media (min-width: 1920px) {
    font-size: 50px;
  }
`;

const BurgerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: ${(props) => (props.$isRendered ? "block" : "none")};
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  transition: opacity 0.4s ease;
`;

const BurgerMenuPanel = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-height: 95vh;
  overflow-y: auto;
  background: ${(props) => (props.$isDarkMode ? "#1a1a1a" : "#ffffff")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#1a1a1a")};
  z-index: 1001;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 20px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.3);
  display: ${(props) => (props.$isRendered ? "block" : "none")};
  animation: ${(props) => (props.$isOpen ? slideDown : slideUp)} 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  @media (min-width: 768px) {
    padding: 40px;
  }
  @media (min-width: 1920px) {
    padding: 60px;
    border-bottom-left-radius: 40px;
    border-bottom-right-radius: 40px;
  }
`;

const BurgerCloseBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 24px;
  font-weight: bold;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#1a1a1a")};
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 20px;
  @media (min-width: 1920px) {
    font-size: 50px;
    top: 30px;
    right: 40px;
  }
`;

const BurgerContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  margin-top: 40px;
  
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const MenuSectionTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
  border-bottom: 2px solid #ff005d;
  padding-bottom: 5px;
  display: inline-block;
  @media (min-width: 1920px) {
    font-size: 36px;
    margin-bottom: 25px;
  }
`;

const LegendList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 12px;
    font-size: 14px;
    @media (min-width: 1920px) {
      font-size: 26px;
      margin-bottom: 20px;
      gap: 25px;
    }
    span.icon {
      font-size: 20px;
      @media (min-width: 1920px) { font-size: 40px; }
    }
  }
`;

const NavLinksList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    margin-bottom: 10px;
    @media (min-width: 1920px) { margin-bottom: 20px; }
  }
  a {
    text-decoration: none;
    color: ${(props) => (props.$isDarkMode ? "#ffb36c" : "#ff005d")};
    font-size: 16px;
    font-weight: 600;
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.7;
    }
    @media (min-width: 1920px) { font-size: 30px; }
  }
`;

const SectionOrderContainer = styled.div`
  background: #ff005d;
  color: white;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px #0001;
  margin-top: 10px;
  @media (min-width: 1920px) {
    padding: 24px;
    border-radius: 20px;
    h4 { font-size: 28px !important; }
    span { font-size: 22px !important; }
    button { font-size: 20px !important; padding: 10px 16px !important; }
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
  siteSections,
  moveSiteSection,
  resetSiteSections,
}) => {
  const [showUltra, setShowUltra] = useState(false);
  const [isUserSearchOpen, setIsUserSearchOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [isBurgerRendered, setIsBurgerRendered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowUltra((prev) => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isBurgerOpen) {
      setIsBurgerRendered(true);
    } else {
      const timer = setTimeout(() => setIsBurgerRendered(false), 400); 
      return () => clearTimeout(timer);
    }
  }, [isBurgerOpen]);

  const handleThemeToggle = () => {
    const audio = new Audio(bell);
    audio.play().catch((err) => console.log("Audio play prevented: ", err));
    toggleTheme();
  };

  const closeBurger = () => setIsBurgerOpen(false);

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
          {user && (
            <IconButton
              onClick={() => setIsUserSearchOpen(true)}
              title="Додати користувача"
              $isDarkMode={isDarkMode}
            >
              <span style={{ fontSize: 28, fontWeight: 700, lineHeight: 1 }}>+</span>
            </IconButton>
          )}
          <ThemeButton onClick={handleThemeToggle} $isDarkMode={isDarkMode}>
            {isDarkMode ? "☀️" : "🌑"}
          </ThemeButton>
          
          {user ? (
            <>
              <IconWrapper>
                <IconButton
                  onClick={onOpenShop}
                  title="Магазин"
                  $isDarkMode={isDarkMode}
                >
                  <ShopIconInner>
                    <ShopEmoji>🧧</ShopEmoji>
                    <CounterText>2000/2000</CounterText>
                  </ShopIconInner>
                </IconButton>
              </IconWrapper>
              <IconButton
                onClick={onOpenAchievements}
                title="Досягнення"
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
            <BurgerButton onClick={() => setIsBurgerOpen(true)} $isDarkMode={isDarkMode}>
            ☰
          </BurgerButton>
              <UserName $uColor={user.textColor}>{user.firstName}</UserName>
              <HeaderAvatar src={currentAvatar} $bColor={user.borderColor} />
            </>
          ) : (
            <>
              <LoginLink $isDarkMode={isDarkMode} onClick={onOpenLogin}>Увійти</LoginLink>
              <HeaderButton onClick={onOpenRegister}>Реєстрація</HeaderButton>
            </>
          )}
        </HeaderFix>
      </HeaderDiv>
      <BurgerOverlay $isOpen={isBurgerOpen} $isRendered={isBurgerRendered} onClick={closeBurger} />
      <BurgerMenuPanel $isOpen={isBurgerOpen} $isRendered={isBurgerRendered} $isDarkMode={isDarkMode}>
        <BurgerCloseBtn onClick={closeBurger} $isDarkMode={isDarkMode}>✕</BurgerCloseBtn>
        
        <BurgerContentGrid>
          <div>
            <MenuSectionTitle>Навігація (Секції)</MenuSectionTitle>
            <NavLinksList $isDarkMode={isDarkMode}>
              {siteSections && siteSections.map(section => (
                <li key={section.key}>
                  <a href={`#${section.key}`} onClick={closeBurger}>{section.label}</a>
                </li>
              ))}
            </NavLinksList>

            <MenuSectionTitle style={{marginTop: "30px"}}>Управління секціями</MenuSectionTitle>
            <SectionOrderContainer>
              <h4 style={{ fontWeight: 700, fontSize: 16, margin: "0 0 15px 0" }}>
                Порядок секцій сайту:
              </h4>
              {siteSections && siteSections.map((section, idx) => (
                <div
                  key={section.key}
                  style={{ display: "flex", alignItems: "center", marginBottom: 8 }}
                >
                  <span style={{ minWidth: 120, fontWeight: 500 }}>{section.label}</span>
                  <button
                    style={{
                      fontSize: "16px", padding: "2px 8px", borderRadius: "6px",
                      border: "none", background: "#fff", color: "#000",
                      marginLeft: 8, cursor: idx === 0 ? "not-allowed" : "pointer",
                      opacity: idx === 0 ? 0.5 : 1
                    }}
                    disabled={idx === 0}
                    onClick={() => moveSiteSection(idx, -1)}
                    title="Вище"
                  >
                    ↑
                  </button>
                  <button
                    style={{
                      fontSize: "16px", padding: "2px 8px", borderRadius: "6px",
                      border: "none", background: "#fff", color: "#000",
                      marginLeft: 4, cursor: idx === siteSections.length - 1 ? "not-allowed" : "pointer",
                      opacity: idx === siteSections.length - 1 ? 0.5 : 1
                    }}
                    disabled={idx === siteSections.length - 1}
                    onClick={() => moveSiteSection(idx, 1)}
                    title="Нижче"
                  >
                    ↓
                  </button>
                </div>
              ))}
              <button
                style={{
                  marginTop: 15, padding: "8px 18px", borderRadius: "8px",
                  border: "none", background: "#ffe0b2", color: "#000",
                  fontWeight: 600, cursor: "pointer",
                }}
                onClick={resetSiteSections}
              >
                Скинути порядок
              </button>
            </SectionOrderContainer>
          </div>

          <div>
            <MenuSectionTitle>Значки функціоналу</MenuSectionTitle>
            <LegendList>
              <li><span className="icon">☀️ / 🌑</span> Перемикач світлої/темної теми</li>
              <li><span className="icon" style={{fontWeight: 'bold'}}>+</span>Ваші присторї, пошук користувачів</li>
              <li><span className="icon">🧧</span> Магазин конвертів</li>
              <li><span className="icon">🏆</span> Досягнення</li>
              <li><span className="icon">⚙️</span> Налаштування вашого профілю</li>
              <li><span className="icon">🚪</span> Вихід з вашого облікового запису</li>
            </LegendList>
          </div>
        </BurgerContentGrid>
      </BurgerMenuPanel>

      <UserSearchModal
        isOpen={isUserSearchOpen}
        onClose={() => setIsUserSearchOpen(false)}
        currentAvatar={currentAvatar}
      />
    </>
  );
};

export default Header;
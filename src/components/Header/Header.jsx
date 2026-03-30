import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import logo from "../../photos/hero-header/logo.png";
import BurgerMenu from "./Menu.jsx";
import bell from "../../mp3/bell.mp3";
import money from "../../photos/fan-art/money.webp";
import UserSearchModal from "../Modals/UserSearchModal.jsx";

const flow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const vibrate = keyframes`
  0% { transform: translateX(-50%) translate(0,0); }
  10% { transform: translateX(-50%) translate(-2px, -2px) rotate(-1deg); }
  20% { transform: translateX(-50%) translate(2px, -2px) rotate(1deg); }
  30% { transform: translateX(-50%) translate(-2px, 2px) rotate(-1deg); }
  40% { transform: translateX(-50%) translate(2px, 2px) rotate(1deg); }
  50% { transform: translateX(-50%) translate(-2px, -2px); }
  100% { transform: translateX(-50%) translate(0,0); }
`;

const fadeShowHide = keyframes`
  0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
  15% { opacity: 1; transform: translateX(-50%) translateY(0); }
  85% { opacity: 1; transform: translateX(-50%) translateY(0); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
`;

const NotificationCard = styled.div`
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(128, 128, 128, 0.1);
  border: 1px solid grey;
  border-radius: 14px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 15px;
  z-index: 1001;
  width: 90%;
  max-width: 350px;
  cursor: pointer;
  filter: grayscale(1);
  animation: ${fadeShowHide} 3s forwards, ${vibrate} 0.2s infinite;
  @media (min-width: 1920px) {
    top: 140px;
    max-width: 600px;
    padding: 20px;
    gap: 30px;
  }
`;

const CardImg = styled.img`
  width: 50px;
  height: 35px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #2eb813;
  @media (min-width: 1920px) { width: 100px; height: 70px; }
`;

const CardText = styled.div`
  flex-grow: 1;
  text-align: left;
`;

const CardName = styled.h3`
  margin: 0;
  font-size: 12px;
  color: #ffb36c;
  @media (min-width: 1920px) { font-size: 24px; }
`;

const CardGoal = styled.p`
  margin: 2px 0 0;
  font-size: 10px;
  color: #a2ff6c;
  @media (min-width: 1920px) { font-size: 20px; }
`;

const CardReward = styled.div`
  width: 45px;
  height: 25px;
  background: rgba(46, 184, 19, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 10px;
  border: 1px dashed #ffb36c;
  color: #ffb36c;
  flex-shrink: 0;
  @media (min-width: 1920px) { width: 80px; height: 45px; font-size: 18px; }
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

const VisualSettingsPanel = styled.div`
  position: absolute;
  top: 52px;
  right: 10px;
  background: ${(props) => (props.$isDarkMode ? "rgba(18, 18, 18, 0.95)" : "rgba(255, 255, 255, 0.95)")};
  border: 1px solid ${(props) => (props.$isDarkMode ? "#444" : "#ddd")};
  backdrop-filter: blur(5px);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  z-index: 2000;
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  @media (min-width: 768px) {
    top: 85px;
    width: 280px;
    right: 20px;
  }
  @media (min-width: 1920px) {
    top: 135px;
    width: 400px;
    padding: 25px;
  }
`;

const VisualLabel = styled.label`
  font-size: 11px;
  font-weight: bold;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  @media (min-width: 768px) {
    font-size: 14px;
  }
  @media (min-width: 1920px) {
    font-size: 24px;
  }
`;

const VisualRange = styled.input`
  width: 100%;
  cursor: pointer;
  accent-color: ${(props) => (props.$isDarkMode ? "#ffb36c" : "#007bff")};
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 10px;
`;

const FilterButton = styled.button`
  background: ${(props) => (props.$active ? "#ffb36c" : "transparent")};
  color: ${(props) => (props.$active ? "#3e2723" : props.$isDarkMode ? "#ffb36c" : "#333")};
  border: 1px solid #ffb36c;
  border-radius: 6px;
  padding: 6px;
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background: rgba(255, 179, 108, 0.3);
  }
`;

const Header = ({
  onOpenLogin,
  onOpenRegister,
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
  const [showVisualSettings, setShowVisualSettings] = useState(false);
  const [showTurkeyNotify, setShowTurkeyNotify] = useState(false);

  useEffect(() => {
    const status = localStorage.getItem("turkeyStudioStatus");
    if (!status || status === "idle") {
      const timer = setTimeout(() => {
        setShowTurkeyNotify(true);
        setTimeout(() => setShowTurkeyNotify(false), 3000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const [visualConfig, setVisualConfig] = useState(() => {
    try {
      const saved = localStorage.getItem("visualConfig");
      const parsed = saved ? JSON.parse(saved) : null;
      if (parsed) {
        if (parsed.darkIntensity !== undefined && parsed.filterType === undefined) {
          return {
            darkIntensity: parsed.darkIntensity || 0,
            filterType: parsed.bwIntensity > 0 ? "grayscale" : "none",
            filterIntensity: parsed.bwIntensity || 50,
          };
        }
        return parsed;
      }
      return { darkIntensity: 0, filterType: "none", filterIntensity: 50 };
    } catch {
      return { darkIntensity: 0, filterType: "none", filterIntensity: 50 };
    }
  });

  useEffect(() => {
    localStorage.setItem("visualConfig", JSON.stringify(visualConfig));
    const brightness = 100 - (visualConfig.darkIntensity * 0.6);
    let filters = `brightness(${brightness}%)`;
    const { filterType, filterIntensity } = visualConfig;

    if (filterType === "grayscale") filters += ` grayscale(${filterIntensity}%)`;
    else if (filterType === "sepia") filters += ` sepia(${filterIntensity}%)`;
    else if (filterType === "invert") filters += ` invert(${filterIntensity}%)`;
    else if (filterType === "matrix") filters += ` sepia(${filterIntensity}%) hue-rotate(${filterIntensity}deg)`;
    else if (filterType === "uv") filters += ` hue-rotate(${filterIntensity * 2.4}deg)`;

    document.documentElement.style.filter = filters;
  }, [visualConfig]);

  useEffect(() => {
    const interval = setInterval(() => setShowUltra((prev) => !prev), 3000);
    return () => clearInterval(interval);
  }, []);

  const handleThemeToggle = () => {
    new Audio(bell).play().catch(() => {});
    toggleTheme();
  };

  const FILTERS = [
    { id: "none", label: "Вимкнено" },
    { id: "grayscale", label: "Дальтонізм" },
    { id: "sepia", label: "Сепія" },
    { id: "invert", label: "Негатив" },
    { id: "matrix", label: "Матриця" },
    { id: "uv", label: "УФ-Лампа" },
  ];

  return (
    <>
      <HeaderDiv $isDarkMode={isDarkMode}>
        {showTurkeyNotify && (
          <NotificationCard 
            onClick={() => {
              onOpenAchievements();
              setShowTurkeyNotify(false);
            }}
          >
            <CardImg src={money} alt="TheTurkeyStudio" />
            <CardText>
              <CardName>TheTurkeyStudio</CardName>
              <CardGoal>Ціль: підпишіться на мій фейсбук канал.</CardGoal>
            </CardText>
            <CardReward>40 🧧</CardReward>
          </NotificationCard>
        )}
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
                  onClick={() => setShowVisualSettings(!showVisualSettings)}
                  $isDarkMode={isDarkMode}
                  title="Налаштування вигляду"
                >
                  <EmojiWrapper>👁️</EmojiWrapper>
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
              <IconButton
                  onClick={() => setShowVisualSettings(!showVisualSettings)}
                  $isDarkMode={isDarkMode}
                  title="Налаштування вигляду"
                >
                  <EmojiWrapper>👁️</EmojiWrapper>
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
              <button
                onClick={onOpenRegister}
                style={{
                  fontSize: "11px",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  textDecoration: "underline",
                  color: isDarkMode ? "#fff" : "#000",
                }}
              >
                Реєстрація
              </button>
            </>
          )}
        </HeaderFix>
        {showVisualSettings && (
          <VisualSettingsPanel $isDarkMode={isDarkMode}>
            <div>
              <VisualLabel $isDarkMode={isDarkMode}>
                Яскравість <span>{visualConfig.darkIntensity}%</span>
              </VisualLabel>
              <VisualRange
                type="range"
                min="0"
                max="100"
                value={visualConfig.darkIntensity}
                onChange={(e) => setVisualConfig(prev => ({ ...prev, darkIntensity: Number(e.target.value) }))}
                $isDarkMode={isDarkMode}
              />
            </div>

            <FilterGrid>
              {FILTERS.map((f) => (
                <FilterButton
                  key={f.id}
                  $active={visualConfig.filterType === f.id}
                  $isDarkMode={isDarkMode}
                  onClick={() => setVisualConfig((prev) => ({ ...prev, filterType: f.id }))}
                >
                  {f.label}
                </FilterButton>
              ))}
            </FilterGrid>

            {visualConfig.filterType !== "none" && (
              <div>
                <VisualLabel $isDarkMode={isDarkMode}>
                  Сила ефекту <span>{visualConfig.filterIntensity}%</span>
                </VisualLabel>
                <VisualRange
                  type="range"
                  min="0"
                  max="100"
                  value={visualConfig.filterIntensity}
                  onChange={(e) => setVisualConfig((prev) => ({ ...prev, filterIntensity: Number(e.target.value) }))}
                  $isDarkMode={isDarkMode}
                />
              </div>
            )}
          </VisualSettingsPanel>
        )}
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

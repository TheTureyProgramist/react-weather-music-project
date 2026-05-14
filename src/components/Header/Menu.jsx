import React, { useState, useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useNavigate } from "react-router-dom";
export const DEFAULT_SITE_SECTIONS = [
  { key: "hero", label: "🏠 Головна", path: "hero" },
  { key: "weather", label: "🌤️ Погода", path: "weather" },
  { key: "map", label: "🗺️ Кліматична мапа", path: "map" },
  { key: "puzzles", label: "🧩 Пазли", path: "puzzles" },
  { key: "aihelp", label: "🤖 AI-допомога", path: "aihelp" },
  { key: "news", label: "📰 Новини", path: "news" },
  { key: "music", label: "🎵 Музика", path: "music" },
  { key: "fanart", label: "🎨 FanArt", path: "fanart" },
  { key: "prison", label: "🔒 Prison", path: "prison" },
];

const slideDown = keyframes`
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
`;

const slideUp = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-100%); }
`;

const flow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LogoActionsRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const MiniLogoButton = styled.button`
  background: ${(props) =>
    props.$isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)"};
  border: 1px solid ${(props) => (props.$isDarkMode ? "#444" : "#ccc")};
  color: ${(props) => (props.$isDarkMode ? "#ffb36c" : "#1a1a1a")};
  border-radius: 8px;
  padding: 8px;
  flex: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.2s ease;

  &:hover {
    background: #ffb36c;
    color: #1a1a1a;
    border-color: #ffb36c;
  }

  @media (min-width: 1920px) {
    font-size: 32px;
    padding: 15px;
    border-radius: 15px;
  }
`;

const SubsMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  background: ${(props) =>
    props.$isUltra ? "rgba(113, 0, 151, 0.05)" : "rgba(255, 179, 108, 0.05)"};
  border: 1.5px solid ${(props) => (props.$isUltra ? "#710097" : "#ffb36c")};
  padding: 5px 4px;
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.5s ease;
  text-align: left;

  &:hover {
    background: ${(props) =>
      props.$isUltra ? "rgba(113, 0, 151, 0.15)" : "rgba(255, 179, 108, 0.15)"};
    transform: translateX(5px);
    box-shadow: 0 4px 15px
      ${(props) =>
        props.$isUltra ? "rgba(113, 0, 151, 0.2)" : "rgba(255, 179, 108, 0.2)"};
  }

  @media (min-width: 1920px) {
    padding: 15px 20px;
    gap: 25px;
    border-radius: 20px;
  }
`;

const SubsIconBox = styled.div`
  width: 32px;
  height: 32px;
  background: #1a1a1a;
  border: 1px solid ${(props) => (props.$isUltra ? "#710097" : "#ffb36c")};
  border-radius: 8px;
  display: grid;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  @media (min-width: 1920px) {
    width: 60px;
    height: 60px;
  }
`;

const SubsTextWrapper = styled.div`
  display: grid;
  align-items: center;
  flex-grow: 1;
`;

const SubsAnimatedPart = styled.span`
  grid-area: 1/1;
  font-weight: 800;
  transition: opacity 0.5s ease-in-out;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  font-size: ${(props) => (props.$isSymbol ? "20px" : "16px")};

  ${(props) =>
    props.$variant === "rainbow" &&
    css`
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
    `}

  ${(props) =>
    props.$variant === "ultra" &&
    css`
      background: linear-gradient(
        270deg,
        #ff7eb3,
        #ff758c,
        #7afcff,
        #feffb7,
        #58e2c2
      );
      background-size: 400% 400%;
      animation: ${flow} 3s ease infinite;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    `}

  @media (min-width: 1920px) {
    font-size: ${(props) => (props.$isSymbol ? "38px" : "32px")};
  }
`;

const ModeToggle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  margin-bottom: 8px;
  background: ${(props) =>
    props.$isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)"};
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.$isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"};
  }

  @media (min-width: 1920px) {
    padding: 15px 20px;
    gap: 20px;
  }
`;

const Switch = styled.div`
  position: relative;
  width: 36px;
  height: 20px;
  background: ${(props) => (props.$active ? "#ff005d" : "#ccc")};
  border-radius: 20px;
  transition: 0.3s;

  &::after {
    content: "";
    position: absolute;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    top: 2px;
    left: ${(props) => (props.$active ? "18px" : "2px")};
    transition: 0.3s;
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
  animation: ${(props) => (props.$isOpen ? slideDown : slideUp)} 0.4s
    cubic-bezier(0.16, 1, 0.3, 1) forwards;

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
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
  background: transparent;
  border: none;
  padding: 5px 6px;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#1a1a1a")};
  cursor: pointer;
  border-radius: 10px;
  transition: background 0.2s ease;
  text-align: left;

  &:hover {
    background: ${(props) =>
      props.$isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"};
  }

  @media (min-width: 1920px) {
    font-size: 26px;
    margin-bottom: 15px;
    gap: 25px;
    padding: 15px 20px;
  }

  span.icon {
    font-size: 20px;
    @media (min-width: 1920px) {
      font-size: 40px;
    }
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 5px;
  margin-bottom: 8px;
  background: ${(props) =>
    props.$isDarkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)"};
  border-radius: 10px;

  @media (min-width: 1920px) {
    padding: 15px 25px;
    margin-bottom: 15px;
    border-radius: 20px;
  }
`;
const NavButton = styled.button`
  background: transparent;
  border: none;
  text-align: left;
  color: ${(props) => (props.$isDarkMode ? "#ffb36c" : "#ff005d")};
  font-size: 16px;
  font-weight: 600;
  flex-grow: 1;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }
  @media (min-width: 1920px) {
    font-size: 30px;
  }
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 5px;
  margin-left: 15px;
`;

const OrderButton = styled.button`
  background: ${(props) => (props.$isDarkMode ? "#333" : "#eee")};
  border: 1px solid ${(props) => (props.$isDarkMode ? "#444" : "#ccc")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#333")};
  border-radius: 6px;
  padding: 4px 10px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  font-size: 14px;
  font-weight: bold;

  &:hover:not(:disabled) {
    background: #ff005d;
    color: white;
    border-color: #ff005d;
  }
  @media (min-width: 1920px) {
    padding: 8px 16px;
    font-size: 24px;
  }
`;

const FilterGridInMenu = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3px;
  margin-bottom: 5px;
`;

const FilterButtonInMenu = styled.button`
  background: ${(props) => (props.$active ? "#ffb36c" : "transparent")};
  color: ${(props) =>
    props.$active ? "#3e2723" : props.$isDarkMode ? "#ffb36c" : "#333"};
  border: 1px solid #ffb36c;
  border-radius: 6px;
  padding: 3px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 179, 108, 0.3);
  }

  @media (min-width: 1920px) {
    padding: 12px;
    font-size: 16px;
  }
`;

const Menu = ({
  isOpen,
  onClose,
  isDarkMode,
  siteSections,
  resetSiteSections,
  moveSiteSection,
  onToggleTheme,
  onOpenShop,
  onOpenAchievements,
  onDownloadLogo,
  onPrintLogo,
  onFullscreenLogo,
  onOpenVip,
  onOpenSettings,
  onOpenHelp,
  showUltra,
  onOpenInfo,
  onLogout,
  isRoutingMode,
  setIsRoutingMode,
  currentPath,
  visualConfig,
  setVisualConfig,
}) => {
  const [isRendered, setIsRendered] = useState(false);
  const navigate = useNavigate();

  const FILTERS = [
    { id: "none", label: "Вимкнено" },
    { id: "grayscale", label: "Дальтонізм" },
    { id: "sepia", label: "Сепія" },
    { id: "invert", label: "Негатив" },
    { id: "matrix", label: "Матриця" },
    { id: "uv", label: "УФ-Лампа" },
  ];

  const applyFilterEffect = (config) => {
    const brightness = 100 - config.darkIntensity * 0.6;
    let filters = `brightness(${brightness}%)`;
    const { filterType, filterIntensity } = config;

    if (filterType === "grayscale") {
      filters += ` grayscale(${filterIntensity}%)`;
    } else if (filterType === "sepia") {
      filters += ` sepia(${filterIntensity}%)`;
    } else if (filterType === "invert") {
      filters += ` invert(${filterIntensity}%)`;
    } else if (filterType === "matrix") {
      filters += ` hue-rotate(180deg) grayscale(${filterIntensity}%)`;
    } else if (filterType === "uv") {
      filters += ` hue-rotate(280deg) saturate(${100 + filterIntensity}%)`;
    }

    document.documentElement.style.filter = filters;
  };

  const handleFilterChange = (filterId) => {
    const newConfig = { ...visualConfig, filterType: filterId };
    setVisualConfig(newConfig);
    localStorage.setItem("visualConfig", JSON.stringify(newConfig));
    applyFilterEffect(newConfig);
  };

  const handleBrightnessChange = (value) => {
    const newConfig = { ...visualConfig, darkIntensity: value };
    setVisualConfig(newConfig);
    localStorage.setItem("visualConfig", JSON.stringify(newConfig));
    applyFilterEffect(newConfig);
  };

  const handleIntensityChange = (value) => {
    const newConfig = { ...visualConfig, filterIntensity: value };
    setVisualConfig(newConfig);
    localStorage.setItem("visualConfig", JSON.stringify(newConfig));
    applyFilterEffect(newConfig);
  };

  useEffect(() => {
    if (isOpen) setIsRendered(true);
    else {
      const timer = setTimeout(() => setIsRendered(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleNavClick = (sectionKey, path) => {
    onClose();
    if (isRoutingMode) {
      navigate("/" + path);
    } else {
      const element = document.getElementById(sectionKey);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (sectionKey === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  if (!isRendered) return null;

  return (
    <>
      <BurgerOverlay
        $isOpen={isOpen}
        $isRendered={isRendered}
        onClick={onClose}
      />
      <BurgerMenuPanel
        $isOpen={isOpen}
        $isRendered={isRendered}
        $isDarkMode={isDarkMode}
      >
        <BurgerCloseBtn onClick={onClose} $isDarkMode={isDarkMode}>
          ✕
        </BurgerCloseBtn>

        <BurgerContentGrid>
          <div>
            <MenuSectionTitle>Навігація та порядок</MenuSectionTitle>
            <div style={{ marginTop: "10px" }}>
              {siteSections &&
                siteSections.map((section, idx) => (
                  <NavItem key={section.key} $isDarkMode={isDarkMode}>
                    <NavButton
                      $isDarkMode={isDarkMode}
                      onClick={() => handleNavClick(section.key, section.path)}
                    >
                      {section.label}
                    </NavButton>
                    {section.key !== "hero" && (
                      <ControlButtons>
                        <OrderButton
                          $isDarkMode={isDarkMode}
                          disabled={idx <= 1}
                          onClick={() => moveSiteSection(idx, -1)}
                          title="Вище"
                        >
                          ↑
                        </OrderButton>
                        <OrderButton
                          $isDarkMode={isDarkMode}
                          disabled={idx === siteSections.length - 1}
                          onClick={() => moveSiteSection(idx, 1)}
                          title="Нижче"
                        >
                          ↓
                        </OrderButton>
                      </ControlButtons>
                    )}
                  </NavItem>
                ))}
            </div>

            <button
              onClick={resetSiteSections}
              style={{
                marginTop: "2px",
                width: "100%",
                cursor: "pointer",
                padding: "7px",
                borderRadius: "7px",
                border: "none",
                fontWeight: "bold",
                background: "#ff005d",
                color: "white",
              }}
            >
              Скинути порядок секцій
            </button>
          </div>

          <div>
            <MenuSectionTitle>Керування</MenuSectionTitle>
            <LegendList>
              <li>
                <SubsMenuItem
                  $isUltra={showUltra}
                  onClick={() => {
                    onOpenVip();
                    onClose();
                  }}
                >
                  <SubsIconBox $isUltra={showUltra}>
                    <SubsAnimatedPart
                      $show={!showUltra}
                      $variant="rainbow"
                      $isSymbol
                    >
                      +
                    </SubsAnimatedPart>
                    <SubsAnimatedPart
                      $show={showUltra}
                      $variant="ultra"
                      $isSymbol
                    >
                      ♔
                    </SubsAnimatedPart>
                  </SubsIconBox>
                  <SubsTextWrapper>
                    <SubsAnimatedPart $show={!showUltra} $variant="rainbow">
                      Стихія+
                    </SubsAnimatedPart>
                    <SubsAnimatedPart $show={showUltra} $variant="ultra">
                      Стихія Ultra
                    </SubsAnimatedPart>
                  </SubsTextWrapper>
                  <span
                    style={{
                      fontSize: "12px",
                      color: showUltra ? "#710097" : "#ffb36c",
                      fontWeight: "bold",
                    }}
                  >
                    ➔
                  </span>
                </SubsMenuItem>
              </li>
              <li>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    color: isDarkMode ? "#ffb36c" : "#ff005d",
                  }}
                >
                  🖼️ Логотип сайту
                </div>
                <LogoActionsRow>
                  <MiniLogoButton
                    $isDarkMode={isDarkMode}
                    onClick={(e) => {
                      onDownloadLogo(e);
                    }}
                    title="Скачати лого"
                  >
                    ⇩
                  </MiniLogoButton>
                  <MiniLogoButton
                    $isDarkMode={isDarkMode}
                    onClick={(e) => {
                      onFullscreenLogo(e);
                    }}
                    title="Повний екран"
                  >
                    ⛶
                  </MiniLogoButton>
                  <MiniLogoButton
                    $isDarkMode={isDarkMode}
                    onClick={(e) => {
                      onPrintLogo(e);
                    }}
                    title="Друкувати"
                  >
                    ⎙
                  </MiniLogoButton>
                </LogoActionsRow>
              </li>
              <li>
                <ModeToggle
                  $isDarkMode={isDarkMode}
                  onClick={() => setIsRoutingMode(!isRoutingMode)}
                >
                  <span className="icon">{isRoutingMode ? "🚀" : "⚓"}</span>
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                      {isRoutingMode ? "Маршрутизація" : "Навігація"}
                    </div>
                    <div style={{ fontSize: "10px", opacity: 0.7 }}>
                      {isRoutingMode ? "Зміна URL" : "Плавний скрол"}
                    </div>
                  </div>
                  <Switch $active={isRoutingMode} />
                </ModeToggle>
              </li>
              <li>
                <ActionButton $isDarkMode={isDarkMode} onClick={onToggleTheme}>
                  <span className="icon">{isDarkMode ? "☀️" : "🌑"}</span> Тема
                </ActionButton>
              </li>
              <li>
                <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                      color: isDarkMode ? "#ffb36c" : "#ff005d",
                    }}
                  >
                    ☀️ Яскравість
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={visualConfig.darkIntensity || 0}
                    onChange={(e) =>
                      handleBrightnessChange(Number(e.target.value))
                    }
                    style={{ width: "100%", cursor: "pointer" }}
                  />
                  <div
                    style={{
                      fontSize: "12px",
                      textAlign: "right",
                      marginTop: "5px",
                    }}
                  >
                    {visualConfig.darkIntensity || 0}%
                  </div>
                </div>
              </li>
              <li>
                <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      marginBottom: "10px",
                      color: isDarkMode ? "#ffb36c" : "#ff005d",
                    }}
                  >
                    🎨 Фільтри
                  </div>
                  <FilterGridInMenu $isDarkMode={isDarkMode}>
                    {FILTERS.map((f) => (
                      <FilterButtonInMenu
                        key={f.id}
                        $active={visualConfig.filterType === f.id}
                        $isDarkMode={isDarkMode}
                        onClick={() => handleFilterChange(f.id)}
                      >
                        {f.label}
                      </FilterButtonInMenu>
                    ))}
                  </FilterGridInMenu>
                </div>
              </li>
              {visualConfig.filterType !== "none" && (
                <li>
                  <div style={{ marginTop: "15px", marginBottom: "15px" }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        marginBottom: "3px",
                        color: isDarkMode ? "#ffb36c" : "#ff005d",
                      }}
                    >
                      ⚡ Сила ефекту
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={visualConfig.filterIntensity || 50}
                      onChange={(e) =>
                        handleIntensityChange(Number(e.target.value))
                      }
                      style={{ width: "100%", cursor: "pointer" }}
                    />
                    <div
                      style={{
                        fontSize: "12px",
                        textAlign: "right",
                        marginTop: "5px",
                      }}
                    >
                      {visualConfig.filterIntensity || 50}%
                    </div>
                  </div>
                </li>
              )}
              <li>
                <ActionButton
                  $isDarkMode={isDarkMode}
                  onClick={() => {
                    onOpenShop();
                    onClose();
                  }}
                >
                  <span className="icon">🧧</span> Магазин
                </ActionButton>
              </li>
              <li>
                <ActionButton
                  $isDarkMode={isDarkMode}
                  onClick={() => {
                    onOpenAchievements();
                    onClose();
                  }}
                >
                  <span className="icon">🏆</span> Досягнення
                </ActionButton>
              </li>
              <li>
                <ActionButton
                  $isDarkMode={isDarkMode}
                  onClick={() => {
                    onOpenSettings();
                    onClose();
                  }}
                >
                  <span className="icon">⚙️</span> Налаштування
                </ActionButton>
              </li>
              <li>
                <ActionButton
                  $isDarkMode={isDarkMode}
                  onClick={() => {
                    onOpenHelp();
                    onClose();
                  }}
                >
                  <span className="icon">❓</span> Навчання
                </ActionButton>
              </li>
              <li>
                <ActionButton
                  $isDarkMode={isDarkMode}
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                >
                  <span className="icon">🚪</span> Вихід
                </ActionButton>
              </li>
            </LegendList>
          </div>
        </BurgerContentGrid>
      </BurgerMenuPanel>
    </>
  );
};

export default Menu;
